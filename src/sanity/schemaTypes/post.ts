import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Yayınlanma Tarihi",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      description:
        "En ideal boyut: 1200 × 630 piksel (16:9 oran). Blog kartları ve sosyal medya paylaşımları için kullanılır.",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternatif Metin",
          description:
            "Görüntü yüklenemediğinde görüntülenecek metin. SEO ve erişilebilirlik için zorunludur.",
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Özet",
      description:
        "Blog kartlarında ve arama sonuçlarında görünecek kısa açıklama. 50-160 karakter arası olması SEO açısından idealdir.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(300),
    }),
    defineField({
      name: "body",
      title: "İçerik",
      description: "Blog yazısının ana içeriği. Zengin metin editörü ile düzenleyebilirsiniz.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Başlık 1 (H1)", value: "h1" },
            { title: "Başlık 2 (H2)", value: "h2" },
            { title: "Başlık 3 (H3)", value: "h3" },
            { title: "Alıntı", value: "blockquote" },
          ],
          lists: [
            { title: "Madde İşaretli Liste", value: "bullet" },
            { title: "Numaralı Liste", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Kalın (Bold)", value: "strong" },
              { title: "İtalik", value: "em" },
              { title: "Altı Çizili", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Bağlantı (Link)",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    description: "https:// ile başlamalıdır.",
                    validation: (Rule: any) =>
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                  {
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Yeni Sekmede Aç",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternatif Metin",
              description: "SEO ve erişilebilirlik için gereklidir.",
            },
            {
              name: "position",
              type: "string",
              title: "Görsel Konumu",
              description:
                "Görselin metin içindeki konumunu belirler. Sol ve Sağ seçenekleri görseli metin içine yerleştirir.",
              options: {
                list: [
                  { title: "Sol", value: "left" },
                  { title: "Merkez", value: "center" },
                  { title: "Sağ", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "center",
            },
            {
              name: "size",
              type: "string",
              title: "Görsel Boyutu",
              description: "Görselin içerikteki genişliğini belirler.",
              options: {
                list: [
                  { title: "Çok Küçük (%25)", value: "tiny" },
                  { title: "Küçük (%33)", value: "small" },
                  { title: "Orta (%50)", value: "medium" },
                  { title: "Geniş (%66)", value: "large" },
                  { title: "Çok Geniş (%75)", value: "xlarge" },
                  { title: "Tam Genişlik (%100)", value: "full" },
                ],
                layout: "radio",
              },
              initialValue: "full",
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
            select: { title: "htmlCode" },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Başlığı",
      description:
        "Arama motorlarında görünecek başlık. Boş bırakılırsa yazı başlığı kullanılır. 50-60 karakter önerilir.",
      type: "string",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Açıklaması (Meta Description)",
      description:
        "Arama motorlarında görünecek açıklama. 120-160 karakter arası olması idealdir.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
  ],
  orderings: [
    {
      title: "Yayın Tarihi (Yeniden Eskiye)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Yayın Tarihi (Eskiden Yeniye)",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "mainImage",
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.subtitle
          ? new Date(selection.subtitle).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Tarih belirtilmemiş",
        media: selection.media,
      };
    },
  },
});
