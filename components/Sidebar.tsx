'use client';

import React from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'smart-drawing',
    label: '智能绘图',
    icon: <span>✨</span>,
    path: '/',
  },
  {
    id: 'ai-settings',
    label: 'AI设置',
    icon: <span>⚙️</span>,
    path: '/settings',
  },
  {
    id: 'history',
    label: '历史记录',
    icon: <span>📚</span>,
    path: '/history',
  },
  {
    id: 'profile',
    label: '个人信息',
    icon: <span>👤</span>,
    path: '/profile',
  },
];

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: SidebarItem) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeItem,
  onItemClick,
  collapsed,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">Excalidraw AI</h1>
        <p className="sidebar-subtitle">AI驱动的图表生成</p>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${
              activeItem === item.id ? 'active' : ''
            }`}
            onClick={() => onItemClick(item)}
          >
            <div className="sidebar-item-icon">{item.icon}</div>
            <div className="sidebar-item-text">{item.label}</div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
