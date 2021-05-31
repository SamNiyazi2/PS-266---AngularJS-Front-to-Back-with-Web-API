
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


// 05/31/2021 11:40 am - SSN - [20210531-1040] - [007] - Deploy to Azure 
        let logout = function () {

            profile.username = '';
            profile.token = '';
            profile.isLoggedIn = false;

        }



        return {
            setProfile: setProfile,
            getProfile: getProfile,
            logout: logout
        }
    }

}());

