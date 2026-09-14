import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsPost',
  title: 'News post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(110),
    }),
    defineField({
      name: 'slug',
      title: 'Page address',
      type: 'slug',
      description: 'Click Generate after entering the headline.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short summary',
      type: 'text',
      rows: 3,
      description: 'Used on the News page and in search previews.',
      validation: (rule) => rule.required().min(40).max(220),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'National update', value: 'National update' },
          { title: 'Local churches', value: 'Local churches' },
          { title: 'Missions', value: 'Missions' },
          { title: 'Discipleship', value: 'Discipleship' },
          { title: 'Testimony', value: 'Testimony' },
          { title: 'Church life', value: 'Church life' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author or source',
      type: 'string',
      initialValue: 'The Church of God Nigeria',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'featured',
      title: 'Feature this story',
      type: 'boolean',
      description: 'The newest featured story receives the prominent position on the News page.',
      initialValue: false,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the image for visitors who cannot see it.',
          validation: (rule) => rule.required().min(8).max(160),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Story',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({ name: 'href', title: 'Web address', type: 'url', validation: (rule) => rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }) }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required().min(8).max(160) }),
            defineField({ name: 'caption', title: 'Caption', type: 'string', validation: (rule) => rule.max(180) }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [{ title: 'Publish date, newest', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'featuredImage' },
  },
});
