import * as React from 'react';
// import {BrowserRouter} from 'react-router-dom'
// import OnboardingRoute from "./routes";
import {Router} from "react-router";
import {history} from "../_helpers";
import MainRoute from "../shared/routes";
import OnboardingRoute from "../onboarding/routes";
import TransferRoute from "../transfer/routes";
import {connect, Provider} from "react-redux";
// import $ from "jquery";
// import * as bxSlider from "../../public/assets/js/jquery.bxslider";
// import {alertActions} from "../_actions/alert.actions";
// import MainRoute from "../shared/routes";


class MainContainer extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    //     const { dispatch } = this.props;
    //     history.listen((location, action) => {
    //         // clear alert on location change
    //         dispatch(alertActions.clear());
    //     });
    // }

    componentDidMount() {
        // let bxSlider = $.fn; //accessing jquery function
        // console.error(bxSlider);
        // let click = $.fn.click; //accessing jquery function

        // $(function(){
        //     $('.bxslider').bxSlider({
        //         mode: 'horizontal',
        //         slideWidth: 600
        //     });
        // });
        //
        // $('.saving-set').click(function(){
        //     $(this).next().fadeToggle();
        // });

    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <OnboardingRoute />
                    <MainRoute/>
                    <TransferRoute/>
                </div>
            </Router>
        );
    }
}
//
// const mapStateToProps = state => {
//     const { storage, data } = state;
//     console.error(state);
//
//     return {
//         storage,
//         data
//     };
// };
//
// export default connect(mapStateToProps)(MainContainer);


export default MainContainer;