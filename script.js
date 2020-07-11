const depositeRangeElem = document.querySelector('.deposite-range_result-value');
const depositeResultAreaElem = document.querySelector('.deposite-range_result-area');

const replAmountRangeElem = document.querySelector('.replenishment-amount_result-value');
const replAmountResultAreaElem = document.querySelector('.replenishment-amount_result-area');

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
