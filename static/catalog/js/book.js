$(function(){
    /*var scrollto = $(this).attr('data-products');
    $('html, body').animate({
        scrollTop: $('.products').offset().top
    }, 1500);*/
});
/**
 * Created by Sunday on 04/05/2015.
 */
//go to author section
$('.goto_author_section').click(function(e){
    e.preventDefault();
    var scrollto = $(this).attr('data-link');
    $('html, body').animate({
        scrollTop: $(scrollto).offset().top
    }, 1500);
});

//back history
$('#back_history_book').click(function(e){
    e.preventDefault();
    window.history.back();
});

//to borrow a book
$('.borrow').click(function(e){
    e.preventDefault();
    $('#busy-container').html('<center>'+misc.ajaxLoader+' &nbsp;please wait...</center>');
    $('#popup-busy').modal({show:true,backdrop:'static'});
    var bookId = $(this).attr('data-id');
    var bookISBN = $(this).attr('data-isbn');
    var bookTitle = $(this).attr('data-title');
    var bookAuthor = $(this).attr('data-author');
    var bookPoster = $(this).attr('data-poster');
    var bookFormat = $(this).attr('data-format');
    var bookAuthorId = $(this).attr('data-author-id');
    $.ajax({
        method: "get",
        url:ajax_path.book,
        data:'task=on_borrow&id='+bookId+'&title='+encodeURIComponent(bookTitle)+'&author_id='+bookAuthorId,
        success: function(html){
            var response = JSON.parse(html);
            if(response.status === true){
                //member is signed in
                if(response.is_available === 1){
                    //book is available
                    //show popup of book details
                    //get the book format
                    var formatOptions = '';
                    console.log(response.book_copies);
                    for(var format in response.book_copies){
                        formatOptions += '<option value="'+format+'">'+response.book_copies[format]+'</option>';
                    }
                    $('#bookFormat').html(formatOptions);
                    $('#busy-container').html('');
                    $('#popup-busy').modal('hide');
                    //show the popup_borrow dialog
                    $('.book-title').html(bookTitle);
                    $('.book-author').html(bookAuthor);
                    //$('.book-format').html(bookFormat);
                    $('.book-poster').attr('src',bookPoster);
                    $('.book-poster').attr('alt',bookTitle);
                    $('.place_borrow_request').attr('data-book-id',bookId);
                    $('.place_borrow_request').attr('data-member-id',response.member_id);
                    $('.borrow_action').addClass('show').removeClass('hide');
                    $('.borrow_action_close').addClass('hide').removeClass('show');
                    $('#popup-borrow').modal({show:true,backdrop:'static'});
                }else{
                    //book is not available
                    $('#busy-container').html('<div class="alert alert-info" role="alert">'+response.msg+'</div>');
                }

            }else{
                //check if it is an exception
                if(response.error === 1){
                    //an exception
                    $('#busy-container').html('<div class="alert alert-danger" role="alert">Could not complete task, please try again</div>');
                }else{
                    //member not signed in
                    $('#busy-container').html('<div class="alert alert-info" role="alert">Please sign in to borrow books</div>');
                }
            }
        }
    });
});

//place borrow request
$('.place_borrow_request').click(function(e){
    e.preventDefault();
    var bookId = $('#bookFormat').val();
    var memberId = $(this).attr('data-member-id');
    $('#progress_book_borrow').html(misc.ajaxLoader+'<span style="font-size:11px;"> placing borrow request...</span>');
    $.ajax({
        method: "get",
        url: ajax_path.book,
        data: 'task=place_borrow_request&book_id=' + bookId+'&member_id='+memberId,
        success: function (html) {
            console.log(html);
            if(html === '1'){
                $('#progress_book_borrow').html('<div class="alert alert-success" role="alert" style="width:160%;">Successfully placed request order. Visit the office to collect your borrowed book</div>');
                $('.borrow_action').addClass('hide').removeClass('show');
                $('.borrow_action_close').addClass('show').removeClass('hide');
            }else{
                $('#progress_book_borrow').html('<div class="alert alert-danger" role="alert"  style="width:160%;">could not place request order</div>');
            }
            delayMessage('#progress_book_borrow','');
        }
    });
});

//reload home page to update cart items
/*$('.dimiss-popup-borrow').click(function(e){
    e.preventDefault();
    location.reload();
});*/

//loading book shelf
$('.get-shelf').click(function(e){
    e.preventDefault();
    $('#busy-container').html(misc.ajaxLoader+' &nbsp;getting your book shelf');
    $('#popup-busy').modal({show:true,backdrop:'static'});
    $.ajax({
        method: "get",
        url: ajax_path.book,
        data: 'task=get_shelf',
        success: function (html) {
            var response = JSON.parse(html);
            var no_of_books = response.no_of_books;
            $('#no_of_books').html(no_of_books+' book(s) in total');
            $('#busy-container').html('');
            $('#popup-busy').modal('hide');
            $('.book-shelf-container').html(response.html);
            $('#popup-cart').modal({show:true,backdrop:'static'});
        }
    });
});

$('.book-names-sort').change(function(e){
    var bookId = $(this).val();
    if(bookId !== '0'){
        $('.products').html('<div style="text-align:center;margin-top: 40px;">'+misc.ajaxLoader+'</div>');
        $.ajax({
            method: "get",
            url: ajax_path.book,
            data: 'task=sort-book&book_id=' + bookId,
            success: function (html) {
                $('.products').html(html);
            }
        });
    }else{
        $('.products').html('<div class="alert alert-danger" role="alert" style="width:60%;margin-top: 30px;margin-left: auto;margin-right: auto;">You have not selected a book for search</div>');
    }
});

//for school pagination on book club
$('.paginate-schools').click(function(e){
    e.preventDefault();
    console.log('came here');
    var set1 = ['one','two','three','four','five'];
    var set2 = ['six','seven','eight','nine','ten'];
    var set3 = ['eleven','twelve','thirteen','fourteen','fifteen'];
    var dataRef = $(this).attr('data-ref');
    if(dataRef === 'set1'){
        //only set1 will be active
        activatePage(set1,1);
        activatePage(set2,0);
        activatePage(set3,0);
        activateList('set1list');
    }else if(dataRef === 'set2'){
        //only set2 will be active
        activatePage(set1,0);
        activatePage(set2,1);
        activatePage(set3,0);
        activateList('set2list');
    }else if(dataRef === 'set3'){
        //only set2 will be active
        activatePage(set1,0);
        activatePage(set2,0);
        activatePage(set3,1);
        activateList('set3list');
    }
});
//activate each pagination for book clubs
function activatePage(set,activate){
    //activate the set
    for(var i=0; i<set.length; i++){
        if(activate === 1) {
            $('.' + set[i]).addClass('show').removeClass('hide');
        }else{
            $('.' + set[i]).addClass('hide').removeClass('show');
        }
    }
}

function activateList(listname){
    var lists = ['set1list','set2list','set3list'];
    for(var i=0; i<lists.length; i++){
        if(lists[i] !== listname){
            $('.'+lists[i]).removeClass('active');
        }else{
            $('.'+lists[i]).addClass('active');
        }
    }
}

