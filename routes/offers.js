const Boom = require('@hapi/boom');
const uuid = require('uuid');
const Joi = require('joi');
const handleError = require('../utils/handleError');

const routesOffers = {
  name: 'routes-offers',
  version: '0.0.1',
  register: async (server, options) => {
    const { model } = server.app.db;

    server.route({  
      method: 'GET',
      path:'/offers',
      handler: async (request, h) => {
        try {
          let offers = await model.find().exec();

          return h.response(offers);
       } catch(error) {
          return h.response(error).code(500);
       }
      }
    });

    server.route({  
      method: 'GET',
      path: '/offers/{id}',
      handler: async (request, h) => {
        try {
          let offer = await model.findById(request.params.id).exec();

          return h.response(offer);
       } catch(error) {
          return h.response(error).code(500);
       }
      }
    });

    server.route({  
      method: 'POST',
      path: '/offers',
      options: {
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
      handler: async (request, h) => {
        try {
          let offer = new model(request.payload);
          let result = await offer.save();

          return h.response(result);
        } catch(error) {
          return h.response(error).code(500);
        }
      }
    });

    server.route({  
      method: 'PUT',
      path: '/offers/{id}',
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().optional().note('Offer name'),
            expires: Joi.date().greater('now').optional().note('Offer expiration date')
          }).required().min(1),
          failAction: handleError
        },
        description: 'Update offer',
        notes: 'Update an offer',
        tags: ['api']
      },
      handler: async (request, h) => {
        try {
          let result = await model.findByIdAndUpdate(request.params.id, request.payload, { new : true });

          return h.response(result);
        } catch (error) {
           return h.response(error).code(500);
        }
      }
    });

    server.route({  
      method: 'DELETE',
      path: '/offers/{id}',
      options: {
        description: 'Delete offer',
        notes: 'Delete an offer',
        tags: ['api']
      },
      handler: async (request, h) => {
        try {
          let result = await model.findByIdAndDelete(request.params.id);
          
          return h.response(result);
        } catch (error) {
          return h.response(error).code(500);
        }
      }
    });
  }
};

module.exports = routesOffers;
