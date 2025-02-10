// src/app/page/category/page.js

'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // For routing
import { toast } from "sonner";
import { EditIcon, TrashIcon } from "lucide-react";

const ShowCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Fetch categories from localStorage
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);
  }, []);

  // Handle delete category
  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
    toast.success("Category deleted successfully!");
  };

  // Handle edit category
  const handleEditCategory = (categoryId) => {
    router.push(`/page/Category/add-category?id=${categoryId}`); // Navigate to Add Category page with category ID
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-6 flex">
      <h2 className="text-2xl font-bold mb-4 flex-1">Categories</h2>
        <Button onClick={() => router.push("/page/Category/add-category")}>Add New Category</Button>
      </div>
      

      {/* Category List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.length === 0 ? (
  <div>No categories available.</div>
) : (
  categories.map((category, index) => (
    <div key={category.id || index} className="border p-4 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={category.image || "/default-image.jpg"} // Default image if no image
          alt={category.name}
          className="w-32 h-32 object-cover rounded-md mb-2"
        />
        <h3 className="font-semibold text-lg">{category.name}</h3>
        <p className="text-sm text-gray-500">{category.subcategory}</p>
      </div>

      <div className="mt-4 flex justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => handleEditCategory(category.id)}
        >
          <EditIcon className="mr-2" /> Edit
        </Button>
        <Button
          variant="outline"
          onClick={() => handleDeleteCategory(category.id)}
        >
          <TrashIcon className="mr-2" /> Delete
        </Button>
      </div>
    </div>
  ))
)}

      </div>

      {/* Add New Category Button */}
      
    </div>
  );
};

export default ShowCategoriesPage;
