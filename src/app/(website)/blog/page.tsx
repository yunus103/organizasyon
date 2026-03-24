import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Organizasyon dünyasından haberler, ipuçları ve ilhamlar. Nilay Organizasyon Blog.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await sanityFetch<Post[]>({
    query: postsQuery,
    tags: ["post"],
  });

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

            {posts.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">Henüz blog yazısı yok.</p>
                <p className="text-sm mt-2">Yakında yeni içerikler eklenecek.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
