let plants = [];

let fern1 = new Fern("орляк", 12, "Многолетний травянистый папоротник", false);
let fern2 = new Fern("щитовник", 7, "Папоротник дубовых лесов", true);
let spruce1 = new Spruce("европейская", 25, "Европа", "Деревообработывающая промышленность");
let spruce2 = new Spruce("колючая", 15, "Тайга", "Сельское хозяйство");

plants.push(fern1, fern2, spruce1, spruce2);

switchDisplay("commonInfo");
printPlantsArray(plants);

function printPlantsArray(plants){
    let form = document.getElementById("commonInfo").getElementsByTagName("form");
    form[0].innerHTML = "";

    for(let i = 0; i < plants.length; i++){
        form[0].innerHTML += "<br>";
        form[0].innerHTML += "<div class'element'>";
        form[0].innerHTML += "<div class='name'>" + "<div class='nameLabel'> Название: </div>" +
        "<div class='nameText' id='nameText" + i + "'>" + plants[i].name + " " + plants[i].type + "</div>"+ "</div>" +
        "<div class='edit' id='edit" + i + "'> Редактировать </div>"+
        "<div class='remove' id='remove" + i + "'> Удалить </div>";
        form[0].innerHTML += "</div>";
    }

    form[0].innerHTML += "<br>"; 
    form[0].innerHTML += "<input type='button' id='newPlantBtn' value='Добавить новое растение'>";

    addPlantsListeners();
}

function printPersonalInfo(i, plants){
    let form = document.getElementById("personalInfo").getElementsByTagName("form");
    form[0].innerHTML = "<br>";
    form[0].innerHTML += "<div class='detailedInfo'>" + 
    "<div class='detName'> Название: " + plants[i].name + " " + plants[i].type + "</div>";
    form[0].innerHTML += "<div class='detAge'> Возраст: " + plants[i].age + "</div>";
    if(plants[i] instanceof Fern){
        form[0].innerHTML += "<div class='detDescription'> Описание: " + plants[i].description + "</div>";
        if(plants[i].poison == true)
            form[0].innerHTML += "<div class='detPoison'> Ядовитый: да </div>";
        else
            form[0].innerHTML += "<div class='detPoison'> Ядовитый: нет </div>";
    }else{
        form[0].innerHTML += "<div class='detArea'> Место произрастания: " + plants[i].area + "</div>";
        form[0].innerHTML += "<div class='detApplication'> Применение: " + plants[i].application + "</div>";
    }
    form[0].innerHTML += "<input class='btn' id='mainMenuBtn' type='button' value='Главное меню'>";
    form[0].innerHTML += "</div>";

    document.getElementById("mainMenuBtn").addEventListener("click", ()=>{
        switchDisplay("commonInfo");
    });
}

function addPlantsListeners(){
    for(let i = 0; i < plants.length; i++){
        let name = "nameText" + i;
        let edit = "edit" + i;
        let remove = "remove" + i;

        document.getElementById(name).addEventListener("click", ()=>{
            printPersonalInfo(i, plants);
            switchDisplay("personalInfo");
        });

        document.getElementById(edit).addEventListener("click", ()=>{
            printEditMenu(i, plants);
            switchDisplay("editMenu");
        });

        document.getElementById(remove).addEventListener("click", ()=>{
            if(confirm("Вы уверены, что хотите удалить растение " + plants[i].name + " " + plants[i].type + "?")){
                removePlant(i, plants);
            }
        });
    }
}

function printEditMenu(i, plants){
    let form = document.getElementById("editMenu").getElementsByTagName("form");
    form[0].innerHTML = "<br>";
    form[0].innerHTML += "<div class='editInfo'>" + 
    "<label>Название: </label>" + "<input name='type' type='text' id='editNameField' value='" + plants[i].type + "'>";
    form[0].innerHTML += "<label> Возраст: </label>" + "<input name='age' type='text' id='editAgeField' value='" + plants[i].age + "'>" + "<br>";
    if(plants[i] instanceof Fern){
        form[0].innerHTML += "<label>Описание: </label>" + "<input name='desc' type='text' id='editDescriptionField' value='" + plants[i].description + "'>";
        form[0].innerHTML += "<br>";
        form[0].innerHTML += "<label>Ядовитый: </label>";
        form[0].innerHTML += "<input name='poison' type='checkbox' id='editPoisonField' value='да'>"; 
    }
    else{
        form[0].innerHTML += "<label>Место произрастания: </label>" + "<input name='area' type='text' id='editAreaField' value='" + plants[i].area + "'>" + "<br>";
        form[0].innerHTML += "<label>Область применения: </label>" + "<input name='application' type='text' id='applicationField' value='" + plants[i].application + "'>" + "<br>";
    }
    form[0].innerHTML += "<input type='button' id='editElement' value='Изменить'>";
    form[0].innerHTML += "</div>";
    
    document.getElementById("editElement").addEventListener("click", ()=>{
        let newPlant;    
        if(plants[i] instanceof Fern){
            newPlant = new Fern(form[0].elements.type.value, form[0].elements.age.value, form[0].elements.desc.value, form[0].elements.poison.checked);
        }
        else{
            newPlant = new Spruce(form[0].elements.type.value, form[0].elements.age.value, form[0].elements.area.value, form[0].elements.application.value);
        }
        plants[i] = newPlant;
        printPlantsArray(plants);
        switchDisplay("commonInfo");
    });
}

function removePlant(i, plants){
    plants.splice(i,1);
    printPlantsArray(plants);
}

function switchDisplay(display){
    switch(display){
        case "commonInfo":
        document.getElementById("commonInfo").style.display = "";
        document.getElementById("personalInfo").style.display = "none";
        document.getElementById("editMenu").style.display = "none";
        break;
        case "personalInfo":
        document.getElementById("commonInfo").style.display = "none";
        document.getElementById("personalInfo").style.display = "";
        document.getElementById("editMenu").style.display = "none";
        break;
        case "editMenu":
        document.getElementById("commonInfo").style.display = "none";
        document.getElementById("personalInfo").style.display = "none";
        document.getElementById("editMenu").style.display = "";
        break;
    }

}

document.getElementById("newPlantBtn").addEventListener("click", ()=>{
    switchDisplay("editMenu");
    let form = document.getElementById("editMenu").getElementsByTagName("form");
    form[0].innerHTML = "<br>";
    form[0].innerHTML += "<input name='plantType1' type='checkbox' id='plantType1' value=''>";
    form[0].innerHTML += "<input name='plantType1' type='checkbox' id='plantType2' value=''>";

    /*let check1 = form[0].elements.plantType1;
    check1.addEventListener("click", ()=>{
        check2.checked = false;
    });

    let check2 = form[0].elements.plantType2;
    check2.addEventListener("click", ()=>{
        check1.checked = false;
        console.log(check1.checked);
    });*/
    

    form[0].innerHTML += "<br>";
    form[0].innerHTML += "<div class='editInfo'>" + 
    "<label>Название: </label>" + "<input name='type' type='text' id='editNameField' value=''>";
    form[0].innerHTML += "<label> Возраст: </label>" + "<input name='age' type='text' id='editAgeField' value=''>" + "<br>";

    
    /*if(check1.checked == true){
        form[0].innerHTML += "<label>Описание: </label>" + "<input name='desc' type='text' id='editDescriptionField' value=''>";
        form[0].innerHTML += "<br>";
        form[0].innerHTML += "<label>Ядовитый: </label>";
        form[0].innerHTML += "<input name='poison' type='checkbox' id='editPoisonField' value=''>"; 
    }

    if(check1.checked == true){
        form[0].innerHTML += "<label>Место произрастания: </label>" + "<input name='area' type='text' id='editAreaField' value=''>" + "<br>";
        form[0].innerHTML += "<label>Область применения: </label>" + "<input name='application' type='text' id='applicationField' value=''>" + "<br>";
    }
    form[0].innerHTML += "<input type='button' id='editElement' value='Создать'>";
    form[0].innerHTML += "</div>";
    
    document.getElementById("editElement").addEventListener("click", ()=>{
        let newPlant;    
        if(check1.checked == true){
            newPlant = new Fern(form[0].elements.type.value, form[0].elements.age.value, form[0].elements.desc.value, form[0].elements.poison.checked);
            lants.push(newPlant);
            printPlantsArray(plants);
            switchDisplay("commonInfo");
        }
        if(check1.checked == true){
            newPlant = new Spruce(form[0].elements.type.value, form[0].elements.age.value, form[0].elements.area.value, form[0].elements.application.value);
            lants.push(newPlant);
            printPlantsArray(plants);
            switchDisplay("commonInfo");
        }
        
    });*/
});