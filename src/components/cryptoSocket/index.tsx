import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    updateOrders, 
    resetOrderBook, 
    setModal, 
    setLoading, 
    setExchangeRation 
} from '../../store/main';
import { 
    SOCKET_EVENT_TYPES, 
    FEED_ID, 
    SOCKET_URL, 
    MODAL_WS_ERROR_TITLE, 
    MODAL_WS_ERROR_MESSAGE, 
    MODAL_EXCHANGE_ERROR_TITLE,
    MODAL_EXCHANGE_ERROR_MESSAGE
} from '../../utils/constants';
import { SocketEvent, OrderBookEvent } from '../../models/socketEvents';
import { Currency, State } from '../../models/state';
import { ExchangeAPI } from '../../utils/exchangeApi';

const socket = new WebSocket(SOCKET_URL);
const exchangeAPI = new ExchangeAPI();

function CryptoSocket () {
  const [socketCurrency, setSocketCurrency] = useState<Currency>();
  const {userCurrency, isLoading} = useSelector( (state: State) => { return {
    userCurrency: state.crypto.user_currency,
    isLoading: state.app.loading
  }});
  const dispatcher = useDispatch();
  const DELAY_SOCKET_CONNECTION = 1000;
  const DELAY_SOCKET_RESUME = 300;

  const setExchangeRatio = useCallback( async (currency: Currency) => {
    const ratio = await exchangeAPI.getRatio(currency.exchangeId);
    if (ratio) {
        dispatcher(setExchangeRation(ratio));
        return;
    }
    dispatcher(setModal({
      active: true,
      title: MODAL_EXCHANGE_ERROR_TITLE,
      message: MODAL_EXCHANGE_ERROR_MESSAGE,
      styleClass: "danger"
    }));
  }, [dispatcher]);

  useEffect(() => {
    if (isLoading) return;
    if (socketCurrency && socketCurrency.id !== userCurrency.id) {
      dispatcher(setLoading(true));
      const event = new SocketEvent(SOCKET_EVENT_TYPES.UNSUBSCRIBE, FEED_ID, [socketCurrency.id]);
      socket.send(event.toJSON());
      
      // Manual delay between socket subscriptions,
      // allowing for cleaning up previous order book state before subscribing again.
      setTimeout(async () => {
        dispatcher(resetOrderBook(''));
        const event = new SocketEvent(SOCKET_EVENT_TYPES.SUBSCRIBE, FEED_ID, [userCurrency.id]);
        socket.send(event.toJSON());

        await setExchangeRatio(userCurrency);
        setSocketCurrency(userCurrency);

        // Wait for connection to resume
        setTimeout(() => {
            dispatcher(setLoading(false));
        }, DELAY_SOCKET_RESUME);
      }, DELAY_SOCKET_CONNECTION);
    }

    socket.onopen = async (e: Event) => {
      const event = new SocketEvent(SOCKET_EVENT_TYPES.SUBSCRIBE, FEED_ID, [userCurrency.id]);
      socket.send(event.toJSON());
      
      await setExchangeRatio(userCurrency);
      setSocketCurrency(userCurrency);
    }

    socket.onmessage = (event: MessageEvent<any>) => {
      const data: OrderBookEvent = JSON.parse(event.data);
      if (data.bids && data.asks) {
        dispatcher(updateOrders(data));
      }
    }

    socket.onerror = (event: Event) => {
      dispatcher(setModal({
        active: true,
        title: MODAL_WS_ERROR_TITLE,
        message: MODAL_WS_ERROR_MESSAGE,
        styleClass: "danger"
      }));
    }
  }, [userCurrency, socketCurrency, dispatcher, isLoading, setExchangeRatio]);

  return (<></>);
}

export default CryptoSocket;