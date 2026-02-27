## ArgoCD telepítése Kubernetes környezetbe

### 1. Namespace létrehozása

Terminálban hozd létre az ArgoCD számára szükséges namespace-et:

```
kubectl create namespace argocd
```

### 2. ArgoCD telepítése

Telepítsd az ArgoCD komponenseket a hivatalos manifest használatával:

```
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### 3. Szolgáltatás módosítása NodePort típusra

Az ArgoCD szerver szolgáltatás eléréséhez módosítsd annak típusát
NodePort-ra:

```
kubectl patch svc argocd-server -n argocd -p '{\"spec\": {\"type\": \"NodePort\"}}'
```

### 4. NodePort port meghatározása

A kiosztott NodePort port megtekintéséhez futtasd az alábbi parancsot:

```
kubectl get svc -n argocd argocd-server
```

Példa kimenet:

    NAME            TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
    argocd-server   NodePort   10.43.97.127   <none>        80:32489/TCP,443:32583/TCP   8m4s

Ebben az esetben az alkalmazás HTTPS-en a magasabb porton érhető el:

    https://localhost:<NodePort>

### 5. Alapértelmezett bejelentkezési adatok

-   Felhasználónév: `admin`

Az admin jelszó lekérdezéséhez az alábbi parancs használható.

#### Bash környezetben

```
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

#### PowerShell környezetben

```
$pass = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($pass))
```

### 6. Deployment létrehozása ArgoCD alkalmazáshoz

Egy ArgoCD alkalmazás létrehozásához alkalmazd a konfigurációs fájlt:

``` 
kubectl apply -f argocd-app.yaml
```
