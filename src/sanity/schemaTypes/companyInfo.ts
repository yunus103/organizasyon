import { defineField, defineType } from 'sanity'

export const companyInfo = defineType({
  name: 'companyInfo',
  title: 'Company Information',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'address', title: 'Address', type: 'text' }),
        defineField({
          name: 'socials',
          title: 'Social Media',
          type: 'object',
          fields: [
             defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
             defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
             defineField({ name: 'twitter', title: 'Twitter URL', type: 'url' }),
             defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
          ]
        })
      ]
    }),
  ],
})
