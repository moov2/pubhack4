using Nancy;

namespace Pubhack4.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule() {
            Get["/"] = _ =>
            {
                return Response.AsRedirect("/app");
            };
        }
    }
}