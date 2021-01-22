using PS_APM_WebAPI_266.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Http.OData;

// 01/19/2021 04:04 pm - SSN - [20210119-1601] - [001] - M03-04 - Building the Web API Controller

namespace PS_APM_WebAPI_266.Controllers
{



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

        // 01/21/2021 01:06 pm - SSN - [20210121-1221] - [001] - M08 - 04 - Exception handling
        // Add ResponseType
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            // 01/21/2021 01:13 pm - SSN - [20210121-1221] - [003] - M08 - 04 - Exception handling
            // Add try/catch block
            try
            {
                var productRepository = new ProductRepository();
                // return productRepository.Retrieve().AsQueryable();
                return Ok(productRepository.Retrieve().AsQueryable());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



        // 01/20/2021 10:05 am - SSN - [20210120-0928] - [002] - M05-02 - Defining query strings


        // public IEnumerable<Product> Get(string search, string targetField)
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get(string search, string targetField)
        {
            // 01/21/2021 01:13 pm - SSN - [20210121-1221] - [003] - M08 - 04 - Exception handling
            // Add try/catch block

            try
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

                if (results == null)
                {
                    return NotFound();
                }
                return Ok(results);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }


        // 01/20/2021 06:41 pm - SSN - [20210120-1839] - [001] - M07-02 - Building the Web API service methods 

        // 01/21/2021 11:43 am - SSN - [20210121-1126] - [003] - M08 - 02 - Action results - Server
        // IHttpActionResult
        // public Product Get(int id)

        // 01/21/2021 01:06 pm - SSN - [20210121-1221] - [001] - M08 - 04 - Exception handling
        // Add ResponseType
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get(int id)
        {


            // 01/21/2021 01:12 pm - SSN - [20210121-1221] - [002] - M08 - 04 - Exception handling
            // Add try/catch block

            try
            {
                var productRepository = new ProductRepository();

                if (id > 0)
                {

                    Product product = productRepository.Retrieve().Where(r => r.ProductId == id).FirstOrDefault();
                    if (product == null) return NotFound();
                    return Ok(product);
                }
                else
                {
                    return Ok(productRepository.Create());
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


        }


        // 01/20/2021 06:51 pm - SSN - [20210120-1839] - [002] - M07-02 - Building the Web API service methods 
        // POST: api/Products
        // 01/21/2021 11:47 am - SSN - [20210121-1126] - [004] - M08 - 02 - Action results - Server
        // IHttpActionResult
        // public void Post([FromBody]Product product)

        // 01/21/2021 01:06 pm - SSN - [20210121-1221] - [001] - M08 - 04 - Exception handling
        // Add ResponseType
        [ResponseType(typeof(Product))]
        public IHttpActionResult Post([FromBody]Product product)
        {
            // 01/21/2021 01:13 pm - SSN - [20210121-1221] - [003] - M08 - 04 - Exception handling
            // Add try/catch block

            try
            {


                if (product == null)
                {
                    return BadRequest("Product cannot be null [PS_APM_WebAPI_20210121_1151].");
                }


                // 01/21/2021 05:48 pm - SSN - [20210121-1735] - [002] - M08-05 - Validation 
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var productRepository = new ProductRepository();
                Product newProduct = productRepository.Save(product);

                if (newProduct == null)
                {
                    return Conflict();
                }

                return Created<Product>(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }


        // 01/20/2021 06:52 pm - SSN - [20210120-1839] - [003] - M07-02 - Building the Web API service methods 
        // PUT: api/Products/5


        // 01/21/2021 05:49 pm - SSN - [20210121-1735] - [003] - M08-05 - Validation 
        // Test turning off. Post method is not decorated.
        // [HttpPut]

        // 01/21/2021 11:54 am - SSN - [20210121-1126] - [005] - M08 - 02 - Action results - Server
        //IHttpActionResult

        //public void Put(int id, [FromBody]Product product)

        // 01/21/2021 01:06 pm - SSN - [20210121-1221] - [001] - M08 - 04 - Exception handling
        // Add ResponseType
        [ResponseType(typeof(Product))]
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            if (id <= 0) return BadRequest("Invalid ID provided.");

            if (product is null) return BadRequest("Product cannot be null.");


            // 01/21/2021 05:48 pm - SSN - [20210121-1735] - [002] - M08-05 - Validation 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // 01/21/2021 01:13 pm - SSN - [20210121-1221] - [003] - M08 - 04 - Exception handling
            // Add try/catch block

            try
            {

                var productRepository = new ProductRepository();
                Product updatedProduct = productRepository.Save(id, product);
                if (updatedProduct == null)
                {
                    return NotFound();
                }

                return Ok(updatedProduct);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }



        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }


        // 01/21/2021 11:42 am - SSN - [20210121-1126] - [002] - M08 - 02 - Action results - Server
        // Commented out.  Didn't seem to have an impact after adding Access-Control-Allow-Headers

        //// 01/21/2021 09:54 am - SSN - [20210121-0822] - [004] - M07-04 - Call the Web API to save the data
        //// To fullfil requests to OPTIONS method.

        // 01/21/2021 02:15 pm - SSN - [20210121-1221] - [004] - M08 - 04 - Exception handling
        // Testing Put failed without this.
        public string Options()
        {
            return null; // HTTP 200 response with empty body
        }




    }
}
