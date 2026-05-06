# 🚀 PDD 福袋互助网站 - 超简单部署说明

## 📋 部署前准备

**只需 3 件事：**
1. ✅ 有一个 GitHub 账号（已有）
2. ✅ 复制粘贴命令执行（5 分钟）
3. ✅ 等待部署完成（1-2 分钟）

---

## 🎯 一键部署步骤

### 第 1 步：在 GitHub 创建仓库

1. 访问：**https://github.com/new**
2. 仓库名输入：`pdd-fudai`
3. 选择：**Public**（公开）
4. ❌ **不要勾选** "Initialize this repository with a README"
5. 点击：**Create repository**

✅ 完成后继续下一步

---

### 第 2 步：获取 GitHub Token（一次性密码）

> ⚠️ Token 不是你的账号密码，是一次性令牌，只给特定权限，随时可撤销！

1. 访问：**https://github.com/settings/tokens**
2. 点击：**Generate new token** → **Generate new token (classic)**
3. **Note** 填写：`PDD 网站部署`
4. **勾选权限**：✅ **repo**（全选，会自动勾选下面的子项）
5. 滚动到页面底部，点击：**Generate token**
6. 🔑 **复制生成的 Token**（以 `ghp_` 开头，只显示一次！）

⚠️ **重要：** 复制保存好这个 Token，后面要用！

✅ 完成后继续下一步

---

### 第 3 步：执行一键部署脚本

在服务器终端执行以下命令：

```bash
# 进入网站目录
cd /home/admin/openclaw/workspace/pdd-fudai

# 运行一键部署脚本
bash 一键部署.sh
```

**脚本会提示你：**

1. 按回车确认已创建仓库
2. 按回车确认已获取 Token
3. **粘贴 Token**（粘贴时不会显示，正常现象）
4. 按回车开始推送

---

### 第 4 步：启用 GitHub Pages

推送成功后，脚本会提示你：

1. 访问：https://github.com/ZhaoJjun/pdd-fudai/settings/pages
2. **Build and deployment** 下：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `main`，文件夹选择 `/(root)`
3. 点击：**Save**

---

### 第 5 步：等待部署完成 ⏳

GitHub 会自动构建，通常 **1-2 分钟** 完成。

你可以：
- 在仓库页面点击 **Actions** 查看部署进度
- 看到绿色 ✅ 表示部署成功

---

## 🎉 完成！访问你的网站

部署成功后，访问：

```
https://ZhaoJjun.github.io/pdd-fudai/
```

用手机或电脑浏览器打开即可！

---

## 🔄 以后如何更新网站？

修改网站内容后，执行：

```bash
cd /home/admin/openclaw/workspace/pdd-fudai
git add .
git commit -m "更新说明"
git push
```

GitHub Pages 会自动重新部署，约 1 分钟生效！

---

## ❓ 常见问题

### 1. Token 无效/过期

**解决：** 重新生成一个 Token
- 访问：https://github.com/settings/tokens
- 删除旧的，生成新的
- 确保勾选了 `repo` 权限

### 2. 推送失败 - 403 错误

**原因：** 仓库不存在或权限不足

**解决：**
- 确认已在 GitHub 创建仓库
- 确认仓库名是 `pdd-fudai`
- 确认 Token 有 `repo` 权限

### 3. 404 错误 - 页面找不到

**原因：** Pages 未启用或部署未完成

**解决：**
- 检查 Settings > Pages 是否正确配置
- 等待 2-5 分钟
- 清除浏览器缓存刷新

### 4. 样式/图片不显示

**原因：** 路径问题

**解决：** 确保使用相对路径（当前代码已配置好）

---

## 📞 需要帮助？

遇到问题可以：
1. 查看 GitHub Actions 日志：https://github.com/ZhaoJjun/pdd-fudai/actions
2. 检查 Pages 部署状态：https://github.com/ZhaoJjun/pdd-fudai/settings/pages
3. 随时问我！

---

## ✅ 部署检查清单

- [ ] GitHub 账号已登录
- [ ] 仓库已创建（名称：pdd-fudai）
- [ ] Token 已生成（勾选 repo 权限）
- [ ] 一键部署脚本已执行
- [ ] 代码已推送成功
- [ ] GitHub Pages 已启用
- [ ] 等待 1-2 分钟部署完成
- [ ] 网站可正常访问

---

_祝你部署顺利！🏹_

**网站地址：** https://ZhaoJjun.github.io/pdd-fudai/
