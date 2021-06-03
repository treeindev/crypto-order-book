import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AVAILABLE_CURRENCIES } from '../models/constants';
import { activateCurrency } from '../store/main';
import './bottom.scss';

function Bottom() {
  const dispatcher = useDispatch();
  const currency = useSelector((state: any) => state.active_currency);

  const swapCurrency = () => {
    const newCurrency = currency === AVAILABLE_CURRENCIES.bitcoin ? 
      AVAILABLE_CURRENCIES.ether : AVAILABLE_CURRENCIES.bitcoin;
    dispatcher(activateCurrency(newCurrency));
  }
  return(
    <div className="bottom">
      <button className="pink" onClick={()=>{swapCurrency()}}>Toggle Feed</button>
      <button className="red" onClick={()=>{swapCurrency()}}>Kill Feed</button>
    </div>
  )
}

export default Bottom;