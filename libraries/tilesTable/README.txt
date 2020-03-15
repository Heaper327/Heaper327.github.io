What does tilesTable do?

TilesTable allows you to display sentences in your website in a creative way. It creates in canvas element a grid composed of blocks that looks like a chess board. Every time the grid is started, it will get a sentence from a callback function, its blocks will first display several rounds of random letters, then display the sentence with a row of blocks each displaying a letter. 

Here is a demo video: 

How to use it?

To use the tilesTable, first link tilesTable.js to your website. jQuery and jCanvas are needed as well (Here is the link to jCanvas website: https://projects.calebevans.me/jcanvas/).

Then, create a canvas element with an id in your website. This canvas element must be large enough to fit enough blocks in it. After that, new a instance of tilesTable: var myTilesTable = new tilesTable. 

Initiate the tilesTable by calling initTable() method: myTilesTable.initTable(id, tileWidth, tileHeight, minTime, maxTime, backColor, charColor, switchTime, quoteAPI). Here is a list of what each of these parameters means:

id: string, The id of your canvas element
tileWidth: float, The width of each block in the grid
tileHeight: float, The height of each block in the grid
minTime: int, The minimum rounds of random letter each block goes through before displaying the actual sentence
maxTime: int, The maximum rounds of random letter each block goes through before displaying the actual sentence
backColor: string (hex code or color name) The color of the blocks
charColor: string (hex code or color name) The color of the characters
switchTime: int (milliseconds) The length delay between each rounds
quoteAPI: a callback function that accepts no parameters, and returns a string. Here is an example:
    function (){
        return "hello world!";
    }

Once the grid is initiated, call startTable() method to display a sentence. startTable() works by assign a lifetime to each block in the grid. When the table is refreshed, blocks with a positive lifetime will change to another random character, once the lifetime hits zero, the blocks will display the actual sentence. However, the grid does not stop refresh after the sentence is displayed, the blocks just stop changing when the table is refreshed. Therefore, It is recommanded to use endTable() method to stop the table from refreshing once the sentence is display to improve performance.

You can find a demo of tilesTable in this folder