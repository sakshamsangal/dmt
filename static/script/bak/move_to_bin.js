$(document).delegate('.move-to-bin', 'click', function () {
    let file_name = $(this).attr('file_name');
    let dynamic_id = $(this).attr('dynamic_id');
    let type_img = $(this).attr('type_img');
    $.ajax({
        type: 'POST',
        url: '/move-to-bin',
        data: {
            file: file_name
        },
        success: function (res) {
            let arr = tag_dict_from_backend[selected_tag_name][`${type_img}_img`]
            arr.splice(arr.indexOf(file_name), 1);
            $(`span#tag_img_${type_img}_${dynamic_id}`).remove();
        }
    });

});
$(document).delegate('.move-to-bin-att', 'click', function () {
    let file_name = $(this).attr('file_name');
    let dynamic_id = $(this).attr('dynamic_id');
    let type_img = $(this).attr('type_img');
    let att_key = $(this).attr('att_key');
    $.ajax({
        type: 'POST',
        url: '/move-to-bin',
        data: {
            file: file_name
        },
        success: function (res) {
            let arr = tag_dict_from_backend[selected_tag_name]['att'][att_key][`${type_img}_img`]
            arr.splice(arr.indexOf(file_name), 1);
            $(`span#tag_att_img_${type_img}_${dynamic_id}`).remove();
        }
    });

});
