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
      "Scope1/capita": scope1_cap,
      "Scope1/GDP-PPP": scope1_gdp,
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
//Create colour bar boxes
function create_colourBar() {
  console.log("create colourBar")

  //Make colourbar rects
  var width_cb = 100, height_cb = 24;

  //Define the colourbar svg
  var aspectRatio = '160:50';
  var viewBox = '0 0 ' + aspectRatio.split(':').join(' ');
  console.log("viewBox: ", viewBox)

  var svgCB = d3.select("#barChartLegend").select("svg")
    // .attr("width", width_cb)
    // .attr("height", height_cb);
    .attr('width', '100%')
    .attr('height', height_cb)
    .attr('viewBox', viewBox)
    .attr('viewBox', '0 0 660 94' )
    .style("vertical-align", "middle");

  //Object.keys(colour_methodNum).length
  var cb_values = ["#75766D", "#9ADCB9", "#DCCDA1", "#FFC7AF", "#F7D76F"];
  var texts = ['a', 'b', 'c', 'd', 'e'];

  var rects = svgCB.selectAll('rect')
              .data(cb_values)
              .enter()
              .append('g');

  var rectAttributes = rects.append("rect")
                  .attr("width", 80)
                  .attr("height", 80)
                  .attr("y", 5)
                  .attr("x", function (d, i) {
                    return -620 + i * 295;
                  })
                  .attr("fill", function (d, i) {
                    return cb_values[i];
                  });

  rects.append("text")
        .text(function (d, i) {          
          return protocol[i];
        })
        .attr("y", 10)
        .attr("x", function (d, i) {
          //customize x-posn depending on label
          if (i === 2) return -51;
          else if (i === 3) return 65;
          else if (i === 4) return 184;
          else return -283 + i * 90;
        })
        .attr("dy", "12px")
        .style("stroke","#9a9a9a")
        .attr("transform", function (d) {
          var xscale = 2.5;
          var yscale = 2.5;

          return "scale(" + xscale + " " + yscale + ")";

        });
        
                    
                           

}

//Abbreviate city name in x-axis
function fn_abbr(d) {
  if (d.indexOf(', ') >= 0) abbr = d.substring(0,3);
  else if (d.indexOf(' ') >= 0) abbr = d.match(/\b\w/g).join(' ');
  else abbr = d.substring(0,3);

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
  var var_emissionsPerCap = "Scope1/capita";
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