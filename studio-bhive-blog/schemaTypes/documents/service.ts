import { defineField, defineType } from 'sanity'
import { ComposeIcon } from '@sanity/icons/Compose'

export const service = defineType({
  name: 'service',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'problemSolved',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scope',
      title: 'What is included',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'outcome',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Controls the order services appear in listings and navigation.',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'problemSolved' },
  },
})
