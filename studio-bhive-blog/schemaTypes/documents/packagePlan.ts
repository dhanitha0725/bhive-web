import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons/Package'

export const packagePlan = defineType({
  name: 'packagePlan',
  title: 'Package',
  type: 'document',
  icon: PackageIcon,
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
      name: 'label',
      type: 'string',
      description: 'Short positioning line, for example "Rebuild the base".',
    }),
    defineField({
      name: 'forWhom',
      title: 'Who it is for',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'outcome',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'capabilities',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Controls the order packages appear in listings.',
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
    select: { title: 'name', subtitle: 'label' },
  },
})
