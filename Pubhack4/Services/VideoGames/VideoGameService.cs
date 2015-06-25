﻿using GiantBomb.Api;
using Pubhack4.Domain;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using Newtonsoft.Json;

namespace Pubhack4.Services.VideoGames
{
    
    public class VideoGameService : IVideoGameService
    {
        private const string APIKey = "989d92a49e6e382df62654cbd0a17484cc578e03";

        public VideoGameService()
        {
            
        }

        public IList<Item> GetByYear(int year)
        {
            //string[] searchParameters = new string[1];
            //searchParameters[0] = "filter=original_release_date:1700-01-01|2100-12-31.";
            var request = WebRequest.Create(string.Format("http://www.giantbomb.com/api/releases/?format=json&api_key={0}&filter=release_date:{1}-1-1%2000:00:00|{2}-1-1%2000:00:00",APIKey,year,year+1));
            request.ContentType = "application/json; charset=utf-8";
            string text;
            var response = (HttpWebResponse)request.GetResponse();

            using (var sr = new StreamReader(response.GetResponseStream()))
            {
                text = sr.ReadToEnd();
            }

            VideoGameAPIResponse jsonObj = JsonConvert.DeserializeObject<VideoGameAPIResponse>(text);

            List<Item> gameList = new List<Item>();

            foreach (var game in jsonObj.Results)
            {
                Item item = new Item();
                var img = game.Image;

                item.Title = game.Name;
                item.Type = "Game";
                item.Description = game.Description;
                if(img != null)
                {
                    item.ImageUrl = img.Super.Replace("\\", "");
                }
                gameList.Add(item);
            }

            return gameList;
        }
    }

    public interface IVideoGameService : IItemService
    {
        
    }
}