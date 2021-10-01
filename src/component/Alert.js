import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classname';

const Alert = (props) => (
    <div role='alert'
        className={classname('alert fade alert-fixed'
            , { 'alert-primary': props.primary && !props.secondary && !props.success && !props.danger && !props.warning && !props.info }
            , { 'alert-secondary': props.secondary }
            , { 'alert-success': props.success }
            , { 'alert-danger': props.danger }
            , { 'alert-warning': props.warning }
            , { 'alert-info': props.info }
            , { 'alert-dismissible': props.dismissible }
            , { 'show': props.show }
        )}>
        {props.emphasis ? <strong>{props.emphasis}</strong> : <></>}
        {props.value}
        {props.dismissible ?
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={e=> props.onClose()}>
                <span aria-hidden="true">&times;</span>
            </button>
            : <></>

        }

    </div>
);

Alert.propTypes = {
    value: PropTypes.string,
    primary : PropTypes.bool,
    secondary : PropTypes.bool,
    success : PropTypes.bool,
    danger : PropTypes.bool,
    warning : PropTypes.bool,
    info : PropTypes.bool,
    emphasis : PropTypes.string,
    dismissible : PropTypes.bool,
    onClose: PropTypes.func
};

Alert.defaultProps = {
    primary: true,
    light: true,
    show: false
};

export default Alert