var formatDecimalSci = d3.format(".3n");
var formatDecimalk = d3.format(".2s"); //.2s //d3.format(".3n");
var formatComma = d3.format(",");

//------------------------------------------------
//Technical labels
label_dataPerCap = "per capita";
label_dataPerGDP = "per GDP";

//------------------------------------------------
//Variables to pass
var attrFlag = "methodology"; //attribute to be used to fill barChart bars. Default "Protocol"
var cityOrder_row1, cityOrder_row2; //save orignal city order
//------------------------------------------------
//COLOURS
//barChart labels + highlight colour
var colour_labels = "#636363";
var colour_labelsHighlight = "#3d3d3d";

var regionColourMap = { 
  "groupEurope": "#6BACBF", //"#A6D4FF", 
  "groupUSA": "#C399D9", "groupCan": "green", 
  "groupOceania": "#EB9F9F",
  "groupAfrica": "#FFD880", "groupAsia": "#BD1550",
  "groupLatinAmer": "#F8CA00"
};

//Primary Methodology colours
//http://www.colourlovers.com/palette/1107950/Indecent_Proposal
//http://www.colourlovers.com/palette/1217220/Ice_Cream_Party
//http://www.colourlovers.com/palette/1645043/Vanilla_Blueberry
//http://www.colourlovers.com/palette/2832327/nostalgia
var colour_methodNum = {
  1: "#9DD3DF", //GPC 
  2: "#C3BBE2", //US ICLEI
  3: "#E35B5D", //IPCC
  4: "#EB9F9F", //ICLEI
  5: "#F18052" //OTHER
}

var dimExtentDict = {}; //for discretizing attribute value according to range extent
var num_levels = 5; //number of discrete levels
var cb_values = [];

var choose_colourArray = {
  "methodology": ["#9DD3DF","#C3BBE2","#E35B5D","#EB9F9F","#F18052"],
  "population density": ["#DED8B6","#F9C869","#5D5061","#2F274C","#6A3058"],
  "GDP/capita": ["#E6D8CB","#E394A7","#9e9ac8","#756bb1","#54278f"],
  "diesel price": ["#F1F2C4","#F2EA72","#fec44f","#CDAF7B","#634414"],
  "gas price": ["#F1F2C4","#F2EA72","#fec44f","#CDAF7B","#634414"],
  "HDD 15.5C": ["#e3dded", "#c8bcdc","#74a9cf","#26ADE4","#034e7b"],
  "CDD 23C": ["#E1F5C4", "#ffeda0","#F9D423","#FC913A","#FF4E50"],
  "area": ["#EDDAD0","#D5DED9","#99B2B7","#8DA597","#948C75"],
  "low BUA (2014)": ["#d7b5d8","#CD7CB7","#885F9A","#B65873","#5F323F"],
  "high BUA (2014)": ["#EEDAA7","#E6D472","#E79C74","#D45659","#7D4755"]
  
}

var choose_textArray = {
  "methodology": ["GPC","US ICLEI","IPCC","ICLEI","Other"]
  // "population density": [10,22,33,44,55]
}

//------------------------------------------------
//TOOLTIP TEXT
var protocolDict = {
  "GPC": "Global Protocol for Community-Scale Greenhouse Gas Emissions Inventories (GPC), (WRI, C40 and ICLEI)",
  "US ICLEI": "U.S. Community Protocol for Accounting and Reporting of Greenhouse Gas Emissions (ICLEI)",
  "IPCC": "2006 IPCC Guidelines for National Greenhouse Gas Inventories",
  "ICLEI": "International Emissions Analysis Protocol (ICLEI)",
  "Other": "Combinations or subsets of methodologies, or propitiatory methodologies specific to a region/city"
}

var emissionsToggleDict = {
  "per GDP": "Display emissions <b>per unit GDP</b>, in decreasing order.",
  "per capita": "Display emissions <b>per capita</b>, in decreasing order."
}

//------------------------------------------------
//Variables to store data
var rotterdamEmissionsPerCap; //acutal Scope1 Emissions/cap for Rotterdam

//AVG REGIONAL EMISSIONS PER CAPITA
//TO BE VERIFIED! AVGS TAKEN FROM GCA WEBSITE
var regionalAvgs = {
  "groupUSA": 13.1,
  "groupCan": 13.1,
  "groupOceania": 11,
  "groupEurope": 7.5,
  "groupAfrica": 1.2, //***made up for now!!!***
  "groupAsia": 4, //***made up for now!!!***
  "groupLatinAmer": 2.4
}

var regionalAvgs_GDP = {
  "groupUSA": 38000,
  "groupCan": 38000,
  "groupOceania": 30000,
  "groupEurope": 30000,
  "groupAfrica": 10000,
  "groupAsia": 40000,
  "groupLatinAmer": 30000
}

//------------------------------------------------
//FOR DISPLAY TEXTS
var regionLabel_dict = {
  "groupEurope": "Europe", "groupUSA": "USA", "groupCan": "Can",
  "groupOceania": "Aus/NZ",
  "groupAfrica": "Africa", "groupAsia": "Asia", 
  "groupLatinAmer": "Latin America"
};

var dimUnits =  {
  "methodology": "",
  "total emissions": "[tCO₂]",
  "per capita": "[tCO₂/capita]",
  "per GDP": "[kgCO₂/USD]",
  "population": "capita",
  "population density": "per km2",
  "GDP/capita": "(PPP) [$BN/capita]",
  "area": "km2",
  "diesel price": "USD",
  "gas price": "USD",
  "HDD 15.5C": "[deg C x days]",
  "CDD 23C": "[deg C x days]",
  "low BUA (2014)": "km2",
  "high BUA (2014)": "km2",
  "low BUA % (2014)": "%",
  "high BUA % (2014)": "%",
  "low BUA density (2014)": "pop/km2",
  "high BUA density (2014)": "pop/km2",
  "household size": "",
  "region": "",
  "country": ""
}

//x-Scale factors for barChart y-axis tick labels
var xScaleFactor = {
  "#barChart_EU": 2.5, "#barChart_LatinAmer": 3,
  "#barChart_USA": 2.0, "#barChart_Can": 1.2,
  "#barChart_Oceania": 4.0, 
  "#barChart_Africa": 6, "#barChart_Asia": 3.5
}

 