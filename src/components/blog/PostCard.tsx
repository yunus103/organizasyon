import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-muted">
        {post.mainImage ? (
          <Image
            src={post.mainImage}
            alt={post.mainImageAlt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <span className="text-primary/30 text-5xl font-serif font-bold">Blog</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Date */}
        {post.publishedAt && (
          <div className="flex items-center gap-1.5 text-secondary text-sm font-medium mb-3">
            <Calendar size={14} />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold font-serif text-primary mb-3 leading-snug group-hover:text-secondary transition-colors duration-200">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* CTA */}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:gap-3 transition-all duration-200"
        >
          Devamını Oku
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
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
