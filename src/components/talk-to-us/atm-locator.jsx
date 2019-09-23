import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import atmImage from '../../assets/img/atmlocator.svg'
import {connect} from 'react-redux';
import {talktoUsConstant} from '../../redux/constants/talk-to-us/talk-to-us.constant';
import * as actions from "../../redux/actions/talk-to-us/talk-to-us-action";
import './talk-to-us.css'




class AtmLocator extends Component{
    constructor(props){
        super(props)
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            visible:false


        }
    }
    componentDidMount(){
        this.fetchAtmBranches()


    }
    fetchAtmBranches(){
        const {dispatch}=this.props
        dispatch(actions.GetBankLocator(this.state.user.token))
    }
    showResult=() =>{
        this.setState({ visible: true });
    }
   
    renderAtmLocations(){

        let props = this.props;
        let get_bank_branch = props.get_bank_branch;
        if(get_bank_branch.message === talktoUsConstant.GET_BANK_BRANCHES_PENDING){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>Loading Atm Locations...</h4>
            );
        }
        else if(get_bank_branch.message === talktoUsConstant.GET_BANK_BRANCHES_SUCCESS){
                let atmlocations = get_bank_branch.data.response.Atms;
                        console.log('=========',atmlocations)
                return(
                    <div className="location">
                    
                    { atmlocations.map((atm, index)=>(
                           
                           <div className="location">
                                <div className="location-icon center-align"><img src={atmImage} className="mdi-map-marker"></img></div>
                                <div className="location-details">
                                    <p className="landmark">{atm.Area}</p>
                                    <p className="full-address">{atm.Address}</p>
                                </div>
                            </div>
                           

                    ))}
                    
                </div>       
                
                );
            }
            else if(get_bank_branch.message === talktoUsConstant.GET_BANK_BRANCHES_FAILURE){
             


               
                return(
                   
                    <h4>{get_bank_branch.data.error}</h4>

                      
                );
                    // user has goals
                       
            } else{
                return(
                   <div>
                       <p>Nothing to show</p>
                   </div>

                );
            }

        }


        renderBankBranch(){
        let props = this.props;
        let get_bank_branch = props.get_bank_branch;
        if(get_bank_branch.message === talktoUsConstant.GET_BANK_BRANCHES_PENDING){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>Loading Bank Branch Locations...</h4>
            );
        }
        else if(get_bank_branch.message === talktoUsConstant.GET_BANK_BRANCHES_SUCCESS){
                let atmlocations = get_bank_branch.data.response.Branches;
                        console.log('=========',atmlocations)
                return(
                    <div className="location">
                    
                    { atmlocations.map((atm, index)=>(
                           
                           <div className="location">
                                <div className="location-icon center-align"><img src={atmImage} className=".mdi-map-marker"></img></div>
                                <div className="location-details">
                                    <p className="landmark">{atm.BranchName}</p>
                                    <p className="full-address">{atm.Address}</p>
                                </div>
                            </div>
                           

                    ))}
                    
                </div>       
                
                );
            }
            else if(get_bank_branch.message === talktoUsConstant.GET_BANK_BRANCHES_FAILURE){
             


               
                return(
                   
                    <h4>{get_bank_branch.data.error}</h4>

                      
                );
                    // user has goals
                       
            } else{
                return(
                   <div>
                       <p>Nothing to show</p>
                   </div>

                );
            }

        

        }
        renderResult(){
        }
    

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
                                            <button type="submit" className="btn m-t-10 m-b-20 text-center " onClick={() => this.setState({visible:false})}>Atm Locations</button>
                                        </div>
                                        <div style={{marginLeft:5}}>
                                            <button type="submit" className="btn m-t-10 m-b-20 text-center" onClick={this.showResult}>Bank Branches</button>

                                        </div>




                                    </div>
                                    <div style={{marginLeft:25, marginRight:25}}className="form-group"> 
                                        <input  className="form-group"
                                            type="text" 
                                            autoComplete="off" 
                                            className="form-control" 
                                             placeholder="Search..."/>
                                    </div>
                                    {/* <div>


                                    </div> */}
                                    <div>
                                        <div className="location">
                                            {
                                                this.state.visible ?this.renderBankBranch() :this.renderAtmLocations()

                                            }
                                      

                                            
                                        </div>
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
const mapStateToProps = state => ({
    alert:state.alert,
    talk_to_us:state.talk_to_us,
    reportError:state.reportError,
    get_bank_branch:state.get_bank_branch,
    get_page_data:state.get_page_data,

});

export default connect(mapStateToProps) (AtmLocator)