import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";

class Bvn extends React.Component{
    render(){
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Link your BVN<span></span></h3>
                        <p>We’re so glad you’re ready to come onboard. Let’s start by getting to know you better.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form">
                            <div className="input-ctn">
                                <label>Enter your BVN</label>
                                <input type="number"/>
                            </div>

                            <div className="input-ctn">
                                <label>Your Date of Birth</label>
                                <input type='text' className="datepicker-here" data-position='top left'
                                       data-language='en'/>
                            </div>

                            <input type="submit" value="Continue" className="btn-alat btn-block"/>
                        </form>
                        <p className="text-center"><NavLink to="/">Skip BVN</NavLink></p>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}

export default Bvn
