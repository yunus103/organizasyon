"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Post, BlogCategory } from "@/types";
import { PostCard } from "./PostCard";

interface BlogListClientProps {
  initialPosts: Post[];
  categories: BlogCategory[];
}

export function BlogListClient({ initialPosts, categories }: BlogListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);

  // Update active category when URL params change
  useEffect(() => {
    setActiveCategory(searchParams.get("category"));
  }, [searchParams]);

  const handleCategoryClick = (slug: string | null) => {
    if (slug) {
      router.push(`/blog?category=${slug}`, { scroll: false });
    } else {
      router.push(`/blog`, { scroll: false });
    }
  };

  // Only show categories that have at least one post
  const activeCategories = useMemo(() => {
    return categories.filter((cat) =>
      initialPosts.some((post) => post.category?.slug === cat.slug)
    );
  }, [categories, initialPosts]);

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (!activeCategory) return initialPosts;
    return initialPosts.filter((post) => post.category?.slug === activeCategory);
  }, [activeCategory, initialPosts]);

  return (
    <div>
      {/* Category Filter Pills */}
      {activeCategories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              !activeCategory
                ? "bg-secondary text-white shadow-md shadow-secondary/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tümü
          </button>
          {activeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.slug
                  ? "bg-secondary text-white shadow-md shadow-secondary/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">Bu kategoride henüz yazı bulunmuyor.</p>
          <button
            onClick={() => handleCategoryClick(null)}
            className="text-secondary font-medium mt-4 hover:underline"
          >
            Tüm yazılara dön
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
