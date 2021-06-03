export const DEFAULT_CURRENCY = "PI_XBTUSD";
export const AVAILABLE_CURRENCIES: {[key: string]: string} = {
    "bitcoin": "PI_XBTUSD",
    "ether": "PI_ETHUSD",
}
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