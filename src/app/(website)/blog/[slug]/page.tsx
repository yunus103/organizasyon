import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Calendar } from "lucide-react";
import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postBySlugQuery, postSlugsQuery, postsQuery } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await sanityFetch<{ slug: string }[]>({
    query: postSlugsQuery,
    tags: ["post"],
  });
  return posts.map((p) => ({ slug: p.slug }));
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`],
  });

  if (!post) return { title: "Blog Yazısı Bulunamadı" };

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.nilayorganizasyon.com";

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.mainImage
        ? [
            {
              url: post.mainImage,
              width: 1200,
              height: 630,
              alt: post.mainImageAlt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.mainImage ? [post.mainImage] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const post = await sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`],
  });

  if (!post) notFound();

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.nilayorganizasyon.com";

  // JSON-LD: Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${baseUrl}/blog/${post.slug}`,
    image: post.mainImage
      ? {
          "@type": "ImageObject",
          url: post.mainImage,
          width: 1200,
          height: 630,
        }
      : undefined,
    author: {
      "@type": "Organization",
      name: "Nilay Organizasyon",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Nilay Organizasyon",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };

  return (
    <article className="pb-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <Container className="mt-12">
        <div className="max-w-3xl mx-auto">
          {/* Meta info */}
          {post.publishedAt && (
            <div className="flex items-center gap-2 text-secondary text-sm font-medium mb-8">
              <Calendar size={15} />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          )}

          {/* Main Image */}
          {post.mainImage && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl mb-10 border border-gray-100">
              <Image
                src={post.mainImage}
                alt={post.mainImageAlt || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Post Body */}
          <div className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary break-words flow-root">
            <PortableText
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={post.body as any}
              components={{
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold font-serif text-primary mt-10 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold font-serif text-primary mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }) => (
                    <p className="mb-4 leading-relaxed">{children}</p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-secondary pl-5 italic text-muted-foreground my-6">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-primary">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  underline: ({ children }) => (
                    <span className="underline">{children}</span>
                  ),
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      target={value?.openInNewTab ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline font-medium"
                    >
                      {children}
                    </a>
                  ),
                },
                types: {
                  image: ({ value }: any) => {
                    if (!value?.asset?._ref) return null;

                    const {
                      alt = "Blog Görseli",
                      position = "center",
                      size = "large",
                    } = value;

                    let alignClass = "mx-auto";
                    let widthClass = "w-full";
                    let wrapClass = "my-8";

                    if (position === "left") {
                      alignClass = "float-left mr-4 md:mr-8 mb-4";
                    } else if (position === "right") {
                      alignClass = "float-right ml-4 md:ml-8 mb-4";
                    }

                    if (size === "tiny") {
                      widthClass = "w-1/4";
                    } else if (size === "small") {
                      widthClass = "w-1/3";
                    } else if (size === "medium") {
                      widthClass = "w-1/2";
                    } else if (size === "large") {
                      widthClass = "w-2/3";
                    } else if (size === "xlarge") {
                      widthClass = "w-3/4";
                    } else {
                      widthClass = "w-full";
                      alignClass = "mx-auto block mb-8";
                    }

                    const imgUrl = urlFor(value).url();

                    // Extract dimensions from Sanity asset ref (format: image-id-WIDTHxHEIGHT-format)
                    const dimensions = value.asset._ref.split("-")[2].split("x");
                    const imgWidth = parseInt(dimensions[0]);
                    const imgHeight = parseInt(dimensions[1]);
                    const aspectRatio = imgWidth / imgHeight;

                    return (
                      <div
                        className={`${alignClass} ${widthClass} relative z-10`}
                        style={{ 
                          aspectRatio: `${imgWidth} / ${imgHeight}`,
                          maxHeight: '75vh',
                        }}
                      >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                          <Image
                            src={imgUrl}
                            alt={alt}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    );
                  },
                  customHtml: ({ value }: any) => {
                    if (!value?.htmlCode) return null;
                    return (
                      <div
                        className="clear-none overflow-x-auto w-full"
                        dangerouslySetInnerHTML={{ __html: value.htmlCode }}
                      />
                    );
                  },
                },
              }}
            />
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Tüm Blog Yazıları
            </a>
          </div>
        </div>
      </Container>
    </article>
  );
}
