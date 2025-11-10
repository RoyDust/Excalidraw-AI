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

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
    '生成一个用户注册流程图',
    '创建一个项目组织架构图',
    '制作一个思维导图',
    '设计一个系统架构图',
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h3 className="chat-title">{aiModelName}</h3>
        <button className="chat-close-btn" title="关闭Chat">
          ×
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <div className="empty-icon">🎨</div>
            <h4 className="empty-title">开始与 AI 对话</h4>
            <p className="empty-description">
              描述你想要创建的图表，AI将为你生成
            </p>
            <div className="quick-prompts">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="quick-prompt"
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.type}`}
              >
                <div className={`message-avatar ${message.type}`}>
                  {message.type === 'ai' ? '🤖' : '👤'}
                </div>
                <div className={`message-bubble ${message.type}`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message ai">
                <div className="message-avatar ai">🤔</div>
                <div className="message-bubble ai">正在思考...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="chat-input-area">
        <div className="input-group">
          <textarea
            className="chat-textarea"
            placeholder="描述您想要创建的图表..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <div className="upload-buttons">
            <label className="upload-btn" title="上传图片">
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                disabled={isLoading}
              />
              🖼️
            </label>
            <label className="upload-btn" title="上传文档">
              <input
                type="file"
                accept=".md,.txt"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                disabled={isLoading}
              />
              📄
            </label>
          </div>
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={(!inputValue.trim() && !isLoading) || isLoading}
            title="发送"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>

        <div className="chart-type-selector">
          <label className="radio-btn">
            <input
              type="radio"
              name="chartType"
              value="auto"
              checked={chartType === 'auto'}
              onChange={() => setChartType('auto')}
              disabled={isLoading}
            />
            自动
          </label>
          <label className="radio-btn">
            <input
              type="radio"
              name="chartType"
              value="flowchart"
              checked={chartType === 'flowchart'}
              onChange={() => setChartType('flowchart')}
              disabled={isLoading}
            />
            流程图
          </label>
          <label className="radio-btn">
            <input
              type="radio"
              name="chartType"
              value="mindmap"
              checked={chartType === 'mindmap'}
              onChange={() => setChartType('mindmap')}
              disabled={isLoading}
            />
            思维导图
          </label>
          <label className="radio-btn">
            <input
              type="radio"
              name="chartType"
              value="orgchart"
              checked={chartType === 'orgchart'}
              onChange={() => setChartType('orgchart')}
              disabled={isLoading}
            />
            组织架构图
          </label>
        </div>
      </div>
    </div>
  );
}
