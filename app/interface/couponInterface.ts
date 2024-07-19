export interface couponInterface {
    id?: number
    code: string
    amountRange: number
    value: number
    isPercentage: boolean
    expDate: Date
    applyCount: number
}