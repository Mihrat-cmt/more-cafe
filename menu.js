document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");

        // MORÉ — scroll reveal для страницы MENU
    const revealElements = document.querySelectorAll(
        ".menu-section-header, .menu-item, .menu-end > span, .menu-end h2, .menu-end a"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -7% 0px"
        });

        revealElements.forEach((element, index) => {
            element.classList.add("menu-reveal");
            element.style.setProperty(
                "--reveal-delay",
                `${Math.min(index % 5, 4) * 90}ms`
            );

            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    const modal = document.createElement("div");
    modal.className = "dish-modal";

    modal.innerHTML = `
        <div class="dish-modal-overlay"></div>

        <div class="dish-modal-content"
             role="dialog"
             aria-modal="true"
             aria-labelledby="dish-modal-title">

            <button class="dish-modal-close" type="button"
                    aria-label="Закрыть окно">&times;</button>

            <section class="dish-hero">
                <img class="dish-modal-image" src="" alt="">
                <div class="dish-hero-shade"></div>

                <div class="dish-hero-top">
                    <span class="dish-hero-logo">MORÉ</span>
                    <span class="dish-hero-edition">
                        A DAY AT MORÉ · SIGNATURE MENU
                    </span>
                </div>

                <div class="dish-hero-copy">
                    <span class="dish-hero-eyebrow">
                        MADE FOR SLOW MOMENTS
                    </span>
                    <h2 id="dish-modal-title"></h2>
                    <p class="dish-modal-description"></p>
                </div>

                <div class="dish-hero-bottom">
                    <span>GOOD FOOD. UNHURRIED MOMENTS.</span>
                    <span class="dish-hero-scroll">
                        SCROLL TO DISCOVER <span>↓</span>
                    </span>
                </div>
            </section>



<section class="dish-recipe dish-art art-compact">

  <div class="compact-topline">
    <span>MORÉ®</span>
    <span>THE SIGNATURE EDITION — № 01</span>
  </div>

  <div class="compact-hero">
    <div class="compact-hero-copy">
      <span class="compact-eyebrow">A LITTLE MOMENT OF JOY</span>
      <h2>Made with<br /><em>intention.</em></h2>
      <span class="compact-side-note">GOOD FOOD, GOOD MOOD.</span>
    </div>

    <div class="compact-photo-frame">
      <span class="compact-photo-number">M / 01</span>
      <img class="editorial-dish-image" src="" alt="" />
      <span class="compact-photo-caption">THE ART OF TASTE</span>
    </div>

    <span class="compact-hero-star" aria-hidden="true">✳</span>
  </div>

  <div class="compact-info">
    <div class="compact-info-heading">
      <span>01 / THE INGREDIENTS</span>
      <span>SELECTED WITH CARE</span>
    </div>

    <p class="dish-modal-description compact-description"></p>

    <div class="dish-modal-ingredients"></div>

    <div class="compact-taste">
      <div class="compact-info-heading">
        <span>02 / THE FEELING</span>
        <span>FLAVOUR NOTES</span>
      </div>

      <p class="dish-modal-taste-notes"></p>
      <div class="dish-modal-taste-tags"></div>
    </div>
  </div>

  <div class="compact-price">
    <div>
      <span class="compact-price-label">YOUR MOMENT AT MORÉ</span>
      <span class="compact-price-caption">FRESHLY PREPARED</span>
    </div>

    <span class="dish-modal-price"></span>
  </div>

  <div class="compact-footer">
    <span class="dish-footer-logo">MORÉ</span>
    <span class="dish-footer-message">A moment worth keeping.</span>
    <button class="dish-recipe-back" type="button">
      <span>BACK TO MENU</span>
      <span aria-hidden="true">↗</span>
    </button>
  </div>

</section>



        </div>
    `;

    document.body.appendChild(modal);

    const modalTranslations = {
    en: {
        close: "Close",
        edition: "A DAY AT MORÉ · SIGNATURE MENU",
        eyebrow: "MADE FOR SLOW MOMENTS",
        bottom: "GOOD FOOD. UNHURRIED MOMENTS.",
        scroll: "SCROLL TO DISCOVER",
        compactEdition: "THE SIGNATURE EDITION — № 01",
        joy: "A LITTLE MOMENT OF JOY",
        made: "Made with<br><em>intention.</em>",
        mood: "GOOD FOOD, GOOD MOOD.",
        photo: "THE ART OF TASTE",
        ingredients: "01 / THE INGREDIENTS",
        selected: "SELECTED WITH CARE",
        feeling: "02 / THE FEELING",
        flavour: "FLAVOUR NOTES",
        price: "YOUR MOMENT AT MORÉ",
        prepared: "FRESHLY PREPARED",
        footer: "A moment worth keeping.",
        back: "BACK TO MENU"
    },
    ru: {
        close: "Закрыть окно",
        edition: "ДЕНЬ В MORÉ · ФИРМЕННОЕ МЕНЮ",
        eyebrow: "ДЛЯ НЕСПЕШНЫХ МОМЕНТОВ",
        bottom: "ВКУСНАЯ ЕДА. НИКАКОЙ СПЕШКИ.",
        scroll: "ЛИСТАЙТЕ НИЖЕ",
        compactEdition: "ФИРМЕННАЯ КОЛЛЕКЦИЯ — № 01",
        joy: "МАЛЕНЬКИЙ МОМЕНТ РАДОСТИ",
        made: "Создано с<br><em>душой.</em>",
        mood: "ВКУСНАЯ ЕДА, ХОРОШЕЕ НАСТРОЕНИЕ.",
        photo: "ИСКУССТВО ВКУСА",
        ingredients: "01 / ИНГРЕДИЕНТЫ",
        selected: "ТЩАТЕЛЬНО ОТОБРАНЫ",
        feeling: "02 / ВКУСОВОЕ ВПЕЧАТЛЕНИЕ",
        flavour: "ОТТЕНКИ ВКУСА",
        price: "ВАШ МОМЕНТ В MORÉ",
        prepared: "ПРИГОТОВЛЕНО С ЗАБОТОЙ",
        footer: "Момент, который хочется сохранить.",
        back: "НАЗАД К МЕНЮ"
    }
    
};

function applyModalTranslations() {
    const lang = localStorage.getItem("moreLanguage") || "en";
    const t = modalTranslations[lang] || modalTranslations.en;

    const setText = (selector, value) => {
        const element = modal.querySelector(selector);
        if (element) element.textContent = value;
    };

    setText(".dish-modal-close", "×");
    modal.querySelector(".dish-modal-close")?.setAttribute("aria-label", t.close);
    setText(".dish-hero-edition", t.edition);
    setText(".dish-hero-eyebrow", t.eyebrow);
    setText(".dish-hero-bottom > span:first-child", t.bottom);
    setText(".dish-hero-scroll", t.scroll);
    setText(".compact-topline span:last-child", t.compactEdition);
    setText(".compact-eyebrow", t.joy);

    const made = modal.querySelector(".compact-hero-copy h2");
    if (made) made.innerHTML = t.made;

    setText(".compact-side-note", t.mood);
    setText(".compact-photo-caption", t.photo);
    setText(".compact-info-heading:first-child span:first-child", t.ingredients);
    setText(".compact-info-heading:first-child span:last-child", t.selected);
    setText(".compact-taste .compact-info-heading span:first-child", t.feeling);
    setText(".compact-taste .compact-info-heading span:last-child", t.flavour);
    setText(".compact-price-label", t.price);
    setText(".compact-price-caption", t.prepared);
    setText(".dish-footer-message", t.footer);
    setText(".dish-recipe-back span:first-child", t.back);
}

window.applyModalTranslations = applyModalTranslations;

    // MORÉ — появление содержимого модального окна при прокрутке
const modalRevealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-modal-visible");
            modalRevealObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
    }
);

function observeModalContent() {
    const elements = modal.querySelectorAll(
        ".compact-info-heading, " +
        ".compact-description, " +
        ".dish-modal-ingredients, " +
        ".dish-ingredient-tag, " +
        ".compact-taste, " +
        ".dish-modal-taste-tags, " +
        ".dish-taste-tag, " +
        ".compact-price, " +
        ".compact-footer, " +
        ".dish-recipe-back"
    );

    elements.forEach((element, index) => {
        element.classList.remove("is-modal-visible");
        element.classList.add("modal-scroll-reveal");

        element.style.setProperty(
            "--modal-reveal-delay",
            `${Math.min(index, 5) * 120}ms`
        );

        modalRevealObserver.observe(element);
    });
}

    const modalContent = modal.querySelector(".dish-modal-content");
    const modalImage = modal.querySelector(".dish-modal-image");
    const editorialDishImage = modal.querySelector(".editorial-dish-image");
    const modalTitle = modal.querySelector("#dish-modal-title");
    const modalDescription = modal.querySelector(".dish-modal-description");
    const compactDescription = modal.querySelector(".compact-description");
    const modalIngredients = modal.querySelector(".dish-modal-ingredients");
    const modalTasteNotes = modal.querySelector(".dish-modal-taste-notes");
    const modalTasteTags = modal.querySelector(".dish-modal-taste-tags");
    const modalPrice = modal.querySelector(".dish-modal-price");
    const closeButton = modal.querySelector(".dish-modal-close");
    const overlay = modal.querySelector(".dish-modal-overlay");
    const backButton = modal.querySelector(".dish-recipe-back");

    let lastFocusedItem = null;
    let previousBodyOverflow = "";
    let previousBodyPaddingRight = "";
    let closeTimer = null;
    let imageRequestId = 0;

    const dishes = {
        "AVOCADO TOAST": {
            image: "images/menu/avocado-toast.jpg",
            description: "A fresh and balanced start to your day.",
            ingredients: ["Sourdough", "Avocado", "Poached egg"],
            tasteNotes: "Creamy avocado, crisp sourdough and a delicate, silky egg. Fresh, savoury and beautifully balanced.",
            tasteTags: ["CREAMY", "CRISP", "FRESH"]
        },

        "FRENCH TOAST": {
            image: "images/menu/french-toast.jpg",
            description: "Golden brioche with berries and soft vanilla cream.",
            ingredients: ["Brioche", "Berries", "Vanilla cream"],
            tasteNotes: "Warm, buttery brioche meets sweet vanilla cream and bright berry notes. Soft inside, golden outside.",
            tasteTags: ["GOLDEN", "SWEET", "SOFT"]
        },

        "EGGS BENEDICT": {
            image: "images/menu/eggs-benedict.jpg",
            description: "A MORÉ breakfast classic with silky hollandaise.",
            ingredients: ["Sourdough", "Poached eggs", "Hollandaise"],
            tasteNotes: "Rich and velvety hollandaise, delicate eggs and toasted sourdough. A savoury classic with a buttery finish.",
            tasteTags: ["SAVOURY", "BUTTERY", "SILKY"]
        },

        "MORÉ GRANOLA": {
            image: "images/menu/more-granola.jpg",
            description: "A light, fresh bowl for a slow morning.",
            ingredients: ["Greek yogurt", "Granola", "Seasonal fruit"],
            tasteNotes: "Cool, creamy yogurt with crunchy granola and juicy fruit. Fresh, gently sweet and full of texture.",
            tasteTags: ["FRESH", "CRUNCHY", "LIGHT"]
        },

        "BURRATA & TOMATO": {
            image: "images/menu/burrata-tomato.jpg",
            description: "Creamy burrata with ripe tomatoes and fresh basil.",
            ingredients: ["Burrata", "Heirloom tomato", "Basil", "Olive oil"],
            tasteNotes: "Delicate, milky burrata pairs with juicy tomatoes, fragrant basil and a smooth olive-oil finish.",
            tasteTags: ["CREAMY", "JUICY", "HERBAL"]
        },

        "CHICKEN PASTA": {
            image: "images/menu/chicken-pasta.jpg",
            description: "Comforting pasta with chicken and parmesan cream.",
            ingredients: ["Tagliatelle", "Chicken", "Parmesan", "Cream"],
            tasteNotes: "Tender chicken and silky cream coat every ribbon of pasta. Comforting, savoury and finished with parmesan.",
            tasteTags: ["CREAMY", "TENDER", "SAVOURY"]
        },

        "MORÉ BURGER": {
            image: "images/menu/more-burger.jpg",
            description: "A house burger made for an unhurried lunch.",
            ingredients: ["Beef", "Brioche", "Cheddar", "House sauce"],
            tasteNotes: "Juicy beef, melted cheddar and soft brioche come together with a rich house sauce. Hearty, savoury and satisfying.",
            tasteTags: ["JUICY", "RICH", "HEARTY"]
        },

        "CAESAR SALAD": {
            image: "images/menu/caesar-salad.jpg",
            description: "A fresh classic with a savoury parmesan finish.",
            ingredients: ["Romaine", "Chicken", "Parmesan", "Crispy bread"],
            tasteNotes: "Crisp greens, tender chicken and crunchy bread meet a creamy, savoury dressing and a delicate parmesan finish.",
            tasteTags: ["CRISP", "CREAMY", "SAVOURY"]
        },

        "TIRAMISU": {
            image: "images/menu/tiramisu.jpg",
            description: "A delicate coffee dessert with a cocoa finish.",
            ingredients: ["Mascarpone", "Espresso", "Cocoa"],
            tasteNotes: "Airy mascarpone cream, mellow coffee notes and a light cocoa bitterness. Soft, delicate and not overly sweet.",
            tasteTags: ["COFFEE", "DELICATE", "COCOA"]
        },

        "PISTACHIO CAKE": {
            image: "images/menu/pistachio-cake.jpg",
            description: "Soft cream and delicate pistachio flavours.",
            ingredients: ["Pistachio", "Vanilla", "Soft cream"],
            tasteNotes: "Gentle nutty pistachio notes meet smooth vanilla cream. Delicate, creamy and quietly indulgent.",
            tasteTags: ["NUTTY", "CREAMY", "DELICATE"]
        },

        "ICED LATTE": {
            image: "images/menu/iced-latte.jpg",
            description: "Smooth espresso, cold milk and ice.",
            ingredients: ["Espresso", "Milk", "Ice"],
            tasteNotes: "Bold espresso softened by cold, creamy milk. Smooth, refreshing and balanced between coffee and sweetness.",
            tasteTags: ["SMOOTH", "CREAMY", "REFRESHING"]
        },

        "ESPRESSO TONIC": {
            image: "images/menu/espresso-tonic.jpg",
            description: "Bright espresso balanced with refreshing tonic.",
            ingredients: ["Espresso", "Tonic", "Citrus"],
            tasteNotes: "Bubbly and crisp, with bright citrus notes and a gentle espresso bitterness. Refreshing, lively and unexpected.",
            tasteTags: ["BRIGHT", "CITRUS", "SPARKLING"]
        },

        "TRUFFLE PASTA": {
            image: "images/menu/truffle-pasta.jpg",
            description: "Rich pasta with parmesan and the aroma of truffle.",
            ingredients: ["Tagliatelle", "Truffle", "Parmesan"],
            tasteNotes: "Silky pasta with deep, earthy truffle aromas and savoury parmesan. Rich, aromatic and wonderfully smooth.",
            tasteTags: ["EARTHY", "AROMATIC", "RICH"]
        },

        "STEAK & POTATO": {
            image: "images/menu/steak-potato.jpg",
            description: "A hearty dinner with herb butter and golden potatoes.",
            ingredients: ["Beef steak", "Potatoes", "Herb butter"],
            tasteNotes: "Savoury steak with golden potatoes and fragrant herb butter. Rich, hearty and balanced by fresh herbal notes.",
            tasteTags: ["SAVOURY", "HEARTY", "HERBAL"]
        },

        "BURRATA": {
            image: "images/menu/burrata.jpg",
            description: "Creamy burrata with roasted vegetables and herbs.",
            ingredients: ["Burrata", "Roasted vegetables", "Herbs"],
            tasteNotes: "Soft, creamy cheese meets the sweetness of roasted vegetables and fragrant herbs. Delicate, mellow and savoury.",
            tasteTags: ["CREAMY", "MELLOW", "FRESH"]
        },

        "CHOCOLATE FONDANT": {
            image: "images/menu/chocolate-fondant.jpg",
            description: "A rich chocolate dessert served with vanilla ice cream.",
            ingredients: ["Dark chocolate", "Vanilla ice cream"],
            tasteNotes: "Intense dark chocolate meets cool, creamy vanilla. Warm, smooth and bittersweet with a comforting finish.",
            tasteTags: ["CHOCOLATE", "BITTERSWEET", "VELVETY"]
        }
    };

    const localizedDishes = {
    ru: {
        "AVOCADO TOAST": {
            description: "Свежий и сбалансированный завтрак.",
            ingredients: ["Хлеб на закваске", "Авокадо", "Яйцо пашот"],
            tasteNotes: "Нежное авокадо, хрустящий хлеб и мягкое яйцо. Свежий, насыщенный и гармоничный вкус.",
            tasteTags: ["НЕЖНЫЙ", "ХРУСТЯЩИЙ", "СВЕЖИЙ"]
        },
        "FRENCH TOAST": {
            description: "Румяная бриошь с ягодами и нежным ванильным кремом.",
            ingredients: ["Бриошь", "Ягоды", "Ванильный крем"],
            tasteNotes: "Сливочная бриошь сочетается со сладким ванильным кремом и ягодной свежестью. Нежная внутри, золотистая снаружи.",
            tasteTags: ["РУМЯНЫЙ", "СЛАДКИЙ", "НЕЖНЫЙ"]
        },
        "EGGS BENEDICT": {
            description: "Завтрак-классика MORÉ с нежным голландским соусом.",
            ingredients: ["Хлеб на закваске", "Яйца пашот", "Голландский соус"],
            tasteNotes: "Бархатистый голландский соус, нежные яйца и поджаренный хлеб. Классический вкус с тонкими сливочными нотами.",
            tasteTags: ["ПИКАНТНЫЙ", "СЛИВОЧНЫЙ", "НЕЖНЫЙ"]
        },
        "MORÉ GRANOLA": {
            description: "Лёгкая и свежая гранола для неспешного утра.",
            ingredients: ["Греческий йогурт", "Гранола", "Сезонные фрукты"],
            tasteNotes: "Прохладный нежный йогурт, хрустящая гранола и сочные фрукты. Свежо, слегка сладко и разнообразно по текстуре.",
            tasteTags: ["СВЕЖИЙ", "ХРУСТЯЩИЙ", "ЛЁГКИЙ"]
        },
        "BURRATA & TOMATO": {
            description: "Нежная буррата со спелыми томатами и свежим базиликом.",
            ingredients: ["Буррата", "Томаты", "Базилик", "Оливковое масло"],
            tasteNotes: "Нежная молочная буррата сочетается с сочными томатами, ароматным базиликом и мягкими нотами оливкового масла.",
            tasteTags: ["НЕЖНЫЙ", "СОЧНЫЙ", "АРОМАТНЫЙ"]
        },
        "CHICKEN PASTA": {
            description: "Паста с курицей и сливочным соусом с пармезаном.",
            ingredients: ["Тальятелле", "Курица", "Пармезан", "Сливки"],
            tasteNotes: "Нежная курица и бархатистый сливочный соус обволакивают пасту. Сытный вкус с завершением из пармезана.",
            tasteTags: ["СЛИВОЧНЫЙ", "НЕЖНЫЙ", "ПИКАНТНЫЙ"]
        },
        "MORÉ BURGER": {
            description: "Фирменный бургер для неспешного обеда.",
            ingredients: ["Говядина", "Бриошь", "Чеддер", "Фирменный соус"],
            tasteNotes: "Сочная говядина, расплавленный чеддер и мягкая бриошь с насыщенным фирменным соусом. Сытно и гармонично.",
            tasteTags: ["СОЧНЫЙ", "НАСЫЩЕННЫЙ", "СЫТНЫЙ"]
        },
        "CAESAR SALAD": {
            description: "Свежая классика с выразительным вкусом пармезана.",
            ingredients: ["Салат романо", "Курица", "Пармезан", "Хрустящий хлеб"],
            tasteNotes: "Хрустящая зелень, нежная курица и хлеб сочетаются с кремовой заправкой и тонкими нотами пармезана.",
            tasteTags: ["ХРУСТЯЩИЙ", "СЛИВОЧНЫЙ", "ПИКАНТНЫЙ"]
        },
        "TIRAMISU": {
            description: "Нежный кофейный десерт с нотами какао.",
            ingredients: ["Маскарпоне", "Эспрессо", "Какао"],
            tasteNotes: "Воздушный крем маскарпоне, мягкие кофейные ноты и лёгкая горчинка какао. Нежный и не слишком сладкий вкус.",
            tasteTags: ["КОФЕЙНЫЙ", "НЕЖНЫЙ", "КАКАО"]
        },
        "PISTACHIO CAKE": {
            description: "Нежный крем и деликатный вкус фисташки.",
            ingredients: ["Фисташка", "Ваниль", "Нежный крем"],
            tasteNotes: "Мягкие ореховые ноты фисташки сочетаются с гладким ванильным кремом. Нежный, сливочный и изысканный вкус.",
            tasteTags: ["ОРЕХОВЫЙ", "СЛИВОЧНЫЙ", "НЕЖНЫЙ"]
        },
        "ICED LATTE": {
            description: "Насыщенный эспрессо, холодное молоко и лёд.",
            ingredients: ["Эспрессо", "Молоко", "Лёд"],
            tasteNotes: "Выразительный эспрессо смягчается холодным сливочным молоком. Освежающий и сбалансированный вкус.",
            tasteTags: ["МЯГКИЙ", "СЛИВОЧНЫЙ", "ОСВЕЖАЮЩИЙ"]
        },
        "ESPRESSO TONIC": {
            description: "Яркий эспрессо с освежающим тоником.",
            ingredients: ["Эспрессо", "Тоник", "Цитрус"],
            tasteNotes: "Искристый напиток с цитрусовыми нотами и лёгкой горчинкой эспрессо. Свежий, яркий и необычный.",
            tasteTags: ["ЯРКИЙ", "ЦИТРУСОВЫЙ", "ИСКРИСТЫЙ"]
        },
        "TRUFFLE PASTA": {
            description: "Насыщенная паста с пармезаном и ароматом трюфеля.",
            ingredients: ["Тальятелле", "Трюфель", "Пармезан"],
            tasteNotes: "Нежная паста с глубоким земляным ароматом трюфеля и пикантным пармезаном. Насыщенный и выразительный вкус.",
            tasteTags: ["ГЛУБОКИЙ", "АРОМАТНЫЙ", "НАСЫЩЕННЫЙ"]
        },
        "STEAK & POTATO": {
            description: "Сытный ужин с ароматным маслом с травами и золотистым картофелем.",
            ingredients: ["Стейк из говядины", "Картофель", "Масло с травами"],
            tasteNotes: "Сочный стейк, золотистый картофель и ароматное масло с травами. Насыщенный вкус с приятными травяными нотами.",
            tasteTags: ["ПИКАНТНЫЙ", "СЫТНЫЙ", "ТРАВЯНОЙ"]
        },
        "BURRATA": {
            description: "Нежная буррата с запечёнными овощами и зеленью.",
            ingredients: ["Буррата", "Запечённые овощи", "Зелень"],
            tasteNotes: "Мягкий сливочный сыр сочетается со сладостью запечённых овощей и ароматной зеленью. Деликатный и насыщенный вкус.",
            tasteTags: ["СЛИВОЧНЫЙ", "МЯГКИЙ", "СВЕЖИЙ"]
        },
        "CHOCOLATE FONDANT": {
            description: "Насыщенный шоколадный десерт с ванильным мороженым.",
            ingredients: ["Тёмный шоколад", "Ванильное мороженое"],
            tasteNotes: "Глубокий вкус тёмного шоколада встречается с прохладной нежностью ванили. Тёплый, бархатистый и с лёгкой горчинкой.",
            tasteTags: ["ШОКОЛАДНЫЙ", "С ГОРЧИНКОЙ", "БАРХАТНЫЙ"]
        }
    }
    
    
};

    function renderIngredients(ingredients) {
        modalIngredients.replaceChildren();

        ingredients.forEach((ingredient, index) => {
            const tag = document.createElement("span");
            tag.className = "dish-ingredient-tag";
            tag.style.setProperty("--ingredient-index", index);

            const number = document.createElement("span");
            number.className = "dish-ingredient-number";
            number.textContent = String(index + 1).padStart(2, "0");

            const name = document.createElement("span");
            name.className = "dish-ingredient-name";
            name.textContent = ingredient;

            tag.append(number, name);
            modalIngredients.appendChild(tag);
        });
    }

    function renderTasteTags(tags) {
        modalTasteTags.replaceChildren();

        tags.forEach((taste, index) => {
            const tag = document.createElement("span");
            tag.className = "dish-taste-tag";
            tag.style.setProperty("--taste-index", index);

            const number = document.createElement("span");
            number.className = "dish-taste-number";
            number.textContent = `0${index + 1}`;

            const label = document.createElement("span");
            label.className = "dish-taste-name";
            label.textContent = taste;

            tag.append(number, label);
            modalTasteTags.appendChild(tag);
        });
    }

    function resetDishScroll() {
        modal.scrollTop = 0;
        modalContent.scrollTop = 0;
    }

    function lockPageScroll() {
        previousBodyOverflow = document.body.style.overflow;
        previousBodyPaddingRight = document.body.style.paddingRight;

        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
    }

    function unlockPageScroll() {
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.paddingRight = previousBodyPaddingRight;
    }

    function openDish(item) {
        if (
            modal.classList.contains("is-open") ||
            modal.classList.contains("is-closing")
        ) {
            return;
        }

        const title = item.querySelector("h2");
        const price = item.querySelector(".menu-price");

        if (!title || !price) {
            console.warn("Не найдено название или цена блюда:", item);
            return;
        }

        const dishKey = title.dataset.i18n;
const name = Object.keys(dishes).find(
    key => `menu.dish.${{
        "AVOCADO TOAST": "avocado",
        "FRENCH TOAST": "frenchToast",
        "EGGS BENEDICT": "benedict",
        "MORÉ GRANOLA": "granola",
        "BURRATA & TOMATO": "burrataTomato",
        "CHICKEN PASTA": "chickenPasta",
        "MORÉ BURGER": "burger",
        "CAESAR SALAD": "caesar",
        "TIRAMISU": "tiramisu",
        "PISTACHIO CAKE": "pistachioCake",
        "ICED LATTE": "icedLatte",
        "ESPRESSO TONIC": "espressoTonic",
        "TRUFFLE PASTA": "trufflePasta",
        "STEAK & POTATO": "steak",
        "BURRATA": "burrata",
        "CHOCOLATE FONDANT": "fondant"
    }[key]}` === dishKey
);
const dish = dishes[name];

        if (!dish) {
            console.warn("Для блюда нет данных в menu.js:", name);
            return;
        }

        lastFocusedItem = item;

        const language = localStorage.getItem("moreLanguage") || "en";

const translatedDish =
    localizedDishes[language]?.[name] || dish;

modalTitle.textContent = title.textContent.trim();
modalDescription.textContent = translatedDish.description;
compactDescription.textContent = translatedDish.description;
modalTasteNotes.textContent = translatedDish.tasteNotes;
modalPrice.textContent = price.textContent.trim();

renderIngredients(translatedDish.ingredients);
renderTasteTags(translatedDish.tasteTags);

applyModalTranslations();

        modal.classList.toggle("is-burger-dish", name === "MORÉ BURGER");

        

        const requestId = ++imageRequestId;
        modal.classList.remove("is-image-ready");

        modalImage.onload = () => {
            if (
                requestId === imageRequestId &&
                modal.classList.contains("is-open")
            ) {
                modal.classList.add("is-image-ready");
            }
        };

        modalImage.onerror = () => {
            if (requestId === imageRequestId) {
                console.error("Не удалось загрузить фото:", dish.image);
            }
        };

        modalImage.alt = name;
modalImage.src = dish.image;

editorialDishImage.alt = "";
editorialDishImage.src = dish.image;

if (modalImage.complete && modalImage.naturalWidth > 0) {
    modal.classList.add("is-image-ready");
}

lockPageScroll();
resetDishScroll();

modal.classList.remove("dish-animate-in");
modal.classList.add("is-open");
document.body.classList.add("dish-modal-open");

requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        if (modal.classList.contains("is-open")) {
            modal.classList.add("dish-animate-in");
            observeModalContent();
        }
    });
});
        requestAnimationFrame(() => {
            if (modal.classList.contains("is-open")) {
                resetDishScroll();
            }
        });

        closeButton.focus({ preventScroll: true });
    }

    function closeDish() {
        if (!modal.classList.contains("is-open")) return;

        imageRequestId++;

        

        modal.classList.remove("is-open");
        modal.classList.add("is-closing");

        if (closeTimer) clearTimeout(closeTimer);

        closeTimer = setTimeout(() => {
            modal.classList.remove(
                "is-closing",
                "is-image-ready",
                "is-burger-dish",
                "dish-animate-in"
            );

            modalImage.removeAttribute("src");
            document.body.classList.remove("dish-modal-open");

            unlockPageScroll();

            if (lastFocusedItem) {
                lastFocusedItem.focus({ preventScroll: true });
            }

            closeTimer = null;
        }, 300);
    }

    menuItems.forEach((item) => {
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-haspopup", "dialog");

        item.addEventListener("click", () => openDish(item));

        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openDish(item);
            }
        });
    });

    closeButton.addEventListener("click", closeDish);
    backButton.addEventListener("click", closeDish);
    overlay.addEventListener("click", closeDish);

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {
            closeDish();
        }
    });

    
});