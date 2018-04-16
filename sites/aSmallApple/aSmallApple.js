console.log("djskladj");
$(window).scroll(function(){
    var y_pos = $('.bottom-nav').offset().top - $(window).scrollTop();
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
