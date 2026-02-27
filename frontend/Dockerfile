# 1. SZAKASZ: Építés
FROM node:20-alpine AS build
WORKDIR /app

# Függőségek telepítése
COPY package*.json ./
RUN npm install

# Forráskód másolása és fordítás
COPY . .
RUN npm run build -- --configuration production --prerender false

# 2. SZAKASZ: Futattás (Nginx)
FROM nginx:alpine

# Másoljuk be a saját konfigurációnkat
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Az Angular a build után a dist/ mappába teszi a fájlokat.
# Megjegyzés: ellenőrizd a mappanevet a dist-en belül!
COPY --from=build /app/dist/lp-kolcsonzo-frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
