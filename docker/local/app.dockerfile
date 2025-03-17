# Usar la imagen de Node.js como base
FROM node:22.14-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install --silent

# Copiar el resto de archivos
COPY . .

# Iniciar el servidor de desarrollo (npm run dev)
CMD ["npm", "run", "dev"]

# Exponer el puerto 8000
EXPOSE 8000
