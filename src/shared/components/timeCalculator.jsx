// timecounter

export function days(param1, param2){
  console.log(param1.split('-'));
  var DateDiff = {
      inDays: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
          //console.log(parseInt((t2-t1)/(24*3600*1000)))
          return parseInt((t2-t1)/(24*3600*1000));
      }
  }

  function perTicularMonth(param){
     switch(param){
       case '01':
          return 'January';
       case '02':
          return 'February';
       case '03':
          return 'March';
       case '04':
          return 'April'
       case '05':
          return 'May';
       case '06':
          return 'June';
       case '07':
          return 'July';
       case '08':
          return 'August';
       case '09':
          return 'September';
       case '10':
          return 'October';
       case '11':
          return 'November';
       case '12':
          return 'December';
     }
  }

  const theMonth2 = param2.split('-')[1];
  const theYear2 = param2.split('-')[0];
  const theDay2 = param2.split('-')[2];


  const theMonth1 = param1.split('-')[1];
  const theYear1 = param1.split('-')[0];
  const theDay1 = param1.split('-')[2];

  //var dString = "May, 20, 1984";
  const startDate = perTicularMonth(theMonth1).concat(', ').concat(theDay1).concat(', ').concat(theYear1);
  const endDate = perTicularMonth(theMonth2).concat(', ').concat(theDay2).concat(', ').concat(theYear2);
  var d1 = new Date(endDate);
  var d2 = new Date(startDate);
  return DateDiff.inDays(d1, d2)
}

export function weeks(param1, param2){
  var DateDiff = {
      inWeeks: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();

          return parseInt((t2-t1)/(24*3600*1000*7));
      }
  }

  function perTicularMonth(param){
     switch(param){
       case '01':
          return 'January';
       case '02':
          return 'February';
       case '03':
          return 'March';
       case '04':
          return 'April'
       case '05':
          return 'May';
       case '06':
          return 'June';
       case '07':
          return 'July';
       case '08':
          return 'August';
       case '09':
          return 'September';
       case '10':
          return 'October';
       case '11':
          return 'November';
       case '12':
          return 'December';
     }
  }

  const theMonth2 = param2.split('-')[1];
  const theYear2 = param2.split('-')[0];
  const theDay2 = param2.split('-')[2];


  const theMonth1 = param1.split('-')[1];
  const theYear1 = param1.split('-')[0];
  const theDay1 = param1.split('-')[2];

  //var dString = "May, 20, 1984";
  const startDate = perTicularMonth(theMonth1).concat(', ').concat(theDay1).concat(', ').concat(theYear1);
  const endDate = perTicularMonth(theMonth2).concat(', ').concat(theDay2).concat(', ').concat(theYear2);
  var d1 = new Date(endDate);
  var d2 = new Date(startDate);
  return DateDiff.inWeeks(d1, d2);
}

export function months(param1, param2){
  var DateDiff = {
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();
        //console.log((d2M+12*d2Y)-(d1M+12*d1Y));
        return (d2M+12*d2Y)-(d1M+12*d1Y);
    }
  }

  function perTicularMonth(param){
     switch(param){
       case '01':
          return 'January';
       case '02':
          return 'February';
       case '03':
          return 'March';
       case '04':
          return 'April'
       case '05':
          return 'May';
       case '06':
          return 'June';
       case '07':
          return 'July';
       case '08':
          return 'August';
       case '09':
          return 'September';
       case '10':
          return 'October';
       case '11':
          return 'November';
       case '12':
          return 'December';
     }
  }

  const theMonth2 = param2.split('-')[1];
  const theYear2 = param2.split('-')[0];
  const theDay2 = param2.split('-')[2];


  const theMonth1 = param1.split('-')[1];
  const theYear1 = param1.split('-')[0];
  const theDay1 = param1.split('-')[2];

  //var dString = "May, 20, 1984";
  const startDate = perTicularMonth(theMonth1).concat(', ').concat(theDay1).concat(', ').concat(theYear1);
  const endDate = perTicularMonth(theMonth2).concat(', ').concat(theDay2).concat(', ').concat(theYear2);
  var d1 = new Date(startDate);
  var d2 = new Date(endDate);
  return DateDiff.inMonths(d1, d2);
}

export function theMonth(param){

   function perTicularMonth(param){
       switch(param){
          case '01':
             return 'January';
          case '02':
             return 'February';
          case '03':
             return 'March';
          case '04':
             return 'April'
          case '05':
             return 'May';
          case '06':
             return 'June';
          case '07':
             return 'July';
          case '08':
             return 'August';
          case '09':
             return 'September';
          case '10':
             return 'October';
          case '11':
             return 'November';
          case '12':
             return 'December';
        }
   }

   perTicularMonth(param);

}
