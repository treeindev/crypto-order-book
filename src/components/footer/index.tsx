import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AVAILABLE_CURRENCIES } from '../../utils/constants';
import { Currency, State } from '../../models/state';
import { activateCurrency } from '../../store/main';
import './footer.scss';

function Footer() {
  const dispatcher = useDispatch();
  const {userCurrency, exchangeRatio} = useSelector((state: State) => { return {
      userCurrency: state.crypto.user_currency,
      exchangeRatio: state.crypto.exchange_ratio
    }});

  const swapCurrency = (currency: Currency) => {
    dispatcher(activateCurrency(currency));
  }
  
  return(
    <div className="bottom">
      <h4>Active Currency: <b data-testid="footer_currency_name">{userCurrency.name}</b><br />
      Currency Exchange Reference: <b data-testid="footer_currency_id">{userCurrency.id}</b><br />
      Exchange rate: <b data-testid="footer_exchange_ratio">{exchangeRatio}</b></h4>
      <h4>Select the Crypto to show on the Crypto Book:</h4>
      <div className="gallery" data-testid="footer_crypto_gallery">
        {AVAILABLE_CURRENCIES.map( (currency: Currency, index: number) => { return(
          <div key={index} onClick={()=>{swapCurrency(currency)}}
               className={`crypto ${userCurrency.id === currency.id ? "active" : ""}`}
          >
            <img alt={currency.name} src={currency.logo} />
          </div>
        )})}
      </div>
    </div>
  )
}

export default Footer;