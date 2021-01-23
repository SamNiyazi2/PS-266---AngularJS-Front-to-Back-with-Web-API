using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace PS_APM_WebAPI_266.Controllers
{
    // 01/22/2021 08:26 am - SSN - [20210122-0613] - [005] - M10-03 - Registering the user
    // Moved out of ProductsController.cs

    // https://forums.asp.net/t/1926835.aspx?Access+Control+Allow+Origin
    public class CustomEnableCORSAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext.Response != null)
            {
                actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:53772");
                //actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

                // Access to XMLHttpRequest at 'http://localhost:58543/api/products/5' from origin 'http://localhost:53772' has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
                actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

                // Access to XMLHttpRequest at 'http://localhost:58543/api/products/5' from origin 'http://localhost:53772' has been blocked by CORS policy: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.
                actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Headers", "content-type,Authorization");
            }
            base.OnActionExecuted(actionExecutedContext);
        }

    }

}