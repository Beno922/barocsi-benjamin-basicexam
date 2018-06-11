function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  var consumable = notNullConsumables(userDatas);
  var spacevessels = sortByCost(consumable);
};

//rendezés
function sortByCost(userDatas) {
  var i = userDatas.length - 1;
  var tmp;
  var swap = false;

  do {
    for (var j = 0; j < i; j++) {
      if (parseInt((userDatas[j].cost_in_credits)) > parseInt(userDatas[j + 1].cost_in_credits)) {
        tmp = userDatas[j];
        userDatas[j] = userDatas[j + 1];
        userDatas[j + 1] = tmp;
        swap = true;
      }
    }
    i--;
  }
  while (i >= 0 && swap);
  return userDatas;
};

//nullok kiszűrésére

function notNullConsumables(spaceships) {
  var hasValue = [];
  for (var i in spaceships) {
    if (spaceships[i].consumables != "NULL") {
      hasValue.push(characters[i]);
    }
  }
  return hasValue;
}

//értékek szerkesztésére ötlet

// function changeNulls(spacevessels, "unknown") {
//   for (var i in spacevessels) {
//     if (spacevessels.value === "NULL") {
//       spacevessels.value = "unknown";
//     }
//   }
//   return spacevessels;
// };

// var spaceshipsCorrected = []

// spaceshipsCorrected = changeNulls(spacevessels);

//megjelenítés -referenciahibát orvsolni előbb

function spaceShipToThumbnail(spaceships, containerPanel) {
  var objThumbnail = document.createElement('DIV');
  var objThumbnailName = document.createElement('DIV');
  var objThumbnailPhoto = document.createElement('DIV');
  var objPhotoImage = document.createElement('IMG');

  objThumbnail.classList.add('Thumbnail');
  objThumbnailName.classList.add('Thumbnail-Name');
  objThumbnailName.innerText = spaceships.name;
  objThumbnail.appendChild(objThumbnailName);
  objThumbnail.appendChild(objThumbnailPhoto);
  objThumbnailPhoto.appendChild(objPhotoImage);
  objPhotoImage.setAttribute('src', 'images/' + spaceships.image);
  containerPanel.appendChild(objThumbnail);
};

var objSpaceships = document.querySelector('.shapceship-list');

for (var i = 0; i < spaceships.length; i++) {
  spaceshipToThumbnail(spaceships[i], objSpaceships);
};

function showSpaceships(spaceships) {
  var objSpaceships = document.querySelector('.shapceship-list');

  objSpaceships.innerText = '';
  for (var i = 0; i < spaceships.length; i++) {
    spaceshipToThumbnail(spaceships[i], objSpaceships);
  };
};

//statisztika

var spaceshipStatistics = document.querySelector('.shapceship-list');

spaceshipStatistics.innerText = `Egy fős legénységgel rendelkező hajók darabszáma:  ${countOfSingleCrewSpaceships()}
A legnagyobb kargókapacitással rendelkező hajó neve:  ${nameOfMaxOfCargoCapacity()}
Az összes hajó összes utasainak száma: ", ${sumOfAllPassengers()}
A leghosszabb hajó képe: ", "<img src=", ${pictureOfLongestSpaceship()}>`;

//számlálás

function countOfSingleCrewSpaceships(spaceships) {
  var count = 0;
  for (var i in spaceships) {
    if (parseInt(spaceships.crew[i]) = 1) {
      count++;
    }
  }
  return count;
};

//max

function nameOfMaxOfCargoCapacity(spaceships) {
  var max = spaceships[0];
  for (var i in spaceships) {
    if (parseInt(spaceships[i].cargo_capacity) > parseInt(max.cargo_capacity)) {
      max = spaceships[i];
    }
  }
  return max.name;
};

//összeadás

function sumOfAllPassengers(spaceships) {
  var amount = 0;
  for (var i in spaceships) {
    amount += parseInt(spaceships[i].passengers);
  }
  return amount;
};

//max, de képpel

function pictureOfLongestSpaceship(spaceships) {
  var max = spaceships[0];
  for (var i in spaceships) {
    if (parseInt(spaceships[i].lengthiness) > parseInt(max.lengthiness)) {
      max = spaceships[i];
    }
  }
  return max.image;
};

//kereső félkész
var objSearchTextBox = document.querySelector('#search-text');
var objSearchButton = document.querySelector('#search-button');

objSearchButton.addEventListener('click', searchSpaceship, false);

var spaceshipDetailsDiv = document.querySelector('.one-spaceship')

function searchSpaceship() {
  var sender = event.target;
  var filter = objSearchTextBox.value;
  var filtered;

  for (var i = 0; i < spaceships.length; i++) {
    if (spaceships[i].name.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
      filtered = spaceships[i];
    }
  }
  spaceshipDetailsDiv.innerHTML = filtered;
};

getData('/json/spaceships.json', successAjax);