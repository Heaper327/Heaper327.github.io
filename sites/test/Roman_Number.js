function valueOf (num){
    switch (num) {
        case "I": return 1;
        case "V": return 5;
        case "X": return 10;
        case "L": return 50;
        case "C": return 100;
        case "D": return 500;
        case "M": return 1000;
        default: return null;
    }
}

function canMinus (num1, num2){
    if (typeof(num1)!="number" || typeof(num2)!="number"){
        return 0;
    }else if (num1>=num2){
        return 0;
    }
    else if (num1!=1 && num1!=10 && num1!=100){
        return 0;
    }
    else if (num1 * 10 < num2){
        return 0;
    }
    return 1;
}

function RomanToInteger (num){
    var tmp = [];
    var result = 0;
    var arr = num.split("");
    for (var i = 0; i <= arr.length - 1; i++){
        var cur = valueOf(arr[i]);
        var pre = valueOf(arr[i-1]);
        var next = valueOf(arr[i+1]);
        if (canMinus(cur,next)){
            continue;
        }else if (canMinus(pre,cur)){
            tmp.push(cur-pre);
        }else{
            tmp.push(cur);
        }
    }
    for (var i = 0; i <= arr.length - 1; i++){
        for (var n = i+1; n<= arr.length-1; n++){
            if (tmp[i]<tmp[n]){
                return -1;
            }
        }
    }
    for (var i = 0; i <= tmp.length - 1; i++){
        result += tmp[i];
    }
    return result;
}

function romanOf(num) {
    switch (num) {
        case 1: return "I";
        case 5: return "V";
        case 10: return "X";
        case 50: return "L";
        case 100: return "C";
        case 500: return "D";
        case 1000: return "M";
        default: return null;
    }
}


function splitNum(num) {
    var remain = num;
    var level = Math.floor(Math.log10(num)) + 1;
    var result = [];
    for (var i = 1; i <= level; i++) {
        var tmp = remain % Math.pow(10, i)
        result.push(tmp);
        remain -= tmp;
    }
    return result;
}

function IntegerToRoman(num) {
    if (num>3999 || typeof(num)!="number" || num<=0 || num%1){
        return -1;
    }
    var result = []
    var levels = splitNum(num);//split up input
    for (var i = 0; i <= levels.length-1; i++){//find out corresponding roman number for each part of input
        var tmp = [];

        var small = Math.pow(10,Math.floor(Math.log10(levels[i])));//
        var mid = 5*small;
        var large = 10*small;

        if (levels[i] <= 3*small){
            for (var n = 1; n<=levels[i]/small; n++){
                tmp.push(romanOf(small));
            }
        }else if (levels[i]==4*small){
            tmp.push(romanOf(small)+romanOf(mid));
        }else if (levels[i]==mid){
            tmp.push(romanOf(mid));
        }else if (levels[i]>mid && levels[i]<large-small){
            tmp.push(romanOf(mid));
            for (var n = 1; n <= (levels[i]-mid)/small; n++) {
                tmp.push(romanOf(small));
            }
        }else if (levels[i]==large-small){
            tmp.push(romanOf(small));
            tmp.push(romanOf(large));
        }else{
            return -1;
        }
        result.unshift(tmp.join(""));
    }
   return result.join("");
}

alert (IntegerToRoman(994));