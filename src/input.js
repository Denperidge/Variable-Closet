// Hide value and set its value into the ocnfig
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


$('.config')
    .focusout((e) => {
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

    });