'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: number;
  attachments?: Array<{
    name: string;
    type: string;
    size: number;
  }>;
}

export type ChartType = 'auto' | 'flowchart' | 'mindmap' | 'orgchart';

const CHAT_STORAGE_KEY = 'excalidraw-ai-chat-history';
const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ALLOWED_FILE_TYPES = ['.md', '.txt'];

interface ChatProps {
  aiModelName: string;
}

export default function Chat({ aiModelName }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chartType, setChartType] = useState<ChartType>('auto');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 从本地存储加载消息
  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
      }
    } else {
      // 添加欢迎消息
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'ai',
        content: `你好！我是 ${aiModelName}，你的AI图表助手。请选择要生成的图形类型，或直接描述你想要的图表。`,
        timestamp: Date.now(),
      };
      setMessages([welcomeMessage]);
    }
  }, [aiModelName]);

  // 保存消息到本地存储
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() && !isLoading) return;

    // 添加用户消息
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: `我已经收到您的请求："${userMessage.content}"。正在生成相应的图表，请稍候...`,
        timestamp: Date.now(),
      };
      setMessages([...newMessages, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      alert('仅支持 .md 和 .txt 格式的文件');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('文件大小不能超过 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content: `上传了文件: ${file.name}\n\n内容:\n${content}`,
        timestamp: Date.now(),
        attachments: [
          {
            name: file.name,
            type: file.type,
            size: file.size,
          },
        ],
      };
      setMessages((prev) => [...prev, userMessage]);
    };
    reader.readAsText(file);

    // 清空input
    e.target.value = '';
  };

  const quickPrompts = [
    {
      icon: '🔄',
      text: '生成一个用户注册流程图',
      description: '包含注册、验证、登录步骤'
    },
    {
      icon: '🏢',
      text: '创建一个项目组织架构图',
      description: '展示团队结构和层级关系'
    },
    {
      icon: '🧠',
      text: '制作一个思维导图',
      description: '围绕主题展开的创意图'
    },
    {
      icon: '⚙️',
      text: '设计一个系统架构图',
      description: '展示技术栈和模块关系'
    },
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="chat-area">
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#667eea] to-[#764ba2] m-4 rounded-2xl relative overflow-hidden shadow-[0_10px_40px_rgba(102,126,234,0.3)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(102,126,234,0.4)] hover:-translate-y-1">
        <div className="chat-header p-6 flex items-center justify-between bg-white/10 backdrop-blur-md border-b border-white/20">
          <h3 className="chat-title text-white text-headline font-semibold m-0 text-shadow-sm">{aiModelName}</h3>
          <button className="chat-close-btn w-8 h-8 rounded-lg bg-white/20 border border-white/30 text-white cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/30 hover:scale-110 text-xl font-light">
            ×
          </button>
        </div>

        <div className="chat-messages flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-transparent">
          {messages.length === 0 ? (
            <div className="chat-empty-state flex-1 flex flex-col items-center justify-center text-center text-white p-10">
              <div className="empty-icon-wrapper mb-6">
                <div className="empty-icon text-5xl animate-bounce">✨</div>
              </div>
              <h4 className="empty-title text-white text-headline m-0 mb-2">开始与 AI 对话</h4>
              <p className="empty-description text-white/90 text-body m-0 mb-6">
                描述你想要创建的图表，AI将为你生成
              </p>
              <div className="quick-prompts flex flex-col gap-2 mt-6 w-full max-w-[320px]">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="quick-prompt flex items-center gap-3 p-4 bg-white/10 border border-white/20 rounded-xl text-white/90 font-body cursor-pointer transition-all duration-200 relative overflow-hidden backdrop-blur-md hover:border-white/40 hover:text-white hover:translate-x-1 hover:shadow-lg"
                    onClick={() => handleQuickPrompt(prompt.text)}
                  >
                    <span className="quick-prompt-icon text-2xl relative z-10">{prompt.icon}</span>
                    <div className="quick-prompt-content flex-1 flex flex-col gap-1 relative z-10">
                      <span className="quick-prompt-text font-semibold text-inherit">{prompt.text}</span>
                      <span className="quick-prompt-description text-sm text-white/70">{prompt.description}</span>
                    </div>
                    <span className="quick-prompt-arrow text-xl text-white opacity-0 -translate-x-1 transition-all duration-200 relative z-10">→</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`message-avatar w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${message.type === 'ai' ? 'bg-white/20 text-white' : 'bg-white text-gray-800'}`}>
                    {message.type === 'ai' ? '🤖' : '👤'}
                  </div>
                  <div className={`message-bubble max-w-[85%] p-3 rounded-xl break-words ${message.type === 'ai' ? 'bg-white/15 text-white border border-white/20 backdrop-blur-md' : 'bg-white/95 text-gray-800'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chat-message ai flex gap-2 justify-start">
                  <div className="message-avatar ai w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-white/20 text-white">🤔</div>
                  <div className="message-bubble ai bg-white/15 text-white border border-white/20 backdrop-blur-md p-3 rounded-xl">正在思考...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="chat-input-area p-4 border-t border-white/20 bg-black/10 flex flex-col gap-4">
          <div className="upload-section flex flex-col gap-1">
            <div className="upload-buttons flex gap-2">
              <label className="upload-btn flex-1 h-11 border border-white/30 rounded-xl bg-white/10 text-white cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:border-white/50 hover:bg-white/20 backdrop-blur-md font-body" title="上传图片">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  disabled={isLoading}
                  onChange={() => {/* 图片上传处理 */}}
                />
                <span className="upload-icon text-lg">🖼️</span>
                <span className="upload-label text-sm font-medium">图片</span>
              </label>
              <label className="upload-btn flex-1 h-11 border border-white/30 rounded-xl bg-white/10 text-white cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:border-white/50 hover:bg-white/20 backdrop-blur-md font-body" title="上传文档">
                <input
                  type="file"
                  accept=".md,.txt"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  disabled={isLoading}
                />
                <span className="upload-icon text-lg">📄</span>
                <span className="upload-label text-sm font-medium">文档</span>
              </label>
            </div>
          </div>

          <div className="input-section">
            <div className="textarea-wrapper relative">
              <textarea
                className="chat-textarea w-full min-h-[44px] max-h-[120px] p-3 pr-12 border border-white/30 rounded-xl font-body text-white bg-white/10 resize-none transition-all duration-200 backdrop-blur-md placeholder:text-white/60 focus:outline-none focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)] focus:bg-white/15"
                placeholder="描述您想要创建的图表..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={4}
              />
              <button
                className="send-btn absolute right-1 bottom-3 w-10 h-10 border-2 border-white/30 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] text-white cursor-pointer flex items-center justify-center transition-all duration-200 shadow-[0_4px_12px_rgba(0,122,255,0.4)] hover:opacity-95 hover:-translate-y-0.5 z-10"
                onClick={handleSend}
                disabled={(!inputValue.trim() && !isLoading) || isLoading}
                title="发送"
              >
                {isLoading ? '⏳' : '➤'}
              </button>
            </div>
          </div>

          <div className="chart-selector-section flex flex-col gap-1">
            <label className="chart-selector-label text-subhead text-white/70 text-xs font-medium">图表类型</label>
            <select
              className="chart-type-select h-11 px-3 border border-white/30 rounded-xl font-body text-white bg-white/10 cursor-pointer transition-all duration-200 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220%200%2012%2012%22%3E%3Cpath fill=%22white%22 d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 center pr-10 backdrop-blur-md hover:border-white/50 hover:bg-white/15 focus:outline-none focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)] focus:bg-white/15"
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
              disabled={isLoading}
            >
              <option value="auto">自动识别</option>
              <option value="flowchart">流程图</option>
              <option value="mindmap">思维导图</option>
              <option value="orgchart">组织架构图</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
