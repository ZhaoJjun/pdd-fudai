# PDD 福袋互助网站 - 部署指南

## 📋 目录结构

```
pdd-fudai/
├── index.html      # 主页面
├── css/
│   └── style.css   # 样式文件
├── js/
│   └── app.js      # 交互逻辑
├── DEPLOY.md       # 部署文档
└── pdd-fudai-website.zip  # 打包文件
```

---

## 🚀 部署方案

### 方案一：Nginx 部署（推荐）

#### 1. 安装 Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y
```

#### 2. 上传文件
```bash
# 创建网站目录
sudo mkdir -p /var/www/pdd-fudai

# 复制文件（或使用 scp 上传）
sudo cp -r * /var/www/pdd-fudai/
```

#### 3. 配置 Nginx
```bash
sudo nano /etc/nginx/sites-available/pdd-fudai
```

添加以下配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或服务器 IP
    
    root /var/www/pdd-fudai;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 启用 Gzip 压缩
    gzip on;
    gzip_types text/css application/javascript;
    
    # 缓存静态资源
    location ~* \.(css|js|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 4. 启用配置
```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/pdd-fudai /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

#### 5. 开放防火墙
```bash
sudo ufw allow 'Nginx HTTP'
# 或
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
```

---

### 方案二：Docker 部署（最方便）

#### 1. 创建 Dockerfile
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html/
EXPOSE 80
```

#### 2. 构建并运行
```bash
cd /home/admin/openclaw/workspace/pdd-fudai

# 构建镜像
docker build -t pdd-fudai .

# 运行容器
docker run -d -p 80:80 --name pdd-fudai-site pdd-fudai
```

#### 3. 使用 Docker Compose（可选）
创建 `docker-compose.yml`：
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: always
```

运行：
```bash
docker-compose up -d
```

---

### 方案三：Node.js 部署

#### 1. 使用 http-server
```bash
# 安装 http-server
npm install -g http-server

# 启动服务
cd /home/admin/openclaw/workspace/pdd-fudai
http-server -p 8080
```

#### 2. 后台运行
```bash
# 使用 nohup
nohup http-server -p 8080 > output.log 2>&1 &

# 或使用 pm2
npm install -g pm2
pm2 start $(which http-server) -- -p 8080
pm2 save
pm2 startup
```

---

### 方案四：免费静态托管

#### GitHub Pages
```bash
# 1. 创建 GitHub 仓库
# 2. 推送文件
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/pdd-fudai.git
git push -u origin main

# 3. 在 GitHub 仓库设置中启用 GitHub Pages
# Settings -> Pages -> Source: main branch -> Save
```

访问地址：`https://your-username.github.io/pdd-fudai/`

#### Vercel / Netlify
1. 访问 https://vercel.com 或 https://netlify.com
2. 连接 GitHub 仓库或直接拖拽上传
3. 自动部署完成

---

## 🔒 HTTPS 配置（推荐）

### 使用 Let's Encrypt 免费证书

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期（已自动配置）
sudo certbot renew --dry-run
```

---

## 📊 后端 API 开发建议

当前网站使用模拟数据，如需完整功能需要开发后端：

### 技术栈推荐
- **Node.js + Express** - 轻量快速
- **Python + Flask/FastAPI** - 开发效率高
- **Go + Gin** - 性能优秀

### 核心 API 设计

```
GET  /api/codes/available     # 获取可用邀请码列表
POST /api/codes/publish      # 发布新邀请码
POST /api/codes/use/:code    # 使用邀请码
POST /api/codes/report       # 举报邀请码
GET  /api/stats              # 获取统计数据
```

### 数据库设计（SQLite/MySQL）

```sql
-- 邀请码表
CREATE TABLE codes (
    id INTEGER PRIMARY KEY,
    code VARCHAR(9) NOT NULL,
    ip_address VARCHAR(45),
    status ENUM('available', 'used', 'banned') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP
);

-- 统计表
CREATE TABLE stats (
    id INTEGER PRIMARY KEY,
    date DATE,
    help_count INTEGER DEFAULT 0,
    publish_count INTEGER DEFAULT 0
);
```

---

## 🔧 常见问题

### 1. 端口被占用
```bash
# 查看占用端口的进程
sudo lsof -i :80

# 杀死进程
sudo kill -9 <PID>
```

### 2. 权限问题
```bash
sudo chown -R www-data:www-data /var/www/pdd-fudai
sudo chmod -R 755 /var/www/pdd-fudai
```

### 3. 查看日志
```bash
# Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Docker 日志
docker logs -f pdd-fudai-site
```

---

## 📱 域名配置

1. 购买域名（阿里云、腾讯云、Namecheap 等）
2. 添加 A 记录指向服务器 IP
3. 等待 DNS 生效（通常 5-10 分钟）

```
类型：A
主机记录：@ 或 www
记录值：你的服务器 IP
TTL：600
```

---

## ✅ 部署检查清单

- [ ] 文件已上传到服务器
- [ ] Web 服务器已安装并配置
- [ ] 防火墙已开放 80/443 端口
- [ ] 域名已解析（如使用域名）
- [ ] HTTPS 证书已配置（推荐）
- [ ] 网站可正常访问
- [ ] 移动端显示正常
- [ ] 所有功能测试通过

---

## 📞 技术支持

遇到问题可检查：
1. Nginx/Apache 状态：`sudo systemctl status nginx`
2. 端口监听：`sudo netstat -tlnp | grep :80`
3. 文件权限：`ls -la /var/www/pdd-fudai/`

---

_祝部署顺利！🏹_
