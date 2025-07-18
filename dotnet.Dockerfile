### STAGE 0: Build client ###
FROM node:22 AS build-client
WORKDIR /app/frontend
COPY /clients/react .
RUN npm install && npm run build

### STAGE 1: Build server ###
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build-server
WORKDIR /app/backend
COPY /servers/dotnet .
WORKDIR /app/backend/API
RUN dotnet restore && dotnet publish -c Release -o /app/backend/dist/API

### STAGE 2: Copy client and server files ###
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS final
WORKDIR /app
COPY --from=build-server /app/backend/dist/API .
COPY --from=build-client /app/frontend/dist ./wwwroot

EXPOSE 8080
ENTRYPOINT [ "dotnet", "API.dll" ]