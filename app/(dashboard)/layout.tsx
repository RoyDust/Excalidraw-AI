'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar, { type SidebarItem } from '@/components/Sidebar';
import Header from '@/components/Header';

// Helper function to get active item from pathname
const getActiveItemFromPath = (path: string): string => {
  if (path === '/home') return 'smart-drawing';
  if (path === '/settings') return 'ai-settings';
  if (path === '/history') return 'history';
  if (path === '/profile') return 'profile';
  return 'smart-drawing';
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(() => getActiveItemFromPath(pathname));
  const [aiModelName] = useState('GPT-4o');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Update active item based on current path
  useEffect(() => {
    setActiveItem(getActiveItemFromPath(pathname));
  }, [pathname]);

  const handleSidebarItemClick = (item: SidebarItem) => {
    router.push(item.path);
  };

  const handleOpenSettings = () => {
    router.push('/settings');
  };

  return (
    <div className="main-layout">
      <Sidebar
        activeItem={activeItem}
        onItemClick={handleSidebarItemClick}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="main-content">
        <Header aiModelName={aiModelName} onOpenSettings={handleOpenSettings} />
        {children}
      </div>
    </div>
  );
}
