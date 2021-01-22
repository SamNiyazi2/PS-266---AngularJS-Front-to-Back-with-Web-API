
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

        vm.menuOptionSelected = 1;


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

                    vm.isLoggedIn = false;
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
            vm.token = "";

            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;
            vm.clientId = "MyClientID_101";

            userAccount.login.loginUser(vm.userData, function (data) {

                console.log('20210122-0947-login');
                console.log('data:');
                console.log(data);

                vm.isLoggedIn = true;
                vm.message = "";
                vm.password = "";
                vm.token = data.access_token;

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

