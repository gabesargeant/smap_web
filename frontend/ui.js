


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

async function getDataFromAPI() {
    document.getElementById('dataTable').innerHTML = "";

    const response = await fetch('https://api.gabrielsargeant.com/app/smap/getregions', {
        method: 'post',
        body: JSON.stringify(mapRequests)

    });
    const data = await response.json();

    table = buildTableFromMapDataResponse(data)
    document.getElementById('dataTable').innerHTML = table;
    dataUp()

}

// async function fetchDataFromAPI() {

//     var getdata = await getDataFromAPI();

//     getdata.then(data => {
//         console.log(data);
//         table = buildTableFromMapDataResponse(data)
//         document.getElementById('dataTable').innerHTML = table;
//         dataUp()
//     });


// }



function clear() {
    document.getElementById('dataTable').innerHTML = "";
    mapUp();
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

//The select area button will drive a Esri JS event but also ensure that the map is visible
var selectAreaEvent = document.getElementById('selectAreaBtn');
selectAreaEvent.addEventListener('click', mapUp)

//Represents the Map Request to be send the API
class MapRequest {

    constructor(regionID, partitionID) {
        this.RegionID = regionID;
        this.PartitionID = partitionID;
    }

}

function buildAPIRequest(selectedLayers) {

    var mapRequestArr = [];
    //get the topic selected in the topic div
    var topic = document.querySelector('input[name="topic"]:checked').value;

    for (var i = 1; i < selectedLayers.length; i++) {
        mr = new MapRequest(selectedLayers[i], topic);
        mapRequestArr.push(mr);

    }

    return mapRequestArr;

}