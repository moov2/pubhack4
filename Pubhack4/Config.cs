using System;
using System.Configuration;
namespace Pubhack4
{
    public class Config
    {
        public static string MovieDbApiKey
        {
            get { return ConfigurationManager.AppSettings["MovieDbApiKey"]; }
        }

        public static string VideoGameDbApiKey
        {
            get { return ConfigurationManager.AppSettings["VideoGameDbApiKey"]; }
        }

        public static string BingApiKey
        {
            get { return ConfigurationManager.AppSettings["BingApiKey"]; }
        }

        public static int PageSize
        {
            get { return Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]); }
        }
    }
}