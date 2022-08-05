export class App {
  private player1Name;
  private player2Name;
  private player3Name;
  private player4Name;

  private commonAmount;
  private rareAmount;
  private legendaryAmount;

  private stepPlayer;
  private stepItems;
  constructor() {}
  init() {
    this.showStepPlayer();
  }
  showStepPlayer() {
    const stepPlayer = document.querySelector('.step_player');
    stepPlayer.classList.add('active');
    const player1Input = document.querySelector('#player-1');
    const player2Input = document.querySelector('#player-2');
    const player3Input = document.querySelector('#player-3');
    const player4Input = document.querySelector('#player-4');
    player1Input.addEventListener('input', () => {
      this.player1Name = (player1Input as HTMLInputElement).value;
    });
    player2Input.addEventListener('input', () => {
      this.player2Name = (player2Input as HTMLInputElement).value;
    });
    player3Input.addEventListener('input', () => {
      this.player3Name = (player3Input as HTMLInputElement).value;
    });
    player4Input.addEventListener('input', () => {
      this.player4Name = (player4Input as HTMLInputElement).value;
    });

    const btnNext = document.querySelector('#btn-player-next');
    btnNext.addEventListener('click', () => {
      stepPlayer.classList.remove('active');
      this.showStepItems();
    });
  }
  showStepItems() {
    const stepItems = document.querySelector('.step_items');
    stepItems.classList.add('active');
    const commonItemsInput = document.querySelector('#items-common');
    const rareItemsInput = document.querySelector('#items-rare');
    const legendaryItemsInput = document.querySelector('#items-legendary');

    const commonAmountIndicator = document.querySelector('#items-common-value');
    const rareAmountIndicator = document.querySelector('#items-rare-value');
    const legendaryAmountIndicator = document.querySelector(
      '#items-legendary-value'
    );

    commonItemsInput.addEventListener('input', () => {
      this.commonAmount = (commonItemsInput as HTMLInputElement).value;
      commonAmountIndicator.textContent = (
        commonItemsInput as HTMLInputElement
      ).value;
    });
    rareItemsInput.addEventListener('input', () => {
      this.rareAmount = (rareItemsInput as HTMLInputElement).value;
      rareAmountIndicator.textContent = (
        rareItemsInput as HTMLInputElement
      ).value;
    });
    legendaryItemsInput.addEventListener('input', () => {
      this.legendaryAmount = (legendaryItemsInput as HTMLInputElement).value;
      legendaryAmountIndicator.textContent = (
        legendaryItemsInput as HTMLInputElement
      ).value;
    });

    const btnBack = document.querySelector('#btn-items-back');
    const btnNext = document.querySelector('#btn-items-next');
    btnBack.addEventListener('click', () => {
      stepItems.classList.remove('active');
      this.showStepPlayer();
    });
    btnNext.addEventListener('click', () => {
      stepItems.classList.remove('active');
      this.showResults();
    });
  }
  showResults() {
    const stepResults = document.querySelector('.step_results');
    const stepResultsWrapper = document.createElement('div');
    stepResultsWrapper.className = 'step_results_wrapper';
    stepResults.append(stepResultsWrapper);

    stepResults.classList.add('active');

    if (this.player1Name) {
      stepResultsWrapper.append(
        generateCard(
          this.player1Name,
          this.commonAmount,
          this.rareAmount,
          this.legendaryAmount
        )
      );
    }
    if (this.player2Name) {
      stepResultsWrapper.append(
        generateCard(
          this.player2Name,
          this.commonAmount,
          this.rareAmount,
          this.legendaryAmount
        )
      );
    }
    if (this.player3Name) {
      stepResultsWrapper.append(
        generateCard(
          this.player3Name,
          this.commonAmount,
          this.rareAmount,
          this.legendaryAmount
        )
      );
    }
    if (this.player4Name) {
      stepResultsWrapper.append(
        generateCard(
          this.player4Name,
          this.commonAmount,
          this.rareAmount,
          this.legendaryAmount
        )
      );
    }

    function generateCard(player, common, rare, legendary) {
      const commonMax = 29;
      const rareMax = 29;
      const legendaryMax = 27;

      const card = document.createElement('div');
      card.className = 'step_results_card';

      const name = document.createElement('h3');
      name.className = 'step_results_card_name';
      name.textContent = player;
      card.append(name);

      const commonItems = document.createElement('div');
      commonItems.className = 'step_results_card_common';
      card.append(commonItems);

      let commonItemsArr = [];

      for (let i = 0; i < Number(common); i++) {
        let randomNum = randomNumberExc(1, commonMax, commonItemsArr);
        commonItemsArr.push(randomNum);
        const itemImg = document.createElement('img');
        itemImg.src = `./assets/items img/common/common (${randomNum}).jpg`;
        itemImg.className = 'step_results_card_items_img';

        commonItems.append(itemImg);
      }

      const rareItems = document.createElement('div');
      rareItems.className = 'step_results_card_rare';
      card.append(rareItems);

      let rareItemsArr = [];

      for (let i = 0; i < Number(rare); i++) {
        let randomNum = randomNumberExc(1, rareMax, rareItemsArr);
        rareItemsArr.push(randomNum);
        const itemImg = document.createElement('img');
        itemImg.src = `./assets/items img/rare/rare (${randomNum}).jpg`;
        itemImg.className = 'step_results_card_items_img';

        rareItems.append(itemImg);
      }

      const legendaryItems = document.createElement('div');
      legendaryItems.className = 'step_results_card_rare';
      card.append(legendaryItems);

      let legendaryItemsArr = [];

      for (let i = 0; i < Number(legendary); i++) {
        let randomNum = randomNumberExc(1, legendaryMax, legendaryItemsArr);
        legendaryItemsArr.push(randomNum);
        const itemImg = document.createElement('img');
        itemImg.src = `./assets/items img/legendary/legendary (${randomNum}).jpg`;
        itemImg.className = 'step_results_card_items_img';

        legendaryItems.append(itemImg);
      }

      return card;
    }
  }
}

function randomNumberExc(min, max, exc) {
  console.log('exc: ' + exc);
  let result = Math.floor(Math.random() * (max - min) + min);
  let repeating = false;

  exc.forEach((num) => {
    if (num === result) {
      repeating = true;
    }
  });

  if (repeating) {
    return randomNumberExc(min, max, exc);
  } else {
    return result;
  }
}
