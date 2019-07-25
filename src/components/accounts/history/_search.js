import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/scss/datepicker.scss"
import "../../../assets/img/small-calendar.svg"

const search = (props) => {
    return (
        <div className="al-card">
            <h4 className="m-b-20">Transaction Filter</h4>
            <div className="col-sm-12">
            <form onSubmit={props.filter}>
                <div className="row">
                    
                        <div className="col-md-6 input-ctn">
                            <label>Search by Keyword</label>
                            <input type="text" onChange={props.search}/>
                        </div>
                        <div className="col-md-3 input-ctn">
                            <label>Start Date</label>
                            <DatePicker placeholderText="" selected={props.start}
                                onChange={props.changeStart}
                                //onChangeRaw={(e) => this.handleChange(e)}
                                dateFormat="d MMMM, yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="col-md-3 input-ctn">
                            <label>End Date</label>
                            <DatePicker placeholderText="" selected={props.end}
                                onChange={props.changeEnd}
                                //onChangeRaw={(e) => this.handleChange(e)}
                                dateFormat="d MMMM, yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                            />
                        </div>
                </div>
                </form>

            </div>
            <button className="btn-alat m-t-10" onClick={props.searchFilter} style={{ width: "100%" }}>Search</button>
        </div>
    )
}

export default search;