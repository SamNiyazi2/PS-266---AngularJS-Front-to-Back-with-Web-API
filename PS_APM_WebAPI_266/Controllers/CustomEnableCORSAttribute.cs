using PS_APM_WebAPI_266.Util;
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
            AppInsigtUtil.TrackEvent("CORSAttr", new { Step = "0601-1148-01" });


            if (actionExecutedContext.Response != null)
            {
                // 06/01/2021 12:02 am - SSN - [20210531-2330] - [003] - Validating callers


                bool isApprovied = NetworkUtil.CORSUtil.apiConsumerIsAuthorized(out string consumerHostName);

                AppInsigtUtil.TrackEvent("CORSAttr", new { Step = "0601-1148-02", consumerHostName, Approved = isApprovied, HttpContext.Current.Request.Url.AbsoluteUri });


                if (isApprovied)
                {

                    actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Origin", consumerHostName);


                    // Access to XMLHttpRequest at 'http://localhost:58543/api/products/5' from origin 'http://localhost:53772' has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
                    actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

                    // Access to XMLHttpRequest at 'http://localhost:58543/api/products/5' from origin 'http://localhost:53772' has been blocked by CORS policy: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.
                    actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Headers", "content-type,Authorization");

                }
            }

            base.OnActionExecuted(actionExecutedContext);
        }

    }

}