'use client';

import React, { useState } from 'react';
import { Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  aiModelName: string;
  onOpenSettings: () => void;
}

export default function Header({ aiModelName, onOpenSettings }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleAvatarClick = () => {
    if (!user) {
      // 未登录时跳转到登录页
      router.push('/auth');
    } else {
      // 已登录时显示用户菜单
      setShowUserMenu(!showUserMenu);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
    router.push('/');
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    router.push('/profile');
  };

  return (
    <header className="header flex justify-end items-center ">


      <div className="header-right">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[rgba(0,0,0,0.06)] text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F7] transition-all duration-150"
          onClick={onOpenSettings}
          aria-label="打开设置"
        >
          <Settings className="w-5 h-5 text-[rgba(0,0,0,0.6)]" />
          <span className="text-[15px] font-medium">设置</span>
        </button>

        <div className="relative">
          <div
            className="header-avatar bg-[#007AFF] text-white cursor-pointer hover:scale-105 transition-transform duration-150"
            onClick={handleAvatarClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleAvatarClick();
              }
            }}
            aria-label={user ? "用户菜单" : "登录"}
            aria-expanded={showUserMenu}
          >
            {user ? <User className="w-5 h-5" /> : <span className="text-[13px] font-semibold">登录</span>}
          </div>

          {showUserMenu && user && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
                aria-hidden="true"
              />
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border border-[rgba(0,0,0,0.06)] shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-20 overflow-hidden"
                role="menu"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] cursor-pointer transition-colors duration-150"
                  role="menuitem"
                  tabIndex={0}
                  onClick={handleProfileClick}
                >
                  <User className="w-5 h-5 text-[rgba(0,0,0,0.6)]" />
                  <span className="text-[15px] text-[#1D1D1F]">个人信息</span>
                </div>
                <div className="h-px bg-[rgba(0,0,0,0.06)]" />
                <div
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] cursor-pointer transition-colors duration-150"
                  role="menuitem"
                  tabIndex={0}
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 text-[rgba(0,0,0,0.6)]" />
                  <span className="text-[15px] text-[#1D1D1F]">退出</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
