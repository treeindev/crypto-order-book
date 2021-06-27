import React from 'react';

import OrderBook from './components/orderbook';
import Header from './components/header';
import Footer from './components/footer';
import CryptoSocket from './components/cryptoSocket';
import Modal from './components/modal';
import Loader from './components/loader';

import './styles/App.scss';

function App() {
  return (
    <div className="application">
      <Loader></Loader>
      <Modal></Modal>
      <CryptoSocket></CryptoSocket>

      <Header></Header>
      <OrderBook></OrderBook>
      <Footer></Footer>
    </div>
  );
}

export default App;
