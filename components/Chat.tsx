'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image as ImageIcon, FileText, Sparkles } from 'lucide-react';

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
      text: '生成一个用户注册流程图',
      description: '包含注册、验证、登录步骤'
    },
    {
      text: '创建一个项目组织架构图',
      description: '展示团队结构和层级关系'
    },
    {
      text: '制作一个思维导图',
      description: '围绕主题展开的创意图'
    },
    {
      text: '设计一个系统架构图',
      description: '展示技术栈和模块关系'
    },
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="chat-area w-[500px] flex flex-col flex-shrink-0">
      <div className="flex-1 flex flex-col bg-[#F9FAFB] m-4 rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-250">
        <div className="p-4 flex items-center justify-between bg-white border-b border-[rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-[#1D1D1F] m-0">{aiModelName}</h3>
              <p className="text-[13px] text-[rgba(0,0,0,0.5)] m-0">在线</p>
            </div>
          </div>
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
                  className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-[18px] break-words text-[15px] leading-[1.4] ${
                    message.type === 'ai'
                      ? 'bg-[#E9ECEF] text-[#1D1D1F] rounded-tl-[4px]'
                      : 'bg-[#007AFF] text-white rounded-tr-[4px]'
                  }`}>
                    {message.content}
                  </div>
                  {message.type === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[#34C759] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[13px] font-semibold">U</span>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#E9ECEF] text-[#1D1D1F] px-4 py-2.5 rounded-[18px] rounded-tl-[4px] text-[15px]">
                    正在思考...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="p-4 border-t border-[rgba(0,0,0,0.06)] bg-white flex flex-col gap-3">
          <div className="flex gap-2">
            <label className="flex-1 min-h-[36px] border border-[rgba(0,0,0,0.1)] rounded-lg bg-[#FAFAFA] text-[#1D1D1F] cursor-pointer flex items-center justify-center gap-2 transition-all duration-150 hover:bg-[#F5F5F7] hover:border-[rgba(0,0,0,0.15)]" title="上传图片">
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                disabled={isLoading}
                onChange={() => {/* 图片上传处理 */}}
              />
              <ImageIcon className="w-4 h-4 text-[rgba(0,0,0,0.6)]" />
              <span className="text-[13px] font-medium">图片</span>
            </label>
            <label className="flex-1 min-h-[36px] border border-[rgba(0,0,0,0.1)] rounded-lg bg-[#FAFAFA] text-[#1D1D1F] cursor-pointer flex items-center justify-center gap-2 transition-all duration-150 hover:bg-[#F5F5F7] hover:border-[rgba(0,0,0,0.15)]" title="上传文档">
              <input
                type="file"
                accept=".md,.txt"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                disabled={isLoading}
              />
              <FileText className="w-4 h-4 text-[rgba(0,0,0,0.6)]" />
              <span className="text-[13px] font-medium">文档</span>
            </label>
          </div>

          <div className="relative">
            <textarea
              className="w-full min-h-[88px] max-h-[120px] px-3 py-2.5 pr-12 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] leading-[1.4] text-[#1D1D1F] bg-[#FAFAFA] resize-none transition-all duration-150 placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)]"
              placeholder="描述您想要创建的图表..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
            />
            <button
              className="absolute right-2 bottom-2.5 w-8 h-8 rounded-full bg-[#007AFF] text-white cursor-pointer flex items-center justify-center transition-all duration-150 hover:bg-[#0051D5] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(0,122,255,0.3)]"
              onClick={handleSend}
              disabled={(!inputValue.trim() && !isLoading) || isLoading}
              title="发送"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[rgba(0,0,0,0.5)] font-medium">图表类型</label>
            <select
              className="h-10 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] cursor-pointer transition-all duration-150 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220%200%2012%2012%22%3E%3Cpath fill=%22%231D1D1F%22 d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10 hover:bg-[#F5F5F7] hover:border-[rgba(0,0,0,0.15)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)]"
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
