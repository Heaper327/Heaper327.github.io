function isArr (input){
    if (input.constructor==Array){
        return true;
    }else{
        return false
    }
}

function arrSort (inputArr){
    var result = inputArr
    for (var sortEnd = result.length-1; sortEnd >= 0; sortEnd --){
        for (var i = 0; i <= sortEnd; i++){
            var curValue;
            var nextValue;
            if (!result[i+1]){
                continue;
            }
            if (isArr(result[i])){
                result[i] = arrSort (result[i]);
                curValue = result[i].reduce(function(total, cur){
                    return total+cur;
                });
            }else{
                curValue = result[i];
            }
            if (isArr(result[i+1])){
                result[i+1] = arrSort (result[i+1]);
                nextValue = result[i+1].reduce(function(total, cur){
                    return total+cur;
                });
            }else{
                nextValue = result[i+1];
            }
            if (curValue>nextValue){
                var tmp = result[i];
                result[i] = result[i+1];
                result[i+1] = tmp;
            }
        }
    }
    return result;
}

