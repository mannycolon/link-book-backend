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
        console.log($('title').text(), 'test');
      }
      callback(metadata);
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: true, message: 'Something went wrong parsing your articles URL data ' });
  }
}
