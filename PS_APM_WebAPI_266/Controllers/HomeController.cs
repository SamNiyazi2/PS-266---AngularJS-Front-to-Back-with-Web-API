using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace PS_APM_WebAPI_266.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            IndexPage model = new IndexPage();

            model.TestData = NetworkUtil.CORSUtil.test();

            return View(model);
        }

       


    }


    public class IndexPage
    { 
        public string Title { get; set; }
        public string TestData { get; set; }

    }
}
