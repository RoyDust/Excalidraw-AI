'use client';

import React from 'react';

export default function ExcalidrawCanvas() {
  return (
    <div className="excalidraw-area">
      <div className="excalidraw-placeholder">
        <div className="excalidraw-content">
          <h2 className="excalidraw-title">Excalidraw Canvas</h2>
          <p className="excalidraw-subtitle">
            AI 生成的图表将在这里显示，您可以自由编辑和调整
          </p>
        </div>
      </div>
    </div>
  );
}
