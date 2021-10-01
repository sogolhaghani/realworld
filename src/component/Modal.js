import React from 'react';
import PropTypes from 'prop-types';

import Portal from './Portal'

const Modal = (props) =>
(
    <Portal>
        <div className={"modal fade" + (props.show ? " show" : "")} 
        style={{display : props.show ?  "block" : "none"}}
        id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{props.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClose()} >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.description}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => props.onClose()} >{props.labelReject}</button>
                        <button type="button" className="btn btn-danger" onClick={e => {props.onConfirm(props.value) }}>{props.labelConfirm}</button>
                    </div>
                </div>
            </div>
        </div>
    </Portal>
)


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    value: PropTypes.any,
    labelConfirm: PropTypes.string,
    labelReject: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
};

Modal.defaultProps = {
    labelConfirm: 'Yes',
    labelReject: 'No',
    title: ''
};

export default Modal
