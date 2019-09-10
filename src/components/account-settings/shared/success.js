import React from 'react';
import {Link} from 'react-router-dom';
import successLogo from '../../../assets/img/success.svg';

const success = (props) => (
    <div className="col-sm-12">
        <div className="row">
            <div className="col-sm-12" >
                <div className="max-600">
                    <div className="al-card py-5">
                        <center>
                            <img src={successLogo} className="m-b-30 m-t-40" alt="Success" />
                        </center>
                        <h4 className="center-text red-text">{props.message}</h4>
                        <div className="row m-t-30 m-b-20">
                            <div className="col-sm-12">
                                <center>
                                   {props.isActionButton ? <button onClick={props.clicked} class="btn-alat m-t-10 m-b-20 text-center">Done</button> : <Link to={props.homeUrl} class="btn-alat m-t-10 m-b-20 text-center">Done</Link>} 

                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default success;