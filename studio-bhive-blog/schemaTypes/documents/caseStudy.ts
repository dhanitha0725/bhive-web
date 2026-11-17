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
      name: 'outcomeMetric',
      title: 'Key Outcome Metric',
      type: 'string',
      description: 'Short badge metric used on cards, e.g. "3x Sales Growth" or "+180% Inquiries"',
    }),
    defineField({
      name: 'results',
      title: 'Result metrics',
      type: 'array',
      description: 'Up to three headline metrics displayed in the case study dialog.',
      of: [
        {
          type: 'object',
          name: 'resultMetric',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      validation: (rule) => rule.max(3),
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
      description: 'Marks illustrative concept work so the website can label it as an example.',
      initialValue: true,
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
