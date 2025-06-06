import React, { useState, useRef, useCallback } from 'react';
import type { FormEvent } from 'react';

interface SidebarSearchIslandProps {
  placeholder?: string;
}

/**
 * Sidebar Search Component - Client-side interactive island
 */
function SidebarSearchIsland({ placeholder = "Search..." }: SidebarSearchIslandProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  
  // Handle search submission - Use useCallback to cache function
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Don't perform search if query is empty
    if (!searchQuery.trim()) return;
    
    // Redirect to search page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
  }, [searchQuery]);
  
  // Handle input change - Use useCallback to cache function
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);
  
  // Search icon component - Use React.memo to prevent unnecessary re-renders
  const SearchIcon = React.memo(() => (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-slate-400" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  ));
  
  return (
    <form 
      ref={formRef}
      action="/search" 
      method="get" 
      className="relative"
      onSubmit={handleSubmit}
    >
      <SearchIcon />
      <input 
        type="search" 
        id="sidebar-search" 
        name="q"
        className="block w-full p-2 pl-10 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default React.memo(SidebarSearchIsland); 