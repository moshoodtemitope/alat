import React from 'react'

class SelectAcount extends React.Component {

    render() {

        render(
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="max-600">
                            <div class="al-card no-pad">
                                <h4 class="m-b-10 center-text hd-underline">Buy Airtime</h4>
                                <div class="transfer-ctn">
                                    <form>
                                        <div class="al-card no-pad">
                                            <div class="trans-summary-card">
                                                <div class="name-amount clearfix">
                                                    <p class="pl-name-email">Airtime Recharge<span>Airtel - 08020690101 </span></p>
                                                    <p class="pl-amount">N2,000</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="input-ctn">
                                            <label>Select an account to debit</label>
                                            <select>
                                                <option>ALAT Account - N56,902.56</option>
                                                <option>Current Account - N56,902.56</option>
                                                <option>Domiciliary Account - $30</option>
                                            </select>
                                        </div>

                                        <div class="input-ctn">
                                            <label>Enter ALAT PIN</label>
                                            <input type="password" />
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-12">
                                                <center>
                                                    <input type="button" value="Buy Airtime" class="btn-alat m-t-10 m-b-20 text-center" />
                                                </center>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <center>
                                <a href="add-beneficiary.html" class="add-bene m-t-50">Go Back</a>
                            </center>
                        </div>
                    </div>
                </div>
            </div>);
    }


}

export default SelectAcount;