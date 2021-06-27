import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../models/state";
import './loader.scss';

function Loader() {
  const loading = useSelector( (state: State) => state.app.loading );
  
  return(
    <div data-testid="loader_container" className={`loader ${loading ? 'active' : ''}`}>
      <div className="spinner">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
}

export default Loader;