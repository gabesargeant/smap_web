//This is the basis for the Map Request Objects
var mapRequests = [];
var selectedRegions = [];

var map;
var visDataField;
var min_max = [0, 5000, 750];

var map_colors = [
    [56, 168, 0, 0.5],
    [139, 209, 0, 0.5],
    [255, 255, 0, 0.5],
    [255, 128, 0, 0.5],
    [254, 0, 0, 0.5],

    [237, 248, 251, 0.5],
    [178, 226, 226, 0.5],
    [102, 194, 164, 0.5],
    [44, 162, 95, 0.5],
    [0, 109, 44, 0.5],

    [255, 255, 178, 0.5],
    [254, 204, 92, 0.5],
    [253, 141, 60, 0.5],
    [240, 59, 32, 0.5],
    [189, 0, 38, 0.5],

    [252, 197, 192, 0.5],
    [250, 159, 181, 0.5],
    [247, 104, 161, 0.5],
    [197, 27, 138, 0.5],
    [122, 1, 119, 0.5],

    [44, 123, 182, 0.5],
    [171, 217, 233, 0.5],
    [255, 255, 191, 0.5],
    [253, 174, 97, 0.5],
    [215, 25, 28, 0.5],

    [141, 211, 199, 0.5],
    [255, 255, 179, 0.5],
    [190, 186, 218, 0.5],
    [251, 128, 114, 0.5],
    [128, 177, 211, 0.5],

    [247, 247, 247, 0.5],
    [204, 204, 204, 0.5],
    [150, 150, 150, 0.5],
    [99, 99, 99, 0.5],
    [37, 37, 37, 0.5]
];

require([
    "dojo/dom",
    "dojo/on",
    "esri/map",
    "esri/geometry/Extent",
    "esri/InfoTemplate",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/layers/FeatureLayer",
    "esri/renderers/ClassBreaksRenderer",

    "esri/graphic",

    "esri/symbols/TextSymbol",
    "esri/Color",
    "esri/layers/LabelClass",

    "esri/renderers/SimpleRenderer",

    "esri/toolbars/draw",
    "esri/tasks/query",
    "dojo/domReady!",



], function (
    dom,
    on,
    Map,
    Extent,
    InfoTemplate,
    SimpleLineSymbol,
    SimpleFillSymbol,
    FeatureLayer,
    ClassBreaksRenderer,

    Graphic,
    TextSymbol,
    LabelClass,
    SimpleRenderer,
    Color,
    Draw,
    Query,
    Ready
) {
    map = new Map("mapDiv", {
        basemap: "osm",
        center: [133.25, -24.15],
        zoom: 4,
    });

    //Info Template
    var infoTemplate = new InfoTemplate();
    infoTemplate.setTitle("Title"); //Standin
    infoTemplate.setContent(getInfoContent);

    function getInfoContent(graphic) {
        var fval = findValue(graphic);
        if (typeof fval === "undefined") {
            fval = "<br/>No Data available, Sorry!";
        }
        rtn_str =
            "<br> The value of the selected area" +
            graphic.attributes["POA_NAME_2016"] +
            "<b>" +
            name +
            "</b> is <b>" +
            fval +
            "</b>";

        return rtn_str;
    }

    var line = new SimpleLineSymbol();
    line.setWidth(1.5);
    line.setStyle(SimpleLineSymbol.SOLID);
    line.setColor(new Color([225, 0, 0, 0.4]));

    var symbol = new SimpleFillSymbol();
    symbol = symbol.setOutline(line);

    function findValue(graphic) {

        var layer;
        var layerID
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            layerID = map.graphicsLayerIds[i];
            layer = map.getLayer(layerID);
            //console.log("this layer is number " + i + " and it is visible?" + layer.visible);
            if (layer.visible) {
                layerNum = i;
            }

        }

        code = getLayerAttributesGIS(layerNum);

        console.log("this layer code is:")
        console.log(code)

        var cdx = graphic.attributes[code];
        var val;
        console.log(latestRequestData.MapData.length)
        for (var i = 0; i < latestRequestData.MapData.length; i++) {

            //console.log(latestRequestData.MapData[i].RegionID)
            console.log("cdx " + cdx);
            if (cdx.localeCompare(latestRequestData.MapData[i].RegionID) == 0) {
                valmap = latestRequestData.MapData[i].KVPairs
                console.log('vis data : ' + visDataField);

                console.log(valmap[visDataField])
                val = valmap[visDataField];
                console.log(val)
            }
        }
        return val;
    }


    loading = dom.byId("loadingImg");

    on(map, "update-start", showLoading);
    on(map, "update-end", hideLoading);

    function showLoading() {
        esri.show(loading);
        //map.disableMapNavigation();
        map.hideZoomSlider();
    }

    function hideLoading(error) {
        esri.hide(loading);
        //map.enableMapNavigation();
        map.showZoomSlider();
    }

    var aus = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/1", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var ste = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/18", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],

    });
    var sa4 = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/15", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var sa3 = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/14", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var sa2 = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/13", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var ssc = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/17", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var poa = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/11", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var gccsa = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/4", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var ced = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/2", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var sed = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/16", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var lga = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/8", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });


    var currentSelection;
    var currentLayer;
    drawToolbar = new Draw(map);
    drawToolbar.on('draw-complete', function (e) {

        drawToolbar.deactivate();
        var query = new Query();
        query.geometry = e.geometry;

        currentLayer.selectFeatures(query);
        currentSelection = query;

    });
    var selectionSymbol = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0]), 4),
        new Color([255, 0, 0, 0.4])
    );
    aus.setSelectionSymbol(selectionSymbol);
    ste.setSelectionSymbol(selectionSymbol);
    sa4.setSelectionSymbol(selectionSymbol);
    sa3.setSelectionSymbol(selectionSymbol);
    sa2.setSelectionSymbol(selectionSymbol);
    ssc.setSelectionSymbol(selectionSymbol);
    poa.setSelectionSymbol(selectionSymbol);
    gccsa.setSelectionSymbol(selectionSymbol);
    ced.setSelectionSymbol(selectionSymbol);
    sed.setSelectionSymbol(selectionSymbol);
    lga.setSelectionSymbol(selectionSymbol);


    map.addLayer(aus);
    map.addLayer(ste);
    map.addLayer(sa4);
    map.addLayer(sa3);
    map.addLayer(sa2);
    map.addLayer(ssc);
    map.addLayer(poa);
    map.addLayer(gccsa);
    map.addLayer(ced);
    map.addLayer(sed);
    map.addLayer(lga);

    //aus.hide();current
    currentLayer = ste;

    on(dom.byId('selectAreaBtn'), 'click', function () {
        clearSelectedAreas();
        drawToolbar.activate(Draw.POLYGON);
    });

    on(dom.byId('selectLayer'), 'change', function (e) {
        //make sure map is in focus
        mapUp()

        var layer;
        var layerID
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            layerID = map.graphicsLayerIds[i];
            layer = map.getLayer(layerID);
            layer.setVisibility(false);
            layer.clearSelection();

        }
        layerID = map.graphicsLayerIds[e.target.value];
        layer = map.getLayer(layerID);
        layer.setVisibility(true);

        currentLayer = layer;
        currentSelection = null;

    });



    on(dom.byId('resetBtn'), 'click', function () {
        drawToolbar.deactivate();
        clearSelectedAreas();

    });


    on(dom.byId('queryBtn'), 'click', function () {

        showLoading();
        document.getElementById('errorMsg').innerHTML = "";
        document.getElementById("queryBtn").disabled = true;

        selectedRegions.length = 0;
        mapRequests.length = 0;

        var layer = currentLayer;
        selection = layer.getSelectedFeatures();
        var code;
        //get the attributes for the first Object in the selected graphics
        //then search it for its CODE element. Take substring search result.
        //then build an array of all of those codes from the selected features.
        var layer;
        var layerID
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            layerID = map.graphicsLayerIds[i];
            layer = map.getLayer(layerID);
            //console.log("this layer is number" + i + "and it is visible?" + layer.visible); 
            if (layer.visible) {
                layerNum = i;
            }

        }

        code = getLayerAttributesGIS(layerNum);
        //hard 100 geo limit!
        mapRequests = [];
        //get the topic selected in the topic div
        var topic = document.querySelector('input[name="topic"]:checked').value;

        if (selection.length == 0) {
            document.getElementById('errorMsg').innerHTML = "No Selection Made. Select over Australia";
            hideLoading();
            document.getElementById("queryBtn").disabled = false;
            return;
        }

        for (var i = 0; i < selection.length && i < 100; i++) {

            value = selection[i].attributes[code];
            selectedRegions.push(value);
            mr = new MapRequest(value, topic);
            mapRequests.push(mr);

        }

        console.log(mapRequests)
        console.log(JSON.stringify(mapRequests))

        document.getElementById("queryBtn").disabled = false;


        getDataFromAPI(hideLoading)

    });

    function getLayerAttributesGIS(layerNum) {
        var code;
        switch (layerNum) {
            case 0:
                code = "AUS_CODE_2016";
                break;

            case 1:
                code = "STATE_CODE_2016";
                break;

            case 2:
                code = "SA4_CODE_2016";
                break;

            case 3:
                code = "SA3_CODE_2016";
                break;

            case 4:
                code = "SA2_MAINCODE_2016";
                break;

            case 5:
                code = "SSC_CENSUSCODE_2016";
                break;

            case 6:
                code = "POA_CENSUSCODE_2016";
                break;

            case 7:
                code = "GCCSA_CODE_2016";
                break;

            case 8:
                code = "CED_CENSUSCODE_2016";
                break;

            case 9:
                code = "SED_CENSUSCODE_2016";
                break;

            case 10:
                code = "LGA_CENSUSCODE_2016";
                break;

        }
        return code;
    };

    function clearSelectedAreas() {
        var layer;
        var layerID
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            layerID = map.graphicsLayerIds[i];
            layer = map.getLayer(layerID);
            layer.clearSelection();
        }
    }


    on(updateBreaks, "click", function () {
        var stp = min_max[2]; //Even breaks to start with.
        var stp1 = 0;
        var stp2 = stp;
        var stp3 = stp * 2;
        var stp4 = stp * 3;
        var stp5 = stp * 4;
        var top = min_max[1]; //max returned val

        if (document.getElementById("ckmeans").checked == true) {
            console.log("using ck means CK Means ");
            output = ss.ckmeans(ckMeansData, 5);
            //console.log(output);
            stp1 = 0;
            stp2 = output[1][0];
            stp3 = output[2][0];
            stp4 = output[3][0];
            stp5 = output[4][0];
            top = output[4][output[4].length - 1];
        }

        $("#one_b").val(parseInt(stp1));
        $("#two_b").val(parseInt(stp2));
        $("#three_b").val(parseInt(stp3));
        $("#four_b").val(parseInt(stp4));
        $("#five_b").val(parseInt(stp5));

        $("#one_a").html(parseInt(stp2 - 1));
        $("#two_a").html(parseInt(stp3 - 1));
        $("#three_a").html(parseInt(stp4 - 1));
        $("#four_a").html(parseInt(stp5 - 1));
        $("#five_a").val(parseInt(top));

        // var layer;
        // var layerID
        // var layerNum
        // for (var i = 0; i < map.graphicsLayerIds.length; i++) {
        //     layerID = map.graphicsLayerIds[i];
        //     layer = map.getLayer(layerID);
        //     //console.log("this layer is number" + i + "and it is visible?" + layer.visible); 
        //     if (layer.visible) {
        //         layerNum = i;
        //     }

        // }

        // map.removeLayer(layerNum);

        var __map_color = document.getElementById("selectColor");
        var mc_i = __map_color.options[__map_color.selectedIndex].value;
        var mc_i = 5 * mc_i;

        var mcr0;
        var mcr1;
        var mcr2;
        var mcr3;
        var mcr4;

        if (document.getElementById("flip_ramp").checked == true) {
            mcr0 = mc_i + 4;
            mcr1 = mc_i + 3;
            mcr2 = mc_i + 2;
            mcr3 = mc_i + 1;
            mcr4 = mc_i + 0;
            console.log("jenks");
            console.log(output);
        } else {
            mcr0 = mc_i + 0;
            mcr1 = mc_i + 1;
            mcr2 = mc_i + 2;
            mcr3 = mc_i + 3;
            mcr4 = mc_i + 4;
        }

        $("#one_c").removeClass();
        $("#one_c").addClass("c" + mcr0);
        $("#two_c").removeClass();
        $("#two_c").addClass("c" + mcr1);
        $("#three_c").removeClass();
        $("#three_c").addClass("c" + mcr2);
        $("#four_c").removeClass();
        $("#four_c").addClass("c" + mcr3);
        $("#five_c").removeClass();
        $("#five_c").addClass("c" + mcr4);

        c1 = map_colors[mcr0];
        c2 = map_colors[mcr1];
        c3 = map_colors[mcr2];
        c4 = map_colors[mcr3];
        c5 = map_colors[mcr4];

        var ren = new ClassBreaksRenderer(symbol, findValue);
        ren.addBreak(stp1, stp2, new SimpleFillSymbol().setColor(new Color(c1)));
        ren.addBreak(stp2 + 1, stp3, new SimpleFillSymbol().setColor(new Color(c2)));
        ren.addBreak(stp3 + 1, stp4, new SimpleFillSymbol().setColor(new Color(c3)));
        ren.addBreak(stp4 + 1, stp5, new SimpleFillSymbol().setColor(new Color(c4)));
        ren.addBreak(stp5 + 1, top, new SimpleFillSymbol().setColor(new Color(c5)));

        // var fl = get_feature_layer(thematic_region);

        currentLayer.setRenderer(ren);
        // if (document.getElementById("check_label").checked == true) {
        //     var label_text = new TextSymbol().setColor(new Color("#000"));
        //     label_text.font.setSize("12pt");
        //     label_text.font.setFamily("arial");
        //     var json_label = {
        //         labelExpressionInfo: {
        //             expression: "$feature." + thematic_code_name
        //         }
        //     };
        //     var labelClass = new LabelClass(json_label);
        //     labelClass.symbol = label_text;
        //     fl.setLabelingInfo([labelClass]);
        // }
        currentLayer.setVisibility(true);
        map.addLayer(currentLayer);


        // code = getLayerAttributesGIS(layerNum)

        // var ext_arr = [];
        // for (var i = 0; i < currentLayer.graphics.length; i++) {
        //     var graphic = currentLayer.graphics[i];
        //     var cdx = graphic.attributes[code];

        //     for (ii = 0; ii < data.length; ii++) {
        //         if (cdx.localeCompare(data[ii][0]) === 0) {
        //             ext = new Extent(graphic.geometry.getExtent());

        //             ext_arr.push(ext);
        //         }
        //     }
        // }
        // var ext1 = ext_arr[0];
        // for (j = 1; j < ext_arr.length; j++) {
        //     ext1 = ext1.union(ext_arr[j]);
        // }
        // console.log(ext1)
        // map.setExtent(ext1.expand(1.25));
    });
});