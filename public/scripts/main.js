/*
 * Custom scripts for Coder tutorials
 */

(function($, W, D)
{ 
    var JQUERY = {};

    JQUERY.UTIL =
    {
        initFormNavigationChecking : function()
        {
            // Enable are-you-sure checking for specifci forms
            $('#tutorial-form').areYouSure({ 
                'message': 'Your tutorial has not yet been saved!'
            });    

            $('#details-form').areYouSure({ 
                'message': 'Your details have not yet been saved!'
            });

            $('#review-form').areYouSure({ 
                'message': 'Your review has not yet been saved!'
            });
        },
        btnPreviewAction: function()
        {
            $('#btn-preview').on('click', function(e) {
                e.preventDefault();
                var content = $('#content').val();
                $('#preview-content').html(marked(content));
            });
        },
        initDeleteConfirmations : function()
        {
            // show popup modal for tutorial delete
            $('#tutorial-delete').on('click', function(e) {
                e.preventDefault();

                $('#btn-ok').on('click', function() {
                    $('#confirm-delete').fadeOut('fast', function() {
                         $('#delete-form').trigger('submit'); // submit the form
                     });
                });        
            });

            // show confirm box for review delete
            $('.btn-delete').on('click', function(e) {
                if (confirm('Are you sure you want to delete this review?')) {
                    // allow form submission
                } else {
                    e.preventDefault();
                }
            });
        },
        initFlashMessageActions: function()
        {
            // gracefully remove flash message container
            function flashFadeout() {
                $('#flash-container').fadeTo('fast', 0.00, function() { 
                     $(this).slideUp('slow', function() { 
                         $(this).remove(); 
                     });
                });
            }

            // fade out flash message
            setTimeout(function() {
                  flashFadeout();
            }, 5000);

            // user removes flash message
            $('.close').on('click', function(){
                flashFadeout();
            });
        },
        initFormValidation: function()
        {
            // sign up form validation rules
            $('#signup-form').validate({
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
                        required: 'Please provide a username',
                        maxlength: 'Your usernme cannot exceed 26 characters'
                    },
                    password: {
                        required: 'Please provide a password',
                        minlength: 'Your password must be at least 6 characters long',
                        maxlength: 'Your password cannot exceed 26 characters'
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });

            // review form validation rules
            $('#review-form').validate({
                rules: {
                    content: {
                        required: true,
                        maxlength: 1000            
                    }
                },
                messages: {
                    content: {
                        required: 'Please provide a full review',
                        maxlength: 'Please keep your review under 1000 characters'
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });

            $('#details-form').validate({
                rules: {
                    details: {
                        required: true,
                        maxlength: 1500
                    }
                },
                messages: {
                    details: {
                        required: 'Please provide some details about yourself',
                        maxlength: 'Please keep your details under 1500 characters'
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });

            $('#new-password-form').validate({
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
                        required: 'Please provide a new password',
                        maxlength: 'Your password cannot exceed 26 characters',
                        minlength: 'Your password must be at least 6 characters long'
                    },
                    confirmPassword: {
                        required: 'Please confirm your new password',
                        maxlength: 'Your password cannot exceed 26 characters',
                        minlength: 'Your password must be at least 6 characters long'
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });

            $('#tutorial-form').validate({
                rules: {
                    title: {
                        required: true,
                        maxlength: 100
                    },
                    description: {
                        required: true,
                        maxlength: 250
                    },
                    content: 'required'
                },
                messages: {
                    title: {
                        required: 'Please provide a title for the tutorial',
                        maxlength: 'Your tutorials title cannot exceed 100 characters'
                    },
                    description: {
                        required: 'Please include a brief (250 character) tutorial description',
                        maxlength: 'Your description cannot exceed 250 characters'
                    },
                    content: {
                        required: 'Don\'t forget to write your tutorial!'
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });
        }
    }

    //when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY.UTIL.initFormNavigationChecking();
        JQUERY.UTIL.initDeleteConfirmations();
        JQUERY.UTIL.initFlashMessageActions();
        JQUERY.UTIL.initFormValidation();
        JQUERY.UTIL.btnPreviewAction();
    });

})(jQuery, window, document);
