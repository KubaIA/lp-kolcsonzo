# LP Kölcsönző – Cloud-Native Fullstack Alkalmazás
Ez a projekt egy modern, konténerizált albumkölcsönző rendszer, amely a legújabb GitOps és Cloud-Native irányelveket követi.

## 🚀 Technológiai Stack
Backend: ASP.NET 8 Web API
Frontend: Angular 17 + Bootstrap 5
Adatbázis: MongoDB (Persistence-szel ellátva)
Infrastruktúra: Kubernetes (K8s)
CI/CD: GitHub Actions (Path-based filteringgel)
Folyamatos telepítés (CD): ArgoCD (GitOps)
A cél egy alap CRUD alkalmazás, ahol albumokat lehet listázni, megtekinteni, létrehozni, módosítani és törölni.

---

## 📁 Projekt szerkezete
```
lp-kolcsonzo/
├── .github/workflows/   # CI/CD: Külön Build & Push (Frontend & Backend)
├── argocd/              # ArgoCD Bootstrap és telepítő fájlok
├── backend/             # .NET 8 Web API + Dockerfile
├── frontend/            # Angular 17 + Dockerfile
├── k8s/                 # Kubernetes Deployment, Service és Config fájlok
│   ├── mongodb.yaml     # Perzisztens adatbázis réteg
│   ├── backend.yaml     # Skálázott (3 replika) backend
│   └── frontend.yaml    # Skálázott (3 replika) frontend
└── README.md
```
---

## 🏗️ Infrastruktúra és Skálázhatóság
A projekt már nem csak lokálisan futtatható, hanem egy teljes értékű Kubernetes klaszterre van optimalizálva:

- Magas rendelkezésre állás (HA): Mind a Frontend, mind a Backend 3-3 példányban (replika) fut, így a rendszer hibatűrő.
- Adatbiztonság: A MongoDB adatait PersistentVolume tárolja, így a podok újraindulása után is megmaradnak a kölcsönzési adatok.
- Automatikus Seed: Az adatbázis az induláskor automatikusan feltöltődik a mintadatokkal egy InitContainer segítségével.
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

## 🤖 CI/CD és GitOps
1. Folyamatos integráció (GitHub Actions)
A rendszer két különálló build folyamatot használ, amelyek csak akkor futnak le, ha a hozzájuk tartozó forráskód változik (Path Filtering). Ha csak a README-t vagy a Kubernetes konfiguráció kerül módosításra, nem történik felesleges Build.

2. Folyamatos telepítés (ArgoCD)
A rendszer a GitOps elvet követi. Az argocd/ mappában található konfiguráció összeköti a GitHub repót a klaszterrel.

- Auto-Sync: Minden Git push után az ArgoCD automatikusan frissíti a klaszter állapotát.
- Self-Healing: Ha manuális módosítás történik a klaszterben, az ArgoCD azonnal visszaállítja a Git-ben leírt állapotot.

## 📝 Megjegyzések

- A projekt célja egy egyszerű CRUD alkalmazás bemutatása.
- A backend és frontend külön mappában található, de egy közös repóban.
- A kód nem tartalmaz túlzott kommentelést, csak a szükséges részeket.
- Az alkalmazás most már teljesen automatizált: a kódtól a felhőig minden egyetlen git push-sal kezelhető.
- Az infrastrukturális réteg (k8s/ és argocd/) elválik az alkalmazás logikájától.

---
## ▶️ Telepítés Kubernetes alá (ArgoCD-vel)
Ha rendelkezésre áll egy futó Kubernetes klaszter (pl. Rancher Desktop, Docker Desktop vagy minikube).
ArgoCD telepítése:
Kövesd az argocd/README.md-ben leírtakat a vezérlő telepítéséhez.
Alkalmazás indítása:

```
kubectl apply -f argocd/argocd-app.yaml  
```  
Elérhetőség:  
Az alkalmazás a NodePort beállítások után a http://localhost címen érhető el.

Készítette:
ZVATRS, JLCQOR 2026
