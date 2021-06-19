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
        var configElement = $(e.target);
        configElement.hide();

        var valueElement = configElement.prev('.value');
        valueElement.text(configElement.val()).show();
    });