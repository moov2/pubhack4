using System;
using System.Collections.Generic;

namespace Pubhack4.Utilities
{
    public static class ListExtensions
    {
        /// <summary>
        /// Randomly sorts the items within a list.
        /// </summary>
        public static IList<T> Shuffle<T>(this IList<T> list)
        {
            Random rng = new Random();
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }

            return list;
        }
    }
}