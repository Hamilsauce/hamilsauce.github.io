
const renderArrivals = (eta, incrementer) => {
    const dataDisplay = document.querySelector('.data-display');

    dataDisplay.append(renderEtaContainer(incrementer));
    renderEtas(eta, incrementer);
  }

  const renderEtaContainer = (incrementer) => {
    const dataDisplay = document.querySelector('.data-display');
    const etaContainer = document.createElement('div');
    etaContainer.classList.add('eta', `eta + ${incrementer}`)

    const etaDetails  = `
      <div class="nameBox1 preformat0${incrementer}"></div>
      <div class="nameBox2 preformat1${incrementer}"></div>
      <div class="timeBox preformat2${incrementer}"></div>
      <div class="etaBox preformat3${incrementer}"></div>
    `;
    etaContainer.innerHTML = etaDetails;
    return etaContainer;
  }
  const renderEtas = (eta, incrementer) => {
    calculateETA(eta.prdt, eta.arrT)
    let isApproaching = parseInt(eta.isApp) === 1 ? 'Due' : '';

    document.querySelector('.preformat0' + incrementer).innerHTML = `<span>${eta.staNm}</span>`;
    document.querySelector('.preformat1' + incrementer).innerHTML = `to ${eta.destNm.replace('Service ', '')}`;
    document.querySelector('.preformat2' + incrementer).innerHTML =
      `<span class="arriving-label">Arrival: </span>
      <span class="time-div2">${calculateETA(eta.prdt, eta.arrT)} minutes</span>`;
    document.querySelector('.preformat3' + incrementer).innerHTML = `<span class="approaching">${isApproaching}</span>`;
  }