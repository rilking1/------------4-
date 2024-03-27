const contextMenu = document.getElementById('contextMenu');
let contextMenuPosition = { x: 0, y: 0 };
let fixedPositionSet = false;

document.addEventListener('keydown', function (event) {
    if (event.key === 'e' && !fixedPositionSet) {
        contextMenuPosition.x = event.clientX;
        contextMenuPosition.y = event.clientY;
        contextMenu.style.display = 'block';
        contextMenu.style.left = contextMenuPosition.x + 'px';
        contextMenu.style.top = contextMenuPosition.y + 'px';
        fixedPositionSet = true;
    }
});

document.addEventListener('mousemove', function (event) {
    if (!fixedPositionSet) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        contextMenu.style.left = mouseX - 500 + 'px';
        contextMenu.style.top = mouseY - 500 + 'px';
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'e') {
        const activeSlice = document.querySelector('.slice:hover');
        if (activeSlice) {
            const page = activeSlice.getAttribute('data-page');
            if (page) {
                // Редірект на відповідну сторінку згідно зі значенням data-page
                window.location.href = page + '.html'; // Змініть .html на розширення вашої сторінки
            }
        }
        contextMenu.style.display = 'none';
        fixedPositionSet = false;
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var circle = document.querySelector('.circle');
    var miniCenterCircle = document.querySelector('.MiniCenterCircle');
    var centerCircle = document.querySelector('.CenterCircle');
    
    circle.addEventListener('mousemove', function(e) {
        var circleRect = circle.getBoundingClientRect();
        var circleCenterX = circleRect.width / 2;
        var circleCenterY = circleRect.height / 2;

        var mouseX = e.clientX - circleRect.left;
        var mouseY = e.clientY - circleRect.top;

        var mouseXFromCenter = mouseX - circleCenterX;
        var mouseYFromCenter = mouseY - circleCenterY;
        
        var dx = mouseXFromCenter;
        var dy = mouseYFromCenter;
        
        var distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < parseFloat(getComputedStyle(centerCircle).width) / 2) {
            miniCenterCircle.style.left = mouseX + 'px';
            miniCenterCircle.style.top = mouseY + 'px';
        } else {
            var angle = Math.atan2(dy, dx);
            var x = Math.cos(angle) * (parseFloat(getComputedStyle(centerCircle).width) / 2);
            var y = Math.sin(angle) * (parseFloat(getComputedStyle(centerCircle).height) / 2);
            
            miniCenterCircle.style.left = circleCenterX + x + 'px';
            miniCenterCircle.style.top = circleCenterY + y + 'px';
        }
    });
});
