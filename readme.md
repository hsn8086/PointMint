# Koishi Plugin PointMint

[![npm](https://img.shields.io/npm/v/koishi-plugin-pointmint?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-pointmint)
[![License](https://img.shields.io/github/license/DMB-codegang/pointmint?style=flat-square)](LICENSE)

模块化架构｜可审计事务追踪｜实时积分生态 - 基于双效校验机制的经济引擎

<mcfile name="index.ts" path="d:\koishi\koishi\external\pointmint\src\index.ts"></mcfile>

## 功能特性

### 核心能力
- **双效校验机制**：通过<mcsymbol name="TransactionIdGenerator" filename="index.ts" path="d:\koishi\koishi\external\pointmint\src\index.ts" startline="6" type="class"></mcsymbol>实现事务ID生成与验证，确保每笔积分操作的可追溯性
- **实时积分系统**：提供<mcsymbol name="PointService" filename="index.ts" path="d:\koishi\koishi\external\pointmint\src\index.ts" startline="44" type="class"></mcsymbol>类实现完整的积分生命周期管理（增/删/查/改）
- **审计追踪体系**：通过<mcsymbol name="LogService" filename="logService.ts" path="d:\koishi\koishi\external\pointmint\src\logService.ts" startline="11" type="class"></mcsymbol>记录全量操作日志，支持自定义日志保留策略

### 功能亮点
- 用户积分排行榜（TopN 查询）
- 自动用户名同步机制
- 弹性积分初始化策略
- 操作结果多状态码返回
- 插件间调用追踪标识

## 开发者快速接入指南

> [!NOTE]  
> 正在撰写……

## 接口文档

### 基础数据结构
基础数据结构提供了必要的接口定义，用于实现插件间的交互。

> [!WARNING]  
> 插件目前还在开发版本，下面的接口在接下来的版本中可能会有变动

```typescript
export interface ApiResponseNoData {
    code: number // 状态码
    msg: string // 状态信息
}
```
### 状态码表


| 状态码 | 状态信息 | 说明 |
|---|---|---|
| 200 | 成功 | 操作成功 |
| 204 | 成功 | 操作成功，但是操作没有实质性改变数据 |
| 400 | 错误 | 操作失败，参数有误 |
| 403 | 错误 | 操作失败，用户没有足够的积分用于操作 |
| 500 | 错误 | 操作失败，服务器内部错误，可能是配置项错误或bug |

### 1. 积分查询

1. 设置积分
```typescript
async set(
  userid: string, // 用户唯一标识符
  transactionId: string, // 事务id，通过ctx.points.generateTransactionId()生成
  points: number, // 积分值，必须 >= 0
  pluginName?: string // 插件名，用于追踪调用关系
): Promise<ApiResponseNoData>
```

2. 增加积分
```typescript
async add(
  userid: string,
  transactionId: string,
  points: number,
  pluginName?: string
): Promise<ApiResponseNoData>
 ```

3. 扣除积分
```typescript
async reduce(
  userid: string,
  transactionId: string,
  points: number,        // 必须 > 0
  pluginName?: string
): Promise<ApiResponseNoData>
 ```

4. 更新用户名
```typescript
async updateUserName(
  userid: string,
  username: string,
  pluginName?: string
): Promise<ApiResponseNoData>
 ```

5. 获取积分排行
```typescript
async getTopN(
  num: number  // 需要查询的排行榜名额数量，必须为正整数
): Promise<Array<{
  userid: string   // 用户唯一标识符
  username: string // 用户当前名称
  points: number   // 用户当前积分
}>>
// 返回示例
[
    { userid: '123456', username: 'Alice', points: 100},
    { userid: '654321', username: 'Bob', points: 90}
]
 ```