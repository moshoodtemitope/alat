import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Fragment } from 'react';
import Airtime from './airtime/airtime';
import BuyAirtime from './airtime/airtime-buy'
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
// import Data from './data';
// import  Airtime  from './airtime';
import Data from './data/data';

class Bills extends Component {



    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    {/* <p className="page-title">Airtime & Bills Payment <span><a href="#" className="btn-alat">Buy Airtime</a></span></p> */}
                                </div>

                                <div className="col-sm-12">
                                    <div>
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li><NavLink to={'/bills/airtime'}>Airtime</NavLink></li>
                                                <li><NavLink to={'/bills/data'}>Data</NavLink></li>

                                                {/* <li><a href="bills.html">Bills Payment</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {this.props.children}
                                <Switch>
                                <Route exact to={'bills/data'} component={Data} />
                                <Route exact to={'/bills/airtime'} component={Airtime} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default Bills;