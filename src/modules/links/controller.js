import Link from './model';
// utils
import fetchURLMetadata from '../../utils/fetchURLMetadata';

export const addLink = async (req, res) => {
  const { link } = req.body;

  fetchURLMetadata(link, async ({ title, description, imageURL, url }) => {
    if(!title) {
      return res.status(400).json({ error: true, message: `A title couldn't be found for your link.` });
    }

    if(!description) {
      return res.status(400).json({ error: true, message: `A description couldn't be found for your link.` });
    }


    if(!imageURL) {
      return res.status(400).json({ error: true, message: `A valid image URL is required.` });
    }

    if(!url) {
      return res.status(400).json({ error: true, message: `A valid URL is required to perform this action.` });
    }

    try {
      const newLink = new Link({ title, description, imageURL, url });
      return res.status(201).json({ link: await newLink.save() });
    } catch(err) {
      return res.status(err.status).json({ err: true, message: 'Error adding new link.' });
    }
  });
}

export const getAllLinks = async (req, res) => {
  try {
    return res.status(201).json({ links: await Link.find({}) });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Error retrieving all links' });
  }
}
