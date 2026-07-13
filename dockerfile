# ============================================================
# ETAPA 1: Construcción del proyecto Angular
# ============================================================

FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compila Angular (Angular 17 genera dist/angular-boleham/browser)
RUN npm run build

# ============================================================
# ETAPA 2: Servidor NGINX
# ============================================================

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia la carpeta correcta de tu proyecto
COPY --from=build /app/dist/angular-boleham/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
