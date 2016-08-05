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
    $("#tutorial-delete").on("click", function(e){
        e.preventDefault();
             
        $("#btn-ok").on("click", function() {
            $("#confirm-delete").fadeOut("fast", function() {
                 $("#delete-form").trigger("submit"); // submit the form
             });
        });        
    });
    
    // show confirm box for review delete
    $(".btn-delete").on("click", function(){
        confirm("Are you sure you want to delete this review?");
    });
    
    // sign up form validation rules
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
    
    // review form validation rules
    $("#review-form").validate({
        rules: {
            content: {
                required: true,
                maxlength: 1000            
            }
        },
        messages: {
            content: {
                required: "Please provide a full review",
                maxlength: "Please keep your review under 1000 characters"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
    
    $("#details-form").validate({
        rules: {
            details: {
                required: true,
                maxlength: 1500
            }
        },
        messages: {
            details: {
                required: "Please provide some details about yourself",
                maxlength: "Please keep your details under 1500 characters"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
    
    $("#new-password-form").validate({
        rules: {
            newPassword: {
                required: true,
                maxlength: 26,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                maxlength: 26,
                minlength: 6
            }
        },
        messages: {
            newPassword: {
                required: "Please provide a new password",
                maxlength: "Your password cannot exceed 26 characters",
                minlength: "Your password must be at least 6 characters long"
            },
            confirmPassword: {
                required: "Please confirm your new password",
                maxlength: "Your password cannot exceed 26 characters",
                minlength: "Your password must be at least 6 characters long"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
    
    $("#tutorial-form").validate({
        rules: {
            title: {
                required: true,
                maxlength: 100
            },
            description: {
                required: true,
                maxlength: 250
            },
            content: "required"
        },
        messages: {
            title: {
                required: "Please provide a title for the tutorial",
                maxlength: "Your tutorials title cannot exceed 100 characters"
            },
            description: {
                required: "Please include a brief (250 character) tutorial description",
                maxlength: "Your description cannot exceed 250 characters"
            },
            content: {
                required: "Don't forget to write your tutorial!"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
    
});
