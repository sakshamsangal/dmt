$(document).on('blur', 'textarea#tag_desc', function () {
    temp = $(this).val()
    temp = $(this).text(temp).html()
    tag_dict_from_backend[selected_tag_name]['tag_desc'] = temp;

});
$(document).delegate('.att_desc', 'blur', function () {
    att_key = $(this).attr('att_key');
    temp = $(`#att_desc_${att_key}`).val()
    temp = $(this).text(temp).html()
    alert(temp)
    tag_dict_from_backend[selected_tag_name]['att'][att_key]['att_desc'] = temp
});

