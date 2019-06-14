
import React, { Component } from 'react'

class Airtime extends Component {

    render() {
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600 m-t-40">
                            <center>
                                <img src="img/phone-airtime.svg" className="m-b-30" />
                                <p className="grey-text no-paylink">No saved airtime recharge</p>

                                {/* <a href="send-contact3.html"><button class="btn-alat">Buy Airtime</button></a> */}
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Airtime;