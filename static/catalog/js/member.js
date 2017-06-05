/**
 * Created by Sunday on 16/04/2015.
 */


$(function(){
    //bind the plan choosen radio button of popup signup modal dialog
    $('.plan_choosen').each(function(){
        $(this).click(function(){
            memberObjects.plan_choosen = $(this).attr('data-plan');
        });
    });
});

/**
 * the join the library click event handler
 */
$('.join_library').click(function(e){
    e.preventDefault();
    if($('#join_terms_conditions').is(":checked")){
        var kind_of_books = $('#kind_of_books').val();
        var no_of_books_read = $('#no_of_books').val();
        var firstName = $.trim($('#firstname').val());
        var lastName = $.trim($('#lastname').val());
        var password = $.trim($('#password').val());
        var confirmPassword = $.trim($('#confirm_password').val());
        var email = $.trim($('#email').val());
        var phone = $.trim($('#phone').val());
        var address = $.trim($('textarea#address').val());
        var school = $.trim($('textarea#school').val());
        var gender = ($('#gender').val() === '1')?'male':'female';
        var plan = memberObjects.plan_choosen;
        if(password === confirmPassword ){
            if(password.length < 6){
                var html2 = '<div class="alert alert-danger" role="alert">';
                html2 += '<b>minimum of six(6) characters needed for password</b>';
                html2 += '</div>';
                $('#progress-signup').html(html2);
                delayMessage('#progress-signup','');
            }else{
                if(firstName.length < 1 || lastName.length < 1 || password.length < 1 || email.length < 1 ||
                    phone.length < 1 || address.length < 1 || plan === 0 ){
                    var html1 = '<div class="alert alert-danger" role="alert">';
                    html1 += 'Please fill up all fields';
                    html1 += '</div>';
                    $('#progress-signup').html(html1);
                    delayMessage('#progress-signup','');
                }else{
                    $('#progress-signup').html(misc.ajaxLoader);
                    var data = {
                        ':member_firstname':firstName,
                        ':member_lastname':lastName,
                        ':member_password':password,
                        ':member_email':email,
                        ':member_phone':phone,
                        ':member_books_read_in_a_month':no_of_books_read,
                        ':member_address':address,
                        ':member_school':school,
                        ':member_gender':gender,
                        ':member_plan_id':plan
                    };
                    var kind_of_book_obj = {'data':kind_of_books};
                    $.ajax({
                        method: "get",
                        url: ajax_path.member,
                        data:'task=add_new_member&data='+JSON.stringify(data)+'&kind_of_books='+JSON.stringify(kind_of_book_obj),
                        success: function(html){
                            var response = JSON.parse(html);
                            var html_ = '';
                            if(response.status === 'ok'){
                                //clean up
                                $('#firstname').val('');
                                $('#lastname').val('');
                                $('#password').val('');
                                $('#confirm_password').val('');
                                $('#email').val('');
                                $('#phone').val('');
                                $('textarea#address').val('');
                                $('textarea#school').val('');
                                html_ = '<div class="alert alert-success" role="alert">';
                                html_ += response.response;
                                html_ += '</div>';
                            }else{
                                html_ = '<div class="alert alert-danger" role="alert">';
                                html_ += response.response;
                                html_ += '</div>';
                            }
                            $('#progress-signup').html(html_);
                            delayMessage('#progress-signup','');
                        }
                    });
                }
            }

        }else{
            var html_ = '<div class="alert alert-danger" role="alert">';
            html_ += '<b>password does not match</b>';
            html_ += '</div>';
            $('#progress-signup').html(html_);
            delayMessage('#progress-signup','');
        }
    }else{
        var html2 = '<div class="alert alert-danger" role="alert">';
        html2 += '<b>You have not agreed to the terms and condition, click on the checkbox at the end of the terms and conditions</b>';
        html2 += '</div>';
        $('#progress-signup').html(html2);
        delayMessage('#progress-signup','');
    }

    return false;
});

/**
 * signout from the library
 */
$('.sign_out').click(function(){
    $('#progress-signout').html(misc.ajaxLoader);
    $.ajax({
        method: "get",
        url: ajax_path.member,
        data:'task=sign_out',
        success: function(html){
            var html_ = '<div class="alert alert-success" role="alert">';
            var html2 = '<div class="alert alert-danger" role="alert">';
            if(html){
                html_ += 'Successfully signed out';
                html_ += '</div>';
                $('#progress-signout').html(misc.ajaxLoader);
                location.reload();
            }else {
                html2 += 'Could not perform task, Please contact Administrator';
                html2 += '</div>';
                $('#progress-signout').html(html2);
                $('#popup-sign-out').modal('toggle');
            }
        }
    });
    return false;
});

/**
 * sign in
 */
$('.sign_in_button').click(function(){
    signIn();
    return false;
});

//when the enter button is pressed while in the password textbox
$('#sign_in_password').bind('keypress',function(e){
    if ((e.keyCode || e.which) == 13){
        if($(this).val().length > 0)
            signIn();
    }}
);

/**
 * forgot password
 */
$('#forgot_password').click(function(){
    var error_html = misc.error_html;
    var success_html = misc.success_html;
    var email = $.trim($('#sign_in_email').val());
    if(email.length === 0){
        error_html += 'Please type in your email address and click on the link again</div>';
        $('#progress_forget_password').html(error_html);
        delayMessage('#progress_forget_password','');
    }else{
        $('#progress_forget_password').html(misc.ajaxLoader);
        $.ajax({
            method: "get",
            url: ajax_path.member,
            data:'task=forgot_password&email='+email,
            success: function(html){
                var response = JSON.parse(html);
                if(response.status === 1){
                    success_html += response.msg+'</div>';
                    $('#progress_forget_password').html(success_html);
                    $('#sign_in_email').val('');
                }else{
                    error_html += response.msg;
                    error_html += '</div>';
                    $('#progress_forget_password').html(error_html);
                }
                delayMessage('#progress_forget_password','');
            }
        });
    }
    return false;
});

/**
 * save new password from recovery password
 */
$('.save_new_password').click(function(){
    var successHtml = misc.success_html;
    var errorHtml = misc.error_html;
    var newPassword = $.trim($('#recover_new_password').val());
    var confirmPassword = $.trim($('#recover_confirm_password').val());
    if(newPassword.length !== 0 && confirmPassword.length !== 0){
        if(newPassword === confirmPassword){
            var token = $('.save_new_password').attr('data-token');
            $('#progress-new-password').html(misc.ajaxLoader);
            $.ajax({
                method: "get",
                url: ajax_path.member,
                data:'task=save_new_password&password='+newPassword+'&token='+token,
                success: function(html){
                    var response = JSON.parse(html);
                    if(response.status === 1){
                        successHtml += response.msg+'</div>';
                        $('#progress-new-password').html(successHtml);
                        $('#recover_new_password').val('');
                        $('#recover_confirm_password').val('');
                    }else{
                        errorHtml += response.msg;
                        errorHtml += '</div>';
                        $('#progress-new-password').html(errorHtml);
                    }

                }
            });
        }else{
            errorHtml += 'Password Mis-matched!!!</div>';
            $('#progress-new-password').html(errorHtml);
        }
    }else{
        errorHtml += 'One or more of the required fields are empty</div>';
        $('#progress-new-password').html(errorHtml);
    }
    delayMessage('#progress-new-password','');
    return false;
});

function signIn(){
    var error_html = misc.error_html;
    var success_html = misc.success_html;
    var password = $.trim($('#sign_in_password').val());
    var email = $.trim($('#sign_in_email').val());
    if(password.length !== 0 && email.length !== 0){
        if(!validate.email(email)){
            error_html += 'Invalid email';
            error_html += '</div>';
            $('#progress_sign_in').html(error_html);
            delayMessage('#progress_sign_in','');
        }else{
            $('#progress_sign_in').html(misc.ajaxLoader);
            var data = {email:email,password:password};
            $.ajax({
                method: "get",
                url: ajax_path.member,
                data:'task=sign_in&sign_in_details='+JSON.stringify(data),
                success: function(html){
                    var response = JSON.parse(html);
                    if(response.status === 1){
                        $('#progress_sign_in').html(misc.ajaxLoader);
                        $('#progress_sign_in').html(response.msg+' ...loading page');
                        window.location.href = 'http://www.igniteafricalibrary.org/';
                    }else{
                        error_html += response.msg;
                        error_html += '</div>';
                        $('#progress_sign_in').html(error_html);
                        delayMessage('#progress_sign_in','');
                    }
                }
            });
        }
    }else{
        error_html += 'Password or Email cannot be empty';
        error_html += '</div>';
        $('#progress_sign_in').html(error_html);
        delayMessage('#progress_sign_in','');
    }
}