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
using System.Web.Http.OData;

// 01/19/2021 04:04 pm - SSN - [20210119-1601] - [001] - M03-04 - Building the Web API Controller

namespace PS_APM_WebAPI_266.Controllers
{


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
                actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

                // Access to XMLHttpRequest at 'http://localhost:58543/api/products/5' from origin 'http://localhost:53772' has been blocked by CORS policy: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.
                actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Headers", "content-type");
            }
            base.OnActionExecuted(actionExecutedContext);
        }

    }

    // 01/20/2021 06:03 am - SSN - [20210120-0517] - [002] - M04-03 - Enabling CORS in a Web API service

    // [EnableCors("http://localhost:53772", "*", "*")]

    [CustomEnableCORS]
    public class ProductsController : ApiController
    {
        // GET: api/Products
        //  [SwitchableAuthorization]

        // 01/20/2021 04:09 pm - SSN - [20210120-1601] - [001] - M06-02 Enabling OData queries in a Web API service
        //public IEnumerable<Product> Get()
        [EnableQuery]
        // 01/21/2021 11:39 am - SSN - [20210121-1126] - [001] - M08 - 02 - Action results - Server
        // public IQueryable<Product> Get()
        public IHttpActionResult Get()
        {
            var productRepository = new ProductRepository();
            // return productRepository.Retrieve().AsQueryable();
            return Ok(productRepository.Retrieve().AsQueryable());
        }



        // 01/20/2021 10:05 am - SSN - [20210120-0928] - [002] - M05-02 - Defining query strings

        public IEnumerable<Product> Get(string search, string targetField)
        {
            var productRepository = new ProductRepository();

            var results = productRepository.Retrieve();

            if (targetField == "name")
            {
                results = results.Where(r => r.ProductName.ToUpper().Contains(search.ToUpper())).ToList();
            }
            else
            {
                results = results.Where(r => r.ProductCode.ToUpper().Contains(search.ToUpper())).ToList();
            }

            return results;

        }


        // 01/20/2021 06:41 pm - SSN - [20210120-1839] - [001] - M07-02 - Building the Web API service methods 

        // 01/21/2021 11:43 am - SSN - [20210121-1126] - [003] - M08 - 02 - Action results - Server
        // IHttpActionResult
        // public Product Get(int id)
        public IHttpActionResult Get(int id)
        {

            var productRepository = new ProductRepository();

            if (id > 0)
            {
                Product product = productRepository.Retrieve().Where(r => r.ProductId == id).FirstOrDefault();
                if (product == null) return NotFound();
                return Ok(product);
            }
            else
                return Ok(productRepository.Create());


        }


        // 01/20/2021 06:51 pm - SSN - [20210120-1839] - [002] - M07-02 - Building the Web API service methods 
        // POST: api/Products
        // 01/21/2021 11:47 am - SSN - [20210121-1126] - [004] - M08 - 02 - Action results - Server
        // IHttpActionResult
        // public void Post([FromBody]Product product)
        public IHttpActionResult Post([FromBody]Product product)
        {
            if (product == null)
            {
                return BadRequest("Product cannot be null [PS_APM_WebAPI_20210121_1151].");
            }
            var productRepository = new ProductRepository();
            Product newProduct = productRepository.Save(product);

            if (newProduct == null)
            {
                return Conflict();
            }

            return Created<Product>(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);

        }


        // 01/20/2021 06:52 pm - SSN - [20210120-1839] - [003] - M07-02 - Building the Web API service methods 
        // PUT: api/Products/5

        [HttpPut]

        // 01/21/2021 11:54 am - SSN - [20210121-1126] - [005] - M08 - 02 - Action results - Server
        //IHttpActionResult

        //public void Put(int id, [FromBody]Product product)
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            if (id <= 0) return BadRequest("Invalid ID provided.");

            if (product is null) return BadRequest("Product cannot be null.");

            var productRepository = new ProductRepository();
            Product updatedProduct = productRepository.Save(id, product);
            if (updatedProduct == null)
            {
                return NotFound();
            }

            return Ok(updatedProduct);
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }


        // 01/21/2021 11:42 am - SSN - [20210121-1126] - [002] - M08 - 02 - Action results - Server
        // Commented out.  Didn't seem to have an impact after adding Access-Control-Allow-Headers

        //// 01/21/2021 09:54 am - SSN - [20210121-0822] - [004] - M07-04 - Call the Web API to save the data
        //// To fullfil requests to OPTIONS method.
        //public string Options()
        //{
        //    return null; // HTTP 200 response with empty body
        //}




    }
}
