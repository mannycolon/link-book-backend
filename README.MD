# linkbook-app-backend

Backend for linkbook react native app

### Technologies

- NodeJS
- ExpressJS
- MongoDB

### Development Notes
- Keep `mongod` running.
- Run `npm run dev`.
- Make sure to keep `npm run build:watch` running in a separate terminal window while in development to watch for changes.

### Running ES6 code in node
- Libraries needed
  - babel-cli
  - babel-plugin-transform-async-to-generator
  - babel-plugin-transform-object-rest-spread
  - babel-preset-env
  - babel-preset-es2015
  - babel-register

Run module using `babel-node`. For example,
```
babel-node index.js
```
