// is used when importing from vue-files, so that typescript can declare the type
// declare module '*.vue' {
//     import {Component} from 'vue';
//     const component: Component;
//     export default component;
// }
declare module '*.vue' {
    import type {DefineComponent} from 'vue';

    const component: DefineComponent<unknown, unknown, unknown>;
    export default component;
}
