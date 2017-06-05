/**
 * Created by Sunday on 15/03/2016.
 */
$('.save_new_donation').click(function(e){
    e.preventDefault();
    var name = $.trim($('#donate_name').val());
    var email = $.trim($('#donate_email').val());
    var phone = $.trim($('#donate_phone').val());
    var phone2 = $.trim($('#donate_phone2').val());
    var city = $.trim($('#donate_city').val());
    var state = $.trim($('#donate_state').val());
    var amount = $.trim($('#donate_amount').val());
    var one_time_payment = $.trim($('#donate_not_recurring_amount').val());
    var recurring_period = $('#donate_recurring').val();
    var address = $.trim($('textarea#donate_address').val());

    var go_ahead = 1;
    var error_string = "";
    if(name.length === 0){
        error_string += '- The Name field is Empty<br/>';
        go_ahead = 0;
    }
    if(email.length === 0){
        error_string += '- The Email field is Empty<br/>';
        go_ahead = 0;
    }
    if(phone.length === 0 && phone2.length === 0){
        error_string += '- At least one phone number should be added<br/>';
        go_ahead = 0;
    }
    if(amount.length === 0 || isNaN(amount)){
        error_string += '- There is no amount specified. Amount should be Numeric<br/>';
        go_ahead = 0;
    }
    if(recurring_period === '0' && (one_time_payment.length === 0 || isNaN(one_time_payment))){
        error_string += '- Amount to be paid is not recurring, Please fill Amount in the <b>"One-time only Amount"</b> field<br/>';
        go_ahead = 0;
    }

    if(go_ahead === 0){
        $('#progress-donate').html('<div class="alert alert-danger" role="alert" style="margin-top:-5px;text-align:left;">'+error_string+'</div>');
        delayMessage('#progress-donate');
    }else{
        $('#progress-donate').html(misc.ajaxLoader);
        var data = {
            name:name,
            phone2:phone2,
            phone:phone,
            address:address,
            email:email,
            city:city,
            state:state,
            amount:amount,
            oneTimePayment:one_time_payment,
            recurring_period:recurring_period
        };
        console.log(data);
        $.ajax({
            method: "get",
            url: ajax_path.donate,
            data: 'task=donate&data=' + JSON.stringify(data),
            success: function (html) {
                console.log(html);
                var parsed = JSON.parse(html);
                if(parsed.status === 'ok'){
                    $('#progress-donate').html('<div class="alert alert-success" role="alert" style="margin-top:-5px;text-align:left;">'+parsed.msg+'</div>');
                    $('#donate_name').val('');
                    $('#donate_email').val('');
                    $('#donate_phone').val('');
                    $('#donate_phone2').val('');
                    $('#donate_city').val('');
                    $('#donate_amount').val('');
                    $('#donate_not_recurring_amount').val('');
                    $('textarea#donate_address').val('');
                }else{
                    $('#progress-donate').html('<div class="alert alert-danger" role="alert" style="margin-top:-5px;text-align:left;">'+parsed.msg+'</div>');
                }

                delayMessage('#progress-donate','');
            }
        });
    }

});