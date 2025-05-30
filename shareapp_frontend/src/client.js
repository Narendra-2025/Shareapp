import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,  // ✅ No quotes
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,           // ✅ No quotes
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
