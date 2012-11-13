/* Author:

*/

$(document).ready(function() {
    mainController = new Controller(document);
    mainController.init();

    }
);


function posSubtract(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    };
}

function posAdd(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
}



