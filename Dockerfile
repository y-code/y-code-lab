FROM node:24-alpine AS nodejs

WORKDIR /app

RUN npm install pnpm
COPY src/frontend/package.json src/frontend/pnpm-lock.yaml ./
COPY src/frontend/ ./
RUN npx pnpm approve-builds --all && npx pnpm install
RUN npx pnpx nx build ycode-lab --configuration production


FROM mcr.microsoft.com/dotnet/sdk:10.0-azurelinux3.0 AS build

WORKDIR /app

# copy frontend built files
COPY --from=nodejs /app/dist/ ./out/ClientApp/

# copy csproj and restore as distinct layers
COPY src/YCodeLab/*.csproj ./YCodeLab/
COPY src/YCodeLabDB/*.csproj ./YCodeLabDB/
RUN dotnet restore YCodeLab

# copy everything else and build app
COPY src/YCodeLab ./YCodeLab/
COPY src/YCodeLabDB/ ./YCodeLabDB/

RUN dotnet publish -c Release -o out YCodeLab


FROM mcr.microsoft.com/dotnet/aspnet:10.0-azurelinux3.0 AS runtime

WORKDIR /app

COPY --from=build /app/out/ ./

EXPOSE 80/tcp
ENV ASPNETCORE_URLS="http://+:80"

ENTRYPOINT ["dotnet", "YCodeLab.dll"]

