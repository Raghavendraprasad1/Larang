// console.log("adsnd");

// $(document).on("focus", ".dynamic_list", function () {
//     $.ajax({
//         headers: {
//             "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//         },
//         url: "/getlist",
//         type: "POST",
//         success: function (data) {
//             console.log(data);
//             $(".selectdatalist").html(data);
//         },
//     });
// });

$(document).ready(function () {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: "/getlist",
        type: "POST",
        success: function (data) {
            $(".selectdatalist").html(data);
        },
    });
});
