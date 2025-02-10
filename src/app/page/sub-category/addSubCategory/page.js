'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"; // For routing
import { toast } from "sonner";

const AddSubcategoryPage = () => {
  const [subcategory, setSubcategory] = useState(""); // Input for subcategory name
  const [selectedCategory, setSelectedCategory] = useState(""); // To store selected category
  const [categories, setCategories] = useState([]); // To store all categories
  const [categoryImage, setCategoryImage] = useState(""); // For image upload
  const router = useRouter();

  const queryParams = new URLSearchParams(window.location.search);
  const categoryId = queryParams.get('categoryId'); // Get categoryId from URL

  // Load categories from localStorage on page load
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    // Ensure subcategories are initialized as empty arrays if not present
    const initializedCategories = storedCategories.map((category) => ({
      ...category,
      subcategories: category.subcategories || [], // Initialize subcategories as an empty array
    }));
    setCategories(initializedCategories);

    if (categoryId) {
      // If categoryId exists, it's an edit
      const categoryToEdit = initializedCategories[categoryId]; // Get the category by index
      if (categoryToEdit) {
        setSelectedCategory(categoryToEdit.name); // Preselect category for editing
      }
    }
  }, [categoryId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the image file
      const imageURL = URL.createObjectURL(file);
      setCategoryImage(imageURL);
    }
  };

  const handleAddSubcategory = () => {
    if (subcategory && selectedCategory) {
      // Find the category and add the subcategory to it
      const updatedCategories = categories.map((category) =>
        category.name === selectedCategory
          ? {
              ...category,
              subcategories: [...category.subcategories, subcategory], // Add subcategory
            }
          : category
      );
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      setSubcategory(""); // Clear the subcategory input field
      toast.success("Subcategory added successfully!");
    } else {
      toast.error("Please select a category and provide a subcategory name.");
    }
  };

  const handleRemoveSubcategory = (subcategoryName) => {
    // Remove subcategory from the selected category
    const updatedCategories = categories.map((category) =>
      category.name === selectedCategory
        ? {
            ...category,
            subcategories: category.subcategories.filter(sub => sub !== subcategoryName), // Remove subcategory
          }
        : category
    );
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    toast.success("Subcategory removed successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Subcategories</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <Input
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="category">Select Category</Label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="image">Category Image</Label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:bg-gray-100 file:text-gray-700 file:hover:bg-gray-200"
            />
            {categoryImage && (
              <div className="mt-2">
                <img
                  src={categoryImage}
                  alt="Category preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="gap-2 flex mt-4">
            <Button
              type="button"
              onClick={handleAddSubcategory}
              variant="outline"
            >
              Add Subcategory
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/page/sub-category')}
            >
              Back to Category List
            </Button>
          </div>
        </div>
      </form>

      {/* Show subcategories under the selected category */}
      {selectedCategory && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Subcategories</h3>
          <ul className="space-y-2">
            {categories
              .filter((category) => category.name === selectedCategory)
              .map((category) =>
                category.subcategories.length > 0 ? (
                  category.subcategories.map((sub, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{sub}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-xs"
                        onClick={() => handleRemoveSubcategory(sub)}
                      >
                        Delete
                      </Button>
                    </li>
                  ))
                ) : (
                  <p key="no-subcategory" className="text-sm text-gray-500">
                    No subcategories yet.
                  </p>
                )
              )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddSubcategoryPage;
