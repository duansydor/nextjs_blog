import Image from 'next/image'
import fs from "fs"
import Link from 'next/link';
import matter from 'gray-matter';
const getPostMetadata = () => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));

  // gay-matter data from each file
  const posts = markdownPosts.map((filename) => {
    const fileContents = fs.readFileSync(`posts/${filename}`, "utf8");
    const matterResult = matter(fileContents)
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: filename.replace(".md", "")
    }
  });
  return posts;
}
export default function Home() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => {
    return (
      <div className='m-1 container bg-gray-500 rounded-sm w-60 p-10 text-center text-gray-200 flex flex-col'>
        <Link href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
        <span>{post.subtitle}</span>
      </div>
    )
  })
  return (
    <div className='container bg-gray-100 flex flex-col items-center'>
      {postPreviews}
    </div>
  )
}
