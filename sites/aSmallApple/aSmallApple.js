var activateTilesTable = 1;

$(window).scroll(function(){
    var y_pos = $('.bottom-nav').offset().top - $(window).scrollTop();//the y-position of bottom-nav relative to screen 
    if (y_pos <= 35){//Alters the size of logo according to the relative position of it
        $("header > .bottom-nav > img.logo").css("width","60px");
    }else{
        $("header > .bottom-nav > img.logo").css("width", "100px");
    }
    if (y_pos <= 0) {//Changes the bottom navigator between fixed and relative
        if ($(window).scrollTop() == 0) {
            $("header > .bottom-nav").css("position", "relative");
        }else{
            $("header > .bottom-nav").css("position", "fixed");
            $("header > .bottom-nav").css("top", "0");
        }
    }
});

if (activateTilesTable){
    var tableStarted = 0;
    var welcome = new tilesTable();
    welcome.initTable('welcome',30,40,1,2,'blue','pink',600,myGetQuote);

    $(window).scroll(function() {
    var scrollPos = $(window).scrollTop();
    if (scrollPos >= 15 && scrollPos <= 1260 && !tableStarted){//start table if table is visible and haven't been started
        tableStarted = 1;
        welcome.startTable();
    }else if (scrollPos < 15 || scrollPos >1260){//stop table when table is not visible
        tableStarted = 0;
        welcome.endTable();
    }
    })

    var quoteList = [
        "Welcome.",
        "This, is future.",
     "We are always with you.",
     "For everyone, for each one"
    ]

    function myGetQuote(colNum) {//required as an argument of tilesTable.initTable()
        return quoteList[welcome.randomNum(0,quoteList.length-1)];
    }
}
