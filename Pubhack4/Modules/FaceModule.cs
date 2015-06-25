using Nancy;
using Pubhack4.Domain;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Pubhack4.Modules
{
    public class FaceModule : NancyModule
    {
        public FaceModule(IRootPathProvider pathProvider)
        {
            Post["/api/face/upload", true] = async (parameters, ct) =>
            {
                var file = this.Request.Files.FirstOrDefault();

                if (file == null)
                    return HttpStatusCode.BadRequest;

                var faceService = new Pubhack4.Services.Face.FaceService();
                var faces = await faceService.GetFacesFromImage(file.Value);

                return Response.AsJson(faces);
            };
        }
    }
}