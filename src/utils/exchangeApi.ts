import axios from "axios";

// Documentation reference: 
// https://www.alphavantage.co/documentation/
// https://rapidapi.com/alphavantage/api/alpha-vantage/
interface ExchangeResponse {
    data: {
        "Realtime Currency Exchange Rate": {
            "1. From_Currency Code": string,
            "2. From_Currency Name": string,
            "3. To_Currency Code": string,
            "4. To_Currency Name": string,
            "5. Exchange Rate": string,
            "6. Last Refreshed": string,
            "7. Time Zone": string,
            "8. Bid Price": string,
            "9. Ask Price": string
        }
    }
}

export class ExchangeAPI {
    public async getRatio(currency: string): Promise<string | undefined> {
        try {
            const response: ExchangeResponse = await axios.request({
                method: 'GET',
                url: process.env.REACT_APP_EXCHANGE_API_URL,
                params: { 
                    function: 'CURRENCY_EXCHANGE_RATE',
                    from_currency: currency,
                    to_currency: 'USD'
                },
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_EXCHANGE_API_KEY,
                    'x-rapidapi-host': process.env.REACT_APP_EXCHANGE_API_HOST
                }
            });
            return response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        } catch(error) {
            console.log(error);
            return undefined;
        }
    }
}