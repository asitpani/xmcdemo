import type { NextApiRequest, NextApiResponse } from 'next';

const SITECORE_GRAPHQL_ENDPOINT =
  'https://xmc-epam19d48-xmclearningc704-asitdev8703.sitecorecloud.io/sitecore/api/graph/edge';
const SITECORE_API_KEY = '5bfd3ed82a9a4ab7af79b3d13875e083';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path as string;

  if (!path) {
    return res.status(400).json({ error: 'Missing "path" query parameter' });
  }

  const query = `
    query Destinations($path: String!) {
        item(path: $path, language: "en") {
            children {
                results {
                    label: field(name: "Title") { value }
                    value: field(name: "Title") { value }
                }
            }
        }
    }
  `;

  const variables = { path };
  try {
    const response = await fetch(SITECORE_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(SITECORE_API_KEY && { sc_apikey: SITECORE_API_KEY }),
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    //res.json(json);
    const items = json?.data?.item?.children?.results || [];

    interface ChildItem {
      label: { value: string };
      value: { value: string };
    }

    const dropdownOptions = items.map((item: ChildItem) => ({
      value: item.value.value,
      label: item.label.value,
    }));

    res.status(200).json(dropdownOptions);
  } catch (error) {
    console.error('Error fetching dropdown options:', error);
    res.status(500).json({ error: 'Failed to fetch dropdown options' });
  }
}
