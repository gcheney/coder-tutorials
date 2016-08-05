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
    
    //form validation rules
    $("#signup-form").validate({
        rules: {
            username: {
                required: true,
                maxlength: 26
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 26
            }
        },
        messages: {
            username: {
                required: "Please provide a username",
                maxlength: "Your usernme cannot exceed 26 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                maxlength: "Your password cannot exceed 26 characters"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
    
});
