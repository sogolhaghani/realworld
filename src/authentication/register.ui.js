import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import InputText from '../component/InputText';
import Button from '../component/Button';
import Alert from '../component/Alert';


import { clear, inputChangeHandler, requiredValidation, registerHandler, clearValidation } from './authentication.actions';

import { displayValidationText } from '../utility/uis.utils';

const messeges = {
    email: "Email",
    username: "User",
    password: "Password",
    login: "Register",
    login_upper: "REGISTER",
    register: ["Already Registered? ", "Login"],
    username_required: "Required field",
    password_required: "Required field",
    email_required: "Required field"
}

const RegisterUI = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const email = useSelector(state => state.authentication.user.email)
    const token = useSelector(state => state.authentication.token)
    const username = useSelector(state => state.authentication.user.username)
    const password = useSelector(state => state.authentication.user.password)
    const validations = useSelector(state => state.authentication.validations) || [];

    useEffect(() => {
        dispatch(clear())
    }, [dispatch])

    if (token)
        history.push('/menu')

    return (
        <>
            <div className="container">
                <div className="row justify-content-center login-container">
                    <div className="col-4">
                        <Alert show={validations.filter(x => x.field === null).length > 0} danger dismissible
                            emphasis={messeges.login_failed_bold} onClose={() => dispatch(clearValidation())}
                            value={validations.filter(x => x.field === null).length > 0 ? messeges[validations.filter(x => x.field === null)[0].type] : ""} />
                        <h1>{messeges.login_upper}</h1>

                        <InputText label={messeges.username} value={username || ''}
                            changeHandler={val => dispatch(inputChangeHandler(val, 'username'))}
                            blurHandler={() => dispatch(requiredValidation('username'))}
                            validation={displayValidationText('username', messeges, validations)}
                        />

                        <InputText label={messeges.email} value={email || ''}
                            changeHandler={val => dispatch(inputChangeHandler(val, 'email'))}
                            blurHandler={() => dispatch(requiredValidation('username'))}
                            validation={displayValidationText('email', messeges, validations)}
                        />

                        <InputText label={messeges.password}
                            type="password"
                            value={password || ''}
                            changeHandler={val => dispatch(inputChangeHandler(val, 'password'))}
                            blurHandler={() => dispatch(requiredValidation('username'))}
                            validation={displayValidationText('password', messeges, validations)}
                        />

                        <Button block label={messeges.login} primary onClick={() => dispatch(registerHandler())} />

                        <p>{messeges.register[0]}
                            <Link to={"/login"} >
                                <strong>{messeges.register[1]}</strong>
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
};

export default RegisterUI;