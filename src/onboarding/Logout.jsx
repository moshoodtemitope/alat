import * as React from "react";
import {history} from "../_helpers";
import {alertActions, userActions} from "../_actions";
import connect from "react-redux/es/connect/connect";


class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
        const {dispatch} = this.props;
        this.logout();
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
        // dispatch(userActions.logout());
        //
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    logout(){
        const { dispatch } = this.props;
        dispatch(userActions.logout());
        history.push('/');
    }

    render() {
        return (
            <h4>Logging out...</h4>
        );
    }

}

export default connect(null)(Logout);