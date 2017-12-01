import request from 'request';
import cheerio from 'cheerio';

/**
 * Returns an object that contains the urls title, description and image url.
 * @param {String} url - article / website url.
 * @return {Object} metadata with the url title, description and image url
 */
export default function fetchURLMetadata(url, res, callback) {
  try {
    request({
      uri: url,
    }, (error, response, body) => {
      const $ = cheerio.load(body);
      const metadata = {
        articleUrl: url,
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
  } catch (error) {
    return res.status(400).json({ err: true, message: 'Something went wrong parsing your articles URL data ' });
  }
}
