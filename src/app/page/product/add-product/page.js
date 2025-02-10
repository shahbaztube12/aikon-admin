"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StepBackIcon } from "lucide-react";
import JoditEditor from "jodit-react";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productImage, setProductImage] = useState([]); // Store file, not URL
  const [productDetails, setProductDetails] = useState("");
  const [productColors, setProductColors] = useState([]); // Array of colors
  const [editingProduct, setEditingProduct] = useState(null);
  const [productVariants, setProductVariants] = useState([]); // Variants state

  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const productId = queryParams.get("id"); // Get product ID from URL

  // Fetch categories and subcategories from localStorage
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    // Fetch categories and subcategories from localStorage or initialize with default values
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [
      {
        name: "Electronics",
        subcategories: ["Mobile", "Laptop", "Headphones"],
      },
      { name: "Clothing", subcategories: ["Shirts", "Jeans", "Jackets"] },
    ];
    setCategories(storedCategories);

    // Fetch product if editing
    if (productId) {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const productToEdit = storedProducts.find(
        (product) => product.id === parseInt(productId)
      );
      if (productToEdit) {
        setEditingProduct(productToEdit);
        setProductName(productToEdit.name);
        setProductCategory(productToEdit.selectCategory);
        setProductSubCategory(productToEdit.subCategory || "");
        setProductImage(productToEdit.image || []);
        setProductDetails(productToEdit.additionalDetails);
        setProductColors(productToEdit.colors || []);
        setProductVariants(productToEdit.variants || []); // Set variants if editing
      }
    }
  }, [productId]);

  const handleSaveProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: editingProduct?.id || Date.now(),
      name: productName,
      selectCategory: productCategory,
      subCategory: productSubCategory,
      image: productImage.length > 0 ? URL.createObjectURL(productImage[0]) : "", // Handle image URL for first image
      additionalDetails: productDetails,
      colors: productColors,
      variants: productVariants, // Save variants
    };

    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (!Array.isArray(storedProducts)) {
      storedProducts = [];
    }

    if (editingProduct) {
      const updatedProducts = storedProducts.map((product) =>
        product.id === editingProduct.id ? newProduct : product
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      toast.success("Product updated successfully!");
    } else {
      storedProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(storedProducts));
      toast.success("Product added successfully!");
    }

    router.push("/page/product"); // Redirect back to Product List page after saving
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProductCategory(selectedCategory);

    // Set subcategories based on selected category
    const category = categories.find((cat) => cat.name === selectedCategory);

    if (category) {
      setSubCategories(category.subcategories || []);
    } else {
      setSubCategories([]); // Set to empty if category not found
    }
    setProductSubCategory(""); // Reset subcategory
  };

  // Variant handling functions

  const handleAddVariant = () => {
    const newVariant = {
      size: "",
      price: "",
      discount: "",
      tax: "",
      stock: "",
      finalPrice: 0, // Initially 0, will be calculated
    };
    setProductVariants([...productVariants, newVariant]);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...productVariants];
    updatedVariants[index][field] = value;

    // Recalculate final price based on the discount and price
    if (field === "price" || field === "discount") {
      const price = parseFloat(updatedVariants[index].price) || 0;
      const discount = parseFloat(updatedVariants[index].discount) || 0;
      const finalPrice = price - (price * discount) / 100;
      updatedVariants[index].finalPrice = finalPrice;
    }

    setProductVariants(updatedVariants);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = productVariants.filter((_, i) => i !== index);
    setProductVariants(updatedVariants);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + productImage.length > 4) {
      toast.error("You can only upload up to 4 images.");
      return;
    }
    setProductImage((prevImages) => [...prevImages, ...files]);
  };

  const handleImageRemove = (index) => {
    setProductImage(productImage.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">{editingProduct ? "Edit Product" : "Add Product"}</h2>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/page/product")}
          className="bg-purple-500 text-white"
        >
          <StepBackIcon />
          Back to Product List
        </Button>
      </div>

      <form onSubmit={handleSaveProduct}>
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Product Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={productCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Product Subcategory */}
          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <select
              id="subcategory"
              value={productSubCategory}
              onChange={(e) => setProductSubCategory(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a subcategory</option>
              {subCategories.length > 0 &&
                subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
            </select>
          </div>

          {/* Product Image */}
          <div>
            <Label htmlFor="image">Product Image (max 4)</Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageChange}
              multiple
              className="w-full p-2 border rounded"
            />
            <div className="mt-2">
              {productImage.map((image, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{image.name}</span>
                  <Button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="ml-2 bg-red-500 text-white"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <Label htmlFor="details">Additional Details</Label>
            <JoditEditor
              value={productDetails}
              onChange={(newContent) => setProductDetails(newContent)}
            />
          </div>

          <div>
            <Label htmlFor="details">Product Details</Label>
            <JoditEditor
              value={productDetails}
              onChange={(newContent) => setProductDetails(newContent)}
            />
          </div>

          {/* Product Variants */}
          <div>
            <Label htmlFor="variants">Product Variants</Label>
            <div className="space-y-6">
              {productVariants.map((variant, index) => (
                <div key={index} className="flex flex-wrap gap-6">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`size-${index}`}>Size</Label>
                    <Input
                      id={`size-${index}`}
                      type="text"
                      value={variant.size}
                      onChange={(e) =>
                        handleVariantChange(index, "size", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      className="w-24 p-2 border rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`discount-${index}`}>Discount %</Label>
                    <Input
                      id={`discount-${index}`}
                      type="number"
                      value={variant.discount}
                      onChange={(e) =>
                        handleVariantChange(index, "discount", e.target.value)
                      }
                      className="w-24 p-2 border rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`finalPrice-${index}`}>Final Price</Label>
                    <Input
                      id={`finalPrice-${index}`}
                      type="number"
                      value={variant.finalPrice}
                      readOnly
                      className="w-24 p-2 border rounded"
                    />
                  </div>

                  {/* Tax Dropdown */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`tax-${index}`}>Tax %</Label>
                    <select
                      id={`tax-${index}`}
                      value={variant.tax}
                      onChange={(e) =>
                        handleVariantChange(index, "tax", e.target.value)
                      }
                      className="w-24 p-2 border rounded"
                    >
                      <option value="">Select Tax</option>
                      <option value="3">3%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="82">28%</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`stock-${index}`}>Stock</Label>
                    <Input
                      id={`stock-${index}`}
                      type="number"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(index, "stock", e.target.value)
                      }
                      className="w-24 p-2 border rounded"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="m-4 bg-red-500 text-white"
                  >
                    Remove Variant
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" onClick={handleAddVariant}>
              Add Variant
            </Button>
          </div>

          {/* Save Button */}
          <div className="gap-2 flex justify-center">
            <Button type="submit" variant="outline" className="bg-purple-500 text-white font-semibold text-2xl hover:animate-out">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
