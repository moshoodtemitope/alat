import * as React from 'react';
// import {BrowserRouter} from 'react-router-dom'
import OnboardingRoute from "./routes";
import {Router} from "react-router";
import {history} from "../_helpers";
import MainRoute from "../shared/routes";
// import MainRoute from "../shared/routes";


class OnboardingContainer extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <div className="onboarding">
                        <div className="container middle">
                            <div className="inner">
                                <div className="row">
                                    <div className="col-4">
                                        <img src="/public/assets/img/logo.svg" alt="ALAT Logo" />
                                    </div>

                                </div>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

// const OnboardingContainer = props => ({
//     render() {
//         return (
//             <div className="onboarding">
//                 <div className="container middle">
//                     <div className="inner">
//                         <div className="row">
//                             <div className="col-4">
//                                 <img src="/public/assets/img/logo.svg" alt="ALAT Logo" />
//                             </div>
//
//                         </div>
//                         {props.children}
//                     </div>
//                 </div>
//             </div>
//
//         );
//     }
// });


export default OnboardingContainer;