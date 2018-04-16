$(document).ready(function () {
    
    $(".menu-list > li > div").hide();// the value of 'display' attribute will be saved this way

    $(".menu-list > li > p").mousedown(function(){
        $(this).next().show();//unfold the submenu when the option is clicked
    });

    $(".menu-list > li").mouseleave(function () {
        $(this).children("div").hide();//hide all submenus when mouse leaves the option
    });

});	