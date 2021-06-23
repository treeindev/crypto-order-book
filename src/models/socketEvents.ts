export interface OrderBookEvent {
    product_id: string;
    feed: string;
    asks: Array<Array<number>>;
    bids: Array<Array<number>>;
}

export interface iSocketEvent {
    event: string;
    feed: string;
    product_ids: Array<string>;
}

export class SocketEvent implements iSocketEvent {
    event: string;
    feed: string;
    product_ids: Array<string>;

    constructor(event: string, feed: string, products: Array<string>) {
        this.event = event;
        this.feed = feed;
        this.product_ids = products;
    }

    public toJSON(): string {
        return JSON.stringify({
            event: this.event,
            feed: this.feed,
            product_ids: this.product_ids
        });
    }
}