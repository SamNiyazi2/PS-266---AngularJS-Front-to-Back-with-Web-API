
// 01/22/2021 06:00 am - SSN - [20210122-0530] - [001] - M10-02 - Building a login form

(function () {

    'use strict';

    angular.module("productManagement")
        .controller("MainCtrl", ["userAccount", MainCtrl]);

    function MainCtrl(userAccount) {

        var vm = this;

        vm.isLoggedIn = false;
        vm.message = "";
        vm.userData = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        vm.registerUser = function () {

        }

        vm.login = function () {

        }


    }

}());

