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
// Functions for emissionsBarChart()
//----------------------------------------------
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
//Create colour bar boxes
function fn_appendColourBar() {
  var margin = {top: 7, right: 0, bottom: 0, left: 0};
  var svg_width = 450 - margin.left - margin.right,
      svg_height = 35 - margin.top - margin.bottom;

  // var svg_width = 450, svg_height = 35;

  //Make colourbar rects
  var rect_dim = 15;

    var svgCB = d3.select("#barChartLegend").select("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .style("vertical-align", "middle");

  // Tooltip for rects  
  var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function (d, i) {
      return "<b>" + Object.keys(protocolDict)[i] + "</b>" + ": "
                   + Object.values(protocolDict)[i];
    });
  svgCB.call(tool_tip);

 
  var rects = svgCB.selectAll('rect')
              .data(Object.values(colour_methodNum))
              .enter()
              .append('g');

  var rectAttributes = rects.append("rect")
                  .attr("width", rect_dim)
                  .attr("height", rect_dim)
                  .attr("y", 5)
                  .attr("x", function (d, i) {
                    return 28 + i * 80;
                  })
                  .attr("fill", function (d, i) {
                    return colour_methodNum[i + 1];
                  })
                  .on('mouseover', tool_tip.show)
                  .on('mouseout', tool_tip.hide);

  rects.append("text")
        .text(function (d, i) {
          return Object.keys(protocolDict)[i];
        })
        .attr("y", 10)
        .attr("x", function (d, i) {
          var xpos = [0,62,159,237,313];
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
      .style("stroke-width", "6px")
      .attr("x1", 1020)
      .attr("y1", 40)
      .attr("x2", 1283)
      .attr("y2", 40);

  regionalLine.append("text")
    .attr("class", "textLabels")
    .attr("dx", 223)
    .attr("dy", 15)
    .text("regional mean")
    .attr("transform", function (d) {
      var xscale = 3.2;
      var yscale = 3.2;
      return "scale(" + xscale + " " + yscale + ")";
    });


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

//Abbreviate city name in x-axis
function fn_abbr(d) {
  if (d.indexOf(', ') >= 0) abbr = d.substring(0,3);
  else if (d.indexOf(' ') >= 0) abbr = d.match(/\b\w/g).join(' ');
  else abbr = d.substring(0,4);

  return abbr;
}

function sortByRegion(region, this_dim) {

  ghg_byRegion = [];
  data_GHG.forEach(function (d) {
    if (d.region === region && d[this_dim] != "") ghg_byRegion.push(d);
  });
  return ghg_byRegion;
}

function fn_reorderByEmissionsPerCapita(region, emissions_perGDP) {
  var var_emissionsPerCap = label_dataPerCap;
  var city_order = [];
  var objArray = [];

  //Get city order of emissions per capita
  emissions_perCap = sortByRegion(region, var_emissionsPerCap);
  emissions_perCap.sort((a, b) => d3.descending(a[var_emissionsPerCap], b[var_emissionsPerCap]));
  city_order = emissions_perCap.map(x => x["city"]); //returns an array

  //Re-order emissions_perGDP according to city_order of emissions per capita
  for (idx = 0; idx < city_order.length; idx++) {
    match = emissions_perGDP.filter(x => x.city === city_order[idx]); //in array form
    if (match.length != 0) objArray.push(match[0]);
  }

  return objArray;
}

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