/*
    Name: tiles table 
    Date: 2018/4/24
    Author: James
    Dependencies: jquery, jcanvas

    Steps to use it：
    1. link tilesTable.js, jcanvas, and jquery to your website 
    2. new a tilesTable object
    3. call tilesTable.initTable(id, tileWidthA, tileHeightA, minTimeA, maxTimeA, backColorA, charColorA, switchTimeA, quoteAPI) to initiate the table
    4. call tilesTable.startTable() and tilesTable.endTable() to start and end the refreshing of table
    5. enjoy!

    initTable(id, tileWidthA, tileHeightA, minTimeA, maxTimeA, backColorA, charColorA, switchTimeA, quoteAPI)

        function:
            assign value to global variables, initiate a table

        arguments:
            id: string, id of target canvas
            tileWidthA: float, width of each tile
            tileHeightA: float, height of each tile
            minTimeA: int, the minimum time each tile refreshes
            maxTimeA: int, the maximum time each tile refreshes
            backColorA: hex decimal, background color of tiles 
            charColorA: hex decimal, color of characters in tiles
            switchTimeA: float, length of time between two refreshes
            quoteAPI: callback function with no parameter, a function that when called returns a string to display (e.g. 
                function (){
                    return "Hello World";
                }
            )

        return:
            return 0 by default, return -1 when error occurs
*/
var tilesTable = function(){

this.tileWidth;
this.tileHeight;
this.margin;
this.minTime;
this.maxTime;
this.backColor;
this.charColor;
this.switchTime;
this.$canvas;

this.width;
this.height;
this.colNum;
this.rowNum;

this.getQuote;

this.randomChar = function() {};
this.randomNum = function(min, max) {};
this.isCoord = function(x, y) {};

this.initTable = function() {};
this.findTile = function(x, y) {};
this.setTile = function(x, y, char) {};
this.initTile = function(x, y) {};
this.makeMap = function(str) {};
this.setTableByMap = function(map) {};

this.startTable = function() {};
this.refreshTable = function() {};
this.endTable = function() {};

//初始化table，与一个canvas元素绑定，获取常数值
this.initTable = function(id, tileWidthA, tileHeightA, minTimeA, maxTimeA, backColorA, charColorA, switchTimeA, quoteAPI) {
    $canvas = $("#"+id);
    if (!$canvas){
        console.error("canvas doesn't exist");
        return -1
    }
    width = $canvas.width();
    height = $canvas.height();
    tileWidth = tileWidthA;
    tileHeight = tileHeightA;
    margin = tileWidth / 10;
    colNum = Math.floor(width / (tileWidth + margin));
    rowNum = Math.floor(height / (tileHeight + margin));
    if (colNum <= 0 || rowNum <= 0){
        console.error("invalid tile size");
        return -1;
    }
    minTime = Math.floor(minTimeA);
    maxTime = Math.floor(maxTimeA);
    backColor = backColorA;
    charColor = charColorA;
    switchTime = switchTimeA;
    if (minTime > maxTime || minTime <= 0 || maxTime <= 0 || switchTime <= 0) {
        console.error("invalid min/max/switch time");
        return -1;
    }
    getQuote = quoteAPI;
    if (typeof(getQuote)!="function"){
        console.error("quote api must be a function");
        return -1;
    }
    for (var i = 1; i <= rowNum; i++) {
        for (var n = 1; n <= colNum; n++) {
            var result = this.initTile(n, i);
            if (result == -1){
                console.error("unable to draw table");
                return -1;
            }
        }
    }
    return 0;
}

//返回一个min和max之间的随机数
this.randomNum = function(min, max) {
    if (min > max || typeof(min)!="number" || typeof(max)!="number"){
        return null;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//返回一个A-Z或者.,的随机字符
this.randomChar = function() {
    var dic = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",",","."]
    return dic[this.randomNum(0, dic.length-1)];
}


//检查一对坐标是否合法
this.isCoord = function(x, y) {
    if (x > colNum || y > rowNum || x < 1 || y < 1){
        return null;
    }
    return 1;
}

//返回一对坐标对应格子左上角的位置
this.findTile = function(x, y){
    if (!this.isCoord(x, y)){
        return null;
    }
    var xPos = margin + (x - 1) * (tileWidth + margin);
    var yPos = margin + (y - 1) * (tileHeight + margin);
    return [xPos, yPos];
}

//设置一对坐标指定的格子中的字符
this.setTile = function(x, y, char) {
    var pos = this.findTile(x, y);
    if (!pos){
        return -1;
    }
    if (typeof(char)!="string"||char.length>1||char.length<1){
        return -1;
    }
    else {
        var textSize = tileWidth - margin * 2;
        $canvas.drawText({
            fillStyle: charColor,
            strokeStyle: charColor,
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

//初始化一个格子，清空其内容
this.initTile = function(x, y){ 
    var pos = this.findTile(x, y);
    if (!pos){
        return -1;
    }
    $canvas.clearCanvas({
        x: pos[0],
        y: pos[1],
        fromCenter: false,
        width: tileWidth,
        height: tileHeight
    });
    $canvas.drawRect({
        fillStyle: backColor,
        strokeStyle: backColor,
        strokeWidth: 0,
        x: pos[0],
        y: pos[1],
        fromCenter: false,
        width: tileWidth,
        height: tileHeight
    });
    return 0;
}

//根据一个字符串生成一个可用于设置table的map，和setTableByMap()一起使用
this.makeMap = function(str) {
    if (typeof(str)!="string"||str.length > colNum){
        return -1;
    }
    var result = new Map();
    var chars = str.toUpperCase().split("");
    var strLength = chars.length;
    var xOrigin = this.randomNum (1, colNum-strLength+1);
    var yOrigin = this.randomNum (1, rowNum);
    for (var i = xOrigin; i <= xOrigin + strLength - 1; i++ ){
        var key = i+","+yOrigin;
        result.set(key,{
            char: chars[i - xOrigin],
            times: this.randomNum(minTime, maxTime)
        });
    }
    for (var i = 1; i <= rowNum; i++){
        for (var n = 1; n <= colNum; n++){
            var key = n+","+i;
            var value = result.get(key);
            if (value==undefined){
                result.set(key,{
                    char: null,
                    times: this.randomNum(minTime, maxTime) 
                })
            }
        }
    }
    return result;
}

//根据一个map设置table
this.setTableByMap = function(map) {
    for (var i = 1; i <= rowNum; i++){
        for (var n = 1; n <= colNum; n++){
            var key = n+","+i;
            var value = map.get(key);
            if (value.times > 0){
                this.initTile(n, i);
                this.setTile(n, i, this.randomChar());
                map.set(key,{
                    char: value.char,
                    times: value.times - 1
                })
            }else{
                if (value.char != null) {
                    this.initTile (n, i);
                    this.setTile(n, i, value.char);
                }else{
                    this.initTile(n, i);
                }
            }
        }
    }
    return map;
};

this.charMap;
this.timeoutId;

//生成一个map并根据map运行table
this.startTable = function() {
    if (!$canvas){
        return -1;
    }
    var quote = getQuote();
    while (quote.length > colNum){
        quote = getQuote();
    }
    charMap = this.makeMap(quote);
    this.refreshTable();
    return 0;
}

//根据一个map不断刷新table
this.refreshTable = function(){
    charMap = this.setTableByMap(charMap);
    timeoutId = setTimeout(this.refreshTable.bind(this),switchTime);
}

//停止table的刷新
this.endTable = function() {
    clearTimeout(timeoutId);
}

};