var value_1 = 0;
var value_2 = 0;
$(document).ready(function(){
    
    $.validator.addMethod("myCustomRule", function(value, element) {
        value_1 = $("#human_1").val();
        value_2 = $("#human_2").val();
        var result = Number(value_1) + Number(value_2);
        //alert(result);
        if( result == value ) {
            return true;
        }
        else {
            return false;
        }
    },
    "Please enter the correct value for " + $("#human_1").val() + " + " + $("#human_2").val() );

    
    $("#contactForm").validate();
});