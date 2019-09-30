import * as React from "react";
import {Fragment} from "react";
import {NavLink, Route} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as action from '../../../redux/actions/savings/group-savings/group-savings-actions';
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import {history} from '../../../_helpers/history';
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';


class JoinAGroup extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            referralCode: null,
            warning: 'notValid',
            warningStyle: 'notValid'
        }
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({'warningStyle': 'valid'});
        }, 1);
    }

    handleReferralCode = (event) => {
        this.setState({'warningStyle': 'valid'}); // remove warning sign.
        let container = event.target.value.split('');
        let count = 0;
        container.map(() => {
           if(count == 8){
                this.setState({'warning': 'valid'});
                this.setState({'warningStyle': 'valid'});
           }

           if(count != 8){
               this.setState({'warningStyle': 'notValid'});
               this.setState({'warning': 'notValid'});
           }
                
           count++;
        });

        if(count != 9)
               return;
        
        this.setState({
            'referralCode': event.target.value
        });
    }

    FindAGroup = () => {
       if(this.state.warning != 'valid')
           return;
    //    console.log(this.state.warning);
       const data = {
           referralCode: this.state.referralCode
       }

       const data2 = {
           data: this.state.referralCode,
           type: 'refferalCode'
       }
    //    console.log(data2)
    //    console.log(data);
       //return;
       this.props.dispatch(actions.refferalCode(data2))
       this.props.dispatch(action.findGroup(this.state.user.token, data));
       
    }

    NavigateToSummary = () => {
        // console.log(this.state.referralCode);
        if(this.state.referralCode.split('').length != 10)
             this.setState({'warningStyle': 'notValid'});   // display warning sign
        if(this.state.warning == 'notValid')
            return; 
        this.props.dispatch(actions.refferalCode(this.state.referralCode));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.FindAGroup();
        //this.NavigateToSummary();
        return null;
    }

    NavigateToGroupSavings = () => {
        
            history.push('/savings/activityDashBoard');
        
    }


    render() {
        const {selectedAccount} = this.state;
        return (
            <Fragment>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a href="#">Goals</a></li>
                                        </NavLink>
                                            <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                            {/* <li><a href="#">Investments</a></li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {this.props.alert && this.props.alert.message &&
                            <div style={{width: "100%"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            } 
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Join A Group</h4>

                                            <form onSubmit={this.handleSubmit}>
                                            
                                                <div className="form-group instruction">
                                                    <h6></h6>
                                                </div>
                                                <div className='form-row'>
                                                    <div className='form-group col-md-12 joinGroup'>
                                                        <h6>Enter Group Code</h6>
                                                        <input type="text" placeholder='GPEFA34UE' id='enterCode' onChange={this.handleReferralCode}/>
                                                        <p id={this.state.warningStyle}>9 Characters Only</p>
                                                    </div>
                                                </div>
                                               
                                                <div className="form-row">
                                                   
                                                    <div className="form-group col-md-12 butLeft joinButton">
                                                       <center>
                                                                 <button disabled={this.props.findGroup.message === GROUPSAVINGSCONSTANT.FIND_GROUP} type='submit' ref={element => this.formSubmitButton = element}>
                                                                 {this.props.findGroup.message ===GROUPSAVINGSCONSTANT.FIND_GROUP ? 'Processing...':'Join Group'}
                                                                 </button>
                                                       </center>
                                                    </div>
                                                   
                                                </div>
                                            </form>
                                        </div>
                                       </div>
                                      </div>
                                </div>
                            </div>
                        </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state){
   return {
    // groupSavingsEsusu: state.getGroupSavingsEsusu,
    findGroup:state.findGroup,
    joinGroup:state.joinGroup,
    groups: state.customerGroup.data,
    alert:state.alert
   }
}

export default connect(mapStateToProps)(JoinAGroup);
