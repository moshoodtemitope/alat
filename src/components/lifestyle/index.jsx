import React, { Component, Fragment } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import LifeStyle from '../lifestyle/lifestyle-movie/movie';
import LifestylePreference from "../lifestyle/lifestyle-preference/preference";
import LifeStyleEvent from "../lifestyle/lifestyle-event/event";
import MovieDetail from '../lifestyle/lifestyle-movie/movie-details';
import EventDetails from '../lifestyle/lifestyle-event/event-details';
import BuyTicketData from '../lifestyle/lifestyle-movie/buy-ticket';
import MovieSuccess from '../lifestyle/lifestyle-movie/movie-success';
import BuyEventTicket from '../lifestyle/lifestyle-event/buy-event-ticket';
import Visas from '../lifestyle/lifestyle-visas/visas';
import Dubai from '../lifestyle/lifestyle-visas/dubai-visas';
import personalDetails from '../lifestyle/lifestyle-visas/personal-details';
import VisaDetail from '../lifestyle/lifestyle-visas/visa-details'
import VisaDetails from '../lifestyle/lifestyle-visas/visa-details';


class LifestyleIndex extends Component {
    constructor(props){
        super(props);
        this.state={
            display: 'block',
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row eventWrap">
                                <div className="col-sm-12">
                                    <p className="page-title">LifeStyle</p>
                                </div>
                                <div className="col-sm-12">
                                    <div>
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li className="active" onClick={() => this.setState({ display: "block" })}><NavLink  to={'/lifestyle/movie'}>Movies</NavLink></li>
                                                <li> <NavLink to={'/lifestyle/event'}>Event</NavLink></li>
                                                <li> <NavLink to={'/lifestyle/travels/visas'}>Travels</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                <Route path={'/lifestyle'} exact component={LifeStyle} />
                                <Route path={'/lifestyle/movie'} exact component={LifeStyle} />
                                <Route path={'/lifestyle/event'} component={LifeStyleEvent} />
                                {/* <Route path={'/lifestyle/preference'} component={LifestylePreference} /> */}
                                <Route path={'/lifestyle/movie-details'} component={MovieDetail} />
                                <Route path={'/lifestyle/buy-ticket-details'} component={BuyTicketData}/>
                                <Route path={'/lifestyle/event-details'} component={EventDetails}/>
                                <Route path={'/lifestyle/buy-event-ticket'} component={BuyEventTicket}/>
                                <Route path={'/lifestyle/movie-success'} component={MovieSuccess}/>
                                <Route path={'/lifestyle/travels/visas'} component={Visas}/>
                                <Route path={'/lifestyle/travels/dubai-visa'} component={Dubai}/>
                                <Route path={'/lifestyle/travels/personal-detail'} component={personalDetails}/>
                                <Route path={'/lifestyle/travels/visa-detail'} component={VisaDetails}/>
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default LifestyleIndex;