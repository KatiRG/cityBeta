var formatDecimalSci = d3.format(".2n");
var formatDecimalk = d3.format(".1s"); //.2s //d3.format(".3n");

//------------------------------------------------
//Technical labels
label_dataPerCap = "per capita";
label_dataPerGDP = "per GDP";

//------------------------------------------------
//COLOURS
//barChart labels + highlight colour
var colour_labels = "#636363";
var colour_labelsHighlight = "#3d3d3d";

var regionColourMap = { 
  "groupEurope": "#6BACBF", //"#A6D4FF", 
  "groupNAmer": "#C399D9", "groupOceania": "#555",
  "groupAfrica": "#BD1550", "groupAsia": "red",
  "groupLatinAmer": "#F8CA00"
};

//Primary Methodology colours
//http://www.colourlovers.com/palette/1107950/Indecent_Proposal
//http://www.colourlovers.com/palette/1217220/Ice_Cream_Party
//http://www.colourlovers.com/palette/1645043/Vanilla_Blueberry
//http://www.colourlovers.com/palette/2832327/nostalgia
var colour_methodNum = {
  1: "#FFA446", //GPC 
  2: "#FFEAB3", //US ICLEI
  3: "#E35B5D", //IPCC
  4: "#EB9F9F", //ICLEI
  5: "#F18052" //OTHER
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
//AVG REGIONAL EMISSIONS PER CAPITA
//TO BE VERIFIED! AVGS TAKEN FROM GCA WEBSITE
var regionalAvgs = {
  "groupNAmer": 13.1,
  "groupOceania": 11,
  "groupEurope": 7.5,
  "groupAfrica": 1.2, //***made up for now!!!***
  "groupAsia": 4, //***made up for now!!!***
  "groupLatinAmer": 2.4
}

var regionalAvgs_GDP = {
  "groupNAmer": 38000,
  "groupOceania": 30000,
  "groupEurope": 30000,
  "groupAfrica": 10000,
  "groupAsia": 40000,
  "groupLatinAmer": 30000
}

//------------------------------------------------
//FOR DISPLAY TEXTS
var regionLabel_dict = {
  "groupEurope": "Europe", "groupNAmer": "USA/Can",
  "groupOceania": "Aus/NZ",
  "groupAfrica": "Africa", "groupAsia": "Asia", 
  "groupLatinAmer": "Latin America"
};

var dimUnits =  {
  "total emissions": "[tCO2]",
  "per capita": "[tCO2/capita]",
  "per GDP": "[kgCO2/USD]",
  "population": "",
  "population density": "",
  "GDP-PPP/capita": "(PPP) [USD/capita]",
  "diesel price": "USD",
  "gas price": "USD",
  "HDD 15.5C": "[deg C x days]",
  "CDD 23C": "[deg C x days]",
  "household size": "",
  "region": "",
  "country": ""
}

// Geographic groups
var latinAmer = ["Bogotá", "Mexico City", "Rio de Janeiro", "Sao Paulo", "Brasília",
                "Curitiba"];

//American-Aus-NZ cities
var usaAusNZ = ["Phoenix", "Austin", "Houston",
                      "Los Angeles", "Brisbane", "Sydney", "Wellington", "Perth",
                      "San Diego", "Melbourne", "Atlanta", "Washington", "San Francisco",
                      "Chicago", "Vancouver", "Portland, OR", "Seattle", "New York City",
                      "Moscow", "Montreal", "Toronto", "Denver", "Boulder",
                      "Ottawa", "Fort Collins", "Minneapolis", "Calgary"];

//x-Scale factors for barChart y-axis tick labels
var xScaleFactor = {
  "#barChart_EU": 2, "#barChart_LatinAmer": 3,
  "#barChart_NAmer": 1.2, "#barChart_Oceania": 4.2, 
  "#barChart_Africa": 5.5, "#barChart_Asia": 2.5  
}

 var europe = ["Amsterdam", "Athens", "Barcelona", "Barnsley, Doncaster and Rotherham", 
"Bath and North East Somerset, North Somerset and South Gloucestershire", "Bedfordshire CC", "Belfast", 
"Berkshire", "Berlin", "Birmingham", "Blackburn with Darwen",
"Bournemouth", "Bradford", "Bremen", "Bridgend and Neath Port Talbot", 
"Brighton and Hove", "Bristol, City of", "Brussels", "Buckinghamshire CC", 
"Calderdale, Kirklees and Wakefield", "Cambridgeshire CC", "Cardiff", 
"Central Valleys (Wales)", "Cheshire CC", "city of leeds", 
"Clackmannanshire and Fife", "Copenhagen", "Darlington", "Derby", "Dublin", 
"Durham CC", "East Ayrshire and North Ayrshire mainland", "East Cumbria", 
"East Derbyshire", "East Dunbartonshire, West Dunbartonshire and Helensburgh & Lomond", 
"East Lothian and Midlothian", "East Merseyside", "East of Northern Ireland", 
"East Riding of Yorkshire", "East Sussex CC", "Edinburgh, City of", "Essex CC", 
"Falkirk", "Flintshire and Wrexham", "Gävle", "Geneva", "Glasgow", 
"Gloucestershire", "Gwent Valleys", "Halton and Warrington", "Hamburg", 
"Hampshire CC", "Hartlepool and Stockton-on-Tees", "Helsinki", 
"Herefordshire, County of", "Hertfordshire", "Inverclyde, East Renfrewshire and Renfrewshire", 
"Kent CC", "Kingston upon Hull, City of", "Lancashire CC", "Leicester", 
"Leicestershire CC and Rutland", "Lincolnshire", "Lisbon", "Liverpool", "London", 
"Luton", "Lyon", "Madrid", "Manchester", "Medway", "Milano", "Milton Keynes", 
"Monmouthshire and Newport", "Norfolk", "North and North East Lincolnshire", 
"North Lanarkshire", "North Nottinghamshire", "North Yorkshire CC", "Northamptonshire",
"Nottingham", "Outer Belfast", "Oxfordshire", "Paris", "Peterborough, UK", "Plymouth",
"Portsmouth", "Roma", "Sefton", "Sheffield", "Shropshire CC", "Somerset", 
"South and West Derbyshire", "South Ayrshire", "South Lanarkshire", 
"South Nottinghamshire", "Southampton", "Southend-on-Sea", "Staffordshire CC", 
"Stoke-on-Trent", "Suffolk", "Sunderland", "Surrey", "Swansea", "Swindon", 
"Telford and Wrekin", "Thurrock", "Torino", "Tyneside", "Vienna", 
"Warwickshire", "West Cumbria", "West Lothian", "West Sussex", "Wiltshire CC", 
"Wirral", "Worcestershire", "York", "Stadt Zürich", "Berne", "Bologna", "Dusseldorf", 
"Frankfurt", "Graz", "Marseille", "Munich", "Nantes", "Newcastle", "Ruhr", 
"Stuttgart","Belgrade", "Bratislava", "Bucharest", "Budapest", "Istanbul", 
"Kiev", "Ljubljana", "Moscow", "Prague", "Riga", "Sofia", "Tallinn", 
"Vilnius", "Zagreb", "Cracow"];

var africaAsia = ["Kyoto", "Ahmadabad", "Bangalore", "Beijing", "Buffalo City", "Cape Town", 
    "Changchun", "Changsha, Hunan", "Chengdu", "Chongqing", "Dalian", "Dar es Salaam", 
    "Ekurhuleni", "eThekwini", "Fuzhou", "Guangzhou, Guangdong", "Guiyang", "Haerbin", 
    "Haikou", "Hangzhou", "Hefei", "Hohhot", "Hong Kong", "Iskandar", "Jilin", 
    "Jinan, Shandong", "Johannesburg", "King Sabata", "Krung Thep (Bangkok)", "Kunming", 
    "Lanzhou", "Mangaung", "Mbeya", "Msunduzi", "Nakuru", "Nanchang", "Nanjing, Jiangsu", 
    "Nanning", "Nelson Mandela", "Ningbo", "Potchefstroom", "Qingdao", "Saldanha", 
    "Sedibeng", "Shanghai", "Shenyang", "Shenzhen", "Shijiazhuang", "Shinayanga", 
    "Singapore", "Sol Plaatje", "Taiyuan, Shanxi", "Tianjin", "Pretoria Tshwane", 
    "uMhlatuze", "†rŸmqi (Wulumqi)", "Wuhan", "Xiamen", "Xi'an, Shaanxi", "Xining", 
    "Yinchuan", "Zhengzhou", "Bangkok", "Cairo", "Chennai", "Dakar", "Guangzhou", 
    "Harare", "Ho Chi Minh City", "Jakarta", "Kuala Lumpur", "Manila", "Mumbai", 
    "Osaka", "Riyadh", "Sapporo", "Seoul", "Taipei", "Tehran", "Tel Aviv", "Tokyo", "Tunis"];

var usa = ["Austin", "Boulder", "Buffalo City", "Denver", "Fort Collins", "Los Angeles", 
  "Minneapolis", "Monmouthshire and Newport", "New York City", "Portland, OR", "Portsmouth",
  "Seattle", "Atlanta", "Chicago", "Houston", "Phoenix", "San Diego", "San Francisco",
  "Washington"];    
