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
    cityLocation = [ +d['lon (external)'] -360, +d['lat (external)']]
    country = d.country
    popn = +d['pop to use']
    area = d['area [km2] (external)']
    totalEmissions = d['Total City-wide Emissions (metric tonnes CO2e) (CDP)'] //[tCO2]
    scope1 = d['s1 to use']
    GDP = d['GDP-PPP combined'] //units of $BN USD
    // GDP = d['GDP-PPP combined [USD]'] //units of USD
    scope1_cap = +d['s1 per capita'] //d['s1 per capita']  //scope1/popn
    scope1_gdp = +d['s1 per gdp [kgCO2/USD]']
    GDP_cap = d["GDP-PPP combined"]/d["pop to use"]*Math.pow(10,9)  //+d['GDP-PPP combined/cap']
    pop_density = popn/area//[pop/km2]
    HDD155C = +d["HDD_15.5C"]
    CDD23C = +d["CDD_23C"]
    diesel_price = d["diesel_price (2014)"]//+d.diesel_price
    gas_price = +d["gasoline_price (2014)"]//+d.gasoline_price
    HH = +d["household_size (updated)"]
    methodology_num = +d['MethodNum'] //1-5 for 5 protocols in total
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
      "GDP/capita": GDP_cap,
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
    .style("stroke", "none");


  //clear previously highlighted country
  d3.selectAll(".countries").selectAll("path")
    .style("stroke","#555")
    .style("stroke-width", 1)
    .style("fill", "#2b292e")
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
// barChart updates

function fn_colour_barChart (attrFlag, attrValue) {
  //console.log("fn_colour_barChart")
  
  if (attrFlag === "methodology") {//integers from 1-5, no mapping needed
    return colour_methodNum[attrValue];
  
  } else {
     
    colourmapDim = fn_colourmapDim(attrFlag);

    return attrValue === 0 ? "#E6E8E3" : colourmapDim(attrValue);
  } 
}
function fn_colourmapDim (attrFlag) {
  //console.log("fn_colourmapDim")
  dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];

  //colour map to take data value and map it to the colour of the level bin it belongs to
  colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
            .domain([dimExtent[0], dimExtent[1]])
            .range(choose_colourArray[attrFlag]);

  return colourmapDim;
}
function fn_updateLegend (attrFlag) {
  console.log("fn_updateLegend")
  if (attrFlag != "methodology") {  
    dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];
    //difference between max and min values of selected attribute
    delta = ( dimExtent[1] - dimExtent[0] )/num_levels;
    
    console.log("delta: ", delta)
    console.log("dimExtent: ", dimExtent)

    cb_values=[]; //clear
    for (idx=0; idx < num_levels; idx++) {
      if (attrFlag === "diesel price" || attrFlag === "gas price") {        
        cb_values.push(dimExtent[0] + idx*delta);
      }
      else {
        delta = Math.round(delta/1000)*1000;
        cb_values.push(Math.round((dimExtent[0] + idx*delta)/1000)*1000);
      }
      //Math.round(value/1000)*1000
    }
    console.log("cb_values: ", cb_values)

    //colour map to take data value and map it to the colour of the level bin it belongs to
    var colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
              .domain([dimExtent[0], dimExtent[1]])
              .range(choose_colourArray[attrFlag]);
  }

   //svg crated in fn_barChartLegend()
  var svgCB = d3.select("#barChartLegend").select("svg");

  //tooltip for rects  
  var tool_tip = d3.tip()
      .attr("class", function () {
        if (attrFlag === "population density" || attrFlag === "GDP/capita") {
          return "d3-tip-deactive";
        }
        else return "d3-tip";
      })
      .offset([-10, 0])
      .html(function (d, i) {
        if (attrFlag === "population density" || attrFlag === "GDP/capita") {return "";}
        else {
          return "<b>" + Object.keys(protocolDict)[i] + "</b>" + ": "
                     + Object.values(protocolDict)[i];
        }
      });
  svgCB.call(tool_tip);

  //Colour legend squares
  d3.select("#barChartLegend").select("svg")
    .selectAll('rect')
    .attr("fill", function (i, j) {
      //colourmapDim(cb_values[j]);
      return choose_colourArray[attrFlag][j];
    })
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide);


  //label the legend squares
  d3.select("#barChartLegend")
    .selectAll("text")
    .text(function (i, j) {
      if (attrFlag === "methodology") {
        updateText = choose_textArray[attrFlag][j]
    } else {
      console.log("cb_values format: ", formatComma(cb_values[j]) )

      if (attrFlag === "diesel price" || attrFlag === "gas price") {
        firstValue = cb_values[1];
        nextValues = cb_values[j];
      } else {
        firstValue = formatDecimalk(cb_values[1]);
        nextValues = formatDecimalk(cb_values[j]);
      }

      if (j === 0) updateText = "< " + firstValue;
      else updateText = "> " + nextValues;      
    }
      return updateText;
    })
    .attr("x", function (d, i) {
      if (attrFlag === "methodology") xpos = [10,63,150,215,284];
      else if (attrFlag === "population density") xpos = [4,75,147,217,288];
      else if (attrFlag === "GDP/capita") xpos = [7,77,146,216,281];
       else if (attrFlag === "diesel price" || attrFlag === "gas price") xpos = [4,75,145,215,285];
      else xpos = [4,75,145,215,285];
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
  
  d3.select("#tick" + idName).text(cityName)
    .style("font-size", newSize).style("opacity", 1)
    .attr("fill", colour_labelsHighlight);
}

function fn_cityLabels_perCapita (d, i, thisCityGroup) {
  if (thisCityGroup === "bar class_groupUSA") {    
    if (d === "Cleveland" || d === "Las Vegas") {
      xtrans = 60; ytrans = -5; rot = -90;
    }
    else if (d === "Savannah") ytrans = -75;
    else if (d === "Emeryville, CA" || d === "Knoxville") ytrans = -45 + (i*1.3);
    else ytrans = -35 + (i*1.1);
  } else if (thisCityGroup === "bar class_groupAsia") {    

    if (d === "Incheon") {
      // ytrans = -110;
      xtrans = 60; ytrans = -5; rot = -90;
    }
    else if (d === "Kaohsiung") ytrans = -70;
    else if (d === "Yilan") ytrans = -65;
    else if (d === "Taoyuan") ytrans = -25;
    else if (d === "Hong Kong") ytrans = 0;
    else ytrans = -49 + (i*1.1);

  } else if (thisCityGroup === "bar class_groupEurope") {
                       
    if (d === "Rotterdam") {// || d === "Ljubljana") {
      xtrans = 60; ytrans = 20; rot = -90;
    }
    else ytrans = -30 + (i*1.9);

  } else if (thisCityGroup === "bar class_groupCan") {
    if (d === "Hamilton, ON" || d === "Windsor, ON" || d === "Edmonton") {
      xtrans = 60; ytrans = 0; rot = -90;
    }
    else if (d === "Vancouver") ytrans = -10;
    else if (d === "North Vancouver") ytrans = 5;
    else if (d === "Ajax") ytrans = 30;
    else ytrans = -120 + (i*1.9);

  } else if (thisCityGroup === "bar class_groupOceania") {
    if (d === "Auckland") ytrans = -29;
    else ytrans = -130 + (i*2.3);
    
  } else if (thisCityGroup === "bar class_groupLatinAmer") {
    if (d === "Buenos Aires") ytrans = -15;
    else ytrans = -110 + (i*1.9);
    
  } else if (thisCityGroup === "bar class_groupAfrica") ytrans = -160 + (i*2.2);
}

function fn_cityLabels_perGDP (d, i, thisCityGroup) {
  // thisRegion = data_GHG.find(x => x.city.includes(d)).region;

  if (thisCityGroup === "bar class_groupUSA") {
    if (d === "Las Vegas") {rot = -90; xtrans = 60; ytrans = -15;}
    else if (d === "D C" || d === "Nashville & Davidson" || d === "Cleveland") ytrans = -40 + (i*1.6);
    else ytrans = -29 + (i*1.2);
  } else if (thisCityGroup === "bar class_groupAsia") {
    if (d === "Kaohsiung" || d === "Taoyuan") {
      xtrans = 60; ytrans = -5; rot = -90;
    }  else if (d === "Taoyuan") {rot = -65; ytrans = -25;}
    else if (d === "Hong Kong") ytrans = -75;
    else if (d === "Incheon") ytrans = -35;
    else ytrans = -75 + (i*1.5);

  } else if (thisCityGroup === "bar class_groupEurope") {          
      if (d === "Manchester") ytrans = -20;
      else if (d === "Warsaw" || d === "Rotterdam") ytrans = 0;
      else ytrans = 20 + (i*0.7);

  } else if (thisCityGroup === "bar class_groupCan") {
      if (d === "Winnipeg") ytrans = -175 + (i*3.7);
      else if (d === "Edmonton" || d === "Calgary") ytrans = -185 + (i*4.3);
      else if (d === "Vancouver") {console.log("Vancouver"); ytrans = 0;}
      else ytrans = -170 + (i*4.3);

  } else if (thisCityGroup === "bar class_groupOceania") {
      if (d === "Auckland") ytrans = -50;
      else ytrans = -175 + (i*3.9);
  } else if (thisCityGroup === "bar class_groupLatinAmer") {
      if (d === "Caracas") {xtrans = 60; ytrans = -5; rot = -90;}
      else if (d === "Santiago") ytrans = -36;
      else ytrans = -135 + (i*2.2);
    
  } else if (thisCityGroup === "bar class_groupAfrica") {//ytrans = -160 + (i*2.2);
      // xtrans = 60; ytrans = 15; rot = -90;
      ytrans = -340 + (i*4.2);
    }
}

//...............................
// create barChart SVGs

//Create colour bar boxes
function fn_barChartLegend() {
  
  //setup params
  var margin = {top: 7, right: 0, bottom: 0, left: 20};
  var svg_width = 450 - margin.left - margin.right,
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
                    return 41 + i * 70;
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
           .append("g")
           .attr('height', height + margin.top + margin.bottom)
          .attr("transform", "translate(" + -56 + "," + -25 + ")") //posn of arrow and text
           .append("svg")
          .attr('width', width + margin.left + margin.right);
          

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
    .text(rotterdamEmissionsPerCap + " " + "tCO₂/cap")
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
    svgTrans = [ [64, 10], [623, 10], [791, 10], [925, 10], [1259, 10] ];
  } else {
    numHeadings = ["USA", "Asia"];
    svgTrans = [ [64, 15], [1069, 15] ]; //y=22?
  }


  var svgTitle = d3.select(geogroup_id).select(".barSVG")
          .append("g")
          .attr("transform", function () {
            transx = 0;
            transy = (geogroup_id === "#barChart_EUCWLatAmerAfrica") ? 0 : -30;
            return "translate(" + transx + "," + transy + ")";
          });

  svgTitle.append("svg")
          .attr('width', 700)
          .attr('height', 100);

  for (idx = 0; idx < numHeadings.length; idx++) {
    svgTitle.append("g")
      .append("text").attr("class", "headingClass")
      .text(numHeadings[idx])
      .attr("transform", function (d) {
          var xscale = 0.5, yscale = 1.9;
          
          return "scale(" + xscale + " " + yscale + ")" + 
                "translate(" + svgTrans[idx][0] + " " + svgTrans[idx][1] + ")" ;
        });
  }
}

//----------------------------------------------
// Functions for city card info
//----------------------------------------------

//Info text in svg
function fn_svgCityCard (selectedCity, attrFlag) {
  // console.log("selectedCity in fn: ", selectedCity)
  // console.log("attrFlag in fn: ", attrFlag)
  
  
  //display city card to the left of the map
  var svgCityCard = d3.select("#map").select("svg")
          .append("g").attr("id", "cityCardg")
          .attr("transform", function () {
            transx = 0;
            transy = 0;
            return "translate(" + transx + "," + transy + ")";
          });

  svgCityCard
    .attr("transform", function (d) {
        var xscale = 1, yscale = 1.0, transx = 15, transy = 20;
        
        return "scale(" + xscale + " " + yscale + ")" + 
              "translate(" + transx + " " + transy + ")" ;
      });
    
  svgCityCard.append("rect")
    .attr("width", 175)             //="142" height="31"
    .attr("height", 250) //31
    .attr("x", -15)
    .attr("y", -20)
    .attr("fill", "#4c87b5")
    .attr("stroke", "none");

  //city name
  svgCityCard.append("text").attr("class", "cityCardName")
    .text(selectedCity.city);

  var delta = 50; //amount to translate in y-dirn
  var transx = 2;
  svgCityCard.append("text")
    .attr("transform", function (d) {
        var transy = 16;
        return "translate(" + transx + " " + transy + ")" ;
      })
    .attr("class", "cityCardSubrowInfo")
    .text(selectedCity["country"]);

  //city info sub-row: Emissions
  svgCityCard.append("text")
    .attr("transform", function (d) {
        var transy = 40;
        return "translate(" + transx + " " + transy + ")" ;
      })
    .attr("class", "cityCardSubrowTitle")
    .text("Emissions:");

  svgCityCard.append("text")
    .attr("transform", function (d) {
        var transy = 55;
        return "translate(" + transx + " " + transy + ")" ;
      })
    .attr("class", "cityCardSubrowInfo")
    .text(formatComma(parseInt(selectedCity["Scope1"]/1000)) + " MtCO₂");

   //city info sub-row: Emissions Change
  svgCityCard.append("text")
    .attr("transform", function (d) {
        var transy = 40 + delta;
        return "translate(" + transx + " " + transy + ")" ;
      })
    .attr("class", "cityCardSubrowTitle")
    .text("Emissions Change:");

  svgCityCard.append("text")
    .attr("transform", function (d) {
        var transy = 40 + delta + 15;
        return "translate(" + transx + " " + transy + ")" ;
      })
    .attr("class", "cityCardSubrowInfo")
    .text(function () {
      if (selectedCity.city === "Albany") return "Not measured";
     else if (selectedCity.city === "Lancaster" ||
        selectedCity.city === "Boulder"
      || selectedCity.city === "San Francisco" || selectedCity.city === "Vancouver"
      || selectedCity.city === "North Vancouver") return "N/A";
      else if (selectedCity["change in emissions"] === "") return "N/A";
    else if (selectedCity["change in emissions"] === "Other") return "N/A";
    else if (selectedCity["change in emissions"] === "This is our first year of calculation") {
      return "First year of calculation";
      }
      else return selectedCity["change in emissions"];
    });

  //city info sub-row: Protocol
  var protocolNum = selectedCity["methodology"];
  svgCityCard.append("text")
    .attr("transform", function (d) {
        var transy = 40 + 2*delta;
        return "translate(" + transx + " " + transy + ")" ;
      })
    .attr("class", "cityCardSubrowTitle")
    .text("Protocol:");

  svgCityCard.append("text")
    .attr("transform", function (d) {
        var transy = 40 + 2*delta + 15;
        return "translate(" + transx + " " + transy + ")" ;
      })
    .attr("class", "cityCardSubrowInfo")
    .text(choose_textArray["methodology"][protocolNum - 1]);
    
  //city info sub-row: attribute selected in dropdown menu
  if (attrFlag != "methodology") { //methodology already on display
    var protocolNum = selectedCity["methodology"];
    svgCityCard.append("text")
      .attr("transform", function (d) {
          var transy = 40 + 3*delta;
          return "translate(" + transx + " " + transy + ")" ;
        })
      .attr("class", "cityCardSubrowTitle")
      .text(attrFlag + ":");

    if (attrFlag === "diesel price" || attrFlag === "gas price") attrText = selectedCity[attrFlag];
    else attrText = formatComma(parseInt(selectedCity[attrFlag]));
    svgCityCard.append("text")
      .attr("transform", function (d) {
          var transy = 40 + 3*delta + 15;
          return "translate(" + transx + " " + transy + ")" ;
        })
      .attr("class", "cityCardSubrowInfo")
      // .text(formatComma(parseInt(selectedCity[attrFlag])) + " " + dimUnits[attrFlag]);
      .text(attrText + " " + dimUnits[attrFlag]);
  }
}