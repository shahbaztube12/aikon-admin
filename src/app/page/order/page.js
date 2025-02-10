"use client";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  // Using useEffect to ensure localStorage is accessed on the client-side
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []); // Empty dependency array to run this effect once when the component mounts

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order deleted successfully!");
  };

  const handleEditOrder = (orderId) => {
    if (router) {
      router.push(`/page/order/update-order?id=${orderId}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Orders</h2>
      <table className="min-w-full bg-white border text-left border-gray-200 mt-8">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">OrderID</th>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">PaymentStatus</th>
            <th className="py-2 px-4 border-b">OrderStatus</th>
            <th className="py-2 px-4 border-b">Order Date</th>
            <th className="py-2 px-4 border-b">PaymentMode</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.productOrdered}</td>
              <td className="py-2 px-4 border-b">{order.price}</td>
              <td className="py-2 px-4 border-b">{order.paymentStatus}</td>
              <td className="py-2 px-4 border-b">{order.orderStatus}</td>
              <td className="py-2 px-4 border-b">{order.orderDate}</td>
              <td className="py-2 px-4 border-b">{order.paymentMode}</td>
              <td className="py-2 px-4 border-b">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleEditOrder(order.id)}
                >
                  <Edit2Icon size={16} />
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <Trash2Icon size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
