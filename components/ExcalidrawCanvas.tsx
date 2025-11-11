'use client';

import React, { useState } from 'react';
import { Sparkles, Pencil, Save } from 'lucide-react';

export default function ExcalidrawCanvas() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="excalidraw-area flex-1 flex flex-col bg-[#F9FAFB] min-w-0">
      <div
        className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#F0F4FF] to-[#E8EFFD] m-4 rounded-xl border border-[rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-250"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative z-10 text-center px-8">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] shadow-[0_4px_12px_rgba(0,122,255,0.15)] flex items-center justify-center mb-6 transition-transform duration-250 hover:scale-110">
              <svg
                width="48"
                height="48"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-opacity duration-250 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
              >
                <rect
                  x="15"
                  y="15"
                  width="50"
                  height="50"
                  rx="10"
                  stroke="#007AFF"
                  strokeWidth="2.5"
                  opacity="0.8"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="3"
                  fill="#007AFF"
                />
                <path
                  d="M 28 28 L 40 40 L 35 40 L 52 52"
                  stroke="#007AFF"
                  strokeWidth="2.5"
                  fill="none"
                />
                <rect
                  x="40"
                  y="40"
                  width="8"
                  height="8"
                  fill="#007AFF"
                  opacity="0.5"
                />
                <circle
                  cx="52"
                  cy="52"
                  r="3"
                  fill="#007AFF"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-[34px] font-bold leading-[1.2] text-[#007AFF] m-0 mb-3">
            开始您的创作之旅
          </h2>
          <p className="text-[17px] leading-[1.47] text-[rgba(0,0,0,0.6)] m-0 mb-2">
            与 AI 对话，让它为您生成精美的图表
          </p>
          <p className="text-[15px] leading-[1.4] text-[rgba(0,0,0,0.35)] m-0 mb-8">
            在右侧聊天框中描述您想要的图表
          </p>

          <div className="flex gap-3 justify-center">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[rgba(0,0,0,0.06)] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
              <Sparkles className="w-4 h-4 text-[#007AFF]" />
              <span className="text-[15px] font-medium text-[#1D1D1F]">智能生成</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[rgba(0,0,0,0.06)] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
              <Pencil className="w-4 h-4 text-[#34C759]" />
              <span className="text-[15px] font-medium text-[#1D1D1F]">自由编辑</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[rgba(0,0,0,0.06)] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
              <Save className="w-4 h-4 text-[#FF9500]" />
              <span className="text-[15px] font-medium text-[#1D1D1F]">实时保存</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
