
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'API for managing contacts',
        },
        servers: [
            {
                url: 'https://cse341-node-api-1atm.onrender.com/',
                description: 'Published API',
            },
            {
                url: 'http://localhost:8080',
                description: 'Local API',
            },
        ],
    },
    apis: ['./route/contacts.js'],
};

options.definition.components = {
    schemas: {
        Contact: {
            type: 'object',
            required:
            ['_id', 'firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
            properties: {
                _id: {
                    type: 'string',
                    description: 'MongoDB ObjectId',
                    example: '64f0d7c5d4d27b4f1a1b2c3d',
                },
                firstName: {
                    type: 'string',
                    example: 'John',
                },
                lastName: {
                    type: 'string',
                    example: 'Doe',
                },
                email: {
                    type: 'string',
                    format: 'email',
                    example: 'john.doe@example.com',
                },
                favoriteColor: {
                    type: 'string',
                    example: 'Blue',
                },
                birthday: {
                    type: 'string',
                    format: 'date',
                    example: '1999-06-07',
                },
            },
        },
        ContactInput: {
            type: 'object',
            required:
            ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
            properties: {
                firstName: {
                    type: 'string',
                    example: 'John',
                },
                lastName: {
                    type: 'string',
                    example: 'Doe',
                },
                email: {
                    type: 'string',
                    format: 'email',
                    example: 'john.doe@example.com',
                },
                favoriteColor: {
                    type: 'string',
                    example: 'Blue',
                },
                birthday: {
                    type: 'string',
                    format: 'date',
                    example: '1999-06-07',
                },
            },
        },
    },
};

module.exports = swaggerJsdoc(options);