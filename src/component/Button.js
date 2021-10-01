import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classname';


const Button = (props) => (
    <button type={props.type} onClick={e=> props.onClick(e)} disabled={props.disabled}
        className={classname('btn'
            , { 'btn-primary': props.primary && !props.secondary && !props.success && !props.danger && !props.warning && !props.info && !props.outline }
            , { 'btn-secondary': props.secondary && !props.outline}
            , { 'btn-success': props.success && !props.outline}
            , { 'btn-danger': props.danger && !props.outline}
            , { 'btn-warning': props.warning && !props.outline}
            , { 'btn-info': props.info && !props.outline}
           

            , { 'btn-outline-primary': props.primary && !props.secondary && !props.success && !props.danger && !props.warning && !props.info && props.outline }
            , { 'btn-outline-secondary': props.secondary && props.outline}
            , { 'btn-outline-success': props.success && props.outline}
            , { 'btn-outline-danger': props.danger && props.outline}
            , { 'btn-outline-warning': props.warning && props.outline}
            , { 'btn-outline-info': props.info && props.outline}
           
            , { 'btn-link': props.link }
            , { 'btn-sm': props.small }
            , { 'btn-lg': props.large }
            , { 'btn-block': props.block }
            ,props.className
        )}>
            {props.label}
    </button>

);


Button.propTypes = {
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    success: PropTypes.bool,
    danger: PropTypes.bool,
    warning: PropTypes.bool,
    info: PropTypes.bool,
    outline: PropTypes.bool,
    block:  PropTypes.bool,
    link: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    className : PropTypes.string
};

Button.defaultProps = {
    primary: true,
    light: true,
    outline: false,
    disabled: false,
    type : 'button'
};


export default Button;