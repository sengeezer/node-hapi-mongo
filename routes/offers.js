const Boom = require('@hapi/boom');
const uuid = require('uuid');
const Joi = require('joi');
const handleError = require('../utils/handleError');

const routesOffers = {
  name: 'routes-offers',
  version: '0.0.1',
  register: async (server, options) => {
    const db = server.app.db;

    server.route({  
      method: 'GET',
      path:'/offers',
      handler: (request, h) => {
        db.offers.find((err, docs) => {
          if (err) {
            return h.response(Boom.wrap(err, 'Internal MongoDB error'));
          }

          return h.response(docs);
        });
        
      }
    });

    server.route({  
      method: 'GET',
      path: '/offers/{id}',
      handler: (request, h) => {
        db.offers.findOne({
          _id: request.params.id
        }, (err, doc) => {
          if (err) {
            return h.response(Boom.wrap(err, 'Internal MongoDB error'));
          }
  
          if (!doc) {
            return h.response(Boom.notFound());
          }
  
          return h.response(doc);
        });
      }
    });

    server.route({  
      method: 'POST',
      path: '/offers/',
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            name: Joi.string().required().note('Offer name'),
            items: Joi.array().items(Joi.string()).required().note('String array of items contained in offer'),
            price: Joi.number().required().note('Price of offer in cents / pence'),
            expires: Joi.date().greater('now').required().note('Offer expiration date')
          }),
          failAction: handleError
        },
        description: 'Create offer',
        notes: 'Create an offer',
        tags: ['api']
      },
      handler: (request, h) => {
        const offer = request.payload;

        // Create an id
        offer._id = uuid.v1();

        db.offer.save(offer, (err, result) => {
          if (err) {
            return h.response(Boom.wrap(err, 'Internal MongoDB error'));
          }

          return h.response(offer);
        });
      }
    });

    server.route({  
      method: 'PATCH',
      path: '/offers/{id}',
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            name: Joi.string().required().note('Offer name'),
            expires: Joi.date().greater('now').optional().note('Offer expiration date')
          }).required().min(1),
          failAction: handleError
        },
        description: 'Update offer',
        notes: 'Update an offer',
        tags: ['api']
      },
      handler: (request, h) => {
        db.offers.update({
          _id: request.params.id
        }, {
          $set: request.payload
        }, (err, result) => {
          if (err) {
            return h.response(Boom.wrap(err, 'Internal MongoDB error'));
          }

          if (result.n === 0) {
            return h.response(Boom.notFound());
          }

          h.response().code(204);
        });
      }
    });
  }
};

module.exports = routesOffers;
