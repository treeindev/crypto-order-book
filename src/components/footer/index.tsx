import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Currency, AVAILABLE_CURRENCIES } from '../../models/constants';
import { AppState } from '../../models/state';
import { activateCurrency } from '../../store/main';
import './footer.scss';

function Footer() {
  const dispatcher = useDispatch();
  const userCurrency: Currency = useSelector((state: AppState) => state.user_currency);

  const swapCurrency = (currency: Currency) => {
    dispatcher(activateCurrency(currency));
  }
  
  return(
    <div className="bottom">
      <h4>Active currency: <b data-testid="footer_currency_name">{userCurrency.name}</b>
      <br />Conversion rate: <b data-testid="footer_currency_id">{userCurrency.id}</b></h4>
      <h4>Select the Crypto to show on the Crypto Book:</h4>
      <div className="gallery" data-testid="footer_crypto_gallery">
        {AVAILABLE_CURRENCIES.map( (currency: Currency, index: number) => { return(
          <div key={index} onClick={()=>{swapCurrency(currency)}}
               className={`crypto ${userCurrency.id === currency.id ? "active" : ""}`}
          >
            <img src={currency.logo} />
          </div>
        )})}
      </div>
    </div>
  )
}

export default Footer;