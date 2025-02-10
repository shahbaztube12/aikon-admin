'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'sonner';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch categories from localStorage when the component mounts
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);
  }, []);

  const handleDelete = (categoryId) => {
    // Remove the category from the array based on its index
    let storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    storedCategories.splice(categoryId, 1);
    localStorage.setItem('categories', JSON.stringify(storedCategories));
    setCategories(storedCategories);
    toast.success('Category deleted successfully!');
  };

  const handleEdit = (categoryId) => {
    // Redirect to the add/edit category page with the category ID in the query string
    router.push(`/page/sub-category/addSubCategory?categoryId=${categoryId}`);
  };

  const handleAddCategory = () => {
    // Navigate to the page where the user can add a new category
    router.push('/page/sub-category/addSubCategory');
  };

  const handleAddSubcategory = (categoryId) => {
    const subcategoryName = prompt("Enter new subcategory name:");

    if (subcategoryName) {
      // Find the category and add the subcategory to it
      let storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
      const category = storedCategories[categoryId];

      if (category) {
        category.subcategories = category.subcategories || [];
        category.subcategories.push(subcategoryName);
        
        // Save the updated category list to localStorage
        localStorage.setItem('categories', JSON.stringify(storedCategories));
        setCategories(storedCategories);

        toast.success("Subcategory added successfully!");
      }
    }
  };

  const handleRemoveSubcategory = (categoryId, subcategoryIndex) => {
    let storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const category = storedCategories[categoryId];

    if (category) {
      category.subcategories = category.subcategories.filter((_, index) => index !== subcategoryIndex);
      
      // Save the updated category list to localStorage
      localStorage.setItem('categories', JSON.stringify(storedCategories));
      setCategories(storedCategories);

      toast.success("Subcategory removed successfully!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster /> {/* Toast notifications will render here */}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category List</h1>
        <Button variant="outline" onClick={handleAddCategory}>
          Add Category
        </Button>
      </div>

      {/* Category Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Category Name</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Subcategories</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{category.name}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={category.image} alt={category.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {category.subcategories && category.subcategories.length > 0 ? (
                      <ul>
                        {category.subcategories.map((subcategory, subIndex) => (
                          <li key={subIndex} className="flex justify-between">
                            <span>{subcategory}</span>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="text-xs"
                              onClick={() => handleRemoveSubcategory(index, subIndex)}
                            >
                              <Trash2Icon className="w-4 h-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No subcategories</span>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddSubcategory(index)}
                      className="mt-2"
                    >
                      Add Subcategory
                    </Button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Button onClick={() => handleEdit(index)} size="sm" variant="outline" className="mr-2">
                      <Edit2Icon className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDelete(index)} variant="destructive" size="sm">
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
