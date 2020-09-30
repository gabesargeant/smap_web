



function buildTableFromMapDataResponse(response) {

    var tableString = "<table class='dataTable'>"

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

        header += "<th id='" + key + "'>" + val + "<nr>"
        header += "<input id='" + key + "' type='button' value='Visualize this data' onclick='visualizeCol(this.id)'/></th>"

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
                "Median_age_persons": 40,
                "Median_mortgage_repay_monthly": 1767,
                "Median_rent_weekly": 310,
                "Median_tot_fam_inc_weekly": 1786,
                "Median_tot_hhd_inc_weekly": 1394,
                "Median_tot_prsnl_inc_weekly": 797,
                "SA1_7DIGITCODE_2016": 1100929
            }
        },
        {
            "RegionID": "1100901",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 40,
                "Median_mortgage_repay_monthly": 1625,
                "Median_rent_weekly": 380,
                "Median_tot_fam_inc_weekly": 2200,
                "Median_tot_hhd_inc_weekly": 1854,
                "Median_tot_prsnl_inc_weekly": 978,
                "SA1_7DIGITCODE_2016": 1100901
            }
        },
        {
            "RegionID": "1100806",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 41,
                "Median_mortgage_repay_monthly": 2058,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 1916,
                "Median_tot_hhd_inc_weekly": 1788,
                "Median_tot_prsnl_inc_weekly": 826,
                "SA1_7DIGITCODE_2016": 1100806
            }
        },
        {
            "RegionID": "1100921",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2,
                "Average_num_psns_per_bedroom": 1,
                "Median_age_persons": 30,
                "Median_mortgage_repay_monthly": 1568,
                "Median_rent_weekly": 290,
                "Median_tot_fam_inc_weekly": 1649,
                "Median_tot_hhd_inc_weekly": 1494,
                "Median_tot_prsnl_inc_weekly": 902,
                "SA1_7DIGITCODE_2016": 1100921
            }
        },
        {
            "RegionID": "1100920",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.7,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 50,
                "Median_mortgage_repay_monthly": 1517,
                "Median_rent_weekly": 230,
                "Median_tot_fam_inc_weekly": 1375,
                "Median_tot_hhd_inc_weekly": 949,
                "Median_tot_prsnl_inc_weekly": 709,
                "SA1_7DIGITCODE_2016": 1100920
            }
        },
        {
            "RegionID": "1100705",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.4,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 45,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 293,
                "Median_tot_fam_inc_weekly": 1375,
                "Median_tot_hhd_inc_weekly": 1045,
                "Median_tot_prsnl_inc_weekly": 602,
                "SA1_7DIGITCODE_2016": 1100705
            }
        },
        {
            "RegionID": "1100810",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3.3,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 37,
                "Median_mortgage_repay_monthly": 1950,
                "Median_rent_weekly": 465,
                "Median_tot_fam_inc_weekly": 2471,
                "Median_tot_hhd_inc_weekly": 2523,
                "Median_tot_prsnl_inc_weekly": 925,
                "SA1_7DIGITCODE_2016": 1100810
            }
        },
        {
            "RegionID": "1101013",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 0,
                "Average_num_psns_per_bedroom": 0,
                "Median_age_persons": 0,
                "Median_mortgage_repay_monthly": 0,
                "Median_rent_weekly": 0,
                "Median_tot_fam_inc_weekly": 0,
                "Median_tot_hhd_inc_weekly": 0,
                "Median_tot_prsnl_inc_weekly": 0,
                "SA1_7DIGITCODE_2016": 1101013
            }
        },
        {
            "RegionID": "1100815",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.1,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 250,
                "Median_tot_fam_inc_weekly": 1728,
                "Median_tot_hhd_inc_weekly": 1190,
                "Median_tot_prsnl_inc_weekly": 749,
                "SA1_7DIGITCODE_2016": 1100815
            }
        },
        {
            "RegionID": "1101003",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.9,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 49,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 455,
                "Median_tot_fam_inc_weekly": 2856,
                "Median_tot_hhd_inc_weekly": 2476,
                "Median_tot_prsnl_inc_weekly": 923,
                "SA1_7DIGITCODE_2016": 1101003
            }
        },
        {
            "RegionID": "1101105",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.8,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 45,
                "Median_mortgage_repay_monthly": 2624,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 2805,
                "Median_tot_hhd_inc_weekly": 2343,
                "Median_tot_prsnl_inc_weekly": 1047,
                "SA1_7DIGITCODE_2016": 1101105
            }
        },
        {
            "RegionID": "1101123",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3.5,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 42,
                "Median_mortgage_repay_monthly": 2909,
                "Median_rent_weekly": 0,
                "Median_tot_fam_inc_weekly": 2750,
                "Median_tot_hhd_inc_weekly": 3049,
                "Median_tot_prsnl_inc_weekly": 1081,
                "SA1_7DIGITCODE_2016": 1101123
            }
        },
        {
            "RegionID": "1100820",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.9,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 36,
                "Median_mortgage_repay_monthly": 2000,
                "Median_rent_weekly": 255,
                "Median_tot_fam_inc_weekly": 2166,
                "Median_tot_hhd_inc_weekly": 1971,
                "Median_tot_prsnl_inc_weekly": 803,
                "SA1_7DIGITCODE_2016": 1100820
            }
        },
        {
            "RegionID": "1100919",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 33,
                "Median_mortgage_repay_monthly": 1831,
                "Median_rent_weekly": 335,
                "Median_tot_fam_inc_weekly": 1976,
                "Median_tot_hhd_inc_weekly": 1710,
                "Median_tot_prsnl_inc_weekly": 875,
                "SA1_7DIGITCODE_2016": 1100919
            }
        },
        {
            "RegionID": "1100928",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.8,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 39,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 255,
                "Median_tot_fam_inc_weekly": 2033,
                "Median_tot_hhd_inc_weekly": 1230,
                "Median_tot_prsnl_inc_weekly": 857,
                "SA1_7DIGITCODE_2016": 1100928
            }
        },
        {
            "RegionID": "1100909",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.8,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 31,
                "Median_mortgage_repay_monthly": 1250,
                "Median_rent_weekly": 250,
                "Median_tot_fam_inc_weekly": 1216,
                "Median_tot_hhd_inc_weekly": 1185,
                "Median_tot_prsnl_inc_weekly": 752,
                "SA1_7DIGITCODE_2016": 1100909
            }
        },
        {
            "RegionID": "1100910",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.6,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 33,
                "Median_mortgage_repay_monthly": 1325,
                "Median_rent_weekly": 250,
                "Median_tot_fam_inc_weekly": 1350,
                "Median_tot_hhd_inc_weekly": 1136,
                "Median_tot_prsnl_inc_weekly": 896,
                "SA1_7DIGITCODE_2016": 1100910
            }
        },
        {
            "RegionID": "1101009",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.5,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 35,
                "Median_mortgage_repay_monthly": 1950,
                "Median_rent_weekly": 310,
                "Median_tot_fam_inc_weekly": 1978,
                "Median_tot_hhd_inc_weekly": 1458,
                "Median_tot_prsnl_inc_weekly": 885,
                "SA1_7DIGITCODE_2016": 1101009
            }
        },
        {
            "RegionID": "1101004",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.8,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 460,
                "Median_tot_fam_inc_weekly": 2421,
                "Median_tot_hhd_inc_weekly": 2228,
                "Median_tot_prsnl_inc_weekly": 1139,
                "SA1_7DIGITCODE_2016": 1101004
            }
        },
        {
            "RegionID": "1101012",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 32,
                "Median_mortgage_repay_monthly": 1793,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 2166,
                "Median_tot_hhd_inc_weekly": 1937,
                "Median_tot_prsnl_inc_weekly": 1100,
                "SA1_7DIGITCODE_2016": 1101012
            }
        },
        {
            "RegionID": "1100807",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.1,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 38,
                "Median_mortgage_repay_monthly": 1717,
                "Median_rent_weekly": 313,
                "Median_tot_fam_inc_weekly": 1764,
                "Median_tot_hhd_inc_weekly": 1336,
                "Median_tot_prsnl_inc_weekly": 753,
                "SA1_7DIGITCODE_2016": 1100807
            }
        },
        {
            "RegionID": "1101113",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.9,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 46,
                "Median_mortgage_repay_monthly": 2531,
                "Median_rent_weekly": 210,
                "Median_tot_fam_inc_weekly": 2125,
                "Median_tot_hhd_inc_weekly": 2200,
                "Median_tot_prsnl_inc_weekly": 888,
                "SA1_7DIGITCODE_2016": 1101113
            }
        },
        {
            "RegionID": "1101122",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3.1,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 43,
                "Median_mortgage_repay_monthly": 2860,
                "Median_rent_weekly": 500,
                "Median_tot_fam_inc_weekly": 2392,
                "Median_tot_hhd_inc_weekly": 2405,
                "Median_tot_prsnl_inc_weekly": 895,
                "SA1_7DIGITCODE_2016": 1101122
            }
        },
        {
            "RegionID": "1100706",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.2,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 48,
                "Median_mortgage_repay_monthly": 1251,
                "Median_rent_weekly": 300,
                "Median_tot_fam_inc_weekly": 1093,
                "Median_tot_hhd_inc_weekly": 1025,
                "Median_tot_prsnl_inc_weekly": 548,
                "SA1_7DIGITCODE_2016": 1100706
            }
        },
        {
            "RegionID": "1100821",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3.1,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 40,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 516,
                "Median_tot_fam_inc_weekly": 2457,
                "Median_tot_hhd_inc_weekly": 2397,
                "Median_tot_prsnl_inc_weekly": 900,
                "SA1_7DIGITCODE_2016": 1100821
            }
        },
        {
            "RegionID": "1100911",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 35,
                "Median_mortgage_repay_monthly": 2058,
                "Median_rent_weekly": 250,
                "Median_tot_fam_inc_weekly": 1906,
                "Median_tot_hhd_inc_weekly": 1451,
                "Median_tot_prsnl_inc_weekly": 840,
                "SA1_7DIGITCODE_2016": 1100911
            }
        },
        {
            "RegionID": "1101106",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.8,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 45,
                "Median_mortgage_repay_monthly": 2600,
                "Median_rent_weekly": 355,
                "Median_tot_fam_inc_weekly": 2611,
                "Median_tot_hhd_inc_weekly": 2444,
                "Median_tot_prsnl_inc_weekly": 1073,
                "SA1_7DIGITCODE_2016": 1101106
            }
        },
        {
            "RegionID": "1100816",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 37,
                "Median_mortgage_repay_monthly": 1950,
                "Median_rent_weekly": 173,
                "Median_tot_fam_inc_weekly": 1319,
                "Median_tot_hhd_inc_weekly": 916,
                "Median_tot_prsnl_inc_weekly": 508,
                "SA1_7DIGITCODE_2016": 1100816
            }
        },
        {
            "RegionID": "1100923",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 35,
                "Median_mortgage_repay_monthly": 1863,
                "Median_rent_weekly": 385,
                "Median_tot_fam_inc_weekly": 2160,
                "Median_tot_hhd_inc_weekly": 1797,
                "Median_tot_prsnl_inc_weekly": 808,
                "SA1_7DIGITCODE_2016": 1100923
            }
        },
        {
            "RegionID": "1100927",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 2329,
                "Median_rent_weekly": 375,
                "Median_tot_fam_inc_weekly": 2250,
                "Median_tot_hhd_inc_weekly": 2017,
                "Median_tot_prsnl_inc_weekly": 960,
                "SA1_7DIGITCODE_2016": 1100927
            }
        },
        {
            "RegionID": "1101015",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.7,
                "Average_num_psns_per_bedroom": 1,
                "Median_age_persons": 31,
                "Median_mortgage_repay_monthly": 1300,
                "Median_rent_weekly": 250,
                "Median_tot_fam_inc_weekly": 1353,
                "Median_tot_hhd_inc_weekly": 1087,
                "Median_tot_prsnl_inc_weekly": 743,
                "SA1_7DIGITCODE_2016": 1101015
            }
        },
        {
            "RegionID": "1100703",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 42,
                "Median_mortgage_repay_monthly": 1350,
                "Median_rent_weekly": 270,
                "Median_tot_fam_inc_weekly": 1375,
                "Median_tot_hhd_inc_weekly": 1044,
                "Median_tot_prsnl_inc_weekly": 634,
                "SA1_7DIGITCODE_2016": 1100703
            }
        },
        {
            "RegionID": "1100917",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.7,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 48,
                "Median_mortgage_repay_monthly": 984,
                "Median_rent_weekly": 200,
                "Median_tot_fam_inc_weekly": 2125,
                "Median_tot_hhd_inc_weekly": 922,
                "Median_tot_prsnl_inc_weekly": 700,
                "SA1_7DIGITCODE_2016": 1100917
            }
        },
        {
            "RegionID": "1101107",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.8,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 42,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 2408,
                "Median_tot_hhd_inc_weekly": 2232,
                "Median_tot_prsnl_inc_weekly": 938,
                "SA1_7DIGITCODE_2016": 1101107
            }
        },
        {
            "RegionID": "1101117",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.7,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 41,
                "Median_mortgage_repay_monthly": 2500,
                "Median_rent_weekly": 320,
                "Median_tot_fam_inc_weekly": 2208,
                "Median_tot_hhd_inc_weekly": 2018,
                "Median_tot_prsnl_inc_weekly": 949,
                "SA1_7DIGITCODE_2016": 1101117
            }
        },
        {
            "RegionID": "1100801",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.5,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 1800,
                "Median_rent_weekly": 385,
                "Median_tot_fam_inc_weekly": 2483,
                "Median_tot_hhd_inc_weekly": 1949,
                "Median_tot_prsnl_inc_weekly": 978,
                "SA1_7DIGITCODE_2016": 1100801
            }
        },
        {
            "RegionID": "1100804",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.2,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 37,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 230,
                "Median_tot_fam_inc_weekly": 1363,
                "Median_tot_hhd_inc_weekly": 1105,
                "Median_tot_prsnl_inc_weekly": 599,
                "SA1_7DIGITCODE_2016": 1100804
            }
        },
        {
            "RegionID": "1100822",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.9,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 41,
                "Median_mortgage_repay_monthly": 1563,
                "Median_rent_weekly": 0,
                "Median_tot_fam_inc_weekly": 2549,
                "Median_tot_hhd_inc_weekly": 2333,
                "Median_tot_prsnl_inc_weekly": 949,
                "SA1_7DIGITCODE_2016": 1100822
            }
        },
        {
            "RegionID": "1100908",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.7,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 33,
                "Median_mortgage_repay_monthly": 1506,
                "Median_rent_weekly": 270,
                "Median_tot_fam_inc_weekly": 1696,
                "Median_tot_hhd_inc_weekly": 1256,
                "Median_tot_prsnl_inc_weekly": 926,
                "SA1_7DIGITCODE_2016": 1100908
            }
        },
        {
            "RegionID": "1101125",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.7,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 36,
                "Median_mortgage_repay_monthly": 1950,
                "Median_rent_weekly": 400,
                "Median_tot_fam_inc_weekly": 2269,
                "Median_tot_hhd_inc_weekly": 2045,
                "Median_tot_prsnl_inc_weekly": 902,
                "SA1_7DIGITCODE_2016": 1101125
            }
        },
        {
            "RegionID": "1100924",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1,
                "Average_num_psns_per_bedroom": 0,
                "Median_age_persons": 32,
                "Median_mortgage_repay_monthly": 0,
                "Median_rent_weekly": 0,
                "Median_tot_fam_inc_weekly": 0,
                "Median_tot_hhd_inc_weekly": 1499,
                "Median_tot_prsnl_inc_weekly": 687,
                "SA1_7DIGITCODE_2016": 1100924
            }
        },
        {
            "RegionID": "1100918",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 48,
                "Median_mortgage_repay_monthly": 1804,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 2125,
                "Median_tot_hhd_inc_weekly": 1451,
                "Median_tot_prsnl_inc_weekly": 763,
                "SA1_7DIGITCODE_2016": 1100918
            }
        },
        {
            "RegionID": "1100704",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.2,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 49,
                "Median_mortgage_repay_monthly": 1647,
                "Median_rent_weekly": 280,
                "Median_tot_fam_inc_weekly": 1375,
                "Median_tot_hhd_inc_weekly": 1021,
                "Median_tot_prsnl_inc_weekly": 514,
                "SA1_7DIGITCODE_2016": 1100704
            }
        },
        {
            "RegionID": "1100902",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.8,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 43,
                "Median_mortgage_repay_monthly": 2000,
                "Median_rent_weekly": 370,
                "Median_tot_fam_inc_weekly": 2161,
                "Median_tot_hhd_inc_weekly": 2092,
                "Median_tot_prsnl_inc_weekly": 861,
                "SA1_7DIGITCODE_2016": 1100902
            }
        },
        {
            "RegionID": "1101115",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3.6,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 39,
                "Median_mortgage_repay_monthly": 3000,
                "Median_rent_weekly": 525,
                "Median_tot_fam_inc_weekly": 3204,
                "Median_tot_hhd_inc_weekly": 3250,
                "Median_tot_prsnl_inc_weekly": 1352,
                "SA1_7DIGITCODE_2016": 1101115
            }
        },
        {
            "RegionID": "1101116",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 44,
                "Median_mortgage_repay_monthly": 1950,
                "Median_rent_weekly": 200,
                "Median_tot_fam_inc_weekly": 2100,
                "Median_tot_hhd_inc_weekly": 1839,
                "Median_tot_prsnl_inc_weekly": 720,
                "SA1_7DIGITCODE_2016": 1101116
            }
        },
        {
            "RegionID": "1101108",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.2,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 36,
                "Median_mortgage_repay_monthly": 1360,
                "Median_rent_weekly": 293,
                "Median_tot_fam_inc_weekly": 1805,
                "Median_tot_hhd_inc_weekly": 1289,
                "Median_tot_prsnl_inc_weekly": 816,
                "SA1_7DIGITCODE_2016": 1101108
            }
        },
        {
            "RegionID": "1100805",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 28,
                "Median_mortgage_repay_monthly": 1582,
                "Median_rent_weekly": 185,
                "Median_tot_fam_inc_weekly": 685,
                "Median_tot_hhd_inc_weekly": 659,
                "Median_tot_prsnl_inc_weekly": 385,
                "SA1_7DIGITCODE_2016": 1100805
            }
        },
        {
            "RegionID": "1100823",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.9,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 33,
                "Median_mortgage_repay_monthly": 2000,
                "Median_rent_weekly": 370,
                "Median_tot_fam_inc_weekly": 2449,
                "Median_tot_hhd_inc_weekly": 2291,
                "Median_tot_prsnl_inc_weekly": 1055,
                "SA1_7DIGITCODE_2016": 1100823
            }
        },
        {
            "RegionID": "1101014",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.4,
                "Average_num_psns_per_bedroom": 0.6,
                "Median_age_persons": 51,
                "Median_mortgage_repay_monthly": 2500,
                "Median_rent_weekly": 500,
                "Median_tot_fam_inc_weekly": 3250,
                "Median_tot_hhd_inc_weekly": 2812,
                "Median_tot_prsnl_inc_weekly": 1100,
                "SA1_7DIGITCODE_2016": 1101014
            }
        },
        {
            "RegionID": "1100925",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.7,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 31,
                "Median_mortgage_repay_monthly": 1479,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 1912,
                "Median_tot_hhd_inc_weekly": 1539,
                "Median_tot_prsnl_inc_weekly": 967,
                "SA1_7DIGITCODE_2016": 1100925
            }
        },
        {
            "RegionID": "1100915",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.8,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 37,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 250,
                "Median_tot_fam_inc_weekly": 1392,
                "Median_tot_hhd_inc_weekly": 1110,
                "Median_tot_prsnl_inc_weekly": 764,
                "SA1_7DIGITCODE_2016": 1100915
            }
        },
        {
            "RegionID": "1101017",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.9,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 300,
                "Median_tot_fam_inc_weekly": 1937,
                "Median_tot_hhd_inc_weekly": 1424,
                "Median_tot_prsnl_inc_weekly": 984,
                "SA1_7DIGITCODE_2016": 1101017
            }
        },
        {
            "RegionID": "1100813",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.9,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 38,
                "Median_mortgage_repay_monthly": 2046,
                "Median_rent_weekly": 375,
                "Median_tot_fam_inc_weekly": 2656,
                "Median_tot_hhd_inc_weekly": 2483,
                "Median_tot_prsnl_inc_weekly": 996,
                "SA1_7DIGITCODE_2016": 1100813
            }
        },
        {
            "RegionID": "1101119",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 46,
                "Median_mortgage_repay_monthly": 2650,
                "Median_rent_weekly": 0,
                "Median_tot_fam_inc_weekly": 3050,
                "Median_tot_hhd_inc_weekly": 3277,
                "Median_tot_prsnl_inc_weekly": 1078,
                "SA1_7DIGITCODE_2016": 1101119
            }
        },
        {
            "RegionID": "1100709",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.7,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 43,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 300,
                "Median_tot_fam_inc_weekly": 2250,
                "Median_tot_hhd_inc_weekly": 1958,
                "Median_tot_prsnl_inc_weekly": 773,
                "SA1_7DIGITCODE_2016": 1100709
            }
        },
        {
            "RegionID": "1100802",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.7,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 44,
                "Median_mortgage_repay_monthly": 1997,
                "Median_rent_weekly": 400,
                "Median_tot_fam_inc_weekly": 2214,
                "Median_tot_hhd_inc_weekly": 2043,
                "Median_tot_prsnl_inc_weekly": 890,
                "SA1_7DIGITCODE_2016": 1100802
            }
        },
        {
            "RegionID": "1100926",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.9,
                "Average_num_psns_per_bedroom": 1,
                "Median_age_persons": 31,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 260,
                "Median_tot_fam_inc_weekly": 1770,
                "Median_tot_hhd_inc_weekly": 1364,
                "Median_tot_prsnl_inc_weekly": 797,
                "SA1_7DIGITCODE_2016": 1100926
            }
        },
        {
            "RegionID": "1101006",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.7,
                "Average_num_psns_per_bedroom": 1.1,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 1300,
                "Median_rent_weekly": 210,
                "Median_tot_fam_inc_weekly": 1463,
                "Median_tot_hhd_inc_weekly": 1005,
                "Median_tot_prsnl_inc_weekly": 752,
                "SA1_7DIGITCODE_2016": 1101006
            }
        },
        {
            "RegionID": "1101120",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 44,
                "Median_mortgage_repay_monthly": 2563,
                "Median_rent_weekly": 515,
                "Median_tot_fam_inc_weekly": 2678,
                "Median_tot_hhd_inc_weekly": 2697,
                "Median_tot_prsnl_inc_weekly": 1087,
                "SA1_7DIGITCODE_2016": 1101120
            }
        },
        {
            "RegionID": "1100916",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 33,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 320,
                "Median_tot_fam_inc_weekly": 1962,
                "Median_tot_hhd_inc_weekly": 1600,
                "Median_tot_prsnl_inc_weekly": 902,
                "SA1_7DIGITCODE_2016": 1100916
            }
        },
        {
            "RegionID": "1101101",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.7,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 36,
                "Median_mortgage_repay_monthly": 2470,
                "Median_rent_weekly": 450,
                "Median_tot_fam_inc_weekly": 2646,
                "Median_tot_hhd_inc_weekly": 2330,
                "Median_tot_prsnl_inc_weekly": 1132,
                "SA1_7DIGITCODE_2016": 1101101
            }
        },
        {
            "RegionID": "1101109",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.8,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 46,
                "Median_mortgage_repay_monthly": 2600,
                "Median_rent_weekly": 320,
                "Median_tot_fam_inc_weekly": 2750,
                "Median_tot_hhd_inc_weekly": 2718,
                "Median_tot_prsnl_inc_weekly": 1085,
                "SA1_7DIGITCODE_2016": 1101109
            }
        },
        {
            "RegionID": "1101118",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 44,
                "Median_mortgage_repay_monthly": 1578,
                "Median_rent_weekly": 220,
                "Median_tot_fam_inc_weekly": 1792,
                "Median_tot_hhd_inc_weekly": 1645,
                "Median_tot_prsnl_inc_weekly": 803,
                "SA1_7DIGITCODE_2016": 1101118
            }
        },
        {
            "RegionID": "1101126",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.5,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 43,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 385,
                "Median_tot_fam_inc_weekly": 2265,
                "Median_tot_hhd_inc_weekly": 2079,
                "Median_tot_prsnl_inc_weekly": 939,
                "SA1_7DIGITCODE_2016": 1101126
            }
        },
        {
            "RegionID": "1100814",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.5,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 43,
                "Median_mortgage_repay_monthly": 2014,
                "Median_rent_weekly": 400,
                "Median_tot_fam_inc_weekly": 2326,
                "Median_tot_hhd_inc_weekly": 2075,
                "Median_tot_prsnl_inc_weekly": 965,
                "SA1_7DIGITCODE_2016": 1100814
            }
        },
        {
            "RegionID": "1100819",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 38,
                "Median_mortgage_repay_monthly": 2004,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 2408,
                "Median_tot_hhd_inc_weekly": 2412,
                "Median_tot_prsnl_inc_weekly": 1022,
                "SA1_7DIGITCODE_2016": 1100819
            }
        },
        {
            "RegionID": "1100710",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 53,
                "Median_mortgage_repay_monthly": 1500,
                "Median_rent_weekly": 0,
                "Median_tot_fam_inc_weekly": 1170,
                "Median_tot_hhd_inc_weekly": 978,
                "Median_tot_prsnl_inc_weekly": 551,
                "SA1_7DIGITCODE_2016": 1100710
            }
        },
        {
            "RegionID": "1100803",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.4,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 35,
                "Median_mortgage_repay_monthly": 1600,
                "Median_rent_weekly": 213,
                "Median_tot_fam_inc_weekly": 1375,
                "Median_tot_hhd_inc_weekly": 984,
                "Median_tot_prsnl_inc_weekly": 553,
                "SA1_7DIGITCODE_2016": 1100803
            }
        },
        {
            "RegionID": "1100907",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.2,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 1928,
                "Median_rent_weekly": 271,
                "Median_tot_fam_inc_weekly": 2014,
                "Median_tot_hhd_inc_weekly": 1358,
                "Median_tot_prsnl_inc_weekly": 879,
                "SA1_7DIGITCODE_2016": 1100907
            }
        },
        {
            "RegionID": "1101110",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.9,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 45,
                "Median_mortgage_repay_monthly": 2200,
                "Median_rent_weekly": 408,
                "Median_tot_fam_inc_weekly": 2299,
                "Median_tot_hhd_inc_weekly": 1916,
                "Median_tot_prsnl_inc_weekly": 888,
                "SA1_7DIGITCODE_2016": 1101110
            }
        },
        {
            "RegionID": "1101016",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.7,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 37,
                "Median_mortgage_repay_monthly": 2392,
                "Median_rent_weekly": 302,
                "Median_tot_fam_inc_weekly": 2578,
                "Median_tot_hhd_inc_weekly": 2410,
                "Median_tot_prsnl_inc_weekly": 1076,
                "SA1_7DIGITCODE_2016": 1101016
            }
        },
        {
            "RegionID": "1100707",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.1,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 55,
                "Median_mortgage_repay_monthly": 1083,
                "Median_rent_weekly": 150,
                "Median_tot_fam_inc_weekly": 1268,
                "Median_tot_hhd_inc_weekly": 884,
                "Median_tot_prsnl_inc_weekly": 503,
                "SA1_7DIGITCODE_2016": 1100707
            }
        },
        {
            "RegionID": "1100904",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 42,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 400,
                "Median_tot_fam_inc_weekly": 2111,
                "Median_tot_hhd_inc_weekly": 1937,
                "Median_tot_prsnl_inc_weekly": 864,
                "SA1_7DIGITCODE_2016": 1100904
            }
        },
        {
            "RegionID": "1100913",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 42,
                "Median_mortgage_repay_monthly": 2102,
                "Median_rent_weekly": 380,
                "Median_tot_fam_inc_weekly": 2029,
                "Median_tot_hhd_inc_weekly": 1825,
                "Median_tot_prsnl_inc_weekly": 860,
                "SA1_7DIGITCODE_2016": 1100913
            }
        },
        {
            "RegionID": "1101008",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.1,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 1621,
                "Median_rent_weekly": 295,
                "Median_tot_fam_inc_weekly": 1430,
                "Median_tot_hhd_inc_weekly": 1226,
                "Median_tot_prsnl_inc_weekly": 716,
                "SA1_7DIGITCODE_2016": 1101008
            }
        },
        {
            "RegionID": "1101102",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3.1,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 45,
                "Median_mortgage_repay_monthly": 2080,
                "Median_rent_weekly": 330,
                "Median_tot_fam_inc_weekly": 2785,
                "Median_tot_hhd_inc_weekly": 2678,
                "Median_tot_prsnl_inc_weekly": 1205,
                "SA1_7DIGITCODE_2016": 1101102
            }
        },
        {
            "RegionID": "1101011",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2,
                "Average_num_psns_per_bedroom": 0.5,
                "Median_age_persons": 32,
                "Median_mortgage_repay_monthly": 0,
                "Median_rent_weekly": 0,
                "Median_tot_fam_inc_weekly": 2124,
                "Median_tot_hhd_inc_weekly": 2124,
                "Median_tot_prsnl_inc_weekly": 900,
                "SA1_7DIGITCODE_2016": 1101011
            }
        },
        {
            "RegionID": "1100808",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.8,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 35,
                "Median_mortgage_repay_monthly": 1743,
                "Median_rent_weekly": 330,
                "Median_tot_fam_inc_weekly": 1724,
                "Median_tot_hhd_inc_weekly": 1570,
                "Median_tot_prsnl_inc_weekly": 721,
                "SA1_7DIGITCODE_2016": 1100808
            }
        },
        {
            "RegionID": "1100811",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 38,
                "Median_mortgage_repay_monthly": 2000,
                "Median_rent_weekly": 395,
                "Median_tot_fam_inc_weekly": 2020,
                "Median_tot_hhd_inc_weekly": 1462,
                "Median_tot_prsnl_inc_weekly": 860,
                "SA1_7DIGITCODE_2016": 1100811
            }
        },
        {
            "RegionID": "1101007",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.9,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 1482,
                "Median_rent_weekly": 260,
                "Median_tot_fam_inc_weekly": 1452,
                "Median_tot_hhd_inc_weekly": 1295,
                "Median_tot_prsnl_inc_weekly": 825,
                "SA1_7DIGITCODE_2016": 1101007
            }
        },
        {
            "RegionID": "1101103",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.5,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 43,
                "Median_mortgage_repay_monthly": 2600,
                "Median_rent_weekly": 300,
                "Median_tot_fam_inc_weekly": 2524,
                "Median_tot_hhd_inc_weekly": 2524,
                "Median_tot_prsnl_inc_weekly": 1157,
                "SA1_7DIGITCODE_2016": 1101103
            }
        },
        {
            "RegionID": "1101112",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.4,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 47,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 250,
                "Median_tot_fam_inc_weekly": 1875,
                "Median_tot_hhd_inc_weekly": 1875,
                "Median_tot_prsnl_inc_weekly": 792,
                "SA1_7DIGITCODE_2016": 1101112
            }
        },
        {
            "RegionID": "1100809",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 0,
                "Average_num_psns_per_bedroom": 0,
                "Median_age_persons": 0,
                "Median_mortgage_repay_monthly": 0,
                "Median_rent_weekly": 0,
                "Median_tot_fam_inc_weekly": 0,
                "Median_tot_hhd_inc_weekly": 0,
                "Median_tot_prsnl_inc_weekly": 0,
                "SA1_7DIGITCODE_2016": 1100809
            }
        },
        {
            "RegionID": "1100818",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 36,
                "Median_mortgage_repay_monthly": 1625,
                "Median_rent_weekly": 270,
                "Median_tot_fam_inc_weekly": 1458,
                "Median_tot_hhd_inc_weekly": 1178,
                "Median_tot_prsnl_inc_weekly": 677,
                "SA1_7DIGITCODE_2016": 1100818
            }
        },
        {
            "RegionID": "1100912",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.2,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 43,
                "Median_mortgage_repay_monthly": 1950,
                "Median_rent_weekly": 250,
                "Median_tot_fam_inc_weekly": 1958,
                "Median_tot_hhd_inc_weekly": 1406,
                "Median_tot_prsnl_inc_weekly": 733,
                "SA1_7DIGITCODE_2016": 1100912
            }
        },
        {
            "RegionID": "1100817",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 36,
                "Median_mortgage_repay_monthly": 1800,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 1666,
                "Median_tot_hhd_inc_weekly": 1388,
                "Median_tot_prsnl_inc_weekly": 772,
                "SA1_7DIGITCODE_2016": 1100817
            }
        },
        {
            "RegionID": "1101001",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.7,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 40,
                "Median_mortgage_repay_monthly": 2134,
                "Median_rent_weekly": 400,
                "Median_tot_fam_inc_weekly": 1481,
                "Median_tot_hhd_inc_weekly": 1281,
                "Median_tot_prsnl_inc_weekly": 756,
                "SA1_7DIGITCODE_2016": 1101001
            }
        },
        {
            "RegionID": "1100914",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.3,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 41,
                "Median_mortgage_repay_monthly": 1875,
                "Median_rent_weekly": 380,
                "Median_tot_fam_inc_weekly": 1778,
                "Median_tot_hhd_inc_weekly": 1489,
                "Median_tot_prsnl_inc_weekly": 827,
                "SA1_7DIGITCODE_2016": 1100914
            }
        },
        {
            "RegionID": "1100905",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.6,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 46,
                "Median_mortgage_repay_monthly": 2015,
                "Median_rent_weekly": 323,
                "Median_tot_fam_inc_weekly": 1963,
                "Median_tot_hhd_inc_weekly": 1635,
                "Median_tot_prsnl_inc_weekly": 809,
                "SA1_7DIGITCODE_2016": 1100905
            }
        },
        {
            "RegionID": "1100812",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.9,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 34,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 420,
                "Median_tot_fam_inc_weekly": 3049,
                "Median_tot_hhd_inc_weekly": 2774,
                "Median_tot_prsnl_inc_weekly": 1273,
                "SA1_7DIGITCODE_2016": 1100812
            }
        },
        {
            "RegionID": "1101010",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 1.9,
                "Average_num_psns_per_bedroom": 0.9,
                "Median_age_persons": 31,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 285,
                "Median_tot_fam_inc_weekly": 1778,
                "Median_tot_hhd_inc_weekly": 1356,
                "Median_tot_prsnl_inc_weekly": 912,
                "SA1_7DIGITCODE_2016": 1101010
            }
        },
        {
            "RegionID": "1101104",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.4,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 49,
                "Median_mortgage_repay_monthly": 2600,
                "Median_rent_weekly": 240,
                "Median_tot_fam_inc_weekly": 1946,
                "Median_tot_hhd_inc_weekly": 1575,
                "Median_tot_prsnl_inc_weekly": 846,
                "SA1_7DIGITCODE_2016": 1101104
            }
        },
        {
            "RegionID": "1101111",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.7,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 45,
                "Median_mortgage_repay_monthly": 2520,
                "Median_rent_weekly": 350,
                "Median_tot_fam_inc_weekly": 2654,
                "Median_tot_hhd_inc_weekly": 2452,
                "Median_tot_prsnl_inc_weekly": 1039,
                "SA1_7DIGITCODE_2016": 1101111
            }
        },
        {
            "RegionID": "1101002",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 3,
                "Average_num_psns_per_bedroom": 0.7,
                "Median_age_persons": 44,
                "Median_mortgage_repay_monthly": 2167,
                "Median_rent_weekly": 150,
                "Median_tot_fam_inc_weekly": 3146,
                "Median_tot_hhd_inc_weekly": 3083,
                "Median_tot_prsnl_inc_weekly": 1122,
                "SA1_7DIGITCODE_2016": 1101002
            }
        },
        {
            "RegionID": "1100708",
            "PartitionID": "G02",
            "KVPairs": {
                "Average_household_size": 2.2,
                "Average_num_psns_per_bedroom": 0.8,
                "Median_age_persons": 51,
                "Median_mortgage_repay_monthly": 1733,
                "Median_rent_weekly": 142,
                "Median_tot_fam_inc_weekly": 1491,
                "Median_tot_hhd_inc_weekly": 1149,
                "Median_tot_prsnl_inc_weekly": 635,
                "SA1_7DIGITCODE_2016": 1100708
            }
        }
    ],
    "Metadata": {
        "Average_household_size": "Average household size",
        "Average_num_psns_per_bedroom": "Average number of Persons per bedroom",
        "Median_age_persons": "Median age of persons",
        "Median_mortgage_repay_monthly": "Median mortgage repayment monthly",
        "Median_rent_weekly": "Median rent weekly",
        "Median_tot_fam_inc_weekly": "Median total family income weekly",
        "Median_tot_hhd_inc_weekly": "Median total household income weekly",
        "Median_tot_prsnl_inc_weekly": "Median total personal income weekly"
    }
}