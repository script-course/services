import type {
    InvitedUser,
    LoggedInUser,
    LoginCredentials,
    RegisterData,
    ResetPasswordData,
    ResponseErrorMiddleware,
} from './types';
import type {Component} from 'vue';
import type {NavigationGuard} from 'vue-router';

import {USER_DOMAIN_NAME} from 'domains/user';
import {computed, ref} from 'vue';

import {getRequest, postRequest, registerResponseErrorMiddleware} from 'services/http';
import {addRoutes, goToRoute, registerBeforeRouteMiddleware} from 'services/router';
import {clearStorage} from 'services/storage';
import {successToast} from 'services/toast';

export const LOGIN_ROUTE_NAME = 'Login';
export const FORGOT_PASSWORD_ROUTE_NAME = 'ForgotPassword';
export const RESET_PASSWORD_ROUTE_NAME = 'ResetPassword';
export const REGISTER_ROUTE_NAME = 'Register';

const apiLoginRoute = '/login';
const apiLogoutRoute = '/logout';
const apiLoggedInCheckRoute = '/me';
const apiSendResetPasswordEmailRoute = '/send-reset-password-email';
const apiResetpasswordRoute = '/reset-password';

const goToDefaultLoggedInPage = () => goToRoute('dashboard');

export const goToLoginPage = (from?: string) => goToRoute(LOGIN_ROUTE_NAME, undefined, {from});

const loggedInUser = ref<LoggedInUser | undefined>();

export const getLoggedInUser = () => {
    if (!loggedInUser.value) throw Error("Can't call getLoggedInUser when not logged in");

    return loggedInUser.value;
};

export const isAdmin = computed(() => loggedInUser.value?.isAdmin);

export const isLoggedIn = computed(() => loggedInUser.value !== undefined);

const onLocation = ref(true);

export const isOnLocation = computed(() => onLocation.value);

export const checkLocation = async () => {
    const {data} = await getRequest('location');
    onLocation.value = data.location;
};

const HTTP_FORBIDDEN = 403;
const HTTP_UNAUTHORIZED = 401;

const responseErrorMiddleware: ResponseErrorMiddleware = ({response}) => {
    if (!response) return;
    const {status} = response;
    if (status === HTTP_FORBIDDEN) goToDefaultLoggedInPage();
    else if (status === HTTP_UNAUTHORIZED && isLoggedIn.value) {
        // only need to logout of the app, because on the backend the user is already logged out
        logoutOfApp();
    }
};

registerResponseErrorMiddleware(responseErrorMiddleware);

// eslint-disable-next-line complexity
const beforeMiddleware: NavigationGuard = ({meta, fullPath}) => {
    if (!isLoggedIn.value && meta.auth) {
        goToLoginPage(fullPath);

        return true;
    }

    if (isLoggedIn.value && !meta.canSeeWhenLoggedIn) {
        goToDefaultLoggedInPage();

        return true;
    }

    return false;
};

registerBeforeRouteMiddleware(beforeMiddleware);

const setLoggedInAndUser = (user: LoggedInUser) => {
    loggedInUser.value = user;
};

const logoutOfApp = () => {
    clearStorage();
    window.location.reload();
};

export const login = async (credentials: LoginCredentials) => {
    const response = await postRequest(apiLoginRoute, credentials);

    setLoggedInAndUser(response.data.user);
    goToDefaultLoggedInPage();

    return response;
};

export const guestLogin = async () => {
    const response = await getRequest('guestLogin');

    setLoggedInAndUser(response.data.user);
    goToDefaultLoggedInPage();

    return response;
};

export const logout = async () => {
    const response = await postRequest(apiLogoutRoute, {});

    logoutOfApp();

    return response;
};

export const checkIfLoggedIn = async () => {
    const {data} = await getRequest(apiLoggedInCheckRoute);

    setLoggedInAndUser(data.user);
};

export const sendResetPasswordEmail = async (email: string) => {
    const response = await postRequest(apiSendResetPasswordEmailRoute, {email});

    successToast('Er is een email verstuurd om uw wachtwoord te resetten');

    goToLoginPage();

    return response;
};

export const resetPassword = async (data: ResetPasswordData) => {
    const response = await postRequest(apiResetpasswordRoute, data);

    goToLoginPage();

    return response;
};

export const register = async (data: RegisterData) => {
    const response = await postRequest('register', data);

    successToast('Je bent succesvol geregistreerd');

    goToLoginPage();

    return response;
};

export const registerWithToken = async (data: RegisterData) => {
    const response = await postRequest('register-token', data);

    successToast('Je bent succesvol geregistreerd');

    goToLoginPage();

    return response;
};

export const getUserByToken = async (token: string): Promise<InvitedUser> => {
    const {data} = await getRequest(`${USER_DOMAIN_NAME}/token/${token}`);

    return data;
};

const authMeta = (title: string) => ({auth: false, canSeeWhenLoggedIn: false, title, ignoreFrom: true});

export const setAuthRoutes = (
    loginPage: Component,
    forgotPasswordPage: Component,
    resetPasswordPage: Component,
    registerPage: Component,
) => {
    addRoutes([
        loginRoute(loginPage),
        forgotPasswordRoute(forgotPasswordPage),
        resetPasswordRoute(resetPasswordPage),
        registerRoute(registerPage),
    ]);
};

const loginRoute = (loginPage: Component) => ({
    path: '/inloggen',
    name: LOGIN_ROUTE_NAME,
    component: loginPage,
    meta: authMeta('Login'),
});

const forgotPasswordRoute = (forgotPasswordPage: Component) => ({
    path: '/wachtwoord-vergeten',
    name: FORGOT_PASSWORD_ROUTE_NAME,
    component: forgotPasswordPage,
    meta: authMeta('Wachtwoord vergeten'),
});

const resetPasswordRoute = (resetPasswordPage: Component) => ({
    path: '/wachtwoord-resetten',
    name: RESET_PASSWORD_ROUTE_NAME,
    component: resetPasswordPage,
    meta: authMeta('Wachtwoord resetten'),
});

const registerRoute = (registerPage: Component) => ({
    path: '/registreren',
    name: REGISTER_ROUTE_NAME,
    component: registerPage,
    meta: authMeta('Registreren'),
});
