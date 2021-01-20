(function () {

    "use strict";

    angular
        .module("productManagement")
        .controller("ProductListCtrl",
            ["productResource", ProductListCtrl]);

    function ProductListCtrl(productResource) {

        var vm = this;


        // 01/20/2021 09:41 am - SSN - [20210120-0928] - [001] - M05-02 - Defining query strings
        vm.searchText = "";
        vm.searchOption = "code";

        vm.doSearch = function () {

            let searchQuery = {};

            if (vm.searchText) {

                searchQuery = { search: vm.searchText, targetField: vm.searchOption };
            }

            productResource.query(searchQuery, function (data) {
                vm.products = data;
            });
        }

        // 01/19/2021 05:37 pm - SSN - [20210119-1708] - [003] - M03-06 - Calling the Web API from Angular
        vm.doSearch();



    }
}());
