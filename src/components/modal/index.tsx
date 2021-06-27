import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/main';
import { State } from '../../models/state';
import "./modal.scss";

function Modal() {
  const dispatcher = useDispatch();
  const modal = useSelector(
    (state: State) => state.app.modal
  );

  const closeModal = (e: any) => {
    e.preventDefault();
    dispatcher(setModal({
        active: false
    }))
  }

  return(
    <div data-testid="modal_container" className={`modal ${modal.active ? 'active' : ''} ${modal.active ? modal.styleClass : ''}`} >
      <div className="frame ">
          <div className="container ">
              <span aria-label="close" data-testid="modal_close" className="close" onClick={closeModal} />
              <h3 data-testid="modal_title">{modal.active && modal.title}</h3>
              <p data-testid="modal_message">{modal.active && modal.message}</p>
            </div>
        </div>
    </div>
  )
}

export default Modal;