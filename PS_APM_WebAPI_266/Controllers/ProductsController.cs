using PS_APM_WebAPI_266.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Cors;
using System.Web.Http.Filters;

// 01/19/2021 04:04 pm - SSN - [20210119-1601] - [001] - M03-04 - Building the Web API Controller

namespace PS_APM_WebAPI_266.Controllers
{


    // https://forums.asp.net/t/1926835.aspx?Access+Control+Allow+Origin
    public class AllowCrossSiteJsonAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {

                if (actionExecutedContext.Response != null)
                    actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:53772");


            base.OnActionExecuted(actionExecutedContext);
        }
    }

    // 01/20/2021 06:03 am - SSN - [20210120-0517] - [002] - M04-03 - Enabling CORS in a Web API service

    // [EnableCors("http://localhost:53772", "*", "*")]

    [AllowCrossSiteJson]
    public class ProductsController : ApiController
    {
        // GET: api/Products
        //  [SwitchableAuthorization]

        public IEnumerable<Product> Get()
        {

            var productRepository = new ProductRepository();
            return productRepository.Retrieve();
        }

        // GET: api/Products/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Products
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Products/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}
