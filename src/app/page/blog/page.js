'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2Icon, Edit2Icon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState(() => {
    const storedBlogs = localStorage.getItem('blogs');
    return storedBlogs ? JSON.parse(storedBlogs) : [];
  });

  const handleDeleteBlog = (index) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const updatedBlogs = blogs.filter((_, i) => i !== index);
      setBlogs(updatedBlogs);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      toast.success('Blog deleted successfully!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <Link href="/page/blog/add-blog">
          <Button variant="outline">Add Blog</Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center text-gray-500">No blogs available.</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Blog Title</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="w-12 h-12 object-cover" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">{blog.title}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/page/blog/add-blog?id=${index}`}>
                    <Button variant="outline" className="mr-2">
                      <Edit2Icon size={16} />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDeleteBlog(index)}
                  >
                    <Trash2Icon size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BlogListPage;
