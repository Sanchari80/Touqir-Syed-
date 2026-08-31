import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'availableBadge', title: 'Availability badge text', type: 'string', initialValue: 'AVAILABLE FOR NEW CAMPAIGNS' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'title', title: 'Title / role', type: 'string' }),
    defineField({ name: 'bio', title: 'Short bio', type: 'text' }),
    defineField({ name: 'profilePhoto', title: 'Profile photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'contactPrompt', title: 'Contact prompt heading', type: 'string', initialValue: 'Have a campaign that needs to perform?' }),
    defineField({ name: 'contactUrl', title: 'Contact link (Facebook, email, etc.)', type: 'string' }),
    defineField({ name: 'footerText', title: 'Footer text', type: 'string' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title' },
  },
});
