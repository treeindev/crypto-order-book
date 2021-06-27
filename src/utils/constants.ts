import { Currency } from "../models/state";

// Crypto Currencies
export const AVAILABLE_CURRENCIES: Array<Currency> = [
    {
        name: "Bitcoin",
        id: "PI_XBTUSD",
        logo: "/bitcoin-logo.png",
        exchangeId: "BTC"
    },
    {
        name: "Ether",
        id: "PI_ETHUSD",
        logo: "/ethereum-logo.png",
        exchangeId: "ETH"
    },
    {
        name: "LiteCoin",
        id: "PI_LTCUSD",
        logo: "/lite-logo.png",
        exchangeId: "LTC"
    },
    {
        name: "Ripple",
        id: "PI_XRPUSD",
        logo: "/ripple-logo.png",
        exchangeId: "XRP"
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

// Modals
export const MODAL_QA_TITLE = "What is a Book Order?";
export const MODAL_QA_MESSAGE = "An order book is a list containing all outstanding buy or sell orders for an asset, organized by price level. An order to buy is called a ‘bid’ and an order to sell is called an ‘ask’. The exchange’s matching engine pairs up bids and asks with market buy/sell orders, resulting in a trade.";
export const MODAL_WS_ERROR_TITLE = "Connection Error";
export const MODAL_WS_ERROR_MESSAGE = "There has been a connection error with the Crypto servers. Please refresh the page or try again later.";
export const MODAL_EXCHANGE_ERROR_TITLE = "Connection Error";
export const MODAL_EXCHANGE_ERROR_MESSAGE = "There has been a connection error with the Exchange servers. Please refresh the page or try again later.";