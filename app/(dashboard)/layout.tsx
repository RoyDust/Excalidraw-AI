'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar, { type SidebarItem } from '@/components/Sidebar';
import Header from '@/components/Header';
import ConfigurationModal, { type Configuration } from '@/components/ConfigurationModal';

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
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Update active item based on current path
  useEffect(() => {
    setActiveItem(getActiveItemFromPath(pathname));
  }, [pathname]);

  const handleSidebarItemClick = (item: SidebarItem) => {
    router.push(item.path);
  };

  const handleOpenSettings = () => {
    setShowConfigModal(true);
  };

  const handleSaveConfiguration = async (config: Configuration) => {
    // TODO: 实现保存配置的逻辑
    // 这里可以将配置保存到本地存储或发送到服务器
    console.log('保存配置:', config);

    // 示例：将配置保存到 localStorage
    const existingConfigs = JSON.parse(localStorage.getItem('ai-configs') || '[]');
    existingConfigs.push({
      ...config,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('ai-configs', JSON.stringify(existingConfigs));

    alert('配置保存成功！');
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

        {/* 配置弹窗 */}
        <ConfigurationModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          onSave={handleSaveConfiguration}
        />
      </div>
    </div>
  );
}
