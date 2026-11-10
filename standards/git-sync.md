# 🔀 Git 协作与上游同步 4 步法

MzMedia 基于官方 `ruoyi-vue-pro`（master-jdk25 分支）持续演进。为了长期稳定地获取官方上游框架的安全更新与底座补丁，团队制定了严密的分支管理与双远端同步机制。

---

## 1. 远端与分支拓扑

| 远端源名称 | 仓库地址 | 读写权限 | 职责说明 |
| :--- | :--- | :--- | :--- |
| **`origin`** | `https://gitee.com/mzmedia/mz-media.git` | **可读写** | 团队自有业务仓库，特性开发、版本发布推送到此。 |
| **`upstream`**| `https://gitee.com/zhijiantianya/ruoyi-vue-pro.git` | **只读** | 官方上游开源底座仓库，仅用于定期拉取更新。 |

```text
[upstream/master-jdk25] (官方上游仓库)
           │
           ▼ (git pull --ff-only upstream master-jdk25)
     official-jdk25     (★ 本地纯净镜像分支，绝对红线：严禁提交任何业务代码)
           │
           ▼ (git merge official-jdk25)
          dev           (★ 团队日常业务主基线) ───push───> [origin/dev]
           │
           ├── feature/xxx (具体业务特性分支)
           └── hotfix/xxx  (紧急修复分支)
```

---

## 2. 官方上游同步标准化 4 步法

当官方仓库发布重要更新或修复时，严格按照以下 4 步同步：

```bash
# 步骤 1：确认工作区干净，如有改动先暂存
git status
git stash

# 步骤 2：切换至纯净官方镜像分支，拉取上游最新提交
git checkout official-jdk25
git pull --ff-only upstream master-jdk25

# 步骤 3：切回团队业务主开发分支，合并官方更新
git checkout dev
git merge official-jdk25

# 步骤 4：核查并解决定制文件冲突
# 重点核查文件：根 pom.xml、yudao-dependencies/pom.xml、yudao-server/application*.yaml
# 解决冲突并通过本地单元测试编译后提交：
git commit -m "chore: 同步 upstream/master-jdk25 官方更新"
git push origin dev
git push origin official-jdk25
git stash pop # 恢复先前暂存的业务代码
```

---

## 3. 提交信息规范 (Conventional Commits)

格式强制统一为：`<type>(<scope>): <subject>`

- **Type 类型**：`feat`（新特性）、`fix`（Bug修复）、`refactor`（代码重构）、`perf`（性能调优）、`docs`（文档变更）、`chore`（构建/依赖更新）；
- **Scope 模块范围**：`media`、`iot`、`ai1`、`mes`、`wms`、`pms`、`system`、`infra`、`ui`、`server`。
