"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import HouseCard from '@/components/HouseCard';

export default function Home() {
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        // Fetch actual data from the API
        const response = await fetch('http://localhost:8000/houses/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHouses(data);
        setLoading(false);
      } catch (err) {
        // If the error is 404 (no houses), that's expected - show empty state
        if (err instanceof Error && err.message.includes('404')) {
          setHouses([]);
          setLoading(false);
        } else {
          setError('Failed to fetch houses');
          setLoading(false);
        }
      }
    };

    fetchHouses();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Home Inventory System</h1>
          <p className="text-gray-600 mt-2">Manage your inventory across multiple locations</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Houses</h2>
          
          {houses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No houses found. Get started by adding your first house.</p>
              <Link 
                href="/houses/new" 
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Your First House
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link 
              href="/houses/new" 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add New House
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">1. Houses</h3>
              <p className="text-gray-600 text-sm">Start by creating your main house or location.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">2. Rooms</h3>
              <p className="text-gray-600 text-sm">Organize your house into rooms or areas.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">3. Items</h3>
              <p className="text-gray-600 text-sm">Add items to your rooms with detailed information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
