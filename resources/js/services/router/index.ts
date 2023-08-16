import type {App} from 'vue';
import type {
    LocationQueryRaw,
    NavigationGuard,
    NavigationHookAfter,
    RouteLocationRaw,
    RouteRecordRaw,
} from 'vue-router';

import {createRouter, createWebHistory} from 'vue-router';

import {CREATE_PAGE_NAME, EDIT_PAGE_NAME, OVERVIEW_PAGE_NAME, SHOW_PAGE_NAME} from './factory';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [],
});

export const addRoutes = (routes: RouteRecordRaw[]) => {
    for (const route of routes) router.addRoute(route);
};

export const useRouterInApp = (app: App<Element>) => app.use(router);

const createRoute = (name: string, id?: number, query?: LocationQueryRaw) => {
    const route: RouteLocationRaw = {name};
    if (id) route.params = {id};
    if (query) route.query = query;

    return route;
};

export const goToRoute = (name: string, id?: number, query?: LocationQueryRaw) => {
    if (onPage(name) && !query && !id) return;
    router.push(createRoute(name, id, query));
};

const beforeRouteMiddleware: NavigationGuard[] = [
    (to, from) => {
        const fromQuery = from.query.from;
        if (fromQuery && typeof fromQuery === 'string') {
            if (fromQuery === to.fullPath) return false;
            router.push(fromQuery);

            return true;
        }

        return false;
    },
];

router.beforeEach(async (to, from, next) => {
    for (const middlewareFunc of beforeRouteMiddleware) {
        // MiddlewareFunc will return true if it encountered problems
        if (await middlewareFunc(to, from, next)) return next(false);
    }

    return next();
});

export const registerBeforeRouteMiddleware = (middleware: NavigationGuard) => beforeRouteMiddleware.push(middleware);

const routerAfterMiddleware: NavigationHookAfter[] = [];
export const registerAfterMiddleware = (middleware: NavigationHookAfter) => routerAfterMiddleware.push(middleware);

/** Go to the show page for the given module name */
export const goToShowPage = (moduleName: string, id: number) => goToRoute(moduleName + SHOW_PAGE_NAME, id);
/** Go to the edit page for the given module name */
export const goToEditPage = (moduleName: string, id: number) => goToRoute(moduleName + EDIT_PAGE_NAME, id);
/** Go to the create page for the given module name */
export const goToCreatePage = (moduleName: string) => goToRoute(moduleName + CREATE_PAGE_NAME);
/** Go to the overview page for the given module name */
export const goToOverviewPage = (moduleName: string) => goToRoute(moduleName + OVERVIEW_PAGE_NAME);

/** Get the current route */
export const getCurrentRoute = () => router.currentRoute;
/** Get the query from the current route */
export const getCurrentRouteQuery = () => router.currentRoute.value.query;
/** Get the id from the params from the current route */
export const getCurrentRouteId = () => parseInt(router.currentRoute.value.params.id.toString());
/** Get the token from the params from the current route */
export const getCurrentRouteToken = () => router.currentRoute.value.params.token.toString();
/** Get the name from the current route */
export const getCurrentRouteName = () => router.currentRoute.value.name?.toString();

/** checks if the given string is in the current routes name */
const onPage = (pageName: string) => router.currentRoute.value.name?.toString().includes(pageName);

/** go back one page */
export const goBack = () => router.back();
