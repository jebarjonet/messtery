Meteor.startup(function () {
    SEO.config({
        title: "Messtery",
        meta: {
            viewport: "width=device-width, initial-scale=1, maximum-scale=1",
            language: "EN",
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes'
        },
        link: {
            manifest: '/manifests/global.json',
            icon: '/img/icons/favicon.png',
            'apple-touch-icon': '/img/icons/favicon.png'
        },
        og: {
            title: "Messtery",
            type: "website"
        }
    });
});