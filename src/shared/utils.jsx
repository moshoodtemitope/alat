
export const formatAmount = (amount)=>{
    return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
};

export const canvasToFile = (dataURL) =>{
    let byteString;
    byteString = atob(dataURL.split(',')[1]);
    
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

export const modelStateErrorHandler = (error, field) => {
   if ("modelState" in error && error.message.toLowerCase().indexOf('the request is invalid.')>-1){
       //This is a model state error, process each model state object
    //    console.log('error is ', error);
    //    for(let err of error.modelState){
    //        console.log('each error is',err);
    //        return err.field.join();
    //        // for(let errMsg of err.field){
    //        //     var stringValueYouWant = a.join()
    //        //     return (errMsg)
    //        // }
    //    }
        let message = '';
       for(let key in error.modelState){
            if (error.modelState.hasOwnProperty(key)) {
                // console.log(key + " -> " + error.modelState[key]);
                if(Object.keys(error.modelState).length>1){
                    message+=error.modelState[key]+', ';
                }else{
                    message+=error.modelState[key];
                }
                
            }
       }
       return message;

   }
   else{
    //    console.log('here');
    //   return error.message || error.Message;
  
       return handleError(error);  //Check for the exact error code to know what to return
   }
};

export const handleError =(error)=>{
    var message = '';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if(error.response.status >=500 && error.response.status < 600){
            message = 'something went wrong, try again please.';
        }else {
            message = error.response.data.message;
        }
        
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //console.log(error.request);
        message = error.message
    } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('Error', error.message);
        message = error.message;
    }
  return message;
};