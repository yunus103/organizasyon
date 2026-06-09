import { defineField, defineType } from "sanity";
import { turkishSlugify } from "../lib/slugify";

export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog Kategorisi",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Kategori Adı",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Kategori Linki (Slug)",
      type: "slug",
      description: "URL'de görünecek link (Örn: dugun-ipyclari).",
      options: {
        source: "title",
        maxLength: 96,
        slugify: turkishSlugify,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
