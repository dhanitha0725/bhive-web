import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons/Case'

export const caseStudy = defineType({
  name: 'caseStudy',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'client',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'client' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'industry',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'challenge',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatWeDid',
      title: 'What we did',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'result',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scope',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'coverImage',
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
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isDemo',
      title: 'Demo content',
      type: 'boolean',
      description: 'Marks concept work. Demo case studies stay out of the sitemap and search results.',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'industry', media: 'coverImage' },
  },
})
