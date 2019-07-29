
export const formatAmount = (amount) => {
    return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
};

export const formatAmountNoDecimal = (amount) => {
    return amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
};

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

export const encryptTransactionData=(data, rules)=> {
    let encryptedData = '';
    for (let i = 0; i < data.length - 1; i++) {
      encryptedData += rules[data[i]].EncryptedValue + '||||';
    }
    return encryptedData + rules[data[data.length - 1]].EncryptedValue;
  }

export const formartCardNumber=(number)=>{
    let str="";
    str += number.substr(0,4 ) + " ";
    str += number.substr(4,4 ) + " ";
    str += number.substr(8,4 ) + " ";
    str += number.substr(12,4 );
    return str;
}

export const checkValue=(event, dataLength = null)=> {
    
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
        return "Error : Something went wrong";
    }
};

export const handleError = (error) => {
    console.log("-----in handle error")
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
export const toCurrency =(currency) =>{
    if (currency) {
      currency = typeof currency !== 'string' ? currency.toString() : currency;
      let numberValueArray = currency.split('.');
      let numberValue = this.removeComma(numberValueArray[0]);
      currency = numberValueArray.length > 1 ? numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
        + '.' + numberValueArray[1] : numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return currency;
}
export const GetFixedGoalFutureValue =(debitAmount, annualInterestRate, months)=>{
            let futureValue= 0;
            var result;
            let rate = ((annualInterestRate - 0.01) / 12);
            for (let n = 1; n <= months; n++)
            {
                var multiplier = (1 + rate);
                futureValue += debitAmount * (Math.pow(multiplier, n));     
            }
            result = futureValue - (debitAmount * months); //I dont even know why, with the /6.02, it matched with mobile calc
            return this.toCurrency(parseFloat(result).toFixed(2));
}
