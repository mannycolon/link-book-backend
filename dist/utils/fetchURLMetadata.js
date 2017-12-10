'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchURLMetadata;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns an object that contains the urls title, description and image url.
 * @param {String} url - article / website url.
 * @return {Object} metadata with the url title, description and image url
 */
function fetchURLMetadata(url, res, callback) {
  try {
    (0, _request2.default)({
      uri: url
    }, (error, response, body) => {
      const $ = _cheerio2.default.load(body);
      const metadata = {
        articleUrl: url,
        title: '',
        description: '',
        imageURL: ''
      };

      $('meta').each(function () {
        const data = $(this);
        const property = data.attr('property') || data.attr('name');
        const content = data.attr('content');

        switch (property) {
          case 'og:title':
          case 'twitter:title':
          case 'title':
            metadata.title = content;
            break;
          case 'og:description':
          case 'twitter:description':
          case 'description':
            metadata.description = content;
            break;
          case 'og:image':
          case 'twitter:image':
          case 'image':
            metadata.imageURL = content;
            break;
          default:
            break;
        }
      });
      if (!metadata.title) {
        metadata.title = $('title').text();
      }

      callback(metadata);
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: true, message: 'Something went wrong parsing your articles URL data ' });
  }
}