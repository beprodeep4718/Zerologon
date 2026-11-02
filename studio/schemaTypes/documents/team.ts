import { UsersIcon } from '@sanity/icons/Users'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const team = defineType({
  name: 'team',
  title: 'Core team',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'members',
      type: 'array',
      description: 'Drag to reorder. Leads go first.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'member',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'batch',
              type: 'string',
              description: 'Department and graduating year, such as ECE’27.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'photo',
              type: 'image',
              description: 'Shown in black and white. Use the crop tool to keep the face in frame.',
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Core team' }) },
})
