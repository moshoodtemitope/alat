import React, { Component, Fragment } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import LifeStyle from '../lifestyle/lifestyle-movie/movie';
import LifestylePreference from "../lifestyle/lifestyle-preference/preference";
import LifeStyleEvent from "../lifestyle/lifestyle-event/event";
import MovieDetail from '../lifestyle/lifestyle-movie/movie-details';
import EventDetails from '../lifestyle/lifestyle-event/event-details';
import BuyTicketData from '../lifestyle/lifestyle-movie/buy-ticket';
import BuyEventTicket from '../lifestyle/lifestyle-event/buy-event-ticket'


class LifestyleIndex extends Component {



    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container" style={{marginTop: -62}}>
                            <div className="row" style={{justifyContent: "center"}}>

                                {this.props.children}
                                <Route path={'/lifestyle'} exact component={LifeStyle} />
                                <Route path={'/lifestyle/movie'} exact component={LifeStyle} />
                                <Route path={'/lifestyle/event'} component={LifeStyleEvent} />
                                <Route path={'/lifestyle/preference'} component={LifestylePreference} />
                                <Route path={'/lifestyle/movie-details'} component={MovieDetail} />
                                <Route path={'/lifestyle/buy-ticket-details'} component={BuyTicketData}/>
                                <Route path={'/lifestyle/event-details'} component={EventDetails}/>
                                <Route path={'/lifestyle/buy-event-ticket'} component={BuyEventTicket}/>



                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default LifestyleIndex;