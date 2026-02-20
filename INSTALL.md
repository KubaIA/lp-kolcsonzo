# Telepítési útmutató – LP Kölcsönző
Ez a dokumentum lépésről lépésre bemutatja, hogyan lehet a projektet helyi gépen futtatni.  
A projekt három részből áll:

- Backend (ASP.NET 8 Web API)
- Frontend (Angular 17)
- MongoDB adatbázis

---

## 1. Előkészületek
### Szükséges programok:
- .NET 8 SDK  
- Node.js + npm  
- Angular CLI (opcionális)  
- MongoDB Community Server  
- MongoDB Compass (ajánlott)

---

## 2. Adatbázis beállítása (MongoDB)
1. Indítsd el a MongoDB-t (alapértelmezett port: `27017`)
2. Nyisd meg a MongoDB Compass-t
3. Csatlakozz ehhez:
mongodb://localhost:27017
4. Ha nincs `lpdb` adatbázis, hozd létre
5. Ha nincs `albums` collection, hozd létre
6. Importáld a mintakollekciót:
- `database/sample-data/albums.json`
- Compass → Import Collection

---

## 3. Backend telepítése és futtatása
1. Lépj be a backend mappába:
cd LpKolcsonzoBackend
2. Telepítsd a csomagokat:
dotnet restore
3. Indítsd el:
dotnet run
A backend elérhető lesz itt:
http://localhost:5146

---

## 4. Frontend telepítése és futtatása
1. Lépj be a frontend mappába:
cd lp-kolcsonzo-frontend
2. Telepítsd a csomagokat:
npm install
3. Indítsd el:
npm start
A frontend elérhető lesz itt:
http://localhost:4200

---

## 5. Ellenőrzés
Ha minden fut:
- Nyisd meg a böngészőt:  
http://localhost:4200
- A frontendnek meg kell jelennie
- A backend API-t itt tudod ellenőrizni:  

---

## 6. Megjegyzések
- A projekt fejlesztői környezetre készült.
- A `infra/` mappa üres, a konténerizálást a fejlesztőtárs fogja elkészíteni.
- Ha a MongoDB nem fut, a backend hibát fog dobni.

---

Készítette:  
ZVATRS 2026
