/**
 * Created by Administrator on 2015-09-21.
 */
define(["jquery","bootstrap"],function(jQuery){
    $.noConflict(true);
    jQuery(window).ready(function () {
        setTimeout(function(){
            jQuery('[data-toggle="tooltip"]').tooltip();
        },3000);
    });
});