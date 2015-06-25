using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pubhack4.Services.VideoGames
{

    public class VideoGameAPIResponse
    {
        [JsonProperty("results")]
        public IList<Game> Results { get; set; }
    }
    public class Game
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("image")]
        public Image Image { get; set; }
    }

    public class Image
    {
        [JsonProperty("icon_url")]
        public string Icon { get; set; }
        
        [JsonProperty("Tiny_url")]
        public string Tiny { get; set; }

        [JsonProperty("screen_url")]
        public string Screen { get; set; }

        [JsonProperty("thumb_url")]
        public string Thumb { get; set; }

        [JsonProperty("small_url")]
        public string Small { get; set; }

        [JsonProperty("medium_url")]
        public string Medium { get; set; }

        [JsonProperty("super_url")]
        public string Super { get; set; }
    }
}