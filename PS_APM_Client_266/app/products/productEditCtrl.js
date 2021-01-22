 

(function () {
    "use strict";

    // 01/21/2021 08:03 am - SSN - [20210121-0803] - [001] - M03-03- Demo: Understanding the grid system
    // Inject productResource

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
            ProductEditCtrl);


    function ProductEditCtrl(productResource) {
        var vm = this;
        vm.product = {};
        vm.message = '';
        vm.mesageClassName = "";
        vm.byPassClientValidation = false;


        let id = 0; // To add
        id = 5; // To edit
        //id = 55; // To trigger an error

        productResource.urlWithOptionalId.get({ id: id },
            function (data) {

                console.log('20210121-0807-2 - productEditCtrl - get success');
                console.log(data);

                vm.product = data;
                vm.originalProduct = angular.copy(data);
            },
            function (error) {

                vm.handleRrror("Error-222", error);
            });

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product";
        }

        vm.submit = function () {
            vm.message = '';
            console.log("20210121-0924 - Submit ");
            if (vm.product.productId) {
                // 01/21/2021 08:32 am - SSN - [20210121-0822] - [002] - M07-04 - Call the Web API to save the data
                // Renamed $update to $update_custom to highight

                console.log("20210121-0924 - Submit update");
                vm.product.$update_custom({ id: vm.product.productId },
                    function (data) {
                        vm.message = "... Save Complete";
                    },
                    function (error) {
                        console.log("20210121-0924-2 - Submit update failed");
                        console.log(error);
                        vm.handleRrror("Error-002", error);
                    });
            }
            else {
                // $save is built in.
                console.log("20210121-0924 - Submit save");
                vm.product.$save(
                    function (data) {
                        vm.originalProduct = angular.copy(data);

                        vm.message = "... Save Complete";
                    },
                    function (error) {
                        vm.handleRrror("Error-001", error);
                        console.log("20210121-0924 - Submit save failure");
                        console.log(error);
                        vm.handleRrror("Error-003", error);
                    });
            }
        };

        vm.handleRrror = function (callSource, error) {

            console.log('20210121-1213-C');
            console.log(callSource);
            console.log(error);

            vm.message = "Server error: " + error.status + " - " + error.statusText;
            if (error.data && error.data.exceptionMessage) {

                vm.message += "\r\n" + error.data.exceptionMessage;
            }

            if (error.data && error.data.modelState) {

                vm.message += "\r\n\r\nInvalid input:\r\n";

                angular.forEach(error.data.modelState, (fieldNameEntry) => {
                    fieldNameEntry.forEach(errorMessage => {
                        vm.message += "\r\n" + errorMessage ;
                    })
                });
 

            }

            vm.mesageClassName = "alert alert-danger";




        }
        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = "";
        };

    }
}());
