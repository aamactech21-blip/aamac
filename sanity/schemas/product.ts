// Add this to your Sanity Studio schema (sanity.config.ts → schema.types)
export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
