import React, { useEffect, useState } from 'react';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/blog-posts')  // Local backend API
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <div className="space-y-6 mt-4">
        {posts.map((post, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white shadow">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.content}</p>
            <p className="mt-4 text-gray-400 text-sm">Posted on: {new Date(post.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
