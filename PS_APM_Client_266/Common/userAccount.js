
// 01/22/2021 06:22 am - SSN - [20210122-0613] - [001] - M10-03 - Registering the user

(function () {

    "use strict";

    angular.module("common.services")
        .factory("userAccount", ["$resource", "appSettings", userAccount]);

    function userAccount($resource, appSettings) {


        let url_register = new URL("/api/account/register", appSettings.serverPath).href;

        // 01/22/2021 09:40 am - SSN - [20210122-0839] - [001] - M10-04 - Logging the user in
        let url_login = new URL("/Token", appSettings.serverPath).href;


        let options_register = { "registerUser": { method: "post" } };

        let options_login = {
            "loginUser": {
                method: "post",
                headers: { "content-type": "application/x-www-form-urlencoded" },
                transformRequest: function (data, headersGetter) {
                    var str = [];
                    for (var d in data) {
                        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                    }
                    return str.join("&");
                }
            }
        };


        return {
            register: $resource(url_register, null, options_register),
            login: $resource(url_login, null, options_login)
        }

    }

}());

