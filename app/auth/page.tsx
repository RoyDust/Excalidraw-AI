'use client';

import { useState } from 'react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 模拟登录/注册API调用
    setTimeout(() => {
      setIsLoading(false);
      // 设置登录状态到 localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // 成功后跳转到主页
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">✨</div>
            <h1 className="text-white text-display-1 mb-2">Excalidraw AI</h1>
            <p className="text-white/80">
              {isLogin ? '欢迎回来！请登录您的账户' : '创建您的账户'}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                  isLogin
                    ? 'bg-white text-purple-600 font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                登录
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                  !isLogin
                    ? 'bg-white text-purple-600 font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                注册
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-white/90 text-subhead mb-2">姓名</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="输入您的姓名"
                  className="w-full h-11 px-4 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md placeholder:text-white/50 focus:outline-none focus:border-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-white/90 text-subhead mb-2">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入您的邮箱"
                className="w-full h-11 px-4 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md placeholder:text-white/50 focus:outline-none focus:border-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                required
              />
            </div>

            <div>
              <label className="block text-white/90 text-subhead mb-2">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入您的密码"
                className="w-full h-11 px-4 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md placeholder:text-white/50 focus:outline-none focus:border-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-white/90 text-subhead mb-2">确认密码</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入密码"
                  className="w-full h-11 px-4 border border-white/30 rounded-xl font-body text-white bg-white/10 backdrop-blur-md placeholder:text-white/50 focus:outline-none focus:border-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-white/80">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/30 bg-white/10"
                  />
                  <span className="text-sm">记住我</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  忘记密码？
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-white text-purple-600 font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
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

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/60">或使用第三方登录</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-11 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200">
                <span className="text-lg">🔵</span>
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 h-11 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200">
                <span className="text-lg">⚫</span>
                <span className="text-sm">GitHub</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-white/60">
            {isLogin ? '还没有账户？' : '已有账户？'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-white hover:text-white/80 transition-colors font-medium"
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
