'use client';

import { useState } from 'react';
import Sidebar, { type SidebarItem } from '@/components/Sidebar';
import Header from '@/components/Header';
import ExcalidrawCanvas from '@/components/ExcalidrawCanvas';
import Chat from '@/components/Chat';

export default function Home() {
  const [activeItem, setActiveItem] = useState('smart-drawing');
  const [aiModelName] = useState('GPT-4o');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarItemClick = (item: SidebarItem) => {
    setActiveItem(item.id);
    // 这里可以添加路由跳转逻辑
    console.log('Navigate to:', item.path);
  };

  const handleOpenSettings = () => {
    console.log('Open settings');
    // 这里可以打开设置模态框或跳转到设置页面
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
        <Header
          aiModelName={aiModelName}
          onOpenSettings={handleOpenSettings}
        />

        <div className="workspace">
          <ExcalidrawCanvas />
          <Chat aiModelName={aiModelName} />
        </div>
      </div>
    </div>
  );
}

