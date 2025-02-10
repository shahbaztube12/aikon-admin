"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdateOrderPage = () => {
  const [order, setOrder] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [productOrdered, setProductOrdered] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [orderDate, setOrderDate] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  
  // Check if `router.query` exists to avoid destructuring errors
  const id = router.query?.id;

  useEffect(() => {
    // Ensure `id` is defined before proceeding
    if (id) {
      const storedOrders = localStorage.getItem("orders");
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      const orderToEdit = orders.find((order) => order.id === parseInt(id));

      if (orderToEdit) {
        setOrder(orderToEdit);
        setCustomerName(orderToEdit.customerName);
        setProductOrdered(orderToEdit.productOrdered);
        setOrderStatus(orderToEdit.orderStatus);
        setPaymentStatus(orderToEdit.paymentStatus);
        setOrderDate(orderToEdit.orderDate);
        setPrice(orderToEdit.price);
      }
    }
  }, [id]);

  const handleOrderUpdate = () => {
    if (!customerName || !productOrdered || !orderDate || !price) {
      toast.error("Please fill in all order details.");
      return;
    }

    const storedOrders = localStorage.getItem("orders");
    const orders = storedOrders ? JSON.parse(storedOrders) : [];

    const updatedOrders = orders.map((order) =>
      order.id === parseInt(id)
        ? {
            ...order,
            customerName,
            productOrdered,
            orderStatus,
            paymentStatus,
            orderDate,
            price,
          }
        : order
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order updated successfully!");
    router.push("/page/order"); // Redirect back to the main orders page
  };

  if (!id) {
    return <div>Loading...</div>; // Show loading state if `id` is not available
  }

  if (!order) {
    return <div>Loading...</div>; // Show loading if order is not found
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Update Order</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="productOrdered">Product Ordered</Label>
          <Input
            id="productOrdered"
            value={productOrdered}
            onChange={(e) => setProductOrdered(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="orderStatus">Order Status</Label>
          <select
            id="orderStatus"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="border p-2"
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div>
          <Label htmlFor="paymentStatus">Payment Status</Label>
          <select
            id="paymentStatus"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="border p-2"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="orderDate">Order Date</Label>
          <Input
            id="orderDate"
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </div>

        <Button variant="outline" onClick={handleOrderUpdate}>
          Update Order
        </Button>
      </div>
    </div>
  );
};

export default UpdateOrderPage;
