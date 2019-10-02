import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';
import successLogo from '../../../assets/img/success.svg';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/cardless-withdrawal/export';

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
    }

    goToDashboard = (event) => {
        event.preventDefault();
        this.props.toDashboardCardless();
    }

    render() {
        var success;
        if (this.props.cwInfo != null && this.props.pageState == 2) {
            success = (
                <div class="col-sm-12">
					<div class="row">
						<div class="col-sm-12">
				  			<div class="width-500">
				  				<div class="al-card">
				  					<center>
				  						<img src={successLogo} class="m-b-30 m-t-20" />
				  					</center>
				  					<h4 class="center-text red-text">Paycode Created</h4>

				  					<div class="m-t-20 width-400">
					  					<p class="m-b-30 f-s-16 success-span-text">You can use this code on any ATM around you</p>

					  					<div class="input-ctn">
						                    <input type="text" value={this.props.paycode} disabled class="center-text bold-text" />
						                </div>

						                <div class="row">
						                	<div class="col-sm-12">
						                		<center>
                                                <button onClick={this.goToDashboard} class="btn-alat m-t-10 m-b-20 text-center">Done</button>
							                	</center>
						                	</div>
						                </div>
							        </div>
				  				</div>
				  			</div>
				  		</div>
			  		</div>
				</div>
            );
        }else if(this.props.pageState == 0) {
            this.props.resetPageState();
            // console.log("going to dashboard post");
            success = <Redirect to="/dashboard" />
        }else{
            // console.log("success to not allowed ");
            success = <Redirect to="/cardless-withdrawal/create" />
        }

        return success;
    }
}

const mapStateToProps = state => {
    return {
        cwInfo: state.cardless_reducer.cwInfo,
        pageState: state.cardless_reducer.pageState,
        alert: state.alert,
        paycode: state.cardless_reducer.response.PayCode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPageState: () => dispatch(actions.resetPageState()),
        toDashboardCardless: () => dispatch(actions.clearCardlessData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
