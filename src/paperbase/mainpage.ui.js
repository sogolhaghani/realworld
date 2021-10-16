import React, { useEffect } from 'react';
import { useCookie } from "react-use";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ArticleList from '../article/article.list.ui';
import ArticleEdit from '../article/article.edit.ui';
import {logoutUser, loadUser} from '../authentication/authentication.actions';

const messages = {
    brand: "Challenge",
    welcome: "Welcome",
    logout: "Logout",
    title: "Post",
    article_list: "All Articles",
    article_form: "New Article"
}

const ConfigurationUI = () => {
    const [value, updateCookie,deleteCookie] = useCookie("my-cookie-realwold");
    const username = useSelector(state => state.authentication.user.username)
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!value )
            history.push('/login')

        if(!username && value)
            dispatch(loadUser(value))

    }, [history, value, username, dispatch])

    const logout = () =>{
        dispatch(logoutUser());
        deleteCookie();
    }

    history.listen(location => {
        if (history.action === 'PUSH' && location === "/login" ) {
            history.go(1)
        }
      })

    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark sticky-top">
                <div className="navbar-brand">{messages.brand}</div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            {username ? 
                            <span className="nav-link" >{messages.welcome + ' ' + username} </span>
                            :<></>}
                        </li>
                    </ul>

                </div>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-info my-2 my-sm-0"
                        onClick={e => logout()}
                        type="submit" >
                        {messages.logout}
                    </button>
                </form>
            </nav>
            <div className="container-fluid">
                <div className="row row flex-xl-nowrap">
                    <div className="col-md-3 bg-primary bd-sidebar navbar-dark">
                        <div className="navbar-brand">{messages.title}</div>
                        <nav className="nav nav-pills flex-column">

                            <Link to={"/article/list"} className="nav-link navbar-brand small">
                                {messages.article_list}
                            </Link>

                            <Link to={"/article/edit"} className="nav-link navbar-brand small">
                                {messages.article_form}
                            </Link>

                        </nav>
                    </div>
                    <div className="col-md-9 bd-content mt-4">
                        <Switch>
                            <Route path='/article/list' component={ArticleList} />
                            <Route path='/article/edit/:slug?' component={ArticleEdit} />
                        </Switch>

                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default ConfigurationUI