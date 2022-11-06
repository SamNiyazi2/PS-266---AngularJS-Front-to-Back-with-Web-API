

let thisMod_106 = (function () {

    "use strict";

    // 11/05/2022 05:22 pm - SSN - Inject $scope for $watch

    angular
        .module("productManagement")
        .controller("ProductListCtrl",
            ["$scope", "productResource", ProductListCtrl]);

    function ProductListCtrl($scope, productResource) {

        var vm = this;

        vm.fields = ["ProductName", "ProductCode", "Price"];
        vm.fieldName = "ProductName";


        // 11/05/2022 05:17 pm - SSN - Added watches
        $scope.$watch('vm.searchOption', function (newVal, oldVal) { vm.fieldName = newVal; });
        $scope.$watch('vm.fieldName', function (newVal, oldVal) { vm.searchOption = newVal; });


        // 01/20/2021 09:41 am - SSN - [20210120-0928] - [001] - M05-02 - Defining query strings
        vm.searchText = "";
        vm.searchOption = "ProductName";

        vm.handleSuccess = function (data) {
            vm.products = data;
        }

        vm.doSearch = function () {

            if (vm.searchText) {

                let searchText1 = vm.searchText;

                if (searchText1.indexOf("?") > -1) {
                    //let searchQuery = ;
                    //productResource.urlWithSearch.query(searchQuery, vm.handleSuccess);

                } else {
                    let searchQuery = { search: vm.searchText, targetField: vm.searchOption };
                    productResource.urlWithSearch.query(searchQuery, vm.handleSuccess);
                }
            }
            else {
                productResource.urlWithOptionalId.query(vm.handleSuccess);

            }

        }

        // 01/19/2021 05:37 pm - SSN - [20210119-1708] - [003] - M03-06 - Calling the Web API from Angular
        vm.doSearch();

    }

    // ???? }());
});



window.mods = window.mods || [];
window.mods.push(thisMod_106);
