import React from 'react';
import styles from './Confirm.module.css';

function ConfirmModal({ modalOption, closeModal }) {
    return (
        <div tabIndex="-1" className={`modal ${modalOption.isOpen ? styles['isOpen'] : ''}`}>
            <div className={`modal-dialog  ${styles['fromTop']} `}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure ?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <p>Modal body text goes here.</p> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal} data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-primary" onClick={modalOption.onClick}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;