var display = document.getElementById("display");
function reverseArr (arr){
    var result = [];
    for (let ele of arr){
        if (typeof(ele)=="object"){
            result.unshift([]);
            for (let ele2 of ele){
                result[0].unshift(ele2);
            }
        }
        else{
            result.unshift(ele);
        }
    }
    return result;
}
function reverseArr2 (arr){
    var result = [];
    for (let ele of arr){
        if (typeof(ele)=="object"){
            result.unshift(reverseArr2(ele));
        }else{
            result.unshift(ele);
        }
    }
    return result;
}
var arr2 = [[1,[7,8]],[3,4]];
display.innerHTML+=reverseArr2(arr2);