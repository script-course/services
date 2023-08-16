import path from 'path';

const srcPath = path.resolve('./resources/js');
// const imgPath = path.resolve('./resources/images');

export const resolve = {
    alias: {
        // // shared aliases
        // components: path.join(srcPath, 'components'),
        // routes: path.join(srcPath, 'routes'),
        // factories: path.join(srcPath, 'factories'),

        // // domains
        // domains: path.join(srcPath, 'domains'),

        // // general aliases
        services: path.join(srcPath, 'services'),
        // types: path.join(srcPath, 'types'),
        // errors: path.join(srcPath, 'errors'),
        // helpers: path.join(srcPath, 'helpers'),
        // constants: path.join(srcPath, 'constants'),
        // pages: path.join(srcPath, 'pages'),

        // // images
        // images: imgPath,
    },
};
