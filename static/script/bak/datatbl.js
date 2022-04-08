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
