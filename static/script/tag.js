var eventHandler = function (name) {
    // tag_dict_from_backend[tag_name]['cat'] = arguments[0]
    return function () {
        console.log(selectize)
        console.log(122, name);
    };
};

var $select2 = $("#select-state").selectize({
    create: true,
    onChange: eventHandler("onChange"),
    // onItemAdd       : eventHandler('onItemAdd'),
    // onItemRemove    : eventHandler('onItemRemove'),
    // onOptionAdd     : eventHandler('onOptionAdd'),
    // onOptionRemove  : eventHandler('onOptionRemove'),
    // onDropdownOpen  : eventHandler('onDropdownOpen'),
    // onDropdownClose : eventHandler('onDropdownClose'),
    // onFocus         : eventHandler('onFocus'),
    // onBlur          : eventHandler('onBlur'),
    // onInitialize    : eventHandler('onInitialize'),
});

var $select = $(`#select_state1`).selectize({
    create: true,
    onBlur: eventHandler('onblur'),
    options: [12,3,4,5],
    items: [34,5]
});

var selectize = $select[0].selectize;
selectize.addOption([1,2]);

var selectize2 = $select2[0].selectize;
// selectize2.addOption([1,2,3,4,5]);




