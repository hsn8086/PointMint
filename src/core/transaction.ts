import { randomBytes } from 'crypto'

export class TransactionIdGenerator {
  static validate(transactionId: string): boolean {
    return Boolean(
      transactionId?.startsWith('tx-') && 
      transactionId.split('-').length === 4
    )
  }

  static generate(prefix: string = 'tx'): string {
    const baseTime = Date.now().toString(36).padStart(10, '0')
    const hrtime = process.hrtime()
    const micro = Math.floor(hrtime[1]/1000).toString(36).padStart(4, '0')
    
    const random = randomBytes(8)
      .readBigUInt64BE()
      .toString(36)
      .padStart(10, '0')

    return `${prefix}-${baseTime}-${micro}-${random}`
  }
}