// src/app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">雑記ブログ（テスト）</h1>

      <p className="mt-2 text-sm text-gray-600">
        Next.js（App Router）+ Markdown で作る雑記ブログです。
      </p>

      {posts.length === 0 ? (
        <div className="mt-6 rounded border p-4">
          <p className="text-sm">
            まだ記事がありません。
            <code className="px-1">content/posts</code> に Markdown を追加してください。
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {posts.map((p) => (
            <li key={p.slug} className="rounded border p-4 hover:bg-gray-50">
              <Link href={`/posts/${p.slug}`}>
                <h2 className="text-lg font-semibold">{p.title}</h2>
              </Link>

              <div className="mt-1 text-xs text-gray-600">{p.date}</div>

              {p.description ? (
                <p className="mt-2 text-sm text-gray-700">
                  {p.description}
                </p>
              ) : null}

              <div className="mt-3">
                <Link
                  href={`/posts/${p.slug}`}
                  className="text-sm underline"
                >
                  記事を読む →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}