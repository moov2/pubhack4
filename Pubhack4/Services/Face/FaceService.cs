using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.ProjectOxford.Face;

using Microsoft.ProjectOxford.Face.Contract;
using System.Threading.Tasks;
using System.IO;

namespace Pubhack4.Services.Face
{
    public class FaceService
    {
        // MS Project Oxford Face API client
        private readonly IFaceServiceClient faceServiceClient = new FaceServiceClient("04efaab8859f4582b4fffc49b0e44094");

        public FaceService()
        {

        }

        public async Task<Pubhack4.Domain.Face[]> GetFacesFromImage(Stream image)
        {
            var faces = new List<Pubhack4.Domain.Face>();
            var detectedFaces = await DetectFaces(image);

            foreach(Microsoft.ProjectOxford.Face.Contract.Face face in detectedFaces)
            {
                faces.Add(new Pubhack4.Domain.Face()
                {
                    Age = face.Attributes.Age,
                    Gender = face.Attributes.Gender
                });
            }

            return faces.ToArray();
        }

        private async Task<Microsoft.ProjectOxford.Face.Contract.Face[]> DetectFaces(Stream image)
        {
            var faces = await faceServiceClient.DetectAsync(image, true, true, true, true);
            return faces;
        }

    }
}