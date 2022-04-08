$('#has_rule').change(function () {
    tag_dict_from_backend[selected_tag_name]['has_rule'] = !tag_dict_from_backend[selected_tag_name]['has_rule']
});

$('#has_query').change(function () {
    tag_dict_from_backend[selected_tag_name]['has_query'] = !tag_dict_from_backend[selected_tag_name]['has_query']
});
