
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
    console.log("in model state");
  if(error.response) {
    if ("modelState" in error.response.data && error.response.data.message.toLowerCase().indexOf('the request is invalid.')>-1){
        let message = '';
       for(let key in error.response.data.modelState){
            if ( error.response.data.modelState.hasOwnProperty(key)) {
                // console.log(key + " -> " + error.modelState[key]);
                if(Object.keys(error.response.data.modelState).length>1){
                    message+=error.response.data.modelState[key]+', ';
                }else{
                    message+=error.response.data.modelState[key];
                }
            }
       }
       return message;
    } else
    return handleError(error);  //Check for the exact error code to know what to return
  }
  else
  return handleError(error);  //Check for the exact error code to know what to return
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
            message = error.response.data.message || error.response.data.Message;
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