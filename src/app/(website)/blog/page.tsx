import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery, blogCategoriesQuery } from "@/sanity/lib/queries";
import { Post, BlogCategory } from "@/types";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Suspense } from "react";
import { BlogListClient } from "@/components/blog/BlogListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Organizasyon dünyasından haberler, ipuçları ve ilhamlar. Nilay Organizasyon Blog.",
  alternates: {
    canonical: "/blog",
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<Post[]>({
      query: postsQuery,
      tags: ["post", "blogCategory"],
    }),
    sanityFetch<BlogCategory[]>({
      query: blogCategoriesQuery,
      tags: ["blogCategory"],
    }),
  ]);

  return (
    <>
      <PageHero
        title="Blog"
        breadcrumbs={[{ label: "Blog" }]}
      />

      <div className="pb-16 md:pb-24 md:-mt-8 relative z-20">
        <Container>
          <div className="bg-white rounded-3xl shadow-xl px-4 py-10 md:p-12 mb-12">
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Organizasyon dünyasından haberler, ilham veren hikâyeler ve faydalı ipuçları.
            </p>

            <Suspense fallback={<div className="text-center py-20">Yükleniyor...</div>}>
              <BlogListClient initialPosts={posts} categories={categories} />
            </Suspense>
          </div>
        </Container>
      </div>
    </>
  );
}
