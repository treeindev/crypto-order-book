import { Currency } from "./constants"

export type ActionDefault = {
    type: string,
    payload: string
}

export type ActionCurrencyActivate = {
    type: string,
    payload: Currency
}

export type ActionGroupActivate = {
    type: string,
    payload: number
}

export type ActionUpdateOrders = {
    type: string,
    payload: {
        bids: Array<any>,
        asks: Array<any>,
        product_id?: string,
        feed?: string
    }
}