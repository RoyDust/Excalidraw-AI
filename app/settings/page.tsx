'use client';

import { useState } from 'react';
import Sidebar, { type SidebarItem } from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Settings() {
  const [activeItem, setActiveItem] = useState('ai-settings');
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

        <div className="workspace bg-[#F9FAFB] p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-[34px] font-bold leading-[1.2] text-[#1D1D1F] m-0 mb-2">AI 设置</h1>
              <p className="text-[15px] text-[rgba(0,0,0,0.5)] m-0">
                配置您的 AI 模型和偏好设置
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <h2 className="text-[22px] font-normal leading-[1.3] text-[#1D1D1F] mb-4">模型配置</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">当前模型</label>
                    <select className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] cursor-pointer transition-all duration-150 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220%200%2012%2012%22%3E%3Cpath fill=%22%231D1D1F%22 d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10 hover:bg-[#F5F5F7] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)]">
                      <option value="gpt-4o">GPT-4o</option>
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5">GPT-3.5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">温度 (Temperature)</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      defaultValue="0.7"
                      className="w-full h-2 bg-[#E8E8ED] rounded-full appearance-none cursor-pointer accent-[#007AFF]"
                    />
                    <div className="flex justify-between text-[rgba(0,0,0,0.5)] text-[13px] mt-1">
                      <span>保守</span>
                      <span>创意</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <h2 className="text-[22px] font-normal leading-[1.3] text-[#1D1D1F] mb-4">图表偏好</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">默认图表类型</label>
                    <select className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] cursor-pointer transition-all duration-150 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220%200%2012%2012%22%3E%3Cpath fill=%22%231D1D1F%22 d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10 hover:bg-[#F5F5F7] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)]">
                      <option value="flowchart">流程图</option>
                      <option value="mindmap">思维导图</option>
                      <option value="orgchart">组织架构图</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="auto-save" className="w-5 h-5 rounded border-[rgba(0,0,0,0.2)] accent-[#007AFF]" defaultChecked />
                    <label htmlFor="auto-save" className="text-[15px] text-[#1D1D1F]">自动保存图表</label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <h2 className="text-[22px] font-normal leading-[1.3] text-[#1D1D1F] mb-4">API 配置</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">API Key</label>
                    <input
                      type="password"
                      placeholder="输入您的 API Key"
                      className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                    />
                  </div>
                  <div>
                    <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">API 端点</label>
                    <input
                      type="text"
                      placeholder="https://api.openai.com/v1"
                      className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full min-h-[44px] bg-[#007AFF] text-white font-semibold text-[17px] rounded-lg hover:bg-[#0051D5] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150 shadow-[0_2px_8px_rgba(0,122,255,0.3)]">
                保存设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
