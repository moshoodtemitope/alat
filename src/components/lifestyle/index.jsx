import React, { Component, Fragment } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import LifeStyle from '../lifestyle/lifestyle-movie/movie';
import LifestylePreference from "../lifestyle/lifestyle-preference/preference";
import LifeStyleEvent from "../lifestyle/lifestyle-event/event";
import MovieDetail from '../lifestyle/lifestyle-movie/movie-details'


class LifestyleIndex extends Component {



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
                                <Route path={'/lifestyle'} exact component={LifeStyle} />
                                <Route path={'/lifestyle/movie'} exact component={LifeStyle} />
                                <Route path={'/lifestyle/event'} component={LifeStyleEvent} />
                                <Route path={'/lifestyle/preference'} component={LifestylePreference} />
                                <Route path={'/lifestyle/movie-details'} component={MovieDetail} />

                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default LifestyleIndex;