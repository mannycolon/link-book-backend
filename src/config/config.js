// TODO: Dont forget to save this dev configs as environment variables
const devConfig = {
  DB_URL: process.env.MONGODB_URI || 'mongodb://localhost/linkbook',
  JWT_SECRET: process.env.JWT_SECRET || 'test',
};

export default devConfig;
