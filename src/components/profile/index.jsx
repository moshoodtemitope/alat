import React, { Component, Fragment } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import PersonalDefault from './default-page';
import LinkBvN from './link-bvn';
import ProfileSuccessMessage from './success-message';
import PersonalInfoMation from './personal-info';
import ContactDetails from './contact-details';
import NextOfKin from './next-of-kin';
import ProfileDocuments from './profile-documents';
import PhotographUpload from './photograph-upload';
import SignatureUpload from './signature-upload';
import IdentityCardUpload from './upload-identity-card';
import ContactSuccessPage from './success-message-contact';
import LinkBVNSuccessPage from './success-message-linkBVN';
import NextOfKinUpLoadedSuccessfully from './success-message-nextOfKinSuc';
import DocumentUploadedSuccessfully from './profile-documents';
import PersonalInfoSuccessPage from './success-message-personalInfo'



class ProfileIndex extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper"> 
                         <div className="container"> 
                             {/* <div className="row">  */}
                                {this.props.children}
                                <Route exact path='/profile' component={PersonalDefault} />
                                <Route path="/profile/defaultpage" component={PersonalDefault} />

                                <Route path="/profile/linkBVN" component={LinkBvN} />
                                <Route path="/profile/profile-success-message" component={ProfileSuccessMessage} /> 
                                <Route path="/profile/profile-personalInfo"  component={PersonalInfoMation} />
                                <Route path="/profile/profile-contact-detail"  component={ContactDetails} />
                                <Route path="/profile/profile-next-of-kin"  component={NextOfKin} />
                                <Route path="/profile/profile-documents"  component={ProfileDocuments} />
                                <Route path="/profile/profile-upload-photograph"  component={PhotographUpload} /> 
                                <Route path="/profile/profile-signature-upload"  component={SignatureUpload} />
                                <Route path="/profile/profile-identiy-card"  component={IdentityCardUpload} />
                                <Route path="/profile/profile-succ-message"  component={ContactSuccessPage} />
                                <Route path="/profile/profile-succ-linked"  component={LinkBVNSuccessPage} />
                                <Route path="/profile/profile-success-nextofkin"  component={NextOfKinUpLoadedSuccessfully} />
                                <Route path="/profile/profile-success-document"  component={DocumentUploadedSuccessfully} />
                                <Route path="/profile/profile-success-personalInfo" component={PersonalInfoSuccessPage} />
                            </div>
                        </div> 
                    {/* </div>  */}
                </InnerContainer>   
            </Fragment>
        );
    }
}

export default ProfileIndex;

