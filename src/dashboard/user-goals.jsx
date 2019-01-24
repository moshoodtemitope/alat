import * as React from "react";
import { Provider } from "react-redux";
import {history} from "../_helpers";
import {Router} from "react-router";


class UserGoals extends React.Component{
    render(){

        return (
            <Router history={history}>
                <div className="col-sm-12 col-md-6">
                    <div className="al-card acct-match">
                        <div className="goal-intro">
                            <img src="/public/assets/img/save-money.svg" />
                            <h3>Start saving, earn <span
                                className="red-text">10%</span> interest</h3>
                            <p>Create goals to meet your targtes and earn interest while doing
                                so.</p>
                            <a href="" className="btn-alat m-b-10 m-t-20">Discover More</a>
                        </div>
                    </div>
                </div>
            </Router>

        );
    }
}

export default UserGoals;
