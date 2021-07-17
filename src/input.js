var data = {};

// Hide value and set its value into the config
$('.value')
    .click((e) => {
        var valueElement = $(e.target);
        valueElement.hide();

        var text = valueElement.text();
        console.log(text);
        if (text == "") text = "...";

        var configElement = valueElement.next(".config").show();
        configElement.val(text);
    });


// Visualize changes entered by the user
$('.config')
    .focusout(UpdateConfig);

const params = new URLSearchParams(location.search);
function UpdateConfig(e) {
    // Closest can fire on parents as well as self, neat
    var configElement = $(e.target);
    configElement.hide();

    var valueElement = configElement.prev('.value');
    var configValue = configElement.val();

    if (e.target.className.includes('tag')) {
        configElement.parent('div').hide();
        configValue = configElement.closest('tags').value;
    }

    console.log(configValue);
    if (configValue == "") configValue = "...";


    valueElement.text(configValue).show();

    // Set universal data
    data[valueElement.attr('id')] = configValue;
    console.log(data)

    // Set values in URL
    // https://stackoverflow.com/a/56777426
    params.set(valueElement.attr('id'), configValue);
    window.history.replaceState({}, '', location.pathname + "?" + params.toString());
}

// On startup, set values
var paramEntries = params.entries();
var entry;
while (!(entry = paramEntries.next()).done) {
    console.log(entry)
    var configElement = $("#" + entry.value[0]).next(".config");
    console.log(configElement)
    configElement.val(entry.value[1]);
    configElement.focusout();
}