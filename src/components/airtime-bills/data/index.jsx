import React from 'React';
import dataLogo from '../../../assets/img/phone-data.svg'
import airtelLogo from '../../../assets/img/phone-data.svg'


const index = (props) => {
    let  index = (<div className="col-sm-12">
    <div className="row">
        <div className="col-sm-12">
            <div className="max-600 m-t-40">
                <center>
                    <img src={dataLogo} className="m-b-30" alt="Data Icon"/>
                    <p className="grey-text no-paylink">No saved data purchase</p>
                    <button className="btn-alat">Buy Data</button>
                  </center>
            </div>
         </div>
    </div>
 </div>);
    if (props.hasbeneficiaries){
        index = null;
        props.beneficiaries.map((beneficiary, key) => (
            index += (<div className="col-sm-12">
        <div className="row">
            <div className="col-sm-12 col-md-4">
                  <div className="al-card airtime-card">
                      <div className="clearfix">
                          <div className="network-img">
                              <img src={airtelLogo} alt="airtellogo" />
                          </div>
                          <div className="all-info">
                              <p className="line-price">My MTN Line <span className="price">N5,000</span></p>
                              <p className="num-ref">07032414095<span className="price"><a href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a></span></p>
                          </div>
                      </div>
                  </div>
              </div>
              
              </div></div>)
        ));
        
    }
    return index;
};
export default index;