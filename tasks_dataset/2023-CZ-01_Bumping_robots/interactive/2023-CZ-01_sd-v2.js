document.addEventListener("DOMContentLoaded", function (event) {
    var taskContainer = document.getElementById("task-container");
    // var taskImages = ["robot1.svg","robot2.svg","robot3.svg","robot4.svg","arrowup.svg","arrowdown.svg", "arrowleft.svg","arrowright.svg","background.svg"];
    var taskImages = ["/question_files/f/b/c/robot1.svg","/question_files/f/e/f/robot2.svg","/question_files/8/e/c/robot3.svg","/question_files/b/9/0/robot4.svg","/question_files/9/6/0/arrowup.svg","/question_files/5/6/7/arrowdown.svg","/question_files/5/0/6/arrowleft.svg","/question_files/c/f/9/arrowright.svg","/question_files/c/9/d/background.svg"];

    var style = document.createElement('style');
    style.innerHTML = '.drag-container {padding: 5px;}' +
        '.drop-container {background-image: url("'+taskImages[8]+'"); background-position: left; background-repeat: no-repeat; background-size: cover; height: 40px; width: 360px; padding-left: 1px; box-sizing: border-box;}' +
        '.task-draggable { width: 30px; cursor: pointer; padding: 7px;}';
    document.head.appendChild(style);


    var wrapper = document.createElement("div");
    taskContainer.appendChild(wrapper);
    var answer = [];


    var dragContainer = document.createElement("div");
    dragContainer.classList.add("drag-container");
    wrapper.appendChild(dragContainer);

    var dropContainer = document.createElement("div");
    dropContainer.classList.add("drop-container");
    wrapper.appendChild(dropContainer);

    for (var i = 0; i < 8; i++) {
        dragContainer.appendChild(createDraggable(i, false));
    }

    dragContainer.addEventListener("bbsDrop", function(e) {
        var data = e.detail.getDraggable();
        if(data) {
            if(data.classList.contains("clone")) {
                data.remove();
            }
        }
        getValues();
    });

    dropContainer.addEventListener("bbsDrop", function(e) {
        var data = e.detail.getDraggable();
        if(data) {
            if(data.parentElement === this) {
                this.appendChild(data);
            } else {
                var newCommand = createDraggable(data.value, true);
                this.appendChild(newCommand);
            }
        }
        getValues();
    });

    function getValues () {
        answer = [];
        dropContainer.childNodes.forEach(child => {
           answer.push(child.value);
        });
    }

    function createDraggable(value, clone) {
        var new_draggable = document.createElement("img");
        new_draggable.src = taskImages[value];
        new_draggable.value  = value;
        new_draggable.classList.add("task-draggable");
        if(clone) {new_draggable.classList.add("clone");}
        new_draggable.addEventListener("bbsDragStart", function (e) {
            e.detail.setDraggable(this);
        });
        return new_draggable;
    }

    var answerEl = document.getElementById('answer');
    if (answerEl) {
        var iniAnswer = unescape(answerEl.value);
        if (iniAnswer != "") {
            iniAnswer = iniAnswer.split("");
            answer = iniAnswer;
            for(i = 0; i < answer.length; i++) {
                dropContainer.appendChild(createDraggable(answer[i], true));
            }
        }
    }

    getAnswer = function() {
        var string = "";
        for (i = 0; i < answer.length; i++) {
            string += answer[i];
        }
        return string;
    }



});