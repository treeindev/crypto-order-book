// Crypto Currencies
export interface Currency {
    name: string;
    id: string;
    logo: string;
}
export const AVAILABLE_CURRENCIES: Array<Currency> = [
    {
        name: "Bitcoin",
        id: "PI_XBTUSD",
        logo: "/bitcoin-logo.png"
    },
    {
        name: "Ether",
        id: "PI_ETHUSD",
        logo: "/ethereum-logo.png"
    },
    {
        name: "LiteCoin",
        id: "PI_LTCUSD",
        logo: "/lite-logo.png"
    },
    {
        name: "Ripple",
        id: "PI_XRPUSD",
        logo: "/ripple-logo.png"
    }
]
export const DEFAULT_CURRENCY = AVAILABLE_CURRENCIES[0];
export const CURRENCY_GROUPS: {[key: string]: number[]} = {
    "PI_XBTUSD": [
        0.5,
        1,
        2.5
    ],
    "PI_ETHUSD": [
        0.05,
        0.1,
        0.25
    ]
};

// Web Socket
export const SOCKET_URL = "wss://www.cryptofacilities.com/ws/v1";
export const FEED_ID = "book_ui_1";
export const SOCKET_EVENT_TYPES: {[key: string]: string} = {
    SUBSCRIBE: "subscribe",
    UNSUBSCRIBE: "unsubscribe"
}