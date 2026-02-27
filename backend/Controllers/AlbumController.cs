using LpKolcsonzoBackend.Models;
using LpKolcsonzoBackend.Repositories;

namespace LpKolcsonzoBackend.Controllers;

public static class AlbumController
{
    public static void MapAlbumEndpoints(this WebApplication app)
    {
        app.MapGet("/api/albums", async (AlbumRepository repo) =>
        {
            var albums = await repo.GetAllAsync();
            return Results.Ok(albums);
        });

        app.MapGet("/api/albums/{id}", async (string id, AlbumRepository repo) =>
        {
            var album = await repo.GetByIdAsync(id);
            return album is not null ? Results.Ok(album) : Results.NotFound();
        });

        app.MapPost("/api/albums", async (Album album, AlbumRepository repo) =>
        {
            await repo.CreateAsync(album);
            return Results.Created($"/api/albums/{album.Id}", album);
        });

        app.MapPut("/api/albums/{id}", async (string id, Album album, AlbumRepository repo) =>
        {
            var existing = await repo.GetByIdAsync(id);
            if (existing is null)
                return Results.NotFound();

            album.Id = id;
            await repo.UpdateAsync(id, album);

            return Results.Ok(album);
        });

        app.MapDelete("/api/albums/{id}", async (string id, AlbumRepository repo) =>
        {
            var existing = await repo.GetByIdAsync(id);
            if (existing is null)
                return Results.NotFound();

            await repo.DeleteAsync(id);
            return Results.NoContent();
        });
    }
}