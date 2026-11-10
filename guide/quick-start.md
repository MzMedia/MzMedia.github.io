# 🚀 10分钟快速起步

MzMedia 支持两种启动模式：
- **模式一：Docker Compose 一键快速体验（推荐）**：适合快速体验平台特性、调试中间件依赖；
- **模式二：本地开发环境源码启动**：适合开发者二次开发、源码调试与模块定制。

---

## 模式一：Docker Compose 一键快速体验

平台在 `script/docker-compose` 目录下提供了完整的容器编排文件，一键拉起包括 MySQL、Redis、后端、前端 Nginx 以及相关流媒体服务。

```bash
# 1. 克隆主工程代码
git clone https://gitee.com/mzmedia/mz-media.git
cd mz-media

# 2. 进入 docker-compose 目录
cd script/docker-compose

# 3. 复制环境变量模板
cp .env.example .env

# 4. 一键拉起核心依赖容器
docker compose up -d

# 5. 检查容器运行状态
docker compose ps
```

启动完成后，打开浏览器访问：`http://localhost:8080`（默认管理员账号：`admin`，密码：`admin123`）。

---

## 模式二：本地源码开发启动

### 1. 基础环境准备
- **JDK**：`21` 或以上版本（推荐 Eclipse Temurin 或 Oracle JDK 21+）；
- **Maven**：`3.8.x` 或以上；
- **Node.js**：`18.18+`（推荐 Node 20+ / Node 22+）；
- **pnpm**：`8.0+`；
- **基础中间件**：MySQL 8.0+、Redis 6.0+、TDengine 3.0+（可选）、EMQX 5.0+（可选）、ZLMediaKit（可选）。

### 2. 初始化数据库
1. 在本地 MySQL 中创建名为 `ruoyi-vue-pro` 的数据库（推荐字符集 `utf8mb4`，排序规则 `utf8mb4_unicode_ci`）：
   ```sql
   CREATE DATABASE `ruoyi-vue-pro` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. 依次执行以下数据库脚本（位于 `sql/` 目录下）：
   - `sql/mysql/ruoyi-vue-pro.sql`（官方底座基础表与字典）
   - `sql/module/media-2026-11-05.sql`（国标设备与流媒体表）
   - `sql/module/iot-*.sql`（物联网物模型与规则引擎表）

### 3. 配置与启动后端服务
1. 打开 IntelliJ IDEA，点击 **File -> Open**，选择项目根目录 `pom.xml` 导入 Maven 工程；
2. 打开 `yudao-server/src/main/resources/application-local.yaml`，检查并修改本地的 MySQL、Redis、SIP IP 等配置：
   ```yaml
   spring:
     datasource:
       dynamic:
         datasource:
           master:
             url: jdbc:mysql://127.0.0.1:3306/ruoyi-vue-pro?useSSL=false&serverTimezone=Asia/Shanghai
             username: root
             password: your_password
     data:
       redis:
         host: 127.0.0.1
         port: 6379
   ```
3. 找到启动类 `cn.iocoder.yudao.server.YudaoServerApplication`，直接运行 `main` 方法启动后端工程。
4. 观察控制台输出，出现 `[YudaoServerApplication] started successfully` 标志后端启动完成（默认监听端口 `48080`）。

### 4. 启动前端系统
```bash
# 进入前端源码目录
cd ui

# 安装依赖 (推荐使用国内镜像加速)
pnpm install --registry=https://registry.npmmirror.com

# 启动本地开发服务
pnpm run dev
```

浏览器打开 `http://localhost:80` 即可进入 MzMedia 登录控制台！
