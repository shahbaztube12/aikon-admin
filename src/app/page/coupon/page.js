// src/app/page/coupon/coupon-show.js
'use client';


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table"; // Assuming you have a Table component
import { Edit2Icon, Trash2Icon } from 'lucide-react';

const CouponShow = () => {
  const [coupons, setCoupons] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
    setCoupons(storedCoupons);
  }, []);

  const handleEditCoupon = (id) => {
    router.push(`/page/coupon/add-coupon?id=${id}`);
  };

  const handleDeleteCoupon = (id) => {
    const storedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
    const updatedCoupons = storedCoupons.filter(c => c.id !== id);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    setCoupons(updatedCoupons);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Coupons</h1>

      <Button onClick={() => router.push('/page/coupon/add-coupon')}>Add Coupon</Button>

      {coupons.length === 0 ? (

                          
        <p>No coupons available.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Code</th>
                <th className="px-4 py-2 border-b">Discount</th>
                <th className="px-4 py-2 border-b">Expiry Date</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="px-4 py-2 border-b">{coupon.code}</td>
                  <td className="px-4 py-2 border-b">{coupon.discount}%</td>
                  <td className="px-4 py-2 border-b">{coupon.expiryDate}</td>
                  <td className="px-4 py-2 border-b">
                    <Button onClick={() => handleEditCoupon(coupon.id)} className="mr-2">
                        <Edit2Icon />

                    </Button>
                    <Button onClick={() => handleDeleteCoupon(coupon.id)}  variant="outline">
                        <Trash2Icon className='text-red-600' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CouponShow;
