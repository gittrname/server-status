$.fn.webthumbnail = function(baseURL){
    var serverURL = "http://capture.heartrails.com/320x240/round/border/shadow?";
    return this.each(function(){
        $(this).hover(
            function(e){
                var url = $(this).attr("href");
                $("#jqThumbnail").attr("src",serverURL+url);
                $("#jqThumbnail").css("left",e.pageX+10);
                $("#jqThumbnail").css("top",e.pageY+10);
                $("#jqThumbnail").show();
            },
            function(){
                $("#jqThumbnail").hide();
            }
        );
    });
}
