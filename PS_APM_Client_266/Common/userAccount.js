
// 01/22/2021 06:22 am - SSN - [20210122-0613] - [001] - M10-03 - Registering the user

(function () {

    'use strict';

    angular.module("common.services")
        .factory("userAccount", ["$resource", "appSettings", userAccount]);

    function userAccount($resource, appSettings) {

        let url = new URL("/api/account/register", appSettings.serverPath).href;

        console.log('userAccount - 20210122-0711');

        let options = {
            'registerUser': { method: 'post' }
        };

        return $resource(url, null, options);

    }

}());

