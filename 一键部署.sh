#!/bin/bash

# PDD 福袋互助网站 - 一键部署到 GitHub Pages
# 作者：ZhaoJjun
# 使用方法：bash 一键部署.sh

echo "=========================================="
echo "🚀 PDD 福袋互助网站 - 一键部署到 GitHub"
echo "=========================================="
echo ""

# 配置
GITHUB_USER="ZhaoJjun"
REPO_NAME="pdd-fudai"
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "👤 GitHub 用户名：${GITHUB_USER}"
echo "📦 仓库名：${REPO_NAME}"
echo ""

# 检查 Git 是否已配置
if ! git config user.name > /dev/null 2>&1; then
    echo "⚠️  Git 未配置，正在配置..."
    git config --global user.name "ZhaoJjun"
    git config --global user.email "2218864233@qq.com"
    echo "✅ Git 配置完成"
    echo ""
fi

# 检查是否已初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit - PDD 福袋互助网站"
    git branch -M main
    echo "✅ Git 仓库初始化完成"
    echo ""
else
    echo "✅ Git 仓库已存在"
    echo ""
fi

echo "=========================================="
echo "📝 请按以下步骤操作："
echo "=========================================="
echo ""
echo "【第 1 步】在 GitHub 创建仓库"
echo "1. 访问：https://github.com/new"
echo "2. 仓库名输入：pdd-fudai"
echo "3. 选择：Public（公开）"
echo "4. ❌ 不要勾选 'Initialize this repository with a README'"
echo "5. 点击 'Create repository'"
echo ""
read -p "✅ 创建完成后按回车继续..."
echo ""

echo "【第 2 步】获取 GitHub Token"
echo "1. 访问：https://github.com/settings/tokens"
echo "2. 点击 'Generate new token' → 'Generate new token (classic)'"
echo "3. Note 填写：PDD 网站部署"
echo "4. 勾选权限：✅ repo（全选）"
echo "5. 点击 'Generate token'"
echo "6. 🔑 复制生成的 Token（只显示一次，请保存好！）"
echo ""
read -p "✅ 获取 Token 后按回车继续..."
echo ""

echo "【第 3 步】输入 Token"
read -sp "🔑 请输入 GitHub Token: " GITHUB_TOKEN
echo ""
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Token 不能为空！"
    exit 1
fi

echo "=========================================="
echo "🚀 开始推送代码..."
echo "=========================================="
echo ""

# 设置远程仓库（带 Token）
TEMP_REPO_URL="https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"

# 检查是否已有 origin
if git remote | grep -q origin; then
    echo "📡 更新远程仓库地址..."
    git remote set-url origin "$TEMP_REPO_URL"
else
    echo "📡 添加远程仓库..."
    git remote add origin "$TEMP_REPO_URL"
fi

# 推送代码
echo "⬆️ 推送代码到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✅ 部署成功！"
    echo "=========================================="
    echo ""
    echo "📱 接下来启用 GitHub Pages："
    echo "1. 访问：https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
    echo "2. Build and deployment → Source: Deploy from a branch"
    echo "3. Branch: main → folder: /(root)"
    echo "4. 点击 Save"
    echo ""
    echo "🌐 你的网站地址（部署完成后）："
    echo "   https://${GITHUB_USER}.github.io/${REPO_NAME}/"
    echo ""
    echo "⏳ 等待 1-2 分钟即可访问！"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "1. Token 是否正确"
    echo "2. 仓库是否已创建"
    echo "3. Token 是否有 repo 权限"
    echo ""
    exit 1
fi
