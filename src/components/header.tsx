import React from 'react';
import { useSelector } from 'react-redux';
import "./header.scss";

function Header() {
  const currency = useSelector((state: any) => state.active_currency);
  const group = useSelector((state: any) => state.active_group);

  return(
    <div className="header">
      <h1>Order Book: Active Currency: {currency}</h1>
      <select>
          <option>{group}</option>
      </select>
    </div>
  )
}

export default Header;