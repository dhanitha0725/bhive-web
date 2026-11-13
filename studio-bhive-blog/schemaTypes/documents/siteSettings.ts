import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      type: 'string',
      initialValue: 'BHive',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactEmail',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      description: 'Digits only, including country code. Used to build wa.me links.',
      validation: (rule) =>
        rule.required().regex(/^\d+$/, { name: 'digits only', invert: false }),
    }),
    defineField({
      name: 'whatsappDisplayNumber',
      type: 'string',
    }),
    defineField({
      name: 'whatsappMessage',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'showProof',
      title: 'Show proof sections',
      type: 'boolean',
      description:
        'When off, testimonials, result metrics, and case study cards stay hidden until owner-verified data is ready.',
      initialValue: false,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
})
