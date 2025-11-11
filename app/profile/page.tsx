'use client';

import { useState } from 'react';
import Sidebar, { type SidebarItem } from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Profile() {
  const [activeItem, setActiveItem] = useState('profile');
  const [aiModelName] = useState('GPT-4o');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarItemClick = (item: SidebarItem) => {
    setActiveItem(item.id);
    window.location.href = item.path;
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
          onOpenSettings={() => {}}
        />

        <div className="workspace">
          <div className="flex-1 flex flex-col bg-gradient-to-br from-[#667eea] to-[#764ba2] m-4 rounded-2xl relative overflow-hidden shadow-[0_10px_40px_rgba(102,126,234,0.3)]">
            <div className="p-8">
              <h1 className="text-white text-display-1 m-0 mb-4">个人信息</h1>
              <p className="text-white/90 text-body m-0 mb-6">
                管理您的个人资料和账户设置
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-6xl text-white shadow-lg">
                        👤
                      </div>
                      <h2 className="text-white text-headline mb-1">用户名</h2>
                      <p className="text-white/70 text-sm mb-4">user@example.com</p>
                      <button className="btn btn-secondary w-full">
                        更换头像
                      </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/20">
                      <h3 className="text-white font-semibold mb-3">统计信息</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">创建图表</span>
                          <span className="text-white font-semibold">42</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">使用天数</span>
                          <span className="text-white font-semibold">15</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">AI 请求</span>
                          <span className="text-white font-semibold">128</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h2 className="text-white text-headline mb-4">基本信息</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-subhead mb-2">姓名</label>
                        <input
                          type="text"
                          defaultValue="用户名"
                          className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-subhead mb-2">邮箱</label>
                        <input
                          type="email"
                          defaultValue="user@example.com"
                          className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-subhead mb-2">电话</label>
                        <input
                          type="tel"
                          placeholder="输入电话号码"
                          className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-subhead mb-2">公司/组织</label>
                        <input
                          type="text"
                          placeholder="输入公司或组织名称"
                          className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-subhead mb-2">个人简介</label>
                        <textarea
                          rows={4}
                          placeholder="简单介绍一下自己..."
                          className="w-full px-3 py-2 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h2 className="text-white text-headline mb-4">安全设置</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-subhead mb-2">当前密码</label>
                        <input
                          type="password"
                          placeholder="输入当前密码"
                          className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-subhead mb-2">新密码</label>
                        <input
                          type="password"
                          placeholder="输入新密码"
                          className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-subhead mb-2">确认新密码</label>
                        <input
                          type="password"
                          placeholder="再次输入新密码"
                          className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="btn btn-primary flex-1 h-12 text-lg font-semibold">
                      保存更改
                    </button>
                    <button className="btn btn-secondary flex-1 h-12 text-lg font-semibold">
                      取消
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
