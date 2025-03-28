import { Context } from 'koishi'
import { PointService } from '..'
import { Config } from '../config'
import { name, database_name } from '..'

export function registerCommands(ctx: Context, service: PointService, cfg: Config) {
  ctx.command('查询积分').action(async ({ session }) => {
    if (cfg.check_points_command_set) {
      const pointsResult = await service.get(session.userId, name)
      const responseText = cfg.check_points_command.replace(/\{points\}/gi, pointsResult.toString())
      session.send(responseText)
      
      if (cfg.auto_log_username && cfg.auto_log_username_type === 'only_command') {
        const username = session.username
        const database_username = await ctx.database.get(database_name, { userid: session.userId })
        if (database_username.length === 0 || database_username[0].username !== username) {
          service.updateUserName(session.userId, session.username)
        }
      }
    }
  })
}