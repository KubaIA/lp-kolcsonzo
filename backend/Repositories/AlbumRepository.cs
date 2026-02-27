using LpKolcsonzoBackend.Models;
using MongoDB.Driver;

namespace LpKolcsonzoBackend.Repositories;

public class AlbumRepository
{
    private readonly IMongoCollection<Album> _albums;

    public AlbumRepository(IMongoDatabase database)
    {
        _albums = database.GetCollection<Album>("albums");
    }

    public async Task<List<Album>> GetAllAsync()
    {
        return await _albums.Find(_ => true).ToListAsync();
    }

    public async Task<Album?> GetByIdAsync(string id)
    {
        return await _albums.Find(a => a.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(Album album)
    {
        await _albums.InsertOneAsync(album);
    }

    public async Task UpdateAsync(string id, Album album)
    {
        await _albums.ReplaceOneAsync(a => a.Id == id, album);
    }

    public async Task DeleteAsync(string id)
    {
        await _albums.DeleteOneAsync(a => a.Id == id);
    }
}
