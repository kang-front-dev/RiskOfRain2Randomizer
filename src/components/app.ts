export class App {
  private player1Name;
  private player2Name;
  private player3Name;
  private player4Name;

  private commonMax;
  private rareMax;
  private legendaryMax;
  private goldMax;
  private equipMax;
  private voidMax;

  private commonAmount;
  private rareAmount;
  private legendaryAmount;
  private goldAmount;
  private equipAmount;
  private voidAmount;

  private stepPlayer;
  private stepItems;
  init() {
    this.showStepPlayer();
  }
  showStepPlayer() {
    const stepPlayer = document.querySelector('.step_player') as HTMLElement;
    stepPlayer.classList.add('active');
    const player1Input = document.querySelector('#player-1') as HTMLInputElement;
    const player2Input = document.querySelector('#player-2') as HTMLInputElement;
    const player3Input = document.querySelector('#player-3') as HTMLInputElement;
    const player4Input = document.querySelector('#player-4') as HTMLInputElement;
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

    const btnNext = document.querySelector('#btn-player-next') as HTMLElement;
    btnNext.addEventListener('click', () => {
      stepPlayer.classList.remove('active');
      this.showStepItems();
    });
  }
  showStepItems() {
    const stepItems = document.querySelector('.step_items') as HTMLElement;
    stepItems.classList.add('active');

    this.commonMax = 29;
    this.rareMax = 29;
    this.legendaryMax = 27;
    this.goldMax = 14;
    this.equipMax = 25;
    this.voidMax = 14;

    const commonItemsInput = document.querySelector('#items-common') as HTMLInputElement;
    const rareItemsInput = document.querySelector('#items-rare') as HTMLInputElement;
    const legendaryItemsInput = document.querySelector('#items-legendary') as HTMLInputElement;
    const goldItemsInput = document.querySelector('#items-gold') as HTMLInputElement;
    const equipItemsInput = document.querySelector('#items-equip') as HTMLInputElement;
    const voidItemsInput = document.querySelector('#items-void') as HTMLInputElement;

    commonItemsInput.max = this.commonMax;
    rareItemsInput.max = this.rareMax;
    legendaryItemsInput.max = this.legendaryMax;
    goldItemsInput.max = this.goldMax;
    equipItemsInput.max = this.equipMax;
    voidItemsInput.max = this.voidMax;

    const commonAmountIndicator = document.querySelector('#items-common-value') as HTMLInputElement;
    const rareAmountIndicator = document.querySelector('#items-rare-value') as HTMLInputElement;
    const legendaryAmountIndicator = document.querySelector(
      '#items-legendary-value'
    ) as HTMLInputElement;
    const goldAmountIndicator = document.querySelector(
      '#items-gold-value'
    ) as HTMLInputElement;
    const equipAmountIndicator = document.querySelector(
      '#items-equip-value'
    ) as HTMLInputElement;
    const voidAmountIndicator = document.querySelector(
      '#items-void-value'
    ) as HTMLInputElement;



    this.commonAmount = 1;
    this.rareAmount = 1;
    this.legendaryAmount = 1;
    this.goldAmount = 1;
    this.equipAmount = 1;
    this.voidAmount = 1;

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
    goldItemsInput.addEventListener('input', () => {
      this.goldAmount = (goldItemsInput as HTMLInputElement).value;
      goldAmountIndicator.textContent = (
        goldItemsInput as HTMLInputElement
      ).value;
    });
    equipItemsInput.addEventListener('input', () => {
      this.equipAmount = (equipItemsInput as HTMLInputElement).value;
      equipAmountIndicator.textContent = (
        equipItemsInput as HTMLInputElement
      ).value;
    });
    voidItemsInput.addEventListener('input', () => {
      this.voidAmount = (voidItemsInput as HTMLInputElement).value;
      voidAmountIndicator.textContent = (
        voidItemsInput as HTMLInputElement
      ).value;
    });

    const btnBack = document.querySelector('#btn-items-back') as HTMLElement;
    const btnNext = document.querySelector('#btn-items-next') as HTMLElement;
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
    const stepResults = document.querySelector('.step_results')  as HTMLElement;
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
      goldAmount: this.goldAmount,
      equipAmount: this.equipAmount,
      voidAmount: this.voidAmount,
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
            data.legendaryAmount,
            data.goldAmount,
            data.equipAmount,
            data.voidAmount
          )
        );
      }
      if (data.player2Name) {
        stepResultsWrapper.append(
          generateCard(
            data.player2Name,
            data.commonAmount,
            data.rareAmount,
            data.legendaryAmount,
            data.goldAmount,
            data.equipAmount,
            data.voidAmount
          )
        );
      }
      if (data.player3Name) {
        stepResultsWrapper.append(
          generateCard(
            data.player3Name,
            data.commonAmount,
            data.rareAmount,
            data.legendaryAmount,
            data.goldAmount,
            data.equipAmount,
            data.voidAmount
          )
        );
      }
      if (data.player4Name) {
        stepResultsWrapper.append(
          generateCard(
            data.player4Name,
            data.commonAmount,
            data.rareAmount,
            data.legendaryAmount,
            data.goldAmount,
            data.equipAmount,
            data.voidAmount
          )
        );
      }
    }

    function generateCard(player, common, rare, legendary, gold, equip, voidItems) {

      const commonMax = 29;
      const rareMax = 29;
      const legendaryMax = 27;
      const goldMax = 14;
      const equipMax = 25;
      const voidMax = 14;

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
          if(type === "gold" || type === "equip" || type === "void"){
            itemImg.src = `./assets/items img/${type}/${type} (${randomNum}).png`;
          }else{
            itemImg.src = `./assets/items img/${type}/${type} (${randomNum}).jpg`;
          }
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
      legendaryItems.className = 'step_results_card_legendary';
      card.append(legendaryItems);

      const legendaryItemsArr = [];

      generateItems(
        legendary,
        'legendary',
        legendaryMax,
        legendaryItemsArr,
        legendaryItems
      );

      const goldItems = document.createElement('div');
      goldItems.className = 'step_results_card_gold';
      card.append(goldItems);

      const goldItemsArr = [];

      generateItems(
        gold,
        'gold',
        goldMax,
        goldItemsArr,
        goldItems
      );

      const equipItems = document.createElement('div');
      equipItems.className = 'step_results_card_equip';
      card.append(equipItems);

      const equipItemsArr = [];

      generateItems(
        equip,
        'equip',
        equipMax,
        equipItemsArr,
        equipItems
      );

      const voidItemsEl = document.createElement('div');
      voidItemsEl.className = 'step_results_card_void';
      card.append(voidItemsEl);

      const voidItemsArr = [];

      generateItems(
        voidItems,
        'void',
        voidMax,
        voidItemsArr,
        voidItemsEl
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

  const result = Math.floor(Math.random() * (max - min) + min);
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
