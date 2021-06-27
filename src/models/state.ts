export interface Currency {
    name: string;
    id: string;
    logo: string;
    exchangeId: string;
}

export type CryptoState = {
    user_currency: Currency,
    exchange_ratio: string,
    active_group: number,
    group_list: Array<number>,
    asks: {[key: string]: OrderData},
    bids: {[key: string]: OrderData}
}

export type AppState = {
    modal: ModalState,
    loading: boolean
}

export type ModalState = {
    active: boolean,
    title?: string,
    message?: string,
    styleClass?: string
}

export type State = {
    crypto: CryptoState,
    app: AppState
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