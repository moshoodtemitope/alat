import React, { Component } from 'react';

class LinkBvN extends Component {
   constructor(props){
       super(props);
       this.state = {

       }
   }

   HandleSubmit = () => {
       event.preventDefault();
   }

   render(){
       return(
           <div>
               <form onSubmit={this.HandleSubmit}>
                     <div className="form-row">
                        <div className="form-group">
                            <input type="text" />
                        </div>
                     </div>
                     <div className="form-row">
                         
                     </div>
               </form>
           </div>
       )
   }
}

export default LinkBvN;