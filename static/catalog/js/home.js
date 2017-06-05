/**
 * Created by FansConnectOnline on 22/04/2015.
 */

var tabTimer;
$(function(){
    //for the featured and top sellers section
    Clock.start();

});

$('.tab-thumbnail').hover(function(){
    Clock.pause();
    console.log('clock paused');
}, function(){
    Clock.start();
    console.log('clock started');
});

//contact send message button
$('#contact_btn').click(function(e){
    e.preventDefault();
    var contact_name = $.trim($('#contact_name').val());
    var contact_email = $.trim($('#contact_email').val());
    var contact_phone = $.trim($('#contact_phone').val());
    var contact_message = $.trim($('textarea#contact_input-message').val());
    var contact_subject = $.trim($('#contact_subject').val());

    var data = {
        contact_name:contact_name,
        contact_email:contact_email,
        contact_phone:contact_phone,
        contact_message:contact_message,
        contact_subject:contact_subject
    };

    $('#contact_progress').html(misc.ajaxLoader);

    $.ajax({
        method: "get",
        url: ajax_path.volunteer,
        data:'task=send_contact_message&data='+JSON.stringify(data),
        success: function(html){
            $('#contact_progress').html('<div class="alert alert-danger" role="alert" style="margin-left:10px;">'+html+'</div>');
            delayMessage('#contact_progress');
        }
    });
});