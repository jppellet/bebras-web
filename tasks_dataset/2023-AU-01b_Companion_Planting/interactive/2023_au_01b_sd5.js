document.addEventListener("DOMContentLoaded", function (event) {
    // var taskImages = ["2023-AU-01-fennel.svg","2023-AU-01-leek.svg","2023-AU-01-peas.svg","2023-AU-01-salad.svg","2023-AU-01-tomato.svg", "tile-empty.svg"];
    var taskImages = ["/question_files/b/5/8/2023_au_01_fennel.svg","/question_files/4/a/4/2023_au_01_leek.svg","/question_files/9/7/1/2023_au_01_peas.svg","/question_files/5/3/0/2023_au_01_salad.svg","/question_files/c/0/a/2023_au_01_tomato.svg", "/question_files/2/6/4/tile_empty.svg"];

    var taskContainer = document.getElementById("task-container");
    var style = document.createElement('style');
    style.innerHTML = '#task-wrapper {background-color: #ffffff; width: 440px; height: 260px; background-image: url(/question_files/4/f/7/2023_au_01_background.svg)} ' +
        '.top-container {height: 75px; padding-right: 10px; padding-top: 5px; padding-left: 10px; padding-bottom: 20px}' +
        '.bottom-container {width: 260px; display: grid; grid-template-columns: repeat(5, 1fr);} ' +
        '.bottom-container > div:nth-child(n+1) { margin-left: 57px; margin-right: -57px; margin-top: -2px !important;}' +
        '.bottom-container > div:nth-child(n+6) { margin-left: 30px; margin-right: -30px; margin-top: -3px !important;}' +
        '.bottom-container > div:nth-child(n+11) { margin-left: 4px; margin-right: -4px; margin-top: -4px !important;}' +
        '.garden-bed {display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; background-image: url("'+taskImages[5]+'"); height: 50px; width: 50px; background-repeat: no-repeat; background-position: center; background-size: contain;}' +
        '.plant {height: 37px; cursor: pointer;}';
    document.head.appendChild(style);
    var taskWrapper = document.createElement("div");
    taskWrapper.id = "task-wrapper";
    taskContainer.appendChild(taskWrapper);

    var topContainer = document.createElement("div");
    taskWrapper.appendChild(topContainer);
    topContainer.classList.add("top-container");
    topContainer.classList.add("top-container");
    var bottomContainer = document.createElement("div");
    bottomContainer.classList.add("bottom-container");
    taskWrapper.appendChild(topContainer);
    taskWrapper.appendChild(bottomContainer);


    var gardenBedsArr = [];
    var gardenBeds = ["E","E",1,"E","E","E",1,1,"E","E","E","E","E","E","E"];
    var plants = [3,3,4,0,0,2,2,2,2,3,4,4];


    var scratchEl = document.getElementById('scratch');
    if (scratchEl) {
        var iniScratch = unescape(scratchEl.value);
        if (iniScratch != "") {
            let scratchData = JSON.parse(iniScratch);
            gardenBeds = scratchData[0];
            plants = scratchData[1];
        }
    }


    for(var i = 0; i < gardenBeds.length; i++) {
        let gardenBed = document.createElement("div");
        gardenBed.value = i;
        gardenBed.classList.add("garden-bed")
        gardenBedsArr.push(gardenBed);
        bottomContainer.appendChild(gardenBed);
        if (gardenBeds[i] !== 1) {
            gardenBed.addEventListener("bbsDrop", function (e) {
                var data = e.detail.getDraggable();
                if (data) {
                    if (this.firstChild) {
                        topContainer.appendChild(this.firstChild);
                    }
                    this.appendChild(data);
                    assignValue();
                }
            });
        }
    }

    topContainer.addEventListener("bbsDrop", function (e) {
        var data = e.detail.getDraggable();
        if (data) {
            this.appendChild(data);
            assignValue();
        }
    });

    for(var i = 0; i < gardenBeds.length; i++) {
        if(gardenBeds[i] !== "E") {
            createImage(gardenBeds[i],gardenBedsArr[i]);
        }
    }


    for(var i = 0; i < plants.length; i++) {
        createImage(plants[i],topContainer);
    }


    function createImage(plant, container) {
        var newplant = document.createElement("img");
        newplant.classList.add("plant");
        newplant.src = taskImages[plant];
        newplant.value = plant;
        container.appendChild(newplant);
        if(plant != 1) {
            newplant.addEventListener("bbsDragStart", function (e) {
                e.detail.setDraggable(this);
            });
        }
    }

    function assignValue() {
        gardenBeds = [];
        gardenBedsArr.forEach((container, index) => {
            (container.firstChild) ? gardenBeds.push(container.firstChild.value) : gardenBeds.push("E");
        });

        plants = [];
        var allPlants = topContainer.childNodes;
        allPlants.forEach(el => {
            plants.push(el.value);
        });
    }

    getScratch = function() {
        return JSON.stringify([gardenBeds, plants]);
    }

    getAnswer = function() {
        var string = "";
        for (i = 0; i < gardenBeds.length; i++) {
            string += gardenBeds[i];
        }
        return string;
    }

});