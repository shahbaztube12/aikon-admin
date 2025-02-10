// src/app/page/banner/add-banner.js
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddBannerPage = () => {
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerExcerpt, setBannerExcerpt] = useState('');
  const [editingBanner, setEditingBanner] = useState(null);
  const router = useRouter();

  const queryParams = new URLSearchParams(window.location.search);
  const bannerId = queryParams.get('id'); // Get banner id from query params

  // Fetch banner data for editing
  useEffect(() => {
    if (bannerId) {
      const storedBanners = JSON.parse(localStorage.getItem('banners')) || [];
      const bannerToEdit = storedBanners.find(b => b.id === parseInt(bannerId));
      if (bannerToEdit) {
        setEditingBanner(bannerToEdit);
        setBannerTitle(bannerToEdit.title);
        setBannerExcerpt(bannerToEdit.excerpt);
        setBannerImage(bannerToEdit.image);
      }
    }
  }, [bannerId]);

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result); // Save image as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBanner = (e) => {
    e.preventDefault();

    const newBanner = {
      id: editingBanner?.id || Date.now(),
      title: bannerTitle,
      image: bannerImage,
      excerpt: bannerExcerpt,
    };

    let storedBanners = JSON.parse(localStorage.getItem('banners')) || [];
    if (!Array.isArray(storedBanners)) {
      storedBanners = [];
    }

    if (editingBanner) {
      const updatedBanners = storedBanners.map(b => b.id === editingBanner.id ? newBanner : b);
      localStorage.setItem('banners', JSON.stringify(updatedBanners));
      toast.success("Banner updated successfully!");
    } else {
      storedBanners.push(newBanner);
      localStorage.setItem('banners', JSON.stringify(storedBanners));
      toast.success("Banner added successfully!");
    }

    router.push('/page/banner'); // Redirect to the banner list page after saving
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{editingBanner ? 'Edit Banner' : 'Add Banner'}</h2>

      <form onSubmit={handleSaveBanner} className="space-y-4">
        <div>
          <Label htmlFor="bannerTitle">Banner Title</Label>
          <Input
            id="bannerTitle"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="bannerExcerpt">Banner Excerpt</Label>
          <Textarea
            id="bannerExcerpt"
            value={bannerExcerpt}
            onChange={(e) => setBannerExcerpt(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="bannerImage">Banner Image (Upload Image)</Label>
          <Input id="bannerImage" type="file" onChange={handleBannerImageChange} />
          {bannerImage && <img src={bannerImage} alt="Banner Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <div className="gap-2">
          <Button type="submit">{editingBanner ? 'Update Banner' : 'Add Banner'}</Button>
          <Button variant="outline" onClick={() => router.push('/page/banner')}>
            Back to Banner List
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBannerPage;
