"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Fetch products from localStorage
  const fetchProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Only runs once when the page is loaded

  // Handle product deletion
  const handleDelete = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update localStorage
    toast.success("Product deleted successfully!");
  };

  // Handle product edit (redirect to Add/Edit Product page)
  const handleEdit = (id) => {
    router.push(`/page/product/add-product?id=${id}`); // Redirect to Edit Product page with the product ID
  };

  // Navigate to Add Product page
  const handleAddProduct = () => {
    router.push("/page/product/add-product"); // Redirect to Add Product page
  };

  // Format price as currency
  const formatPrice = (price) => {
    // Ensure price is a valid number and format it with a currency symbol
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) return "N/A";
    return parsedPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>

        {/* Add Product Button */}
        <Button variant="outline" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-sm">{product.name}</td>
                  <td className="py-2 px-4 border-b text-sm">
                    {product.selectCategory}
                  </td>
               
                  <td className="py-2 px-4 border-b">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <img
                        src="/placeholder-image.jpg" // Placeholder image path
                        alt="Placeholder"
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-sm">
                    {product.additionalDetails}
                  </td>

                  <td className="py-2 px-4 border-b">
                    <Button
                      onClick={() => handleEdit(product.id)}
                      size="sm"
                      variant="outline"
                      className="mr-2"
                    >
                      <Edit2Icon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-4 text-center text-sm">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;
