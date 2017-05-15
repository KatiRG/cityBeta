//----------
// General
//----------

function format_idName(city) {
  return idName = city.replace(/\s/g, '_')
                 .replace(/\(/g, '')
                 .replace(/\)/g, '')
                 .replace(/\'/g, '')
                 .replace(/\,/g, '')
                 .replace(/\&/g, '');
}

function setupData(ghg){
  data_GHG = ghg.map(function(d) {
    //each d is a line of the csv file represented as a json object

    city = d.city
    GCA_region = d.GCA_region //Global Carbon Atlas regions
    // cityLocation = +d.City_location
    country = d.country
    GDP_cap = +d["GDP/capita"]//+d.gdp_per_cap
    popn_cdp = +d.Current_population
    GHG_total = +d.total_GHG //[tCO2]
    GHG_cap = +d.total_GHG/popn_cdp
    GHG_GDP = GHG_cap/GDP_cap * 1000 //[kgCO2/$]
    urb_ratio = +d["urban ratio"]//+d.urbanization_ratio
    popn_creutzig = +d["population"]//+d.population
    pdensity = +d["population density"]//+d.population_density
    HDD155C = +d["HDD 15.5C"]//+d.HDD_155C
    CDD23C = +d["CDD 23C"]//+d.CDD_23C
    diesel_price = d["diesel price"]//+d.diesel_price
    gas_price = +d["gas price"]//+d.gasoline_price
    emissions_int2009 = +d["GHGe intensity 2009"] //national value
    emissions_int2004 = +d["GHGe intensity 2004"]//+d.emission_intensity_2004 //national value
    HH = +d["household size"]
    commerce_idx = +d["commerce index"] //+d.center_of_commerce_index
    delta_GHG = d.delta_GHG //string
    delta_GHG_reason = d.delta_GHG_reason //string

    idName = format_idName(d.city);

    cityName_array.push(city)
   
    return {
      "city": city,
      "idName": idName,
      "country": country,
      "region": GCA_region,
      // "cityLocation": cityLocation,
      "GHG total": GHG_total,
      "GHGe intensity 2004": emissions_int2004,
      "GHGe intensity 2009": emissions_int2009,
      "population": popn_creutzig,
      "population density": pdensity,
      "GDP/capita": GDP_cap,
      "GHG/capita": GHG_cap,
      "GHG/GDP": GHG_GDP,
      "diesel price": diesel_price,
      "gas price": gas_price,
      "HDD 15.5C": HDD155C,
      "CDD 23C": CDD23C,
      "urban ratio": urb_ratio,
      "commerce index": commerce_idx,
      "household size": HH,
      "delta_GHG": delta_GHG,
      "delta_GHG_reason": delta_GHG_reason
    };
  })

} // ./setupData()

function setup_vData(vdata){
  data_noGHG = vdata.map(function(d) {
    //each d is a line of the csv file represented as a json object

    city = d.city
    country = d.country
    GDP_cap = +d["GDP/capita"]//+d.gdp_per_cap
    GHG_total = "N/A" //[tCO2]
    GHG_cap = "N/A"
    GHG_GDP = "N/A" //[kgCO2/$]
    urb_ratio = +d["urban ratio"]//+d.urbanization_ratio
    popn_creutzig = +d["population"]//+d.population
    pdensity = +d["population density"]//+d.population_density
    HDD155C = +d["HDD 15.5C"]//+d.HDD_155C
    CDD23C = +d["CDD 23C"]//+d.CDD_23C
    diesel_price = d["diesel price"]//+d.diesel_price
    gas_price = +d["gas price"]//+d.gasoline_price
    emissions_int2009 = +d["GHGe intensity 2009"] //national value
    emissions_int2004 = +d["GHGe intensity 2004"]//+d.emission_intensity_2004 //national value
    HH = +d["household size"]
    commerce_idx = +d["commerce index"] //+d.center_of_commerce_index
    delta_GHG = "N/A" //string
    delta_GHG_reason = "N/A" //string    
    region = (east.indexOf(city) != -1) ? "groupEast" : 
      (nordics.indexOf(city) != -1) ? "groupNordic" : 
      (latinAmer.indexOf(city) != -1) ? "groupLatinAmer" : 
      (africaAsia.indexOf(city) != -1) ? "groupAfricaAsia" : 
      (usa.indexOf(city) != -1) ? "groupUSAAusNZ" : "groupEurope"

    idName = format_idName(d.city);
   
    return {
      "city": city,
      "idName": idName,
      "country": country,
      "region": region,
      "GHG total": GHG_total,
      "GHGe intensity 2004": emissions_int2004,
      "GHGe intensity 2009": emissions_int2009,
      "population": popn_creutzig,
      "population density": pdensity,
      "GDP/capita": GDP_cap,
      "GHG/capita": GHG_cap,
      "GHG/GDP": GHG_GDP,
      "diesel price": diesel_price,
      "gas price": gas_price,
      "HDD 15.5C": HDD155C,
      "CDD 23C": CDD23C,
      "urban ratio": urb_ratio,
      "commerce index": commerce_idx,
      "household size": HH,
      "delta_GHG": delta_GHG,
      "delta_GHG_reason": delta_GHG_reason
    };
  })
} // ./setup_vData()


// Reset elements to original style before selection
function resetElements() {
  //reset bar opacity
  d3.selectAll(".bar")
    .style("fill-opacity", 1);

  //reset vcircle opacity
  d3.selectAll(".node")
    .style("fill-opacity", 1)
    .style("stroke-opacity", 1);

  //clear previously highlighted country
  d3.selectAll(".countries").selectAll("path")
    .style("stroke","#555")
    .style("stroke-width", 1)
    .style("opacity", 1);
}

//----------------------------------------------
// Functions for similar cities voronoi map
//----------------------------------------------

//Colourbar
function create_colourBar() {

  //Find colour mapping for current dim
  if (dim != "region") colourmapDim = dim_colourMapping(dim);
  else cb_hex = Object.values(simregionColourMap);

  // Make colourbar rects
  var width_cb = 900, height_cb = 80;
    
  var svgCB = d3.select("#cb").select("svg")
    .attr("width", width_cb)
    .attr("height", height_cb);

  // Tooltip for rects  
  var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-8, 0])
    .html(function (d, i) {
      if (dim != "region") {
        s0 = d < 1 ? formatDecimalSci(d) : formatDecimalS(d);
        // s1 = formatDecimalS( dimExtent[0] + (i+1)*delta );
        s1_end = dimExtent[0] + (i+1)*delta;
        s1 = s1_end < 1 ? formatDecimalSci(s1_end) : formatDecimalS(s1_end);
        return s0 + " &ndash; "
                + s1 + " " + dimUnits[dim];
      } else {
        return regionLabel_dict[Object.keys(simregionColourMap)[i]];
      }
    });

  
  svgCB.call(tool_tip);  

  var rects = svgCB.selectAll('rect')
      .data(cb_values);

  rects.enter()
      .append("rect")
      .attr("width", 50)
      .attr("height", 50)
      .attr("y", 5)
      .attr("x", function (d, i) {
        return i * 55;
      })
      .attr("fill", function (d, i) {
        return cb_hex[i];
      })
      .attr("stroke", "#555")
      .attr("stroke-width", 0.5)
      .on('mouseover', tool_tip.show)
      .on('mouseout', tool_tip.hide);

}

function dim_colourMapping(dim) {

  // Colour scale for different dimensions (6 colours)
  num_colours = 6;
  cb_hex = [];
  if (dim === "GHG/capita") {//light to dark    
    cb_hex = ['#E0B122', '#D9901C','#9C6C1F', '#875505','#4F370F','#3D2704'];
  } else if (dim === "GHGe intensity 2004") {
    cb_hex = ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"];
  } else if (dim === "GHGe intensity 2009") {
    cb_hex = ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"];  
  } else if (dim === "population") {
    cb_hex = ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c'];
  } else if (dim === "population density") {
    cb_hex = ['#f1eef6','#d4b9da','#c994c7','#df65b0','#dd1c77','#980043'];
  } else if (dim === "GDP/capita") {
    cb_hex = ['#f2f0f7','#dadaeb','#bcbddc','#9e9ac8','#756bb1','#54278f'];
  } else if (dim === "diesel price") {
    cb_hex = ['#ffffd4','#fee391','#fec44f','#fe9929','#d95f0e','#993404'];
  } else if (dim === "gas price") {
    cb_hex = ['#ffffd4','#fee391','#fec44f','#fe9929','#d95f0e','#993404'];
  } else if (dim === "HDD 15.5C") {
    cb_hex = ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026'];
  } else if (dim === "CDD 23C") {
    cb_hex = ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c'];
  } else if (dim === "urban ratio") {
    cb_hex = ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#31a354','#006d2c'];
  } else if (dim === "commerce index") {
    cb_hex = ['#f7f7f7','#d9d9d9','#bdbdbd','#969696','#636363','#252525'];
  } else if (dim === "household size") {
    cb_hex = ['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#c51b8a','#7a0177'];
  }
  
  delta = ( dimExtent[1] - dimExtent[0] )/num_colours;
  
  cb_values=[]; //clear
  for (idx=0; idx < num_colours; idx++) {
    cb_values.push(dimExtent[0] + idx*delta);
  }

  colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
            .domain([dimExtent[0], dimExtent[1]])
            .range(cb_hex);
  
  return colourmapDim;
}

// Fill colour for voronoi circles
function voronoiCirclesOverlay() {
  d3.select("#mapSim").select("svg")
    .selectAll(".node").selectAll("circle")
    .attr('fill', function(d) {
      return fillVoronoiCircles(d);
    });
}
function fillVoronoiCircles(d) {//READS df_Z COLUMNS!!

  if (dim === "GHG/capita") {
    matchCity = data_GHG.find(x => x.city === d.city)
    return matchCity ? colourmapDim(matchCity[dim]) : nodataColour;
  } else if (dim === "region") {  
    
    d3.selectAll(".circles-vcentre").selectAll(".groupUSAAusNZ")
      .style("fill", simregionColourMap["groupUSAAusNZ"]);   

    d3.selectAll(".circles-vcentre").selectAll(".groupEurope")
      .style("fill", simregionColourMap["groupEurope"]);

    d3.selectAll(".circles-vcentre").selectAll(".groupAfricaAsia")
      .style("fill", simregionColourMap["groupAfricaAsia"]);  

    d3.selectAll(".circles-vcentre").selectAll(".groupEast")
      .style("fill", simregionColourMap["groupEast"]);

    d3.selectAll(".circles-vcentre").selectAll(".groupLatinAmer")
      .style("fill", simregionColourMap["groupLatinAmer"]);

    d3.selectAll(".circles-vcentre").selectAll(".groupNordic")
      .style("fill", simregionColourMap["groupNordic"]);

  } else if (dim === "GHGe intensity 2004" || dim === "GHGe intensity 2009") {
    if (d[dim] != "") return colourmapDim(d[dim]);
    //no 2004 emissions intensity for Oslo and Vilnius

  } else {

    return colourmapDim(d[dim]);
  }
}

function vcircleMouseover(d) {
  //Tooltip
  //http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
  d3.select("#mapSim").select("div.vtooltip")
    .style("height", function (d) {
      _this = d3.select(this).text();
      if (_this === "Västra Götaland county") return 48 + "px";
    })
    .style("opacity", 0.8)
    .html(d.city)
    .style("left", function (d) {
      _this = d3.select(this).text();
      if (_this === "Oslo" || _this === "Helsinki" ||
          _this === "Sundsvall" || _this === "Karlstad" ||
          _this === "Jönköping" || _this === "Örebro" ||
          _this === "Uppsala" || 
          _this === "Norrköping" || _this === "Linköping") return (d3.event.pageX - 90) + "px";
      else if (_this === "Västra Götaland county") return (d3.event.pageX - 120) + "px";
      else if (_this === "Helsinki") return (d3.event.pageX - 120) + "px";
      else if (_this === "Växjö") return (d3.event.pageX - 110) + "px";
      else return (d3.event.pageX) + "px";
    })
    .style("top", (d3.event.pageY - 530) + "px");

  idName = format_idName(d.city);

  // Highlight current vcircle, polygon and bar  
  highlightElements(idName, d.country);

  if (data_GHG.find(x => x.city === d.city)) updateRegionLabel(d.city);
  else d3.select("#regionLabel").text("GHG/capita emissions grouped by world region");
}

//----------------------------------------------
// Functions for ghgBarChart()
//----------------------------------------------
function sortByRegion(region) {

  ghg_byRegion = [];
  data_GHG.forEach(function (d) {
    if (d.region === region) ghg_byRegion.push(d);
  });
  return ghg_byRegion;
}

function highlightCountry(countryName, idName, dataObj)  {
  var matchColour = simregionColourMap[
                        dataObj.find(x => x.idName.includes(idName)).region
                      ];

  if (countryName === "South Africa") {
      d3.select("#mapSouth Africa")
        .style("stroke-width", 4)
        .style("stroke", matchColour === "#A6D4FF" ? "blue" : matchColour);
  }
  else {
    d3.select("#map" + countryName)
      .style("stroke-width", 4)      
      .style("stroke", matchColour === "#A6D4FF" ? "blue" : matchColour);

    d3.selectAll(".countries")
      .selectAll("path:not(#map" + countryName + ")")
      .style("opacity", 0.3);
  }
}