'use client';

import { useState } from 'react';
import { Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // 登录
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message || '登录失败，请检查您的邮箱和密码');
        } else {
          router.push('/');
        }
      } else {
        // 注册
        if (password !== confirmPassword) {
          setError('两次输入的密码不一致');
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, name);
        if (error) {
          setError(error.message || '注册失败，请稍后重试');
        } else {
          setError('注册成功！请检查您的邮箱以验证账户');
          // 清空表单
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setName('');
          // 切换到登录模式
          setTimeout(() => {
            setIsLogin(true);
            setError(null);
          }, 3000);
        }
      }
    } catch (err) {
      setError('发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F5F7]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.06)] shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-[34px] font-bold leading-[1.2] text-[#1D1D1F] mb-2">Excalidraw AI</h1>
            <p className="text-[15px] text-[rgba(0,0,0,0.5)]">
              {isLogin ? '欢迎回来！请登录您的账户' : '创建您的账户'}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex bg-[#F5F5F7] rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-[15px] font-semibold transition-all duration-150 ${
                  isLogin
                    ? 'bg-white text-[#007AFF] shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
                    : 'text-[rgba(0,0,0,0.5)] hover:text-[#1D1D1F]'
                }`}
              >
                登录
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-[15px] font-semibold transition-all duration-150 ${
                  !isLogin
                    ? 'bg-white text-[#007AFF] shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
                    : 'text-[rgba(0,0,0,0.5)] hover:text-[#1D1D1F]'
                }`}
              >
                注册
              </button>
            </div>
          </div>

          {error && (
            <div className={`mb-4 p-3 rounded-lg text-[15px] ${
              error.includes('成功')
                ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#4CAF50]'
                : 'bg-[#FFEBEE] text-[#C62828] border border-[#F44336]'
            }`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">姓名</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(0,0,0,0.35)]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="输入您的姓名"
                    className="w-full h-11 pl-10 pr-4 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(0,0,0,0.35)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入您的邮箱"
                  className="w-full h-11 pl-10 pr-4 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(0,0,0,0.35)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入您的密码"
                  className="w-full h-11 pl-10 pr-4 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[15px] text-[#1D1D1F] font-medium mb-2">确认密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(0,0,0,0.35)]" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="再次输入密码"
                    className="w-full h-11 pl-10 pr-4 border border-[rgba(0,0,0,0.1)] rounded-lg text-[15px] text-[#1D1D1F] bg-[#FAFAFA] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#007AFF] focus:ring-3 focus:ring-[rgba(0,122,255,0.15)] transition-all duration-150"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[rgba(0,0,0,0.6)]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[rgba(0,0,0,0.2)] accent-[#007AFF]"
                  />
                  <span className="text-[13px]">记住我</span>
                </label>
                <button
                  type="button"
                  className="text-[13px] text-[#007AFF] hover:text-[#0051D5] transition-colors"
                >
                  忘记密码？
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[44px] bg-[#007AFF] text-white font-semibold text-[17px] rounded-lg hover:bg-[#0051D5] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-[0_2px_8px_rgba(0,122,255,0.3)]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {isLogin ? '登录中...' : '注册中...'}
                </span>
              ) : (
                <span>{isLogin ? '登录' : '注册'}</span>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-[rgba(0,0,0,0.5)]">
            {isLogin ? '还没有账户？' : '已有账户？'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-[#007AFF] hover:text-[#0051D5] transition-colors font-medium"
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
