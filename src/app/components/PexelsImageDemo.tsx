"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Simplified interfaces
interface PexelsPhoto {
  id: number;
  photographer: string;
  src: {
    medium: string;
    small: string;
  };
  alt: string;
}

export default function PexelsImageDemo() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pexels API key
  const API_KEY = "u141grU3noQeYTCPFZuogm2ivpSOW3gkLYDWztxFfyOciCKNKjw92Vyd";

  // Load initial images
  useEffect(() => {
    fetchCuratedPhotos();
  }, []);

  // Fetch curated photos from Pexels
  const fetchCuratedPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.pexels.com/v1/curated?per_page=8", {
        headers: {
          Authorization: API_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }
      
      const data = await response.json();
      setPhotos(data.photos);
    } catch (err) {
      setError("Failed to load images");
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search for photos
  const searchPhotos = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=8`, {
        headers: {
          Authorization: API_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      
      const data = await response.json();
      setPhotos(data.photos);
    } catch (err) {
      setError("Search failed");
      console.error("Error searching photos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchPhotos(searchQuery);
    }
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg mt-4">
      <h2 className="text-2xl font-bold mb-4">Pexels Image Gallery</h2>
      
      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for images..." 
          className="px-4 py-2 rounded flex-grow text-white border-amber-500"
        />
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <p>Loading images...</p>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      
      {/* Image grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="overflow-hidden rounded-lg">
              {/* Using width/height instead of fill for better reliability */}
              <div className="relative h-48 w-full">
                <Image
                  src={photo.src.small}
                  alt={photo.alt || "Pexels image"}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-2 bg-gray-700">
                <p className="text-sm">Photo by: {photo.photographer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-xs text-gray-400">
        <p>Powered by <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="underline">Pexels API</a></p>
      </div>
    </section>
  );
} 