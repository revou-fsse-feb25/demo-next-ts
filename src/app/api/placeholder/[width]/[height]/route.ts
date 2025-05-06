import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { width: string; height: string } }
) {
  const width = parseInt(params.width) || 400;
  const height = parseInt(params.height) || 400;

  // Use JSONPlaceholder as a fallback
  try {
    const photoId = Math.floor(Math.random() * 50) + 1; // Random photo ID between 1-50
    const imageUrl = `https://via.placeholder.com/${width}/${height}`;
    
    // Redirect to JSONPlaceholder
    return NextResponse.redirect(imageUrl);
  } catch (error) {
    console.error('Error fetching placeholder image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch placeholder image' },
      { status: 500 }
    );
  }
} 