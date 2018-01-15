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
    region = d['Geographic group'] //Global Carbon Atlas regions
    cityLocation = [+d['lat (external)'], +d['lon (external)']]
    country = d.country
    popn = +d['pop to use']
    area = +d['area [km2] (external)']
    totalEmissions = +d['Total City-wide Emissions (metric tonnes CO2e) (CDP)'] //[tCO2]
    scope1 = +d['Total Scope 1 Emissions (metric tonnes CO2e) (CDP)']
    scope1_cap = d.scope1/popn
    scope1_GDP = scope1_cap/GDP_cap
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
      "GHG total": GHG_total,
      "population": popn,
      "population density": pop_density,
      "GDP/capita": GDP_cap,
      "GHG/capita": GHG_cap,
      "GHG/GDP": GHG_GDP,
      "diesel price": diesel_price,
      "gas price": gas_price,
      "HDD 15.5C": HDD155C,
      "CDD 23C": CDD23C,
      "household size": HH,
      "delta_emissions": delta_emissions,
      "delta_emissions_reason": delta_emissions_reason
    };
  })
  // console.log("data_GHG", data_GHG)

} // ./setupData()




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

  //reset opacity of world cites and map
  d3.selectAll(".worldcity").style("fill-opacity", 1)
    .style("stroke-opacity", 1);
  d3.selectAll(".countries").selectAll("path").style("opacity", 1) ;
  d3.selectAll(".worldcity")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 1);   
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