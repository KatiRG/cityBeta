//TO BE VERIFIED! AVGS TAKEN FROM GCA WEBSITE
var regionalAvgs = {
  "groupUSAAusNZ": 13.1, //USA, Can, Mexico, Oceania
  "groupEurope": 7.5,
  "groupAsia": 4.2, "groupAfrica": 0.1,
  "groupLatinAmer": 2.4
}

var regionalAvgs_GDP = {
  "groupUSAAusNZ": 0.38, //USA, Can, Mexico
  "groupEurope": 0.3,
  "groupAsia": 0.5, 
  "groupAfrica": 0.3,
  "groupLatinAmer": 0.3 
}

var regionLabel_dict = {
  "groupEurope": "Europe", "groupUSAAusNZ": "USA/Aus/NZ",
  "groupAfricaAsia": "Africa/Asia", "groupEast": "Eastern Europe",
  "groupNordic": "Nordics", "groupLatinAmer": "Latin America"
};

var simregionColourMap = { 
  "groupEurope": "#A6D4FF", "groupUSAAusNZ": "#C399D9",
  "groupAfricaAsia": "#BD1550", "groupEast": "#E97F02", 
  "groupNordic": "#F99DD3", "groupLatinAmer": "#F8CA00"
};

var regionLabelTooltip_dict = {
  "groupEurope": "European cities cluster together except for <b>Barcelona</b> and <b>Athens</b>. <i>Outsiders: <b>Tokyo</b>, <b>Hong Kong</b>, and <b>3 Nordic cities</b></i>.",
  "groupUSAAusNZ": "US, Canada, Australia and New Zealand are all together. <i><b>Outsiders</b>: Hong Kong, Singapore and Graz (Austria).</i> ",
  "groupAfricaAsia": "African/Asian cities not in this cluster are found in the Europe, USA/Aus/NZ and Eastern Europe clusters. <i>Outsiders: <b>Mexico</b>, <b>Bogotá</b></i>.",
  "groupEast": "Contains eastern cities except <b>Istanbul</b> which is in the Mix cluster. <i>Outsider: <b>Sapporo</b> (Japan).</i>",
  "groupNordic": "Sweden, Norway, Finland. Exceptions: <b>Skåne</b> and <b>Gävle</b> (Sweden), and <b>Copenhagen</b> which are  in the Europe cluster.",
  "groupMix": "Contains a mix of cities from Latin America, Europe, Eastern Europe and Asia."
};

// For colourbar scale
var dimUnits =  {
  "GHG total": "[tCO2]",
  "GHGe intensity 2004": "[kg/MWh]",
  "GHGe intensity 2009": "[kg/MWh]",
  "GHG/capita": "[tCO2]",
  "GHG/GDP": "[kgCO2/$]",
  "population": "",
  "population density": "",
  "GDP/capita": "(PPP) [$/yr]",
  "diesel price": "USD",
  "gas price": "USD",
  "HDD 15.5C": "[days]",
  "CDD 23C": "[days]",
  "urban ratio": "",
  "commerce index": "",
  "household size": "",
  "region": "",
  "country": ""
}

// For similarity map
var nordics = ["Oslo", "Helsinki", "Copenhagen", "Sundsvall", "Stockholm", 
					"Västra Götaland county", "Uppsala", "Örebro", "Linköping", "Karlstad",
					"Norrköping", "Jönköping", "Växjö", "Gävle", "Skåne county", "Umeå"];

var latinAmer = ["Bogotá", "Mexico City", "Rio de Janeiro", "Sao Paulo", "Brasília",
                "Curitiba"];

//American-Aus-NZ cities
var usaAusNZ = ["Phoenix", "Austin", "Houston",
                      "Los Angeles", "Brisbane", "Sydney", "Wellington", "Perth",
                      "San Diego", "Melbourne", "Atlanta", "Washington", "San Francisco",
                      "Chicago", "Vancouver", "Portland, OR", "Seattle", "New York City",
                      "Moscow", "Montreal", "Toronto", "Denver", "Boulder",
                      "Ottawa", "Fort Collins", "Minneapolis", "Calgary"];

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
"Gloucestershire", "Gwent Valleys", "Halmstad", "Halton and Warrington", "Hamburg", 
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
"Stuttgart"];

var east =  ["Belgrade", "Bratislava", "Bucharest", "Budapest", "Istanbul", 
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