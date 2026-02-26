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
      of: [
        { type: "block" },
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
