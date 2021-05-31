
// 01/22/2021 06:00 am - SSN - [20210122-0530] - [001] - M10-02 - Building a login form

(function () {

    'use strict';

    angular.module("productManagement")
        .controller("MainCtrl", ["exceptionHandler", "userAccount", "currentUser", MainCtrl]);

    function MainCtrl(exceptionHandler, userAccount, currentUser) {

        var vm = this;

        vm.isLoggedIn = function () {

            return currentUser.getProfile().isLoggedIn;
        };

        vm.isRegistering = false;

        vm.message = "";
        vm.messageClassName = "alert alert-info";

        vm.menuOptionSelected = 2;


        vm.userData = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };


        vm.requestToRegister = function (option) {

            vm.isRegistering = option;

        }

        vm.registerUser = function () {

            vm.message = "";
            vm.messageClassName = "alert alert-success";


            userAccount.register.registerUser(vm.userData, function (data) {
                vm.confirmPassword = "";
                vm.message = "Registraton successful!";
                vm.isRegistering = false;
                vm.login();
            },
                function (response) {

                    vm.messageClassName = "alert alert-danger";

                    vm.message = exceptionHandler.getErrorResponseMessage("20210122-0708-mainCtrl", response);

                }
            )

        }

        vm.login = function () {

            // 01/22/2021 09:40 am - SSN - [20210122-0839] - [002] - M10-04 - Logging the user in

            console.log("Calling login");

            vm.messageClassName = "alert alert-info";
            vm.message = "Logging in...."

            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            userAccount.login.loginUser(vm.userData, function (data) {

                console.log('20210122-0947-login');
                console.log('data:');
                console.log(data);

                vm.message = "";
                vm.password = "";


                // 01/22/2021 01:43 pm - SSN - [20210122-1329] - [002] - M11-03 - Accessing a resource using an authorization header
                currentUser.setProfile(vm.userData.userName, data.access_token);

            },

                function (errorResponse) {

                    console.log('20210122-0948-login-error');
                    console.log('errorResponse:');
                    console.log(errorResponse);

                    vm.messageClassName = "alert alert-danger";

                    vm.message = exceptionHandler.getErrorResponseMessage("20210122-0708-mainCtrl", errorResponse);

                }
            )
        }


        vm.setMenuOption = function (value) {
            vm.menuOptionSelected = value;
        }

    }

}());

