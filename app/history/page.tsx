'use client';

import { useState } from 'react';
import Sidebar, { type SidebarItem } from '@/components/Sidebar';
import Header from '@/components/Header';

interface HistoryItem {
  id: string;
  title: string;
  type: string;
  date: string;
  thumbnail?: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    title: '用户注册流程图',
    type: 'flowchart',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: '项目组织架构图',
    type: 'orgchart',
    date: '2024-01-14',
  },
  {
    id: '3',
    title: '思维导图：产品规划',
    type: 'mindmap',
    date: '2024-01-13',
  },
  {
    id: '4',
    title: '系统架构图',
    type: 'flowchart',
    date: '2024-01-12',
  },
  {
    id: '5',
    title: '团队结构图',
    type: 'orgchart',
    date: '2024-01-11',
  },
];

export default function History() {
  const [activeItem, setActiveItem] = useState('history');
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-white text-display-1 m-0 mb-2">历史记录</h1>
                  <p className="text-white/90 text-body m-0">
                    查看和管理您之前创建的图表
                  </p>
                </div>
                <button className="btn btn-secondary h-11 px-6">
                  清空历史
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="搜索图表..."
                    className="flex-1 h-11 px-4 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md placeholder:text-white/60"
                  />
                  <select className="h-11 px-4 border border-white/30 rounded-xl font-body text-white bg-white/10 cursor-pointer transition-all duration-200 appearance-none backdrop-blur-md">
                    <option value="all">所有类型</option>
                    <option value="flowchart">流程图</option>
                    <option value="mindmap">思维导图</option>
                    <option value="orgchart">组织架构图</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockHistory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="aspect-video bg-white/10 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-4xl">
                          {item.type === 'flowchart' ? '📊' : item.type === 'mindmap' ? '🧠' : '🏢'}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-1 group-hover:text-blue-200 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">{item.date}</span>
                        <span className="text-white/80 text-xs bg-white/10 px-2 py-1 rounded">
                          {item.type === 'flowchart' ? '流程图' : item.type === 'mindmap' ? '思维导图' : '组织架构'}
                        </span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 text-sm py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                          打开
                        </button>
                        <button className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {mockHistory.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">📚</div>
                    <p className="text-white/60">暂无历史记录</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
