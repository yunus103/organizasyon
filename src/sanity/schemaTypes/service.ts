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
        {
          name: "objectFit",
          title: "Görsel Sığdırma (Fit)",
          type: "string",
          options: {
            list: [
              {
                title:
                  "Doldur (Cover) - Alanı doldurur, kenarlardan kesebilir.",
                value: "cover",
              },
              {
                title:
                  "Sığdır (Contain) - Tamamı görünür, kenarlarda boşluk bırakabilir.",
                value: "contain",
              },
            ],
            layout: "radio",
          },
          initialValue: "cover",
        },
        {
          name: "objectPosition",
          title: "Görsel Hizalama (Position)",
          type: "string",
          options: {
            list: [
              { title: "Merkez (Center)", value: "center" },
              { title: "Üst (Top)", value: "top" },
              { title: "Alt (Bottom)", value: "bottom" },
              { title: "Sol (Left)", value: "left" },
              { title: "Sağ (Right)", value: "right" },
            ],
          },
          initialValue: "center",
          description:
            "Görsel kesilirken hangi kısmının öncelikli olarak görüneceğini belirler (örneğin 'cover' ile).",
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
            {
              name: "objectFit",
              title: "Görsel Sığdırma (Fit)",
              type: "string",
              options: {
                list: [
                  {
                    title:
                      "Doldur (Cover) - Alanı doldurur, kenarlardan kesebilir.",
                    value: "cover",
                  },
                  {
                    title:
                      "Sığdır (Contain) - Tamamı görünür, kenarlarda boşluk bırakabilir.",
                    value: "contain",
                  },
                ],
                layout: "radio",
              },
              initialValue: "cover",
            },
            {
              name: "objectPosition",
              title: "Görsel Hizalama (Position)",
              type: "string",
              options: {
                list: [
                  { title: "Merkez (Center)", value: "center" },
                  { title: "Üst (Top)", value: "top" },
                  { title: "Alt (Bottom)", value: "bottom" },
                  { title: "Sol (Left)", value: "left" },
                  { title: "Sağ (Right)", value: "right" },
                ],
              },
              initialValue: "center",
              description:
                "Görsel kesilirken hangi kısmının öncelikli olarak görüneceğini belirler.",
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
