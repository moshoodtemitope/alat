import React, { Fragment } from "react";
import { connect } from "react-redux";
import "../../assets/css/loan.css";
import Select from "react-select";
import DatePicker from "react-datepicker";

import salaryLoan from "../../assets/img/salary_based_grey.svg";
import Rectangle from "../../assets/img/Rectangle.svg";
const selectedTime = [
    { value: "Film House, Lakki", label: "Film House, Lakki" },
    { value: "Film House, WEMA", label: "Film House WEMA" }
];

class Moviedetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieLocation: "",
            movieDay: "",
            adultNumber: 1,
            studentNumber: 1,
            childNumber: 1,
            adultAmount: 2500,
            studentAmount: 2500,
            childAmount: 2500,
            initialAdultAmount: 2500,
            initialStudentAmount: 2500,
            initialChildAmount: 2500
        };
    }

    handleSelectLocation = item => {
        this.setState({
            movieLocation: item.value
        });
    };

    handleSelectMovieDay = movieDay => {
        this.setState({
            movieDay
        });
    };

    increaseAdult = () => {
        let { adultNumber } = this.state;
        this.setState(
            {
                adultNumber: adultNumber + 1
            },
            () =>
                this.setState({
                    adultAmount: this.state.initialAdultAmount * this.state.adultNumber
                })
        );
    };

    increaseStudent = () => {
        this.setState({ studentNumber: this.state.studentNumber + 1 }, () =>
            this.setState({
                studentAmount:
                    this.state.initialStudentAmount * this.state.studentNumber
            })
        );
    };

    increaseChild = () => {
        this.setState({ childNumber: this.state.childNumber + 1 }, () =>
            this.setState({
                childAmount: this.state.initialChildAmount * this.state.childNumber
            })
        );
    };

    decreaseAdult = () => {
        let { adultNumber } = this.state;
        if (adultNumber !== 1)
            this.setState({ adultNumber: adultNumber - 1 }, () =>
                this.setState({
                    adultAmount: this.state.initialAdultAmount * this.state.adultNumber
                })
            );
    };

    decreaseStudent = () => {
        let { studentNumber } = this.state;
        if (studentNumber !== 1)
            this.setState({ studentNumber: studentNumber - 1 }, () =>
                this.setState({
                    studentAmount:
                        this.state.initialStudentAmount * this.state.studentNumber
                })
            );
    };

    decreaseChild = () => {
        let { childNumber } = this.state;
        if (childNumber !== 1)
            this.setState({ childNumber: childNumber - 1 }, () =>
                this.setState({
                    childAmount: this.state.initialChildAmount * this.state.childNumber
                })
            );
    };

    render() {
        let {
            movieLocation,
            movieDay,
            adultNumber,
            studentNumber,
            childNumber
        } = this.state;

        return (
            <div className="max-750">
                <div className="loan-header-text loan">
                    <h4 className="text-black">Loans</h4>

                    <p className="m-t-20 text-black">Select a Loan type</p>
                </div>
                <div className="al-card fund-al-card no-pad">
                    <div
                        style={{
                            marginTop: 18,
                            textAlign: "center",
                            fontSize: 18,
                            marginBottom: 16,
                            fontFamily: "proxima_novaregular",
                            color: "#4D4D4D"
                        }}
                    >
                        Buy Movie Ticket
                    </div>
                    <div style={{ border: "1px solid rgba(205, 205, 205, 0.32)" }} />
                    <div
                        className="row"
                        style={{
                            marginLeft: 50,
                            marginTop: 20,
                            marginRight: 50
                        }}
                    >
                        <div className="col-sm-3">
                            <i className="toshow">
                                <img
                                    src={Rectangle}
                                    style={{
                                        width: 168,
                                        height: 226
                                    }}
                                />
                            </i>
                        </div>
                        <div
                            className="col-sm-9"
                            style={{ fontSize: 26, color: "#444444", paddingLeft: 55 }}
                        >
                            <div style={{ fontFamily: "proxima_novaregular", marginBottom: 21 }}>
                                Astroy Boy
                            </div>
                            <div
                                style={{
                                    fontFamily: "proxima_novaregular",
                                    fontSize: 12,
                                    color: "#9C9C9C",
                                    marginTop: 21
                                }}
                            >
                                Synopsis
                            </div>
                            <div
                                style={{
                                    fontFamily: "proxima_novaregular",
                                    fontSize: 12,
                                    color: "#9C9C9C",
                                    marginTop: 8,
                                    // fontFamily: "Proxima Nova"
                                }}
                            >
                                On this day, the moon came out and never went back. Movie
                                description shouldn’t be too long. On this day, the moon came
                                out and never went back. Movie description shouldn’t be too
                                long. On this day, the moon came out and never went back. Movie
                                description shouldn’t be too long. On this day, the moon came
                                out and never went back. Movie description shouldn’t be too long
                            </div>
                            <div>
                                <i className="toshow">
                                    <img
                                        src={salaryLoan}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            marginTop: 5,
                                            borderRadius: 50,
                                            paddingRight: 9
                                        }}
                                    />
                                </i>
                                <span
                                    style={{
                                        fontFamily: "proxima_novaregular",
                                        fontSize: 12,
                                        color: "#9C9C9C"
                                    }}
                                >
                  2hrs 45mins
                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="row"
                        style={{
                            marginRight: 69,
                            marginLeft: 69,
                            // marginTop: 20,
                            marginTop: 37
                        }}
                    >
                        <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
                            <label>Select Location</label>
                            <Select
                                type="text"
                                options={selectedTime}
                                name=""
                                onChange={this.handleSelectLocation}
                                value={movieLocation.label}
                            />

                            <label style={{ marginTop: 16 }}>Select Day</label>
                            <DatePicker
                                className="form-control"
                                se
                                // selected={movieDay}
                                placeholder="June 31, 2019"
                                dateFormat=" MMMM d, yyyy"
                                placeholderText="Sunday 18-08-2019 | 14:00"
                                showMonthDropdown
                                showYearDropdown
                                onChange={this.handleSelectMovieDay}
                                dropdownMode="select"
                                showTimeInput
                                timeFormat="HH:MM"
                            />
                            <div
                                className="row"
                                style={{
                                    marginTop: 23,
                                    marginLeft: 0,
                                    justifyContent: "space-between"
                                }}
                            >
                                <div className="col-sm-4" style={{ paddingRight: 30 }}>
                                    <div style={{ marginLeft: -13 }}>Adult</div>
                                    <div
                                        className="row"
                                        style={{
                                            border: "1px solid #CCCCCC",
                                            borderRadius: 3,
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <div
                                            onClick={this.decreaseAdult}
                                            style={{
                                                width: 60,
                                                height: 46,
                                                cursor: "pointer",
                                                backgroundColor: "#F5F5F5",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                fontSize: 30
                                            }}
                                        >
                                            -
                                        </div>
                                        <div
                                            style={{
                                                width: 60,
                                                height: 46,
                                                backgroundColor: "white",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 14
                                            }}
                                        >
                                            {adultNumber}
                                        </div>
                                        <div
                                            onClick={this.increaseAdult}
                                            style={{
                                                width: 60,
                                                height: 46,
                                                cursor: "pointer",
                                                backgroundColor: "#F5F5F5",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 8,
                                                fontSize: 20
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            marginTop: 10,
                                            color: "#000000",
                                            fontFamily: "proxima_novaregular",
                                            fontWeight: "bold",
                                            fontSize: 14
                                        }}
                                    >
                                        {this.state.adultAmount}
                                    </div>
                                </div>
                                {/* student */}
                                <div className="col-sm-4" style={{ paddingRight: 30 }}>
                                    <div style={{ marginLeft: -13 }}>Student</div>
                                    <div
                                        className="row"
                                        style={{
                                            border: "1px solid #CCCCCC",
                                            borderRadius: 3,
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <div
                                            onClick={this.decreaseStudent}
                                            style={{
                                                cursor: "pointer",
                                                width: 60,
                                                height: 46,
                                                backgroundColor: "#F5F5F5",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                fontSize: 30
                                            }}
                                        >
                                            -
                                        </div>
                                        <div
                                            style={{
                                                width: 60,
                                                height: 46,
                                                backgroundColor: "white",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 14
                                            }}
                                        >
                                            {studentNumber}
                                        </div>
                                        <div
                                            onClick={this.increaseStudent}
                                            style={{
                                                width: 60,
                                                height: 46,
                                                cursor: "pointer",
                                                backgroundColor: "#F5F5F5",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 8,
                                                fontSize: 20
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            marginTop: 10,
                                            color: "#000000",
                                            fontFamily: "proxima_novaregular",
                                            fontWeight: "bold",
                                            fontSize: 14
                                        }}
                                    >
                                        {this.state.studentAmount}
                                    </div>
                                </div>
                                {/* child */}
                                <div className="col-sm-4" style={{ paddingRight: 30 }}>
                                    <div style={{ marginLeft: -13 }}>Child</div>
                                    <div
                                        className="row"
                                        style={{
                                            border: "1px solid #CCCCCC",
                                            borderRadius: 3,
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <div
                                            onClick={this.decreaseChild}
                                            style={{
                                                width: 60,
                                                height: 46,
                                                cursor: "pointer",
                                                backgroundColor: "#F5F5F5",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                fontSize: 30
                                            }}
                                        >
                                            -
                                        </div>
                                        <div
                                            style={{
                                                width: 60,
                                                height: 46,
                                                backgroundColor: "white",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 14
                                            }}
                                        >
                                            {childNumber}
                                        </div>
                                        <div
                                            onClick={this.increaseChild}
                                            style={{
                                                width: 60,
                                                height: 46,
                                                cursor: "pointer",
                                                backgroundColor: "#F5F5F5",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 8,
                                                fontSize: 20
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            marginTop: 10,
                                            color: "#000000",
                                            fontFamily: "proxima_novaregular",
                                            fontWeight: "bold",
                                            fontSize: 14
                                        }}
                                    >
                                        {this.state.childAmount}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="row"
                                style={{
                                    justifyContent: "center",
                                    marginTop: 23,
                                    marginBottom: 39
                                }}
                            >
                                <button
                                    style={{
                                        border: "0px solid #AB2656",
                                        height: 45,
                                        width: 200,
                                        backgroundColor: "#AB2656",
                                        color: "white",
                                        borderRadius: 3,
                                        cursor: "pointer"
                                    }}
                                >
                                    Buy Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

export default connect(mapStateToProps)(Moviedetails);
