export interface IGPost {
  link: string;
  img: string;
  date: string;
}

// Default fallback links if we don't have enough links mapped
const fallbackLinks = [
  "https://www.instagram.com/poseidonitb/",
];

import igLinks from '../data/ig_posts.json';

// Mapping of image filename (e.g. "6.png") to IG post link
const linkMapping: Record<string, string> = igLinks;

export function getInstagramUpdates(): IGPost[] {
  // Use Vite's glob import to get all images in the folder
  // { eager: true } imports them synchronously
  const modules = import.meta.glob('/public/images/instagram/*.{png,jpg,jpeg}', { eager: true });
  
  const posts: { id: number, img: string, filename: string }[] = [];

  for (const path in modules) {
    // Extract filename (e.g., "1.png" from "/public/images/instagram/1.png")
    const filename = path.split('/').pop() || '';
    
    // Extract the number from the filename (e.g., "1" from "1.png")
    const idMatch = filename.match(/(\d+)/);
    const id = idMatch ? parseInt(idMatch[1], 10) : 0;
    
    // The public URL can just be the path without '/public'
    const publicUrl = path.replace('/public', '');
    
    posts.push({ id, img: publicUrl, filename });
  }

  // Sort descending by ID (newest first)
  posts.sort((a, b) => b.id - a.id);

  return posts.map((p, index) => {
    // Try to get specific link, otherwise fallback
    const link = linkMapping[p.filename] || fallbackLinks[index % fallbackLinks.length];
    
    return {
      link,
      img: p.img,
      date: index === 0 ? "Terbaru" : "Update"
    };
  });
}
