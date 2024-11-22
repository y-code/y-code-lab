FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY YCodeLab.sln .
COPY YCodeLab/*.csproj ./YCodeLab/
COPY YCodeLabDB/*.csproj ./YCodeLabDB/
RUN dotnet restore

# copy everything else and build app
COPY frontend/. ./frontend/
COPY YCodeLab/. ./YCodeLab/
COPY YCodeLabDB/. ./YCodeLabDB/
WORKDIR /app/YCodeLab

RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
RUN . ~/.bashrc && nvm install 22 && node -v && npm -v
RUN . ~/.bashrc && npm install -g npm
# RUN npm install

RUN . ~/.bashrc && dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 80/tcp
ENV ASPNETCORE_URLS http://+:80
COPY --from=build /app/YCodeLab/out/ ./
ENTRYPOINT ["dotnet", "YCodeLab.dll"]