import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'stat',
  title: 'Stat',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. PAGES MANAGED' }),
    defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 22.2K or $0.49' }),
    defineField({ name: 'highlighted', title: 'Highlight in accent color', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
});
