"use strict";$(".value").click(function(t){var e=$(t.target);e.hide();t=e.text();console.log(t),""==t&&(t="..."),e.next(".config").show().val(t)}),$(".config").focusout(function(t){var e=$(t.target);e.hide();var a=e.prev(".value");e.val();t.target.className.includes("tag")&&(e.parent("div").hide(),e.closest("tags").value),a.text(e.val()).show()});