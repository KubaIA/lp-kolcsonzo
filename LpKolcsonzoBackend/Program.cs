using MongoDB.Driver;
using LpKolcsonzoBackend.Models;
using LpKolcsonzoBackend.Repositories;
using LpKolcsonzoBackend.Controllers;

var builder = WebApplication.CreateBuilder(args);

// -----------------------------
// CORS – Angular engedélyezése
// -----------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// -----------------------------
// OpenAPI
// -----------------------------
builder.Services.AddOpenApi();

// -----------------------------
// MongoDB CONNECTION
// -----------------------------
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("MongoDb");
    return new MongoClient(connectionString);
});

builder.Services.AddSingleton(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var databaseName = builder.Configuration["DatabaseName"];
    return client.GetDatabase(databaseName);
});

// -----------------------------
// Repository
// -----------------------------
builder.Services.AddSingleton<AlbumRepository>();

var app = builder.Build();

// -----------------------------
// CORS – fontos: MINDEN ELŐTT
// -----------------------------
app.UseCors("AllowAngular");

// -----------------------------
// OpenAPI csak ezután
// -----------------------------
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// -----------------------------
// Endpointok
// -----------------------------
app.MapAlbumEndpoints();

// -----------------------------
app.Run();