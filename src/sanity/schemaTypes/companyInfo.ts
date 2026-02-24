import { defineField, defineType } from "sanity";

export const companyInfo = defineType({
  name: "companyInfo",
  title: "Company Information",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({
          name: "whatsapp",
          title: "WhatsApp Number",
          description: "Enter with country code, e.g., 905XXXXXXXXX",
          type: "string",
        }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "address", title: "Address", type: "text" }),
        defineField({
          name: "socials",
          title: "Social Media",
          type: "object",
          fields: [
            defineField({
              name: "facebook",
              title: "Facebook URL",
              type: "url",
            }),
            defineField({
              name: "instagram",
              title: "Instagram URL",
              type: "url",
            }),
            defineField({ name: "twitter", title: "Twitter URL", type: "url" }),
            defineField({
              name: "linkedin",
              title: "LinkedIn URL",
              type: "url",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "aboutImage",
      title: "About Page Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "aboutContent",
      title: "About Page Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "pageHeroImage",
      title: "Page Hero Background Image",
      type: "image",
      description:
        "Best size for responsive behavior: 1920x600 pixels or similar widescreen aspect ratio. Center your main visual elements.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
});
