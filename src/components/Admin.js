import React, { useState } from 'react';

function Admin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const postData = { title, content };
    
    fetch('http://localhost:3000/api/blog-posts', {  // Local backend API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(process.env.REACT_APP_ADMIN_USERNAME + ':' + process.env.REACT_APP_ADMIN_PASSWORD)
      },
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Blog post created successfully!');
      setTitle('');
      setContent('');
    })
    .catch(err => {
      console.error('Error creating post:', err);
      alert('Failed to create blog post');
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows="6"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg">Submit</button>
      </form>
    </div>
  );
}

export default Admin;
