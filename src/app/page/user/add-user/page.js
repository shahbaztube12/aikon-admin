// src/app/user/add-user.js
'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

const AddUserPage = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const router = useRouter();
  
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get('id'); // Get user ID from URL

  useEffect(() => {
    if (userId) {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userToEdit = storedUsers.find((user) => user.id === parseInt(userId));
      if (userToEdit) {
        setEditingUser(userToEdit);
        setUserName(userToEdit.name);
        setUserEmail(userToEdit.email);
        setUserPhone(userToEdit.phone);
      }
    }
  }, [userId]);

  const handleSaveUser = (e) => {
    e.preventDefault();

    const newUser = {
      id: editingUser?.id || Date.now(),
      name: userName,
      email: userEmail,
      phone: userPhone,
    };

    let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (!Array.isArray(storedUsers)) {
      storedUsers = [];
    }

    if (editingUser) {
      const updatedUsers = storedUsers.map((user) =>
        user.id === editingUser.id ? newUser : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      toast.success('User updated successfully!');
    } else {
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      toast.success('User added successfully!');
    }

    router.push('/page/user'); // Redirect back to User List page after saving
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{editingUser ? 'Edit User' : 'Add User'}</h2>

      <form onSubmit={handleSaveUser}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              required
            />
          </div>

          <div className="gap-2 flex">
            <Button type="submit" variant="outline">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/page/user')}
            >
              Back to User List
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
