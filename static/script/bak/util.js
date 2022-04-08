$(document).on('blur', 'textarea#tag_desc', function () {
    temp = $(this).val()
    temp = $(this).text(temp).html()
    tag_dict_from_backend[selected_tag_name]['tag_desc'] = temp;

});

$('#save').on('click', function (e) {
    console.log(tag_dict_from_backend)
    $.ajax({
        type: 'POST',
        url: '/save',
        data: {
            todo: JSON.stringify(tag_dict_from_backend)
        },
        success: function (res) {
            alert('saved');
        }
    });
});

$('#search_flag').on('click', function (e) {
    // x= $( "#aioConceptName option:selected" ).value();
    $(".tag_data").hide();
    let flag = $('#aioConceptName').val();
    $.ajax({
        type: 'POST',
        url: '/show_has_rule',
        data: {
            todo: flag
        },
        success: function (data) {
            console.log(data)
            table2.clear().draw();
            $.each(data, function (index, value) {
                table2.row.add([
                    value.tag
                ]).draw();
            });
        }
    });
});