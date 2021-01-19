(function () {

    "use strict";

    angular
        .module("productManagement")
        .controller("ProductListCtrl",
            ["productResource", ProductListCtrl]);

    function ProductListCtrl(productResource) {

        var vm = this;

        // 01/19/2021 05:37 pm - SSN - [20210119-1708] - [003] - M03-06 - Calling the Web API from Angular

        productResource.query(function (data) {
            vm.products = data;
        });


    }
}());
