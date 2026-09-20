import { CalendarIcon } from '@sanity/icons/Calendar';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'title', title: 'Event name', type: 'string', validation: (rule) => rule.required().min(5).max(120) }),
    defineField({
      name: 'slug', title: 'Page address', type: 'slug',
      description: 'Click Generate after entering the event name.',
      options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: {
        list: [
          { title: 'Prayer & fellowship', value: 'Prayer & fellowship' },
          { title: 'Bible teaching', value: 'Bible teaching' },
          { title: 'National gathering', value: 'National gathering' },
          { title: 'Women in ministry', value: 'Women in ministry' },
          { title: 'Youth', value: 'Youth' },
          { title: 'Training', value: 'Training' },
          { title: 'Missions', value: 'Missions' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary', title: 'Short description', type: 'text', rows: 4,
      description: 'Shown on the Events page and homepage.',
      validation: (rule) => rule.required().min(30).max(320),
    }),
    defineField({
      name: 'scheduleType', title: 'Schedule type', type: 'string', initialValue: 'dated',
      options: {
        list: [
          { title: 'A dated event', value: 'dated' },
          { title: 'A recurring gathering', value: 'recurring' },
          { title: 'Date to be announced', value: 'tba' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate', title: 'Start date and time', type: 'datetime',
      hidden: ({ document }) => document?.scheduleType !== 'dated',
      validation: (rule) => rule.custom((value, context) => {
        const scheduleType = (context.document as { scheduleType?: string } | undefined)?.scheduleType;
        return scheduleType !== 'dated' || value ? true : 'Add the event start date and time.';
      }),
    }),
    defineField({
      name: 'endDate', title: 'End date and time', type: 'datetime',
      description: 'Optional for a one-day event.',
      hidden: ({ document }) => document?.scheduleType !== 'dated',
      validation: (rule) => rule.custom((value, context) => {
        const startDate = (context.document as { startDate?: string } | undefined)?.startDate;
        return !value || !startDate || new Date(value) >= new Date(startDate) || 'The end time must be after the start time.';
      }),
    }),
    defineField({
      name: 'recurrenceLabel', title: 'Recurring schedule', type: 'string',
      description: 'For example: Every Monday at 5:00 pm.',
      hidden: ({ document }) => document?.scheduleType !== 'recurring',
      validation: (rule) => rule.custom((value, context) => {
        const scheduleType = (context.document as { scheduleType?: string } | undefined)?.scheduleType;
        return scheduleType !== 'recurring' || value ? true : 'Describe when this gathering repeats.';
      }),
    }),
    defineField({ name: 'venue', title: 'Venue name', type: 'string', validation: (rule) => rule.required().max(120) }),
    defineField({ name: 'address', title: 'Full address', type: 'text', rows: 3, validation: (rule) => rule.max(260) }),
    defineField({ name: 'mapUrl', title: 'Google Maps link', type: 'url', validation: (rule) => rule.uri({ scheme: ['http', 'https'] }) }),
    defineField({
      name: 'featuredImage', title: 'Event image', type: 'image', options: { hotspot: true },
      fields: [defineField({
        name: 'alt', title: 'Alternative text', type: 'string',
        description: 'Describe the image for visitors who cannot see it.',
        validation: (rule) => rule.required().min(8).max(160),
      })],
    }),
    defineField({
      name: 'details', title: 'Additional details', type: 'array',
      of: [defineArrayMember({
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' }, { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' }, { title: 'Quote', value: 'blockquote' },
        ],
        marks: { annotations: [defineArrayMember({
          name: 'link', title: 'Link', type: 'object',
          fields: [defineField({ name: 'href', title: 'Web address', type: 'url', validation: (rule) => rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }) })],
        })] },
      })],
    }),
    defineField({
      name: 'cancelled', title: 'Event cancelled', type: 'boolean',
      description: 'Keep the event visible but clearly mark it as cancelled.', initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Start date, soonest', name: 'startDateAsc', by: [{ field: 'startDate', direction: 'asc' }] },
    { title: 'Recently updated', name: 'updatedDesc', by: [{ field: '_updatedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', scheduleType: 'scheduleType', startDate: 'startDate', recurrenceLabel: 'recurrenceLabel', media: 'featuredImage', cancelled: 'cancelled' },
    prepare({ title, scheduleType, startDate, recurrenceLabel, media, cancelled }) {
      const schedule = scheduleType === 'dated' && startDate
        ? new Date(startDate).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })
        : scheduleType === 'recurring' ? recurrenceLabel || 'Recurring gathering' : 'Date to be announced';
      return { title: cancelled ? `${title} — Cancelled` : title, subtitle: schedule, media };
    },
  },
});
