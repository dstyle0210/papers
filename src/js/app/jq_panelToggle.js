/**
 * Created by Administrator on 2015-09-22.
 */
define(["jquery","bootstrap"],function(jQuery){
    jQuery(window).ready(function () {
        (function($){
            $("#panelControlBtn").on("click",function(){
                if($(this).attr("aria-pressed") == "true"){
                    // 전체 패널닫기
                    $('.panel-collapse').collapse("hide");
                    $(this).find("i").removeClass("fa-toggle-off").addClass("fa-toggle-on");
                }else{
                    // 전체 패널열기
                    $('.panel-collapse').collapse("show");
                    $(this).find("i").removeClass("fa-toggle-on").addClass("fa-toggle-off");
                };
            });
        })(jQuery);

    });
});