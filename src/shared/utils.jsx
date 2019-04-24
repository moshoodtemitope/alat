
export const formatAmount = (amount)=>{
    return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
};

export const modelStateErrorHandler = (error, field) => {
   if ("modelState" in error && error.message.toLowerCase().includes('The request is invalid')){
       //This is a model state error, process each model state object
       console.log(error);
       for(let err of error.modelState){
           console.log(err);
           return err.field.join();
           // for(let errMsg of err.field){
           //     var stringValueYouWant = a.join()
           //     return (errMsg)
           // }
       }

   }
   else{
       return error.message || error.Message;

   }
};