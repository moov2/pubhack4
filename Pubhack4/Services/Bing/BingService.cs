using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace Pubhack4.Services.Bing
{
    public class BingService
    {

        public BingService()
        {
        }

        public string GetImagesForTerm(string SearchTerm)
        {
            string ImgPath = "";

            // Create a Bing container.

            string rootUrl = "https://api.datamarket.azure.com/Bing/Search";

            var bingContainer = new BingSearchContainer(new Uri(rootUrl));

            // The market to use.

            string market = "en-us";

            // Configure bingContainer to use your credentials.

            bingContainer.Credentials = new NetworkCredential(Config.BingApiKey, Config.BingApiKey);

            // Build the query, limiting to 10 results.

            var imageQuery =

            bingContainer.Image(SearchTerm, null, market, null, null, null, null);

            imageQuery = imageQuery.AddQueryOption("$top", 1);

            // Run the query and display the results.

            var imageResults = imageQuery.Execute();

            foreach(var item in imageResults)
            {
                ImgPath = item.MediaUrl;
            }

            return ImgPath;
        }
    }
}