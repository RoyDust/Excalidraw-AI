'use client';

import { useState } from 'react';
import { Search, Filter, Trash2, FileText, Brain, Building2, Calendar } from 'lucide-react';

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
  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="workspace bg-[#F9FAFB] p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[34px] font-bold leading-[1.2] text-[#1D1D1F] m-0 mb-2">
                  历史记录
                </h1>
                <p className="text-[15px] text-[rgba(0,0,0,0.5)] m-0">查看和管理您之前创建的图表</p>
              </div>
              <button className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 bg-[#FF3B30] text-white text-[15px] font-medium rounded-lg hover:bg-[#D7140A] transition-all duration-150">
                <Trash2 className="w-4 h-4" />
                清空历史
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="mb-6 flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(0,0,0,0.35)]" />
                  <input
                    type="text"
                    placeholder="搜索图表..."
                    className="w-full h-11 pl-10 pr-4 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(0,0,0,0.35)] pointer-events-none" />
                  <select className="h-11 pl-10 pr-10 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] cursor-pointer transition-all duration-150 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220%200%2012%2012%22%3E%3Cpath fill=%22%231D1D1F%22 d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] hover:bg-[#F5F5F7] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)]">
                    <option value="all">所有类型</option>
                    <option value="flowchart">流程图</option>
                    <option value="mindmap">思维导图</option>
                    <option value="orgchart">组织架构图</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-xl p-4 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-150 cursor-pointer group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#F0F4FF] to-[#E8EFFD] rounded-lg mb-3 flex items-center justify-center border border-[rgba(0,0,0,0.06)]">
                      {item.type === 'flowchart' ? (
                        <FileText className="w-12 h-12 text-[#007AFF]" />
                      ) : item.type === 'mindmap' ? (
                        <Brain className="w-12 h-12 text-[#34C759]" />
                      ) : (
                        <Building2 className="w-12 h-12 text-[#FF9500]" />
                      )}
                    </div>
                    <h3 className="text-[17px] font-semibold text-[#1D1D1F] mb-2 group-hover:text-[#007AFF] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-[13px] text-[rgba(0,0,0,0.5)]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                      <span className="text-[13px] text-[#007AFF] bg-[#E3F2FD] px-2 py-0.5 rounded-md font-medium">
                        {item.type === 'flowchart'
                          ? '流程图'
                          : item.type === 'mindmap'
                            ? '思维导图'
                            : '组织架构'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 text-[15px] py-2 bg-[#007AFF] hover:bg-[#0051D5] text-white font-medium rounded-lg transition-all duration-150">
                        打开
                      </button>
                      <button className="flex-1 text-[15px] py-2 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#FF3B30] font-medium rounded-lg transition-all duration-150">
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {mockHistory.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                    <FileText className="w-10 h-10 text-[rgba(0,0,0,0.35)]" />
                  </div>
                  <p className="text-[17px] text-[rgba(0,0,0,0.5)]">暂无历史记录</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
