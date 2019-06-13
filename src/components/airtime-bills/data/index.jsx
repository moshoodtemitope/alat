import React from 'React';
import dataLogo from '../../../assets/img/phone-data.svg'


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
    if (props.hasBeneficiaries){
        index = <center>Has beneficiarie</center>;
    }
    return index;
};
export default index;