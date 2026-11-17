import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. "Founder - Retail Business" or "Managing Director"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Business Name',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Client Quote / Feedback',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Author Avatar / Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls display sequence in testimonials section.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order, Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})
