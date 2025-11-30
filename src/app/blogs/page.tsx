import { Metadata } from "next";
import BlogsClient from "./blogs-client";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read my latest articles about web development, technology, and more.",
};

export default function BlogsPage() {
  return <BlogsClient />;
}

