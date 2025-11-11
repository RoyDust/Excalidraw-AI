'use client';

import React, { useState } from 'react';

interface HeaderProps {
  aiModelName: string;
  onOpenSettings: () => void;
}

export default function Header({ aiModelName, onOpenSettings }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // 从 localStorage 读取登录状态
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  });

  // 监听 localStorage 变化
  React.useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    // 监听 storage 事件（当其他标签页修改 localStorage 时）
    window.addEventListener('storage', checkLoginStatus);

    // 监听焦点事件（当用户从其他标签页切换回来时）
    window.addEventListener('focus', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('focus', checkLoginStatus);
    };
  }, []);

  const userInitial = isLoggedIn ? 'U' : '登录'; // 未登录显示"登录"文本

  const handleAvatarClick = () => {
    if (!isLoggedIn) {
      // 未登录时跳转到登录页
      window.location.href = '/auth';
    } else {
      // 已登录时显示用户菜单
      setShowUserMenu(!showUserMenu);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setShowUserMenu(false);
    window.location.href = '/';
  };

  return (
    <header className="header flex justify-end items-center ">


      <div className="header-right">
        <button
          className="btn btn-secondary header-settings-btn"
          onClick={onOpenSettings}
          aria-label="打开设置"
        >
          <span className="settings-icon">⚙️</span>
          设置
        </button>

        <div
          className="header-avatar"
          onClick={handleAvatarClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleAvatarClick();
            }
          }}
          aria-label={isLoggedIn ? "用户菜单" : "登录"}
          aria-expanded={showUserMenu}
        >
          {userInitial}
        </div>

        {showUserMenu && (
          <>
            <div
              className="menu-backdrop"
              onClick={() => setShowUserMenu(false)}
              aria-hidden="true"
            />
            <div
              className="user-menu-dropdown"
              role="menu"
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <div
                className="user-menu-item"
                role="menuitem"
                tabIndex={0}
              >
                <span className="menu-item-icon">👤</span>
                <span className="menu-item-text">个人信息</span>
              </div>
              <div
                className="user-menu-item"
                role="menuitem"
                tabIndex={0}
                onClick={handleLogout}
              >
                <span className="menu-item-icon">🚪</span>
                <span className="menu-item-text">退出</span>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
