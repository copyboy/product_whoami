import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
// Import types only for Fuse.js which will be dynamically loaded at runtime
import type { FuseResult, IFuseOptions } from 'fuse.js';

interface SearchArticle {
  title: string;
  description: string;
  slug: string;
  pubDate: string;
  tags: string[];
  author: string;
  categories?: string[];
}

interface SearchResult {
  item: SearchArticle;
  refIndex: number;
  score?: number;
}

// Define Fuse type for dynamic import
interface FuseType<T> {
  search: (query: string) => FuseResult<T>[];
  new (items: T[], options?: IFuseOptions<T>): FuseType<T>;
}

interface SearchIslandProps {
  dataTimestamp: number;
  popularTags?: string[];
  initialQuery?: string;
}

// Extract search result card component to reduce rendering overhead
const SearchResultCard = React.memo(({ post, formatDate }: { 
  post: SearchArticle; 
  formatDate: (dateString: string) => string;
}) => {
  return (
    <article className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex flex-col flex-grow">
        {/* Title area */}
        <div className="mb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2">
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </h2>
        </div>
        
        {/* Description area */}
        <div className="mb-4 flex-grow">
          <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
            {post.description}
          </p>
        </div>
        
        {/* Tags area */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {post.tags && post.tags.slice(0, 3).map(tag => (
              <a
                key={tag}
                href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {tag}
              </a>
            ))}
            {post.tags && post.tags.length > 3 && 
              <span className="text-xs px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">
                +{post.tags.length - 3}
              </span>
            }
          </div>
        </div>
        
        {/* Author and date area */}
        <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[50%]">
              By {post.author || 'Anonymous'}
            </span>
            <time dateTime={post.pubDate} className="text-xs text-slate-500 dark:text-slate-400">
              {formatDate(post.pubDate)}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
});

// Extract tag button component
const TagButton = React.memo(({ tag, onClick }: { tag: string; onClick: (tag: string) => void }) => {
  return (
    <button
      onClick={() => onClick(tag)}
      className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
    >
      {tag}
    </button>
  );
});

/**
 * Search Island Component - Client-side interactive island
 */
const SearchIsland = ({ 
  dataTimestamp, 
  popularTags = ['JavaScript', 'CSS', 'React', 'Web Development', 'TypeScript'],
  initialQuery = ''
}: SearchIslandProps) => {
  // Get initial query from URL to sync with sidebar search
  const getInitialQuery = useCallback(() => {
    if (typeof window === 'undefined') return initialQuery;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || initialQuery;
  }, [initialQuery]);

  const [searchQuery, setSearchQuery] = useState(getInitialQuery());
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchArticles, setSearchArticles] = useState<SearchArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const fuseRef = useRef<any>(null);
  const initialQueryRun = useRef(false);

  // Format date - Use useCallback to cache function
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  // Perform search - Use useCallback to cache function
  const performSearch = useCallback((query: string, updateUrl = true) => {
    if (!query || !fuseRef.current) {
      setSearchResults([]);
      return;
    }

    const results = fuseRef.current.search(query);
    setSearchResults(results);
    
    // Update URL
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('q', query);
      history.pushState({}, '', url);
    }
  }, []);

  // Reset search - Use useCallback to cache function
  const resetSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    history.pushState({}, '', url);
  }, []);

  // Handle search input - Use useCallback to cache function
  const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const trimmedQuery = query.trim();
    if (trimmedQuery.length >= 2) {
      performSearch(trimmedQuery);
    } else if (trimmedQuery.length === 0) {
      resetSearch();
    }
  }, [performSearch, resetSearch]);

  // Handle tag click - Use useCallback to cache function
  const handleTagClick = useCallback((tag: string) => {
    setSearchQuery(tag);
    performSearch(tag);
  }, [performSearch]);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const queryFromUrl = urlParams.get('q') || '';
      setSearchQuery(queryFromUrl);
      
      if (fuseRef.current && queryFromUrl) {
        const results = fuseRef.current.search(queryFromUrl);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Fetch search data
  useEffect(() => {
    let isMounted = true;
    
    const initializeSearch = async () => {
      if (isInitialized) return; // Avoid repeated initialization
      setIsLoading(true);
      
      try {
        // 1. Load search data
        const response = await fetch(`/data/search-data.json?v=${dataTimestamp}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search data');
        }
        const data = await response.json();
        if (!isMounted) return;
        setSearchArticles(data);
        
        // 2. Dynamically import Fuse.js
        const fuseModule = await import('fuse.js');
        const Fuse = fuseModule.default;
        
        // 3. Initialize Fuse instance
        fuseRef.current = new Fuse(data, {
          keys: [
            { name: 'title', weight: 2 },
            { name: 'description', weight: 1.5 },
            { name: 'tags', weight: 1 },
            { name: 'categories', weight: 1 },
            { name: 'author', weight: 0.5 }
          ],
          includeScore: true,
          threshold: 0.4,
          ignoreLocation: true,
        });
        
        if (!isMounted) return;
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing search:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeSearch();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [dataTimestamp]);

  // Initial query execution
  useEffect(() => {
    // Ensure it only runs once after initialization
    if (isInitialized && !initialQueryRun.current) {
      const currentQuery = getInitialQuery();
      if (currentQuery) {
        performSearch(currentQuery, false);
      }
      initialQueryRun.current = true;
    }
  }, [isInitialized, getInitialQuery, performSearch]);

  // Cache tag buttons with useMemo
  const tagButtons = useMemo(() => (
    <div className="mt-3 flex flex-wrap gap-2">
      {popularTags.map(tag => (
        <TagButton key={tag} tag={tag} onClick={handleTagClick} />
      ))}
    </div>
  ), [popularTags, handleTagClick]);

  // Cache search results list with useMemo
  const searchResultsList = useMemo(() => {
    if (!searchQuery || searchResults.length === 0) return null;
    
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {searchResults.map(result => (
          <SearchResultCard
            key={result.item.slug}
            post={result.item}
            formatDate={formatDate}
          />
        ))}
      </div>
    );
  }, [searchQuery, searchResults, formatDate]);

  // Cache all articles list with useMemo
  const allArticlesList = useMemo(() => {
    if (searchQuery || isLoading || searchArticles.length === 0) return null;
    
    return (
      <>
        <h2 className="text-2xl font-bold mb-6">All Articles</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {searchArticles.map(post => (
            <SearchResultCard
              key={post.slug}
              post={post}
              formatDate={formatDate}
            />
          ))}
        </div>
      </>
    );
  }, [searchQuery, isLoading, searchArticles, formatDate]);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Search box */}
      <div className="mb-8">
        <div className="relative">
          <input 
            type="text" 
            id="search-input" 
            placeholder="Search articles, tags or categories..." 
            className="w-full p-4 pr-12 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={handleSearchInput}
          />
          <div className="absolute right-4 top-4 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Popular tags */}
        {tagButtons}
      </div>
      
      {/* Search status */}
      {searchQuery && (
        <div className="mb-6 text-center py-3 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-slate-600 dark:text-slate-300">
            <span>{searchResults.length}</span> results matching "<span>{searchQuery}</span>"
          </p>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      )}
      
      {/* Search results */}
      {searchResultsList}
      
      {/* No results state */}
      {searchQuery && searchResults.length === 0 && !isLoading && isInitialized && (
        <div className="text-center py-12">
          <p className="text-xl text-slate-600 dark:text-slate-300">No matching articles found.</p>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Try different keywords or
            <button onClick={resetSearch} className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
              view all articles
            </button>
          </p>
        </div>
      )}
      
      {/* Initial state: show all articles */}
      {allArticlesList}
    </div>
  );
};

export default React.memo(SearchIsland); 