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
    cityLocationString = d.City_location
    cityLocation = [parseFloat(cityLocationString.split("(")[1].split(",")[0]), 
                    parseFloat(cityLocationString.split("(")[1].split(",")[1])]
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
    // lat = parseFloat(cityLocationString.split("(")[1].split(",")[0])
   
    return {      
      "city": city,
      "idName": idName,
      "country": country,
      "region": GCA_region,
      "cityLocation": cityLocation,
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