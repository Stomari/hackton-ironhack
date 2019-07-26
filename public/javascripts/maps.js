window.onload = () => {
  const places = [{
    coordinates: [-23.5617375, -46.6601331],
    address: 'Al. Jaú',
    num: 1301,
    cep: '01420-001',
    neighborhood: 'Jardim Paulista',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    coordinates: [-23.5585806, -46.6593165],
    address: 'Av. Paulista',
    num: 2034,
    cep: '01310-200',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    coordinates: [-23.5600381, -46.6624464],
    address: 'R. Augusta',
    num: 1856,
    cep: '01412-000',
    neighborhood: 'Cerqueira César',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    coordinates: [-23.5643488, -46.6547006],
    address: 'R. Pamplona',
    num: 734,
    cep: '01405-001',
    neighborhood: 'Jardim Paulista',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    coordinates: [-23.6163362, -46.5581647],
    address: 'Av. Goiás',
    num: 1805,
    cep: '09550-050',
    neighborhood: 'Santa Paula',
    city: 'São Caetano do Sul',
    state: 'SP',
  },
  {
    coordinates: [-23.709738, -46.5511347],
    address: 'R. Marechal Deodoro',
    num: 1322,
    cep: '09710-002',
    neighborhood: 'Centro',
    city: 'São Bernardo do Campo',
    state: 'SP',
  },
  {
    coordinates: [-23.5464799, -46.7719213],
    address: 'R. Aurora Soares Barbosa',
    num: 775,
    cep: '06023-010',
    neighborhood: 'Vila Campesina',
    city: 'Osasco',
    state: 'SP',
  },
  {
    coordinates: [-23.4493106, -46.5205081],
    address: 'R. Waldir de Azevedo',
    num: 20,
    cep: '07122-170',
    neighborhood: 'Jardim Bom Clima',
    city: 'Guarulhos',
    state: 'SP',
  },
  {
    coordinates: [-23.5396795, -46.6490426],
    address: 'R. Sebastião Pereira',
    num: 245,
    cep: '01225-020',
    neighborhood: 'Vila Buarque',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    coordinates: [-23.5208959, -46.8344519],
    address: 'Av. Rui Barbosa',
    num: 409,
    cep: '06311-000',
    neighborhood: 'Vila Caldas',
    city: 'Carapicuíba',
    state: 'SP',
  },
  {
    coordinates: [-23.686251, -46.622707],
    address: 'Av. Antonio Piranga',
    num: 171,
    cep: '09911-160',
    neighborhood: 'Centro',
    city: 'Diadema',
    state: 'SP',
  },
  {
    coordinates: [-23.5694623, -46.7151041],
    address: 'Av. Vital Brasil',
    num: 1133,
    cep: '05503-001',
    neighborhood: 'Butantã',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    coordinates: [-23.5453862, -46.597769],
    address: 'Av. Alcântara Machado',
    num: 576,
    cep: '03102-000',
    neighborhood: 'Brás',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    coordinates: [-23.4944008, -46.6462815],
    address: 'Av. Imirim',
    num: 1217,
    cep: '02465-100',
    neighborhood: 'Imirim',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    coordinates: [-23.6231169, -46.6986074],
    address: 'Av. Roque Petroni Júnior',
    num: 1089,
    cep: '04707-000',
    neighborhood: ' Jardim das Acacias',
    city: 'São Paulo',
    state: 'SP',
  },
  ];

  const centerLat = -23.5617375;
  const centerLng = -46.6601331;


  const mapCenter = {
    lat: centerLat,
    lng: centerLng,
  };


  const markers = [];

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: mapCenter,
    mapTypeControl: false,
  });

  // const place01 = document.querySelector('#place01');
  // const place02 = document.querySelector('#place02');
  // const place03 = document.querySelector('#place03');
  // const place04 = document.querySelector('#place04');
  // const place05 = document.querySelector('#place05');
  // const place06 = document.querySelector('#place06');
  // const place07 = document.querySelector('#place07');
  // const place08 = document.querySelector('#place08');
  // const place09 = document.querySelector('#place09');
  // const place10 = document.querySelector('#place10');
  // const place11 = document.querySelector('#place11');
  // const place12 = document.querySelector('#place12');
  // const place13 = document.querySelector('#place13');
  // const place14 = document.querySelector('#place14');
  // const place15 = document.querySelector('#place15');

  // const placesDiv = [place01, place02, place03, place04, place05, place06, place07, place08, place09, place10, place11, place12, place13, place14, place15];

  const infowindow = new google.maps.InfoWindow();
  const placePlaces = (places) => {
    places.forEach((place, idx) => {
      const center = {
        lat: place.coordinates[0],
        lng: place.coordinates[1],
      };
      const pin = new google.maps.Marker({
        position: center,
        map,
        title: place.address,
      });
      markers.push(pin);
      const marker = markers[idx];

      marker.addListener('click', () => {
        map.setZoom(15);
        map.setCenter(marker.getPosition());
        infowindow.setContent(`<strong>${place.address}, ${place.num}</strong><br>${place.neighborhood} - ${place.city}, ${place.state}<br>${place.cep} `);
        infowindow.open(map, marker);
      });
    });

    const selectPlaces = document.querySelector('#places-pick');

    selectPlaces.addEventListener('change', () => {
      map.setZoom(15);
      console.log(markers);
      map.setCenter(markers[selectPlaces.value].getPosition());
      infowindow.setContent(`<strong>${places[selectPlaces.value].address}, ${places[selectPlaces.value].num}</strong><br>${places[selectPlaces.value].neighborhood} - ${places[selectPlaces.value].city}, ${places[selectPlaces.value].state}<br>${places[selectPlaces.value].cep} `);
      infowindow.open(map, markers[selectPlaces.value]);
    });
  };

  placePlaces(places);
};
