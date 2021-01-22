using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

// 01/19/2021 03:52 pm - SSN - [20210119-1544] - [001] - M03-02 - Building the Web API model
// Copied from downloaded code

// namespace APM.WebAPI.Models
namespace PS_APM_WebAPI_266.Models
{
    public class Product
    {
        // 01/21/2021 05:40 pm - SSN - [20210121-1735] - [001] - M08-05 - Validation 
        // Add validation rules

        public string Description { get; set; }
        public decimal Price { get; set; }

        [Required]
        [Display(Name = "Product code")]
        public string ProductCode { get; set; }

        public int ProductId { get; set; }

        [Required(ErrorMessage = "Product name is required", AllowEmptyStrings = false)]
        [MinLength(4, ErrorMessage = "Product name minimum length is {1} characters")]
        [MaxLength(12, ErrorMessage = "Product name maximum length is {1} characters")]
        public string ProductName { get; set; }

        public DateTime ReleaseDate { get; set; }

    }
}