'use client';

import React from 'react';
import { Sparkles, Settings, History, User } from 'lucide-react';

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
    icon: <Sparkles className="w-5 h-5" />,
    path: '/home',
  },
  {
    id: 'ai-settings',
    label: 'AI设置',
    icon: <Settings className="w-5 h-5" />,
    path: '/settings',
  },
  {
    id: 'history',
    label: '历史记录',
    icon: <History className="w-5 h-5" />,
    path: '/history',
  },
  {
    id: 'profile',
    label: '个人信息',
    icon: <User className="w-5 h-5" />,
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
    <aside className={`sidebar bg-[#FAFBFC] border-r border-[rgba(0,0,0,0.06)] ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header border-b border-[rgba(0,0,0,0.06)] p-6">
        <h1 className="text-[28px] font-normal leading-[1.25] text-[#1D1D1F] m-0 mb-1">Excalidraw AI</h1>
        <p className="text-[15px] leading-[1.4] text-[rgba(0,0,0,0.35)] m-0">AI驱动的图表生成</p>
      </div>

      <nav className="sidebar-nav flex-1 py-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 px-6 py-2 min-h-[44px] cursor-pointer transition-all duration-150 relative ${
              activeItem === item.id
                ? 'bg-[#F0F0F5] font-semibold before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-6 before:bg-[#007AFF] before:rounded-r-sm'
                : 'hover:bg-[#F5F5F7]'
            }`}
            onClick={() => onItemClick(item)}
          >
            <div className={`flex items-center justify-center flex-shrink-0 ${activeItem === item.id ? 'text-[#007AFF]' : 'text-[rgba(0,0,0,0.6)]'}`}>
              {item.icon}
            </div>
            <div className={`text-[17px] leading-[1.47] whitespace-nowrap ${activeItem === item.id ? 'text-[#007AFF]' : 'text-[#1D1D1F]'}`}>
              {item.label}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
