using GiantBomb.Api;
using Pubhack4.Domain;
using Pubhack4.Services.Bing;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using Newtonsoft.Json;

namespace Pubhack4.Services.VideoGames
{
    
    public class VideoGameService : IVideoGameService
    {

        public VideoGameService()
        {
            
        }

        public IList<Item> GetByYear(int year, int page)
        {
            int offset = (page * Config.PageSize) - Config.PageSize;
            var request = WebRequest.Create(string.Format("http://www.giantbomb.com/api/releases/?format=json&api_key={0}&filter=release_date:{1}-1-1%2000:00:00|{2}-1-1%2000:00:00&limit={3}&offset={4}", Config.VideoGameDbApiKey, year, year + 1, Config.PageSize, offset));
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
                item.Year = year;
                if(img != null)
                {
                    item.ImageUrl = img.Super.Replace("\\", "");
                } else
                {
                    BingService bs = new BingService();
                    item.ImageUrl = bs.GetImagesForTerm(game.Name);
                }
                bool exists = false;
                foreach (Item i in gameList)
                {
                    if (i.Title == item.Title)
                        exists = true;
                }
                if(!exists)
                    gameList.Add(item);
            }

            return gameList;
        }
    }

    public interface IVideoGameService : IItemService
    {
        
    }
}