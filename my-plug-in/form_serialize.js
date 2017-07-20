/**
 * Created by Momax on 2017/7/20.
 */

function serialize(form) {
    "use strict";
    var parts = [],
        field = null,
        i,
        len = form.elements.length,
        j,
        optLen = field.options.length,
        option,
        optValue;

    for (i = 0; i < len; i += 1) {
        field = form.elements[i];

        switch (field.type) {
            case "select-one" :
            case "select-multiple" :

                if (field.name.length) {
                    for (j = 0; j < optLen; j += 1) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            }
                            else {
                                optValue = (option.attributes.value.specified ? option.value : option.text);
                            }

                            parts.push(encodeURIComponent(field.name) + "=" +
                                encodeURIComponent(optValue));
                        }
                    }
                }
                break;

            case undefined  :   //字段集
            case "file"     :
            case "submit"   :
            case "reset"    :
            case "button"   :
                break;

            case "radio"    :   //单选按钮
            case "checkbox" :   //复选框
                //没选中就跳出
                if (!field.checked) {
                    break;
                }
                break;
                /*默认行为*/
            default:
                // does something even more
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" +
                        encodeURIComponent(field.value));
                }

        }
    }
    return parts.join("&");
}
