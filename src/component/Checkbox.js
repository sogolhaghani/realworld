import React from "react";
import PropTypes from 'prop-types';
const Checkbox = (props) => {
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={props.value} disabled={props.disabled}  onChange={e=>props.changeHandler(!props.value)}/>
            <label className ="form-check-label" htmlFor="defaultCheck1">
                {props.label}
            </label>
        </div>
    )
}

Checkbox.propTypes = {
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    changeHandler: PropTypes.func
};

Checkbox.defaultProps = {
    disabled: false
};


export default Checkbox;