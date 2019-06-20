import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from "./_helpers/store";
import { Provider } from "react-redux";
import IndexedRoute from "./components/routes";
import {BrowserRouter} from 'react-router-dom';
import './assets/css/bootstrap.css';
import './assets/css/font-awesome/font-awesome.css';
import './assets/css/fontello/css/fontello.css';
import './assets/css/app.css';
import './assets/css/datepicker.min.css';
import './assets/css/common.css';
import './assets/css/dashboard.css';
import {Redirect, Route} from "react-router";
import App from "./App";


// import {createStore} from "redux";
// import rootReducer from "./redux/reducers";
// import StateLoader from "./_helpers/state.loader";
//
// const stateLoader = new StateLoader();
//
// let ss = createStore(rootReducer, stateLoader.loadState());
//
// ss.subscribe(() => {
//     stateLoader.saveState(ss.getState());
// });


ReactDOM.render(
    <Provider store={store}>
        {/*<IndexedRoute />*/}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
