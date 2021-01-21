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


        let id = 0; // To add
        //let id = 5; // To edit

        productResource.urlWithOptionalId.get({ id: id },
            function (data) {

                console.log('20210121-0807-2 - productEditCtrl - get success');
                console.log(data);

                vm.product = data;
                vm.originalProduct = angular.copy(data);
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
                        console.log("20210121-0924 - Submit save failure");
                        console.log(error);
                    });
            }
        };

        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = "";
        };

    }
}());
