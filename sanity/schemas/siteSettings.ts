// Add this to your Sanity Studio schema (sanity.config.ts → schema.types)
export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Only one document of this type should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'email2', title: 'Email 2', type: 'string' },
        { name: 'address', title: 'Address', type: 'text', rows: 2 },
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        { name: 'text', title: 'Footer Text', type: 'text', rows: 2 },
        {
          name: 'links',
          title: 'Footer Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'url', title: 'URL', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
