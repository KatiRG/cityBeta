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
    //use + only for integers, not floats or strings

    city = d.city
    region = d['Geographic group'] //Global Carbon Atlas regions
    cityLocation = [+d['lat (external)'], +d['lon (external)']]
    country = d.country
    popn = +d['pop to use']
    area = d['area [km2] (external)']
    totalEmissions = d['Total City-wide Emissions (metric tonnes CO2e) (CDP)'] //[tCO2]
    scope1 = d['s1 to use']
    GDP = d['GDP-PPP combined']
    scope1_cap = +d['s1 per capita'] //d['s1 per capita']  //scope1/popn
    scope1_gdp = +d['s1 per gdp']
    GDP_cap = +d['GDP-PPP combined/cap']
    pop_density = popn/area//[pop/km2]
    HDD155C = +d["HDD_15.5C"]
    CDD23C = +d["CDD_23C"]
    diesel_price = d["diesel_price (2014)"]//+d.diesel_price
    gas_price = +d["gasoline_price (2014)"]//+d.gasoline_price
    HH = +d["household_size (updated)"]
    methodology_num = +d['MethodNum']
    methodology_details = d['Methodology Details (CDP)']
    delta_emissions = d['Increase/Decrease from last year (CDP)'] //string
    delta_emissions_reason = d['Reason for increase/decrease in emissions (CDP)']//string

    //Urban Areas
    UA_cluster = +d['Urban Area Cluster (FC)']
    low_BUA_1990 = +d['Low BUA - 1990 (FC)']
    low_BUA_2000 = +d['Low BUA \xe2\x80\x93 2000 (FC)']
    low_BUA_2014 = +d['Low BUA \xe2\x80\x93 2014 (FC)']
    high_BUA_1990 = +d['High BUA - 1990 (FC)']
    high_BUA_2000 = +d['High BUA \xe2\x80\x93 2000 (FC)']
    high_BUA_2014 = +d['High BUA \xe2\x80\x93 2014 (FC)']
    low_BUApc_1990 = +d['Low BUA % - 1990 (FC)']
    low_BUApc_2000 = +d['Low BUA % \xe2\x80\x93 2000 (FC)']
    low_BUApc_2014 = +d['Low BUA % \xe2\x80\x93 2014 (FC)']
    high_BUApc_1990 = +d['High BUA % - 1990 (FC)']
    high_BUApc_2000 = +d['High BUA % \xe2\x80\x93 2000 (FC)']
    high_BUApc_2014 = +d['High BUA % \xe2\x80\x93 2014 (FC)']
    low_BUA_pdensity_1990 = +d['Low BUA pop density - 1990 (FC)']
    high_BUA_pdensity_1990 = +d['High BUA pop density \xe2\x80\x93 1990 (FC)']
    low_BUA_pdensity_2000 = +d['Low BUA pop density \xe2\x80\x93 2000 (FC)']
    high_BUA_pdensity_2000 = +d['High BUA pop density - 2000 (FC)']
    low_BUA_pdensity_2014 = +d['Low BUA pop density \xe2\x80\x93 2014 (FC)']
    high_BUA_pdensity_2014 = +d['High BUA pop density - 2014 (FC)']

    //traffic and socio-economic indices
    inrix_congestion = +d['AVERAGE CONGESTION RATE (INRIX)']
    inrix_idx = +d['INRIX CONGESTION INDEX (INRIX)']
    inrix_hours = +d['PEAK HOURS SPENT IN CONGESTION (INRIX)']
    inrix_rank = +d['RANK (INRIX)']
    tomtom_congestion = +d['Congestion Level (TomTom)']
    tomtom_rank = +d['World Rank (TomTom)']
    tomtom_congestion_change = +d['Congestion change (TomTom)']
    tomtom_am_peak = +d['Morning Peak (TomTom)']
    tomtom_pm_peak = +d['Evening Peak (TomTom)']
    iese_human = +d['human capital (IESE)']
    iese_cohesion = +d['social cohesion (IESE)']
    iese_economy = +d['economy (IESE)']
    iese_management = +d['public management (IESE)']
    iese_gov = +d['governance (IESE)']
    iese_env = +d['environment (IESE)']
    iese_transport = +d['mobility and transportation (IESE)']
    iese_urban = +d['urban planning (IESE)']
    iese_intl = +d['international impact (IESE)']
    iese_tech = +d['technology (IESE)']
    iese_cimi = +d['CIMI (IESE)']
    iese_cimi_rank = +d['CIMI Ranking (IESE)']


    idName = format_idName(d.city);

    cityName_array.push(city)
   
    return {      
      "city": city,
      "idName": idName,
      "country": country,
      "region": region,
      "cityLocation": cityLocation,
      "total emissions": totalEmissions,
      "population": popn,
      "area": area,
      "Scope1": scope1,
      "per capita": scope1_cap,
      "per GDP": scope1_gdp,
      "population density": pop_density,
      "HDD 15.5C": HDD155C,
      "CDD 23C": CDD23C,
      "diesel price": diesel_price,
      "gas price": gas_price,
      "household size": HH,
      "methodology": methodology_num,
      "methodology details": methodology_details,
      "change in emissions": delta_emissions,
      "reason for change": delta_emissions_reason,
      "low BUA % (1990)": low_BUApc_1990,
      "low BUA % (2000)": low_BUApc_2000,
      "low BUA % (2014)": low_BUApc_2014,
      "high BUA % (1990)": high_BUApc_1990,
      "high BUA % (2000)": high_BUApc_2000,
      "high BUA % (2014)": high_BUApc_2014,
      "Avg congestion rate [%] (INRIX)": inrix_congestion,
      "Congestion Index (INRIX)": inrix_idx,
      "Peak hours spent in congestion (INRIX)": inrix_hours,
      "Congestion rank (INRIX)": inrix_rank,
      "Congestion level [%] (TomTom)": tomtom_congestion,
      "Congestion rank (TomTom)": tomtom_rank,
      "Congestion change [%] (TomTom)": tomtom_congestion_change,
      "Morning peak increase [%] (TomTom)": tomtom_am_peak,
      "Evening peak increase [%] (TomTom)": tomtom_pm_peak,
      "Human Capital index (IESE)": iese_human,
      "Social Cohesion index (IESE)": iese_cohesion,
      "Economy index (IESE)": iese_economy,
      "Public Management index (IESE)": iese_management,
      "Governance index (IESE)": iese_gov,
      "Environment index (IESE)": iese_env,
      "Mobility and Transportation index (IESE)": iese_transport,
      "Urban Planning index (IESE)": iese_urban,
      "International Impact index (IESE)": iese_intl,
      "Technology index (IESE)": iese_tech,
      "Cities in Motion index (IESE)": iese_cimi,
      "CIMI ranking (IESE)": iese_cimi_rank 
    };
  })


} // ./setupData()

// Reset elements to original style before selection
function resetElements() {
  //reset bar opacity
  d3.selectAll(".bar")
    .style("fill-opacity", 1)
    .style("stroke", "gray");

  //reset vcircle opacity
  d3.selectAll(".node")
    .style("fill-opacity", 1)
    .style("stroke-opacity", 1);

  //clear previously highlighted country
  d3.selectAll(".countries").selectAll("path")
    .style("stroke","#555")
    .style("stroke-width", 1)
    .style("opacity", 1);

  //reset opacity of world cites and map
  d3.selectAll(".worldcity").style("fill-opacity", 1)
    .style("stroke-opacity", 1);
  d3.selectAll(".countries").selectAll("path").style("opacity", 1) ;
  d3.selectAll(".worldcity")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 1);   
}

//----------------------------------------------
// Functions for map
//----------------------------------------------
function highlightCountry(countryName, idName, dataObj)  {
  var matchColour = regionColourMap[
                        dataObj.find(x => x.idName.includes(idName)).region
                      ];

  if (countryName === "South Africa") {
      d3.select("#mapSouth Africa")
        .style("stroke-width", 4)
        // .style("stroke", matchColour === "#A6D4FF" ? "blue" : matchColour);
        .style("stroke", "#555");
  }
  else {
    d3.select("#map" + countryName)
      .style("stroke-width", 4)
      .style("stroke", "#555")
      .style("stroke-opacity", 1);
      // .style("stroke", matchColour === "#A6D4FF" ? "blue" : matchColour);

    // d3.selectAll(".countries")
    //   .selectAll("path:not(#map" + countryName + ")")
    //   .style("opacity", 0.3);
  }
}

//----------------------------------------------
// Functions for emissionsBarChart()
//----------------------------------------------

//...............................
// barChart data fns

//concatenate geogroups together, separated by a gap
function fn_concat (barChartGroup, geogroupArray, this_dim) {
  objArray = [];
  count = 0; //for gap id labels
  
  for (idx=0; idx < geogroupArray.length; idx++) {   
    //Extract data by region
    ghg_extract = sortByRegion(geogroupArray[idx]);

    //Sort by this_dim in descending order
    ghg_extract.sort((a, b) => d3.descending(a[this_dim], b[this_dim]));

    //Rotterdam -- special case
    //Reduce bar height and indicate true value graphically on the chart
    if (geogroupArray[idx] === "groupEurope") {
      var selectedCity = data_GHG.find(x => x.city === "Rotterdam");
      //Store actual value for later display
      rotterdamEmissionsPerCap = formatDecimalSci(selectedCity[label_dataPerCap]);
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 11;
    }

    //Concatenate with a gap obj in between
    if (idx % 2 == 0) {
      objArray = objArray.concat(ghg_extract);
    } else {
      objArray = objArray.concat(
        [{ "city":"gap" + barChartGroup + count,  
           "region": barChartGroup,
           "per capita":0, 
           "per GDP": 0 }]
      );
      count++;
    }
  } //.for

  //save cityOrder
  if (this_dim === "per capita") {
    if (barChartGroup === "groupUSAAsia") cityOrder_row1 = objArray.map(x => x["city"]);
    else cityOrder_row2 = objArray.map(x => x["city"]);
  }


  return objArray;
}

//Abbreviate city name in x-axis
function fn_abbr(d) {
  if (d.indexOf(', ') >= 0) abbr = d.substring(0,3);
  else if (d.indexOf(' ') >= 0) abbr = d.match(/\b\w/g).join(' ');
  else abbr = d.substring(0,4);

  return abbr;
}

function sortByRegion(region, this_dim) {
  //console.log("region in sortByRegion: ", region)

  ghg_byRegion = [];
  data_GHG.forEach(function (d) {
    if (d.region === region && d[this_dim] != "") ghg_byRegion.push(d);
  });
  return ghg_byRegion;
}

function fn_reorderByEmissionsPerCapita(region, emissions_perGDP) {
  var city_order = [];
  var objArray = [];

  // if (region === "groupUSAAsia") {
  //   city_order = cityOrder_row1;
  // } else city_order = cityOrder_row2;

  city_order = (region === "groupUSAAsia" ? cityOrder_row1 : cityOrder_row2);

  //Re-order emissions_perGDP according to city_order of emissions per capita
  for (idx = 0; idx < city_order.length; idx++) {
    match = emissions_perGDP.filter(x => x.city === city_order[idx]); //in array form
    if (match.length != 0) objArray.push(match[0]);
  }

  return objArray;
}

//...............................
// barChart colour mapping

function fn_colour_barChart (attrFlag, attrValue) {
  
  if (attrFlag === "methodology") {//integers from 1-5, no mapping needed
    return colour_methodNum[attrValue];
  
  } else {
     
    colourmapDim = fn_colourmapDim(attrFlag);

    return colourmapDim(attrValue);
  } 
}
function fn_colourmapDim (attrFlag) {
  dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];

  //colour map to take data value and map it to the colour of the level bin it belongs to
  colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
            .domain([dimExtent[0], dimExtent[1]])
            .range(choose_colourArray[attrFlag]);

  return colourmapDim;
}
function fn_updateLegend (attrFlag) {
  if (attrFlag != "methodology") {  
    dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];
    //difference between max and min values of selected attribute
    delta = ( dimExtent[1] - dimExtent[0] )/num_levels;
    delta = Math.round(delta/1000)*1000
    console.log("delta: ", delta)
    console.log("dimExtent: ", dimExtent)

    cb_values=[]; //clear
    for (idx=0; idx < num_levels; idx++) {
      cb_values.push(Math.round((dimExtent[0] + idx*delta)/1000)*1000);
      //Math.round(value/1000)*1000
    }
    console.log("cb_values: ", cb_values)

    //colour map to take data value and map it to the colour of the level bin it belongs to
    var colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
              .domain([dimExtent[0], dimExtent[1]])
              .range(choose_colourArray[attrFlag]);
  }

  //Colour legend squares
  d3.select("#barChartLegend").select("svg")
    .selectAll('rect')
    .attr("fill", function (i, j) {
      var updateColour = attrFlag === "methodology" ?
                choose_colourArray[attrFlag][j]: colourmapDim(cb_values[j])
      // if (attrFlag != "methodology") {
      //   console.log("cb_values: ", cb_values[j]);
      //   console.log("updateColour: ", colourmapDim(cb_values[j])) ;
        // console.log("map 0: ", colourmapDim(0) );
        // console.log("map 5000: ", colourmapDim(5000) );
        // console.log("map 10000: ", colourmapDim(10000) );
        // console.log("map 14000: ", colourmapDim(14000) );
        // console.log("map 15000: ", colourmapDim(15000) );
        // console.log("map 19000: ", colourmapDim(19000) );
      // }
      return updateColour;
    });

  //label the legend squares
  d3.select("#barChartLegend")
    .selectAll("text")
    .text(function (i, j) {
      if (attrFlag === "methodology") {
        updateText = choose_textArray[attrFlag][j]
    } else {
      if (j === 0) updateText = "< " + cb_values[j + 1];
      else updateText = "> " + cb_values[j];      
    }
      return updateText;
    })
    .attr("x", function (d, i) {
      if (attrFlag === "methodology") xpos = [10,63,150,215,284];
      else xpos = [0,70,135,205,275];
      return xpos[i];
    });

    //update the units displayed in the legend
    d3.select("#barChartLegendUnits")
      .text(function () {return dimUnits[attrFlag]});
}

//...............................
// barChart visual interactivity

//Enlarge x-axis labels and reset
function fn_enlargeName(geogroup_name, cityName) {
  idName = format_idName(cityName);

  //Enlarge city label of selected bar
  newSize="16px";
  //Need different sizes on account of the vieweBox scale stretching
  if (geogroup_name === "groupEurope" || geogroup_name === "groupLatinAmer" ||
      geogroup_name === "groupUSA"|| geogroup_name === "groupOceania" ) newSize = "22px";
  else if (geogroup_name === "groupAfrica") newSize = "18px";
  else if (geogroup_name === "groupAsia") newSize = "18px";
  
  d3.select("#tick" + idName).text(cityName).style("font-size", newSize)
    .attr("fill", colour_labelsHighlight);
}

//...............................
// create barChart SVGs

//Create colour bar boxes
function fn_appendColourBar() {
  
  //setup params
  var margin = {top: 7, right: 0, bottom: 0, left: 10};
  var svg_width = 750 - margin.left - margin.right,
      svg_height = 35 - margin.top - margin.bottom;

  var rect_dim = 15;

  //colour array
  rect_colourArray = choose_colourArray[attrFlag];

  //make svg
  var svgCB = d3.select("#barChartLegend").select("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .style("vertical-align", "middle");

  //tooltip for rects  
  var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function (d, i) {
      return "<b>" + Object.keys(protocolDict)[i] + "</b>" + ": "
                   + Object.values(protocolDict)[i];
    });
  svgCB.call(tool_tip);

 //make colourbar rects
  var rects = svgCB.selectAll('rect')
              .data(rect_colourArray)
              .enter()
              .append('g');

  var rectAttributes = rects.append("rect")
                  .attr("width", rect_dim)
                  .attr("height", rect_dim)
                  .attr("y", 5)
                  .attr("x", function (d, i) {
                    return 38 + i * 70;
                  })
                  .attr("fill", function (d, i) {
                    //return colour_methodNum[i + 1];                    
                    return rect_colourArray[i];
                  })
                  .on('mouseover', tool_tip.show)
                  .on('mouseout', tool_tip.hide);

  rects.append("text")
        .text(function (d, i) {
          return Object.keys(protocolDict)[i];
        })
        .attr("y", 10)
        .attr("x", function (d, i) {
          var xpos = [10,63,150,215,284];
          return xpos[i];
        })
        .attr("dy", "6px")
        .style("fill","#565656")
        .style("stroke", "none")
       .style("font-size", "11px");
       
        
}

//Regional line legend for barCharts
function fn_appendRegionalLine() {
  var regionalLine = d3.select("#barChartLegend").select("svg")
                       .append("g");

  regionalLine.selectAll("line")
      .data([0])
      .enter().append("line")
      .attr("class", "line")
      .style("stroke", "black")
      .style("opacity", 0.7)
      .style("stroke-width", "1.5px")
      .attr("x1", 417)
      .attr("y1", 12)
      .attr("x2", 440)
      .attr("y2", 12);

  regionalLine.append("text")
    .attr("class", "textLabels")
    .attr("dx", 340)
    .attr("dy", 15)
    .text("regional mean")
    .style("font-size", "11px")
    .style("fill","#565656")
    .style("stroke", "none");


}

//Append regional means as lines to barCharts
function fn_appendRegionalMeans(svg, geogroup_name, this_dim, data, x, y) {
  //data to plot
  var regionalVar = [];
  regionalVar[0] = this_dim === "per capita" ? 
                    regionalAvgs[geogroup_name] : regionalAvgs_GDP[geogroup_name];

  //city at x-axis endpts of horizontal line
  var x1_city = data[0].city;
  var x2_city = data[data.length - 1].city;

  //Tooltip for lines  
  var tool_tip = d3.tip()
    .attr("class", "d3-tip-line")
    .offset([-10, 0])
    .html(function (d, i) {
      console.log("this_dim: ", this_dim)
      console.log("this_dim u: ", dimUnits[this_dim])
      return (this_dim === "per capita" ? regionalVar : formatDecimalk(regionalVar[0]) )
             + " " + dimUnits[this_dim];
    });
  svg.call(tool_tip);

  //append line for regional mean
  svg.append("g").selectAll("line")
    .data(regionalVar)
    .enter().append("line")
    .attr("class", "line")
    .style("stroke", "#555")
    .style("stroke-width", "2px")
    .attr("x1", function (d, i) { return x(x1_city); })
    .attr("y1", function (d, i) { return y(d); })
    .attr("x2", function (d, i) { return x(x2_city); })
    .attr("y2", function (d, i) { return y(d); });

  //make an invisible fat line and use for tooltip so that
  //user does not have to position mouse over thin regional line
  //with surgical precision
  svg.append("g").selectAll("line")
    .data(regionalVar)
    .enter().append("line")
    .attr("class", "line")
    .style("stroke", "#555")
    .style("stroke-width", "6px")
    .style("opacity", 0)
    .attr("x1", function (d, i) { return x(x1_city); })
    .attr("y1", function (d, i) { return y(d); })
    .attr("x2", function (d, i) { return x(x2_city); })
    .attr("y2", function (d, i) { return y(d); })
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide); 
}

function fn_arrow() {

  //define arrow name and path
  var data = [
  { id: 1, name: 'arrow', path: "M 2,2 L2,11 L10,6 L2,2" }
  ];

  margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = 150 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;


  svg = d3.select("#barChart_EUCWLatAmerAfrica").select(".barSVG")
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .attr("transform", "translate(" + -56 + "," + -10 + ")"); //posn of arrow and text

  var defs = svg.append('svg:defs')

  var paths = svg.append('svg:g')
    .attr('id', 'markers')
    .attr('transform', 'translate(' + 42 + ',' + 63 + ')');

  //http://tutorials.jenkov.com/svg/marker-element.html
  var marker = defs.selectAll('marker')
    .data(data)
    .enter()
    .append('svg:marker')
      .attr('id', function(d){ return 'marker_' + d.name})
      .attr('markerHeight', 13)
      .attr('markerWidth', 13)
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto')
      .attr('refX', 2)
      .attr('refY', 6)
      .append('svg:path')
        .attr('d', function(d){ return d.path; })
        .attr('fill', function(d,i) { return "#565656"; });

  var path = paths.selectAll('path')
    .data(data)
    .enter()
    .append('svg:path')
      .attr('d', function(d,i){
        return 'M 100,' + 0 + ' V ' + 50 + ',' + 0 + ''
      })
      .attr('stroke', function(d,i) { return "#565656"; })
      .attr('stroke-width', 1)
      .attr('stroke-linecap', 'round')
      .attr('marker-start', function(d,i){ return 'url(#marker_stub' + ')'; })
      .attr('marker-end', function(d,i){ return 'url(#marker_arrow'   + ')'; })
      .attr("transform", function (d) { //adjust arrow proportions
        var xscale = 0.5, yscale = 0.8;         
        return "scale(" + xscale + " " + yscale + ")";          
      })
      .append('svg:path')
        .attr('d', function(d){ return d.path; });

  // var rotterdamText = d3.select("#markers").append("text");
  d3.select("#markers").append("text");
  d3.select("#markers").select("text")
    .text(rotterdamEmissionsPerCap + " " + "tCO2/cap")
    .style("fill", "#565656")
    .attr("transform", function (d) { //adjust arrow proportions
        var xscale = 0.5, yscale = 1.9;         
        
        return "scale(" + xscale + " " + yscale + ")" + 
              "translate(" + 109 + " " + 10 + ")" ;       
      });
}

function fn_svgHeadings (geogroup_id) {

  if (geogroup_id === "#barChart_EUCWLatAmerAfrica") {
    numHeadings = ["Europe","Canada", "Australia - NZ", "Latin Amer", "Africa"];
    svgTrans = [ [-33, 0], [256, 0], [340, 0], [407, 0], [575, 0] ];
  } else {
    numHeadings = ["USA", "Asia"];
    svgTrans = [ [-33, -55], [481, -55] ];
  }

  for (idx = 0; idx < numHeadings.length; idx++) {
    var svgTitle = d3.select(geogroup_id).select(".barSVG")
            .append("g").append("svg")
            .attr('width', 120)
            .attr('height', 50)
            .attr("transform", function () {
              transx = svgTrans[idx][0];
              transy = svgTrans[idx][1];
              return "translate(" + transx + "," + transy + ")";
            })
            .append("text").attr("class", "headingClass");

    svgTitle.text(numHeadings[idx])
      .attr("transform", function (d) { //adjust arrow proportions
          var xscale = 0.5, yscale = 1.9;
          
          return "scale(" + xscale + " " + yscale + ")" + 
                "translate(" + 109 + " " + 18 + ")" ;
        });
  }
}