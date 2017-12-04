'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CollectionSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  articles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }]
});

exports.default = _mongoose2.default.model('Collection', CollectionSchema);