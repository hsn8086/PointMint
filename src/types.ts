/**
 * 用户积分数据库记录接口
 * 用于存储用户的积分信息
 */
export interface PointDB {
    /** 记录的唯一标识符 */
    id: number
    /** 用户的唯一标识符 */
    userid: string
    /** 用户名称 */
    username: string
    /** 用户当前积分数量 */
    points: number
}

/**
 * 积分操作日志记录接口
 * 用于记录所有积分变动的详细信息
 */
export interface PointDB_log {
    /** 记录的唯一标识符 */
    id: number
    /** 用户的唯一标识符 */
    userid: string
    /** 操作类型 */
    operationType: string
    /** 操作后的新值 */
    newValue: number
    /** 操作前的旧值 */
    oldValue: number
    /** 操作来源插件 */
    plugin: string
    /** 操作状态码 */
    statusCode: number
    /** 操作时间 */
    time: Date
    /** 操作备注 */
    comment: string
    /** 事务ID */
    transactionId: string
    /** 是否已回滚 */
    isRollback: boolean
    /** 关联的回滚事务ID */
    rollbackTransaction: string
}

/**
 * 含数据的API响应接口
 * 用于包含返回数据的API响应格式
 */
export interface ApiResponse {
    /** 响应状态码，通常200表示成功 */
    code: number
    /** 响应消息，用于描述操作结果 */
    msg: string
    /** 响应的具体数据内容 */
    data: any
}

/**
 * 无数据的API响应接口
 * 用于不需要返回数据的API响应格式
 */
export interface ApiResponseNoData {
    /** 响应状态码，200表示成功 */
    code: number
    /** 响应消息，用于描述操作结果 */
    msg: string
}