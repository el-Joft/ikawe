/**
 * Created by Sunday on 03/06/2015.
 */
$('.search_button').click(function(e){
    e.preventDefault();
    var book_title = $.trim($('.book_search_title').val());
    book_title = replaceAll(book_title,' ','_');
    var category = $('.book_search_category').val();
    window.location.href = 'http://igniteafricalibrary.org/search/'+category+'/'+encodeURIComponent(book_title);
});

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}