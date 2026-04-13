export type GlobalCity = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  population?: number;
};

export const globalCities: GlobalCity[] = [
  { name: "New York", country: "USA", latitude: 40.7128, longitude: -74.0060, population: 8419000 },
  { name: "London", country: "UK", latitude: 51.5074, longitude: -0.1278, population: 8982000 },
  { name: "Tokyo", country: "Japan", latitude: 35.6895, longitude: 139.6917, population: 13929000 },
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, population: 2148000 },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, population: 5312000 },
  { name: "Mumbai", country: "India", latitude: 19.0760, longitude: 72.8777, population: 12440000 },
  { name: "Delhi", country: "India", latitude: 28.6139, longitude: 77.2090, population: 16787941 },
  { name: "Beijing", country: "China", latitude: 39.9042, longitude: 116.4074, population: 21540000 },
  { name: "Moscow", country: "Russia", latitude: 55.7558, longitude: 37.6173, population: 11920000 },
  { name: "São Paulo", country: "Brazil", latitude: -23.5505, longitude: -46.6333, population: 12252000 },
  { name: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357, population: 10230000 },
  { name: "Los Angeles", country: "USA", latitude: 34.0522, longitude: -118.2437, population: 3980000 },
  { name: "Istanbul", country: "Turkey", latitude: 41.0082, longitude: 28.9784, population: 15460000 },
  { name: "Berlin", country: "Germany", latitude: 52.5200, longitude: 13.4050, population: 3769000 },
  { name: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, population: 5639000 },
  { name: "Dubai", country: "UAE", latitude: 25.2048, longitude: 55.2708, population: 3331000 },
  { name: "Toronto", country: "Canada", latitude: 43.6511, longitude: -79.347015, population: 2732000 },
  { name: "Johannesburg", country: "South Africa", latitude: -26.2041, longitude: 28.0473, population: 957441 },
  { name: "Mexico City", country: "Mexico", latitude: 19.4326, longitude: -99.1332, population: 8918653 },
  { name: "Seoul", country: "South Korea", latitude: 37.5665, longitude: 126.9780, population: 9776000 },
  { name: "Eiffel Tower", country: "France", latitude: 48.8584, longitude: 2.2945 },
  { name: "Statue of Liberty", country: "USA", latitude: 40.6892, longitude: -74.0445 },
  { name: "Great Wall of China", country: "China", latitude: 40.4319, longitude: 116.5704 },
  { name: "Taj Mahal", country: "India", latitude: 27.1751, longitude: 78.0421 },
  { name: "Colosseum", country: "Italy", latitude: 41.8902, longitude: 12.4922 },
  { name: "Christ the Redeemer", country: "Brazil", latitude: -22.9519, longitude: -43.2105 },
  { name: "Sydney Opera House", country: "Australia", latitude: -33.8568, longitude: 151.2153 },
  { name: "Burj Khalifa", country: "UAE", latitude: 25.1972, longitude: 55.2744 },
  { name: "Mount Everest", country: "Nepal/China", latitude: 27.9881, longitude: 86.925 },
  { name: "Niagara Falls", country: "Canada/USA", latitude: 43.0962, longitude: -79.0377 },
  { name: "Machu Picchu", country: "Peru", latitude: -13.1631, longitude: -72.545 },
  { name: "Santorini", country: "Greece", latitude: 36.3932, longitude: 25.4615 },
  { name: "Angkor Wat", country: "Cambodia", latitude: 13.4125, longitude: 103.867 },
  { name: "Petra", country: "Jordan", latitude: 30.3285, longitude: 35.4444 },
  { name: "Grand Canyon", country: "USA", latitude: 36.1069, longitude: -112.1129 },
  { name: "Stonehenge", country: "UK", latitude: 51.1789, longitude: -1.8262 },
  { name: "Pyramids of Giza", country: "Egypt", latitude: 29.9792, longitude: 31.1342 },
  { name: "Table Mountain", country: "South Africa", latitude: -33.9628, longitude: 18.4098 },
  { name: "Banff National Park", country: "Canada", latitude: 51.4968, longitude: -115.9281 },
  { name: "Golden Gate Bridge", country: "USA", latitude: 37.8199, longitude: -122.4783 },
  { name: "Nellore", country: "India", latitude: 14.4426, longitude: 79.9865, population: 600869 },
  ...[
    "Nellore Urban","Nellore Rural","Indukurpet","T.P. Gudur","Muthukur","Venkatachalam","Podalakur","Rapur","Kovur","Buchireddypalem","Manubolu","Sydapuram",
    "Atmakur","Kaluvoya","Chejerla","Ananthasagaram","A.S. Peta","Sangam","S.R. Puram","Udayagiri","Marripadu",
    "Kavali","Allur","Kodavalur","Vidavalur","Vinjamur","Dagadarthi","Bogole","Jaladanki","Duttalur","Kaligiri",
    "Gudur","Sullurpeta","Naidupeta","Venkatagiri","Tada","Chittamur","Vakadu","Kondapuram","Dakkili","Doravarisatram","Ojili","Pellakur","Balayapalle","Varikuntapadu"
  ].map(mandal => ({ name: `${mandal}, Nellore`, country: "India", latitude: 14.4426, longitude: 79.9865 })),
  ...[
    "Trunk Road","Mini Bypass Road","R.R. Street","Achari Street","Kapu Street","Stonehousepet Main Road","Mulapeta Main Road","Podalakur Road","Atmakur Road","Muthukur Road","Vedayapalem Road","GNT Road","NH-16 stretch"
  ].map(street => ({ name: `${street}, Nellore`, country: "India", latitude: 14.4426, longitude: 79.9865 })),
  ...[
    "Stonehousepet","Magunta Layout","Balaji Nagar","Vedayapalem","Dargamitta","Pogathota","Nawabpet","A.C. Nagar","Ramji Nagar","Harinathpuram","VRC Centre","Gandhi Bomma Centre","Children’s Park Area","Mulapeta","Fathekhanpet","Chinna Bazaar","Kothuru","Bramhananda Reddy Nagar","Ambedkar Nagar","Navalak Gardens","Saraswathi Nagar","Isukathota","Kondayapalem","Somasekharapuram","Chintareddypalem","Allipuram","Devarapalem","Gudipallipadu","Amancherla"
  ].map(locality => ({ name: `${locality}, Nellore`, country: "India", latitude: 14.4426, longitude: 79.9865 })),
  ...[
    "Akkacheruvupadu","Allampadu","Allipuram","Amancherla","Ambapuram","Ananthasagaram","Anumasamudrampeta","Apparao Palem","Balayapalle","Basinenipalli","Batrakagollu","Beeramgunta","Bheemavarappadu","Bitragunta","Bogole","Botikarlapadu","Buchireddypalem","Chaganam Rajupalem","Chejerla","Chendodu","Chennavarappadu","Chennur","Chillakur","Chintalapalem","Chintareddipalem","Chittamur","Chittodu","D. Velampalli","Dagadarthi","Dakkili","Devarapalem","Donthali","Doravarisatram","East Gogulapalli","Golla Kandukur","Graddagunta","Gudali","Gudipallipadu","Gundlapalem","Illukurupadu","Jaladanki","Kaligiri","Kaluvoya","Karlapudi","Kesavaram","Kodavalur","Kondapuram","Kota","Kothapalem","Kothapatnam","Kovur","Krishnapatnam","Lakshmakka Khandriga","Manubolu","Marripadu","Muthukur","Mypadu","Narrawada","Nelapattu","Nellatur","North Rajupalem","Ojili","Pangili","Pellakur","Pennepalli","Periyavaram","Podalakur","Puttamraju Kandriga","Rama Reddy Palem","Ramanapalem","Ramapuram","Rebala","Rapur","Saipeta","Sangam","Sarvepalli","Seetharamapuram","Siddana Konduru","Siddareddy Palem","Sydapuram","Sullurpeta","Tada","Thinnelapudi","Thippavarappadu","Thirumalamma Palem","Thoorpu Dubagunta","Thotapalligudur","Thummalapenta","Ulavapalli","Utukur","Vakadu","Varikuntapadu","Veguru","Venadu","Vendodu","Vidavalur","Vinjamur","Viruvur","Yellayapalem","Yerradoddipalli"
  ].map(village => ({ name: `${village}, Nellore`, country: "India", latitude: 14.4426, longitude: 79.9865 })),
];

export function searchGlobalCities(query: string): GlobalCity[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return globalCities.filter(city =>
    city.name.toLowerCase().includes(q) ||
    city.country.toLowerCase().includes(q)
  ).sort((a, b) => (b.population || 0) - (a.population || 0));
}
