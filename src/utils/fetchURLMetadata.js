import request from 'request';
import cheerio from 'cheerio';

/**
 * Returns an object that contains the urls title, description and image url.
 * @param {String} url - article / website url.
 * @return {Object} metadata with the url title, description and image url
 */
export default function fetchURLMetadata(url, callback) {
  request({
    uri: url,
  }, (error, response, body) => {
    const $ = cheerio.load(body);
    const metadata = {
      url: url,
      title: '',
      description: '',
      imageURL: '',
    };

    $('meta').each(function () {
      const data = $(this);
      const property = data.attr('property');
      const content = data.attr('content');

      switch (property) {
        case 'og:title':
          metadata.title = content;
          break;
        case 'og:description':
          metadata.description = content;
          break;
        case 'og:image':
          metadata.imageURL = content;
          break;
        default:
          break;
      }
    });
    callback(metadata);
  });
}
