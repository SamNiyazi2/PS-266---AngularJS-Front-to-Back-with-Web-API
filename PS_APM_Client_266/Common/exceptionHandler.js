

// 01/22/2021 06:49 am - SSN - [20210122-0613] - [002] - M10-03 - Registering the user


const thisMod_102 = (function () {

    'use strict';

    angular.module("common.services").factory("exceptionHandler", exceptionHandler);

    function exceptionHandler() {



        function getErrorResponseMessage(callSource, errorResponse) {

            console.log('20210122-0652 - ExceptionHandler');
            console.log(callSource);
            console.log(errorResponse);

            let lf = "\r\n";


            let message = "Server error: " + errorResponse.status + " - " + errorResponse.statusText + lf + lf;

            if (errorResponse.data && errorResponse.data.exceptionMessage) {

                message += errorResponse.data.exceptionMessage + lf;
            }

            if (errorResponse.data && errorResponse.data.error) {

                message += errorResponse.data.error + ": " + errorResponse.data.error_description + lf;
            }

            if (errorResponse.data && errorResponse.data.modelState) {

                message += "Invalid input:" + lf + lf;

                angular.forEach(errorResponse.data.modelState, (fieldNameEntry) => {
                    fieldNameEntry.forEach(errorMessage => {
                        message += errorMessage + lf;
                    })
                });


            }

            console.log('20210122-0749 - exceptionHander: ')
            console.log('Returned message:');
            console.log(message);

            return message;
        }




        return {

            getErrorResponseMessage: getErrorResponseMessage
        };

    }


 //}());
});


window.mods = window.mods || [];
window.mods.push(thisMod_102);

