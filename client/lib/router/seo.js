var SEO = new FlowRouterSEO();
SEO.setDefaults({
    title: "Messtery",
    meta: {
        'name="viewport"': "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        'name="mobile-web-app-capable"': "yes",
        'name="apple-mobile-web-app-capable"': "yes",
        'property="og:type"': "website",
        'property="og:title"': "Klore"
    },
    link: {
        manifest: '/manifests/global.json',
        icon: '/img/icons/favicon.png',
        'apple-touch-icon': '/img/icons/favicon.png'
    }
});