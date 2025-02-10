'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"; // For routing
import { toast } from "sonner";
import { StepBackIcon } from "lucide-react";

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const router = useRouter();

  // Get category ID from URL query parameters (if editing)
  const queryParams = new URLSearchParams(window.location.search);
  const categoryId = queryParams.get("id");

  // Load category data if editing
  useEffect(() => {
    if (categoryId) {
      const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
      const categoryToEdit = storedCategories.find((category) => category.id === categoryId);
      if (categoryToEdit) {
        setEditingCategory(categoryToEdit);
        setCategoryName(categoryToEdit.name);
        setCategoryImage(categoryToEdit.image); // base64 string
      }
    }
  }, [categoryId]);

  // Handle image change (store as base64 string)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result); // store base64 image data
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  };

  // Save category to localStorage (Add or Edit)
  const handleSaveCategory = (e) => {
    e.preventDefault();

    const newCategory = {
      id: editingCategory?.id || Date.now().toString(), // New ID for new category
      name: categoryName,
      image: categoryImage, // Store base64 image string
    };

    let storedCategories = JSON.parse(localStorage.getItem('categories')) || [];

    if (editingCategory) {
      // Update existing category
      const updatedCategories = storedCategories.map((category) =>
        category.id === editingCategory.id ? newCategory : category
      );
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      toast.success("Category updated successfully!");
    } else {
      // Add new category
      storedCategories.push(newCategory);
      localStorage.setItem('categories', JSON.stringify(storedCategories));
      toast.success("Category added successfully!");
    }

    router.push("/page/Category"); // Redirect back to category list page
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{editingCategory ? "Edit Category" : "Add Category"}</h2>

      <form onSubmit={handleSaveCategory}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Category Image</Label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:bg-gray-100 file:text-gray-700 file:hover:bg-gray-200"
              required
            />
            {categoryImage && (
              <div className="mt-2">
                <img
                  src={categoryImage} // Base64 string as the image source
                  alt="Category preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="gap-2 flex">
            <Button type="submit" variant="outline">
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/page/Category')}
            >
              <StepBackIcon /> Back to Category List
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
