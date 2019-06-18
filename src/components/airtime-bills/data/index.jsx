import React from 'React';
import {Link} from 'react-router-dom';
import {formatAmountNoDecimal} from '../../../shared/utils';

import dataLogo from '../../../assets/img/phone-data.svg';
import airtelLogo from '../../../assets/img/airtel.svg';
import mtnLogo from '../../../assets/img/mtn.svg';
import gloLogo from '../../../assets/img/glo.svg';
import NmobileLogo from '../../../assets/img/9mobile.svg';


var image = null;

const index = (props) => {
 

    let index = (
        <div className="col-sm-12">
        <div className="max-600 m-t-40">
            <center>
                <img src={dataLogo} className="m-b-30" alt="Data Logo"/>
                <p className="grey-text no-paylink">{props.isFetching ? "Loading saved beneficiaries..." : "No saved data purchase"}</p>
                <Link to={'/bills/data/buy'} className="btn-alat">Buy Data</Link>
            </center>
        </div>
    </div>);

    if (props.beneficiaries.length > 0) {
        index = (
            <div className="pt-3">
            <div className="col-sm-12 pb-4">
					<div className="row">
						<div className="col-sm-12">
                        <Link to={'/bills/data/buy'} className="btn-alat">Buy Data</Link>
						</div>
					</div>
			</div>
            <div className="col-sm-12">
                <div className="row">

                    {
                        props.beneficiaries.map((beneficiary, counter) => {
                            switch(beneficiary.BillerName) {
                                case ('MTNN'):
                                    image = <img src={mtnLogo} alt="mtnlogo" />;
                                    break;
                                case ('AIRTEL'):
                                    image = <img src={airtelLogo} alt="airtelLogo" />;
                                    break;
                                case ('GLO'):
                                    image = <img src={gloLogo} alt="gloLogo" />;
                                    break;
                                case ('9MOBILE'):
                                    image = <img src={NmobileLogo} alt="9mobileLogo" />;
                                    break;
                                default:
                                    image = <img src={airtelLogo} alt="airtelLogo" />;
                            }
            
                            return (
                                <div className="col-sm-12 col-md-4" key={counter+1}>
                                    <div className="al-card airtime-card">
                                        <div className="clearfix">
                                            <div className="network-img">
                                                {image}
                                            </div>
                                            <div className="all-info">
                                                <p className="line-price">{beneficiary.BillerAlias} <span className="price">{"N"+formatAmountNoDecimal(beneficiary.Amount)}</span></p>
                                                <p className="num-ref">{beneficiary.PhoneNumber}<span className="price"><a href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
            </div>);

    }
    

    return index;
};


export default index;

