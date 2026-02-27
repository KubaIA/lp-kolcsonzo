# 1. SZAKASZ: Build (SDK használata)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build-env
WORKDIR /app

# Függőségek másolása és visszaállítása
COPY *.csproj ./
RUN dotnet restore

# Teljes kód másolása és fordítása
COPY . ./
RUN dotnet publish -c Release -o out

# 2. SZAKASZ: Runtime (Kicsi kép a futtatáshoz)
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build-env /app/out .

# A PONTOS NÉV: LpKolcsonzoBackend.dll
ENTRYPOINT ["dotnet", "LpKolcsonzoBackend.dll"]
