using Pubhack4.Domain;
using System.Collections.Generic;

namespace Pubhack4.Services.Movies
{
    public class MovieService : IMovieService
    {
        public IList<Item> GetByYear(int year)
        {
            throw new System.NotImplementedException();
        }
    }

    public interface IMovieService : IItemService
    {

    }
}