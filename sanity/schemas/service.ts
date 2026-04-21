// Add this to your Sanity Studio schema (sanity.config.ts → schema.types)
export const service = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
