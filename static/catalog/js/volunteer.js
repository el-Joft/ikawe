/**
 * Created by Sunday on 22/05/2015.
 */
$('.save_new_volunteer').click(function(e){
    e.preventDefault();
    var name = $.trim($('#volunteer_name').val());
    var gender = $('#volunteer_gender').val();
    var phone = $.trim($('#volunteer_phone').val());
    var address = $.trim($('textarea#volunteer_address').val());
    var email = $.trim($('#volunteer_email').val());
    if(name.length !== 0 && gender.length !== 0 && phone.length !== 0 && address.length !== 0 && email.length !== 0){
        $('#progress-volunteer').html(misc.ajaxLoader);
        var data = {
            name:name,
            gender:gender,
            phone:phone,
            address:address,
            email:email
        };
        $.ajax({
            method: "get",
            url: ajax_path.volunteer,
            data: 'task=volunteer&data=' + JSON.stringify(data),
            success: function (html) {
                $('#progress-volunteer').html('<div class="alert alert-success" role="alert" style="margin-top:-5px;">'+html+'</div>');
                $('#volunteer_name').val('');               
                $('#volunteer_phone').val('');
                $('textarea#volunteer_address').val('');
                $('#volunteer_email').val('');
                delayMessage('#progress-volunteer','');
            }
        });
    }else{
        $('#progress-volunteer').html('<div class="alert alert-danger" role="alert" style="margin-top:-5px;">All fields are compulsory, please fill all</div>');
        delayMessage('#progress-volunteer');
    }
});
