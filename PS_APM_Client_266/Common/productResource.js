
// 01/19/2021 05:28 pm - SSN - [20210119-1708] - [002] - M03-06 - Calling the Web API from Angular


(function () {

    'use strict';

    angular
        .module("common.services")
        .factory("productResource", ["$resource", "appSettings", productResource]);

    function productResource($resource, appSettings) {


        let url = new URL("/api/products/:id", appSettings.serverPath).href;

        console.log('20210119-1744');
        console.log(url );

        return $resource(url);

    }

}());

