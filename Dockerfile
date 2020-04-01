FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY YCodeLab.sln .
COPY YCodeLab/*.csproj ./YCodeLab/
COPY YCodeLabDB/*.csproj ./YCodeLabDB/
RUN dotnet restore

# copy everything else and build app
COPY YCodeLab/. ./YCodeLab/
COPY YCodeLabDB/. ./YCodeLabDB/
WORKDIR /app/YCodeLab

RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm
# RUN npm install

RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS runtime
WORKDIR /app
# EXPOSE 8080/tcp
# ENV ASPNETCORE_URLS http://+:8080
COPY --from=build /app/YCodeLab/out ./
ENTRYPOINT ["dotnet", "YCodeLab.dll"]