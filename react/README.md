# Development Configuration
## Requirements
- Nodejs 16.13.1
- Oracle database enterprise 12.2.0.1

## Installation
### Nodejs dependencies
```sh
git clone https://github.com/hassty/uzhas-arkhema
cd uzhas-arkhema && npm install
cd black && npm install
```
### Docker image
```sh
docker run -d -p <host-port>:1521 --name <container-name> \
    -m 4G store/oracle/database-enterprise:12.2.0.1
```
To access os in container
```sh
docker exec -u root -ti <container-name> /bin/bash
```
To use sqlplus in container
```sh
docker exec -it <container-name> bash -c "source /home/oracle/.bashrc; sqlplus /nolog"
```
Shtob nauchit' oracle bazarit' po russki (eto esli sho vnutri containera delat' nado)
```sh
echo -e '#ya ruski\nexport NLS_LANG=AMERICAN_CIS.UTF8' >> /home/oracle/.bashrc
```

## Project structure
    ├─ black/           frontend
    ├─ sql/             
    │  ├─ setup/        setup pdb, users and tables
    │  ├─ procedures/   packages with pl-sql procedures
    ├─ src/
    │  ├─ app.js        Server entry point
    │  ├─ config/       Environment variables setup
    │  ├─ controllers/
    │  ├─ middleware/
    │  ├─ routers/
    └─ .env             Environment config file
## .env file
```sh
DB_USERNAME="your_username"
DB_PASSWORD="your_password"
DB_URL="host:port/pdbname.localdomain"
TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

You can generate token secret using nodejs
```sh
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Environment variables
- UV_THREADPOOL_SIZE - if set to a number, sets connection pool size to this number and makes the pool static (better performance)
- PORT - specifies port for backend server (default: 5000)

## Launch server
To launch server via nodemon
```sh
npm run dev
```

To launch server with static db connection pool of size 4
```sh
npm run static
```
To launch server with default settings
```sh
node src/app.js
```
