#!/bin/bash

# GitHub Pages 部署脚本
# 使用方法：bash deploy-github.sh

set -e

echo "🚀 开始部署到 GitHub Pages..."

# 配置变量
REPO_NAME="pdd-fudai"
GITHUB_USERNAME=""  # 留空则自动获取

# 检查 Git 是否安装
if ! command -v git &> /dev/null; then
    echo "❌ Git 未安装，请先安装 Git"
    exit 1
fi

# 获取 GitHub 用户名
if [ -z "$GITHUB_USERNAME" ]; then
    echo "📝 请输入你的 GitHub 用户名："
    read GITHUB_USERNAME
fi

echo "👤 使用 GitHub 用户名：$GITHUB_USERNAME"

# 初始化 Git 仓库（如果还没有）
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
fi

# 添加所有文件
echo "📄 添加文件..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')" || echo "✅ 没有需要提交的更改"

# 重命名分支为 main
git branch -M main

# 添加远程仓库（如果还没有）
if ! git remote | grep -q origin; then
    echo "🔗 添加远程仓库..."
    git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git
fi

# 推送到 GitHub
echo "⬆️ 推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 部署完成！"
echo ""
echo "📱 访问地址："
echo "   https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
echo ""
echo "⚙️  接下来需要在 GitHub 上启用 Pages："
echo "   1. 访问 https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
echo "   2. Source 选择 'Deploy from a branch'"
echo "   3. Branch 选择 'main'，文件夹选择 '/ (root)'"
echo "   4. 点击 Save"
echo ""
echo "🌐 网站将在 1-2 分钟后上线！"
