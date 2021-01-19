using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

// 01/19/2021 03:52 pm - SSN - [20210119-1544] - [001] - M03-02 - Building the Web API model
// Copied from downloaded code

// namespace APM.WebAPI.Models
namespace PS_APM_WebAPI_266.Models
{
    public class Product
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ProductCode { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public DateTime ReleaseDate { get; set; }

    }
}