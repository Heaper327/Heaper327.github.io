var intCount = [];
var resultNum = [];
var resultCount = 0;
var element = document.getElementById("result");

function findMode (arr){

    if (arr.length==0){
        return -1;
    }

    arr.map(function (num) {
        if (intCount.length!=0){
            for (var i=0; i<= intCount.length-1; i++){
                if (intCount[i][0] == num) {
                   intCount[i][1]++;
                   return;
              }
            }
        }
        intCount.push([num, 1]);
    });

    intCount.map(function(cur){
        if (resultCount == 0){
            resultCount = cur[1];
        }
        else if (resultCount<cur[1]){
            resultCount = cur[1];
        }
    });

    intCount.map(function(cur){
        if (cur[1]==resultCount){
            resultNum.push(cur[0]);
        }
    });

    return 0;
    
}

var tmp = findMode([1,1,2,3,4,5,5,5]);
element.innerHTML += resultNum + " appeared "+ resultCount + " times.";