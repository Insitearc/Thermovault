import BlogPostDetailPage from "./BlogPostDetailClient";
import initialBlogs from "@/data/blogs.json";

export async function generateStaticParams() {
  return initialBlogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogPostDetailPage params={params} />;
}
