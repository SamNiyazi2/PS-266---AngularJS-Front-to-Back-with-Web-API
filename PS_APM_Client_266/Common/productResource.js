
// 01/19/2021 05:28 pm - SSN - [20210119-1708] - [002] - M03-06 - Calling the Web API from Angular

// 01/22/2021 02:10 pm - SSN - [20210122-1329] - [003] - M11-03 - Accessing a resource using an authorization header
// Add currentUser to pass token.



const thisMod_103 = (function () {

    'use strict';

    angular
        .module("common.services")
        .factory("productResource", ["$resource", "appSettings", "currentUser", "$http", productResource]);

    function productResource($resource, appSettings, currentUser, $http) {

        // Url , base-url
        let url_withId = new URL("/api/products/:id", appSettings.serverPath).href;
        let url_withSearch = new URL("/api/products/:targetField/:search", appSettings.serverPath).href;

        // 01/20/2021 01:08 pm - SSN - [20210120-1304] - [001] - M05-03 - Extending the URL path
        // 01/21/2021 08:31 am - SSN - [20210121-0822] - [001] - M07-04 - Call the Web API to save the data
        // Add update_custom



        $http.defaults.headers.common['Authorization'] = 'Bearer ' + currentUser.getProfile().token;


        return {
            urlWithOptionalId: $resource(url_withId, null, {
                "update_custom": {
                    method: "PUT",
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                },
                "get": {
                    // headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                }
                //,
                //"save": {
                //    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                //},

            }),
            urlWithSearch: $resource(url_withSearch, null, {
                "get": {
                    //  headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                }
            })
        };

    }

//}());
});


window.mods = window.mods || [];
window.mods.push(thisMod_103);
