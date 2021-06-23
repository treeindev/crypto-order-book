import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../models/state';
import "./header.scss";

function Header() {
  const {currency, group} = useSelector(
    (state: AppState) => { return {currency: state.user_currency, group: state.active_group} }
  );

  return(
    <div>
      <img className="logotype" src="/logotype.png" />
      <h1>Showing recent transactions for: <b data-testid="header_currency_name">{currency.name}</b></h1>
      <h4>Grouping currency as: <b data-testid="header_currency_group">{group}</b></h4>
    </div>
  )
}

export default Header;