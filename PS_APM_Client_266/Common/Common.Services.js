
// 01/19/2021 05:08 pm - SSN - [20210119-1708] - [001] - M03-06 - Calling the Web API from Angular


let thisMod_101 = (function () {

    'use strict';

    const commonServiceModule = angular.module("common.services", ["ngResource"]);

    commonServiceModule.constant("appSettings", {
        serverPath: window.baseUrl
    });
    
//}());
});


window.mods = window.mods || [];
window.mods.push(thisMod_101);

