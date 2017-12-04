'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _middlewares = require('./config/middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = require('./modules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
const app = (0, _express2.default)();

/**
 * Database
 */
(0, _db2.default)();
/**
 * Middlewares
 */
(0, _middlewares2.default)(app);

app.use('/api', [_modules.ArticleRoutes, _modules.UserRoutes]);

const PORT = process.env.port || 3000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listening at port:${PORT}`);
  }
});