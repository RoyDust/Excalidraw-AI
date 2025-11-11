'use client';

import React, { useState } from 'react';

interface HeaderProps {
  aiModelName: string;
  onOpenSettings: () => void;
}

export default function Header({ aiModelName, onOpenSettings }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userInitial = 'U'; // 可以从用户信息中获取

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
          onClick={() => setShowUserMenu(!showUserMenu)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setShowUserMenu(!showUserMenu);
            }
          }}
          aria-label="用户菜单"
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
                onClick={() => {
                  // 退出登录逻辑
                  setShowUserMenu(false);
                }}
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
