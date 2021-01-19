using PS_APM_WebAPI_266.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

// 01/19/2021 04:04 pm - SSN - [20210119-1601] - [001] - M03-04 - Building the Web API Controller

namespace PS_APM_WebAPI_266.Controllers
{
    public class ProductsController : ApiController
    {
        // GET: api/Products
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
