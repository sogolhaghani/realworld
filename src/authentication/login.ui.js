import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import InputText from '../component/InputText';
import Button from '../component/Button';
import Alert from '../component/Alert';

import { inputChangeHandler, requiredValidation, loginHandler, clearValidation, clear } from './authentication.actions';
import { displayValidationText, STATUS } from '../utility/uis.utils';

const messeges = {
    email: "Email",
    password: "Password",
    login: "Login",
    login_upper: "LOGIN",
    register: ["Don’t have account? ", "Register Now"],
    username_required: "Required field",
    password_required: "Required field",
    login_failed: "User name and/or Password is invalid",
    login_failed_bold: "Login Failed! "
}

const LoginUI = (props) => {

    const dispatch = useDispatch();

    const status = useSelector(state => state.authentication.status);
    const token = useSelector(state => state.authentication.token);
    const username = useSelector(state => state.authentication.user.username);
    const password = useSelector(state => state.authentication.user.password);
    const validations = useSelector(state => state.authentication.validations) || [];

    useEffect(() => {
        if (token) {
            props.history.push('/menu')
        } else
            dispatch(clear())
    }, [token, dispatch, props.history]);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center login-container">
                    <div className="col-4">
                        <Alert show={validations.filter(x => x.field === null).length > 0} danger dismissible
                            emphasis={messeges.login_failed_bold} onClose={() => dispatch(clearValidation())}
                            value={validations.filter(x => x.field === null).length > 0 ? messeges[validations.filter(x => x.field === null)[0].type] : ""} />

                        <h1>{messeges.login_upper}</h1>

                        <InputText label={messeges.email} value={username || ''}
                            changeHandler={val => dispatch(inputChangeHandler(val, 'username'))}
                            blurHandler={() => dispatch(requiredValidation('username'))}
                            validation={displayValidationText('username', messeges, validations)}
                        />

                        <InputText label={messeges.password}
                            type="password"
                            value={password || ''}
                            changeHandler={val => dispatch(inputChangeHandler(val, 'password'))}
                            blurHandler={() => dispatch(requiredValidation('password'))}
                            validation={displayValidationText('password', messeges, validations)}
                        />

                        <Button block label={messeges.login} primary onClick={() => dispatch(loginHandler())} disabled={status === STATUS.loading} />

                        <p>{messeges.register[0]}
                            <strong>
                                <Link to={"/register"} >
                                    {messeges.register[1]}
                                </Link>
                            </strong>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LoginUI;