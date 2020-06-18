// REFACTOR THIS
const depositeRangeElem = document.getElementsByClassName('deposite-range_result-value')[0];
const depositeResultAreaElem = document.getElementsByClassName('deposite-range_result-area')[0];

// REFACTOR THIS
const replAmountRangeElem = document.getElementsByClassName('replenishment-amount_result-value')[0];
const replAmountResultAreaElem = document.getElementsByClassName('replenishment-amount_result-area')[0];

const renderResultArea = (areaElement, sliderElement) => {
  sliderElement.oninput = () => {
    areaElement.innerText = Number(sliderElement.value).toLocaleString('ru-RU');
  };
  sliderElement.addEventListener('mousemove', () => {
    const currentValue = sliderElement.value;
    const currentFillPercent = ((currentValue * 100) / sliderElement.attributes.max.value).toFixed(0);
    const currentFillBackground = `linear-gradient(90deg, #a3ca4c ${currentFillPercent}%, #1e1f22 ${currentFillPercent}%)`;
    sliderElement.style.background = currentFillBackground;
  });
};

renderResultArea(depositeResultAreaElem, depositeRangeElem);
renderResultArea(replAmountResultAreaElem, replAmountRangeElem);
