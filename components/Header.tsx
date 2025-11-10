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
    <header className="header">
      <div className="header-left">
        <div className="header-ai-info">
          <span className="header-ai-name">{aiModelName}</span>
          <span className="header-ai-status">在线</span>
        </div>
      </div>

      <div className="header-right">
        <button
          className="btn btn-secondary"
          onClick={onOpenSettings}
          style={{ minHeight: '36px', padding: '4px 16px', fontSize: '15px' }}
        >
          配置管理
        </button>

        <div
          className="header-avatar"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {userInitial}
        </div>

        {showUserMenu && (
          <div
            style={{
              position: 'absolute',
              top: '56px',
              right: '24px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
              padding: '8px',
              zIndex: 1000,
              minWidth: '160px',
            }}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <div
              style={{
                padding: '8px 16px',
                fontSize: '15px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              个人信息
            </div>
            <div
              style={{
                padding: '8px 16px',
                fontSize: '15px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
              onClick={() => {
                // 退出登录逻辑
                setShowUserMenu(false);
              }}
            >
              退出
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
