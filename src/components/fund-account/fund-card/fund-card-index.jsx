import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';
import imgWallet from '../../../assets/img/wallet-3.svg';

class FundCardIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),

        };
        //this.init();
    }

    init() {
        this.props.dispatch(actions.getTokenizedCards(this.state.user.token));
    }

    componentDidMount() {
        this.init();
    }

    emptyCardList() {
        if (this.props.cards.get_card_status === fundAccountConstants.GET_TOKENIZED_CARDS_SUCCESS)
            return (
                <Fragment>
                    <div className="al-card no-pad">
                        <h4 className="m-b-10 center-text hd-underline">Fund from card</h4>
                        <div className="max-600 m-t-40">
                            <center>
                                <img src={imgWallet} className="m-b-30" />
                                <p className="grey-text no-paylink">You do not have any cards saved yet</p>
                            </center>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <center>
                                    <Link to={"/fund/card/details"}><button className="btn-alat m-t-10 m-b-20 text-center" type="submit">New Card</button></Link>
                                </center>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
    }


    render() {
        return (

            <Fragment>

            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        cards: state.fundAccountReducerPile.getTokencards
    };
}
export default connect(mapStateToProps)(FundCardIndex);