'use client';

import { useState, useEffect } from 'react';
import { User, Camera, TrendingUp, Calendar, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

export default function Profile() {
  const { user } = useAuth();
  const supabase = createClient();

  // 用户信息状态
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');

  // 密码修改状态
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI 状态
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // 加载用户信息
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setName(user.user_metadata?.name || '');
      setPhone(user.user_metadata?.phone || '');
      setCompany(user.user_metadata?.company || '');
      setBio(user.user_metadata?.bio || '');
    }
  }, [user]);

  // 更新用户信息
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name,
          phone,
          company,
          bio,
        },
      });

      if (error) {
        setMessage({ type: 'error', text: error.message || '更新失败，请稍后重试' });
      } else {
        setMessage({ type: 'success', text: '个人信息更新成功！' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '发生错误，请稍后重试' });
    } finally {
      setIsLoading(false);
    }
  };

  // 修改密码
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordLoading(true);
    setPasswordMessage(null);

    // 验证新密码
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: '两次输入的新密码不一致' });
      setIsPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: '新密码长度至少为6位' });
      setIsPasswordLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setPasswordMessage({ type: 'error', text: error.message || '密码修改失败' });
      } else {
        setPasswordMessage({ type: 'success', text: '密码修改成功！' });
        // 清空密码字段
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setPasswordMessage({ type: 'error', text: '发生错误，请稍后重试' });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // 取消修改
  const handleCancel = () => {
    if (user) {
      setName(user.user_metadata?.name || '');
      setPhone(user.user_metadata?.phone || '');
      setCompany(user.user_metadata?.company || '');
      setBio(user.user_metadata?.bio || '');
    }
    setMessage(null);
  };

  // 计算使用天数
  const getDaysUsed = () => {
    if (!user?.created_at) return 0;
    const createdDate = new Date(user.created_at);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[17px] text-[rgba(0,0,0,0.5)]">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="workspace bg-[#F9FAFB] p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-[34px] font-bold leading-[1.2] text-[#1D1D1F] m-0 mb-2">
                个人信息
              </h1>
              <p className="text-[15px] text-[rgba(0,0,0,0.5)] m-0">管理您的个人资料和账户设置</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] flex items-center justify-center shadow-[0_4px_12px_rgba(0,122,255,0.2)]">
                      {name ? (
                        <span className="text-5xl font-bold text-white">
                          {name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <User className="w-16 h-16 text-white" />
                      )}
                    </div>
                    <h2 className="text-[22px] font-semibold leading-[1.3] text-[#1D1D1F] mb-1">
                      {name || '未设置姓名'}
                    </h2>
                    <p className="text-[15px] text-[rgba(0,0,0,0.5)] mb-4">{user.email}</p>
                    <button
                      className="inline-flex items-center justify-center gap-2 w-full min-h-[40px] px-4 py-2 bg-[#F5F5F7] text-[#1D1D1F] text-[15px] font-medium rounded-lg hover:bg-[#E8E8ED] transition-all duration-150"
                      disabled
                    >
                      <Camera className="w-4 h-4" />
                      更换头像（即将推出）
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.06)]">
                    <h3 className="text-[17px] font-semibold text-[#1D1D1F] mb-3">账户信息</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[rgba(0,0,0,0.5)]" />
                          <span className="text-[15px] text-[rgba(0,0,0,0.6)]">注册时间</span>
                        </div>
                        <span className="text-[15px] font-semibold text-[#1D1D1F]">
                          {new Date(user.created_at).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[rgba(0,0,0,0.5)]" />
                          <span className="text-[15px] text-[rgba(0,0,0,0.6)]">使用天数</span>
                        </div>
                        <span className="text-[17px] font-semibold text-[#1D1D1F]">
                          {getDaysUsed()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[rgba(0,0,0,0.5)]" />
                          <span className="text-[15px] text-[rgba(0,0,0,0.6)]">账户状态</span>
                        </div>
                        <span className="text-[15px] font-semibold text-[#34C759]">
                          {user.email_confirmed_at ? '已验证' : '未验证'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                {message && (
                  <div
                    className={`p-4 rounded-lg text-[15px] flex items-start gap-3 ${
                      message.type === 'success'
                        ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#4CAF50]'
                        : 'bg-[#FFEBEE] text-[#C62828] border border-[#F44336]'
                    }`}
                  >
                    {message.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{message.text}</span>
                  </div>
                )}

                <form onSubmit={handleUpdateProfile}>
                  <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <h2 className="text-[22px] font-normal leading-[1.3] text-[#1D1D1F] mb-4">
                      基本信息
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">
                          姓名
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="输入您的姓名"
                          className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                        />
                      </div>
                      <div>
                        <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">
                          邮箱
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#F5F5F7] cursor-not-allowed opacity-60"
                        />
                        <p className="mt-1 text-[13px] text-[rgba(0,0,0,0.5)]">邮箱地址不可修改</p>
                      </div>
                      <div>
                        <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">
                          电话
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="输入电话号码"
                          className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                        />
                      </div>
                      <div>
                        <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">
                          公司/组织
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="输入公司或组织名称"
                          className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                        />
                      </div>
                      <div>
                        <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">
                          个人简介
                        </label>
                        <textarea
                          rows={4}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="简单介绍一下自己..."
                          className="w-full px-3 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 min-h-[44px] bg-[#007AFF] text-white font-semibold text-[17px] rounded-lg hover:bg-[#0051D5] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150 shadow-[0_2px_8px_rgba(0,122,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? '保存中...' : '保存更改'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex-1 min-h-[44px] bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-[17px] rounded-lg hover:bg-[#E8E8ED] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </form>

                {passwordMessage && (
                  <div
                    className={`p-4 rounded-lg text-[15px] flex items-start gap-3 ${
                      passwordMessage.type === 'success'
                        ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#4CAF50]'
                        : 'bg-[#FFEBEE] text-[#C62828] border border-[#F44336]'
                    }`}
                  >
                    {passwordMessage.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <span>{passwordMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword}>
                  <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <h2 className="text-[22px] font-normal leading-[1.3] text-[#1D1D1F] mb-4">
                      修改密码
                    </h2>
                    <p className="text-[13px] text-[rgba(0,0,0,0.5)] mb-4">
                      注意：Supabase 不需要当前密码即可修改密码。修改后需要重新登录。
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">
                          新密码
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="输入新密码（至少6位）"
                          className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">
                          确认新密码
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="再次输入新密码"
                          className="w-full h-11 px-3 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        type="submit"
                        disabled={isPasswordLoading}
                        className="flex-1 min-h-[44px] bg-[#FF9500] text-white font-semibold text-[17px] rounded-lg hover:bg-[#E68600] hover:-translate-y-px active:translate-y-0 transition-all duration-150 shadow-[0_2px_8px_rgba(255,149,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPasswordLoading ? '修改中...' : '修改密码'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewPassword('');
                          setConfirmPassword('');
                          setPasswordMessage(null);
                        }}
                        disabled={isPasswordLoading}
                        className="flex-1 min-h-[44px] bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-[17px] rounded-lg hover:bg-[#E8E8ED] hover:-translate-y-px active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        清空
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
