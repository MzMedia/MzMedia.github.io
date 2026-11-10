# 🐳 Docker Compose 快速编排

MzMedia 提供了完善的 Docker Compose 编排脚本，位于项目源码根目录下的 `script/docker-compose/` 中。

---

## 1. 编排服务清单

| 服务名 | 默认容器端口 | 宿主机映射端口 | 核心镜像与技术说明 |
| :--- | :--- | :--- | :--- |
| **`mysql`** | 3306 | 3306 (可选) | MySQL 8.4，初始化挂载 `sql/mysql/ruoyi-vue-pro.sql` 与模块增量脚本 |
| **`redis`** | 6379 | 6379 (可选) | Redis 7.4-Alpine，开启 AOF 持久化与密码保护 |
| **`yudao-server`** | 48080 | 48080 (内部网络) | Spring Boot 4.1.2 后端应用容器（基于 JDK 21/25） |
| **`web`** | 80 | 8080 | Nginx 1.28-Alpine，代理前端静态文件与后端 `/admin-api` 请求 |

---

## 2. 快速部署命令

```bash
# 1. 切换至编排脚本目录
cd script/docker-compose

# 2. 复制环境变量配置
cp .env.example .env

# 3. 构建并启动容器
docker compose up -d --build

# 4. 检查服务健康状态
docker compose ps

# 5. 查看后端应用实时日志
docker compose logs -f yudao-server
```

启动完成后，浏览器直接访问：`http://localhost:8080` 即可开始使用。
