"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { StepBackIcon } from "lucide-react";
import Image from "next/image";
import JoditEditor from "jodit-react";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  useEffect(() => {
    if (blogId) {
      const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
      const blogToEdit = storedBlogs[blogId];
      if (blogToEdit) {
        setEditingBlog(blogToEdit);
        setTitle(blogToEdit.title);
        setImage(blogToEdit.image);
        setContent(blogToEdit.content);
      }
    }
  }, [blogId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleAddOrUpdateBlog = (e) => {
    e.preventDefault();

    if (!title || !image || !content) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const newBlog = {
      title,
      image,
      content,
    };

    let storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    if (!Array.isArray(storedBlogs)) {
      storedBlogs = [];
    }

    if (editingBlog) {
      storedBlogs[blogId] = newBlog;
      toast.success("Blog updated successfully!");
    } else {
      storedBlogs.push(newBlog);
      toast.success("Blog added successfully!");
    }

    localStorage.setItem("blogs", JSON.stringify(storedBlogs));
    router.push("/page/blog");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editingBlog ? "Edit Blog" : "Add Blog"}
      </h1>

      <form onSubmit={handleAddOrUpdateBlog} className="space-y-4">
        <div>
          <Label htmlFor="title">Blog Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Upload Image *</Label>
          <Input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            required
          />
          {image && (
            <img
              src={image}
              alt="Blog Image"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Content (Rich Text)</label>
          <JoditEditor
            value={content}
            onChange={setContent} // Update the content state as the editor content changes
          />
        </div>

        <div className="gap-2">
          <Button type="submit">{editingBlog ? "Update Blog" : "Add Blog"}</Button>
          <Button variant="outline" onClick={() => router.push("/page/blog")}>
            <StepBackIcon /> Back to Blogs
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPage;
