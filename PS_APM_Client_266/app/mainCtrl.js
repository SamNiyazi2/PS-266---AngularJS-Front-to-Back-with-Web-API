
// 01/22/2021 06:00 am - SSN - [20210122-0530] - [001] - M10-02 - Building a login form

(function () {

    'use strict';

    angular.module("productManagement")
        .controller("MainCtrl", ["exceptionHandler", "userAccount", MainCtrl]);

    function MainCtrl(exceptionHandler, userAccount) {

        var vm = this;

        vm.isLoggedIn = false;
        vm.isRegistering = false;

        vm.message = "";
        vm.messageClassName = "alert alert-info";


        vm.userData = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };


        vm.requestToRegister = function (option) {

            vm.isRegistering = option;
            angular.element('[name=userName]').focus();

        }

        vm.registerUser = function () {

            vm.message = "";
            vm.messageClassName = "alert alert-success";


            userAccount.registerUser(vm.userData, function (data) {
                vm.confirmPassword = "";
                vm.message = "Registraton successful!";
                vm.isRegistering = false;
                vm.login();
            },
                function (response) {

                    vm.isLoggedIn = false;
                    vm.messageClassName = "alert alert-danger";

                    vm.message = "";

                    vm.message += exceptionHandler.getErrorResponseMessage("20210122-0708-mainCtrl", response);

                }
            )

        }

        vm.login = function () {

        }


    }

}());

