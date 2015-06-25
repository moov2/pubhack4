using System.Configuration;
namespace Pubhack4
{
    public class Config
    {
        public static string MovieDbApiKey
        {
            get { return ConfigurationManager.AppSettings["MovieDbApiKey"]; }
        }
    }
}