$(document).ready(function(){
    $(".moon").click(function(){
        $("section, .todo-check, .pick").toggleClass("tog-todo");
        // $(".pick").toggleClass("tog-todo");
        $(".contain-para").toggleClass("contain-paragraph")
    });
});