/**
 * Created by Sunday on 02/06/2015.
 */
var busy = false;
$(function(){
    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            if(busy === false){
                busy = true;
                $('.moreloading').html(misc.ajaxLoader);
                $.ajax({
                    method: "get",
                    url: ajax_path.book,
                    data: 'task=more_books',
                    success: function (html) {
                        var response = JSON.parse(html);
                        if(response.status !== 0){
                            $('.products').append(response.html);
                        }
                        $('.moreloading').html('');
                        busy = false;
                    }
                });
            }

        }
    });
});