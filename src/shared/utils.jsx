
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
       return error.message || error.Message;

   }
};