import {interceptors} from "axios";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

interceptors.request.use(function(config) {
    console.log({config});

    if ( !isAbsoluteURLRegex.test(config.url) ) {
        config.url = [import.meta.env.VITE_API_URL, config.url].join(config.url.startsWith('/') ? '' : '/');
    }

    return config;
});