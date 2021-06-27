import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_QA_MESSAGE, MODAL_QA_TITLE } from '../../utils/constants';

import { State } from '../../models/state';
import { setModal } from '../../store/main';
import "./header.scss";

function Header() {
  const dispatcher = useDispatch();
  const {currency, group} = useSelector(
    (state: State) => { return {currency: state.crypto.user_currency, group: state.crypto.active_group} }
  );

  const showQAModal = (e:any) => {
    e.preventDefault();
    dispatcher(setModal({
      active: true,
      title: MODAL_QA_TITLE,
      message: MODAL_QA_MESSAGE,
      styleClass: "default"
    }));
  }

  return(
    <div>
      <img alt="Crypto Book" className="logotype" src="/logotype.png" />
      <h1>Showing recent transactions for: <b data-testid="header_currency_name">{currency.name}</b></h1>
      <h4>Grouping order book as: <b data-testid="header_currency_group">{group}</b></h4>
      <h5 onClick={showQAModal} className="qa">Learn more <img alt="Questions" src="/qa.png" /></h5>
    </div>
  )
}

export default Header;