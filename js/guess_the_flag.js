let submitted = false;

document.addEventListener('DOMContentLoaded', function() {
    const flagsContainer = document.getElementById('flags-container');
    const flagFolder = 'img/flags_h240/';
    let flagCodes = [];
    let countryNames = {};
    const flagsToSelect = 5;
    const selectedFlags = [];
    const languageSelect = document.getElementById('language-select');
    const h2Element = document.querySelector('.flags-game h2');
    const infoMarker = document.querySelector('.info-marker');
    const continentSelect = document.getElementById('continent-select');

    const translations = {
        en: {
            heading: 'Can you guess all five flags?',
            info: 'Choose the correct countries and press guess to see the results',
            submit: 'Guess',
            newGame: 'New Game',
            tooltip: 'Please choose all five countries or press new game',
            selectCountry: 'Select a country',
            result: (correctCount, flagsToSelect) => `You got ${correctCount} out of ${flagsToSelect} correct!`
        },
        fi: {
            heading: 'Arvaatko kaikki viisi lippua?',
            info: 'Valitse oikeat maat ja paina arvaa nähdäksesi tulokset',
            submit: 'Arvaa',
            newGame: 'Uusi peli',
            tooltip: 'Valitse kaikki viisi maata tai paina uusi peli',
            selectCountry: 'Valitse maa',
            result: (correctCount, flagsToSelect) => `Sait ${correctCount} oikein ${flagsToSelect} lipusta!`
        }
    };

    const continentNames = {
        en: {
            world: "🌍 All Continents",
            africa: "Africa",
            asia: "Asia",
            australia: "Australia",
            europe: "Europe",
            "north-america": "North America",
            "south-america": "South America"
        },
        fi: {
            world: "🌍 Kaikki maanosat",
            africa: "Afrikka",
            asia: "Aasia",
            australia: "Australia",
            europe: "Eurooppa",
            "north-america": "Pohjois-Amerikka",
            "south-america": "Etelä-Amerikka"
        }
    };

    /* Three country codes are using same flags, so they are equivalent */
    /* If user chooses one of the equivalent flags, it is considered correct */
    const equivalentFlags = {
        "no": ["bv", "sj"],
        "bv": ["no", "sj"],
        "sj": ["no", "bv"]
    };

    // Mapping from continent to country codes
    const continentCountries = {
        africa: [
            "dz","ao","bj","bw","bf","bi","cm","cv","cf","td","km","cg","cd","dj","eg","gq","er","et","ga","gm","gh","gn","gw","ci","ke","ls","lr","ly","mg","mw","ml","mr","mu","yt","ma","mz","na","ne","ng","rw","re","sh","st","sn","sc","sl","so","za","ss","sd","sz","tz","tg","tn","ug","eh","zm","zw"
        ],
        asia: [
            "af","am","az","bh","bd","bt","bn","mm","kh","cn","cx","cc","ge","hk","in","id","ir","iq","il","jp","jo","kz","kp","kr","kw","kg","la","lb","mo","my","mv","mn","np","om","pk","ps","ph","qa","sa","sg","lk","sy","tw","tj","th","tl","tm","ae","uz","vn","ye"
        ],
        australia: [
            "au","fj","pf","gu","ki","mh","fm","nr","nc","nz","nu","mp","pw","pg","sb","ws","tk","to","tv","vu"
        ],
        europe: [
            "al","ad","at","by","be","ba","bg","hr","cy","cz","dk","ee","fo","fi","fr","de","gi","gr","va","hu","is","ie","im","it","je","lv","li","lt","lu","mt","mc","md","me","nl","mk","no","pl","pt","ro","ru","sm","rs","sk","si","es","sj","se","ch","ua","gb","gg","ax","bl","mf","pm"
        ],
        "north-america": [
            "ag","ai","aw","bs","bb","bz","bm","ca","ky","cr","cu","cw","dm","do","sv","gl","gd","gp","gt","ht","hn","jm","mq","mx","ms","ni","pa","pr","sx","kn","lc","vc","tt","tc","vg","vi","us","um"
        ],
        "south-america": [
            "ar","bo","br","cl","co","ec","fk","gf","gy","py","pe","sr","uy","ve"
        ]
    };

    function getFilteredFlagCodes() {
        const continent = continentSelect.value;
        if (continent === "world") {
            // Include all continents + Antarctica flags
            const allCodes = [...flagCodes];
            return allCodes;
        }
        return continentCountries[continent] || [];
    }

    function updateContinentNames(language) {
        const continentSelect = document.getElementById('continent-select');
        Array.from(continentSelect.options).forEach(option => {
            const val = option.value;
            if (continentNames[language][val]) {
                option.textContent = continentNames[language][val];
            }
        });
    }

    function updateLanguage(language) {
        h2Element.textContent = translations[language].heading;
        infoMarker.setAttribute('title', translations[language].info);
        document.getElementById('submit-button').textContent = translations[language].submit;
        document.getElementById('new-game-button').textContent = translations[language].newGame;
        document.getElementById('submit-button').setAttribute('data-tooltip', translations[language].tooltip);
        updateContinentNames(language);
        const selects = flagsContainer.querySelectorAll('select');
        selects.forEach(select => {
            select.querySelector('option[value=""]').textContent = translations[language].selectCountry;
            Array.from(select.options).forEach(option => {
                if (option.value) {
                    option.textContent = countryNames[option.value][language];
                }
            });
        });
    }

    languageSelect.addEventListener('change', function() {
        updateLanguage(this.value);
    });

    continentSelect.addEventListener('change', function() {
        initializeGame();
    });

    function initializeGame() {
        if (submitted) {
            submitted = false;
        };
        flagsContainer.innerHTML = '';
        selectedFlags.length = 0;
        const filteredFlagCodes = getFilteredFlagCodes();
        if (filteredFlagCodes.length < flagsToSelect) {
            // Not enough flags for this continent, show message and return
            flagsContainer.innerHTML = `<p style="color:red;">Not enough flags for this continent!</p>`;
            document.getElementById('submit-button').disabled = true;
            document.getElementById('new-game-button').disabled = false;
            return;
        }
        while (selectedFlags.length < flagsToSelect) {
            const randomIndex = Math.floor(Math.random() * filteredFlagCodes.length);
            const flagCode = filteredFlagCodes[randomIndex];
            const flagFileName = `${flagCode}.png`;
            if (!selectedFlags.includes(flagFileName)) {
                selectedFlags.push(flagFileName);
            }
        }

        selectedFlags.forEach(flag => {
            const flagCode = flag.split('.')[0];
            const countryName = countryNames[flagCode][languageSelect.value];
            const imgElement = document.createElement('img');
            imgElement.src = `${flagFolder}${flag}`;
            imgElement.alt = `Flag of ${countryName}`;
            imgElement.classList.add('flag');
            const selectElement = document.createElement('select');
            selectElement.dataset.flagCode = flagCode;
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = translations[languageSelect.value].selectCountry;
            defaultOption.selected = true;
            defaultOption.disabled = true;
            selectElement.appendChild(defaultOption);

            let allCodes = Object.keys(countryNames).filter(code => code !== flagCode);
            if (["no", "bv", "sj"].includes(flagCode)) {
                allCodes = allCodes.filter(code => !["no", "bv", "sj"].includes(code));
            }
            for (let i = allCodes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allCodes[i], allCodes[j]] = [allCodes[j], allCodes[i]];
            }
            const wrongCodes = allCodes.slice(0, 4);
            const optionCodes = [flagCode, ...wrongCodes];
            for (let i = optionCodes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionCodes[i], optionCodes[j]] = [optionCodes[j], optionCodes[i]];
            }
            optionCodes.forEach(code => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = countryNames[code][languageSelect.value];
                selectElement.appendChild(option);
            });

            flagsContainer.appendChild(imgElement);
            flagsContainer.appendChild(selectElement);
            selectElement.addEventListener('change', function() {
                checkSelections();
                window.scrollBy({ top: 300, behavior: 'smooth' });
            });
        });
        checkSelections();
    }

    function checkSelections() {
        const selects = flagsContainer.querySelectorAll('select');
        const submitButton = document.getElementById('submit-button');
        let allSelected = true;
        selects.forEach(select => {
            if (select.value === '') {
                allSelected = false;
            }
        });
        submitButton.disabled = !allSelected;
        newGameButton.disabled = allSelected;
        if (!allSelected) {
            submitButton.setAttribute('data-tooltip', translations[languageSelect.value].tooltip);
        } else {
            submitButton.removeAttribute('data-tooltip');
        }
    }

    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', function() {
        if (submitted) {
            return;
        }
        submitted = true;
        submitButton.disabled = true;
        newGameButton.disabled = false;
        const selects = flagsContainer.querySelectorAll('select');
        let correctCount = 0;
        selects.forEach(select => {
            const flagCode = select.dataset.flagCode;
            const countryName = countryNames[flagCode][languageSelect.value];
            const correctCountryElement = document.createElement('div');
            correctCountryElement.style.display = 'flex';
            correctCountryElement.style.alignItems = 'center';
            correctCountryElement.style.marginTop = '5px';

            const correctFlagImg = document.createElement('img');
            correctFlagImg.src = `${flagFolder}${flagCode}.png`;
            correctFlagImg.alt = `Flag of ${countryName}`;
            correctFlagImg.classList.add('flag');
            correctFlagImg.style.width = '30px';
            correctFlagImg.style.height = '20px';
            correctFlagImg.style.marginRight = '5px';

            const correctCountryName = document.createElement('span');
            correctCountryName.textContent = countryName;

            correctCountryElement.appendChild(correctFlagImg);
            correctCountryElement.appendChild(correctCountryName);

            const selectedValue = select.value;
            const isCorrect = selectedValue === flagCode || (equivalentFlags[flagCode] && equivalentFlags[flagCode].includes(selectedValue));

            if (isCorrect) {
                select.style.backgroundColor = 'green';
                select.style.color = 'white';
                correctCountryName.classList.add('correct-guess');
                correctCount++;
            } else {
                select.style.backgroundColor = 'red';
                select.style.color = 'white';
                correctCountryName.classList.add('incorrect-guess');
            }

            select.disabled = true;
            select.classList.add('hidden');
            select.parentNode.insertBefore(correctCountryElement, select.nextSibling);
        });
        const resultElement = document.getElementById('result');
        resultElement.textContent = translations[languageSelect.value].result(correctCount, flagsToSelect);
        
    });

    const newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', function() {
        const resultElement = document.getElementById('result');
        resultElement.textContent = '';
        initializeGame();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    Promise.all([
        fetch('../json/flag_codes.json').then(response => response.json()),
        fetch('../json/country_names.json').then(response => response.json())
    ]).then(([flagCodesData, countryNamesData]) => {
        flagCodes = flagCodesData.flagCodes;
        countryNames = countryNamesData;
        updateLanguage(languageSelect.value);
        initializeGame();
    }).catch(error => console.error('Error loading data:', error));
});