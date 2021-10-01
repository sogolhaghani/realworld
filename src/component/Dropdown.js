import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import classname from 'classname';


function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
  }


const Dropdown = (props) => {
    const ref = useRef();
    const [show, setShow] = useState(false)

    const toggleMenu = (value) =>{
        setShow(value)
    }

    useOnClickOutside(ref, () => toggleMenu(false));

    return (
        <div className={classname("dropdown", {"show": show})} ref={ref}>
            <button type='button' id={props.id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={e=>toggleMenu(!show)}
                className={classname('btn', 'dropdown-toggle'
                    , { 'btn-primary': props.primary && !props.secondary && !props.success && !props.danger && !props.warning && !props.info }
                    , { 'btn-secondary': props.secondary }
                    , { 'btn-success': props.success }
                    , { 'btn-danger': props.danger }
                    , { 'btn-warning': props.warning }
                    , { 'btn-info': props.info }
                    , { 'btn-light': props.light && !props.dark }
                    , { 'btn-dark': props.dark }
                    , { 'btn-sm': props.small }
                    , { 'btn-lg': props.large }
                )}>
                {props.label}
            </button>
            <div class="dropdown-menu" aria-labelledby={props.id}>
                {props.items.map(x =>
                    <a className={classname('dropdown-item')} href="#" onClick={e =>{ props.onSelect(e, x.id); toggleMenu(!show)}} >{x.label}</a>
                )}
            </div>
        </div>
    )
};


Dropdown.propTypes = {
    value: PropTypes.element.isRequired,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    success: PropTypes.bool,
    danger: PropTypes.bool,
    warning: PropTypes.bool,
    info: PropTypes.bool,
    light: PropTypes.bool,
    dark: PropTypes.bool,
    outline: PropTypes.bool,
    block: PropTypes.bool,
    link: PropTypes.bool,

    onClick: PropTypes.func
};

Dropdown.defaultProps = {
    primary: true,
    light: true,
    outline: false
};


export default Dropdown;