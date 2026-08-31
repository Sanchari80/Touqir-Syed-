import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'clientName', title: 'Client / page name', type: 'string' }),
    defineField({ name: 'clientCategory', title: 'Client category', type: 'string', description: 'e.g. IT SERVICES, OWN PAGE' }),
    defineField({ name: 'statusBadge', title: 'Status badge', type: 'string', description: 'e.g. 16-20 JUL 2026 or ONGOING' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', description: 'e.g. "Get more messages" campaign — 4-day test' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
      description: 'e.g. Budget: $3.90/$1/day, Views: 22,273',
    }),
    defineField({ name: 'featuredImage', title: 'Optional screenshot / creative', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'headline', subtitle: 'clientName' },
  },
});
