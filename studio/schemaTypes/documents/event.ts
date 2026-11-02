import { CalendarIcon } from '@sanity/icons/Calendar'
import { defineArrayMember, defineField, defineType } from 'sanity'

const usesDate = (timing?: string) => timing === 'day' || timing === 'month'

export const event = defineType({
  name: 'event',
  type: 'document',
  icon: CalendarIcon,
  orderings: [
    {
      title: 'Newest first',
      name: 'newestFirst',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'A unique name for this event. Click Generate.',
      options: {
        source: (doc) => [doc.title, doc.date ?? doc.academicYear].filter(Boolean).join(' '),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'ctf',
      options: {
        list: [
          { title: 'CTF', value: 'ctf' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Talk', value: 'talk' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timing',
      title: 'When is it?',
      type: 'string',
      description: 'Events with a future date, or "to be announced", appear as upcoming.',
      initialValue: 'day',
      options: {
        list: [
          { title: 'I know the exact date', value: 'day' },
          { title: 'I only know the month', value: 'month' },
          { title: 'I only know the academic year', value: 'academicYear' },
          { title: 'Upcoming, date to be announced', value: 'toBeAnnounced' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      description: 'If you only know the month, pick any day in it.',
      hidden: ({ document }) => !usesDate(document?.timing as string),
      validation: (rule) =>
        rule.custom((date, context) =>
          usesDate(context.document?.timing as string) && !date ? 'Add a date' : true,
        ),
    }),
    defineField({
      name: 'academicYear',
      type: 'string',
      description: 'For example 2024-25.',
      hidden: ({ document }) => document?.timing !== 'academicYear',
      validation: (rule) =>
        rule.custom((year, context) => {
          if (context.document?.timing !== 'academicYear') return true
          return /^\d{4}-\d{2}$/.test(year ?? '') || 'Use the format 2024-25'
        }),
    }),
    defineField({
      name: 'summary',
      type: 'string',
      description: 'One line for the events list, such as "300+ participants, 30+ teams".',
    }),
    defineField({
      name: 'organisers',
      type: 'string',
      description: 'For example "Amrik Hore and Sharthak Ghosh".',
    }),
    defineField({
      name: 'links',
      type: 'array',
      description: 'Links without a URL stay hidden. Use "Register" for sign-ups.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'eventLink',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      description: 'Shows this event large at the top of past events. The newest featured event wins.',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Only shown on the featured event.',
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: 'stats',
      type: 'array',
      description: 'Only shown on the featured event.',
      hidden: ({ document }) => !document?.featured,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'eventStat',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({
      name: 'photo',
      type: 'photo',
      description: 'Only shown on the featured event.',
      hidden: ({ document }) => !document?.featured,
    }),
  ],
  preview: {
    select: { title: 'title', date: 'date', academicYear: 'academicYear', timing: 'timing' },
    prepare: ({ title, date, academicYear, timing }) => ({
      title,
      subtitle: timing === 'toBeAnnounced' ? 'Date to be announced' : (date ?? academicYear),
    }),
  },
})
