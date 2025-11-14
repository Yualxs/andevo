// EN: src/app/blog/_components/BlogTabs.tsx
'use client'; 

import React, { useState } from 'react';
import { BlogPost } from '@/lib/sanity.client'; 
import { BlogCard } from '@/components/BlogCard';
import clsx from 'clsx';

// --- El sub-componente BlogCard se ha MOVIDO ---

const TABS = [
  { name: 'Todos', value: 'todos' },
  { name: 'Branding', value: 'branding' },
  { name: 'Marketing', value: 'marketing' },
  { name: 'Desarrollo', value: 'web' },
];

export const BlogTabs = ({ posts }: { posts: BlogPost[] }) => {
  const [activeTab, setActiveTab] = useState('todos');

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'todos') return true;
    return post.category === activeTab;
  });

  return (
    <div>
      {/* 1. Menú de Pestañas (Tabs) (sin cambios) */}
      <div className="flex items-center space-x-8 border-b border-black/10 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={clsx(
              "py-4 relative transition-colors",
              activeTab === tab.value ? "text-black" : "text-black/50 hover:text-black"
            )}
          >
            <h2 className="text-2xl md:text-3xl font-medium">{tab.name}</h2>
            <span
              className={clsx(
                "absolute bottom-0 left-0 block h-0.5 w-full bg-black transition-transform duration-300",
                activeTab === tab.value ? "scale-x-100" : "scale-x-0"
              )}
            />
          </button>
        ))}
      </div>

      {/* 2. Lista de Posts (Grid) (sin cambios) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            // 2. AHORA USA EL COMPONENTE IMPORTADO
            <BlogCard key={post._id} post={post} index={index} />
          ))
        ) : (
          <p className="text-black/50">No se han encontrado artículos.</p>
        )}
      </div>
    </div>
  );
};