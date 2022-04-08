$(document).delegate('.attribute-image', 'click', function () {
    let type_img = $(this).attr('type_img');
    let att_key = $(this).attr('att_key');
    let file_name = `deskbook/att/${type_img}/att_${type_img}_${selected_tag_name}_${Date.now()}.png`
    let dynamic_id = Date.now()
    $.ajax({
        type: 'POST',
        url: '/paste',
        data: {
            todo: file_name
        },
        success: function (res) {
            tag_dict_from_backend[selected_tag_name]['att'][att_key][`${type_img}_img`].push(file_name)
            $(`#tag_att_img_${type_img}_${att_key}`).append(`
                <span class="list-group" id="tag_att_img_${type_img}_${dynamic_id}">
                        <a target="_blank" href="static/img/${file_name}" class="list-group-item list-group-item-action" aria-current="true">
                            <img src="static/img/${file_name}" alt=""  width="100px" height="auto">
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                        <a file_name="${file_name}" att_key="${att_key}" dynamic_id="${dynamic_id}" type_img="${type_img}" href="#" class="list-group-item list-group-item-action move-to-bin-att">Move to bin</a>
                </span>
                `)
        }
    });
})



