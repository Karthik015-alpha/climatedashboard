export type APUnitCategory = "district" | "mandal" | "village" | "street";

export type APLocality = {
  name: string;
  district: string;
  category: APUnitCategory;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
  admin2: string;
  formatted_address: string;
  aliases?: string[];
};

type DistrictSpec = {
  district: string;
  hq: string;
  latitude: number;
  longitude: number;
  mandals?: Array<string | { name: string; aliases?: string[] }>;
  villages?: Array<string | { name: string; aliases?: string[] }>;
  streets?: Array<string | { name: string; aliases?: string[] }>;
};

const DISTRICTS: DistrictSpec[] = [
  {
    district: "Alluri Sitharama Raju",
    hq: "Paderu",
    latitude: 18.065,
    longitude: 82.667,
    mandals: ["Paderu", "Araku Valley", "Chintapalle", "Ananthagiri", "G. Madugula", "Dumbriguda"],
    villages: ["Paderu", "Araku", "Borra", "Lambasingi", "Maredumilli"]
  },
  {
    district: "YSR Kadapa",
    hq: "Kadapa",
    latitude: 14.467,
    longitude: 78.824,
    mandals: [
      "Kadapa", "Proddatur", "Pulivendula", "Badvel", "Jammalamadugu", "Atlur", "B. Kodur", "Brahmamgarimattam", "Chapad", "Chennur", "Chinthakommadinne", "Duvvur", "Gopavaram", "Jammalamadugu", "Kalasapadu", "Kamalapuram", "Khajipet", "Lakkireddipalli", "Muddanur", "Mylavaram", "Pendlimarri", "Porumamilla", "Rajupalem", "S.Mydukur", "Sidhout", "Sri Avadhutha Kasinayana", "Vallur", "Vempalle", "Vemula", "Veerapunayunipalle", "Vontimitta", "Yerraguntla"
    ],
    villages: ["Kamalapuram", "Kodur", "Lakkireddipalli", "Veerapunayunipalle", "Sidhout", "Mydukur", "Rajampet", "Pulivendula Rural", "Proddatur Rural", "Badvel Rural", "Jammalamadugu Rural"]
  },
  {
    district: "Anantapuramu",
    hq: "Anantapuramu",
    latitude: 14.681,
    longitude: 77.599,
    mandals: [
      "Anantapur Urban", "Anantapur Rural", "Gooty", "Guntakal", "Tadipatri", "Uravakonda", "Atmakur", "Bukkaraya Samudram", "Garladinne", "Kudair", "Narpala", "Peddapappur", "Putlur", "Raptadu", "Singanamala", "Yellanur", "Pamidi", "Peddavadugur", "Uravakonda", "Vajrakarur", "Vidapanakal", "Yadiki", "Beluguppa", "Bommanahal", "Brahmasamudram", "D.Hirehal", "Gummagatta", "Kalyandurg", "Kambadur", "Kanekal", "Kundurpi", "Rayadurg", "Settur"
    ],
    villages: [
      "Atmakur", "Raptadu", "Bukkaraya Samudram", "Dharmavaram", "Hindupur", "Penukonda", "Kadiri", "Kalyandurg", "Rayadurg", "Mudigubba", "Gorantla", "Tadimarri", "Beluguppa", "Bathalapalle"
    ],
    streets: [
      "Subash Road", "Clock Tower Road", "Gooty Road", "Bellary Road", "Kalyandurg Road", "Guntakal Road"
    ]
  },
  {
    district: "Annamayya",
    hq: "Rayachoti",
    latitude: 14.053,
    longitude: 78.751,
    mandals: ["Rayachoti", "Madanapalle", "Pileru", "Rajampeta", "Lakkireddipalli"],
    villages: ["Pileru", "Galiveedu", "Sambepalli", "B.Kothakota", "Nimmanapalle", "Peddamandyam", "Thamballapalle", "Kalakada", "T Sundupalle", "Kurabalakota", "Ramasamudram", "Obulavaripalle"]
  },
  {
    district: "Bapatla",
    hq: "Bapatla",
    latitude: 15.904,
    longitude: 80.467,
    mandals: ["Bapatla", "Chirala", "Repalle", "Martur", "Parchur"],
    villages: ["Karlapalem", "Pittalavanipalem", "Vetapalem", "Bapatla Rural", "Nizampatnam", "Edlapadu", "Bollapalle"]
  },
  {
    district: "Chittoor",
    hq: "Chittoor",
    latitude: 13.216,
    longitude: 79.100,
    mandals: [
      "Chittoor Urban", "Chittoor Rural", "Kuppam", "Nagari", "Palamaner", "Bangarupalyam", "Gangadhara Nellore", "Gudipala", "Irala", "Penumuru", "Pulicherla", "Puthalapattu", "Rompicherla", "Sri Rangaraja Puram", "Thavanampalle", "Vedurukuppam", "Yadamarri", "Ramakuppam", "Santhipuram", "Gudipalle", "Nindra", "Puthalapattu", "Karvetinagar", "Baireddipalle", "Gangavaram", "Peddapanjani", "Venkatagirikota"
    ],
    villages: [
      "Mudaramdoddi", "Irala", "Gudupalle", "Puthalapattu", "Palasamudram", "Nagalapuram", "Penumuru", "Baireddipalle", "Punganur", "Sodam", "Yadamari", "Karvetinagar", "Vedurukuppam"
    ],
    streets: [
      "Greamspet Road", "Kattamanchi Road", "Bangalore Road", "Palamaner Road", "Kuppam Road", "Nagari Road"
    ]
  },
  {
    district: "Dr. B.R. Ambedkar Konaseema",
    hq: "Amalapuram",
    latitude: 16.582,
    longitude: 82.016,
    mandals: [
      "Amalapuram", "Kothapeta", "Ravulapalem", "Mummidivaram", "Razole", "Allavaram", "I. Polavaram", "Katrenikona", "Malikipuram", "Mamidikuduru", "Sakhinetipalle", "Uppalaguptam", "Ainavilli", "Alamuru", "Ambajipeta", "Atreyapuram", "P. Gannavaram"
    ],
    villages: ["Ainavilli", "Allavaram", "Katrenikona", "Mummidivaram", "Razole", "Kothapeta", "Ravulapalem", "Ambajipeta"]
  },
  {
    district: "East Godavari",
    hq: "Rajamahendravaram",
    latitude: 17.005,
    longitude: 81.777,
    mandals: [
      "Rajamahendravaram Urban", "Rajamahendravaram Rural", "Kovvur", "Nidadavole", "Anaparthi", "Biccavolu", "Gokavaram", "Kadiam", "Kapileswarapuram", "Korukonda", "Mandapeta", "Rajanagaram", "Rangampeta", "Rayavaram", "Seethanagaram", "Tallapudi", "Devipatnam", "Gopalapuram", "Chagallu", "Peravali", "Undrajavaram", "Samalkota", "Peddapuram", "Jaggampeta", "Kirlampudi", "Kotananduru", "Rowthulapudi", "Sankhavaram", "Thondangi", "Tuni", "Yeleswaram"
    ],
    villages: [
      "Chagallu", "Gopalapuram", "Seethanagaram", "Anaparthi", "Rajanagaram", "Korukonda", "Tallapudi", "Devipatnam"
    ],
    streets: [
      "Main Road", "Kotagummam", "Innespeta", "Danavaipeta", "Aryapuram", "Gandhipuram", "Katheru", "Rajahmundry Road"
    ]
  },
  {
    district: "Eluru",
    hq: "Eluru",
    latitude: 16.710,
    longitude: 81.095,
    mandals: ["Eluru", "Jangareddygudem", "Chintalapudi", "Nuzvid", "Polavaram"],
    villages: ["Bhimadole", "Denduluru", "Pedapadu", "Lingapalem", "Dwaraka Tirumala", "Unguturu", "Borrampalem", "Jangareddygudem Rural"]
  },
  {
    district: "Guntur",
    hq: "Guntur",
    latitude: 16.306,
    longitude: 80.436,
    mandals: [
      "Guntur East", "Guntur West", "Medikonduru", "Pedakakani", "Pedanandipadu", "Phirangipuram", "Prathipadu", "Tadikonda", "Thullur", "Vatticherukuru",
      "Chebrolu", "Duggirala", "Kakumanu", "Kollipara", "Mangalagiri", "Ponnur", "Tadepalle", "Tenali", "Amaravathi", "Rompicherla", "Krosuru", "Muppalla", "Namburu", "Pedavadlapudi"
    ],
    villages: [
      "Pedakakani", "Tadikonda", "Duggirala", "Vatticherukuru", "Chebrolu", "Prathipadu", "Namburu", "Pedavadlapudi", "Tadepalli", "Mangalagiri", "Amaravathi", "Rompicherla", "Krosuru", "Muppalla",
      "Ankireddipalem", "Gorantla", "Nallapadu", "Pedapalakaluru", "Adavitakkellapadu", "Gorantla", "Pothuru", "Chowdavaram", "Etukuru", "Budampadu", "Reddypalem"
    ],
    streets: [
      "Amaravathi Road", "Lakshmipuram Main Road", "Brodipet Main Road", "Lodge Center",
      "Arundelpet", "Lakshmipuram", "Brodipet", "Koretapadu", "Navabharath Nagar", "Pattabhipuram", "Syamalanagar", "Vidyanagar", "Autonagar", "Gorantla", "Pedapalakaluru", "Nallapadu", "Budampadu", "Chowdavaram"
    ]
  },
  {
    district: "Kakinada",
    hq: "Kakinada",
    latitude: 16.989,
    longitude: 82.248,
    mandals: [
      "Kakinada Urban", "Kakinada Rural", "Tuni", "Pithapuram", "Samalkota", "Kajuluru", "Karapa", "Kothapalle", "Pedapudi", "Pithapuram", "Thallarevu", "Biccavolu", "Gollaprolu", "Peddapuram", "Rowthulapudi", "Sankhavaram", "Thondangi", "Yeleswaram"
    ],
    villages: ["Pedapudi", "Karapa", "Thallarevu", "Pithapuram Rural", "Peddapuram", "Kothapalle", "U. Kothapalli", "Kajuluru"]
  },
  {
    district: "Krishna",
    hq: "Machilipatnam",
    latitude: 16.187,
    longitude: 81.138,
    mandals: [
      "Machilipatnam", "Gudivada", "Vuyyuru", "Penamaluru", "Avanigadda", "Bantumilli", "Challapalli", "Ghantasala", "Gudlavalleru", "Kankipadu", "Kaikaluru", "Koduru", "Kruthivennu", "Machilipatnam Rural", "Mopidevi", "Movva", "Nagayalanka", "Pamarru", "Pamidimukkala", "Pedana", "Pedaparupudi", "Thotlavalluru", "Vuyyuru", "Pamidimukkala", "Kollipara", "Kollur"
    ],
    villages: [
      "Bantumilli", "Challapalli", "Mopidevi", "Kankipadu", "Gudlavalleru", "Ghantasala", "Movva", "Pedaparupudi", "Thotlavalluru", "Kaikaluru", "Pamarru", "Kollur", "Machilipatnam Rural", "Bantumilli Rural"
    ],
    streets: [
      "Bandar Road", "Eluru Road", "One Town", "Two Town", "Chowk Road", "Fish Market Road", "Fort Road", "Nuzvid Road", "Vuyyuru Road"
    ]
  },
  {
    district: "Kurnool",
    hq: "Kurnool",
    latitude: 15.828,
    longitude: 78.037,
    mandals: [
      "Kurnool Urban", "Kurnool Rural", "Adoni Urban", "Adoni Rural", "Pattikonda", "Mantralayam", "Yemmiganur", "Kodumur", "Veldurthi", "Kowthalam", "Orvakal", "Devanakonda", "Kosigi", "Nandavaram", "Maddikera", "Panyam", "Mahanandi", "Pamulapadu", "C.Belagal", "Gonegandla", "Tuggali", "Holagunda", "Gonegandla", "Aspari", "Chippagiri", "Dhone", "Bethamcherla", "Banaganapalle", "Koilkuntla", "Kolimigundla", "Owk", "Sanjamala"
    ],
    villages: [
      "Kodumur", "Veldurthi", "Kowthalam", "Orvakal", "Devanakonda", "Kosigi", "Nandavaram", "Maddikera", "Panyam", "Mahanandi", "Pamulapadu", "C.Belagal", "Gonegandla", "Tuggali"
    ],
    streets: [
      "Kurnool Road", "Adoni Road", "Nandyal Road", "Bellary Road", "Sunkesula Road", "B Camp Road", "One Town", "Two Town"
    ]
  },
  {
    district: "Markapuram",
    hq: "Markapuram",
    latitude: 15.740,
    longitude: 79.268,
    mandals: [
      "Markapuram", "Giddalur", "Cumbum", "Kanigiri", "Podili", "Ardhaveedu", "Bestawaripeta", "Cumbum", "Dornala", "Giddalur", "Kanigiri", "Konakanamitla", "Komarolu", "Markapuram", "Peda Araveedu", "Pullalacheruvu", "Podili", "Racherla", "Tarlupadu", "Tripuranthakam", "Yerragondapalem", "Pamur", "Pedacherlo Palle", "Veligandla", "Hanumanthuni Padu"
    ],
    villages: ["Dornala", "Ardhaveedu", "Pamur", "Bestavaripeta", "Tripurantakam", "Racherla", "Tallur", "Markapur Rural"]
  },
  {
    district: "NTR",
    hq: "Vijayawada",
    latitude: 16.506,
    longitude: 80.648,
    mandals: ["Vijayawada East", "Vijayawada West", "Vijayawada Central", "Vijayawada North", "Ibrahimpatnam", "Mylavaram", "Nandigama"],
    villages: ["Kondapalle", "Guntupalle", "Jupudi", "Kanchikacherla", "Ibrahimpatnam Rural", "Mylavaram Rural", "Nandigama Rural", "Vissannapeta", "A.Konduru"],
    streets: ["MG Road (Bandar Road)", "Eluru Road", "Besant Road", "Pinnamaneni Polyclinic Road"]
  },
  {
    district: "Nandyal",
    hq: "Nandyal",
    latitude: 15.478,
    longitude: 78.483,
    mandals: [
      "Nandyal Urban", "Nandyal Rural", "Dhone", "Allagadda", "Atmakur", "Bandi Atmakur", "Jupadu Bungalow", "Kothapalle", "Midthuru", "Nandikotkur", "Pagidyala", "Pamulapadu", "Srisailam", "Velgodu", "Banaganapalle", "Koilkuntla", "Kolimigundla", "Owk", "Sanjamala", "Bethamcherla", "Peapally", "Chagalamarri", "Dornipadu", "Gadivemula", "Gospadu", "Mahanandi", "Panyam", "Rudravaram", "Sirivella", "Uyyalawada"
    ],
    villages: [
      "Banaganapalle", "Bethamcherla", "Srisailam", "Koilkuntla", "Mahanandi", "Kolimigundla", "Owk", "Nandikotkur", "Sanjamala", "Panyam", "Bandi Atmakur", "Dhone Rural"
    ],
    streets: [
      "Main Road", "Sunkesula Road", "Allagadda Road", "Dhone Road", "Atmakur Road"
    ]
  },
  {
    district: "Palnadu",
    hq: "Narasaraopet",
    latitude: 16.237,
    longitude: 80.054,
    mandals: [
      "Narasaraopet", "Sattenapalle", "Vinukonda", "Gurazala", "Macherla", "Dachepalle", "Durgi", "Gurazala", "Karempudi", "Macherla", "Machavaram", "Piduguralla", "Rentachintala", "Veldurthi", "Bollapalle", "Chilakaluripet", "Edlapadu", "Ipuru", "Nadendla", "Narasaraopet", "Nuzendla", "Rompicherla", "Savalyapuram"
    ],
    villages: [
      "Chilakaluripet", "Piduguralla", "Dachepalle", "Bollapalle", "Vinukonda Rural", "Macherla Rural", "Narasaraopet Rural", "Rompicherla"
    ],
    streets: [
      "Main Road", "Sattenapalle Road", "Vinukonda Road", "Gurazala Road", "Macherla Road"
    ]
  },
  {
    district: "Parvathipuram Manyam",
    hq: "Parvathipuram",
    latitude: 18.781,
    longitude: 83.423,
    mandals: [
      "Parvathipuram", "Palakonda", "Kurupam", "Seethampeta", "Gummalakshmipuram", "Bhamini", "Jiyyammavalasa", "Veeraghattam", "Balijipeta", "Garugubilli", "Komarada", "Makkuva", "Pachipenta", "Salur", "Seethanagaram"
    ],
    villages: ["Punubutchampeta", "Artham", "Komarada", "Seethampeta", "Gummalakshmipuram", "Salur Rural", "Bobbili Rural"]
  },
  {
    district: "Polavaram",
    hq: "Polavaram",
    latitude: 17.246,
    longitude: 81.672,
    mandals: ["Polavaram"],
    villages: ["Surrounding agencies", "Polavaram Agency", "Kukkunuru", "Velerupadu", "Buttayagudem"]
  },
  {
    district: "Prakasam",
    hq: "Ongole",
    latitude: 15.506,
    longitude: 80.050,
    mandals: ["Ongole", "Addanki", "Chimakurthi", "Kandukur"],
    villages: ["Tripurantakam", "Venkatapuram", "Kandukur Rural", "Chimakurthy Rural", "Maddipadu", "Tangutur", "Singarayakonda"]
  },
  {
    district: "SPSR Nellore",
    hq: "Nellore",
    latitude: 14.443,
    longitude: 79.986,
    mandals: [
      "Nellore Urban", "Nellore Rural", "Kavali", "Kovur", "Gudur", "Allur", "Bogolu", "Dagadarthi", "Duttaluru", "Jaladanki", "Kaligiri", "Kodavaluru", "Manubolu", "Muttukuru", "Podalakuru", "Rapuru", "Saidapuramu", "Sangam", "Sitarampuramu", "Udayagiri", "Vidavaluru", "Vinjamuru", "Indukurpet", "Buchireddypalem", "Venkatachalam", "Thotapalligudur", "Marripadu", "Atmakur", "Chejerla", "Kaluvoya"
    ],
    villages: [
      "Allipuram", "Devarapalem", "Musunuru", "Akkacheruvupadu", "Amancherla", "Ambapuram", "Buja Buja Nellore", "Chintareddipalem", "Gundlapalem", "Kallurpalle", "Mogallapalem", "Mulumudi", "Pottepalem", "Sajjapuram", "Vedayapalem", "Venkateswarapuram", "Padugupadu", "Visavaviletipadu", "Kanuparthipadu", "Madhuravada", "Nellore Rural", "Nellore Urban"
    ],
    streets: [
      "Trunk Road", "Mini Bypass Road", "Magunta Layout", "Balaji Nagar", "Stonehousepet", "Jonnawada Road", "Buchireddypalem Road", "Kavali Road", "Kovur Road", "Gudur Road"
    ]
  },
  {
    district: "Sri Sathya Sai",
    hq: "Puttaparthi",
    latitude: 14.165,
    longitude: 77.811,
    mandals: ["Puttaparthi", "Dharmavaram", "Penukonda", "Kadiri", "Hindupur"],
    villages: ["Lepakshi", "Bathalapalle", "Bukkapatnam", "Mudigubba", "Amadagur", "Nallamada", "Talupula", "Roddam", "Narpala", "Somandepalle"]
  },
  {
    district: "Srikakulam",
    hq: "Srikakulam",
    latitude: 18.307,
    longitude: 83.898,
    mandals: [
      "Srikakulam", "Palasa", "Tekkali", "Rajam", "Itchapuram", "Amadalavalasa", "Burja", "Etcherla", "Ganguvarisigadam", "Gara", "Jalumuru", "Laveru", "Narasannapeta", "Polaki", "Ponduru", "Ranastalam", "Sarubujjili", "Hiramandalam", "Kotabommali", "Kothuru", "Lakshminarsupeta", "Meliaputti", "Nandigam", "Pathapatnam", "Santhabommali", "Saravakota"
    ],
    villages: ["Kotabommali", "Mandasa", "Polaki", "Gara", "Pathapatnam", "Narasannapeta", "Amadalavalasa", "Jalumuru"]
  },
  {
    district: "Tirupati",
    hq: "Tirupati",
    latitude: 13.628,
    longitude: 79.419,
    mandals: [
      "Tirupati Urban", "Tirupati Rural", "Srikalahasti", "Gudur", "Venkatagiri", "Balayapalle", "Dakkili", "K. V. B. Puram", "Nagalapuram", "Narayanavanam", "Pichatur", "Renigunta", "Srikalahasti", "Thottambedu", "Venkatagiri", "Yerpedu", "Buchinaidu Kandriga", "Chittamur", "Doravarisatram", "Naidupeta", "Ozili", "Pellakuru", "Satyavedu", "Sullurpeta", "Tada", "Vakadu", "Varadaiahpalem", "Chandragiri", "Chinnagottigallu", "Chitvel", "Kodur", "Obulavaripalle", "Pakala", "Penagalur", "Pullampeta", "Puttur", "Ramachandrapuram", "Vadamalapeta", "Yerravaripalem"
    ],
    villages: ["Srikalahasti", "Renigunta", "Yerpedu", "Chandragiri", "Puttur", "Vadamalapeta", "Thottambedu", "Satyavedu", "Naidupeta", "Gudur Rural"]
  },
  {
    district: "Visakhapatnam",
    hq: "Visakhapatnam",
    latitude: 17.687,
    longitude: 83.219,
    mandals: [
      "Anandapuram", "Bheemunipatnam", "Padmanabham", "Seethammadhara", "Visakhapatnam Rural", "Gajuwaka", "Gopalapatnam", "Maharanipeta", "Mulagada", "Pedagantyada", "Pendurthi"
    ],
    villages: [
      "Anakapalle Rural", "Pendurthi Rural", "Bheemunipatnam Rural", "Gajuwaka Rural", "Madhurawada"
    ],
    streets: [
      // West
      "Gopalapatnam", "Naidu Thota", "Vepagunta", "Marripalem", "Simhachalam", "Prahaladapuram", "Pendurthi", "Chintalagraharam", "NAD", "Madhavadhara", "Sujatha Nagar", "Adavivaram", "Muralinagar", "Chinnamushidiwada", "Kakani Nagar", "Narava", "Pineapple Colony",
      // East
      "Maharanipeta", "Jagadamba Centre", "MVP Colony", "Pandurangapuram", "Velampeta", "Chinna Waltair", "Kirlampudi Layout", "Daspalla Hills", "Town Kotha Road", "Peda Waltair", "Lawsons Bay Colony", "Prakashraopeta", "Burujupeta", "Jalari Peta", "One Town", "Poorna Market", "Allipuram", "Salipeta", "Relli Veedhi", "Chengal Rao Peta",
      // North West
      "Chinna Gadhili", "Visalakshi Nagar", "Arilova", "Ravindra Nagar", "Hanumanthavaka", "Adarsh Nagar",
      // Northern Suburbs
      "Padmanabham", "Gidijala", "Gudilova", "Tagarapuvalasa", "Bheemunipatnam", "Nidigattu", "Vellanki", "Sontyam",
      // Southern Suburbs
      "Anakapalli", "Pedamadaka", "Ravada", "Devada", "Lankelapalem", "Parawada", "Appikonda", "Atchutapuram",
      // Western Suburbs
      "Sabbavaram", "Devipuram", "Kothavalasa"
    ]
  },
  {
    district: "Sri Sathya Sai",
    hq: "Puttaparthi",
    latitude: 14.165,
    longitude: 77.811,
    mandals: [
      "Puttaparthi", "Dharmavaram", "Penukonda", "Kadiri", "Hindupur", "Bathalapalle", "Chennekothapalle", "Dharmavaram", "Kanaganapalle", "Mudigubba", "Ramagiri", "Tadimarri", "Gandlapenta", "Kadiri", "Lepakshi", "Nallacheruvu", "Nambulapulakunta", "Tanakal", "Agali", "Amarapuram", "Gudibanda", "Madakasira", "Rolla", "Chilamathur", "Gorantla", "Hindupur", "Parigi", "Penukonda", "Roddam", "Somandepalle", "Talupula", "Amadagur", "Bukkapatnam", "Kothacheruvu", "Nallamada", "Obuladevaracheruvu"
    ],
    villages: ["Lepakshi", "Bathalapalle", "Bukkapatnam", "Mudigubba", "Amadagur", "Nallamada", "Talupula", "Roddam", "Narpala", "Somandepalle"]
  },
  {
    district: "Vizianagaram",
    hq: "Vizianagaram",
    latitude: 18.107,
    longitude: 83.395,
    mandals: ["Vizianagaram", "Gajapathinagaram", "Bobbili", "Nellimarla"],
    villages: ["Bobbili Rural", "Nellimarla Rural", "Gajapathinagaram Rural", "Kothavalasa", "Srungavarapukota"]
  },
  {
    district: "West Godavari",
    hq: "Bhimavaram",
    latitude: 16.544,
    longitude: 81.521,
    mandals: [
      "Bhimavaram", "Narasapuram", "Tanuku", "Tadepalligudem", "Palakollu", "Akividu", "Kalla", "Palacoderu", "Undi", "Veeravasaram", "Mogalthur", "Penugonda", "Penumantra", "Poduru", "Yelamanchili", "Attili", "Ganapavaram", "Iragavaram", "Pentapadu"
    ],
    villages: [
      "Penugonda", "Undi", "Akiveedu", "Bhimavaram Rural", "Palacole Rural", "Tanuku Rural", "Narasapuram Rural", "Iragavaram"
    ],
    streets: [
      "Juvvalapalem Road", "Undi Road", "Narasapur Road", "Palakollu Road", "Tanuku Road", "Tadepalligudem Road"
    ]
  },
  {
    district: "YSR Kadapa",
    hq: "Kadapa",
    latitude: 14.467,
    longitude: 78.824,
    mandals: ["Kadapa", "Proddatur", "Pulivendula", "Badvel", "Jammalamadugu"],
    villages: ["Kamalapuram", "Kodur", "Lakkireddipalli", "Veerapunayunipalle", "Sidhout", "Mydukur", "Rajampet", "Pulivendula Rural", "Proddatur Rural", "Badvel Rural", "Jammalamadugu Rural"]
  }
];

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function buildLocalities(): APLocality[] {
  const entries: APLocality[] = [];

  for (const district of DISTRICTS) {
    entries.push({
      name: district.district,
      district: district.district,
      category: "district",
      latitude: district.latitude,
      longitude: district.longitude,
      country: "India",
      admin1: "Andhra Pradesh",
      admin2: district.district,
      formatted_address: `${district.district}, Andhra Pradesh, India`
    });

    const addGroup = (items: DistrictSpec["mandals"] | DistrictSpec["villages"] | DistrictSpec["streets"], category: APUnitCategory) => {
      for (const item of items || []) {
        const unit = typeof item === "string" ? { name: item, aliases: [] as string[] } : item;
        entries.push({
          name: unit.name,
          district: district.district,
          category,
          latitude: district.latitude,
          longitude: district.longitude,
          country: "India",
          admin1: "Andhra Pradesh",
          admin2: district.district,
          formatted_address: `${unit.name}, ${district.hq}, ${district.district}, Andhra Pradesh, India`,
          aliases: unit.aliases
        });
      }
    };

    addGroup(district.mandals, "mandal");
    addGroup(district.villages, "village");
    addGroup(district.streets, "street");
  }

  return entries;
}

export const ANDHRA_PRADESH_LOCALITIES = buildLocalities();

export function searchAndhraLocalities(query: string) {
  const normalized = normalizeText(query);
  if (!normalized) return [];

  const matches = ANDHRA_PRADESH_LOCALITIES.filter((item) => {
    const haystack = normalizeText([
      item.name,
      item.district,
      item.admin2,
      item.formatted_address,
      ...(item.aliases || [])
    ].join(" "));

    return haystack.includes(normalized);
  });

  const seen = new Set<string>();
  return matches.filter((item) => {
    const key = `${item.name.toLowerCase()}|${item.district.toLowerCase()}|${item.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}