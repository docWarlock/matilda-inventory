"use client";

import { notFound } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function HouseDetail({ params }: { params: { id: string } }) {
  // This is the correct Next.js 15 implementation - params is a Promise that must be unwrapped
  const paramsValue = use(params);
  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', address: '' });
  
  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        // With Next.js 15, params must be unwrapped using React.use()
        const response = await fetch(`http://localhost:8000/houses/${paramsValue.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHouse(data);
        // Initialize edit data
        setEditData({ name: data.name, address: data.address });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch house');
        setLoading(false);
      }
    };

    fetchHouse();
  }, [paramsValue.id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!house) {
    notFound();
  }

  // Ensure house.rooms exists before trying to access its length
  const rooms = house.rooms || [];

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/houses/${paramsValue.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      // Update local state
      setHouse({ ...house, ...editData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating house:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmation !== house.name) {
      alert('House name does not match. Please type the exact name to confirm deletion.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/houses/${paramsValue.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      // Redirect to home page after successful deletion
      router.push('/');
    } catch (error) {
      console.error('Error deleting house:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{house.name}</h1>
          <p className="text-gray-600 mt-2">{house.address}</p>
          
          {/* Edit and Delete Buttons */}
          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              Edit House
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Delete House
            </button>
          </div>
        </header>

        {/* Edit Form Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Edit House</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                    House Name
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="edit-address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="edit-address"
                    value={editData.address}
                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h2>
              
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this house? This action cannot be undone.
              </p>
              
              <div className="mb-4">
                <label htmlFor="delete-confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                  Type the house name to confirm:
                </label>
                <input
                  type="text"
                  id="delete-confirmation"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder={house.name}
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete House
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Rooms</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Add Room
            </button>
          </div>

          {rooms.length === 0 ? (
            <p className="text-gray-500">No rooms found. Get started by adding your first room.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room: any) => (
            <div key={room.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg text-gray-900">{room.name}</h3>
              <p className="text-gray-600 mt-1">{room.items} items</p>
              <div className="mt-4">
                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                  View Items
                </button>
              </div>
            </div>
          ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">House Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">{house.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Total Items</h3>
              <p className="text-gray-600">46 items across {rooms.length} rooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
