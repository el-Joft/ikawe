/**
 * Created by Sunday on 27/05/2015.
 */
$('.event_handler').click(function(e){
    e.preventDefault();
    var previous_link = $('#current_item').val();
    $('.'+previous_link).removeClass('current');

    var id = $(this).attr('data-id');
    var header = $(this).attr('data-header');
    var brief = $(this).attr('data-brief');
    var label = $(this).attr('data-label');

    $('.event-'+id).addClass('current');
    $('#current_item').val('event-'+id);
    $('.photos_').html('<center>'+misc.ajaxLoader+'</center>');
    var event_header = '<h3 style="text-align:center;">'+header+'</h3>';
    event_header += brief;
    $('.event_header').html(event_header);
    $('.breadcrumb_eventlabel').html('| '+label+' |');
    $.ajax({
        method: "get",
        url: ajax_path.events,
        data: 'task=event&event_id=' + id+'&event_label='+encodeURIComponent(label),
        async: true,
        success: function (html) {
            $('.photos_').html(html);
        }
    });
});