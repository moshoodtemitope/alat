import * as React from "react";
import {history} from "../../_helpers";
import {alertActions, userActions} from "../../_actions";
import OnboardingContainer from "../../onboarding/Container";
import TransferContainer from "../TransferComponent";
import InnerContainer from "../../shared/templates/inner-container";
import {Router} from "react-router";
import * as utils from "../../shared/utils";
import {getOnboardingPriority} from "../../dashboard/actions";
import {FETCH_BANK_FAILURE, FETCH_BANK_PENDING, FETCH_BANK_SUCCESS, getBanks} from "./actions";
import connect from "react-redux/es/connect/connect";


class NewTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        // this.state = {
        //     email: '',
        //     password: ''
        // };
        // const {dispatch} = this.props;
        // history.listen((location, action) => {
        //     dispatch(alertActions.clear());
        // });
        // dispatch(userActions.logout());
        //
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchBanks();
    }


    fetchBanks(){
        const { dispatch } = this.props;
        dispatch(getBanks());
    }

    renderElement(banks){
        console.log(banks.transfer);
        // let banksStatus = banks.transfer.banksList.response;
        // console.log(banksStatus);
        console.log(banks.transfer.bankList);
        // let status = banks.transfer.bankList;
        // let banksList = banks.transfer.bankList.data;//.type
        let status = banks.transfer.bankList.data;
        console.log(status);
        switch(status.type){
            case FETCH_BANK_PENDING:
                return (
                    <select disabled>
                        <option>Fetching Banks...</option>
                    </select>
                );
            case FETCH_BANK_SUCCESS:
                let banksList = status.response;
                return(
                    <select>
                        {banksList.map(function(bank, code){
                            return(
                                <option key={code} value={bank.BankCode}>{bank.BankName}</option>
                            );
                        })}
                    </select>
                );
            case FETCH_BANK_FAILURE:
                this.showRetry();
                return(
                    <select disabled>
                        <option>Unable to load banks</option>
                    </select>
                );
        }
    }

    showRetry(){
        return <button onClick={this.fetchBanks.bind(this)}>Retry</button>;
    }

    render() {
        // const {email, password, submitted, error} = this.state;
        // const {loggingIn, alert} = this.props;
        let banks = this.props;
        console.log(this.props);

        // this.fetchBanks(banks);
        return (
            <Router history={history}>
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
                                                    <form>

                                                        <div className="input-ctn">
                                                            <label>Select a bank</label>
                                                            {this.renderElement(banks)}
                                                        </div>

                                                        <div className="input-ctn">
                                                            <label>Account Number</label>
                                                            <input type="tel"/>
                                                        </div>


                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <center>
                                                                    <input type="button" value="Get Details"
                                                                           className="btn-alat m-t-10 m-b-20 text-center"/>
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
            </Router>
        );
    }
}


function mapStateToProps(state){
    console.log(state.transfer);
    return {
        transfer: state.transfer
    };
}

export default connect(mapStateToProps)(NewTransfer);


// export default NewTransfer;