import React from 'react';

class AirtimeDone extends React.Component{

    render(){
        return(
            <div class="col-sm-12">
					<div class="row">
						<div class="col-sm-12">
				  			<div class="max-600">
				  				<div class="al-card">
				  					<center>
				  						<img src="img/success.svg" class="m-b-30 m-t-20"/>
				  					</center>
				  					<h4 class="center-text red-text">Recharge Successful</h4>

				  					<div class="m-t-20 width-400">
					  					<p class="m-b-30 f-s-16 center-text">Your phone line has been recharged with <span class="bold-text">N1,000</span> worth of Airtel credit.</p>

						                <div class="row">
						                	<div class="col-sm-12">
						                		<center>
							                		<a href="dashboard2.html"><button class="btn-alat m-t-10 m-b-20 text-center" type="submit">Return to Dashboard</button></a>
							                	</center>
						                	</div>
						                </div>
							        </div>
				  				</div>
				  			</div>
				  		</div>
			  		</div>
				</div>
        );
    }

}

export default AirtimeDone;