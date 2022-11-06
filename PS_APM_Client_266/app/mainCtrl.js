
// 01/22/2021 06:00 am - SSN - [20210122-0530] - [001] - M10-02 - Building a login form



let thisMod_108 = (function () {

    'use strict';

    angular.module("productManagement")
        .controller("MainCtrl", ["$scope", "exceptionHandler", "userAccount", "currentUser", MainCtrl]);

    function MainCtrl($scope, exceptionHandler, userAccount, currentUser) {

        var vm = this;

        vm.isLoggedIn = function () {

            return currentUser.getProfile().isLoggedIn;
        };

        vm.isRegistering = false;

        vm.message = "";
        vm.messageClassName = "alert alert-info";

        vm.menuOptionSelected = 1;



        // 11/05/2022 06:12 pm - SSN - Add listener

        $scope.$on('EVENT_SHOW_PRODUCT_LIST', function () {

            console.log('xxxxxxxx  EVENT_SHOW_PRODUCT_LIST');
            vm.menuOptionSelected = 1;

        });

        // 05/31/2021 11:46 am - SSN - [20210531-1040] - [008] - Deploy to Azure

        vm.resetUserData = function () {

            vm.userData = {
                userName: "",
                email: "",
                password: "",
                confirmPassword: ""
            };

        }

        vm.requestToRegister = function (option) {

            vm.isRegistering = option;

        }


        // 11/05/2022 12:41 pm - SSN - Set test usrename/password
        vm.setTestUserNamePassword = function () {

            console.log('mainCtrl-20221105-124 - setTestUserNamePassword');
            vm.userData = {
                userName: "",
                email: "test@test.com",
                password: "Test_User$_1201",
                confirmPassword: ""
            };

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

                    vm.message = exceptionHandler.getErrorResponseMessage("20210122-0708-mainCtrl-001", response);

                }
            )

        }

        vm.login = function () {

            // 01/22/2021 09:40 am - SSN - [20210122-0839] - [002] - M10-04 - Logging the user in

            console.log("Calling login");

            vm.messageClassName = "alert alert-info";
            vm.message = "Logging in...."


            console.log('%c ' + '20220926-2146', 'color:yellow;font-size:12px;');
            console.dir('vm.userData:');
            console.dir(vm.userData);

            console.dir('userAccount.login:-1');

            if (vm.userData == undefined) {
                vm.messageClassName = "alert alert-danger";
                vm.message = "User name and password are required";
                return;
            }

            console.dir('userAccount.login-2:');
            console.dir(userAccount);


            console.dir('userAccount.login-3:');
            console.dir(userAccount.login);


            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            userAccount.login.loginUser(vm.userData, function (data) {

                console.log('20210122-0947-login');
                console.log('data:');
                console.log(data);

                vm.message = "";

                // Todo 11/05/2022 02:30 pm - SSN - Why?
                // vm.password = "";


                // 01/22/2021 01:43 pm - SSN - [20210122-1329] - [002] - M11-03 - Accessing a resource using an authorization header
                currentUser.setProfile(vm.userData.userName, data.access_token);

            },

                function (errorResponse) {

                    console.log('20210122-0948-login-error');
                    console.log('errorResponse:');
                    console.log(errorResponse);

                    vm.messageClassName = "alert alert-danger";

                    vm.message = exceptionHandler.getErrorResponseMessage("20210122-0708-mainCtrl-002", errorResponse);

                }
            )
        }

        // 05/31/2021 11:07 am - SSN - [20210531-1040] - [002] - Deploy to Azure 

        vm.logout = function () {





            userAccount.logout.logoutUser(vm.userData, function (data) {

                console.log('20210531-1111-logout');
                console.log('data:');
                console.log(data);

                currentUser.logout();

                vm.resetUserData();


            },

                function (errorResponse) {

                    console.log('20210531-1111-logout-error');
                    console.log('errorResponse:');
                    console.log(errorResponse);

                    vm.messageClassName = "alert alert-danger";

                    vm.message = exceptionHandler.getErrorResponseMessage("20210531-1111-mainCtrl", errorResponse);

                }
            )



        }



        vm.setMenuOption = function (value) {
            vm.menuOptionSelected = value;
        }

    }

    //}());
});


window.mods = window.mods || [];
window.mods.push(thisMod_108);
