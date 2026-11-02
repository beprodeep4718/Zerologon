import { ImageIcon } from '@sanity/icons/Image'
import { defineField, defineType } from 'sanity'

export const photo = defineType({
  name: 'photo',
  type: 'image',
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the photo for people using screen readers.',
      validation: (rule) => rule.required(),
    }),
  ],
})
