import React, { Component } from 'React';
import { Link } from 'react-router-dom';

import Select from 'react-select';
import {alertActions} from "../../../redux/actions/alert.actions";
import { connect } from 'react-redux';


import * as actions from '../../../redux/actions/bills/export';

const pattern = /^\d+$/;

class Billers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billersCategory: null,
            selectedCategory: null,
            selectedBiller: null,
            selectedItem: null,
            billersOptions: [],
            isValid: true,
            monitorItem: {},
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        if (this.props.billers.length < 1) {
            this.props.fetchBillersCategory(this.state.user.token);
        }
    }

    sortBillerCategory = (billersData) => {
        var categoryArray = [];
        billersData.map((biller) => categoryArray.push({value: biller.Category, label: biller.Category}));
        this.setState({billersCategory: categoryArray}, () => console.log(this.state.billersCategory));
    }

    sortBillerItems = (biller) => {
        this.props.fetchBillerItems(this.state.user.token, {Category : biller});
    }

    updateItems = () => {
        console.log("setting first item here")
        this.setState({selectedItem : this.props.billerItems[0]})
    }
    
    categoryChangedHandler = (selectedCategory) => {
        this.setState({isValid :true})
        if(this.state.selectedBiller == null){
            this.setState({ selectedCategory }, () => {this.setBillers(selectedCategory.value)});
            console.log(`Option selected:`, selectedCategory);
        }else{
            this.setState({ selectedBiller : null }, () => {this.categoryChangedHandlerALT(selectedCategory)} )
        }
    }

    categoryChangedHandlerALT = (selectedCategory) => {
        this.setState({ selectedCategory, selectedItem: null }, () => {this.setBillers(selectedCategory.value)});
        console.log(`Option selected:`, selectedCategory);
     }

    billerChangedHandler = (selectedBiller) => {
        this.setState({ selectedBiller, selectedItem: null}, () => this.sortBillerItems(selectedBiller.value))
    }

    itemChangedHandler = (selectedItem) => {
        this.setState({selectedItem}, () => console.log(selectedItem))
    }

    setBillers = (value) => {
        var billersToDisplay = [];
        var selected = this.props.billers.filter(biller => biller.Category == value);
        selected[0].Billers.map(data => billersToDisplay.push({value: data, label: data}));
        this.setState({billersOptions: billersToDisplay, selectedBiller: billersToDisplay[0]}, () => {this.sortBillerItems(this.state.billersOptions[0].value)})
    }

    onSubmitBillerData = (event) => {
        event.preventDefault();
        this.props.clearError();
        if(this.state.selectedCategory == null){
            this.setState({isValid : false})
            return;
        }
        let billsData = {
            category : this.state.selectedCategory.value,
            biller : this.state.selectedBiller.value,
            item : this.state.selectedItem,
        }
        console.log(billsData)
        this.props.setBillInfo(billsData);
        this.props.history.push('/bills/paybills/subscriber');
    }

    render() {
        const { selectedCategory, selectedBiller, billersCategory, billersOptions, selectedItem } = this.state;
        if(this.props.billers.length > 0 && this.state.billersCategory == null){
            this.sortBillerCategory(this.props.billers);
        }
            // if(selectedItem == null && selectedBiller != null && this.props.billerItems.length > 0){
            if(this.props.billerItems[0] != this.state.monitorItem && this.props.billerItems[0]){
                this.setState({monitorItem : this.props.billerItems[0]})
                this.updateItems();
            }
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Pay Bill</h4>
                                
                                <div className="transfer-ctn">
                                    <form>
                            
                                    {(this.props.alert.message) ?
                        <div className="info-label error">{this.props.alert.message} | <span onClick={() => {billersCategory ? this.props.fetchBillerItems(this.state.user.token, {Category : selectedBiller.value}) : this.props.fetchBillersCategory(this.state.user.token)}} style={{textDecoration:"underline", cursor:"pointer"}}>Click here to try again</span></div> : null
                        }
                                        <div className="input-ctn">
                                            <label>Select Bill Provider</label>
                                            <Select
                                                value={selectedCategory}
                                                onChange={this.categoryChangedHandler}
                                                options={billersCategory ? billersCategory : [] }
                                                placeholder={this.props.alert.message  ? "Failed. Please try again" : (billersCategory ? "Search..." : "Loading...")}
                                            />
                                           {!this.state.isValid ? <small className="text-danger">Please select a biller's category</small> : null}
                                        </div>

                                        <div className="input-ctn">
                                        <label>Select Bill</label>
                                        <Select
                                                value={selectedBiller != null ? selectedBiller : (billersOptions[0] ? billersOptions[0] : []) }
                                                onChange={this.billerChangedHandler}
                                                options={billersOptions}
                                                placeholder="---"
                                            />
                                        </div>

                                        <div className="input-ctn">
                                        <label>Select Package</label>
                                        <Select
                                                value={selectedItem != null ? selectedItem : (this.props.billerItems[0] ? this.props.billerItems[0] : []) }
                                                onChange={this.itemChangedHandler}
                                                options={this.props.billerItems.length > 0 ? this.props.billerItems : []}
                                                placeholder={this.props.alert.message  ? "Failed. Please try again" : (this.props.billerItems[0] ? "Select..." : (this.props.fetchingItems ? "Loading Packages..." : "---"))}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <button onClick={this.onSubmitBillerData} className="btn-alat m-t-10 m-b-20 text-center">Next</button>
                                                </center>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <center>
                                <Link to={'/bills/paybills'} className="add-bene m-t-50">Go Back</Link>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        billers: state.bills_reducer.billers,
        billsInfo : state.bills_reducer.billToPay,
        fetching: state.bills_reducer.isFetchingData,
        pageState: state.bills_reducer.pageState,
        alert: state.alert,
        fetchingItems: state.bills_reducer.isFetchingItems,
        billerItems: state.bills_reducer.billerItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setBillInfo: (data) => dispatch(actions.setBillInfo(data)),
        fetchBillersCategory: (token) => dispatch(actions.fetchBillersCategory(token)),
        // setState: () => dispatch(actions.pinVerificationTryAgain()),
        fetchBillerItems: (token, data) => dispatch(actions.fetchBillerItems(token, data)),
        clearError: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billers);
