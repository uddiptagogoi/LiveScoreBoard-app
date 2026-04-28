"use client";
import { useState } from "react";

export default function UserPageDetails() {
  const [title, setTitle] = useState("");

  // POST
  const createPost = async () => {
    await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  };

  // GET
  const getPosts = async () => {
    const res = await fetch("http://localhost:8080/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={createPost}>Create Post</button>
      <button onClick={getPosts}>Load Posts</button>
    </div>
  );
}
