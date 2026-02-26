import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon Name (Lucide React)",
      type: "string",
      description: 'e.g. "Music", "Camera", "Utensils"',
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Required for accessibility and SEO.",
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Required for accessibility and SEO.",
            },
          ],
        },
      ],
      description: "Additional images for the service gallery",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Important for SEO and accessibility.",
            },
            {
              name: "position",
              type: "string",
              title: "Image Position",
              description:
                "Choose where the image should be placed relative to text. Left and Right will float the image.",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Center", value: "center" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "center",
            },
            {
              name: "size",
              type: "string",
              title: "Image Size",
              description: "Choose the size of the image.",
              options: {
                list: [
                  { title: "Small (33%)", value: "small" },
                  { title: "Medium (50%)", value: "medium" },
                  { title: "Large (100%)", value: "large" },
                ],
                layout: "radio",
              },
              initialValue: "large",
            },
          ],
        },
        {
          type: "object",
          name: "customHtml",
          title: "Özel HTML Kodu (Tablo vb.)",
          fields: [
            {
              name: "htmlCode",
              title: "HTML Kodu",
              description:
                "Örneğin başka bir siteden kopyaladığınız tablo kodunu (<table>...</table>) buraya yapıştırabilirsiniz.",
              type: "text",
            },
          ],
          preview: {
            select: {
              title: "htmlCode",
            },
            prepare(selection: any) {
              return {
                title: "Özel HTML / Etiket",
                subtitle: selection.title
                  ? selection.title.substring(0, 50) + "..."
                  : "Boş",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showOnHome",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
});
