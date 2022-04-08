$(document).ready(function () {
    var selected_tag_name = ''

    var table = $('#example').DataTable({
        "dom": '<"pull-left"f><"pull-right"l>tip',
        language: {search: "", searchPlaceholder: "Search..."},
        "paging": false,
        "info": false
    });

    var table2 = $('#tag_list_table').DataTable({
        scrollY: '72vh',
        select: true,
        "dom": '<"pull-left"f><"pull-right"l>tip',
        language: {search: "", searchPlaceholder: "Search..."},
        "paging": false,
        "info": false
    });

    $('#has_rule').change(function () {
        tag_dict_from_backend[selected_tag_name]['has_rule'] = !tag_dict_from_backend[selected_tag_name]['has_rule']
    });

    $('#has_query').change(function () {
        tag_dict_from_backend[selected_tag_name]['has_query'] = !tag_dict_from_backend[selected_tag_name]['has_query']
    });


    $('#tag_list_table tbody').on('click', 'tr', function () {

        $(".tag_data").show();

        let data = table2.row(this).data()[0];
        selected_tag_name = data
        let accordionExample = $("#accordionExample")
        accordionExample.empty();
        let tag_name = tag_dict_from_backend[data]['tag']

        if (tag_dict_from_backend[tag_name]['has_rule']) {
            $("#has_rule").prop('checked', true);
        } else {
            $("#has_rule").prop('checked', false);
        }

        if (tag_dict_from_backend[tag_name]['has_query']) {
            $("#has_query").prop('checked', true);
        } else {
            $("#has_query").prop('checked', false);
        }


        $('#tag_name').html(`&lt;${tag_name}&gt;`)

        // $('#tag_desc').html(tag_dict_from_backend[data]['tag_desc'])
        $('textarea#tag_desc').val(tag_dict_from_backend[data]['tag_desc'])


        y = tag_dict_from_backend[data]['xml_img']
        let tag_img_xml = $('#tag_img_xml')
        tag_img_xml.empty()
        for (let j = 0; j < y.length; j++) {
            let dynamic_id = Date.now()
            tag_img_xml.append(`
                <span class="list-group" id="tag_img_xml_${dynamic_id}">
                        <a target="_blank" href="static/img/${y[j]}" class="list-group-item list-group-item-action" aria-current="true">
                            <img src="static/img/${y[j]}" alt="" srcset="" width="100px" height="auto">
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>

                        <a file_name="${y[j]}" dynamic_id="${dynamic_id}" type_img="xml" href="#" class="list-group-item list-group-item-action move-to-bin">Move to bin</a>
                </span>
                `)
        }


        y = tag_dict_from_backend[data]['pdf_img']
        let tag_img_pdf = $("#tag_img_pdf")
        tag_img_pdf.empty()
        for (let j = 0; j < y.length; j++) {
            let dynamic_id = Date.now()
            tag_img_pdf.append(`
                <span class="list-group" id="tag_img_pdf_${dynamic_id}">
                        <a target="_blank" href="static/img/${y[j]}" class="list-group-item list-group-item-action" aria-current="true">
                            <img src="static/img/${y[j]}" alt="" srcset="" width="100px" height="auto">
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                         <a file_name="${y[j]}" dynamic_id="${dynamic_id}" type_img="pdf" href="#" class="list-group-item list-group-item-action move-to-bin">Move to bin</a>
                </span>
                `)
        }


        y = tag_dict_from_backend[data]['check_img']
        let tag_img_check = $("#tag_img_check")
        tag_img_check.empty()
        for (let j = 0; j < y.length; j++) {
            let dynamic_id = Date.now()
            tag_img_check.append(`
                <span class="list-group" id="tag_img_check_${dynamic_id}">
                        <a target="_blank" href="static/img/${y[j]}" class="list-group-item list-group-item-action" aria-current="true">
                            <img src="static/img/${y[j]}" alt="" srcset="" width="100px" height="auto">
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                        <a file_name="${y[j]}" dynamic_id="${dynamic_id}" type_img="check" href="#" class="list-group-item list-group-item-action move-to-bin">Move to bin</a>

                </span>
                `)
        }


        y = Object.values(tag_dict_from_backend[data]['att'])
        for (let j = 0; j < y.length; j++) {
            x = y[j]['att_key']
            accordionExample.append(`
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${x}" aria-expanded="true" aria-controls="collapse${x}">
                            ${x}
                        </button>
                        </h2>

                        <div id="collapse${x}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="accordionExample${x}">
                            <div>${y[j]['att_val']}</div>
                                <textarea class="form-control att_desc" id="att_desc_${x}" att_key="${x}" rows="3">${y[j]['att_desc']}</textarea>
                            <ul class="list-group">
                                <li class="list-group-item list-group-item-secondary">xml
                                <button type="button" class="btn btn-primary btn-sm float-end attribute-image" type_img="xml" att_key="${x}">Paste</button>

                                </li>
                                <li class="list-group-item">
                                    <div class="scrollmenu" id="tag_att_img_xml_${x}">
                                    
                                    </div>
                                </li>
                                
                                
                                <li class="list-group-item list-group-item-secondary">pdf
                                <button type="button" class="btn btn-primary btn-sm float-end attribute-image" type_img="pdf" att_key="${x}">Paste</button>
                                </li>
                                <li class="list-group-item">
                                    <div class="scrollmenu" id="tag_att_img_pdf_${x}">

                                    </div>
                                </li>
                                
                                <li class="list-group-item list-group-item-secondary">checkpoint
                                <button type="button" class="btn btn-primary btn-sm float-end attribute-image" type_img="check" att_key="${x}">Paste</button>
                                </li>
                                <li class="list-group-item">
                                    <div class="scrollmenu" id="tag_att_img_check_${x}">

                                    </div>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    `);

            k = y[j]['xml_img']
            let tag_att_img_xml = $(`#tag_att_img_xml_${x}`)
            tag_att_img_xml.empty()
            for (let j = 0; j < k.length; j++) {
                let dynamic_id = Date.now()
                tag_att_img_xml.append(`
                <span class="list-group"  id="tag_att_img_xml_${dynamic_id}">
                        <a target="_blank" href="static/img/${k[j]}" class="list-group-item list-group-item-action" aria-current="true">
                            <img src="static/img/${k[j]}" alt="" srcset="" width="100px" height="auto">
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>

                        <a file_name="${k[j]}" att_key="${x}" dynamic_id="${dynamic_id}" type_img="xml" href="#" class="list-group-item list-group-item-action move-to-bin-att">Move to bin</a>
                </span>
                `)
            }


            k = y[j]['pdf_img']
            let tag_att_img_pdf = $(`#tag_att_img_pdf_${x}`)
            tag_att_img_pdf.empty()
            for (let j = 0; j < k.length; j++) {
                let dynamic_id = Date.now()
                tag_att_img_pdf.append(`
                <span class="list-group"  id="tag_att_img_pdf_${dynamic_id}">
                        <a target="_blank" href="static/img/${k[j]}" class="list-group-item list-group-item-action" aria-current="true">
                            <img src="static/img/${k[j]}" alt="" srcset="" width="100px" height="auto">
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                        <a file_name="${k[j]}" att_key="${x}" dynamic_id="${dynamic_id}" type_img="pdf" href="#" class="list-group-item list-group-item-action move-to-bin-att">Move to bin</a>

                </span>
                `)
            }

            k = y[j]['check_img']
            let tag_att_img_check = $(`#tag_att_img_check_${x}`)
            tag_att_img_check.empty()
            for (let j = 0; j < k.length; j++) {
                let dynamic_id = Date.now()
                tag_att_img_check.append(`
                <span class="list-group"  id="tag_att_img_check_${dynamic_id}">
                        <a target="_blank" href="static/img/${k[j]}" class="list-group-item list-group-item-action" aria-current="true">
                            <img src="static/img/${k[j]}" alt="" srcset="" width="100px" height="auto">
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>

                        <a file_name="${k[j]}" att_key="${x}" dynamic_id="${dynamic_id}" type_img="check" href="#" class="list-group-item list-group-item-action move-to-bin-att">Move to bin</a>

                </span>
                `)
            }


        }
    });

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

    $(document).delegate('.move-to-bin', 'click', function () {
        let file_name = $(this).attr('file_name');
        let dynamic_id = $(this).attr('dynamic_id');
        let type_img = $(this).attr('type_img');
        let arr = tag_dict_from_backend[selected_tag_name][`${type_img}_img`]
        arr.splice(arr.indexOf(file_name), 1);
        $(`span#tag_img_${type_img}_${dynamic_id}`).remove();
        $.ajax({
            type: 'POST',
            url: '/move-to-bin',
            data: {
                todo: JSON.stringify(tag_dict_from_backend),
                file: file_name
            },
            success: function (res) {

            }
        });

    });
    $(document).delegate('.move-to-bin-att', 'click', function () {
        let file_name = $(this).attr('file_name');
        let dynamic_id = $(this).attr('dynamic_id');
        let type_img = $(this).attr('type_img');
        let att_key = $(this).attr('att_key');
        let arr = tag_dict_from_backend[selected_tag_name]['att'][att_key][`${type_img}_img`]
        arr.splice(arr.indexOf(file_name), 1);
        $(`span#tag_att_img_${type_img}_${dynamic_id}`).remove();
        $.ajax({
            type: 'POST',
            url: '/move-to-bin',
            data: {
                todo: JSON.stringify(tag_dict_from_backend),
                file: file_name
            },
            success: function (res) {

            }
        });

    });

    $(document).delegate('.attribute-image', 'click', function () {
        let type_img = $(this).attr('type_img');
        let att_key = $(this).attr('att_key');
        let tag = table2.rows('.selected').data()[0][0]
        let file_name = `deskbook/att/${type_img}/att_${type_img}_${tag}_${Date.now()}.png`
        let dynamic_id = Date.now()
        $.ajax({
            type: 'POST',
            url: '/paste',
            data: {
                todo: file_name
            },
            success: function (res) {
                tag_dict_from_backend[tag]['att'][att_key][`${type_img}_img`].push(file_name)
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
    });

    $(document).delegate('.att_desc', 'blur', function () {
        att_key = $(this).attr('att_key');
        temp = $(`#att_desc_${att_key}`).val()
        temp = $(this).text(temp).html()
        alert(temp)
        tag_dict_from_backend[selected_tag_name]['att'][att_key]['att_desc'] = temp
    });
});


