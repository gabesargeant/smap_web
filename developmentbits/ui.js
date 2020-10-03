function rotateViews() {
    mapIndex = document.getElementById("mapDiv").style.zIndex;
    topicIndex = document.getElementById("topicDiv").style.zIndex;
    dataIndex = document.getElementById("dataDiv").style.zIndex;

    position = [topicIndex, dataIndex, mapIndex];

    document.getElementById('mapDiv').style.zIndex = position[0];
    document.getElementById('topicDiv').style.zIndex = position[1];
    document.getElementById('dataDiv').style.zIndex = position[2];

}
//Display Map
function mapUp() {
    document.getElementById('mapDiv').style.zIndex = 0;
    document.getElementById('topicDiv').style.zIndex = -1;
    document.getElementById('dataDiv').style.zIndex = -2;

}
//Display data
function dataUp() {
    document.getElementById('dataDiv').style.zIndex = 0;
    document.getElementById('mapDiv').style.zIndex = -1;
    document.getElementById('topicDiv').style.zIndex = -2;

}
//Disply Topics
function topicUp() {
    document.getElementById('topicDiv').style.zIndex = 0;
    document.getElementById('mapDiv').style.zIndex = -1;
    document.getElementById('dataDiv').style.zIndex = -2;
}

function visualizeCol(id) {
    mapUp();
    console.log("sentID :" + id);
    console.log(id);

}

function getDataFromAPI() {
    //Put the fetch here for requesting the data once everything else is built
    //document.getElementById('out').innerHTML = JSON.stringify(dataResponse);

    //Also put the callback to pivot the view


    table = buildTableFromMapDataResponse(dataResponse)
    document.getElementById('dataTable').innerHTML = table;
    dataUp()
}

function clear() {
    document.getElementById('dataTable').innerHTML = "";
}

var queryBtn = document.getElementById('queryBtn');
queryBtn.addEventListener('click', getDataFromAPI);

var resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', clear);

var mapUpBtn = document.getElementById('mapUpBtn');
mapUpBtn.addEventListener('click', mapUp)

var topicUpBtn = document.getElementById('topicUpBtn');
topicUpBtn.addEventListener('click', topicUp)

var dataUpBtn = document.getElementById('dataUpBtn');
dataUpBtn.addEventListener('click', dataUp)