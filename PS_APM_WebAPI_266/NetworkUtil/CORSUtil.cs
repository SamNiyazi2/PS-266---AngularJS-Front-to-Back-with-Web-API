using PS_APM_WebAPI_266.Util;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;

// 05/31/2021 11:33 pm - SSN - [20210531-2330] - [002] - Validating callers

namespace PS_APM_WebAPI_266.NetworkUtil
{

    public class CORSUtil
    {

        public static bool apiConsumerIsAuthorized(out string consumerHostName_v3, bool testing = false)
        {
            // 11/06/2022 10:03 am - SSN - Added for testing with Postman
            if ( HttpContext.Current.Request.UrlReferrer == null)
            {
                consumerHostName_v3 = null;
                AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "20221105-1545", Error = "UrlReferrer is null" });
                return false;
            }

            consumerHostName_v3 = HttpContext.Current.Request.UrlReferrer.AbsoluteUri;

            AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "101", Consumer = consumerHostName_v3 });


            string authorizedUrls = ConfigurationManager.AppSettings.Get("AuthorizedUrls");

            if (string.IsNullOrWhiteSpace(authorizedUrls))
            {
                AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "102", Consumer = consumerHostName_v3, Error = "No authorizedUrls" });

                return false;
            }

            AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "101B", authorizedUrls });

            string[] approvedConsumers = authorizedUrls.Split(new char[] { ',', ' ', ';' });

            string temp_consumerHostName = consumerHostName_v3;

            string foundRecord = approvedConsumers.FirstOrDefault(r => r.ToLower() == temp_consumerHostName.ToLower());


            if (string.IsNullOrWhiteSpace(foundRecord) || testing)
            {
                // For debugging only
                AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "105", Consumer = consumerHostName_v3, Result = "No match" });

                foreach (string consumer in approvedConsumers)
                {
                    AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "106", Approved_Consumer = consumer, Action = "Report" });
                }
            }

            bool isApproved = !string.IsNullOrWhiteSpace(foundRecord);


            if (isApproved)
            {

                int locationOfLastSlash = consumerHostName_v3.IndexOf('/', 8);
                if (locationOfLastSlash > 0)
                {
                    AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "991", Consumer = consumerHostName_v3, Action = "Format" });
                    consumerHostName_v3 = consumerHostName_v3.Substring(0, locationOfLastSlash);
                    AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "992", Consumer = consumerHostName_v3, Action = "Format" });
                }

            }

            AppInsigtUtil.TrackEvent("apiConsumerIsAuthorized", new { Step = "999", Approved_Consumer = consumerHostName_v3, Approved = isApproved });

            return isApproved;

        }






        public static string test()
        {

            StringBuilder sb = new StringBuilder();

            string consumerHostName = null;

            if (HttpContext.Current.Request.UrlReferrer != null)
            {
                consumerHostName = HttpContext.Current.Request.UrlReferrer.AbsoluteUri;
            }

            sb.AppendLine(consumerHostName);

            string authorizedUrls = ConfigurationManager.AppSettings.Get("AuthorizedUrls");

            List<string> approvedConsumers = authorizedUrls.Split(new char[] { ',', ' ', ';' }).ToList();

            foreach (string consumer in approvedConsumers)
            {
                sb.AppendLine(consumer);

            }

            return sb.ToString();
        }



    }

}