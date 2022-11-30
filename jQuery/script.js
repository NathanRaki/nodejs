let h1 = $("h1");

h1.css("color", "blue");
h1.html("<strong>Salut</strong>");
$("a").attr("href", "https://bing.com");

$("button").click(function() {
    $(this).slideUp();
})

$(document).keydown(function(event) {
   h1.text(event.key);
});