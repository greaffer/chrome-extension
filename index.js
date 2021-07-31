const inputEl = document.querySelector(`.input-default`);
const displayEl = document.querySelector(`.display-area`);

const saveEl = document.querySelector(`.button-save`);
const delEl = document.querySelector(`.button-delete`);
const tabEl = document.querySelector(`.button-tab`);
/* eslint-disable */
let dataMain = [];
let dataSec = [];
/* eslint-enable */

const getItems = JSON.parse(localStorage.getItem(`mainData`));
const getTitle = JSON.parse(localStorage.getItem(`secData`));

function render() {
  let listItem = ``;
  for (let i = 0; i < dataMain.length; i++) {
    /* ------!!!!------ */
    listItem += `<li><a href="${dataSec[i]}" target="_blank">${dataMain[i]}</a></li>`;
    /* ------!!!!------ */
  }
  displayEl.innerHTML = listItem;
}

if (getItems) {
  dataMain = getItems;
  render();
}
if (getTitle) {
  dataSec = getTitle;
  render();
}
/* ------------ */
// saveEl.addEventListener(`click`, function () {
//   dataMain.push(inputEl.value);
//   inputEl.value = ``;

//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     dataSec.push(tabs[0].title);
//     localStorage.setItem('secData', JSON.stringify(dataSec));
//     render();
//   });

//   localStorage.setItem(`mainData`, JSON.stringify(dataMain));
//   render();
// });
/* ------------ */
saveEl.addEventListener(`click`, function () {
  dataMain.push(inputEl.value);
  inputEl.value = ``;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    dataSec.push(tabs[0].url);
    localStorage.setItem('secData', JSON.stringify(dataSec));
    render();
  });

  localStorage.setItem(`mainData`, JSON.stringify(dataMain));
  render();
});

tabEl.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    dataMain.push(tabs[0].title);
    dataSec.push(tabs[0].url);
    localStorage.setItem('mainData', JSON.stringify(dataMain));
    localStorage.setItem('secData', JSON.stringify(dataSec));
    render();
  });
});

delEl.addEventListener(`dblclick`, function () {
  localStorage.clear();
  dataMain = [];
  render();
});
