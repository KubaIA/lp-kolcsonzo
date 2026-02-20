using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LpKolcsonzoBackend.Models
{
    public class Album
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Artist { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Genre { get; set; } = string.Empty;

        public List<Track> Tracks { get; set; } = new();
    }
}
