// import * as React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// // import App from './App';
// import * as serviceWorker from './serviceWorker';


// ReactDOM.render(<OnboardingContainer />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
// import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import { reducer as formReducer } from 'redux-form';
// import * as serviceWorker from './serviceWorker';
// import {BrowserRouter} from "react-router-dom";


import { store } from './_helpers';
import Login from "./onboarding/login";
import OnboardingContainer from "./onboarding/Container";
import MainContainer from "./shared/mainContainer";
// import createHistory from "shared/history";
//
// const rootReducer = combineReducers({
//     form: formReducer
// });

// const store = createStore(rootReducer);


// render(
//     <Provider store={store}>
//         <OnboardingContainer />
//     </Provider>,
//     document.getElementById('root')
// );
//


ReactDOM.render(
    <Provider store={store}>
            <MainContainer/>
    </Provider>
    ,document.getElementById('root'));
// serviceWorker.unregister();