using Pubhack4.Domain;
using System.Collections.Generic;
using System.Configuration;
using TMDbLib.Client;
using System.Linq;
using TMDbLib.Objects.Search;

namespace Pubhack4.Services.Movies
{
    public class MovieService : IMovieService
    {
        private TMDbClient _client;

        public MovieService()
        {
            _client = new TMDbClient(Config.MovieDbApiKey);
        }

        public IList<Item> GetByYear(int year, int page)
        {
            var apiResult = _client.DiscoverMovies(page, null, TMDbLib.Objects.Discover.DiscoverTvShowSortBy.Undefined, true, year);
            return apiResult.Results.Select(x => ConvertMovie(x, year)).ToList(); 
        }

        /// <summary>
        /// Converts a movie from MovieDB into `Item`.
        /// </summary>
        /// <param name="searchMovie"></param>
        /// <returns></returns>
        public Item ConvertMovie(SearchMovie searchMovie, int year)
        {
            return new Item
            {
                Title = searchMovie.Title,
                Type = "Movie",
                Year = year,
                ImageUrl = string.Format("http://image.tmdb.org/t/p/w500{0}", searchMovie.PosterPath)
            };
        }
    }

    public interface IMovieService : IItemService
    {

    }
}