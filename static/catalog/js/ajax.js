// $(function() {
//     $("#search_box").keyup(function() {

//         $.ajax({

//             type: "POST",
//             url: "/search/",
//             data: {
//                 'search_text': $("#search_box").val(),
//                 'csrfmiddleware': $("input[name = csrfmiddlewaretoken]").val()
//             },
//             success: searchSuccess,
//             dataType: 'html'
//         });
//     });
// });


// function searchSuccess(data, textStatus, jqXHR){
//     $("#search-results").html(data);
// }

$(document).ready(function() {
    $('.continue').click(function() {

        var toAlert = $('#total_to_pay').val()

        $("#toPay").val(toAlert);
    });;

});