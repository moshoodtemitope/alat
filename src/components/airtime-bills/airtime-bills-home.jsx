import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Fragment } from 'react';
import  Airtime  from './airtime';
import {Link, Route } from 'react-router-dom';
import Data from './data/data';

class Bills extends Component {

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <p className="page-title">Airtime & Bills Payment</p>
                                </div>

                                <div className="col-sm-12">
                                    <div className="tab-overflow">
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li><Link to={'/bills/airtime'}>Airtime</Link></li>
                                                <li><Link to={'/bills/data'}>Data</Link></li>
                                                <li><a href="bills.html">Bills Payment</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                           
                                
                            </div>
                        </div>

                        <Route path={'/bills/airtime'} component= {Airtime}/>
                        <Route path={'/bills/data'} component= {Data}/>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default Bills;