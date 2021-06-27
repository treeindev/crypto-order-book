import React from 'react';
import { useSelector } from 'react-redux';
import { State, OrderData, OrderElement } from '../../models/state';
import './orderbook.scss';

function OrderBook() {
    const { bids, asks } = useSelector((state: State) => { return { bids: state.crypto.bids, asks: state.crypto.asks } });
    const displayLimit = 20;
  
    const getItemList = (orders: {[key: string]: OrderData}, reversed: boolean): Array<OrderElement> => {
      const list: Array<OrderElement> = [];
      let accumulatedTotal = 0;
  
      // Sort order keys in descending order.
      const keys = Object.keys(orders);
      keys.sort( (a,b) => parseInt(b)-parseInt(a));
  
      // Get the highest total on the current order book.
      const highestTotal = parseInt(
        keys.slice(0,displayLimit).reduce((total, current, i) => `${parseInt(total)+orders[current].size}`, '0')
      );
      if (keys.length<displayLimit) return list;
  
      // Render only up to 10 orders.
      for (let i=0; i<displayLimit; i++) {
        const size = orders[keys[i]].size;
        const price = orders[keys[i]].price;
  
        // Total is get after sum of sizes from all higher prices in the current order book.
        // If there are no higher orders, then total is equal to current order size.
        const total = accumulatedTotal + size;
        accumulatedTotal = total;
  
        // Get the highest total and calculate the current order percentage.
        const percentage = Math.round(total / highestTotal * 100);
  
        list.push({
          price: price,
          size: size,
          total: total,
          percentage: percentage
        });
      }
  
      return reversed ? [...list.reverse()] : list;
    }
  
    return (
      <div className="book_container">
        <div className="order_section bids">
          <ul className="header">
            <li>TOTAL</li>
            <li>SIZE</li>
            <li>PRICE</li>
          </ul>
          <ul className="order_book" data-testid="orderbook_bids">
            {getItemList(bids, false).map((order: OrderElement, index: number) => {
              return <li className={`bg-green-${order.percentage}`} key={index}>
                <span>{order.total}</span><span>{order.size}</span><span className="price">{order.price}</span>
              </li>
            })}
          </ul>
        </div>
        <div className="order_section asks">
          <ul className="header">
            <li>PRICE</li>
            <li>SIZE</li>
            <li>TOTAL</li>
          </ul>
          <ul className="order_book" data-testid="orderbook_asks">
            {getItemList(asks, true).map((order: OrderElement, index: number) => {
              return <li className={`bg-red-${order.percentage}`} key={index}>
                <span className="price">{order.price}</span><span>{order.size}</span><span>{order.total}</span>
              </li>
            })}
          </ul>
        </div>
      </div>
    );
  }
  
  export default OrderBook;