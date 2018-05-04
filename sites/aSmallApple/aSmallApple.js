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
    var minPos = 0;
    var maxPos = 402;

    welcome.initTable('welcome',50,70,3,4,'orange','white',600,myGetQuote);

    var tryStartTable = function() {
        var scrollPos = $(window).scrollTop();
        //alert (scrollPos);
        if (scrollPos >= minPos && scrollPos <= maxPos && !tableStarted){//start table if table is visible and haven't been started
            tableStarted = 1;
            welcome.startTable();
        }else if (scrollPos < minPos || scrollPos >maxPos){//stop table when table is not visible
            tableStarted = 0;
            welcome.endTable();
        }
    }

    $(document).ready(tryStartTable);

    $(window).scroll(tryStartTable);

    var quoteList = [
        "Welcome.",
        "This is future.",
        "We are always with you.",
        "For everyone, for each one",
        "Better, faster, stronger"
    ]

    function myGetQuote(colNum) {//required as an argument of tilesTable.initTable()
        return quoteList[welcome.randomNum(0,quoteList.length-1)];
    }
}
