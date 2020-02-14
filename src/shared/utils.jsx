
export const formatAmount = (amount) => {
    return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const formatAmountNoDecimal = (amount) => {
    return amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
};
export const formatDate =(dateData, seperator) =>{
    seperator = seperator ? seperator : '/';
    let monthList = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let splitedDate = dateData.split(' ');
    if (splitedDate.length > 1) {
      splitedDate[1] = splitedDate[1].replace(',', '');
      return this.startWithZero((+monthList.indexOf(splitedDate[1]) + 1))
        + seperator + this.startWithZero(splitedDate[0])
        + seperator + splitedDate[2];
    }
    return dateData;
  }

// export const toCurrency = (currency)=>{
//     if (currency) {
//       currency = typeof currency !== 'string' ? currency.toString() : currency;
//       let numberValueArray = currency.split('.');
//       let numberValue = removeComma(numberValueArray[0]);
//       currency = numberValueArray.length > 1 ? numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
//         + '.' + numberValueArray[1] : numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
//     }
//     return currency;
//   }

export const removeComma= (currencyValue)=> {
    return currencyValue.replace(/,/g, '');
  }

export const cc_format = (value) => {

    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }

}

export const encryptTransactionData = (data, rules) => {
    let encryptedData = '';
    for (let i = 0; i < data.length - 1; i++) {
        encryptedData += rules[data[i]].EncryptedValue + '||||';
    }
    return encryptedData + rules[data[data.length - 1]].EncryptedValue;
}

export const formartCardNumber = (number) => {
    let str = "";
    str += number.substr(0, 4) + " ";
    str += number.substr(4, 4) + " ";
    str += number.substr(8, 4) + " ";
    str += number.substr(12, 4);
    return str;
}

export const checkValue = (event, dataLength = null) => {

    //number input only
    const { value } = event.target;
    let key = event.keyCode > 0 ? event.keyCode : event.charCode;

    if (key === 8 || key === 44 || key === 46 || key >= 37 && key <= 40 || key >= 48 && key <= 57) {
        // Prevent characters %, &, (, and ' on Chrome, Firefox & Opera browsers
        if (key >= 37 && key <= 40 && (event.key === '%' || event.key === '&' || event.key === '(' || event.key === '\'')) {
            return false;
        }
        // Prevent characters %, &, (, and ' on Safari browser
        if (key >= 37 && key <= 40 && event.keyIdentifier === '') {
            return false;
        }
        // *** Firefox Bug fix *** This allows the user to still be able to use arrow keys and backspace when the maxlength is reached
        if (key === 8 || key >= 37 && key <= 40) {
            return true;
        }
        return dataLength ? !(value.length > (dataLength - 1)) : true;
    }
    return false;
}

export const formatCardExpiryDate = (value) => {
    if (value[0] > 1) {
        value = '0' + value;
    }
    return value.replace(/ \/ /, '').replace(/^(\d{2})/g, '$1 / ');
}

export const numberWithCommas= (amount)=> {
    let testSequence = /^[0-9.,]+$/;
    // let testSequence = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?$/;
    if(amount!==undefined && amount!==''){
        let amountFiltered ;

        if(!testSequence.test(amount)){
            return "";
        }
    // return numberProvided.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return parseFloat(numberProvided).toLocaleString(undefined, {maximumFractionDigits:2});
        
        // if(amount.indexOf(',')>-1){
             amountFiltered = amount.toString().replace(/,/g, '');
        // }
        
        return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');    
       
        
    }
}

export const validateCardExpiry = (inputString, actionKey)=>{
    

    
    if(actionKey===undefined){
        if(inputString.indexOf('/')===-1){
            inputString = inputString.replace(/\D/g,'');
            if(inputString.length===2){
                return inputString+'/';
            } 

            
        }
        if(inputString.indexOf('/')===-1){
            inputString = inputString.replace(/\D/g,'');
            if(inputString.length>2){
                let splittedInput = [inputString.slice(0,2),'/',inputString.slice(2)].join('');
                return splittedInput;
            } 
        }
    }

    if(actionKey!==undefined){
        if(inputString.indexOf('/')===-1){
            inputString = inputString.replace(/\D/g,'');
            if(inputString.length>2){
                let splittedInput = [inputString.slice(0,2),'/',inputString.slice(2)].join('');
                return splittedInput;
            } 
        }
    }
    

    

    return inputString;
}

export const canvasToFile = (dataURL) => {
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
    //console.log("in model state");
    //console.log(error);
    try {
        if (error.response) {
            if ("modelState" in error.response.data && error.response.data.message.toLowerCase().indexOf('the request is invalid.') > -1) {
                let message = '';
                for (let key in error.response.data.modelState) {
                    if (error.response.data.modelState.hasOwnProperty(key)) {
                        // console.log(key + " -> " + error.modelState[key]);
                        if (Object.keys(error.response.data.modelState).length > 1) {
                            message += error.response.data.modelState[key] + ', ';
                        } else {
                            message += error.response.data.modelState[key];
                        }
                    }
                }
                return message;
            } else
                return handleError(error);  //Check for the exact error code to know what to return
        }
        else
            return handleError(error);  //Check for the exact error code to know what to return
    } catch (err) {
       // console.log(err);
        return "Error : Something went wrong";
    }
    
};

export const handleError = (error) => {
    //console.log("-----in handle error")
    //console.log(error);
    var message = '';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.response.status >= 500 && error.response.status < 600) {
            message = 'something went wrong, try again please.';
        } else {
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

export const returnStatusCode =(error) =>{
    var statusCode = '';
    if (error.response) {
        if (error.response.status) {
           statusCode = error.response.status;
        } 
    }
    // console.log(statusCode);
   return statusCode;
};

export const FormartDate = (date) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let current_datetime = new Date(date.toLocaleString());
    let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + ", " + current_datetime.getFullYear();
    return formatted_date;
}


export const maskString = (string, replacerString, startIndex, endIndex) => {
    let toMask = string.substring(startIndex, endIndex);
    string = string.replace(toMask, replacerString);
    return string;
}

export const mapCurrency = (currency) => {
    let unicode;
    switch (currency) {
        case "NGN":
            unicode = "\u20A6";
            break;
        case "USD":
            unicode = "\u0024";
            break;
        case "GBP":
            unicode = "\u00A3";
            break;
        case "EUR":
            unicode = "\u20AC";
            break;
        case "YEN":
            unicode = "\u00A5";
            break;
        case "CNY":
            unicode = "元";
            break;
        case "RMB":
            unicode = "元";
            break;
        case "GHC":
            unicode = "₵";
            break;
        default:
            unicode = "\u20A6"
            break;
    }
    return unicode;
}

export const getOnlyNumericPhoneNumber = (phoneString) => {
     phoneString = phoneString.replace(/\D/g,'');
    if(phoneString.length>=4 && (phoneString.substring(0,3)==="234" || phoneString.substring(0,4)==="+234")){
        
        if(phoneString.substring(0,3)==="234"){
            phoneString = phoneString.replace("234", "0");
        }
        if( phoneString.substring(0,4)==="+234"){
            phoneString = phoneString.replace("+234", "0");
        }
        
    }

    if(phoneString.length>=4 && phoneString.substring(0,1)!=="0"){
        phoneString =`0${phoneString}`;
    }

    if(phoneString.length>=11){
        phoneString = phoneString.substring(0,11)
    }


    
    return phoneString;
}



export const numberInputOnly = (inputString) => {
    inputString = inputString.replace(/\D/g,'');
//    if(phoneString.length>=4 && (phoneString.substring(0,3)==="234" || phoneString.substring(0,4)==="+234")){
       
//        if(phoneString.substring(0,3)==="234"){
//            phoneString = phoneString.replace("234", "0");
//        }
//        if( phoneString.substring(0,4)==="+234"){
//            phoneString = phoneString.replace("+234", "0");
//        }
       
//    }

//    if(phoneString.length>=4 && phoneString.substring(0,1)!=="0"){
//        phoneString =`0${phoneString}`;
//    }

//    if(phoneString.length>=11){
//        phoneString = phoneString.substring(0,11)
//    }


   
   return inputString;
}



export const getBase64=(file, cb)=> {
    let reader = new FileReader();
    // reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.readAsDataURL(file);
    reader.onerror = function (error) {
       
    };
}

export const toCurrency=(currency) =>{
    if (currency) {
      currency = typeof currency !== 'string' ? currency.toString() : currency;
      let numberValueArray = currency.split('.');
      let numberValue = this.removeComma(numberValueArray[0]);
      currency = numberValueArray.length > 1 ? numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
        + '.' + numberValueArray[1] : numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return currency;
}
export const GetGoalFutureValue = (debitAmount, annualInterestRate, month) =>{
      let months = Math.round(month);
      let futureValue = 0;
      let rate = ((annualInterestRate - 0.01) / 12);
      for (let n = 1; n <= months; n++)
      {
          var multiplier = (1 + rate);
          futureValue += debitAmount * (Math.pow(multiplier, n));     
      }
      let amount = futureValue - (debitAmount * months);
      return this.toCurrency( parseFloat(amount).toFixed(2));
}
export const GetDailyFutureValue =(debitAmount, annualInterestRate, days) =>{
    let futureValue = debitAmount;
    let dailyRate = (annualInterestRate * 100) / 36500;
    let interestAccrued = 0;
    for (let i = 1; i <= days; i++)
    {
        if (i < days)
        {
            futureValue += debitAmount;
        }
        interestAccrued += dailyRate * futureValue;
        //Monthly compounding
        if (i % 30 == 0)
        {
            futureValue += interestAccrued;
            interestAccrued = 0;
        }
    }
    return futureValue += interestAccrued;
};
export const  GetWeeklyFutureValue =(debitAmount, annualInterestRate, days)=>{
    let futureValue = debitAmount;  
    let dailyRate = (annualInterestRate * 100) / 36500;
    let interestAccrued = 0;
    for (let i = 1; i <= days; i++)
    {
        //weekly addition
        if (i < days && i % 7 == 0)
        {
            futureValue += debitAmount;
        }
        interestAccrued = interestAccrued + (dailyRate * futureValue);
        //Monthly compounding
        if (i % 30 == 0)
        {
            futureValue += interestAccrued;
            interestAccrued = 0;
        }
    }
    let result = futureValue += interestAccrued;
    return result;
    
};
export const GetMonthlyGoalFutureValue =(debitAmount, annualInterestRate, months, goalType)=>{
    let futureValue = 0;
    var result;
    let rate = (annualInterestRate - 0.01) / 12;
    for (let n = 1; n <= months; n++)
    {
        var multiplier = (1 + rate);
        futureValue += debitAmount * (Math.pow(multiplier, n));
    }
    return (futureValue - (debitAmount * months)).toFixed(2);
}

 
