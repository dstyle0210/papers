/**
 * Created by Administrator on 2015-09-22.
 */
define(["jquery","bootstrap"],function(jQuery){
    jQuery(window).ready(function () {
        (function($){
            setTimeout(function(){
                document.title = $("h1").text();
            },3000);
        })(jQuery);
    });
});