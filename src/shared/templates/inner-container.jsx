import * as React from 'react';
import {history} from "../../_helpers/history";
import {Router} from "react-router";
import MenuContainer from "./_menu";
import HeaderContainer from "./_header";

class InnerContainer extends React.Component{
    
    render() {
        // console.log("______", history.location.pathname.indexOf('i-msg'))
        return (
            <Router history={history}>
                <div className="dashboard-main">
                    <HeaderContainer />
                    {(history.location.pathname!=='/home' && history.location.pathname.indexOf('i-msg')===-1)&&
                        <MenuContainer />
                    }
                    {this.props.children}
                </div>
            </Router>
        );
    }
}

export default InnerContainer;
