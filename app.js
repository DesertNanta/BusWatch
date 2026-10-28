/* BusWatch shared interactions. All operational data shown here are demo/simulated. */
const pageLinks = {dashboard:'index.html',planner:'planner.html',tracking:'tracking.html',stops:'stops.html',notifications:'notifications.html',operator:'operator.html'};
function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2800)}
function go(view){window.location.href=pageLinks[view]||'index.html'}
function mapSvg(id='main'){return `<svg viewBox="0 0 720 350" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Peta ilustrasi rute bus"><defs><pattern id="grid${id}" width="76" height="58" patternUnits="userSpaceOnUse"><path d="M76 0H0V58" fill="none" stroke="#d8e8eb" stroke-width="1"/></pattern><filter id="shadow${id}" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#25517a" flood-opacity=".18"/></filter></defs><rect width="720" height="350" fill="#eef6f4"/><rect width="720" height="350" fill="url(#grid${id})"/><path d="M-20 50L100 95 180 40 260 78 365 22 465 70 570 35 750 90M-10 255L110 205 220 245 315 198 430 250 540 205 750 250M50 -20L88 90 70 175 125 350M245 -15L218 83 270 155 244 350M465 -10L420 85 468 175 438 350M620 -10L585 90 625 175 590 360" fill="none" stroke="#fff" stroke-width="13"/><path d="M-20 50L100 95 180 40 260 78 365 22 465 70 570 35 750 90M-10 255L110 205 220 245 315 198 430 250 540 205 750 250M50 -20L88 90 70 175 125 350M245 -15L218 83 270 155 244 350M465 -10L420 85 468 175 438 350M620 -10L585 90 625 175 590 360" fill="none" stroke="#d9e5e9" stroke-width="1.2"/><g fill="#e0f0e7" opacity=".9"><rect x="132" y="118" width="48" height="32" rx="5"/><rect x="320" y="97" width="65" height="26" rx="4"/><rect x="510" y="116" width="45" height="43" rx="6"/><rect x="144" y="275" width="56" height="27" rx="5"/><rect x="490" y="275" width="67" height="30" rx="5"/></g><g font-family="Arial,sans-serif" font-size="10" fill="#8aa0b2"><text x="24" y="25">Kawasan Perkotaan</text><text x="485" y="325">Jaringan jalan</text><text x="305" y="170">Pusat kota</text></g><path d="M65 285 C105 268 106 200 175 190 S268 208 315 160 S410 92 474 126 S580 205 661 125" fill="none" stroke="#1677f9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M88 67 C153 92 205 112 260 145 S355 238 418 232 S514 183 562 238 S635 286 680 280" fill="none" stroke="#14a394" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="7 5"/><g filter="url(#shadow${id})"><g transform="translate(173 190)"><circle r="13" fill="#fff"/><circle r="9" fill="#149d72"/><text x="0" y="4" fill="#fff" font-size="10" text-anchor="middle">A</text><rect x="-25" y="17" width="74" height="24" rx="7" fill="#fff"/><text x="12" y="32" font-size="10" font-weight="700" text-anchor="middle" fill="#34506f">Halte A</text></g><g transform="translate(315 160)"><circle r="13" fill="#fff"/><circle r="9" fill="#149d72"/><text x="0" y="4" fill="#fff" font-size="10" text-anchor="middle">B</text><rect x="-4" y="16" width="74" height="24" rx="7" fill="#fff"/><text x="33" y="31" font-size="10" font-weight="700" text-anchor="middle" fill="#34506f">Halte B</text></g><g transform="translate(474 126)"><circle r="13" fill="#fff"/><circle r="9" fill="#149d72"/><text x="0" y="4" fill="#fff" font-size="10" text-anchor="middle">C</text><rect x="-31" y="16" width="74" height="24" rx="7" fill="#fff"/><text x="6" y="31" font-size="10" font-weight="700" text-anchor="middle" fill="#34506f">Halte C</text></g><g transform="translate(390 108)"><rect x="-7" y="-7" width="30" height="30" rx="10" fill="#1677f9" stroke="#fff" stroke-width="3"/><text x="8" y="12" font-size="15" text-anchor="middle" fill="#fff">▣</text><rect x="28" y="-2" width="94" height="27" rx="8" fill="#fff"/><text x="75" y="15" font-size="10" font-weight="700" text-anchor="middle" fill="#254366">Bus 01 · 4 mnt</text></g></g><g class="user-location-pin" transform="translate(65 285)"><circle r="12" fill="#1677f9" opacity=".18"/><circle r="7" fill="#1677f9" stroke="#fff" stroke-width="3"/><rect x="14" y="-8" width="88" height="24" rx="7" fill="#fff"/><text x="58" y="8" text-anchor="middle" font-size="10" font-weight="700" fill="#1677f9">Lokasi Anda</text></g></svg>`}
['trackingMap','operatorMap'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=mapSvg(id)});
// Shared navigation across independent HTML pages.
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.goto)));
const topNotify=document.getElementById('topNotify');if(topNotify)topNotify.addEventListener('click',()=>go('notifications'));
const mobileMenu=document.getElementById('mobileMenu');if(mobileMenu)mobileMenu.addEventListener('click',()=>document.getElementById('sidebar')?.classList.toggle('open'));
const currentDate=document.getElementById('currentDate');if(currentDate){const now=new Date();currentDate.textContent=now.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});}

const destData={
 'Terminal Ubung':{stop:'Halte A',corridor:'Koridor 1',bus:'Bus 01',walk:5,busmin:21,total:32,eta:'08.26',price:'Rp 5.000'},
 'Sanur':{stop:'Halte B',corridor:'Koridor 3',bus:'Bus 03',walk:7,busmin:24,total:38,eta:'08.31',price:'Rp 6.000'},
 'Nusa Dua':{stop:'Halte C',corridor:'Koridor 5',bus:'Bus 07',walk:12,busmin:32,total:48,eta:'08.38',price:'Rp 7.000'},
 'Lapangan Puputan':{stop:'Halte B',corridor:'Koridor 1',bus:'Bus 01',walk:6,busmin:15,total:25,eta:'08.26',price:'Rp 4.000'},
 'Poltrada Bali':{stop:'Halte A',corridor:'Koridor 1',bus:'Bus 01',walk:5,busmin:14,total:23,eta:'08.26',price:'Rp 4.000'}
};

const BALI_COORDINATES = {
 'Poltrada Bali': [-8.5445, 115.1147],
 'Kampus Poltrada Bali': [-8.5445, 115.1147],
 'Terminal Ubung': [-8.6305, 115.1972],
 'Halte A': [-8.6355, 115.2015],
 'Halte B': [-8.6565, 115.2185],
 'Halte C': [-8.6750, 115.2600],
 'Halte D': [-8.6710, 115.2340],
 'Halte E': [-8.7890, 115.2150],
 'Sanur': [-8.6833, 115.2625],
 'Nusa Dua': [-8.8000, 115.2300],
 'Lapangan Puputan': [-8.6565, 115.2185]
};

const POPULAR_LOCATIONS = [
 { name: 'Poltrada Bali', sub: 'Kampus Politeknik Transportasi Darat Bali, Buleleng', lat: -8.5445, lon: 115.1147, icon: '🏫' },
 { name: 'Terminal Ubung', sub: 'Terminal Bus Ubung, Denpasar Utara', lat: -8.6305, lon: 115.1972, icon: '🚏' },
 { name: 'Bandara Ngurah Rai', sub: 'Bandara Internasional I Gusti Ngurah Rai, Tuban', lat: -8.7482, lon: 115.1672, icon: '✈️' },
 { name: 'Lapangan Puputan', sub: 'Lapangan Puputan Badung, Denpasar', lat: -8.6565, lon: 115.2185, icon: '🏛️' },
 { name: 'Sanur', sub: 'Pantai Sanur, Denpasar Selatan', lat: -8.6833, lon: 115.2625, icon: '🏖️' },
 { name: 'Nusa Dua', sub: 'Kawasan Wisata Nusa Dua, Badung', lat: -8.8000, lon: 115.2300, icon: '🏝️' },
 { name: 'Kuta', sub: 'Pantai Kuta, Badung, Bali', lat: -8.7180, lon: 115.1690, icon: '🏖️' },
 { name: 'Seminyak', sub: 'Seminyak, Kuta, Badung', lat: -8.6912, lon: 115.1574, icon: '🌴' },
 { name: 'Ubud', sub: 'Ubud, Gianyar, Bali', lat: -8.5069, lon: 115.2625, icon: '🎨' },
 { name: 'Renon', sub: 'Renon, Denpasar Selatan', lat: -8.6710, lon: 115.2340, icon: '🏢' },
 { name: 'Canggu', sub: 'Canggu, Kuta Utara, Badung', lat: -8.6478, lon: 115.1385, icon: '🏄' },
 { name: 'Jimbaran', sub: 'Jimbaran, Kuta Selatan, Badung', lat: -8.7700, lon: 115.1650, icon: '🦐' },
 { name: 'Denpasar', sub: 'Kota Denpasar, Bali', lat: -8.6500, lon: 115.2167, icon: '🏙️' },
 { name: 'Singaraja', sub: 'Kota Singaraja, Buleleng, Bali', lat: -8.1120, lon: 115.0882, icon: '🏛️' },
 { name: 'Tabanan', sub: 'Kota Tabanan, Bali', lat: -8.5410, lon: 115.1250, icon: '🌾' },
 { name: 'Gianyar', sub: 'Kota Gianyar, Bali', lat: -8.5364, lon: 115.3213, icon: '🎭' },
 { name: 'Halte A', sub: 'Halte A - Gatot Subroto / Ubung', lat: -8.6355, lon: 115.2015, icon: '🚏' },
 { name: 'Halte B', sub: 'Halte B - Lapangan Puputan Badung', lat: -8.6565, lon: 115.2185, icon: '🚏' },
 { name: 'Halte C', sub: 'Halte C - Sanur Matahari Terbit', lat: -8.6750, lon: 115.2600, icon: '🚏' },
 { name: 'Halte D', sub: 'Halte D - Renon / Bajra Sandhi', lat: -8.6710, lon: 115.2340, icon: '🚏' },
 { name: 'Halte E', sub: 'Halte E - Nusa Dua Benoa', lat: -8.7890, lon: 115.2150, icon: '🚏' },
 { name: 'Terminal Mengwi', sub: 'Terminal Tipe A Mengwi, Badung', lat: -8.5700, lon: 115.1750, icon: '🚏' },
 { name: 'Tanah Lot', sub: 'Pura Tanah Lot, Tabanan', lat: -8.6211, lon: 115.0868, icon: '⛩️' },
 { name: 'GWK', sub: 'Garuda Wisnu Kencana, Ungasan, Badung', lat: -8.8104, lon: 115.1676, icon: '🗿' },
 { name: 'Pasar Badung', sub: 'Pasar Tradisional Badung, Denpasar', lat: -8.6566, lon: 115.2132, icon: '🛒' },
 { name: 'RSUP Sanglah', sub: 'Rumah Sakit Umum Pusat Sanglah, Denpasar', lat: -8.6738, lon: 115.2230, icon: '🏥' }
];

let autocompleteDebounceTimers = {};

function searchPopularLocations(query) {
 if (!query || query.length < 2) return [];
 const q = query.toLowerCase().trim();
 return POPULAR_LOCATIONS.filter(loc =>
  loc.name.toLowerCase().includes(q) ||
  loc.sub.toLowerCase().includes(q)
 ).slice(0, 6);
}

async function geocodeOnline(query) {
 if (!query || query.length < 3) return [];
 const results = [];
 try {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), 3500);
  const encoded = encodeURIComponent(query + ' Bali Indonesia');
  const res = await fetch(`https://photon.komoot.io/api/?q=${encoded}&limit=5&lang=id&lat=-8.65&lon=115.20`, {
   signal: ctrl.signal,
   headers: { 'Accept': 'application/json' }
  });
  clearTimeout(tid);
  if (res.ok) {
   const data = await res.json();
   if (data.features) {
    data.features.forEach(f => {
     const p = f.properties || {};
     const coords = f.geometry?.coordinates;
     if (coords) {
      const mainName = p.name || p.street || query;
      const parts = [p.street, p.district, p.city, p.county, p.state].filter(Boolean);
      const subText = parts.join(', ') || (p.country || 'Bali, Indonesia');
      results.push({
       name: mainName,
       sub: subText,
       lat: coords[1],
       lon: coords[0],
       icon: '📍',
       source: 'online'
      });
     }
    });
   }
  }
 } catch (e) {
  console.warn('Geocode Photon error:', e);
 }

 if (results.length === 0) {
  try {
   const ctrl2 = new AbortController();
   const tid2 = setTimeout(() => ctrl2.abort(), 3500);
   const encoded2 = encodeURIComponent(query);
   const res2 = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encoded2}+Bali&limit=5&addressdetails=1&countrycodes=id`, {
    signal: ctrl2.signal,
    headers: { 'Accept': 'application/json' }
   });
   clearTimeout(tid2);
   if (res2.ok) {
    const data2 = await res2.json();
    data2.forEach(item => {
     const a = item.address || {};
     const mainName = a.tourism || a.building || a.road || item.display_name?.split(',')[0] || query;
     const subParts = [a.suburb, a.city_district, a.city, a.county, a.state].filter(Boolean);
     results.push({
      name: mainName,
      sub: subParts.join(', ') || 'Bali, Indonesia',
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      icon: '📍',
      source: 'online'
     });
    });
   }
  } catch (e2) {
   console.warn('Geocode Nominatim error:', e2);
  }
 }

 return results;
}

function renderAutocompleteDropdown(dropdownEl, items, inputEl, onSelect) {
 if (!dropdownEl) return;
 if (!items || items.length === 0) {
  dropdownEl.innerHTML = '<div class="autocomplete-empty">Tidak ditemukan. Coba kata kunci lain.</div>';
  dropdownEl.style.display = 'block';
  return;
 }

 dropdownEl.innerHTML = items.map((item, i) => `
  <div class="autocomplete-item" data-index="${i}" tabindex="0">
   <span class="autocomplete-icon">${item.icon || '📍'}</span>
   <div>
    <div class="autocomplete-main">${item.name}${item.source === 'online' ? '<span class="autocomplete-badge">Google Maps</span>' : ''}</div>
    <div class="autocomplete-sub">${item.sub || ''}</div>
   </div>
  </div>
 `).join('');
 dropdownEl.style.display = 'block';

 dropdownEl.querySelectorAll('.autocomplete-item').forEach(el => {
  const handler = () => {
   const idx = parseInt(el.dataset.index);
   const selected = items[idx];
   if (selected && inputEl) {
    inputEl.value = selected.name;
    inputEl.dataset.lat = selected.lat;
    inputEl.dataset.lon = selected.lon;
    inputEl.dataset.name = selected.name;
    delete inputEl.dataset.gps;
    dropdownEl.style.display = 'none';
    if (onSelect) onSelect(selected);
   }
  };
  el.addEventListener('click', handler);
  el.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') handler(); });
 });
}

function setupAddressAutocomplete(inputId, dropdownId) {
 const inputEl = document.getElementById(inputId);
 const dropdownEl = document.getElementById(dropdownId);
 if (!inputEl || !dropdownEl) return;

 const onSelectLocation = (selected) => {
  if (liveMap) {
   liveMap.flyTo([selected.lat, selected.lon], 14, { duration: 0.8 });
  }

  const oEl = document.getElementById('origin');
  const dEl = document.getElementById('destination');
  const oVal = oEl?.value?.trim();
  const dVal = dEl?.value?.trim();
  if (oVal && dVal && oEl.dataset.lat && dEl.dataset.lat) {
   updateLiveRouteOnMap(oVal, dVal);
   const qr = document.getElementById('quickResult');
   if (qr) qr.style.display = 'block';
   updateTrip(oVal, dVal, 'quick');
  }
 };

 inputEl.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (autocompleteDebounceTimers[inputId]) {
   clearTimeout(autocompleteDebounceTimers[inputId]);
  }

  delete inputEl.dataset.lat;
  delete inputEl.dataset.lon;
  delete inputEl.dataset.name;
  delete inputEl.dataset.gps;

  if (!query || query.length < 2) {
   dropdownEl.style.display = 'none';
   dropdownEl.innerHTML = '';
   return;
  }

  const localResults = searchPopularLocations(query);
  if (localResults.length > 0) {
   renderAutocompleteDropdown(dropdownEl, localResults, inputEl, onSelectLocation);
  }

  autocompleteDebounceTimers[inputId] = setTimeout(async () => {
   dropdownEl.innerHTML = '<div class="autocomplete-loading">🔍 Mencari lokasi di Google Maps...</div>';
   dropdownEl.style.display = 'block';

   const onlineResults = await geocodeOnline(query);

   const combined = [...localResults];
   const existingNames = new Set(localResults.map(l => l.name.toLowerCase()));
   onlineResults.forEach(r => {
    if (!existingNames.has(r.name.toLowerCase())) {
     combined.push(r);
     existingNames.add(r.name.toLowerCase());
    }
   });

   if (inputEl.value.trim().toLowerCase().includes(query.toLowerCase())) {
    renderAutocompleteDropdown(dropdownEl, combined.slice(0, 8), inputEl, onSelectLocation);
   }
  }, 350);
 });

 inputEl.addEventListener('focus', () => {
  const query = inputEl.value.trim();
  if (query.length >= 2) {
   const localResults = searchPopularLocations(query);
   if (localResults.length > 0) {
    renderAutocompleteDropdown(dropdownEl, localResults, inputEl, onSelectLocation);
   }
  }
 });

 document.addEventListener('click', (e) => {
  if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
   dropdownEl.style.display = 'none';
  }
 });
}


const CORRIDOR_DATA = {
 k1: {
  name: 'Koridor 1 (Poltrada - Ubung - Puputan)',
  color: '#1677f9',
  stops: ['Halte A', 'Halte B'],
  coords: [
   [-8.5445, 115.1147],
   [-8.5720, 115.1430],
   [-8.5980, 115.1710],
   [-8.6210, 115.1870],
   [-8.6305, 115.1972],
   [-8.6355, 115.2015],
   [-8.6480, 115.2100],
   [-8.6565, 115.2185]
  ]
 },
 k3: {
  name: 'Koridor 3 (Ubung - Renon - Sanur)',
  color: '#0f9f91',
  stops: ['Halte A', 'Halte C', 'Halte D'],
  coords: [
   [-8.6305, 115.1972],
   [-8.6355, 115.2015],
   [-8.6480, 115.2150],
   [-8.6620, 115.2260],
   [-8.6710, 115.2340],
   [-8.6730, 115.2470],
   [-8.6750, 115.2600]
  ]
 },
 k5: {
  name: 'Koridor 5 (Puputan - Kuta - Nusa Dua)',
  color: '#8050cf',
  stops: ['Halte B', 'Halte E'],
  coords: [
   [-8.6565, 115.2185],
   [-8.6850, 115.2190],
   [-8.7200, 115.1900],
   [-8.7500, 115.1950],
   [-8.7890, 115.2150],
   [-8.8000, 115.2300]
  ]
 }
};

const STOPS_DATA = [
 { id: 'stopA', name: 'Halte A', subtitle: 'Gatot Subroto / Ubung', coords: [-8.6355, 115.2015], corridors: ['Koridor 1', 'Koridor 3'] },
 { id: 'stopB', name: 'Halte B', subtitle: 'Lapangan Puputan Badung', coords: [-8.6565, 115.2185], corridors: ['Koridor 1', 'Koridor 5'] },
 { id: 'stopC', name: 'Halte C', subtitle: 'Sanur Matahari Terbit', coords: [-8.6750, 115.2600], corridors: ['Koridor 3'] },
 { id: 'stopD', name: 'Halte D', subtitle: 'Renon / Bajra Sandhi', coords: [-8.6710, 115.2340], corridors: ['Koridor 3'] },
 { id: 'stopE', name: 'Halte E', subtitle: 'Nusa Dua Benoa', coords: [-8.7890, 115.2150], corridors: ['Koridor 5'] }
];

const LIVE_BUSES = [
 { id: 'Bus 01', corridorKey: 'k1', name: 'Bus 01 · Koridor 1', colorClass: 'corridor-1', stepIndex: 2, direction: 1, speed: '34 km/jam', eta: '4 mnt', occ: '48%' },
 { id: 'Bus 03', corridorKey: 'k3', name: 'Bus 03 · Koridor 3', colorClass: 'corridor-3', stepIndex: 1, direction: 1, speed: '28 km/jam', eta: '9 mnt', occ: '72%' },
 { id: 'Bus 07', corridorKey: 'k5', name: 'Bus 07 · Koridor 5', colorClass: 'corridor-5', stepIndex: 3, direction: 1, speed: '38 km/jam', eta: '13 mnt', occ: '35%' }
];

let liveMap = null;
let userLiveMarker = null;
let userLiveCircle = null;
let currentUserCoords = null;
let liveRouteLayerGroup = null;
let corridorPolylineLayers = {};
let liveBusMarkers = [];
let busMoveInterval = null;
let watchGpsId = null;

function calcDistanceKm(lat1, lon1, lat2, lon2) {
 const R = 6371;
 const dLat = (lat2 - lat1) * Math.PI / 180;
 const dLon = (lon2 - lon1) * Math.PI / 180;
 const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
           Math.sin(dLon / 2) * Math.sin(dLon / 2);
 return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function findClosestStop(lat, lon) {
 let nearest = STOPS_DATA[0];
 let minD = Infinity;
 for (const s of STOPS_DATA) {
  const d = calcDistanceKm(lat, lon, s.coords[0], s.coords[1]);
  if (d < minD) { minD = d; nearest = s; }
 }
 return nearest;
}

function getCoordsByName(name) {
 if (!name) return null;
 const clean = name.trim();
 if (BALI_COORDINATES[clean]) return BALI_COORDINATES[clean];
 for (const k of Object.keys(BALI_COORDINATES)) {
  if (clean.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(clean.toLowerCase())) {
   return BALI_COORDINATES[k];
  }
 }
 return null;
}

function extractSubPath(points, startCoord, endCoord) {
 let idxA = 0, minA = Infinity;
 let idxB = points.length - 1, minB = Infinity;
 points.forEach((p, i) => {
  const dA = calcDistanceKm(p[0], p[1], startCoord[0], startCoord[1]);
  if (dA < minA) { minA = dA; idxA = i; }
  const dB = calcDistanceKm(p[0], p[1], endCoord[0], endCoord[1]);
  if (dB < minB) { minB = dB; idxB = i; }
 });
 if (idxA <= idxB) {
  return points.slice(idxA, idxB + 1);
 } else {
  return points.slice(idxB, idxA + 1).reverse();
 }
}

window.setTripPoint = function(field, name) {
 const el = document.getElementById(field);
 if (el) {
  el.value = name;
  const coords = getCoordsByName(name);
  if (coords) { el.dataset.lat = coords[0]; el.dataset.lon = coords[1]; el.dataset.name = name; }
  showToast(`${name} dipilih sebagai lokasi ${field === 'origin' ? 'asal' : 'tujuan'}.`);
  const o = document.getElementById('origin')?.value || '';
  const d = document.getElementById('destination')?.value || '';
  if (o && d) { updateTrip(o, d, 'quick'); const qr = document.getElementById('quickResult'); if(qr) qr.style.display = 'block'; }
 }
};

function initLiveMap() {
 const mapEl = document.getElementById('mainMap');
 if (!mapEl) return;

 mapEl.innerHTML = '';

 if (typeof L === 'undefined') {
  mapEl.innerHTML = mapSvg('main');
  return;
 }

 liveMap = L.map('mainMap', {
  center: [-8.6355, 115.2015],
  zoom: 12,
  minZoom: 3,
  zoomControl: true,
  attributionControl: false
 });

 const mapTileLayers = {
  google: L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
   maxZoom: 20,
   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
   attribution: '© Google Maps'
  }),
  terrain: L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
   maxZoom: 20,
   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
   attribution: '© Google Maps'
  }),
  osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '© OpenStreetMap'
  })
 };

 let currentTileLayer = mapTileLayers.google.addTo(liveMap);

 liveRouteLayerGroup = L.featureGroup().addTo(liveMap);

 Object.keys(CORRIDOR_DATA).forEach(key => {
  const c = CORRIDOR_DATA[key];
  const polyline = L.polyline(c.coords, {
   color: c.color,
   weight: 5,
   opacity: 0.65,
   lineCap: 'round',
   lineJoin: 'round'
  }).addTo(liveMap);

  polyline.bindTooltip(`<b>${c.name}</b>`, { sticky: true });
  corridorPolylineLayers[key] = polyline;
 });

 STOPS_DATA.forEach(stop => {
  const icon = L.divIcon({
   className: 'custom-stop-marker',
   html: `<div class="stop-leaflet-icon" title="${stop.name}: ${stop.subtitle}">🚏</div>`,
   iconSize: [24, 24],
   iconAnchor: [12, 12]
  });

  const marker = L.marker(stop.coords, { icon }).addTo(liveMap);
  marker.bindPopup(`
   <div style="font-family:inherit;min-width:160px">
    <strong style="font-size:12px;color:#102a56">${stop.name}</strong><br>
    <small style="color:#72819a">${stop.subtitle}</small>
    <div style="margin:6px 0;font-size:10px;font-weight:700;color:#1677f9">
     Layanan: ${stop.corridors.join(', ')}
    </div>
    <div style="display:flex;gap:5px;margin-top:6px">
     <button style="flex:1;background:#eaf3ff;border:1px solid #cde1ff;color:#1677f9;border-radius:5px;padding:3px;font-size:9px;font-weight:700;cursor:pointer" onclick="setTripPoint('origin', '${stop.name}')">Jadikan Asal</button>
     <button style="flex:1;background:#e4f8ef;border:1px solid #b8edd7;color:#109568;border-radius:5px;padding:3px;font-size:9px;font-weight:700;cursor:pointer" onclick="setTripPoint('destination', '${stop.name}')">Jadikan Tujuan</button>
    </div>
   </div>
  `);
 });

 initMovingBuses();
 trackUserLiveLocation();

 const btnRecenter = document.getElementById('btnMapRecenter');
 if (btnRecenter) {
  btnRecenter.addEventListener('click', () => {
   if (currentUserCoords) {
    liveMap.flyTo(currentUserCoords, 15, { duration: 1 });
    if (userLiveMarker) userLiveMarker.openPopup();
    showToast('Peta dipusatkan ke lokasi aktual Anda.');
   } else {
    showToast('Mencari koordinat GPS aktual...');
    trackUserLiveLocation(true);
   }
  });
 }

 const btnFitRoute = document.getElementById('btnMapFitRoute');
 if (btnFitRoute) {
  btnFitRoute.addEventListener('click', () => {
   if (liveRouteLayerGroup && liveRouteLayerGroup.getLayers().length > 0) {
    liveMap.fitBounds(liveRouteLayerGroup.getBounds(), { padding: [45, 45] });
    showToast('Peta disesuaikan dengan rute perjalanan Anda.');
   } else {
    showToast('Belum ada rute aktif.');
   }
  });
 }

 const btnCloseMro = document.getElementById('btnCloseMro');
 if (btnCloseMro) {
  btnCloseMro.addEventListener('click', () => {
   const overlay = document.getElementById('mapRouteOverlay');
   if (overlay) overlay.style.display = 'none';
  });
 }

 const filterSelect = document.getElementById('mapRouteFilter');
 if (filterSelect) {
  filterSelect.addEventListener('change', (e) => {
   const val = e.target.value;
   Object.keys(corridorPolylineLayers).forEach(k => {
    if (val === 'all' || val === k) {
     liveMap.addLayer(corridorPolylineLayers[k]);
    } else {
     liveMap.removeLayer(corridorPolylineLayers[k]);
    }
   });
   liveBusMarkers.forEach(bm => {
    if (val === 'all' || val === bm.data.corridorKey) {
     liveMap.addLayer(bm.marker);
    } else {
     liveMap.removeLayer(bm.marker);
    }
   });
   showToast(val === 'all' ? 'Semua koridor ditampilkan di peta.' : `Filter koridor ${val.toUpperCase()} diterapkan.`);
  });
 }

 const mapTypeFilter = document.getElementById('mapTypeFilter');
 if (mapTypeFilter) {
  mapTypeFilter.addEventListener('change', (e) => {
   const selected = e.target.value;
   if (mapTileLayers[selected]) {
    if (currentTileLayer) liveMap.removeLayer(currentTileLayer);
    currentTileLayer = mapTileLayers[selected].addTo(liveMap);
    currentTileLayer.bringToBack();
    const names = { google: 'Google Maps (Roadmap)', terrain: 'Google Medan (Terrain)', osm: 'OpenStreetMap' };
    showToast(`Peta diubah ke ${names[selected] || selected}.`);
   }
  });
 }

 const initialOrigin = document.getElementById('origin')?.value?.trim();
 const initialDest = document.getElementById('destination')?.value?.trim();
 if (initialOrigin && initialDest) {
  updateLiveRouteOnMap(initialOrigin, initialDest);
 }

 setTimeout(() => { if (liveMap) liveMap.invalidateSize(); }, 400);
}

function initMovingBuses() {
 if (busMoveInterval) clearInterval(busMoveInterval);

 liveBusMarkers = LIVE_BUSES.map(b => {
  const coordsList = CORRIDOR_DATA[b.corridorKey].coords;
  const initialCoords = coordsList[b.stepIndex];

  const icon = L.divIcon({
   className: 'custom-bus-marker',
   html: `<div class="bus-leaflet-icon ${b.colorClass}"><span>🚌</span> ${b.id}</div>`,
   iconSize: [68, 22],
   iconAnchor: [34, 11]
  });

  const marker = L.marker(initialCoords, { icon, zIndexOffset: 500 }).addTo(liveMap);
  marker.bindPopup(`
   <div style="font-family:inherit;min-width:160px">
    <strong style="color:#102a56;font-size:12px">${b.name}</strong>
    <div style="margin:5px 0;font-size:10px;color:#536784;line-height:1.5">
     Kecepatan: <strong>${b.speed}</strong><br>
     ETA Halte A: <strong>${b.eta}</strong><br>
     Keterisian: <strong>${b.occ}</strong>
    </div>
    <span class="status green" style="font-size:9px">Beroperasi Live</span>
   </div>
  `);
  return { marker, data: b };
 });

 busMoveInterval = setInterval(() => {
  liveBusMarkers.forEach(bm => {
   const b = bm.data;
   const coordsList = CORRIDOR_DATA[b.corridorKey].coords;
   b.stepIndex += b.direction;
   if (b.stepIndex >= coordsList.length - 1) {
    b.stepIndex = coordsList.length - 1;
    b.direction = -1;
   } else if (b.stepIndex <= 0) {
    b.stepIndex = 0;
    b.direction = 1;
   }
   bm.marker.setLatLng(coordsList[b.stepIndex]);
  });
 }, 2500);
}

function trackUserLiveLocation(recenter = false) {
 if (!navigator.geolocation) {
  setUserMarker([-8.5445, 115.1147], 15, true);
  return;
 }

 navigator.geolocation.getCurrentPosition(
  (pos) => {
   const lat = pos.coords.latitude;
   const lon = pos.coords.longitude;
   const acc = Math.round(pos.coords.accuracy || 15);
   currentUserCoords = [lat, lon];
   setUserMarker([lat, lon], acc, false);
   if (recenter && liveMap) {
    liveMap.flyTo([lat, lon], 15);
   }
  },
  (err) => {
   console.warn('GPS initial position error:', err);
   currentUserCoords = [-8.5445, 115.1147];
   setUserMarker(currentUserCoords, 20, true);
  },
  { enableHighAccuracy: true, timeout: 8000, maximumAge: 10000 }
 );

 if (!watchGpsId && navigator.geolocation.watchPosition) {
  watchGpsId = navigator.geolocation.watchPosition(
   (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const acc = Math.round(pos.coords.accuracy || 15);
    currentUserCoords = [lat, lon];
    setUserMarker([lat, lon], acc, false);
   },
   () => {},
   { enableHighAccuracy: true, maximumAge: 15000 }
  );
 }
}

function setUserMarker(coords, accuracy, isSimulated) {
 if (!liveMap) return;

 const icon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div class="user-gps-container"><div class="user-gps-pulse"></div><div class="user-gps-core"></div></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
 });

 const popupContent = `
  <div style="font-family:inherit;min-width:180px">
   <div style="font-weight:800;color:#1677f9;font-size:12px;margin-bottom:3px">
    📍 Lokasi Aktual Anda ${isSimulated ? '(Simulasi GPS)' : '(GPS Real-Time)'}
   </div>
   <div style="color:#536784;font-size:10px;line-height:1.4">
    Koordinat: ${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}<br>
    Akurasi: ±${accuracy} meter
   </div>
   <div style="margin-top:6px;display:flex;gap:5px">
    <button style="flex:1;background:#eaf3ff;border:1px solid #cde1ff;color:#1677f9;border-radius:6px;padding:4px 6px;font-size:9px;font-weight:700;cursor:pointer" onclick="useCurrentLocation('origin')">Gunakan sbg Asal</button>
    <button style="flex:1;background:#e4f8ef;border:1px solid #b8edd7;color:#109568;border-radius:6px;padding:4px 6px;font-size:9px;font-weight:700;cursor:pointer" onclick="useCurrentLocation('destination')">Gunakan sbg Tujuan</button>
   </div>
  </div>
 `;

 if (!userLiveMarker) {
  userLiveMarker = L.marker(coords, { icon, zIndexOffset: 1000 }).addTo(liveMap);
  userLiveCircle = L.circle(coords, {
   radius: Math.min(accuracy, 120),
   color: '#1677f9',
   fillColor: '#1677f9',
   fillOpacity: 0.12,
   weight: 1
  }).addTo(liveMap);
 } else {
  userLiveMarker.setLatLng(coords);
  if (userLiveCircle) {
   userLiveCircle.setLatLng(coords);
   userLiveCircle.setRadius(Math.min(accuracy, 120));
  }
 }

 userLiveMarker.bindPopup(popupContent);
}

function updateLiveRouteOnMap(origin, destination) {
 if (!liveMap || !liveRouteLayerGroup) return;

 liveRouteLayerGroup.clearLayers();

 if (!origin || !origin.trim() || !destination || !destination.trim()) {
  const overlay = document.getElementById('mapRouteOverlay');
  if (overlay) overlay.style.display = 'none';
  return;
 }

 let originCoords = null;
 const oEl = document.getElementById('origin');
 if (oEl && oEl.dataset.lat && oEl.dataset.lon) {
  originCoords = [parseFloat(oEl.dataset.lat), parseFloat(oEl.dataset.lon)];
 } else if (origin.includes('Titik Sekarang') || origin.includes('GPS') || origin.includes('Lokasi Saya')) {
  originCoords = currentUserCoords || [-8.5445, 115.1147];
 } else {
  originCoords = getCoordsByName(origin) || (currentUserCoords || [-8.5445, 115.1147]);
 }

 let destCoords = null;
 const dEl = document.getElementById('destination');
 if (dEl && dEl.dataset.lat && dEl.dataset.lon) {
  destCoords = [parseFloat(dEl.dataset.lat), parseFloat(dEl.dataset.lon)];
 } else if (destination.includes('Titik Sekarang') || destination.includes('GPS') || destination.includes('Lokasi Saya')) {
  destCoords = currentUserCoords || [-8.6305, 115.1972];
 } else {
  destCoords = getCoordsByName(destination) || [-8.6305, 115.1972];
 }

 const nearestBoardingStop = findClosestStop(originCoords[0], originCoords[1]);
 const nearestDropOffStop = findClosestStop(destCoords[0], destCoords[1]);

 let corridorKey = 'k1';
 let corridorName = 'Koridor 1';
 let busName = 'Bus 01';
 if (destination.toLowerCase().includes('sanur')) {
  corridorKey = 'k3';
  corridorName = 'Koridor 3';
  busName = 'Bus 03';
 } else if (destination.toLowerCase().includes('nusa dua')) {
  corridorKey = 'k5';
  corridorName = 'Koridor 5';
  busName = 'Bus 07';
 }

 const corridorPoints = CORRIDOR_DATA[corridorKey]?.coords || CORRIDOR_DATA.k1.coords;
 const transitSegment = extractSubPath(corridorPoints, nearestBoardingStop.coords, nearestDropOffStop.coords);

 // Marker Asal (Pin A Hijau)
 const originPinIcon = L.divIcon({
  className: 'custom-endpoint-marker',
  html: `<div class="route-endpoint-pin origin" title="Titik Asal: ${origin}"><span>A</span></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26]
 });
 const originMarker = L.marker(originCoords, { icon: originPinIcon });
 originMarker.bindPopup(`<b>Titik Keberangkatan</b><br>${origin}`);
 liveRouteLayerGroup.addLayer(originMarker);

 // Marker Tujuan (Pin B Merah)
 const destPinIcon = L.divIcon({
  className: 'custom-endpoint-marker',
  html: `<div class="route-endpoint-pin dest" title="Titik Tujuan: ${destination}"><span>B</span></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26]
 });
 const destMarker = L.marker(destCoords, { icon: destPinIcon });
 destMarker.bindPopup(`<b>Titik Tujuan</b><br>${destination}`);
 liveRouteLayerGroup.addLayer(destMarker);

 // Segmen 1: Jalan Kaki ke Halte
 const walkToStopPolyline = L.polyline([originCoords, nearestBoardingStop.coords], {
  color: '#1677f9',
  weight: 4,
  dashArray: '6, 8',
  opacity: 0.85
 });
 const distWalk1 = Math.round(calcDistanceKm(originCoords[0], originCoords[1], nearestBoardingStop.coords[0], nearestBoardingStop.coords[1]) * 1000);
 walkToStopPolyline.bindTooltip(`🚶 Jalan kaki ke ${nearestBoardingStop.name} (±${distWalk1} m)`, { sticky: true });
 liveRouteLayerGroup.addLayer(walkToStopPolyline);

 // Segmen 2: Rute Bus Transit Koridor (Glow + Line)
 const transitGlow = L.polyline(transitSegment, {
  color: '#109568',
  weight: 11,
  opacity: 0.35,
  lineCap: 'round',
  lineJoin: 'round'
 });
 liveRouteLayerGroup.addLayer(transitGlow);

 const transitLine = L.polyline(transitSegment, {
  color: '#109568',
  weight: 6,
  opacity: 0.95,
  lineCap: 'round',
  lineJoin: 'round'
 });
 transitLine.bindTooltip(`🚌 RUTE BUS: Naik ${corridorName} (${busName})`, { sticky: true });
 liveRouteLayerGroup.addLayer(transitLine);

 // Segmen 3: Jalan Kaki ke Tujuan Akhir jika terpisah
 const distDropToDest = calcDistanceKm(nearestDropOffStop.coords[0], nearestDropOffStop.coords[1], destCoords[0], destCoords[1]);
 if (distDropToDest > 0.05) {
  const walkToDestPolyline = L.polyline([nearestDropOffStop.coords, destCoords], {
   color: '#e75d67',
   weight: 4,
   dashArray: '6, 8',
   opacity: 0.85
  });
  walkToDestPolyline.bindTooltip(`🚶 Jalan kaki ke tujuan akhir (±${Math.round(distDropToDest * 1000)} m)`, { sticky: true });
  liveRouteLayerGroup.addLayer(walkToDestPolyline);
 }

 updateMapRouteOverlay(origin, destination, nearestBoardingStop, nearestDropOffStop, corridorName, busName);

 if (liveRouteLayerGroup.getLayers().length > 0) {
  liveMap.fitBounds(liveRouteLayerGroup.getBounds(), { padding: [55, 55], maxZoom: 15 });
 }
}

function updateMapRouteOverlay(origin, destination, boardingStop, dropStop, corridorName, busName) {
 const overlay = document.getElementById('mapRouteOverlay');
 const stepsContent = document.getElementById('mroStepsContent');
 const badge = document.getElementById('mroTimeBadge');
 if (!overlay || !stepsContent) return;

 const d = destData[destination] || destData['Terminal Ubung'];
 if (badge) badge.textContent = d.total + ' mnt';

 const cleanOrigin = origin.length > 28 ? origin.substring(0, 28) + '…' : origin;
 const cleanDest = destination.length > 28 ? destination.substring(0, 28) + '…' : destination;

 stepsContent.innerHTML = `
  <div class="mro-step">
   <span class="mro-badge walk">🚶 Jalan</span>
   <span>Dari <strong>${cleanOrigin}</strong> ke <strong>${boardingStop.name}</strong> (${d.walk} mnt)</span>
  </div>
  <div class="mro-step">
   <span class="mro-badge bus">🚌 Bus</span>
   <span>Naik <strong>${corridorName} (${busName})</strong> ke <strong>${dropStop.name}</strong> (${d.busmin} mnt)</span>
  </div>
  <div class="mro-step">
   <span class="mro-badge dest">🎯 Tiba</span>
   <span>Sampai di <strong>${cleanDest}</strong> · Est. tiba ${d.eta}</span>
  </div>
 `;
 overlay.style.display = 'block';
}

async function useCurrentLocation(targetField) {
 const isOrigin = targetField === 'origin';
 const inputEl = document.getElementById(targetField);
 const pillBtn = document.getElementById(isOrigin ? 'btnGpsOrigin' : 'btnGpsDestination');
 const iconBtn = document.getElementById(isOrigin ? 'btnGpsOriginIcon' : 'btnGpsDestIcon');
 const badgeEl = document.getElementById(isOrigin ? 'originGpsBadge' : 'destGpsBadge');
 const textSpan = pillBtn ? pillBtn.querySelector('.btn-gps-text') : null;

 if (pillBtn) {
  pillBtn.classList.add('loading');
  if (textSpan) textSpan.textContent = 'Mencari GPS...';
 }
 if (iconBtn) iconBtn.classList.add('loading');

 const onComplete = (success) => {
  if (pillBtn) {
   pillBtn.classList.remove('loading');
   if (success) {
    pillBtn.classList.add('active');
    if (textSpan) textSpan.textContent = '✓ GPS Aktif';
   } else {
    pillBtn.classList.remove('active');
    if (textSpan) textSpan.textContent = 'Gunakan GPS';
   }
  }
  if (iconBtn) {
   iconBtn.classList.remove('loading');
   if (success) iconBtn.classList.add('active');
   else iconBtn.classList.remove('active');
  }
 };

 const applyCoords = async (lat, lon, acc, isSim) => {
  currentUserCoords = [lat, lon];
  let placeName = null;
  if (!isSim) {
   try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 2000);
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16`, {
     signal: ctrl.signal,
     headers: { 'Accept': 'application/json' }
    });
    clearTimeout(tid);
    if (res.ok) {
     const data = await res.json();
     const a = data.address || {};
     placeName = a.road || a.suburb || a.city_district || a.village || a.city || (data.display_name ? data.display_name.split(',')[0] : null);
    }
   } catch (e) {}
  }

  const nearest = findClosestStop(lat, lon);
  if (!placeName) {
   if (isSim) {
    placeName = isOrigin ? 'Kampus Poltrada Bali' : 'Terminal Ubung';
   } else {
    placeName = `Dekat ${nearest.name}`;
   }
  }

  const displayText = placeName 
   ? `Titik Sekarang: ${placeName} (${lat.toFixed(4)}, ${lon.toFixed(4)})`
   : `Titik Sekarang (GPS: ${lat.toFixed(4)}, ${lon.toFixed(4)})`;

  if (inputEl) {
   inputEl.value = displayText;
   inputEl.dataset.lat = lat;
   inputEl.dataset.lon = lon;
   inputEl.dataset.gps = 'true';
   inputEl.dataset.name = placeName || 'Titik GPS';
  }

  if (badgeEl) {
   badgeEl.style.display = 'flex';
   badgeEl.innerHTML = `<span>📍 <strong>${isSim ? 'GPS Simulasi' : 'GPS Aktif'}:</strong> ${lat.toFixed(4)}, ${lon.toFixed(4)} (±${acc}m)</span><button type="button" class="gps-badge-reset" title="Hapus GPS" aria-label="Hapus GPS">✕</button>`;
   const resetBtn = badgeEl.querySelector('.gps-badge-reset');
   if (resetBtn) {
    resetBtn.onclick = () => {
     badgeEl.style.display = 'none';
     badgeEl.innerHTML = '';
     if (inputEl) {
      delete inputEl.dataset.lat;
      delete inputEl.dataset.lon;
      delete inputEl.dataset.gps;
      delete inputEl.dataset.name;
      inputEl.value = '';
     }
     if (pillBtn) {
      pillBtn.classList.remove('active');
      if (textSpan) textSpan.textContent = 'Gunakan GPS';
     }
     if (iconBtn) iconBtn.classList.remove('active');
     showToast(`Titik GPS ${isOrigin ? 'asal' : 'tujuan'} direset.`);
     if (liveMap) {
      const ov = document.getElementById('origin')?.value?.trim();
      const dv = document.getElementById('destination')?.value?.trim();
      if (ov && dv) updateLiveRouteOnMap(ov, dv);
      else liveRouteLayerGroup?.clearLayers();
     }
    };
   }
  }

  onComplete(true);
  showToast(`Lokasi ${isOrigin ? 'asal' : 'tujuan'} berhasil disetel ke titik GPS.`);

  if (liveMap) {
   setUserMarker([lat, lon], acc, isSim);
   const ov = document.getElementById('origin')?.value?.trim();
   const dv = document.getElementById('destination')?.value?.trim();
   if (ov && dv) updateLiveRouteOnMap(ov, dv);
  }
 };

 if (!navigator.geolocation) {
  showToast('Browser tidak mendukung Geolocation GPS. Menggunakan simulasi Poltrada Bali.');
  await applyCoords(isOrigin ? -8.5445 : -8.6305, isOrigin ? 115.1147 : 115.1972, 10, true);
  return;
 }

 navigator.geolocation.getCurrentPosition(
  async (pos) => {
   const c = pos.coords;
   await applyCoords(c.latitude, c.longitude, Math.round(c.accuracy || 15), false);
  },
  async (err) => {
   console.warn('Geolocation error:', err);
   let msg = 'Gagal mengakses sinyal GPS. Menggunakan titik simulasi.';
   if (err.code === 1) {
    msg = 'Izin lokasi tidak diberikan. Mengaktifkan titik simulasi GPS Poltrada Bali.';
   } else if (err.code === 3) {
    msg = 'Waktu pencarian GPS habis. Mengaktifkan titik simulasi GPS.';
   }
   showToast(msg);
   await applyCoords(isOrigin ? -8.5445 : -8.6305, isOrigin ? 115.1147 : 115.1972, 12, true);
  },
  { enableHighAccuracy: true, timeout: 7000, maximumAge: 30000 }
 );
}


function updateTrip(origin,destination,target){
 if(!origin||!destination){showToast('Isi lokasi asal dan tujuan terlebih dahulu.');return}
 if(origin.trim().toLowerCase()===destination.trim().toLowerCase()){showToast('Lokasi asal dan tujuan sama. Pilih tujuan lain.');return}

 let d=destData[destination];
 if(!d){
  for(const key of Object.keys(destData)){
   if(destination.toLowerCase().includes(key.toLowerCase())){
    d=destData[key];
    break;
   }
  }
 }

 const hasGps = origin.includes('GPS') || destination.includes('GPS') || origin.includes('Titik Sekarang') || destination.includes('Titik Sekarang');
 if(!d){
  d={
   stop: origin.toLowerCase().includes('halte') ? 'Halte Terdekat' : 'Halte A',
   corridor: 'Koridor 1',
   bus: 'Bus 01',
   walk: hasGps ? 4 : 5,
   busmin: 21,
   total: 30,
   eta: '08.28',
   price: 'Rp 5.000'
  };
 }

 try{localStorage.setItem('buswatch-last-trip',JSON.stringify({origin,destination,updated:new Date().toISOString(),details:d,hasGps}));}catch(e){}
 if(target==='quick'){
  const title=document.querySelector('#quickResult .route-title');if(title)title.textContent=`${origin} → ${destination}`;
  const meta=document.querySelector('#quickResult .route-meta');
  if(meta){
   meta.textContent = hasGps 
     ? `${d.stop} · ${d.corridor} langsung · Sinkronisasi posisi GPS real-time` 
     : `${d.stop} · ${d.corridor} · Tidak perlu transit`;
  }
  const total=document.getElementById('quickTotal');if(total)total.textContent=d.total+' menit';
  const arrival=document.getElementById('quickArrival');if(arrival)arrival.textContent=d.eta;
  showToast(hasGps ? 'Rute dihitung berdasarkan titik GPS saat ini.' : 'Rekomendasi perjalanan simulasi diperbarui.');
  if (liveMap) {
   updateLiveRouteOnMap(origin, destination);
  }
 }else{
  const desc=document.getElementById('plannerRouteDesc');if(desc)desc.textContent=`${d.stop} → ${destination}`;
  const strong=document.querySelector('#plannerResults .stop-card .stop-info strong');if(strong)strong.textContent=`Rute terbaik · ${d.corridor} langsung`;
  const small=document.querySelector('#plannerResults .stop-card .stop-info small');if(small)small.textContent=`Jalan kaki ${d.walk} menit · Bus ${d.busmin} menit · Tanpa transit`;
  const eta=document.querySelector('#plannerResults .stop-card .eta');if(eta)eta.textContent=d.total+' mnt';
  showToast('Hasil rute simulasi berhasil diperbarui.');
 }
}

const quickPlanner=document.getElementById('quickPlanner');if(quickPlanner)quickPlanner.addEventListener('submit',async e=>{
 e.preventDefault();
 const oEl=document.getElementById('origin');
 const dEl=document.getElementById('destination');
 const oVal=oEl?.value?.trim();
 const dVal=dEl?.value?.trim();

 if(!oVal||!dVal){showToast('Mohon isi lokasi asal dan tujuan terlebih dahulu.');return;}
 if(oVal.toLowerCase()===dVal.toLowerCase()){showToast('Lokasi asal dan tujuan sama. Pilih tujuan berbeda.');return;}

 // Auto-resolve coords if not yet set (user typed but didn't pick suggestion)
 if(oEl && (!oEl.dataset.lat || !oEl.dataset.lon)){
  const localMatch = searchPopularLocations(oVal);
  if(localMatch.length > 0){
   oEl.dataset.lat = localMatch[0].lat; oEl.dataset.lon = localMatch[0].lon; oEl.dataset.name = localMatch[0].name;
  } else {
   const coords = getCoordsByName(oVal);
   if(coords){ oEl.dataset.lat = coords[0]; oEl.dataset.lon = coords[1]; oEl.dataset.name = oVal; }
   else {
    showToast('Mencari koordinat asal...'); 
    const online = await geocodeOnline(oVal);
    if(online.length > 0){ oEl.dataset.lat = online[0].lat; oEl.dataset.lon = online[0].lon; oEl.dataset.name = online[0].name; }
    else { showToast('Lokasi asal tidak ditemukan. Pilih dari saran yang muncul.'); return; }
   }
  }
 }
 if(dEl && (!dEl.dataset.lat || !dEl.dataset.lon)){
  const localMatch = searchPopularLocations(dVal);
  if(localMatch.length > 0){
   dEl.dataset.lat = localMatch[0].lat; dEl.dataset.lon = localMatch[0].lon; dEl.dataset.name = localMatch[0].name;
  } else {
   const coords = getCoordsByName(dVal);
   if(coords){ dEl.dataset.lat = coords[0]; dEl.dataset.lon = coords[1]; dEl.dataset.name = dVal; }
   else {
    showToast('Mencari koordinat tujuan...');
    const online = await geocodeOnline(dVal);
    if(online.length > 0){ dEl.dataset.lat = online[0].lat; dEl.dataset.lon = online[0].lon; dEl.dataset.name = online[0].name; }
    else { showToast('Lokasi tujuan tidak ditemukan. Pilih dari saran yang muncul.'); return; }
   }
  }
 }

 const qr = document.getElementById('quickResult');
 if(qr) qr.style.display = 'block';
 updateTrip(oVal, dVal, 'quick');
});

const btnGpsOrigin=document.getElementById('btnGpsOrigin');if(btnGpsOrigin)btnGpsOrigin.addEventListener('click',()=>useCurrentLocation('origin'));
const btnGpsOriginIcon=document.getElementById('btnGpsOriginIcon');if(btnGpsOriginIcon)btnGpsOriginIcon.addEventListener('click',()=>useCurrentLocation('origin'));
const btnGpsDestination=document.getElementById('btnGpsDestination');if(btnGpsDestination)btnGpsDestination.addEventListener('click',()=>useCurrentLocation('destination'));
const btnGpsDestIcon=document.getElementById('btnGpsDestIcon');if(btnGpsDestIcon)btnGpsDestIcon.addEventListener('click',()=>useCurrentLocation('destination'));
const quickGpsOrigin=document.getElementById('quickGpsOrigin');if(quickGpsOrigin)quickGpsOrigin.addEventListener('click',()=>useCurrentLocation('origin'));
const quickGpsDest=document.getElementById('quickGpsDest');if(quickGpsDest)quickGpsDest.addEventListener('click',()=>useCurrentLocation('destination'));

const swapLocationsBtn=document.getElementById('swapLocationsBtn');
if(swapLocationsBtn){
 swapLocationsBtn.addEventListener('click',()=>{
  const o=document.getElementById('origin'), d=document.getElementById('destination');
  if(!o||!d)return;
  const tempVal=o.value; o.value=d.value; d.value=tempVal;
  const oData={lat:o.dataset.lat,lon:o.dataset.lon,gps:o.dataset.gps,name:o.dataset.name};
  const dData={lat:d.dataset.lat,lon:d.dataset.lon,gps:d.dataset.gps,name:d.dataset.name};
  if(dData.gps){o.dataset.lat=dData.lat;o.dataset.lon=dData.lon;o.dataset.gps=dData.gps;o.dataset.name=dData.name;}
  else{delete o.dataset.lat;delete o.dataset.lon;delete o.dataset.gps;delete o.dataset.name;}
  if(oData.gps){d.dataset.lat=oData.lat;d.dataset.lon=oData.lon;d.dataset.gps=oData.gps;d.dataset.name=oData.name;}
  else{delete d.dataset.lat;delete d.dataset.lon;delete d.dataset.gps;delete d.dataset.name;}
  refreshGpsBadge('origin');
  refreshGpsBadge('destination');
  showToast('Lokasi asal dan tujuan berhasil ditukar.');
  if (liveMap) {
   updateLiveRouteOnMap(o.value, d.value);
  }
 });
}

function refreshGpsBadge(fieldId){
 const inputEl=document.getElementById(fieldId);
 const badgeEl=document.getElementById(fieldId==='origin'?'originGpsBadge':'destGpsBadge');
 const pillBtn=document.getElementById(fieldId==='origin'?'btnGpsOrigin':'btnGpsDestination');
 const iconBtn=document.getElementById(fieldId==='origin'?'btnGpsOriginIcon':'btnGpsDestIcon');
 const textSpan=pillBtn?.querySelector('.btn-gps-text');
 if(inputEl&&inputEl.dataset.gps&&inputEl.dataset.lat){
  if(badgeEl){
   badgeEl.style.display='flex';
   badgeEl.innerHTML=`<span>📍 <strong>GPS Aktif:</strong> ${parseFloat(inputEl.dataset.lat).toFixed(4)}, ${parseFloat(inputEl.dataset.lon).toFixed(4)}</span><button type="button" class="gps-badge-reset" title="Hapus GPS" aria-label="Hapus GPS">✕</button>`;
   badgeEl.querySelector('.gps-badge-reset')?.addEventListener('click',()=>{
    badgeEl.style.display='none';badgeEl.innerHTML='';
    delete inputEl.dataset.lat;delete inputEl.dataset.lon;delete inputEl.dataset.gps;delete inputEl.dataset.name;
    inputEl.value='';
    if(pillBtn){pillBtn.classList.remove('active');if(textSpan)textSpan.textContent='Gunakan GPS';}
    if(iconBtn)iconBtn.classList.remove('active');
    showToast(`Titik GPS ${fieldId==='origin'?'asal':'tujuan'} direset.`);
    if (liveMap) {
     const ov=document.getElementById('origin')?.value?.trim();
     const dv=document.getElementById('destination')?.value?.trim();
     if(ov&&dv) updateLiveRouteOnMap(ov,dv); else liveRouteLayerGroup?.clearLayers();
    }
   });
  }
  if(pillBtn){pillBtn.classList.add('active');if(textSpan)textSpan.textContent='✓ GPS Aktif';}
  if(iconBtn)iconBtn.classList.add('active');
 }else{
  if(badgeEl){badgeEl.style.display='none';badgeEl.innerHTML='';}
  if(pillBtn){pillBtn.classList.remove('active');if(textSpan)textSpan.textContent='Gunakan GPS';}
  if(iconBtn)iconBtn.classList.remove('active');
 }
}

['origin','destination'].forEach(id=>{
 const el=document.getElementById(id);
 if(el){
  el.addEventListener('change',()=>{if(el.value==='Titik Sekarang (GPS)')useCurrentLocation(id);});
 }
});

const fullPlanner=document.getElementById('fullPlanner');if(fullPlanner){
 try{const last=JSON.parse(localStorage.getItem('buswatch-last-trip')||'null');if(last){const o=document.getElementById('origin2'),d=document.getElementById('destination2');if(o&&last.origin)o.value=last.origin;if(d&&last.destination)d.value=last.destination;}}catch(e){}
 fullPlanner.addEventListener('submit',e=>{e.preventDefault();updateTrip(document.getElementById('origin2').value.trim(),document.getElementById('destination2').value.trim(),'full')});
}
document.querySelectorAll('#priorityTabs .tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#priorityTabs .tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');const labels={fast:'Rute tercepat',walk:'Rute dengan berjalan kaki paling sedikit',transit:'Rute dengan transit paling sedikit',cheap:'Rute dengan biaya paling rendah'};const label=labels[b.dataset.priority]||'Rute terbaik';const card=document.querySelector('#plannerResults .stop-card .stop-info strong');if(card)card.textContent=label+' · Koridor 1';showToast('Prioritas diubah: '+label+'. (Data simulasi)')}));
document.querySelectorAll('.choose-stop').forEach(b=>b.addEventListener('click',()=>{const stop=b.dataset.stop||'Halte';try{localStorage.setItem('buswatch-selected-stop',stop)}catch(e){}const small=document.querySelector('#plannerResults .stop-card .stop-info small');if(small)small.textContent=stop+' dipilih · ETA bus mengikuti data simulasi.';showToast(stop+' dipilih sebagai titik naik.')}));
const stopSearch=document.getElementById('stopSearch');if(stopSearch)stopSearch.addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('#stopList .stop-card').forEach(el=>el.style.display=(el.dataset.search||el.textContent.toLowerCase()).includes(q)?'flex':'none')});
document.querySelectorAll('#noticeTabs .tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#noticeTabs .tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('#allNotices .notice').forEach(n=>n.style.display=(b.dataset.filter==='all'||n.dataset.type===b.dataset.filter)?'flex':'none')}));

const mapRouteFilter=document.getElementById('mapRouteFilter');
if(mapRouteFilter){
 mapRouteFilter.addEventListener('change',e=>{
  if (liveMap) return;
  const map=document.getElementById('mainMap');
  if(!map)return;
  map.innerHTML=mapSvg('filtered');
  if(e.target.value==='k1')map.querySelector('path[stroke="#14a394"]')?.setAttribute('opacity','.12');
  if(e.target.value==='k3')map.querySelector('path[stroke="#1677f9"]')?.setAttribute('opacity','.12');
  showToast(e.target.value==='all'?'Semua koridor ditampilkan.':'Filter '+(e.target.value==='k1'?'Koridor 1':'Koridor 3')+' diterapkan.');
 });
}

let etaCount=4;setInterval(()=>{etaCount=etaCount>1?etaCount-1:4;const eta=document.getElementById('etaBus1');if(eta)eta.textContent=etaCount+' mnt';const etaTrack=document.getElementById('trackingETA');if(etaTrack)etaTrack.textContent=etaCount+' menit';const last=document.getElementById('lastUpdated');if(last)last.textContent=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit'});},30000);

if (document.getElementById('mainMap')) {
 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLiveMap);
 } else {
  initLiveMap();
 }
}

// Setup address autocomplete for origin and destination inputs
setupAddressAutocomplete('origin', 'originSuggestions');
setupAddressAutocomplete('destination', 'destSuggestions');
