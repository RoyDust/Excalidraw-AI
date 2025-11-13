'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface Configuration {
  name: string;
  description: string;
  provider: 'openai' | 'anthropic';
  baseUrl: string;
  apiKey: string;
  model: string;
}

interface ConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: Configuration) => void;
}

export default function ConfigurationModal({ isOpen, onClose, onSave }: ConfigurationModalProps) {
  const [formData, setFormData] = useState<Configuration>({
    name: '',
    description: '',
    provider: 'openai',
    baseUrl: '',
    apiKey: '',
    model: '',
  });
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Configuration, string>>>({});

  const handleChange = (field: keyof Configuration, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }

    // Update default base URL when provider changes
    if (field === 'provider') {
      const defaultUrls = {
        openai: 'https://api.openai.com/v1',
        anthropic: 'https://api.anthropic.com/v1',
      };
      setFormData((prev) => ({
        ...prev,
        provider: value as 'openai' | 'anthropic',
        baseUrl: defaultUrls[value as 'openai' | 'anthropic'],
        model: '', // Reset model when provider changes
      }));
      setAvailableModels([]); // Clear available models
    }
  };

  const loadAvailableModels = async () => {
    if (!formData.apiKey || !formData.baseUrl) {
      alert('请先填写 API 密钥和基础 URL');
      return;
    }

    setIsLoadingModels(true);
    try {
      // Mock API call - 在实际应用中，这里应该调用真实的 API
      // 根据不同的提供商返回不同的模型列表
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockModels = {
        openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
        anthropic: [
          'claude-3-5-sonnet-20241022',
          'claude-3-5-haiku-20241022',
          'claude-3-opus-20240229',
          'claude-3-sonnet-20240229',
          'claude-3-haiku-20240307',
        ],
      };

      setAvailableModels(mockModels[formData.provider] || []);
    } catch (error) {
      console.error('加载模型失败:', error);
      alert('加载模型失败，请检查您的 API 密钥和基础 URL');
    } finally {
      setIsLoadingModels(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Configuration, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '配置名称不能为空';
    }

    if (!formData.apiKey.trim()) {
      newErrors.apiKey = 'API 密钥不能为空';
    }

    if (!formData.baseUrl.trim()) {
      newErrors.baseUrl = '基础 URL 不能为空';
    }

    if (!formData.model.trim()) {
      newErrors.model = '请选择或输入模型';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      name: '',
      description: '',
      provider: 'openai',
      baseUrl: '',
      apiKey: '',
      model: '',
    });
    setAvailableModels([]);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>新建 AI 配置</DialogTitle>
          <DialogDescription>配置您的 AI 模型提供商信息，用于智能绘图功能。</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* 配置名称 */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              配置名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="例如：我的 GPT-4 配置"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
          </div>

          {/* 配置描述 */}
          <div className="grid gap-2">
            <Label htmlFor="description">描述（可选）</Label>
            <Input
              id="description"
              placeholder="对此配置的简短描述"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          {/* 提供商类型 */}
          <div className="grid gap-2">
            <Label htmlFor="provider">
              提供商类型 <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.provider}
              onValueChange={(value) => handleChange('provider', value)}
            >
              <SelectTrigger id="provider">
                <SelectValue placeholder="选择提供商" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 基础 URL */}
          <div className="grid gap-2">
            <Label htmlFor="baseUrl">
              基础 URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="baseUrl"
              placeholder="https://api.openai.com/v1"
              value={formData.baseUrl}
              onChange={(e) => handleChange('baseUrl', e.target.value)}
              className={errors.baseUrl ? 'border-red-500' : ''}
            />
            {errors.baseUrl && <span className="text-sm text-red-500">{errors.baseUrl}</span>}
          </div>

          {/* API 密钥 */}
          <div className="grid gap-2">
            <Label htmlFor="apiKey">
              API 密钥 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={formData.apiKey}
              onChange={(e) => handleChange('apiKey', e.target.value)}
              className={errors.apiKey ? 'border-red-500' : ''}
            />
            {errors.apiKey && <span className="text-sm text-red-500">{errors.apiKey}</span>}
          </div>

          {/* 加载模型按钮 */}
          <div className="grid gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={loadAvailableModels}
              disabled={isLoadingModels || !formData.apiKey || !formData.baseUrl}
            >
              {isLoadingModels ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  加载中...
                </>
              ) : (
                '加载可用模型'
              )}
            </Button>
          </div>

          {/* 模型选择 */}
          <div className="grid gap-2">
            <Label htmlFor="model">
              模型 <span className="text-red-500">*</span>
            </Label>
            {availableModels.length > 0 ? (
              <Select
                value={formData.model}
                onValueChange={(value) => handleChange('model', value)}
              >
                <SelectTrigger id="model" className={errors.model ? 'border-red-500' : ''}>
                  <SelectValue placeholder="选择模型" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="model"
                placeholder="或手动输入模型名称"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                className={errors.model ? 'border-red-500' : ''}
              />
            )}
            {errors.model && <span className="text-sm text-red-500">{errors.model}</span>}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            取消
          </Button>
          <Button type="button" onClick={handleSubmit}>
            保存配置
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
