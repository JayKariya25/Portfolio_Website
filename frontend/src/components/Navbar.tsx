"use client";

import { useTheme } from "@/context/ThemeContext";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

interface SearchItem {
  title: string;
  category: "Actions" | "Navigation" | "Links";
  targetId?: string;
  action?: "print" | "theme";
  href?: string;
}

const SEARCHABLE_ITEMS: SearchItem[] = [
  // Actions
  { title: "Print / Save Resume as PDF", category: "Actions", action: "print" },
  { title: "Toggle Theme (Light / Dark Mode)", category: "Actions", action: "theme" },
  
  // Navigation
  { title: "Home", category: "Navigation", targetId: "top" },
  { title: "About", category: "Navigation", href: "/about" },
  { title: "Work", category: "Navigation", targetId: "work" },
  { title: "Projects", category: "Navigation", targetId: "projects" },
  { title: "Contact", category: "Navigation", href: "/contact" },
  
  // Links
  { title: "Personal Website", category: "Links", targetId: "top" },
  { title: "GitHub", category: "Links", href: "https://github.com" },
  { title: "LinkedIn", category: "Links", href: "https://linkedin.com" },
  { title: "LeetCode", category: "Links", href: "https://leetcode.com" }
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Toggle search modal
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setSearchQuery("");
    setActiveIndex(0);
  };

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Filter searchable items
  const filteredItems = SEARCHABLE_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Spotlight actions
  const triggerAction = (item: SearchItem) => {
    setIsSearchOpen(false);
    
    if (item.action === "print") {
      window.print();
    } else if (item.action === "theme") {
      toggleTheme();
    } else if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else if (item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/#${item.targetId}`;
      }
    }
  };

  // Modal navigation keyboard events
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        triggerAction(filteredItems[activeIndex]);
      }
    }
  };

  // Close when clicking outside content
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsSearchOpen(false);
    }
  };

  // Icon mapping helper
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t === "home") {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    }
    if (t === "about") {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
      );
    }
    if (t === "work") {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    }
    if (t === "projects") {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    }
    if (t === "contact") {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    }
    if (t.includes("print")) {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect width="12" height="8" x="6" y="14" />
        </svg>
      );
    }
    if (t.includes("theme")) {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    }
    if (t.includes("github")) {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    }
    if (t.includes("linkedin")) {
      return (
        <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      );
    }
    // Default link/leetcode icon (code challenge terminal shell prompt)
    return (
      <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17l6-6-6-6M12 19h8" />
      </svg>
    );
  };

  // Group items by category for rendering, while preserving global indices for search activeIndex
  const categories: ("Actions" | "Navigation" | "Links")[] = ["Actions", "Navigation", "Links"];
  
  return (
    <>
      <div className={styles.dockContainer}>
        <nav className={`${styles.dock} glass-panel`}>
          {/* Home */}
          <a href="/" className={styles.dockLink} title="Home">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className={styles.linkLabel}>Home</span>
          </a>

          {/* Work */}
          <a href="/#work" className={styles.dockLink} title="Experience">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className={styles.linkLabel}>Work</span>
          </a>
          
          {/* Skills */}
          <a href="/#skills" className={styles.dockLink} title="Skills">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20h4M12 4v16m-8-8h16" />
            </svg>
            <span className={styles.linkLabel}>Skills</span>
          </a>

          {/* Projects */}
          <a href="/#projects" className={styles.dockLink} title="Projects">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={styles.linkLabel}>Projects</span>
          </a>

          {/* About */}
          <a href="/about" className={styles.dockLink} title="About">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className={styles.linkLabel}>About</span>
          </a>

          {/* Contact */}
          <a href="/contact" className={styles.dockLink} title="Contact">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className={styles.linkLabel}>Contact</span>
          </a>

          <div className={styles.divider}></div>

          {/* Spotlight Search Toggle Menu (Mac command icon) */}
          <button onClick={toggleSearch} className={styles.dockLink} title="Command Menu (⌘K)">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className={styles.linkLabel}>Menu</span>
          </button>

          <div className={styles.divider}></div>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
            {theme === "light" ? (
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.978 4.978l1.591 1.591m10.862 10.862l1.591 1.591M3 12h2.25m13.5 0H21M4.978 19.022l1.591-1.591m10.862-10.862l1.591-1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* macOS spotlight search menu portal */}
      {isSearchOpen && (
        <div className={styles.searchOverlay} onClick={handleOverlayClick}>
          <div className={`${styles.searchModal} glass-panel`} ref={modalRef} onKeyDown={handleModalKeyDown}>
            <div className={styles.searchHeader}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                ref={searchInputRef}
                placeholder="Type a command or search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveIndex(0);
                }}
                className={styles.searchInput}
              />
              <button className={styles.closeButton} onClick={() => setIsSearchOpen(false)} aria-label="Close search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.closeIcon}>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className={styles.searchResults}>
              {filteredItems.length > 0 ? (
                // Group rendering
                categories.map((cat) => {
                  const itemsInCat = filteredItems.filter((item) => item.category === cat);
                  if (itemsInCat.length === 0) return null;

                  return (
                    <div key={cat} className={styles.categoryGroup}>
                      <div className={styles.categoryHeader}>{cat}</div>
                      {itemsInCat.map((item) => {
                        // Dynamically resolve flat index representing the item
                        const itemIndex = filteredItems.indexOf(item);
                        const isActive = itemIndex === activeIndex;

                        return (
                          <div
                            key={item.title}
                            onClick={() => triggerAction(item)}
                            className={`${styles.searchResultItem} ${isActive ? styles.activeItem : ""}`}
                          >
                            <span className={styles.iconBox}>{getIcon(item.title)}</span>
                            <span className={styles.itemTitle}>{item.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <div className={styles.noResults}>No search results found for &ldquo;{searchQuery}&rdquo;</div>
              )}
            </div>

            <div className={styles.searchFooter}>
              <span>Use ↑↓ keys to navigate</span>
              <span>⏎ to select</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
