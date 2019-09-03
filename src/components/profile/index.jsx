import React, { Component, Fragment } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
// import LinkBvN from './link-bvn';
import PersonalDefault from './default-page';
// import LifeStyle from '../lifestyle/lifestyle-movie/movie';
// import LifestylePreference from "../lifestyle/lifestyle-preference/preference";
// import LifeStyleEvent from "../lifestyle/lifestyle-event/event";
// import MovieDetail from '../lifestyle/lifestyle-movie/movie-details';
// import EventDetails from '../lifestyle/lifestyle-event/event-details'
// import BuyTicketData from '../lifestyle/lifestyle-movie/buy-ticket'


class ProfileIndex extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row">
                                {this.props.children}
                                <Route exact path={'/default-page'} component={PersonalDefault} />
                                {/* <Route path={'/linkBVN'} component={LinkBvN} /> */}
                            </div>
                        </div>
                    </div>
                </InnerContainer>   
            </Fragment>
        );
    }
}

export default ProfileIndex;