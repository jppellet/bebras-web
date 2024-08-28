document.addEventListener("DOMContentLoaded", function (event) {
    var taskContainer = document.getElementById("task-container");
    var style = document.createElement('style');
    style.innerHTML = '#task-wrapper {width: 680px; }' +
        '#bbrs-container-wrapper {display: inline-block; width: 150px; height: 265px; background-color: #ffffff; }' +
        '.bbrs-container {display: inline-block; width: 100px; height: 227px; align-content: center; vertical-align: top;}' +
        '.group {background-color: #ffd48a; border: 3px solid #ffd48a; border-radius: 5px; padding: 10px; margin: 5px; text-align: center; flex-wrap: nowrap; align-content: center; align-items: center; flex-direction: column; justify-content: flex-start; display: inline-flex; }' +
        '.bbrs-draggable {cursor: pointer;}';
    document.head.appendChild(style);
    var taskWrapper = document.createElement("div");
    taskWrapper.id = "task-wrapper";
    taskContainer.appendChild(taskWrapper);

    var containerWrapper = document.createElement("div");
    containerWrapper.id = "bbrs-container-wrapper";
    taskWrapper.appendChild(containerWrapper);
    //
    // var taskImages = ["2023-AU-05-brick0.svg","2023-AU-05-brick1.svg","2023-AU-05-brick2.svg",
    //     "2023-AU-05-brick3.svg","2023-AU-05-brick4.svg","2023-AU-05-brick5.svg",
    //     "2023-AU-05-brick6.svg","2023-AU-05-brick7.svg","2023-AU-05-brick8.svg"];

    var taskImages = ["/question_files/0/7/0/2023_au_05_brick0.svg","/question_files/1/6/9/2023_au_05_brick1.svg","/question_files/4/5/2/2023_au_05_brick2.svg",
        "/question_files/8/9/b/2023_au_05_brick3.svg","/question_files/c/7/1/2023_au_05_brick4.svg","/question_files/c/1/e/2023_au_05_brick5.svg",
        "/question_files/d/3/0/2023_au_05_brick6.svg","/question_files/9/7/5/2023_au_05_brick7.svg","/question_files/2/a/5/2023_au_05_brick8.svg"];

    var piecesData = [
        {width: 3, height: 2, topCircles: 2, bottomCircles: 0, position: 0},
        {width: 3, height: 2, topCircles: 0, bottomCircles: 1, position: 1},
        {width: 3, height: 3, topCircles: 0, bottomCircles: 0, position: 2},
        {width: 2, height: 3, topCircles: 1, bottomCircles: 0, position: 3},
        {width: 2, height: 1, topCircles: 2, bottomCircles: 1, position: 4},
        {width: 3, height: 1, topCircles: 2, bottomCircles: 0, position: 5},
        {width: 3, height: 1, topCircles: 0, bottomCircles: 2, position: 6},
        {width: 4, height: 1, topCircles: 2, bottomCircles: 2, position: 7},
        {width: 4, height: 1, topCircles: 0, bottomCircles: 0, position: 8}
    ];



    var containersData = [
        {name: null, value: 0},
        {name: null, value: 1},
        {name: null, value: 2},
        {name: null, value: 3},
        {name: null, value: 4},
        {name: null, value: 5},
        {name: null, value: 6},
        {name: null, value: 7},
        {name: null, value: 8},
        {name: "group", value: 9},
        {name: "group", value: 10},
        {name: "group", value: 11}
    ];

    var pieciesInstances = [];
    var containerInstances = [];


    class Piece {

        /**
         *
         * @param {HTMLElement} element
         * @param {Number} width
         * @param height
         * @param topCircles
         * @param bottomCircles
         * @param container
         */
        constructor(width, height, topCircles, bottomCircles, container) {
            this.width = width;
            this.height = height;
            this.topCircles = topCircles;
            this.bottomCircles = bottomCircles;

            this.index = pieciesInstances.length;
            this.element = document.createElement("img");
            this.element.src = taskImages[this.index];
            this.element.value = this.index;
            this.element.classList.add('bbrs-draggable');
            this.element.width = 20 * this.width;
            this.element.height = 20 * this.height + (this.topCircles + 5);

            this.setParent(container);
        }

        setParent(container) {
            this.container = container;
            container.element.appendChild(this.element);
        }

    }

    class Container {
        constructor(name) {
            this.name = name;

            this.index = containerInstances.length;

            this.element = document.createElement("div");
            this.element.classList.add("bbrs-container");
            containerWrapper.appendChild(this.element);


            if(this.name) {
                this.element.classList.add(this.name);
                taskWrapper.appendChild(this.element);
                this.element.addEventListener("bbsDrop", e => {
                    var data = e.detail.getDraggable();
                    if (data) {
                        if(this.element.childNodes.length < 3) {
                            pieciesInstances[data.value].setParent(this);
                        }
                    }
                });
            }
        }

        setSize (piece) {
            this.element.style.width = 25 * piece.width + "px";
            this.element.style.height = 25 * piece.height + (piece.topCircles + 5) + "px";;
        }
    }

    containersData.forEach(container => {
        containerInstances.push(new Container(container.name));
    });



    piecesData.forEach((el, index) => {
        var newPiece = new Piece(el.width, el.height, el.topCircles, el.bottomCircles, containerInstances[el.position]);
        pieciesInstances.push(newPiece);

        newPiece.element.addEventListener("bbsDragStart", function (e) {
            e.detail.setDraggable(this);
        });
    });

    containerInstances.forEach((container, index) => {
        if(index < 9) {
            container.setSize(pieciesInstances[index]);
        }
    });

    containerWrapper.addEventListener("bbsDrop", e => {
        var data = e.detail.getDraggable();
        if (data) {
            pieciesInstances[data.value].setParent(containerInstances[data.value]);
        }
    });


    function validate () {

        var isValid = true;
        pieciesInstances.forEach((el, index) => {


            if (el.container.index === 0) {
                isValid = false;
            }
        });

        if (!isValid) {
            return false;
        }

        var groups = [];
        for (var i = 0; i < containersData.length; i++) {
            groups.push([]);
        }

        pieciesInstances.forEach((piece) => {
            groups[piece.container.index].push(piece);
        });


        groups.forEach((group) => {

            var widthSame = false;
            var widthArray = [];

            // width: 3, height: 2, topCircles: 2, bottomCircles: 0,
            ["width", "height", "topCircles", "bottomCircles"].forEach((property) => {
                var uniqueValues = [];

                group.forEach((piece) => {
                    if (!uniqueValues.includes(piece[property])) {
                        // Push unique values to the list
                        uniqueValues.push(piece[property]);
                    }
                });

                if (uniqueValues.length !== 1 && uniqueValues.length !== group.length) {
                    isValid = false;
                }
            });
        });


        return isValid;
    }

    var scratchEl = document.getElementById('scratch');
    if (scratchEl) {
        var iniScratch = unescape(scratchEl.value);
        if (iniScratch != "") {
            let scratchData = JSON.parse(iniScratch);
            pieciesInstances.forEach((el, index) => {
                el.setParent(containerInstances[scratchData[index]]);
            });
        }
    }


    getScratch = function() {
        var answer = [];
        for (i = 0; i < pieciesInstances.length; i++) {
            answer.push(pieciesInstances[i].container.index);
        }
        return JSON.stringify(answer);
    }

    getAnswer = function() {
        return validate();
    }
});