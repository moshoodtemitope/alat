import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


class AtmLocator extends Component{

    render(){
        return(
            <div className="row">
                <div className="col-sm-12">
                    <p className="page-title">Talk to Us</p>
                </div>
                <div className="col-sm-12">
                    <div className="tab-overflow">
                        <div className="sub-tab-nav">
                            <ul>
                                <li className="active"><NavLink to="/talk-to-us"> Talk To Us</NavLink></li>
                                <li><NavLink to="/talk-to-us/atm-locator">ATM Locator</NavLink></li>
                                <li><NavLink to="/talk-to-us/report-error">Report An Error</NavLink></li>
                            
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">ATM Locator</h4>
                                    
                                    <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>

                                        <div style={{marginRight:5}}> 
                                            <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Atm Locations</button>
                                        </div>
                                        <div style={{marginLeft:5}}>
                                            <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Bank Branches</button>

                                        </div>




                                    </div>
                                    <div style={{marginLeft:25, marginRight:25}}className="form-group"> 
                                        <input  className="form-group"
                                            type="text" 
                                            autoComplete="off" 
                                            className="form-control" 
                                             placeholder="Search..."/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AtmLocator