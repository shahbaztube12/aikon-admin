// src/app/page/banner/banner-page.js
'use client';

import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const BannerPage = () => {
  const router = useRouter();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch banners from localStorage
    const storedBanners = JSON.parse(localStorage.getItem('banners')) || [];
    setBanners(storedBanners);
  }, []);

  const handleEditBanner = (id) => {
    router.push(`/page/banner/add-banner?id=${id}`);
  };

  const handleDeleteBanner = (id) => {
    const storedBanners = JSON.parse(localStorage.getItem('banners')) || [];
    const updatedBanners = storedBanners.filter(b => b.id !== id);
    localStorage.setItem('banners', JSON.stringify(updatedBanners));
    setBanners(updatedBanners);
    toast.success("Banner deleted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Website Banners</h2>
        <Button onClick={() => router.push('/page/banner/add-banner')}>Add Banner</Button>
      </div>

      {banners.length === 0 ? (
        <p>No banners available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Banner Title</th>
              <th className="py-2 px-4 border-b">Excerpt</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner.id} className="text-center" style={{justifyItems:'center'}}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  <img src={banner.image} alt={banner.title} className="w-12 h-12" />
                </td>
                <td className="py-2 px-4 border-b">{banner.title}</td>
                <td className="py-2 px-4 border-b">{banner.excerpt}</td>
                <td className="py-2 px-4 border-b">
                  <Button variant="outline" className="mr-2" onClick={() => handleEditBanner(banner.id)}>
                    <Edit2Icon size={16} />
                  </Button>
                  <Button variant="outline" className="text-red-600" onClick={() => handleDeleteBanner(banner.id)}>
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

export default BannerPage;
