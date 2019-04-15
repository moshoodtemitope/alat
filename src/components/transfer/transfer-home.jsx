import * as React from "react";
// import * as utils from "../../shared/utils";
import {Fragment} from "react";
import {connect} from "react-redux";
import InnerContainer from "../../shared/templates/inner-container";
import TransferContainer from "./container";
import {getBeneficiaries} from "../../redux/actions/transfer/cash-transfer.actions";
import {
    FETCH_TRANSFER_BENEFICIARY_PENDING, FETCH_TRANSFER_BENEFICIARY_SUCCESS, FETCH_TRANSFER_BENEFICIARY_FAILURE
} from "../../redux/constants/transfer.constants";
import "../../assets/css/selectize.default.css";
import Select from 'react-select';
import {NavLink, Route} from "react-router-dom";
import NewTransfer from "./cash-transfer/new-transfer";
import {Switch} from "react-router";

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ];

const options = [
];

class TransferHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            hasBeneficiaries: false,
            selectedOption: null,
        };
    }

    componentDidMount() {
        this.getBeneficiaries();
        // this.fetchBanks();
    }

    getBeneficiaries(){
        const { dispatch } = this.props;
        dispatch(getBeneficiaries(this.state.user.token));
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    renderBeneficiaries(){
        console.error(this.props);
        let props = this.props;
        let beneficiaryListStatus = props.beneficiaries.beneficiaries;
        console.error(beneficiaryListStatus);
        switch(beneficiaryListStatus){
            case FETCH_TRANSFER_BENEFICIARY_PENDING:
                return (
                    <select disabled>
                        <option>Fetching Beneficiaries...</option>
                    </select>
                );
            case FETCH_TRANSFER_BENEFICIARY_SUCCESS:
                let beneficiaries = props.beneficiaries.beneficiaries_data.response.data;
                console.log(beneficiaries);
                for(var ben in beneficiaries){
                    console.log(beneficiaries[ben].AccountNumber);
                    options.push({value: beneficiaries[ben].AccountNumber, label: beneficiaries[ben].Nickname});
                }
                console.log(options);
                const { selectedOption } = this.state;

                return(
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    />

                    // <select>
                    //     {beneficiaries.map(function(beneficiary, accountNumber){
                    //         return(
                    //             <option key={accountNumber} value={beneficiary.AccountNumber}>{beneficiary.Nickname}</option>
                    //         );
                    //     })}
                    // </select>
                );
            case FETCH_TRANSFER_BENEFICIARY_FAILURE:
                this.showRetry();
                return(
                    <select disabled>
                        <option>Unable to load beneficiaries</option>
                    </select>
                );
        }
    }

    showRetry(){
        return <button onClick={this.getBeneficiaries.bind(this)}>Retry</button>;
    }

    render() {
        // const {email, password, submitted, error} = this.state;
        // const {loggingIn, alert} = this.props;
        let props = this.props;
        // let banks = props.bankList;
        console.log(props);

        // this.fetchBanks(banks);
        return (
            <Fragment>
                <InnerContainer>
                    <TransferContainer>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Send Money</p>
                            </div>

                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                            <li><a href="accounts.html" className="active">Bank Transfer</a></li>
                                            <li><a href="statement.html">Send To Contacts</a></li>
                                            <li><a href="#">Cardless Withdrawal</a></li>
                                            <li><a href="#">FX Transfer</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">


                                            <div className="al-card no-pad">
                                                <h4 className="m-b-10 center-text hd-underline">New Beneficiary</h4>

                                                <div className="transfer-ctn">
                                                    <p className="m-b-20">Select a beneficiary below or click the button to start a new transfer.</p>

                                                    <form>
                                                        <div className="input-ctn">
                                                            <label>Select an beneficiary</label>
                                                            {this.renderBeneficiaries()}
                                                            {/*<select>*/}
                                                                {/*<option value="">Select Beneficiary</option>*/}
                                                                {/*<option>Jaden Smith - Zenith Bank - 0022345678</option>*/}
                                                                {/*<option>Jimoh Aluko - Access Bank - 0022874678</option>*/}
                                                                {/*<option>Femi Otedola - GT Bank - 0148733733</option>*/}
                                                            {/*</select>*/}
                                                        </div>


                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <center>
                                                                    <input type="button" value="Next"
                                                                           className="btn-alat m-t-10 m-b-20 text-center"/>
                                                                    <NavLink to="/transfer/new-transfer" className="add-bene">Start a New Transfer</NavLink>
                                                                </center>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>



                                            <center>
                                                <a href="add-beneficiary.html" className="add-bene m-t-50">Go Back</a>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransferContainer>
                </InnerContainer>
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    // console.error(state);
    return {
        beneficiaries: state.transfer_beneficiaries
    };
}

export default connect(mapStateToProps)(TransferHome);