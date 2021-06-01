"use strict";



function mainApp() {

    // 01/19/2021 05:40 pm - SSN - [20210119-1708] - [004] - M03-06 - Calling the Web API from Angular
    // Add "common.services"


    //     var app = angular.module("productManagement", ["common.services"]);
    angular.module("productManagement", ["common.services"]);

  

    for (const mod in window.mods) {
        (window.mods[mod])();
    }

    $("#messageDiv").addClass("cssHidden");
    $("#mainDiv").removeClass("cssHidden");

};





(async () => {

    fetch('/app/settings101.js').then(response => response.json()).then(settings => {

        console.log('999999999999999999999999999999');
        console.log(settings)

        window.baseUrl = settings.apiUrl;
        console.log(window.baseUrl )
        mainApp(  );

        angular.bootstrap(document, ['productManagement']);

    }, error => {

            console.log("Failed to locate file");
            console.log(error);

            $("#messageDiv").html("Failed to load system.");
         
    });

})();

