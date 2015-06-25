using Pubhack4.Domain;
using System.Collections.Generic;

namespace Pubhack4.Services
{
    public interface ITitleService
    {
        IList<Title> GetByYear(int year);
    }
}
