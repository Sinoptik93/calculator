const calculate = (data) => {
  const daysPerYear = 365;
  const bankRate = 0.1; // 10%
  const termYears = data.term;
  const termMonths = termYears * 12;
  const startingDeposite = Number(data.depositeValue);
  const isRepleishment = data.replenishment;
  let replenishmentAmount = Number(data.replenishmentAmount);

  let currentMonthSum = 0;
  let previousMonthSum = startingDeposite;

  if (!isRepleishment) {
    replenishmentAmount = 0;
  }
  for (let i = 0; i < termMonths - 1; i += 1) {
    // текущаяСумма = предыдущаяСумма + предыдущаяСумма * (процентаяСтавка / количествоДнейВМесяце)
    currentMonthSum = previousMonthSum + replenishmentAmount + ((previousMonthSum) * (30 * (bankRate / daysPerYear)));
    previousMonthSum = Math.floor(currentMonthSum);
  }
  return currentMonthSum.toFixed();
};

$('.calculator__button').click((event) => {
  event.preventDefault();
  // Form fields
  const dateField = $('#datepicker');
  const depositeField = $('.deposite-range_result-value')[0];
  const termField = $("select[name='term']")[0];
  const isReplenishmentField = $("input[name='replenishment']").filter(':checked');
  const replenishmentAmountField = $("input[name='replenishment-amount']")[0];

  const generatState = () => ({
    date: dateField.val(),
    depositeValue: depositeField.value,
    term: Number(termField.value),
    replenishment: isReplenishmentField.val() === 'true',
    replenishmentAmount: replenishmentAmountField.value,
    isValid: false,
  });

  const validateForm = (currentState) => {
    $('input').removeClass('notValid');
    $('div').removeClass('notValid');
    const notValidFields = [];

    if (currentState.date === '') {
      notValidFields.push('дата');
      $(dateField).addClass('notValid');
    }
    if (currentState.depositeValue < 1000 || currentState.depositeValue > 3000000) {
      notValidFields.push('сумма вклада');
      $(depositeField).addClass('notValid');
    }
    if (currentState.replenishmentAmount < 1000 || currentState.replenishmentAmount > 3000000) {
      notValidFields.push('сумма пополнения вклада');
      $(replenishmentAmountField).addClass('notValid');
    }

    if (notValidFields.length === 0) {
      currentState.isValid = true;
    } else {
      currentState.isValid = false;
      const errorStrng = notValidFields.reduce((resultString, errorField) => `${resultString}•${errorField}\n`, '');
      alert(`Неверно заполнены поля:\n${errorStrng}`);
    }
  };

  const state = generatState();
  validateForm(state);

  if (state.isValid) {
    const calculatedResult = calculate(state);
    $('.calculator__result').text(`${Number(calculatedResult).toLocaleString('ru-RU')} руб`);
  }
});
