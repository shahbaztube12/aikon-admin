'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { StepBackIcon } from 'lucide-react';

const AddCoupon = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [editingCoupon, setEditingCoupon] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // Next.js hook for query params

  useEffect(() => {
    const couponId = searchParams.get('id'); // Get coupon id from query params

    if (couponId) {
      const storedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
      const couponToEdit = storedCoupons.find(c => c.id === parseInt(couponId));
      if (couponToEdit) {
        setEditingCoupon(couponToEdit);
        setCouponCode(couponToEdit.code);
        setDiscount(couponToEdit.discount);
        setExpiryDate(couponToEdit.expiryDate);
        setDescription(couponToEdit.description);
      }
    }
  }, [searchParams]);

  const handleAddCoupon = (e) => {
    e.preventDefault();

    const newCoupon = {
      id: editingCoupon?.id || Date.now(),
      code: couponCode,
      discount: discount,
      expiryDate: expiryDate,
      description: description
    };

    let storedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];

    if (!Array.isArray(storedCoupons)) {
      storedCoupons = [];
    }

    if (editingCoupon) {
      const updatedCoupons = storedCoupons.map(c => c.id === editingCoupon.id ? newCoupon : c);
      localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
      toast.success("Coupon updated successfully!");
    } else {
      storedCoupons.push(newCoupon); // Add new coupon to the list
      localStorage.setItem('coupons', JSON.stringify(storedCoupons));
      toast.success("Coupon added successfully!");
    }

    router.push('/page/coupon'); // Redirect to the coupon list page after submitting
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{editingCoupon ? 'Edit Coupon' : 'Add Coupon'}</h1>

      <form onSubmit={handleAddCoupon} className="space-y-4">
        <div>
          <Label htmlFor="couponCode">Coupon Code *</Label>
          <Input
            id="couponCode"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="discount">Discount Percentage *</Label>
          <Input
            id="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="expiryDate">Expiry Date *</Label>
          <Input
            id="expiryDate"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="gap-2">
          <Button type="submit">{editingCoupon ? 'Update Coupon' : 'Add Coupon'}</Button>
          <Button variant="outline" onClick={() => router.push('/page/coupon')}>
           <StepBackIcon /> Back to Coupons
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCoupon;