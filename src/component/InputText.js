import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classname';

const InputText = (props) => (
    <div className="form-group">
        <label htmlFor={props.id}>{props.label}</label>
        {props.area ?
            <textarea type={props.type}
                onChange={e => { props.changeHandler(e.target.value) }}
                onBlur={e =>{ props.blurHandler ? props.blurHandler(e): e.preventDefault()}}
                className={classname("form-control", { "is-invalid": props.validation })}
                id={props.id}
                placeholder={props.placeholder || props.label}
                value={props.value}
                rows="5"
                required={props.required} /> :

            <input type={props.type}
                onChange={e => { props.changeHandler(e.target.value) }}
                onBlur={e =>{ props.blurHandler ? props.blurHandler(e): e.preventDefault()}}
                className={classname("form-control", { "is-invalid": props.validation })}
                id={props.id}
                placeholder={props.placeholder || props.label}
                value={props.value}
                required={props.required} />
        }
        {props.validation ?
            <div className={classname("invalid-feedback")}>
                {props.validation}
            </div>
            : <></>}
    </div>
);

InputText.propTypes = {
    value: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    changeHandler: PropTypes.func
};

InputText.defaultProps = {
    required: true,
    type: "text"
};

export default InputText;
