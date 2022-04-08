$('button.tag-image').on('click', function () {
    let type_img = $(this).attr('type_img');
    let tag = table2.rows('.selected').data()[0][0]
    let dynamic_id = Date.now()
    let file_name = `deskbook/${type_img}/${type_img}_${tag}_${dynamic_id}.png`
    $.ajax({
        type: 'POST',
        url: '/paste',
        data: {
            todo: file_name
        },
        success: function (res) {
            tag_dict_from_backend[tag][`${type_img}_img`].push(file_name)
            let str = `<span class="list-group" id="tag_img_${type_img}_${dynamic_id}">
                        <a target="_blank" href="static/img/${file_name}" class="list-group-item list-group-item-action">
                            <img src="static/img/${file_name}" width="100px" height="auto">
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                      <a file_name="${file_name}" dynamic_id="${dynamic_id}" type_img="${type_img}" href="#" class="list-group-item list-group-item-action move-to-bin">Move to bin</a>
                </span>`
            $(`div#tag_img_${type_img}`).append(str)
        }
    });
});
