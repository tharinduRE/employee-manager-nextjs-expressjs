/* eslint-disable turbo/no-undeclared-env-vars */
import 'dotenv/config';

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 8080,
    mongoose: {
      url: process.env.MONGODB_URL
    },
  };
  
  export default config;