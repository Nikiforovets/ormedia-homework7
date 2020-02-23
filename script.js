let plants = [];
let numberOfEditPlant;

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
    document.getElementById("newPlantBtn").addEventListener("click", addPlant);
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
    document.getElementById("buttonFormComtainer").style.display = "none";

    document.getElementById("editNameField").value =  plants[i].type;
    document.getElementById("editAgeField").value = plants[i].age;
    if(plants[i] instanceof Fern){
        document.getElementById("editDescriptionField").value = plants[i].description;
        document.getElementById("spruceContainer").style.display = "none";
        document.getElementById("fernContainer").style.display = "";
    }
    else{
        document.getElementById("editAreaField").value = plants[i].area;
        document.getElementById("applicationField").value = plants[i].application;
        document.getElementById("spruceContainer").style.display = "";
        document.getElementById("fernContainer").style.display = "none";
    }

    document.getElementById("commonContainer").style.display = "";
    //plants.splice(i,1);
    numberOfEditPlant = i;
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

function addPlant(){
    switchDisplay("editMenu");
    document.getElementById("buttonFormComtainer").style.display = "";

    document.getElementById("plantType1").addEventListener("click", ()=>{
        document.getElementById("commonContainer").style.display = "";
        document.getElementById("spruceContainer").style.display = "none";
        document.getElementById("fernContainer").style.display = "";
    });

    document.getElementById("plantType2").addEventListener("click", ()=>{
        document.getElementById("commonContainer").style.display = "";
        document.getElementById("spruceContainer").style.display = "";
        document.getElementById("fernContainer").style.display = "none";
    });
    numberOfEditPlant = plants.length;
    
    let form = document.getElementById("editForm");
    form.reset();
};


document.getElementById("editElement").addEventListener("click", ()=>{
    let form = document.getElementById("editMenu").getElementsByTagName("form");
    let newPlant;    
    if(document.getElementById("spruceContainer").style.display == "none" &&
    document.getElementById("fernContainer").style.display == ""){
        newPlant = new Fern(form[0].elements.type.value, form[0].elements.age.value, form[0].elements.desc.value, form[0].elements.poison.checked);
        //plants.push(newPlant);
        plants.splice(numberOfEditPlant,1,newPlant);
        printPlantsArray(plants);
        switchDisplay("commonInfo");
    }if(document.getElementById("spruceContainer").style.display == "" &&
    document.getElementById("fernContainer").style.display == "none"){
        newPlant = new Spruce(form[0].elements.type.value, form[0].elements.age.value, form[0].elements.area.value, form[0].elements.application.value);
        //plants.push(newPlant);
        plants.splice(numberOfEditPlant,1,newPlant);
        printPlantsArray(plants);
        switchDisplay("commonInfo");
    }
    
});