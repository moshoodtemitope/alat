import React, { Component, Fragment } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Route} from 'react-router-dom';
import TalkToUs from './talk-to-us';
import AtmLocator from './atm-locator';
import reportError from './report-error';


class TalkToUsIndex extends Component{

    render(){

        return(
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">

                                {this.props.children}
                                <Route path={'/talk-to-us'} exact component={TalkToUs} />
                                <Route path={'/talk-to-us/atm-locator'} exact component={AtmLocator} />
                                <Route path={'/talk-to-us/report-error'} component={reportError} />
                                
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        )
    }
}

export default TalkToUsIndex;