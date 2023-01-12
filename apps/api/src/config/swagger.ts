import config from ".";

/**
 *  Swagger Definition
 */
const swagger = {
    openapi: '3.0.0',
    info: {
      title: 'Employee Manager API documentation',
      version: '0.0.1',
      description: 'This is a node express mongoose typescript',
      license: {
        name: 'MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
        description: 'Development Server',
      },
    ],
  };
  
export default swagger;