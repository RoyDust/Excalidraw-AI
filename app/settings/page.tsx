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

        <div className="workspace">
          <div className="flex-1 flex flex-col bg-gradient-to-br from-[#667eea] to-[#764ba2] m-4 rounded-2xl relative overflow-hidden shadow-[0_10px_40px_rgba(102,126,234,0.3)]">
            <div className="p-8">
              <h1 className="text-white text-display-1 m-0 mb-4">AI 设置</h1>
              <p className="text-white/90 text-body m-0">
                配置您的 AI 模型和偏好设置
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-white text-headline mb-4">模型配置</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-subhead mb-2">当前模型</label>
                      <select className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 cursor-pointer transition-all duration-200 appearance-none backdrop-blur-md">
                        <option value="gpt-4o">GPT-4o</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-3.5">GPT-3.5</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/80 text-subhead mb-2">温度 (Temperature)</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        defaultValue="0.7"
                        className="w-full"
                      />
                      <div className="flex justify-between text-white/60 text-sm mt-1">
                        <span>保守</span>
                        <span>创意</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-white text-headline mb-4">图表偏好</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-subhead mb-2">默认图表类型</label>
                      <select className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 cursor-pointer transition-all duration-200 appearance-none backdrop-blur-md">
                        <option value="flowchart">流程图</option>
                        <option value="mindmap">思维导图</option>
                        <option value="orgchart">组织架构图</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="auto-save" className="w-5 h-5" defaultChecked />
                      <label htmlFor="auto-save" className="text-white/90">自动保存图表</label>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-white text-headline mb-4">API 配置</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-subhead mb-2">API Key</label>
                      <input
                        type="password"
                        placeholder="输入您的 API Key"
                        className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-subhead mb-2">API 端点</label>
                      <input
                        type="text"
                        placeholder="https://api.openai.com/v1"
                        className="w-full h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md"
                      />
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary w-full h-12 text-lg font-semibold">
                  保存设置
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
