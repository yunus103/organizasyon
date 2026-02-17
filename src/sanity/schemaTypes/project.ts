import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Etkinlikler",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Etkinlik Başlığı",
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
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Düğün", value: "Düğün" },
          { title: "Nişan", value: "Nişan" },
          { title: "Kurumsal", value: "Kurumsal" },
          { title: "Mezuniyet", value: "Mezuniyet" },
          { title: "Doğum Günü", value: "Doğum Günü" },
          { title: "Parti/Kutlama", value: "Parti" },
          { title: "Diğer", value: "Diğer" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Kapak Görseli",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternatif Metin",
          description: "Erişilebilirlik ve SEO için gereklidir.",
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Galeri Görselleri",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Kısa Açıklama",
      description: "Kartlarda ve özet alanlarında görünecek kısa açıklama.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "details",
      title: "Detaylı Açıklama",
      description: "Etkinlik detay sayfasında görünecek zengin metin içeriği.",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "services",
      title: "İlgili Hizmetler",
      description: "Bu etkinlikte kullanılan veya ilişkili hizmetleri seçin.",
      type: "array",
      of: [{ type: "reference", to: { type: "service" } }],
    }),
    defineField({
      name: "date",
      title: "Tarih",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Konum",
      type: "string",
    }),
  ],
});
