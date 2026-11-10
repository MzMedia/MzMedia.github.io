# 🛡️ AI Agent 五大架构防线（强约束）

凡受命修改或编写 MzMedia 平台源码的 **AI Agent（Coding Assistant）**与核心研发人员，必须**无条件执行**以下五大防线约束：

---

## 防线一：业务逻辑独立模块化防线
- **视频业务**（SIP、ZLMediaKit、WebRTC、PTZ）代码**必须**放在 `yudao-module-media` 中；
- **物联网核心**（协议网关、TSL 物模型、规则引擎）代码**必须**放在 `yudao-module-iot` 中；
- **AI 智能体**（Spring AI、MCP、Agent 编排）代码**必须**放在 `yudao-module-ai1-springai` 中；
- **工业产供销业务**必须分别落在 `pms`、`mes`、`wms` 中；
- **严禁侵入核心底座**：**绝对禁止**直接修改 `yudao-framework` 或 `yudao-module-system` 的内部核心逻辑！若需要扩展框架能力，必须使用 **Spring 继承拓展**、**`@Primary` Bean 覆盖** 或 **AOP 切面注入** 实现。

---

## 防线二：配置文件隔离防线
- 禁止在根配置 `application.yaml` 中大规模修改官方现有参数；
- 新增业务配置必须挂载在专属命名空间下：
  - 视频模块：`sip:`、`media:`、`user-settings:`
  - 物联网模块：`yudao.iot:`
  - AI 模块：`yudao.ai:`、`spring.ai:`
- **安全底线**：严禁将任何真实的生产数据库密码、第三方 API Key、云存储密钥硬编码提交到 Git 仓库，统一使用环境变量占位符（如 `${OPENAI_API_KEY:sk-xxxx}`）。

---

## 防线三：数据库脚本增量管理防线
- **绝对禁止修改官方基线脚本**：严禁直接篡改 `sql/mysql/ruoyi-vue-pro.sql`；
- **增量脚本规范**：所有新增业务表、新增字段、新增菜单与字典，必须以独立文件形式存储在 `sql/module/` 下，命名规则为 `模块名-yyyy-MM-dd.sql`（例如 `sql/module/media-2026-11-10.sql`）。

---

## 防线四：代码设计与分层规范防线
- **三层架构分层**：
  - `Controller`：只负责入参校验（`@Valid`）、权限控制（`@PreAuthorize`）与结果组装，**禁止在 Controller 中书写核心业务逻辑**；
  - `Service` / `ServiceImpl`：承载所有核心业务事务与流程控制；
  - `DAL`（Data Access Layer）：分为 `dataobject`（DO 实体）与 `mysql`（Mapper 接口），使用 MyBatis-Plus。
- **数据转换统一标准**：
  - 强制使用 **MapStruct** 编写转换器接口（如 `DeviceConvert.INSTANCE.convert(do)`），**严禁在代码中写手工重复的 `get/set`**，也不建议使用性能损耗严重的 `BeanUtils.copyProperties`。
- **接口返回结构统一**：
  - 所有 API 返回类型必须为 `CommonResult<T>`，成功使用 `CommonResult.success(data)`，失败使用 `ServiceException` 抛出，由全局异常拦截器统一收敛。
- **多租户与数据隔离**：
  - 属于租户层级的业务表必须包含 `tenant_id` 字段（`bigint NOT NULL DEFAULT 0`）。

---

## 防线五：Java 21 与编译环境防线
- 项目已全面升级至 **Java 21** 与 **Spring Boot 4.1.2**，严禁引入已过时的 Javax 包（必须使用 `jakarta.*`，如 `jakarta.annotation.Resource`、`jakarta.validation.Valid`）；
- 根目录 `pom.xml` 中必须保留 `<compilerArgs><arg>-parameters</arg></compilerArgs>`，以确保 Spring Boot 参数名反射推导正常运作。
