$(document).ready(function() {
    
    //Fades out the flash message and moves up remaining content
    $(".close").on("click", function() {
        $( "#flash-container").fadeTo("slow", 0.00, function(){ 
             $(this).slideUp("fast", function() { 
                 $(this).remove(); 
             });
        });
    });

});
