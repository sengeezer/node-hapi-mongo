# Hapi and MongoDB API server

## Setup

**Required software:** Node JS, Docker

* Install the required Node packages using `npm install`
* Start the MongoDB server: `docker run --name offers -p 27017:27017 -d mongo:4.4`
* Start the API server: `npm start` (Dev mode: `npm run dev`)

## Credits

* Based on [an article by Patrick Meier](https://patrick-meier.io/build-a-restful-api-using-hapi-js-and-mongodb/) and another article on [Programmerblog](http://programmerblog.net/restful-api-using-nodejs-and-hapi-framework/).
