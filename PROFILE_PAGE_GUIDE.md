# 个人信息页面使用指南

## 🎯 功能概述

个人信息页面已完成集成 Supabase，可以显示和修改用户的真实信息。

---

## ✨ 已实现功能

### 1. 用户信息展示

#### 左侧卡片 - 用户概览

- ✅ **头像显示**
  - 如果用户设置了姓名，显示姓名首字母（大写）
  - 如果没有姓名，显示默认用户图标
  - 头像背景是蓝色渐变

- ✅ **用户信息**
  - 显示用户姓名（如果未设置显示"未设置姓名"）
  - 显示用户邮箱（从 Supabase 获取）

- ✅ **账户信息统计**
  - **注册时间**: 显示用户注册的日期
  - **使用天数**: 自动计算从注册到现在的天数
  - **账户状态**: 显示邮箱是否已验证（已验证/未验证）

#### 右侧表单 - 基本信息编辑

- ✅ **可编辑字段**
  - 姓名（name）
  - 电话（phone）
  - 公司/组织（company）
  - 个人简介（bio）

- ✅ **只读字段**
  - 邮箱（不可修改，带有说明文字）

---

### 2. 信息修改功能

#### 修改基本信息流程

```
1. 用户修改表单中的信息
   ↓
2. 点击"保存更改"按钮
   ↓
3. 提交到 Supabase
   ↓
4. 显示成功/失败提示
   ↓
5. 信息更新到界面
```

#### 特点

- ✅ 实时验证
- ✅ 加载状态（按钮显示"保存中..."）
- ✅ 成功提示（绿色背景）
- ✅ 错误提示（红色背景）
- ✅ 取消按钮可恢复原始数据

---

### 3. 密码修改功能

#### 修改密码流程

```
1. 输入新密码（至少6位）
   ↓
2. 再次确认新密码
   ↓
3. 点击"修改密码"按钮
   ↓
4. 验证两次密码是否一致
   ↓
5. 提交到 Supabase
   ↓
6. 显示成功/失败提示
   ↓
7. 成功后清空表单
```

#### 特点

- ✅ **不需要输入当前密码**（Supabase 特性）
- ✅ 前端验证密码一致性
- ✅ 最小长度验证（6位）
- ✅ 加载状态显示
- ✅ 成功后自动清空表单
- ✅ 橙色按钮区分于普通保存按钮

#### 注意事项

⚠️ **修改密码后需要重新登录**

Supabase 的安全机制：修改密码后会话会失效，需要用新密码重新登录。

---

## 💾 数据存储

### Supabase user_metadata

用户的个人信息存储在 Supabase 的 `user_metadata` 中：

```typescript
user.user_metadata = {
  name: string,      // 姓名
  phone: string,     // 电话
  company: string,   // 公司
  bio: string,       // 简介
}
```

### 更新方式

使用 Supabase Auth API：

```typescript
await supabase.auth.updateUser({
  data: {
    name: '新姓名',
    phone: '新电话',
    // ...
  }
});
```

---

## 🎨 UI 设计

### 消息提示

#### 成功提示
- 绿色背景：`#E8F5E9`
- 绿色文字：`#2E7D32`
- 绿色边框：`#4CAF50`
- 带有 CheckCircle 图标

#### 错误提示
- 红色背景：`#FFEBEE`
- 红色文字：`#C62828`
- 红色边框：`#F44336`
- 带有 AlertCircle 图标

### 按钮样式

#### 保存按钮
- 蓝色：`#007AFF`
- Hover: `#0051D5`
- 带有阴影和上浮效果

#### 修改密码按钮
- 橙色：`#FF9500`
- Hover: `#E68600`
- 区分于普通保存按钮

#### 取消/清空按钮
- 浅灰色：`#F5F5F7`
- Hover: `#E8E8ED`

---

## 📝 使用示例

### 修改个人信息

1. 登录后访问 `/profile` 页面
2. 在基本信息表单中修改字段
3. 点击"保存更改"
4. 看到绿色成功提示
5. 信息已更新

### 修改密码

1. 在密码修改表单中输入新密码
2. 再次确认新密码
3. 点击"修改密码"
4. 看到绿色成功提示
5. 使用新密码重新登录

### 取消修改

1. 修改表单中的信息
2. 点击"取消"按钮
3. 表单恢复为原始数据

---

## 🔧 技术实现

### 状态管理

```typescript
// 用户信息状态
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [company, setCompany] = useState('');
const [bio, setBio] = useState('');

// 密码状态
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

// UI 状态
const [isLoading, setIsLoading] = useState(false);
const [message, setMessage] = useState(null);
```

### 数据加载

```typescript
useEffect(() => {
  if (user) {
    setName(user.user_metadata?.name || '');
    setPhone(user.user_metadata?.phone || '');
    setCompany(user.user_metadata?.company || '');
    setBio(user.user_metadata?.bio || '');
  }
}, [user]);
```

### 更新用户信息

```typescript
const handleUpdateProfile = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const { error } = await supabase.auth.updateUser({
    data: { name, phone, company, bio }
  });

  if (error) {
    setMessage({ type: 'error', text: error.message });
  } else {
    setMessage({ type: 'success', text: '更新成功！' });
  }

  setIsLoading(false);
};
```

### 修改密码

```typescript
const handleChangePassword = async (e) => {
  e.preventDefault();

  // 验证
  if (newPassword !== confirmPassword) {
    setPasswordMessage({ type: 'error', text: '密码不一致' });
    return;
  }

  // 更新
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (!error) {
    setPasswordMessage({ type: 'success', text: '修改成功！' });
    // 清空表单
    setNewPassword('');
    setConfirmPassword('');
  }
};
```

---

## 🐛 常见问题

### Q: 修改信息后刷新页面数据丢失？

**A:** 不会！数据已保存到 Supabase，刷新后会从 `user.user_metadata` 重新加载。

### Q: 修改密码后无法登录？

**A:** 确保使用新密码登录。修改密码后旧密码立即失效。

### Q: 邮箱可以修改吗？

**A:** 当前版本不支持修改邮箱。如需修改邮箱功能，需要使用 `supabase.auth.updateUser({ email: newEmail })`，但这需要邮箱验证流程。

### Q: 用户头像怎么不显示？

**A:** 头像上传功能标记为"即将推出"。当前显示姓名首字母或默认图标。如需实现头像上传，需要：
1. 使用 Supabase Storage 存储图片
2. 更新 user_metadata.avatar_url
3. 在头像位置显示图片

---

## 🚀 后续增强建议

### 1. 头像上传

```typescript
// 使用 Supabase Storage
const uploadAvatar = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`${user.id}/${file.name}`, file);

  if (!error) {
    await supabase.auth.updateUser({
      data: { avatar_url: data.path }
    });
  }
};
```

### 2. 邮箱修改

```typescript
const updateEmail = async (newEmail: string) => {
  const { error } = await supabase.auth.updateUser({
    email: newEmail
  });
  // 会发送验证邮件到新邮箱
};
```

### 3. 双因素认证（2FA）

```typescript
const enable2FA = async () => {
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp'
  });
  // 返回二维码供用户扫描
};
```

### 4. 账户删除

```typescript
const deleteAccount = async () => {
  // 需要后端 API 使用 service_role 删除
  await fetch('/api/delete-account', {
    method: 'DELETE'
  });
};
```

---

## 📊 用户体验优化

### 已实现

- ✅ 表单字段自动填充用户数据
- ✅ 加载状态显示
- ✅ 成功/错误提示
- ✅ 禁用状态管理
- ✅ 键盘导航支持
- ✅ 响应式布局

### 可优化

- 🔲 添加保存快捷键（Ctrl+S）
- 🔲 表单数据变化提示（离开页面前确认）
- 🔲 密码强度指示器
- 🔲 字段级别的验证提示
- 🔲 自动保存草稿

---

## 📱 移动端适配

- ✅ 响应式网格布局（lg:grid-cols-3）
- ✅ 移动端单列显示
- ✅ 触摸友好的按钮大小（min-h-[44px]）
- ✅ 合适的字体大小

---

## 🔐 安全性

- ✅ 密码在传输过程中加密
- ✅ 使用 Supabase Auth API 安全更新
- ✅ 不在客户端存储敏感信息
- ✅ 修改密码后会话失效

---

## ✅ 总结

个人信息页面现在是一个功能完整的用户资料管理界面：

✨ **核心功能**
- 显示真实用户信息
- 修改个人资料
- 修改密码
- 账户统计信息

🎨 **用户体验**
- 直观的表单设计
- 实时反馈
- 加载状态
- 错误处理

🔒 **安全可靠**
- Supabase Auth 集成
- 数据持久化
- 密码安全更新

可以开始使用了！🚀
