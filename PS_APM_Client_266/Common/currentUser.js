
// 01/22/2021 01:36 pm - SSN - [20210122-1329] - [001] - M11-03 - Accessing a resource using an authorization header

(function () {

    'use strict';

    angular.module("common.services").factory("currentUser", currentUser);

    function currentUser() {

        let profile = {
            isLoggedIn: false,
            username: "",
            token: ""
        };


        let setProfile = function (username, token) {

            profile.username = username;
            profile.token = token;
            profile.isLoggedIn = true;

        }


        let getProfile = function () {

            return profile;
        }


        return {
            setProfile: setProfile,
            getProfile: getProfile
        }
    }

}());

