$(document).ready(function () {
    
    $(".menu-slide > div").hide();// the value of 'display' attribute will be saved this way

    $(".menu-slide").mouseenter(function(){
        $(this).children("div").slideDown("fast");//unfold the submenu when the option is entered
    });

    $(".menu-slide").mouseleave(function () {
        $(this).children("div").slideUp("fast");//hide all submenus when mouse leaves the option
    });

});	