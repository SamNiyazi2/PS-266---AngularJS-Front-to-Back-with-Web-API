
// 01/19/2021 05:28 pm - SSN - [20210119-1708] - [002] - M03-06 - Calling the Web API from Angular


(function () {

    'use strict';

    angular
        .module("common.services")
        .factory("productResource", ["$resource", "appSettings", productResource]);

    function productResource($resource, appSettings) {

        // Url , base-url
        let url_withId = new URL("/api/products/:id", appSettings.serverPath).href;
        let url_withSearch = new URL("/api/products/:targetField/:search", appSettings.serverPath).href;

        // 01/20/2021 01:08 pm - SSN - [20210120-1304] - [001] - M05-03 - Extending the URL path

        return {
            urlWithOptionalId: $resource(url_withId),
            urlWithSearch: $resource(url_withSearch)
        };

    }

}());

