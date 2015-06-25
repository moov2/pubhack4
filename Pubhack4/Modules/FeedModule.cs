using Nancy;
using System;

namespace Pubhack4.Modules
{
    public class FeedModule : NancyModule
    {
        public FeedModule()
        {
            Get["/api/feed"] = _ =>
            {
                return Response.AsJson<bool>(true);
            };
        }
    }
}