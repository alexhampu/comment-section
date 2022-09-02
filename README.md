# Requirements
* Node.js 16
* Docker Engine 20.10.16+

# Getting started
## Start database
* Copy & paste `docker-compose.example.yml` to `docker-compose.override.yml`
* Update ports if necessary
* Run `docker-compose up -d`

## Start server
* Copy `/server/.env.example` to `/server.env`
* Update config if necessary
* Install dependencies by running `npm install`
* Start the server `npm run start`