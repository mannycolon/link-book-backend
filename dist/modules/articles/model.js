'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ArticleSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  articleUrl: {
    type: String,
    required: true
  },
  imageURL: {
    type: String
  },
  isPublic: {
    type: Boolean,
    required: true
  },
  collectionNames: [{
    type: String
  }],
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

ArticleSchema.pre('remove', function (next) {
  // Remove all the assignment docs that reference the removed person.
  this.model('Collection').remove({ Article: this._id }, next);
});

exports.default = _mongoose2.default.model('Article', ArticleSchema);