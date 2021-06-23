import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateOrders, resetOrderBook } from './store/main';
import { SOCKET_EVENT_TYPES, FEED_ID, SOCKET_URL } from './models/constants';
import { SocketEvent, OrderBookEvent } from './models/socketEvents';
import OrderBook from './components/orderbook';
import Header from './components/header';
import Footer from './components/footer';
import './styles/App.scss';
import { AppState } from './models/state';

const socket = new WebSocket(SOCKET_URL);

function App() {
  const [loadingSocket, setLoading] = useState(false);
  const [socketCurrency, setSocketCurrency] = useState<any>();
  const userCurrency = useSelector( (state: AppState) => state.user_currency );
  const dispatcher = useDispatch();

  useEffect(() => {
    if (loadingSocket) return;
    if (socketCurrency && socketCurrency.id !== userCurrency.id) {
      setLoading(true);
      const event = new SocketEvent(SOCKET_EVENT_TYPES.UNSUBSCRIBE, FEED_ID, [socketCurrency.id]);
      socket.send(event.toJSON());
      
      // Set a manual delay between socket subscriptions.
      // This allows for cleaning up previous order book state before subscribing again.
      setTimeout(() => {
        dispatcher(resetOrderBook(''));
        const event = new SocketEvent(SOCKET_EVENT_TYPES.SUBSCRIBE, FEED_ID, [userCurrency.id]);
        socket.send(event.toJSON());
        
        setSocketCurrency(userCurrency);
        setLoading(false);
      }, 1000);
    }

    socket.onopen = (e: Event) => {
      const event = new SocketEvent(SOCKET_EVENT_TYPES.SUBSCRIBE, FEED_ID, [userCurrency.id]);
      socket.send(event.toJSON());
      setSocketCurrency(userCurrency);
    }

    socket.onmessage = (event: MessageEvent<any>) => {
      const data: OrderBookEvent = JSON.parse(event.data);
      if (data.bids && data.asks) {
        dispatcher(updateOrders(data));
      }
    }
  }, [userCurrency, socketCurrency, dispatcher, loadingSocket]);

  return (
    <div className="application">
      <Header></Header>
      <OrderBook></OrderBook>
      <Footer></Footer>
    </div>
  );
}

export default App;
