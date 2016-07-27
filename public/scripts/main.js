$(document).ready(function() {
    
    //Fades out the flash message and moves up remaining content
    $(".close").on("click", function() {
        $( "#flash-container").fadeTo("slow", 0.00, function(){ 
             $(this).slideUp("fast", function() { 
                 $(this).remove(); 
             });
        });
    });
    
    // show popup modal for tutorial delete
    $('#tutorial-delete').on('click', function(e){
        e.preventDefault();
             
        $('#btn-ok').on('click', function() {
            $('#confirm-delete').fadeOut('fast', function() {
                 $('#delete-form').trigger('submit'); // submit the form
             });
        });        
    });
    
    //show confirm box for review delete
    $('.btn-delete').on('click', function(){
        confirm('Are you sure you want to delete this review?');
    });
    
});
