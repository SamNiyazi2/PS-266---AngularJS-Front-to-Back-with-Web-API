

(function () {
    "use strict";

    // 01/21/2021 08:03 am - SSN - [20210121-0803] - [001] - M03-03- Demo: Understanding the grid system
    // Inject productResource

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
            ProductEditCtrl);


    function ProductEditCtrl(exceptionHandler, productResource) {

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

            vm.mesageClassName = "alert alert-success";

            if (vm.product.productId) {
                // 01/21/2021 08:32 am - SSN - [20210121-0822] - [002] - M07-04 - Call the Web API to save the data
                // Renamed $update to $update_custom to highight

                vm.product.$update_custom({ id: vm.product.productId },
                    function (data) {
                        vm.message = "... Save Complete";
                    },
                    function (error) {

                        vm.handleRrror("Error-002", error);
                    });
            }
            else {
                // $save is built in.

                vm.product.$save(
                    function (data) {
                        vm.originalProduct = angular.copy(data);

                        vm.message = "... Save Complete";
                    },
                    function (error) {
                        vm.handleRrror("Error-003", error);
                    });
            }
        };



        vm.handleRrror = function (callSource, error) {

            vm.message = exceptionHandler.getErrorResponseMessage(callSource, error);

            vm.mesageClassName = "alert alert-danger";




        }


        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = "";
            vm.mesageClassName = "alert alert-info";
        };

    }
}());
