import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'managedPage',
  title: 'Managed Page',
  type: 'document',
  fields: [
    defineField({ name: 'pageName', title: 'Page name', type: 'string' }),
    defineField({ name: 'pageUrl', title: 'Facebook URL', type: 'string' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'pageName', subtitle: 'pageUrl' },
  },
});
