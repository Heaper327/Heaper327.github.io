/*
    TODOs:
    - Reduce constants such as tileWidth, get them by arguments of initTable()
    - Add pauseTable() that pauses refreshTable() that current loops tile the end of the world
    - Fix randomQuote(): find a quote api, or get quote list by argument
    - Improve randomChar(), replace the long list of characters with some other stuff
*/

var tileWidth = 40;
var tileHeight = 60;
var margin = tileWidth * 0.1;
var MINTIME = 2;
var MAXTIME = 5;
var BACKCOLOR = "orange";
var CHARCOLOR = "white";
var SWITCHTIME = 600;
var quoteList =[
    "Welcome.",
    "Here, is future.",
    "Always with you.",
    "What a bright day.",
    "For each one"
]

var width;
var height;
var colNum;
var rowNum;

function randomChar() {}
function randomNum() {}

function initTable() {}
function findTile(x, y) {}
function setTile(x, y, char) {}
function cleanTile(x, y) {}
function makeMap(str) {}
function setTableByMap(map) {}

function randomQuote() {}

function initTable(id) {
    $canvas = $("#"+id);
    width = $canvas.width();
    height = $canvas.height();
    colNum = Math.floor(width / (tileWidth + margin));
    rowNum = Math.floor(height / (tileHeight + margin));
    for (i = 1; i <= rowNum; i++) {
        for (n = 1; n <= colNum; n++) {
            cleanTile(n, i);
        }
    }
}

function randomNum(min, max) {
    if (min > max){
        return null;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomChar() {
    var dic = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",",","."]
    return dic[randomNum(0, dic.length-1)];
}

function randomQuote(maxLength) {
    return quoteList[randomNum(0,quoteList.length-1)];
}

function findTile (x, y){
    var xPos = margin + (x - 1) * (tileWidth + margin);
    var yPos = margin + (y - 1) * (tileHeight + margin);
    return [xPos, yPos];
}

function setTile(x, y, char) {
    var pos = findTile(x, y);
    if (typeof(char)!="string"||char.length>1||char.length<1){
        return -1
    }
    else {
        var textSize = tileWidth - margin * 2;
        $canvas.drawText({
            fillStyle: CHARCOLOR,
            strokeStyle: CHARCOLOR,
            strokeWidth: 0,
            x: pos[0] + textSize / 2 + margin,
            y: pos[1] + textSize / 2 + (tileHeight-textSize) / 2,
            fontSize: textSize,
            fontFamily: "arial",
            text: char
        });
    }
    return 0;
}

function cleanTile (x, y){
    var pos = findTile(x, y);
    $canvas.clearCanvas({
        x: pos[0],
        y: pos[1],
        fromCenter: false,
        width: tileWidth,
        height: tileHeight
    });
    $canvas.drawRect({
        fillStyle: BACKCOLOR,
        strokeStyle: BACKCOLOR,
        strokeWidth: 0,
        x: pos[0],
        y: pos[1],
        fromCenter: false,
        width: tileWidth,
        height: tileHeight
    });
}

function makeMap(str) {
    if (typeof(str)!="string"||str.length>colNum){
        return -1;
    }
    var result = new Map();
    var chars = str.toUpperCase().split("");
    var strLength = chars.length;
    var xOrigin = randomNum (1, colNum-strLength+1);
    var yOrigin = randomNum (1, rowNum);
    for (i = xOrigin; i <= xOrigin + strLength - 1; i++ ){
        var key = i+","+yOrigin;
        result.set(key,{
            char: chars[i - xOrigin],
            times: randomNum(MINTIME, MAXTIME)
        });
    }
    for (i = 1; i <= rowNum; i++){
        for (n = 1; n <= colNum; n++){
            var key = n+","+i;
            var value = result.get(key);
            if (value==undefined){
                result.set(key,{
                    char: null,
                    times: randomNum(MINTIME, MAXTIME) 
                })
            }
        }
    }
    return result;
}

function setTableByMap(map) {
    for (i = 1; i <= rowNum; i++){
        for (n = 1; n <= colNum; n++){
            var key = n+","+i;
            var value = map.get(key);
            if (value.times > 0){
                cleanTile(n, i);
                setTile(n, i, randomChar());
                map.set(key,{
                    char: value.char,
                    times: value.times - 1
                })
            }else{
                if (value.char != null) {
                    cleanTile (n, i);
                    setTile(n, i, value.char);
                }else{
                    cleanTile(n, i);
                }
            }
        }
    }
    return map;
}

var charMap;

function startTable() {
    if (!$canvas){
        return -1;
    }
    charMap = makeMap(randomQuote(colNum));
    refreshTable();
}

function refreshTable() {
    charMap = setTableByMap(charMap);
    setTimeout(refreshTable,SWITCHTIME);
}


