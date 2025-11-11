'use client';

import { useState } from 'react';
import Sidebar, { type SidebarItem } from '@/components/Sidebar';
import Header from '@/components/Header';
import { User, Camera, TrendingUp, Calendar, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const [activeItem, setActiveItem] = useState('profile');
  const [aiModelName] = useState('GPT-4o');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { user } = useAuth();
  console.log(user);


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

        <div className="workspace bg-[#F9FAFB] p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-[34px] font-bold leading-[1.2] text-[#1D1D1F] m-0 mb-2">个人信息</h1>
              <p className="text-[15px] text-[rgba(0,0,0,0.5)] m-0">
                管理您的个人资料和账户设置
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] flex items-center justify-center shadow-[0_4px_12px_rgba(0,122,255,0.2)]">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-[22px] font-semibold leading-[1.3] text-[#1D1D1F] mb-1">用户名</h2>
                    <p className="text-[15px] text-[rgba(0,0,0,0.5)] mb-4">user@example.com</p>
                    <button className="inline-flex items-center justify-center gap-2 w-full min-h-[40px] px-4 py-2 bg-[#F5F5F7] text-[#1D1D1F] text-[15px] font-medium rounded-lg hover:bg-[#E8E8ED] transition-all duration-150">
                      <Camera className="w-4 h-4" />
                      更换头像
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.06)]">
                    <h3 className="text-[17px] font-semibold text-[#1D1D1F] mb-3">统计信息</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[rgba(0,0,0,0.5)]" />
                          <span className="text-[15px] text-[rgba(0,0,0,0.6)]">创建图表</span>
                        </div>
                        <span className="text-[17px] font-semibold text-[#1D1D1F]">42</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[rgba(0,0,0,0.5)]" />
                          <span className="text-[15px] text-[rgba(0,0,0,0.6)]">使用天数</span>
                        </div>
                        <span className="text-[17px] font-semibold text-[#1D1D1F]">15</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[rgba(0,0,0,0.5)]" />
                          <span className="text-[15px] text-[rgba(0,0,0,0.6)]">AI 请求</span>
                        </div>
                        <span className="text-[17px] font-semibold text-[#1D1D1F]">128</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h2 className="text-[22px] font-normal leading-[1.3] text-[#1D1D1F] mb-4">基本信息</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">姓名</label>
                      <input
                        type="text"
                        defaultValue="用户名"
                        className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">邮箱</label>
                      <input
                        type="email"
                        defaultValue="user@example.com"
                        className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">电话</label>
                      <input
                        type="tel"
                        placeholder="输入电话号码"
                        className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">公司/组织</label>
                      <input
                        type="text"
                        placeholder="输入公司或组织名称"
                        className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">个人简介</label>
                      <textarea
                        rows={4}
                        placeholder="简单介绍一下自己..."
                        className="w-full px-3 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h2 className="text-[22px] font-normal leading-[1.3] text-[#1D1D1F] mb-4">安全设置</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">当前密码</label>
                      <input
                        type="password"
                        placeholder="输入当前密码"
                        className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">新密码</label>
                      <input
                        type="password"
                        placeholder="输入新密码"
                        className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">确认新密码</label>
                      <input
                        type="password"
                        placeholder="再次输入新密码"
                        className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 min-h-[44px] bg-[#007AFF] text-white font-semibold text-[17px] rounded-lg hover:bg-[#0051D5] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150 shadow-[0_2px_8px_rgba(0,122,255,0.3)]">
                    保存更改
                  </button>
                  <button className="flex-1 min-h-[44px] bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-[17px] rounded-lg hover:bg-[#E8E8ED] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150">
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
