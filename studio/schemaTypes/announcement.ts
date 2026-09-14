import { BellIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'announcement',
  title: 'Site announcement',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({ name: 'title', title: 'Headline', type: 'string', validation: (rule) => rule.required().min(5).max(90) }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 5, validation: (rule) => rule.required().min(15).max(600) }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      initialValue: 'information',
      options: {
        list: [
          { title: 'Information', value: 'information' },
          { title: 'Urgent notice', value: 'urgent' },
          { title: 'Celebration', value: 'celebration' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'draft',
      options: {
        list: [
          { title: 'Draft — never show', value: 'draft' },
          { title: 'Active — show on the website', value: 'active' },
          { title: 'Archived — finished', value: 'archived' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'startsAt', title: 'Start showing', type: 'datetime', description: 'Optional. Leave empty to start immediately when status is Active.' }),
    defineField({
      name: 'endsAt',
      title: 'Stop showing',
      type: 'datetime',
      description: 'Optional. Leave empty to keep showing until archived.',
      validation: (rule) => rule.custom((endsAt, context) => {
        const startsAt = (context.document as { startsAt?: string } | undefined)?.startsAt;
        return !endsAt || !startsAt || new Date(endsAt) > new Date(startsAt) || 'The stop time must be after the start time.';
      }),
    }),
    defineField({
      name: 'callToAction',
      title: 'Optional button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Button text', type: 'string', validation: (rule) => rule.max(40) }),
        defineField({ name: 'url', title: 'Button link', type: 'url', validation: (rule) => rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) }),
        defineField({ name: 'openInNewTab', title: 'Open in a new tab', type: 'boolean', initialValue: false }),
      ],
      validation: (rule) => rule.custom((value) => {
        if (!value) return true;
        return Boolean(value.label) === Boolean(value.url) || 'Add both the button text and button link, or leave both empty.';
      }),
    }),
    defineField({ name: 'dismissible', title: 'Allow visitors to close it', type: 'boolean', initialValue: true }),
    defineField({ name: 'priority', title: 'Priority', type: 'number', description: 'If several announcements are active, the highest priority is shown.', initialValue: 50, validation: (rule) => rule.required().integer().min(0).max(100) }),
  ],
  orderings: [{ title: 'Priority, highest', name: 'priorityDesc', by: [{ field: 'priority', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', status: 'status', startsAt: 'startsAt' },
    prepare({ title, status, startsAt }) {
      const timing = startsAt ? new Date(startsAt).toLocaleDateString('en-NG') : 'Immediately';
      return { title, subtitle: `${status ?? 'draft'} · ${timing}` };
    },
  },
});
