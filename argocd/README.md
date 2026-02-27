How to indtall argocd to kubernetes:  

from a terminal:  

Create namespace  
```  
kubectl create namespace argocd  
```  

Install AgroCD  

```  
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml  
```  
Patch the service to use NodePort  

```  
kubectl patch svc argocd-server -n argocd -p '{\"spec\": {\"type\": \"NodePort\"}}'  
```  
To get the port run this command  

```  
kubectl get svc -n argocd argocd-server  
```  

This will show like:  
NAME            TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
argocd-server   NodePort   10.43.97.127   <none>        80:32489/TCP,443:32583/TCP   8m4s

then open https://localhost:highport/  

the default user is admin  

We will need for admin passwd to get run the following command  

with bash:  
```  
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```  

with powershell:  
```  
$pass = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($pass))
```  

To create deployment run  
```  
kubectl apply -f argocd-app.yaml  
```  
