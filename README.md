# LP Kölcsönző – Fullstack alkalmazás
Ez a projekt egy egyszerű albumkölcsönző rendszer, amely három fő részből áll:

- **Backend** – ASP.NET 8 Web API  
- **Frontend** – Angular 17  
- **Adatbázis** – MongoDB (lokálisan fut)

A cél egy alap CRUD alkalmazás, ahol albumokat lehet listázni, megtekinteni, létrehozni, módosítani és törölni.

---

## 📁 Projekt szerkezete
A projekt egy közös mappában található, így könnyen kezelhető és dockerizálható.

lp-kolcsonzo/
│
├── backend/        # .NET 8 Web API backend
│
├── frontend/     # Angular 17 frontend
│
├── database/
│   └── sample-data/
│       └── albums.json        # Exportált MongoDB mintakollekció
│
└── infra/
├── docker/                # Dockerfile-ok (üres, a fejlesztőtárs tölti meg)
└── k8s/                   # Kubernetes fájlok (szintén üres)

---

## 🗄️ Adatbázis (MongoDB)
A projekt MongoDB-t használ, lokálisan futtatva.

- **Host:** `mongodb://localhost:27017`
- **Adatbázis neve:** `lpdb`
- **Collection neve:** `albums`

A `database/sample-data/albums.json` fájl tartalmaz egy exportált mintakollekciót, amely Compass segítségével importálható.

---

## ▶️ Backend futtatása
A backend egy ASP.NET 8 Web API.

### Követelmények:
- .NET 8 SDK
- MongoDB fut a gépen

### Indítás:
cd backend
dotnet restore
dotnet run

A backend alapértelmezett címe:
http://localhost:5146

---

## 🌐 API végpontok
A backend minimál API-t használ, az elérhető végpontok:

| Művelet | HTTP metódus | URL |
|--------|--------------|-----|
| Összes album lekérése | GET | `/api/albums` |
| Egy album lekérése ID alapján | GET | `/api/albums/{id}` |
| Új album létrehozása | POST | `/api/albums` |
| Album módosítása | PUT | `/api/albums/{id}` |
| Album törlése | DELETE | `/api/albums/{id}` |

---

## 💻 Frontend futtatása
A frontend Angular 17 alapú, Bootstrap 5-tel.

### Követelmények:
- Node.js + npm
- Angular CLI (opcionális)

### Indítás:
cd frontend
npm install
npm start

A frontend elérhető lesz:
http://localhost:4200/

---

## 📦 Mintakollekció importálása (opcionális)

Ha szeretnéd feltölteni a MongoDB-t a mellékelt adatokkal:

1. Nyisd meg a **MongoDB Compass**-t  
2. Válaszd ki az adatbázist: `lpdb`  
3. Válaszd ki a collectiont: `albums`  
4. Kattints: **Import Collection**  
5. Tallózd be:  
database/sample-data/albums.json

---

## 📝 Megjegyzések

- A projekt célja egy egyszerű CRUD alkalmazás bemutatása.
- A backend és frontend külön mappában található, de egy közös repóban.
- Az `infra/` mappa üres, a konténerizálást és Kubernetes fájlokat a fejlesztőtárs fogja elkészíteni.
- A kód nem tartalmaz túlzott kommentelést, csak a szükséges részeket.

---

## ✔️ Összefoglalás

A projekt készen áll arra, hogy:

- továbbfejlesszék,
- dockerizálják,
- Kubernetes környezetbe helyezzék,
- vagy CI/CD pipeline-ba kössék.

A backend, frontend és adatbázis külön-külön is futtatható, de együtt adják ki a teljes alkalmazást.

Készítette: 
JLCQOR, ZVATRS 2026
