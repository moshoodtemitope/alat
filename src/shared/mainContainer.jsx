import * as React from 'react';
// import {BrowserRouter} from 'react-router-dom'
// import OnboardingRoute from "./routes";
import {Router} from "react-router";
import {history} from "../_helpers";
import MainRoute from "../shared/routes";
import OnboardingRoute from "../onboarding/routes";
// import MainRoute from "../shared/routes";


class MainContainer extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <MainRoute/>
                    <OnboardingRoute />
                </div>
            </Router>
        );
    }
}

export default MainContainer;