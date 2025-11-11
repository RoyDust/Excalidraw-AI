# Supabase 配置指南

本项目使用 Supabase 进行用户认证和数据存储。请按照以下步骤配置 Supabase：

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/) 并注册/登录
2. 点击 "New Project" 创建新项目
3. 填写项目名称、数据库密码等信息
4. 等待项目创建完成（约2分钟）

## 2. 获取项目凭证

在项目设置中找到以下信息：

1. 进入项目的 **Settings** → **API**
2. 找到以下两个关键信息：
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon/public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 3. 配置环境变量

1. 复制 `.env.example` 文件为 `.env`：
   ```bash
   cp .env.example .env
   ```

2. 在 `.env` 文件中填入你的 Supabase 凭证：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 4. 配置 Supabase 认证

### 4.1 启用邮箱认证

1. 进入 **Authentication** → **Providers**
2. 确保 **Email** 提供商已启用
3. 配置邮件模板（可选）：
   - 进入 **Authentication** → **Email Templates**
   - 自定义确认邮件、重置密码邮件等模板

### 4.2 配置重定向 URL

1. 进入 **Authentication** → **URL Configuration**
2. 添加以下 URL 到 **Redirect URLs**：
   ```
   http://localhost:3000
   http://localhost:3000/auth/callback
   ```
3. 生产环境部署后，添加你的生产域名

### 4.3 关闭邮箱验证（开发环境可选）

如果在开发环境中不想验证邮箱：

1. 进入 **Authentication** → **Providers** → **Email**
2. 关闭 **Confirm email** 选项

**注意：生产环境建议开启邮箱验证！**

## 5. 创建数据表（可选）

如果需要存储用户图表数据，执行以下 SQL：

```sql
-- 创建 diagrams 表
CREATE TABLE diagrams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX diagrams_user_id_idx ON diagrams(user_id);
CREATE INDEX diagrams_created_at_idx ON diagrams(created_at DESC);

-- 启用 RLS (Row Level Security)
ALTER TABLE diagrams ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看自己的图表
CREATE POLICY "Users can view their own diagrams"
  ON diagrams FOR SELECT
  USING (auth.uid() = user_id);

-- 创建策略：用户只能插入自己的图表
CREATE POLICY "Users can insert their own diagrams"
  ON diagrams FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 创建策略：用户只能更新自己的图表
CREATE POLICY "Users can update their own diagrams"
  ON diagrams FOR UPDATE
  USING (auth.uid() = user_id);

-- 创建策略：用户只能删除自己的图表
CREATE POLICY "Users can delete their own diagrams"
  ON diagrams FOR DELETE
  USING (auth.uid() = user_id);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_diagrams_updated_at BEFORE UPDATE ON diagrams
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 6. 测试认证功能

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问 `http://localhost:3000/auth`

3. 测试注册功能：
   - 输入邮箱和密码
   - 点击注册
   - 检查邮箱验证邮件（如果启用了邮箱验证）

4. 测试登录功能：
   - 使用注册的邮箱和密码登录
   - 登录成功后应该跳转到首页

## 7. 常见问题

### Q: 收不到验证邮件？

**A:**
- 检查是否开启了邮箱验证功能
- 查看 Supabase 后台的 **Authentication** → **Users** 确认用户是否创建成功
- 开发环境可以临时关闭邮箱验证

### Q: 登录后立即退出？

**A:**
- 检查环境变量是否正确配置
- 确认 `.env` 文件中的 URL 和 Key 是否正确
- 重启开发服务器

### Q: 提示 "Invalid API key"？

**A:**
- 确认使用的是 `anon/public` key，而不是 `service_role` key
- 检查 `.env` 文件格式是否正确
- 确保没有多余的空格或引号

## 8. 生产环境配置

部署到生产环境时：

1. 在 Vercel/Netlify 等平台的环境变量中配置：
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_production_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
   ```

2. 在 Supabase 中添加生产域名到重定向 URL

3. **务必启用邮箱验证**

4. 配置自定义 SMTP（可选，提高邮件送达率）

## 9. 安全建议

✅ **推荐做法：**
- 始终使用 `anon` key，不要将 `service_role` key 暴露到前端
- 在生产环境启用邮箱验证
- 使用 Row Level Security (RLS) 保护数据
- 定期更新 Supabase 客户端库

❌ **避免做法：**
- 不要在代码中硬编码凭证
- 不要将 `.env` 文件提交到 Git
- 不要在生产环境关闭邮箱验证

## 10. 相关资源

- [Supabase 官方文档](https://supabase.com/docs)
- [Supabase Auth 指南](https://supabase.com/docs/guides/auth)
- [Next.js SSR 集成](https://supabase.com/docs/guides/auth/server-side/nextjs)
