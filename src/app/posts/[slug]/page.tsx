import { getPost } from "@/lib/posts";

const SITE_URL = "https://your-site.vercel.app"; // ←ここだけ変更

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const post = await getPost(slug);
  const title = post.title || "記事";
  const description = post.description || "記事詳細ページです。";
  const url = `${SITE_URL}/posts/${post.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [
        {
          url: "/ogp.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/ogp.png"],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await getPost(slug);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">{post.title}</h1>

      <div className="mt-2 text-xs text-gray-600">
        {post.date}
      </div>

      <article
        className="prose prose-neutral mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}