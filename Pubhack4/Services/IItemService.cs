using Pubhack4.Domain;
using System.Collections.Generic;

namespace Pubhack4.Services
{
    public interface IItemService
    {
        IList<Item> GetByYear(int year);
    }
}
