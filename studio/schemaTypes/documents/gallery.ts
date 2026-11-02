import { ImagesIcon } from '@sanity/icons/Images'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'photos',
      type: 'array',
      description: 'Drop several photos here at once, then drag to reorder. The first 8 fill the main mosaic.',
      options: { layout: 'grid' },
      of: [defineArrayMember({ type: 'photo' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Gallery' }) },
})
