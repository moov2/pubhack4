using Nancy;
using Pubhack4.Domain;
using Pubhack4.Services.Movies;
using Pubhack4.Services.VideoGames;
using Pubhack4.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Pubhack4.Modules
{
    public class FeedModule : NancyModule
    {
        public FeedModule(IMovieService movieService, IVideoGameService videoGameService)
        {
            Get["/api/feed/{year}"] = _ =>
            {
                int year;
                int page;
                // make sure a year is being passed in.
                if (!int.TryParse(Context.Parameters.year, out year))
                    return HttpStatusCode.BadRequest;

                if (!int.TryParse(Request.Query.page, out page))
                    page = 1;
                // remove this line when the line below has been commented.
                //var items = movieService.GetByYear(year);

                // below will create a list combined of data from the different services.
                var items = new List<Item>().Concat(movieService.GetByYear(year, page)).Concat(videoGameService.GetByYear(year, page)).ToList();

                return Response.AsJson<IList<Item>>(items.Shuffle<Item>());
            };
        }
    }
}