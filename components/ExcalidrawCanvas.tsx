'use client';

import React, { useState } from 'react';

export default function ExcalidrawCanvas() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="excalidraw-area">
      <div
        className="excalidraw-placeholder"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="animated-bg">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>

        <div className="excalidraw-content">
          <div className="canvas-icon-wrapper">
            <div className="canvas-icon">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isHovered ? 'animate-draw' : ''}
              >
                <rect
                  x="15"
                  y="15"
                  width="50"
                  height="50"
                  rx="10"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.8"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="3"
                  fill="white"
                  className="dot-1"
                />
                <path
                  d="M 28 28 L 40 40 L 35 40 L 52 52"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  className="line-1"
                />
                <rect
                  x="40"
                  y="40"
                  width="8"
                  height="8"
                  fill="white"
                  opacity="0.6"
                />
                <circle
                  cx="52"
                  cy="52"
                  r="3"
                  fill="white"
                  className="dot-2"
                />
              </svg>
            </div>
          </div>

          <h2 className={`excalidraw-title ${isHovered ? 'highlight' : ''}`}>
            开始您的创作之旅
          </h2>
          <p className="excalidraw-subtitle">
            与 AI 对话，让它为您生成精美的图表
            <br />
            <span className="subtitle-hint">在右侧聊天框中描述您想要的图表</span>
          </p>

          <div className="feature-cards">
            <div className="feature-card">
              <span className="feature-icon">🎨</span>
              <span className="feature-text">智能生成</span>
            </div>
            <div className="feature-card">
              <span className="feature-icon">✏️</span>
              <span className="feature-text">自由编辑</span>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💾</span>
              <span className="feature-text">实时保存</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
