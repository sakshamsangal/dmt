$(document).ready(function () {
    var selected_tag_name = ''
    // var table = $('#example').DataTable({
    //     "dom": '<"pull-left"f><"pull-right"l>tip',
    //     language: {search: "", searchPlaceholder: "Search..."},
    //     "paging": false,
    //     "info": false
    // });
    var tag_table = $('#tag_list_table').DataTable({
        scrollY: '72vh',
        select: true,
        "dom": '<"pull-left"f><"pull-right"l>tip',
        language: {search: "", searchPlaceholder: "Search..."},
        "paging": false,
        "info": false
    });

    function get_tag_img_span(genre, dynamic_id, file_name, link) {
        return `<span class="list-group" id="tag_img_${genre}_${dynamic_id}" style="margin-right: 3px">
                        <a target="_blank" href="static/img/${file_name}" class="list-group-item list-group-item-action"
                           aria-current="true">
                            <img src="static/img/${file_name}" alt="" srcSet="" width="100px" height="auto">
                        </a>
                        <a target="_blank" href="${link}" class="list-group-item list-group-item-action">External link</a>
                        <a file_name="${file_name}" dynamic_id="${dynamic_id}" type_img="${genre}" href="#"
                           class="list-group-item list-group-item-action list-group-item-danger move-to-bin">Move to bin</a>
                </span>`
    }

    function append_tag(genre, y) {
        let tag_img = $(`#tag_img_${genre}`)
        tag_img.empty()

        for (let key in y) {
            if (y.hasOwnProperty(key)) {
                let dynamic_id = Date.now() + '_' + Math.floor(Math.random() * 1001)
                tag_img.append(get_tag_img_span(genre, dynamic_id, key, y[key]))
            }
        }

    }

    function get_att_img_span(genre, dynamic_id, file_name, att_key, link) {
        return `<span class="list-group"  id="tag_att_img_${genre}_${dynamic_id}" >
                    <a target="_blank" href="static/img/${file_name}" class="list-group-item list-group-item-action" aria-current="true">
                        <img src="static/img/${file_name}" alt="" srcset="" width="100px" height="auto">
                    </a>
                    <a target="_blank" href="${link}" class="list-group-item list-group-item-action">External link</a>

                    <a file_name="${file_name}" att_key="${att_key}" dynamic_id="${dynamic_id}" type_img="${genre}" href="#" class="list-group-item list-group-item-action list-group-item-danger move-to-bin-att">Move to bin</a>
            </span>
            `
    }

    function append_att(genre, y, att_key) {
        let tag_att_img = $(`#tag_att_img_${genre}_${att_key}`)
        tag_att_img.empty()
        console.log('58', y)
        for (let key in y) {
            if (y.hasOwnProperty(key)) {
                let dynamic_id = Date.now() + '_' + Math.floor(Math.random() * 1001)
                tag_att_img.append(get_att_img_span(genre, dynamic_id, key, att_key, y[key]))
            }
        }
    }

    function temp_fun(x) {
        let temp = ''
        let genre = ['xml', 'pdf', 'check']
        for (let i = 0; i < genre.length; i++) {
            temp += `<li class="list-group-item list-group-item-secondary">${genre[i]}
                <button type="button" class="btn btn-primary btn-sm float-end attribute-image" type_img="${genre[i]}"
                        att_key="${x}">Paste</button>
            </li>
            <li class="list-group-item">
                <div class="scrollmenu" id="tag_att_img_${genre[i]}_${x}">

                </div>
            </li>
            `
        }
        return temp
    }

    function append_accordion(y, accordionExample) {

        for (let j = 0; j < y.length; j++) {
            p = y[j]['att_val']
            t = '<ul>'
            for (var key in p) {
                if (p.hasOwnProperty(key)) {
                    t += `<li>${key} : ${p[key]}</li>`
                }
            }
            t += '</ul>'
            let x = y[j]['att_key']
            accordionExample.append(`
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${x}" aria-expanded="true" aria-controls="collapse${x}">
                    ${x}
                </button>
                </h2>

                <div id="collapse${x}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body" id="accordionExample${x}">
                    <div>${t}</div>
                        <textarea class="form-control att_desc" id="att_desc_${x}" att_key="${x}" rows="3">${y[j]['att_desc']}</textarea>
                    <ul class="list-group">
                        ${temp_fun(x)}                               
                    </ul>
                </div>
                </div>
            </div>
        `);
        }
    }

    let total_cat = ['sak', 'san', 'lavi', 'Alaska', 'Wisconsin']

    function append_cat(tag_name) {
        console.log('hello')

        // selectize.addItem('value', 'silent');

        selectize.addOption([1,2]);

        // let cat = $("#select_state1")
        // cat.empty()
        // let arr_cat = tag_dict_from_backend[tag_name]['cat']
        // let temp =  '<option value="">Define category...</option>'
        // // let temp =''
        // for (let i = 0; i < total_cat.length; i++) {
        //     if (arr_cat.includes(total_cat[i])) {
        //         temp += `<option value="${total_cat[i]}" selected>${total_cat[i]}</option>`
        //     } else {
        //         temp += `<option value="${total_cat[i]}">${total_cat[i]}</option>`
        //     }
        // }
        // console.log(arr_cat)
        // cat.append(temp)
        // selectize
    }


    $('#has_rule').change(function () {
        tag_dict_from_backend[selected_tag_name]['has_rule'] = !tag_dict_from_backend[selected_tag_name]['has_rule']
    });
    $('#has_query').change(function () {
        tag_dict_from_backend[selected_tag_name]['has_query'] = !tag_dict_from_backend[selected_tag_name]['has_query']
    });
    $('#tag_list_table tbody').on('click', 'tr', function () {
        $(".tag_data").show();


        let accordionExample = $("#accordionExample")
        accordionExample.empty();

        let data = tag_table.row(this).data()[0];
        selected_tag_name = data

        append_cat(selected_tag_name)


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
        $('textarea#tag_desc').val(tag_dict_from_backend[data]['tag_desc'])
        append_tag('xml', tag_dict_from_backend[data]['xml_img'])
        append_tag('pdf', tag_dict_from_backend[data]['pdf_img'])
        append_tag('check', tag_dict_from_backend[data]['check_img'])
        let list_of_att = Object.values(tag_dict_from_backend[data]['att'])
        append_accordion(list_of_att, accordionExample)
        for (let j = 0; j < list_of_att.length; j++) {
            let att_key = list_of_att[j]['att_key']
            append_att('xml', list_of_att[j]['xml_img'], att_key)
            append_att('pdf', list_of_att[j]['pdf_img'], att_key)
            append_att('check', list_of_att[j]['check_img'], att_key)
        }
    });
    $('#save').on('click', function (e) {
        // alert(prod)
        console.log(tag_dict_from_backend)
        $.ajax({
            type: 'POST',
            url: '/save',
            data: {
                prod: prod,
                todo: JSON.stringify(tag_dict_from_backend)
            },
            success: function (res) {

                $.confirm({
                    title: 'Congratulations!',
                    backgroundDismissAnimation: 'glow',
                    backgroundDismiss: true,
                    theme: 'dark',
                    content: 'Data saved',
                });
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
                prod: prod,
                todo: flag
            },
            success: function (data) {
                console.log(data)
                tag_table.clear().draw();
                $.each(data, function (index, value) {
                    tag_table.row.add([
                        value.tag
                    ]).draw();
                });
            }
        });
    });
    $('button.tag-image').on('click', function () {
        let type_img = $(this).attr('type_img');
        let tag = tag_table.rows('.selected').data()[0][0]
        let dynamic_id = Date.now()
        let file_name = `${prod}/${type_img}/${type_img}_${tag}_${dynamic_id}.png`
        $.ajax({
            type: 'POST',
            url: '/paste',
            data: {
                todo: file_name
            },
            success: function (res) {
                let x = $('#my_link')
                tag_dict_from_backend[tag][`${type_img}_img`][file_name] = x.val()
                $(`div#tag_img_${type_img}`).append(get_tag_img_span(type_img, dynamic_id, file_name, x.val()))
                x.val('')
            }
        });
    });

    $(document).delegate('.attribute-image', 'click', function () {
        let type_img = $(this).attr('type_img');
        let att_key = $(this).attr('att_key');
        let tag = tag_table.rows('.selected').data()[0][0]
        let dynamic_id = Date.now()
        let file_name = `${prod}/att/${type_img}/att_${type_img}_${tag}_${dynamic_id}.png`
        $.ajax({
            type: 'POST',
            url: '/paste',
            data: {
                todo: file_name
            },
            success: function (res) {
                let x = $('#my_link')
                tag_dict_from_backend[tag]['att'][att_key][`${type_img}_img`][file_name] = x.val()
                $(`#tag_att_img_${type_img}_${att_key}`).append(get_att_img_span(type_img, dynamic_id, file_name, att_key, x.val()))
                x.val('')
            }
        });
    });

    $(document).on('blur', 'textarea#tag_desc', function () {
        temp = $(this).val()
        temp = $(this).text(temp).html()
        tag_dict_from_backend[selected_tag_name]['tag_desc'] = temp;

    });

    $(document).delegate('.att_desc', 'blur', function () {
        att_key = $(this).attr('att_key');
        temp = $(`#att_desc_${att_key}`).val()
        temp = $(this).text(temp).html()
        tag_dict_from_backend[selected_tag_name]['att'][att_key]['att_desc'] = temp
    });

    $(document).delegate('.move-to-bin', 'click', function () {
        let file_name = $(this).attr('file_name');
        let dynamic_id = $(this).attr('dynamic_id');
        let type_img = $(this).attr('type_img');
        let arr = tag_dict_from_backend[selected_tag_name][`${type_img}_img`]
        delete arr[file_name];
        $(`span#tag_img_${type_img}_${dynamic_id}`).remove();
        $.ajax({
            type: 'POST',
            url: '/move-to-bin',
            data: {
                file: file_name
            }
        });
    });

    $(document).delegate('.move-to-bin-att', 'click', function () {
        let file_name = $(this).attr('file_name');
        let dynamic_id = $(this).attr('dynamic_id');
        let type_img = $(this).attr('type_img');
        let att_key = $(this).attr('att_key');
        let arr = tag_dict_from_backend[selected_tag_name]['att'][att_key][`${type_img}_img`]
        delete arr[file_name];
        $(`span#tag_att_img_${type_img}_${dynamic_id}`).remove();
        $.ajax({
            type: 'POST',
            url: '/move-to-bin',
            data: {
                file: file_name
            }
        });

    });

});


