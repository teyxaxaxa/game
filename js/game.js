// На каком уровне игрок
let GAME_LEVEL = 1

// поиск фона для каждого уровня
let bgimg = document.getElementById('body')

// объект персонажей
const heros = {
    hero1: {
        name: "Рясу",
        maxHealth: 40,
        maxShield: 0,
        startEnergy: 10,
        maxEnergy: 10,
        image: "img/characterRyasu-hero-card.png",
        startDeck: ['sneakAttack', 'sneakAttack', 'rangeAttack', 'rangeAttack', 'sandToss', 'sandToss', 'dirtyTrick'],
        description: "Очень проворный эльф плут Рясу! Из-за отсутствие брони и большое здоровье, Рясу имеет множество атакующий карт. Получайте жетоны ловкости, чтобы увеличить шанс уклонение!",
        countDodge: 2,
    },
    hero2: {
        name: "Ульра",
        maxHealth: 30,
        maxShield: 20,
        startEnergy: 12,
        maxEnergy: 12,
        image: "img/characterUlra-hero-card.png",
        startDeck: ['kickTeeth', 'kickTeeth', 'kickTeeth', 'kickTeeth', 'fireBolt', 'fireBolt', 'fireBall', 'fireShield', 'heal', 'heal'],
        description: "Ведьма, что вяжет судьбы огнём! Не сильна в прямом бою, но её чары выжигают врагов изнутри. С помощью огненных заклинаний копите жетоны огня и сжигайте противников!",
    },
    hero3: {
        name: "Стекло",
        maxHealth: 60,
        maxShield: 40,
        startEnergy: 8,
        maxEnergy: 8,
        image: "img/characterSteclo-hero-card.png",
        startDeck: ['wildShape','bite','bite','bite','rangeAttack','rangeAttack','sandToss','sandToss','dirtyTrick'],
        description: "Имеет особую форму зверя, в которой он получает 40 брони, а так же особый эффект при ударе 'кравотечение'",
    },
    hero4: {
        name: "Морана",
        maxHealth: 10,
        maxShield: 30,
        startEnergy: 11,
        maxEnergy: 11,
        image: "img/characterMil-hero-card.png",
        startDeck: [],
        description: "Морана - холодная волшебница севера! Обладает огромной защитой, но уязвимым ядром. Копите Жетоны Стужи, чтобы заморозить врагов и нанести сокрушительный урон!",
    },
}
//выбор персонажа

function chooseHero() {
    const hero_window = document.getElementById('chooseHeroWindow')
    const hero_cont = document.getElementById('chooseHero')
    hero_cont.innerHTML = ''
    Object.keys(heros).forEach(heroId => {
        const player = heros[heroId]
        const heroElement = document.createElement('div')
        heroElement.className = 'cards-heros__hero'
        heroElement.innerHTML = `
        <img
              src="img/font-hero-card.png"
              alt="рамка"
              class="player-card__img font-hero-card"
            />
            <img
              src="${player.image}"
              alt="игрок"
              class="player-card__img character-hero-card"
              id="player-card__img"
            />
            <img
              src="img/back-hero-card.png"
              alt="фон"
              class="player-card__img back-hero-card"
            />
            <div class="stats__class">
              <div class="player-card__name" id="player-card__name">${player.name}</div>
            </div>
            <div class="hero__stats">
        <p class="hero-health">Здоровье: ${player.maxHealth}<?p>
        <p class="hero-Shield">Максмимальная защита: ${player.maxShield}<?p>
        <p class="hero-Energy">Максимальная энергия: ${player.maxEnergy}<?p>
        <p class="hero-Energy">Описание: ${player.description}<?p>
        </div>
        `
        heroElement.addEventListener('click', () => { hero_can_play(heroId); initGame() })

        hero_cont.appendChild(heroElement)
    })

}

function hero_can_play(heroId) {
    const hero = heros[heroId]
    GAME_CONFIG.player = {
        name: hero.name,
        maxHealth: hero.maxHealth,
        maxShield: hero.maxShield,
        startEnergy: hero.startEnergy,
        maxEnergy: hero.maxEnergy,
        image: hero.image,
        startDeck: hero.startDeck

    }
    if (Game.player.health < GAME_CONFIG.player.maxHealth) {
        Game.player.health = GAME_CONFIG.player.maxHealth
    }
    else if (Game.player.health > GAME_CONFIG.player.maxHealth) {
        Game.player.health = GAME_CONFIG.player.maxHealth
    }
    document.getElementById('chooseHeroWindow').style.display = 'none'
}
// Константы и настройки игры
let GAME_CONFIG = {
    player: {
        maxHealth: 60,
        maxShield: 20,
        startEnergy: 3,
        maxEnergy: 3,
        image: "",
        name: "",
        countDodge: 0,
        startDeck: []
    },
    boss: {
        maxHealth: 80,
        shield: 0,
        name: "Гёрл",
        image: "",
        countFire: 0,
        actions: [
            { name: 'Ледяная Атака', type: 'attack', value: 10, description: 'Наносит 10 урона' },
            { name: 'Морозная Броня', type: 'defense', value: 10, description: 'Дает 10 защиты' },
            { name: 'Новогодняя Ярость', type: 'special', value: { damage: 5, shield: 5 }, description: 'Наносит 5 урона и дает 5 защиты' }
        ]
    },
    cardDrawPerTurn: 5
};



// Рассчитывание характеристик босса по уровня прохождение игры
function newStatsboss() {

    switch (GAME_LEVEL) {
        case 1:
            GAME_CONFIG.boss = {
                maxHealth: 80,
                shield: 0,
                name: "Злой Тихон",
                image: "img/boss-level1.png",
                actions: [
                    { name: 'Злобная атака', type: 'attack', value: 10, description: 'Наносит 10 урона' },
                    { name: 'Злобная Броня', type: 'defense', value: 10, description: 'Дает 10 защиты' },
                    { name: 'Новогодняя Ярость', type: 'special', value: { damage: 5, shield: 5 }, description: 'Наносит 5 урона и дает 5 защиты' }
                ]
            }
            bgimg.style.background = `url(img/background-level1.png)`
            bgimg.style.backgroundRepeat = 'no-repeat'
            bgimg.style.backgroundSize = 'cover'
            break;
        case 2:
            GAME_CONFIG.boss = {
                maxHealth: 180,
                shield: 20,
                name: "boss2",
                image: "img/boss-level2.png",
                actions: [
                    { name: 'Ледяная Атака', type: 'attack', value: 10, description: 'Наносит 10 урона' },
                    { name: 'Морозная Броня', type: 'defense', value: 10, description: 'Дает 10 защиты' },
                    { name: 'Новогодняя Ярость', type: 'special', value: { damage: 5, shield: 5 }, description: 'Наносит 5 урона и дает 5 защиты' }
                ]
            }
            bgimg.style.background = `url(img/background-level2.png)`
            bgimg.style.backgroundRepeat = 'no-repeat'
            bgimg.style.backgroundSize = 'cover'
            break;
        case 3:
            GAME_CONFIG.boss = {
                maxHealth: 120,
                shield: 10,
                name: "boss3",
                image: "img/boss-level3.png",
                actions: [
                    { name: 'Ледяная Атака', type: 'attack', value: 10, description: 'Наносит 10 урона' },
                    { name: 'Морозная Броня', type: 'defense', value: 10, description: 'Дает 10 защиты' },
                    { name: 'Новогодняя Ярость', type: 'special', value: { damage: 5, shield: 5 }, description: 'Наносит 5 урона и дает 5 защиты' }
                ]
            }
            bgimg.style.background = `url(img/background-level3.png)`
            bgimg.style.backgroundRepeat = 'no-repeat'
            bgimg.style.backgroundSize = 'cover'
            break;
        case 4:
            GAME_CONFIG.boss = {
                maxHealth: 180,
                shield: 20,
                name: "boss4",
                image: "img/boss-level4.png",
                actions: [
                    { name: 'Ледяная Атака', type: 'attack', value: 10, description: 'Наносит 10 урона' },
                    { name: 'Морозная Броня', type: 'defense', value: 10, description: 'Дает 10 защиты' },
                    { name: 'Новогодняя Ярость', type: 'special', value: { damage: 5, shield: 5 }, description: 'Наносит 5 урона и дает 5 защиты' }
                ]
            }
            bgimg.style.background = `url(img/background-level4.png)`
            bgimg.style.backgroundRepeat = 'no-repeat'
            bgimg.style.backgroundSize = 'cover'
            break;
    }
}

newStatsboss();
chooseHero()
// Объект игры
const Game = {
    player: {
        health: GAME_CONFIG.player.maxHealth,
        maxHealth: GAME_CONFIG.player.maxHealth,
        maxShield: GAME_CONFIG.player.maxShield,
        image: GAME_CONFIG.player.image,
        shield: 0,
        energy: GAME_CONFIG.player.startEnergy,
        maxEnergy: GAME_CONFIG.player.maxEnergy,
        countDodge: 0,
        form:false,
        deck: [],
        hand: [],
        discard: []
    },
    boss: {
        health: GAME_CONFIG.boss.maxHealth,
        maxHealth: GAME_CONFIG.boss.maxHealth,
        shield: GAME_CONFIG.boss.shield,
        nextAction: null,
        name: GAME_CONFIG.boss.name,
        countFire: 0,
        bleeding: false,
        image: "https://img.icons8.com/color/96/000000/snowman.png"
    },
    turn: 'player',
    gameOver: false,
    actionLog: []
};

// Определение карт
const CARDS = {
    // общие карты:
    heal: {
        id: 'heal',
        name: 'Возложение рук',
        type: 'attack',
        cost: 4,
        value: 10,
        description: 'Даёт 10 здоровье',
        icon: 'img/iconCards/heal.png',
        color: '#2cf112ff',
    },

    // Карты Рясу
    dirtyTrick: {
        id: 'dirtyTrick',
        name: 'Грязный трюк',
        type: 'attack',
        cost: 5,
        value: 3,
        description: 'Наносит 3 урона. Получите 3 жетон ловкости',
        icon: 'img/iconCards/dirtyTrick.png',
        color: '#e74c3c',
    },
    sneakAttack: {
        id: 'sneakAttack',
        name: 'Атака исподтишка',
        type: 'special',
        cost: 10,
        value: 10,
        description: 'Наносит 10 урона игнорируя защиту босса',
        icon: 'img/iconCards/sneakAttack.png',
        color: '#c2e73cff',
    },
    sandToss: {
        id: 'sandToss',
        name: 'Бросить песок',
        type: 'attack',
        cost: 2,
        value: 2,
        description: 'Наносит 2 урона. Получите 2 жетона ловкости',
        icon: 'img/iconCards/sandToss.png',
        color: '#e74c3c',
    },
    rangeAttack: {
        id: 'rangeAttack',
        name: 'Выстрел',
        type: 'attack',
        cost: 5,
        value: 5,
        description: 'Наносит 5 урона',
        icon: 'img/iconCards/rangeAttack.png',
        color: '#e74c3c',
    },
    // Карты Юльры
    kickTeeth: {
        id: 'kickTeeth',
        name: 'Удар по зубам',
        type: 'attack',
        cost: 2,
        value: 2,
        description: 'Наносит 2 урона.',
        icon: 'img/iconCards/kickTeeth.png',
        color: '#ce4064ff',
    },
    fireBolt: {
        id: 'fireBolt',
        name: 'Огненный снаряд',
        type: 'attack',
        cost: 4,
        value: 2,
        fire: 1,
        description: 'Наносит 2 урона. Босс получает 1 жетон огня',
        icon: 'img/iconCards/fireBolt.png',
        color: '#ce4064ff',
    },
    fireBall: {
        id: 'fireBall',
        name: 'Огненный шар',
        type: 'attack',
        cost: 10,
        value: 10,
        fire: 5,
        description: 'Наносит 10 урона. Босс получает 5 жетон огня',
        icon: 'img/iconCards/fireBall.png',
        color: '#ce4064ff',
    },
    fireShield: {
        id: 'fireShield',
        name: 'Огненный щит',
        type: 'defense',
        cost: 6,
        value: 10,
        fire: 1,
        description: 'Даёт 10 брони. Босс получает 1 жетон огня',
        icon: 'img/iconCards/fireShield.png',
        color: '#ce4064ff',
    },
    // Карты Милы
    iceKnife: {
        id: 'iceKnife',
        name: 'Грязный трюк',
        type: 'attack',
        cost: 4,
        value: 3,
        description: 'Наносит 3 урона. Получите 1 жетон ловкости',
        icon: 'img/iconCards/iceKnife.png',
        color: '#e74c3c',
    },
    dirtyTrick: {
        id: 'dirtyTrick',
        name: 'Грязный трюк',
        type: 'attack',
        cost: 4,
        value: 3,
        description: 'Наносит 3 урона. Получите 1 жетон ловкости',
        icon: 'img/iconCards/dirtyTrick.png',
        color: '#e74c3c',
    },
    dirtyTrick: {
        id: 'dirtyTrick',
        name: 'Грязный трюк',
        type: 'attack',
        cost: 4,
        value: 3,
        description: 'Наносит 3 урона. Получите 1 жетон ловкости',
        icon: 'img/iconCards/dirtyTrick.png',
        color: '#e74c3c',
    },
    //карты лешего
    wildShape: {
        id: 'wildShape',
        name: 'wildShape',
        type: 'wildShape',
        cost: 8,
        value: 0,
        bleeding: 3,
        description:'Превращение в зверя',
        icon:'img/iconCards/wildShape.png',
        color:'#9e0303ff'
    },
    bite: {
        id: 'bite',
        name: 'bite',
        type: 'bite',
        cost: 2,
        value: 5,
        description:'Куснуть',
        icon:'img/iconCards/bite.png',
        color:'#9e0303ff'
    }
};

// Инициализация игры
function initGame() {
    // Сброс состояния игры
    Game.player = {
        health: Game.player.health,
        maxHealth: GAME_CONFIG.player.maxHealth,
        maxShield: GAME_CONFIG.player.maxShield,
        image: GAME_CONFIG.player.image,
        form:false,
        shield: 0,
        energy: GAME_CONFIG.player.startEnergy,
        maxEnergy: GAME_CONFIG.player.maxEnergy,
        countDodge: 0,
        deck: [...GAME_CONFIG.player.startDeck],
        hand: [],
        discard: []
    };

    Game.boss = {
        health: GAME_CONFIG.boss.maxHealth,
        maxHealth: GAME_CONFIG.boss.maxHealth,
        shield: GAME_CONFIG.boss.shield,
        nextAction: null,
        bleeding: false,
        name: GAME_CONFIG.boss.name,
        countFire: 0,
        image: "https://img.icons8.com/color/96/000000/snowman.png"
    };
    Game.turn = 'player';
    Game.gameOver = false;
    Game.actionLog = ['Новогодняя битва начинается!', 'Снеговик-Воин бросает вам вызов!'];

    // Перемешиваем колоду
    shuffleDeck();

    // Босс выбирает первое действие
    chooseBossAction();

    // Игрок берет начальную руку
    drawCards(GAME_CONFIG.cardDrawPerTurn);

    // Обновляем интерфейс
    updateUI();

    // Показываем правила при первом запуске
    // if (!localStorage.getItem('newYearGameRulesShown')) {
    //     showRules();
    //     localStorage.setItem('newYearGameRulesShown', 'true');
    // }
}

// Перемешивание колоды
function shuffleDeck() {
    for (let i = Game.player.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [Game.player.deck[i], Game.player.deck[j]] = [Game.player.deck[j], Game.player.deck[i]];
    }
}

// Взять карты
function drawCards(count) {
    for (let i = 0; i < count; i++) {
        if (Game.player.deck.length === 0) {
            // Если в рука имеет более 5 карт, то запретим брать больше

            // Если колода пуста, перемешиваем сброс
            if (Game.player.discard.length > 0 && Game.player.deck<=3) {
                Game.player.deck = [...Game.player.discard];
                Game.player.discard = [];
                shuffleDeck();
                addToLog('Колода перемешана заново!');
            } else {
                // Нет карт для взятия
                break;
            }
        }
        const maxleght = 5
        // Берем карту из колоды
        const cardId = Game.player.deck.pop();
        if (Game.player.hand.length < maxleght) {
            Game.player.hand.push(cardId)
        }
        else {
            console.log('Массив достиг максимального размера!');
            console.log(Game.player.discard.length)
        }

    }

    updateHand();
}
// Обновление руки игрока
function updateHand() {
    const handContainer = document.getElementById('game-area__hand');
    handContainer.innerHTML = '';

    Game.player.hand.forEach(cardId => {
        const card = CARDS[cardId];
        const cardElement = document.createElement('div');
        cardElement.className = `card`;
        if (card.type === 'attack') {
            cardElement.style.background = `url("img/card-fight-common.png")`
            cardElement.style.backgroundRepeat = 'no-repeat'
            cardElement.style.backgroundSize = 'cover'
        }
        else if (card.type === 'defense') {
            cardElement.style.background = `url("img/card-shield-common.png")`
            cardElement.style.backgroundRepeat = 'no-repeat'
            cardElement.style.backgroundSize = 'cover'
        }
        else {
            cardElement.style.background = `url("img/card-health-common.png")`
            cardElement.style.backgroundRepeat = 'no-repeat'
            cardElement.style.backgroundSize = 'cover'
        }


        // Проверяем, можно ли разыграть карту
        const canPlay = Game.player.energy >= card.cost && Game.turn === 'player' && !Game.gameOver;
        if (!canPlay) {
            cardElement.classList.add('unplayable');
        } else {
            cardElement.classList.add('playable');
        }

        cardElement.innerHTML = `
            <div class="card-cost">${card.cost}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-icon"><img src="${card.icon}" alt="card icon"/></div>
            <div class="card-description">${card.description}</div>
            
        `;

        if (canPlay) {
            cardElement.addEventListener('click', () => playCard(cardId));
        }

        handContainer.appendChild(cardElement);
    });
}

// Разыграть карту
function playCard(cardId) {
    if (Game.turn !== 'player' || Game.gameOver) return;

    const card = CARDS[cardId];
    
    // Проверяем, достаточно ли энергии
    if (Game.player.energy < card.cost) {
        addToLog(`Недостаточно энергии для "${card.name}"!`);
        return;
    }

    // Тратим энергию
    Game.player.energy -= card.cost;
    // Убираем карту из руки
    const cardIndex = Game.player.hand.indexOf(cardId);
    if (cardIndex !== -1) {
        Game.player.hand.splice(cardIndex, 1);
        Game.player.discard.push(cardId);
    }
    if (card.type==='wildShape'){
        Game.boss.bleeding=true;
        Game.player.shield=40
        Game.player.form=true;
    }
    // Применяем эффект карты
    applyCardEffect(card);

    // Обновляем UI
    updateUI();
    updateHand();

    // Проверяем, не умер ли босс
    checkGameOver();
}

// Применить эффект карты
function applyCardEffect(card) {
    addToLog(`Вы разыгрываете: ${card.name}`);

    switch (card.id) {
        case 'bite':
            dealDamageToBoss(card.value, card.name);
            break;
        case 'icicle':
        // Эффекты карт Рясу
        case 'sneakAttack':
            // Истинный урон
            dealTrueDamageToBoss(card.value, card.name);
            break;
        case 'dirtyTrick':
        case 'sandToss':
            // Истинный урон
            dealDamageToBoss(card.value, card.name);
            Game.player.countDodge += 1;
            break;

        // Эффекты карт Юльры
        case 'fireBolt':
        case 'fireBall':
            // Атака с огненными уронами
            dealDamageToBoss(card.value, card.name);
            Game.boss.countFire += card.fire;
            addToLog(`Босс получает ${card.fire} жетонов огня`);
            console.log(Game.boss.countFire);
            break;
        case 'fireShield':
            // Броня с огненными уронами
            Game.player.shield += card.value;
            addToLog(`Вы получаете ${card.value} защиты. Босс получает ${card.fire} жетонов огня`);
            Game.boss.countFire += card.fire;
            break;




        case 'kickTeeth':
        case 'rangeAttack':
            // Атака босса
            dealDamageToBoss(card.value, card.name);
            //createAnimation('damage', card.value, 'boss');
            break;

        case 'frostShield':
            // Защита игрока
            Game.player.shield += card.value;
            addToLog(`Вы получаете ${card.value} защиты`);
            //createAnimation('shield', card.value, 'player');
            break;

        case 'surpriseGift':
            // Защита + энергия в следующем ходу
            Game.player.shield += card.value.shield;
            // Энергия добавляется в начале следующего хода
            addToLog(`Вы получаете ${card.value.shield} защиты и дополнительную энергию в следующем ходу`);
            //createAnimation('shield', card.value.shield, 'player');
            break;

        case 'glowingGarland':
            // Урон всем (в текущей версии только боссу)
            dealDamageToBoss(card.value, card.name);
            //createAnimation('damage', card.value, 'boss');
            break;

        case 'heal':
            // Лечение игрока
            const healAmount = Math.min(card.value, Game.player.maxHealth - Game.player.health);
            Game.player.health += healAmount;
            addToLog(`Вы восстанавливаете ${healAmount} здоровья`);
            break;
    }
}

// Нанести урон боссу
function dealDamageToBoss(damage, source) {
    
    // Учитываем защиту босса
    if (Game.boss.shield > 0) {
        const blocked = Math.min(damage, Game.boss.shield);
        Game.boss.shield -= blocked;
        damage -= blocked;
        addToLog(`Защита босса поглотила ${blocked} урона`);

        if (damage <= 0) return;
    }

    // Наносим оставшийся урон
    Game.boss.health = Math.max(0, Game.boss.health - damage);
    addToLog(`Вы наносите ${damage} урона боссу с помощью "${source}"`);
}

// Нанести истинный урон боссу
function dealTrueDamageToBoss(damage, source) {
    // Наносим оставшийся урон
    Game.boss.health = Math.max(0, Game.boss.health - damage);
    addToLog(`Вы наносите ${damage} урона боссу с помощью "${source}"`);
}

// Нанести урон боссу из за жетоны огня
function dealFireDamageToBoss(fireDamage, fireCount) {
    // Учитываем защиту босса
    if (Game.boss.shield > 0) {
        const blocked = Math.min(fireDamage, Game.boss.shield);
        Game.boss.shield -= blocked;
        fireDamage -= blocked;
        addToLog(`Защита босса поглотила ${blocked} урона`);

        if (fireDamage <= 0) return;
    }

    // Наносим оставшийся урон
    Game.boss.health = Math.max(0, Game.boss.health - fireDamage);
    addToLog(`Босс получает ${fireDamage} урона огня, сейчас "${fireCount}" жетон(ов) огня`);
    Game.boss.countFire -= 1;
}

// Босс выбирает действие
function chooseBossAction() {
    const actions = GAME_CONFIG.boss.actions;
    const randomIndex = Math.floor(Math.random() * actions.length);
    Game.boss.nextAction = actions[randomIndex];
}

// Ход босса
function bossTurn() {
    if (Game.gameOver) return;
    if (Game.boss.bleeding===true){
        Game.boss.health = Game.boss.health - CARDS.wildShape.bleeding;
    }
    addToLog(`=== ХОД БОССА ===`);
    addToLog(`${Game.boss.name} использует: ${Game.boss.nextAction.name}`);

    const action = Game.boss.nextAction;

    switch (action.type) {
        case 'attack':
            // Атака игрока
            dealDamageToPlayer(action.value, action.name);
            //createAnimation('damage', action.value, 'player');
            break;

        case 'defense':
            // Защита босса
            Game.boss.shield += action.value;
            addToLog(`${Game.boss.name} получает ${action.value} защиты`);
            //createAnimation('shield', action.value, 'boss');
            break;

        case 'special':
            // Особое действие (урон + защита)
            dealDamageToPlayer(action.value.damage, action.name);
            Game.boss.shield += action.value.shield;
            addToLog(`${Game.boss.name} наносит ${action.value.damage} урона и получает ${action.value.shield} защиты`);
            //createAnimation('damage', action.value.damage, 'player');
            //createAnimation('shield', action.value.shield, 'boss');
            break;
    }

    // Босс выбирает следующее действие
    chooseBossAction();

    // Сбрасываем защиту игрока (если не указано иное)
    if (Game.player.form===true){
    }
    else if (Game.player.shield > 0) {
        addToLog(`Ваша защита сброшена`);
        Game.player.shield = 0;
    }

    // Подчёт жетонов огня
    // dealFireDamageToBoss(Game.boss.countFire, Game.boss.countFire)
    if (Game.boss.countFire > 0) {
        let fireDamage = Game.boss.countFire;
        console.log("первое условие выполнилось!");
        if (Game.boss.shield > 0) {
            console.log(" второе условие выполнилось!");
            
            const blocked = Math.min(fireDamage, Game.boss.shield);
            Game.boss.shield -= blocked;
            fireDamage -= blocked;
            console.log(fireDamage);
            console.log(Game.boss.countFire);
            addToLog(`Защита босса поглотила ${blocked} урона`);

            if (fireDamage <= 0);
        }
        console.log(" третье условие выполнилось!");
        // Наносим оставшийся урон
        Game.boss.health = Math.max(0, Game.boss.health - fireDamage);
        Game.boss.countFire -= 1;
        addToLog(`Босс получает ${fireDamage} урона огня, сейчас "${Game.boss.countFire}" жетон(ов) огня`);
        
    }
    // Переход к ходу игрока
    Game.turn = 'player';
    if (Game.player.shield<=0 && Game.player.form===true){
        Game.player.form=false
        Game.boss.bleeding=false
    }
    // Восстанавливаем энергию игрока
    Game.player.energy = GAME_CONFIG.player.maxEnergy;
    
    // Игрок берет карты
    drawCards(GAME_CONFIG.cardDrawPerTurn);
    

    // Обновляем UI
    updateUI();
    updateHand();

    // Проверяем, не умер ли игрок
    checkGameOver();
}

// Нанести урон игроку
function dealDamageToPlayer(damage, source) {
    // Учитываем защиту игрока
    if (Game.player.countDodge > 0) {
        let dodgeBoss = Math.random*100;
        let dodgePlayer = Game.player.countDodge * 10;
        if (dodgeBoss < dodgePlayer) {
            Game.player.countDodge -=1;
            addToLog(`Вы смогли уклониться от босса! Сейчас вы имеете ${Game.player.countDodge} жетон(ов) уклонений`);
            return
        }
        else {
            {
            Game.player.countDodge = 0;
            addToLog(`Вы не смогли уклониться от босса! Вы теряете все жетоны уклонение!`);
        }
        }

    }
    if (Game.player.shield > 0) {
        const blocked = Math.min(damage, Game.player.shield);
        Game.player.shield -= blocked;
        damage -= blocked;
        addToLog(`Ваша защита поглотила ${blocked} урона`);

        if (damage <= 0) return;
    }

    // Наносим оставшийся урон
    Game.player.health = Math.max(0, Game.player.health - damage);
    addToLog(`${Game.boss.name} наносит вам ${damage} урона с помощью "${source}"`);
}

// Создание анимации
// function createAnimation(type, value, target) {
//     const animationsContainer = document.getElementById('animations-container');

//     const effect = document.createElement('div');
//     effect.className = `${type}-effect`;
//     effect.textContent = type === 'damage' ? `-${value}` : type === 'heal' ? `+${value}` : `+${value}`;

//     // Позиционируем анимацию
//     if (target === 'boss') {
//         effect.style.left = '70%';
//         effect.style.top = '20%';
//     } else {
//         effect.style.left = '30%';
//         effect.style.top = '60%';
//     }

//     animationsContainer.appendChild(effect);

//     // Удаляем анимацию через 1.5 секунды
//     setTimeout(() => {
//         if (effect.parentNode === animationsContainer) {
//             animationsContainer.removeChild(effect);
//         }
//     }, 1500);
// }

// Проверка конца игры
function checkGameOver() {
    if (Game.boss.health <= 0) {
        if (GAME_LEVEL === 4) {
            Game.gameOver = true;
            showResult(true);

        }
        if (Game.boss.health <= 0 && GAME_LEVEL < 4) {
            const win_boss = document.getElementById('win_on_boss')
            win_boss.style.display = 'flex'
            document.getElementById('win_on_boss-btn').addEventListener('click', () => win_boss.style.display = 'none')
            document.getElementById('win_on_boss-text').textContent = `вы победили ${Game.boss.name}! хотите продолжить путь?`
        }
        GAME_LEVEL += 1
        newStatsboss()
        initGame();
        return;
    }

    if (Game.player.health <= 0) {
        Game.gameOver = true;
        showResult(false);
        return;
    }
}

// Показать результат игры
function showResult(isWin) {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('result__title');
    const message = document.getElementById('result__message');
    // const icon = document.getElementById('result-icon');

    if (isWin) {
        title.textContent = 'ПОБЕДА!';
        modal.style.backgroundImage = `url("img/end-img-firstFrame.png")`
        modal.style.backgroundRepeat = 'no-repeat'
        modal.style.backgroundSize = 'cover'
        setTimeout(() => {
            modal.style.backgroundImage = `url("img/end-img-secondFrameWin.png")`;
        }, 1500);
        message.textContent = `Вы победили ${Game.boss.name}! С Новым Годом!`;
        const button_container = document.createElement('div')
        button_container.className = 'button_container'
        button_container.innerHTML = `
        `
        modal.appendChild(button_container)
        addToLog('Вы победили Снеговика-Воина! Поздравляем!');
    } else {
        modal.style.backgroundImage = `url("img/end-img-firstFrame.png")`
        modal.style.backgroundRepeat = 'no-repeat'
        modal.style.backgroundSize = 'cover'
        setTimeout(() => {
            modal.style.backgroundImage = `url("img/end-img-secondFrameLose.png")`;
        }, 1500);
        title.textContent = 'ПОРАЖЕНИЕ!';
        const button_container = document.createElement('div')
        button_container.className = 'button_container'
        button_container.innerHTML = `
        `
        modal.appendChild(button_container)
        message.textContent = `${Game.boss.name} оказался сильнее. Попробуйте еще раз!`;
        addToLog('Вы проиграли. Снеговик-Воин победил!');
    }

    modal.style.display = 'flex';
}

// Добавить запись в лог
function addToLog(message) {
    Game.actionLog.push(message);

    const logContainer = document.getElementById('game-area__chat');
    const logEntry = document.createElement('div');
    logEntry.className = 'chat__log';
    logEntry.textContent = message;

    logContainer.appendChild(logEntry);

    // Прокручиваем лог вниз
    logContainer.scrollTop = logContainer.scrollHeight;

    // Ограничиваем количество записей в логе
    if (Game.actionLog.length > 20) {
        Game.actionLog.shift();
        if (logContainer.children.length > 20) {
            logContainer.removeChild(logContainer.firstChild);
        }
    }
}

// Обновление UI
function updateUI() {
    // Здоровье игрока
    const playerHealthPercent = (Game.player.health / Game.player.maxHealth) * 100;
    document.getElementById('player-health-bar').style.width = `${playerHealthPercent}%`;
    document.getElementById('player-health-text').textContent = `${Game.player.health} / ${Game.player.maxHealth}`;

    // Защита игрока
    const playerShieldPercent = (Game.player.shield / Game.player.maxShield) * 100;
    document.getElementById('player-armor-bar').style.width = `${playerShieldPercent}%`;
    document.getElementById('player-armor-text').textContent = `${Game.player.shield} / ${Game.player.maxShield}`;

    // Энергия игрока
    // const playerEnergyPercent = (Game.player.energy / Game.player.maxEnergy) * 100;
    // document.getElementById('player-energy-bar').style.width = `${playerEnergyPercent}%`;
    document.getElementById('player-energy').textContent = `${Game.player.energy} / ${Game.player.maxEnergy}`;

    // Здоровье босса
    const bossHealthPercent = (Game.boss.health / Game.boss.maxHealth) * 100;
    document.getElementById('boss-health-bar').style.width = `${bossHealthPercent}%`;
    document.getElementById('boss-health-text').textContent = `${Game.boss.health} / ${Game.boss.maxHealth}`;

    // Защита босса
    const bossShieldPercent = Game.boss.shield * 10;
    document.getElementById('boss-armor-bar').style.width = `${bossShieldPercent}%`;
    document.getElementById('boss-armor-text').textContent = Game.boss.shield;

    // Намерение босса
    const intentContainer = document.getElementById('boss__intent');
    if (Game.boss.nextAction) {
        intentContainer.innerHTML = `
            <i class="fas ${Game.boss.nextAction.type === 'attack' ? 'fa-fist-raised' : Game.boss.nextAction.type === 'defense' ? 'fa-shield-alt' : 'fa-star'}"></i>
            <span class="intent-text">${Game.boss.nextAction.name}: ${Game.boss.nextAction.description}</span>
        `;
    }

    // Имя и изображение босса
    document.getElementById('health-bar-label').textContent = GAME_CONFIG.boss.name;
    document.getElementById('boss__img').src = GAME_CONFIG.boss.image;

    // Имя и изображение игрока
    document.getElementById('player-card__name').textContent = GAME_CONFIG.player.name;
    if (Game.player.form===true){
        document.getElementById('player-card__img').src = "img/characterStecloBeast-hero-card.png";
    }
    else{
        document.getElementById('player-card__img').src = GAME_CONFIG.player.image;
    }

    // Обновляем кнопку завершения хода
    const endTurnBtn = document.getElementById('btn-end-turn');
    if (Game.turn === 'player' && !Game.gameOver) {
        endTurnBtn.disabled = false;
        endTurnBtn.innerHTML = '<i class="fas fa-forward"></i> Завершить ход';
    } else {
        endTurnBtn.disabled = true;
        endTurnBtn.innerHTML = '<i class="fas fa-hourglass-half"></i> Ход босса...';
    }
}

// Показать правила
// function showRules() {
//     document.getElementById('rules-modal').style.display = 'flex';
// }

// // Скрыть правила
// function hideRules() {
//     document.getElementById('rules-modal').style.display = 'none';
// }

// Нарисовать тестовую карту (для отладки)
function drawTestCard() {
    if (Game.turn === 'player' && !Game.gameOver) {
        drawCards(1);
        addToLog('Вы берете дополнительную карту');
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация игры
    initGame();

    // Кнопка завершения хода
    document.getElementById('btn-end-turn').addEventListener('click', () => {
        if (Game.turn === 'player' && !Game.gameOver) {
            Game.turn = 'boss';
            updateUI();
            updateHand();

            // Задержка перед ходом босса для драматизма
            setTimeout(() => {
                bossTurn();
            }, 1000);
        }
    });

    // Кнопка взять карту (тестовая)
    document.getElementById('btn-draw').addEventListener('click', drawTestCard);

    // Кнопка перезапуска игры
    document.getElementById('restart-btn').addEventListener('click', () => location.reload());

    // Кнопка помощи (правила)
    // document.getElementById('help-btn').addEventListener('click', showRules);

    // Закрытие модального окна правил
    // document.getElementById('close-rules-btn').addEventListener('click', hideRules);

});

// открытие меню 
const sideMenu = document.querySelector('.left-menu');

const menuBtn = document.querySelector('#menu-btn');

const closeBtn = document.querySelector('#close-btn');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
    menuBtn.style.display = "none";
})

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
    menuBtn.style.display = "block";
})

// Появление анимации при появление и нажатий
const loading = document.getElementById('loading');
const loadingFirst = document.getElementById('first');
const loadingSecond = document.getElementById('second');
const loadingbtn = document.getElementById('loadingbtn');

loading.style.display = "block";
loadingFirst.style.display = "block";
loadingSecond.style.display = "block";
loading.style.animation = "loadingExit 5s forwards";
loadingFirst.style.animation = "loadingExit 4s forwards";
loadingSecond.style.animation = "loadingExit 3s forwards";

// loadingbtn.addEventListener('click', () => {
//     loading.style.display = "block";
//     loadingFirst.style.display = "block";
//     loadingSecond.style.display = "block";
//     loading.style.animation = "loading 8s forwards";
//     loadingFirst.style.animation = "loading 5s forwards";
//     loadingSecond.style.animation = "loading 4s forwards";

// setTimeout(() => {
//   window.location.replace('game.html');
// }, 5000);


// })



