
// 01/19/2021 05:28 pm - SSN - [20210119-1708] - [002] - M03-06 - Calling the Web API from Angular


(function () {

    'use strict';

    angular
        .module("common.services")
        .factory("productResource", ["$resource", "appSettings", productResource]);

    function productResource($resource, appSettings) {

        // Url , base-url
        let url = new URL("/api/products/:id", appSettings.serverPath).href;

        return $resource(url);

    }

}());

