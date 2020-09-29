



function buildTableFromMapDataResponse(response) {

    var tableString = "<table>"

    results = buildTableHeaderString(response.Metadata, response.MapData[0].KVPairs)

    tableString += results[0]
    headerSequenceMap = results[1];
    console.log(headerSequenceMap)

    //Do something with the partition


    response.MapData.forEach(function (obj) {
        row = "<tr><td id='RegionID'>" + obj.RegionID + "</td>"

        var i = 0;
        for (const [key, value] of Object.entries(obj.KVPairs)) {

            row += "<td id='" + headerSequenceMap[i] + "'>" + value + "</td>"
            i++;
        }
        row += "</tr>"
        tableString += row
    });

    tableString += "</table>"
    return tableString

}

function buildRow(MapData, Metadata) {

}

function buildTableHeaderString(metadata, metadataMap) {
    var header = "<tr><th id='RegionID'>Region ID</th>"
    var headerSequenceMap = {};
    var sequence = 0;

    for (const [key, value] of Object.entries(metadataMap)) {
        //console.log(key, value);

        headerSequenceMap[sequence] = key;
        var val;
        if (key in metadata) {
            val = metadata[key]

        } else {
            val = key
        }

        header += "<th id='" + key + "'>" + val + "</th>"

        sequence++
    }

    header += "</th>"
    return [header, headerSequenceMap]
}

var dataResponse = {
    "MapData": [
        {
            "RegionID": "1100929",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.9,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_tot_hhd_inc_weekly": 1394,
                "Median_tot_prsnl_inc_weekly": 797,
                "SA1_7DIGITCODE_2016": 1100929
            }
        }

    ],
    "Metadata": {
        "Average_household_size": "Average household size",
        "Average_num_psns_per_bedroom": "Average number of Persons per bedroom",
        "Median_tot_hhd_inc_weekly": "Median total household income weekly",
        "Median_tot_prsnl_inc_weekly": "Median total personal income weekly"
    }
}