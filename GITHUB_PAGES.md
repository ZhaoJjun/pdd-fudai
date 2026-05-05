# GitHub Pages 部署指南

## 📋 部署前准备

### 1. 拥有 GitHub 账号
如果没有，访问 https://github.com 注册

### 2. 配置 Git（首次使用需要）

```bash
# 配置用户名和邮箱
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"

# 查看配置
git config --list
```

---

## 🚀 快速部署（推荐）

### 方法一：使用部署脚本（最简单）

```bash
# 进入网站目录
cd /home/admin/openclaw/workspace/pdd-fudai

# 赋予脚本执行权限
chmod +x deploy-github.sh

# 运行脚本
bash deploy-github.sh
```

按提示输入你的 GitHub 用户名即可！

---

### 方法二：手动部署

#### 步骤 1：在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 仓库名：`pdd-fudai`
3. 公开（Public）
4. **不要** 勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

#### 步骤 2：本地推送代码

```bash
cd /home/admin/openclaw/workspace/pdd-fudai

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - PDD 福袋互助网站"

# 重命名分支
git branch -M main

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/pdd-fudai.git

# 推送
git push -u origin main
```

#### 步骤 3：启用 GitHub Pages

1. 进入仓库页面：https://github.com/YOUR_USERNAME/pdd-fudai
2. 点击 **Settings**（设置）
3. 左侧菜单点击 **Pages**
4. 在 "Build and deployment" 下：
   - Source: 选择 **Deploy from a branch**
   - Branch: 选择 **main**，文件夹选择 **/(root)**
5. 点击 **Save**

#### 步骤 4：等待部署

GitHub 会自动构建，通常 1-2 分钟完成。

访问地址：
```
https://YOUR_USERNAME.github.io/pdd-fudai/
```

---

## 🔧 自定义域名（可选）

### 1. 购买域名
在阿里云、腾讯云、Namecheap 等平台购买域名

### 2. 配置 CNAME

在网站目录创建 `CNAME` 文件：

```bash
echo "your-domain.com" > CNAME
```

提交并推送：
```bash
git add CNAME
git commit -m "Add custom domain"
git push
```

### 3. 配置 DNS

在域名服务商添加 CNAME 记录：

```
类型：CNAME
主机记录：www
记录值：YOUR_USERNAME.github.io
TTL：600
```

如果使用根域名（your-domain.com），添加 A 记录：

```
类型：A
主机记录：@
记录值：185.199.108.153
记录值：185.199.109.153
记录值：185.199.110.153
记录值：185.199.111.153
TTL：600
```

### 4. 启用 HTTPS

在 GitHub Pages 设置中勾选 "Enforce HTTPS"

---

## 📊 查看部署状态

### GitHub Actions 日志

1. 进入仓库
2. 点击 **Actions** 标签
3. 查看 "Pages build and deployment" 运行状态

### 访问状态

```bash
# 检查网站是否可访问
curl -I https://YOUR_USERNAME.github.io/pdd-fudai/
```

---

## 🔄 更新网站

每次修改后，推送即可自动更新：

```bash
git add .
git commit -m "更新说明"
git push
```

GitHub Pages 会自动重新部署，约 1-2 分钟生效。

---

## ⚠️ 常见问题

### 1. 404 错误

**原因：** Pages 未启用或部署未完成

**解决：**
- 检查 Settings > Pages 是否正确配置
- 等待 2-5 分钟
- 清除浏览器缓存

### 2. 样式/JS 不加载

**原因：** 路径问题

**解决：** 确保 HTML 中使用相对路径：
```html
<link rel="stylesheet" href="css/style.css">
<script src="js/app.js"></script>
```

### 3. 推送失败 - 认证错误

**解决：** 使用 Personal Access Token

1. GitHub > Settings > Developer settings > Personal access tokens
2. 生成新 token（勾选 repo 权限）
3. 推送时使用：
```bash
git remote set-url origin https://YOUR_USERNAME:TOKEN@github.com/YOUR_USERNAME/pdd-fudai.git
git push
```

### 4. 仓库已存在

**解决：** 删除远程仓库重新添加，或换个仓库名

---

## 📱 访问地址格式

| 类型 | 地址 |
|------|------|
| 默认 | `https://用户名.github.io/pdd-fudai/` |
| 自定义域名 | `https://你的域名.com/` |

---

## ✅ 部署检查清单

- [ ] GitHub 账号已注册
- [ ] Git 已安装并配置
- [ ] 仓库已创建（公开）
- [ ] 代码已推送
- [ ] Pages 已启用（main 分支）
- [ ] 等待 1-2 分钟部署完成
- [ ] 访问地址测试正常
- [ ] 移动端显示正常

---

## 🎉 完成！

部署成功后，你可以：

1. 分享网站链接给朋友
2. 在手机/电脑上访问
3. 随时更新代码自动同步
4. 配置自定义域名

---

_有问题随时问！🏹_
