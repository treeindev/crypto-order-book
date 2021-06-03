import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateOrders, resetOrderBook } from './store/main';
import './App.scss';
import OrderBook from './components/orderbook';
import Header from './components/header';
import Bottom from './components/bottom';

function App() {
  const [socket] = useState(new WebSocket('wss://www.cryptofacilities.com/ws/v1'));
  const [socketCurrency, setSocketCurrency] = useState();
  const [loadingSocket, setLoading] = useState(false);
  const currency = useSelector( (state: any) => state.active_currency );
  const dispatcher = useDispatch();

  useEffect(() => {
    if (loadingSocket) return;
    if (socketCurrency && socketCurrency !== currency) {
      setLoading(true);
      socket.send(`{"event":"unsubscribe","feed":"book_ui_1","product_ids":["${socketCurrency}"]}`);
      
      // Set a manual delay between socket subscriptions.
      // This allows for cleaning up previous order book state before subscribing again.
      setTimeout(() => {
        dispatcher(resetOrderBook(null));
        socket.send(`{"event":"subscribe","feed":"book_ui_1","product_ids":["${currency}"]}`);
        setSocketCurrency(currency);
        setLoading(false);
      }, 1000);
    }

    socket.onopen = (event) => {
      socket.send(`{"event":"subscribe","feed":"book_ui_1","product_ids":["${currency}"]}`);
      setSocketCurrency(currency);
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.bids && data.asks) {
        dispatcher(updateOrders(data));
      }
    }
  }, [currency, socket, socketCurrency, dispatcher, loadingSocket]);

  return (
    <div className="application">
      <Header></Header>
      <OrderBook></OrderBook>
      <Bottom></Bottom>
    </div>
  );
}

export default App;
