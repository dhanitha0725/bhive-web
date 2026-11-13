import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
      validation: (rule) => rule.max(70).warning('Keep under 70 characters for search results'),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep under 160 characters for search results'),
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
})
