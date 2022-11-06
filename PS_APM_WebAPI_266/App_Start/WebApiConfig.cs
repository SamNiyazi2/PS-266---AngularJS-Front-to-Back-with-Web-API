using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace PS_APM_WebAPI_266
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {


            // 01/20/2021 09:14 am - SSN - [20210120-0900] - [001] - M04-05 - Configuring the JSON formatter
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();




            // 11/06/2022 08:45 am - SSN - Add setupCors
            // // 01/20/2021 05:41 am - SSN - [20210120-0517] - [001] - M04-03 - Enabling CORS in a Web API service
            // config.EnableCors();
            setupCors(config);


            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.

            // 01/19/2021 02:02 pm - SSN - [20210119-1402] - [001] - M02-06 - Anatomy of an ASP.NET Web API service
            // Turn off for now
            // 01/22/2021 01:19 pm - SSN - [20210122-1316] - [001] - M11-02 - Protecting a resource with the authorize attribute 
            // Turn back on



            // Todo: Can we leave these out?
            // 06/01/2021 01:37 pm - SSN - [20210531-2330] - [006] - Validating callers

            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));








            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // 01/20/2021 01:11 pm - SSN - [20210120-1304] - [002] - M05-03 - Extending the URL path

            config.Routes.MapHttpRoute(
                name: "Api_SearchOption",
                routeTemplate: "api/{controller}/{targetField}/{search}"
            );


        }



        // 11/06/2022 08:13 am - SSN - Testing overcomming error on second login (after logout)
        // install-package Microsoft.AspNet.WebApi.Cors
        private static void setupCors(HttpConfiguration config)
        {

            config.EnableCors();

            // No impact
            //string origins = "*";
            //string methods = "GET,POST,PUT,DELETE,OPTIONS";
            //string headers = "content-type,Authorization";

            // EnableCorsAttribute cors = new EnableCorsAttribute(origins, headers, methods);
            // config.EnableCors(cors);


        }


    }
}
