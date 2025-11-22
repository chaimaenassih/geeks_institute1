import React from "react";
import posts from "../posts.json";

function PostList() {
  return (
    <div className="card m-3 p-4 text-center">
      {posts.map((post) => (
        <div key={post.id} className="mb-4">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
