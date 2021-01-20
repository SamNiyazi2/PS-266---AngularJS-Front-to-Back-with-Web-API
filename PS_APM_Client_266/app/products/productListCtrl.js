(function () {

    "use strict";

    angular
        .module("productManagement")
        .controller("ProductListCtrl",
            ["productResource", ProductListCtrl]);

    function ProductListCtrl(productResource) {

        var vm = this;

        vm.fields = ["ProductName", "ProductCode", "Price"];
        vm.FieldName = "";


        // 01/20/2021 09:41 am - SSN - [20210120-0928] - [001] - M05-02 - Defining query strings
        vm.searchText = "";
        vm.searchOption = "code";

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
                productResource.urlWithOptionalId.query(vm.handleSuccess );

            }

        }

        // 01/19/2021 05:37 pm - SSN - [20210119-1708] - [003] - M03-06 - Calling the Web API from Angular
        vm.doSearch();
        
    }

}());
