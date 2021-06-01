using Microsoft.ApplicationInsights;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

// 06/01/2021 02:13 am - SSN - [20210531-2330] - [004] - Validating callers

namespace PS_APM_WebAPI_266.Util
{
    public class AppInsigtUtil
    {
        private static TelemetryClient telemetry = new TelemetryClient();

        public static void TrackEvent(string msg, object props)
        {
            
            var _props2 = props.ToDictionary<string>();

            telemetry.TrackEvent(msg, _props2);

        }


        public static void TrackPageView(string pageName)
        {
                telemetry.TrackPageView(pageName);
        }



    }



    // https://gist.githubusercontent.com/jarrettmeyer/798667/raw/a87f9bcac2ec68541511f17da3c244c0e05bdc49/ObjectToDictionaryHelper.cs

    public static class ObjectToDictionaryHelper
    {
        public static IDictionary<string, object> ToDictionary(this object source)
        {
            return source.ToDictionary<object>();
        }

        public static IDictionary<string, T> ToDictionary<T>(this object source)
        {
            if (source == null) ThrowExceptionWhenSourceArgumentIsNull();

            var dictionary = new Dictionary<string, T>();
            foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(source))
            {
                object value = property.GetValue(source);
                if (IsOfType<T>(value))
                {
                    dictionary.Add(property.Name, (T)value);
                }
            }
            return dictionary;
        }

        private static bool IsOfType<T>(object value)
        {
            return value is T;
        }

        private static void ThrowExceptionWhenSourceArgumentIsNull()
        {
            throw new NullReferenceException("Unable to convert anonymous object to a dictionary. The source anonymous object is null.");
        }
    }


}
