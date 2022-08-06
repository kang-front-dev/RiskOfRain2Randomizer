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

    const btnReroll = document.createElement('div');
    btnReroll.className = 'step_btn';
    btnReroll.id = 'btn-results-reroll';
    btnReroll.textContent = 'Reroll';
    stepResults.append(btnReroll);


    
    const data = {
      player1Name: this.player1Name,
      player2Name: this.player2Name,
      player3Name: this.player3Name,
      player4Name: this.player4Name,
      commonAmount: this.commonAmount,
      rareAmount: this.rareAmount,
      legendaryAmount: this.legendaryAmount,
    };
    roll(data);

    btnReroll.addEventListener('click', () => {
      const cards = document.querySelectorAll('.step_results_card');
      cards.forEach((item) => {
        item.remove();
      });
      roll(data);

    });

    function roll(data) {
      if (data.player1Name) {
        stepResultsWrapper.append(
          generateCard(
            data.player1Name,
            data.commonAmount,
            data.rareAmount,
            data.legendaryAmount
          )
        );
      }
      if (data.player2Name) {
        stepResultsWrapper.append(
          generateCard(
            data.player2Name,
            data.commonAmount,
            data.rareAmount,
            data.legendaryAmount
          )
        );
      }
      if (data.player3Name) {
        stepResultsWrapper.append(
          generateCard(
            data.player3Name,
            data.commonAmount,
            data.rareAmount,
            data.legendaryAmount
          )
        );
      }
      if (data.player4Name) {
        stepResultsWrapper.append(
          generateCard(
            data.player4Name,
            data.commonAmount,
            data.rareAmount,
            data.legendaryAmount
          )
        );
      }
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

      function generateItems(amount, type: string, itemsMax, itemsArr, parent) {
        if (amount > 0) {
          const randomNum = randomNumberExc(1, itemsMax, itemsArr);
          itemsArr.push(randomNum);
          const imgWrapper = document.createElement('div')
          imgWrapper.className = 'step_results_card_items_img-wrapper'

          const itemImg = document.createElement('img');
          itemImg.src = `./assets/items img/${type}/${type} (${randomNum}).jpg`;
          itemImg.className = 'step_results_card_items_img';
          imgWrapper.append(itemImg);
          parent.append(imgWrapper);

          generateItems(amount - 1, type, itemsMax, itemsArr, parent);
        }
      }

      const commonItems = document.createElement('div');
      commonItems.className = 'step_results_card_common';
      card.append(commonItems);

      const commonItemsArr = [];

      generateItems(common, 'common', commonMax, commonItemsArr, commonItems);

      const rareItems = document.createElement('div');
      rareItems.className = 'step_results_card_rare';
      card.append(rareItems);

      const rareItemsArr = [];

      generateItems(rare, 'rare', rareMax, rareItemsArr, rareItems);

      const legendaryItems = document.createElement('div');
      legendaryItems.className = 'step_results_card_rare';
      card.append(legendaryItems);

      const legendaryItemsArr = [];

      generateItems(
        legendary,
        'legendary',
        legendaryMax,
        legendaryItemsArr,
        legendaryItems
      );

      const allItems = card.querySelectorAll('.step_results_card_items_img')
      animateItems(0)
      function animateItems(amount){

        if(amount < allItems.length){
          allItems[amount].classList.add('active')
          setTimeout(() => {
            animateItems(amount + 1)
          }, 50);
        }
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
