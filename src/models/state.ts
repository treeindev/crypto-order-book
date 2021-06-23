import { Currency } from "./constants"

export type AppState = {
    user_currency: Currency,
    active_group: number,
    group_list: Array<number>,
    asks: {[key: string]: OrderData},
    bids: {[key: string]: OrderData}
}

export type OrderData = {
    price: number,
    size: number
}

export type OrderElement = {
    price: number,
    size: number,
    total: number,
    percentage: number
}