/*
COMPONENT LEARNING OBJECTIVES:

1. Type-safe props in Next.js components
   - TODO 1.1: Notice the Photo interface for type safety
5. Working with images in Next.js
   - TODO 5.1: Learn to use the Next.js Image component
   - TODO 5.2: Understand responsive images with sizes prop
   - TODO 5.3: Use fill mode and object-fit
   - TODO 5.4: Learn about priority loading for LCP images
*/

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// TODO 1.1: Notice how we define interfaces for our data
interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

export default function ImageDemo() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=8");
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        setError("Failed to load images");
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Next.js Image Component with JSONPlaceholder</h2>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl mb-2">Optimized Images from JSONPlaceholder</h3>
            {loading ? (
              <div className="h-64 w-full flex items-center justify-center bg-gray-700 rounded-lg">
                <p>Loading images...</p>
              </div>
            ) : error ? (
              <div className="h-64 w-full flex items-center justify-center bg-gray-700 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            ) : photos.length > 0 ? (
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                {/* TODO 5.1: Notice the Image component usage */}
                {/* TODO 5.3: Notice fill mode with object-cover */}
                {/* TODO 5.4: Notice priority for LCP optimization */}
                <Image
                  src={photos[0].url}
                  alt={photos[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw" // TODO 5.2: Notice responsive sizes
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}
            <p className="mt-2 text-gray-300">
              The Next.js Image component automatically optimizes images and
              prevents layout shift.
            </p>
          </div>

          <div>
            <h3 className="text-xl mb-2">Key Features</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Automatic image optimization</li>
              <li>Responsive sizing with the "sizes" prop</li>
              <li>Lazy loading by default</li>
              <li>Prevents Cumulative Layout Shift</li>
              <li>Built-in blur-up placeholder option</li>
              <li>Real API integration with JSONPlaceholder</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl mb-4">Photo Gallery from JSONPlaceholder</h3>
        {loading ? (
          <p>Loading gallery...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative h-40 rounded-lg overflow-hidden">
                {/* TODO 5.1, 5.2, 5.3: Notice multiple Image instances with optimization */}
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
