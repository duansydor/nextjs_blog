import React from 'react';
import fs from "fs"
import Markdown from 'markdown-to-jsx';
import matter from 'gray-matter';
const getPostContent = (slug) => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content)
    return matterResult;
}

function PostPage(props) {
    const slug = props.params.slug;
    const post = getPostContent(slug);
    return (
        <div>
            <h1>{post.data.title}</h1>
            <Markdown>{post.content}</Markdown>

        </div>
    );
}

export default PostPage;