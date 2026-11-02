import { CogIcon } from '@sanity/icons/Cog'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'club', title: 'Club', default: true },
    { name: 'homepage', title: 'Homepage text' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'club',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      group: 'club',
      description: 'Shown by search engines and in link previews.',
      validation: (rule) => [
        rule.required(),
        rule.max(160).warning('Search engines cut this off after about 160 characters.'),
      ],
    }),
    defineField({
      name: 'college',
      type: 'string',
      group: 'club',
    }),
    defineField({
      name: 'department',
      type: 'string',
      group: 'club',
    }),
    defineField({
      name: 'founded',
      type: 'string',
      group: 'club',
      description: 'The year the club started.',
    }),
    defineField({
      name: 'peakParticipants',
      title: 'Largest event turnout',
      type: 'string',
      group: 'club',
      description: 'Shown under the hero as "at a single CTF", for example 350+.',
    }),
    defineField({
      name: 'hero',
      type: 'object',
      group: 'homepage',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'headline',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'intro',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'gridCaption',
          title: 'Byte grid caption',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'about',
      type: 'object',
      group: 'homepage',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'paragraphs',
          type: 'array',
          of: [defineArrayMember({ type: 'text', rows: 3 })],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'photo',
          type: 'photo',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'focusAreas',
      title: 'What we work on',
      type: 'array',
      group: 'homepage',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'join',
      type: 'object',
      group: 'contact',
      description: 'This section stays hidden until there is a URL here or an email below.',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'body', type: 'text', rows: 2 }),
        defineField({ name: 'label', title: 'Button label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      description: 'Links without a URL stay hidden.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
