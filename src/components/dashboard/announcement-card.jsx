import * as React from "react";
// import {getAnnouncement} from "./actions";
import {Router} from "react-router";
// import {history} from "../_helpers";
import { connect } from "react-redux";
// import {userConstants} from "../_constants";
// import {routes} from "../shared/urls";
import {Fragment} from "react";
import {getAnnouncement} from "../../redux/actions/dashboard/dashboard.actions";
import {dashboardConstants as userConstants} from "../../redux/constants/dashboard/dashboard.constants";
import {routes} from "../../services/urls";


class AnnouncementCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
        this.callAnnouncement();
    }

    callAnnouncement() {
        const {dispatch} = this.props;
        dispatch(getAnnouncement(this.state.user.token));
    };

    componentDidMount() {

    }

    renderAnnoucementCard(){
        let announcementCard = this.props;
        let status = announcementCard.announcement_status;
        if(status === userConstants.ANNOUNCEMENT_FETCH_SUCCESS){
            let response = announcementCard.announcement_data.response;
            let feedUrl = routes.BASEURL + '/UserSecurityApi/';
            return(
                <div className="al-card no-pad">
                    <div className="info-card">
                        <div className="post-img">
                            <img src={feedUrl + response.imageUrl} />
                        </div>
                        <div className="content">
                            <h4>{response.title}</h4>
                            <p>{response.description} <a href={"http://" +response.url} target="_blank">Read more..</a></p>
                        </div>

                    </div>
                </div>
            );
        }
    }

    render(){
        return (
            <Fragment>
                {this.renderAnnoucementCard()}
            </Fragment>

        );
    }
}


function mapStateToProps(state){
    return state.dashboard_announcementCard;
}

export default connect(mapStateToProps)(AnnouncementCard);