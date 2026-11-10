# 📊 TDengine 海量时序存储

在工业物联网场景下，成百上千台传感器以秒级乃至百毫秒级频率上报数据，传统关系型数据库（如 MySQL）在数据量达到数千万行后查询变慢、存储膨胀严重。MzMedia 引入了国产高性能时序数据库 **TDengine 3.0+**。

---

## 1. 超级表 (STable) 建模设计

TDengine 采用“一个设备一张表，一类设备一个超级表”的核心设计：
- **超级表 (STable)**：定义同类设备的数据结构与静态标签（Tags，如 `tenant_id`, `product_key`, `device_id`, `location`）；
- **子表 (SubTable)**：每个物理设备对应超级表的一张独立子表，子表仅存储时间戳（`ts`）与动态属性（如 `current`, `voltage`, `temperature`）。

```sql
-- 示例：温度传感器超级表定义
CREATE STABLE IF NOT EXISTS `meters` (
    `ts` TIMESTAMP,
    `current` FLOAT,
    `voltage` INT,
    `temperature` FLOAT
) TAGS (
    `tenant_id` BIGINT,
    `device_id` VARCHAR(64),
    `workshop` VARCHAR(32)
);
```

---

## 2. 核心性能优势

1. **超强写入吞吐**：单机每秒可并发写入数十万条记录，无锁无竞争写入；
2. **极高数据压缩比**：针对时序数据特点采用列式压缩算法（LZ4 / 二阶差分），相比 MySQL 节约 **80% 以上** 的磁盘存储空间；
3. **毫秒级时序聚合**：原生支持降采样查询（`INTERVAL(1h)`）、滑动窗口聚合（`ROLLING`）与插值填充，前端大屏加载全年历史趋势曲线秒级呈现。
