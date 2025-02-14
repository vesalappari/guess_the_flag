document.addEventListener('DOMContentLoaded', function() {
    const flagsContainer = document.getElementById('flags-container');
    const flagFolder = 'img/flags_h240/';
    const flagCodes = ['ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv', 'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tz', 'ua', 'ug', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'za', 'zm', 'zw'];
    let countryNames = {};

    fetch('../json/countryNames.json')
        .then(response => response.json())
        .then(data => {
            countryNames = data;
            initializeGame();
        })
        .catch(error => console.error('Error loading country names:', error));
    const flagsToSelect = 5;
    const selectedFlags = [];
    const languageSelect = document.getElementById('language-select');
    const h2Element = document.querySelector('.flags-game h2');
    const infoMarker = document.querySelector('.info-marker');

    const translations = {
        en: {
            heading: 'Can You Guess All Five Flags?',
            info: 'Choose the correct countries and press submit to see the results',
            submit: 'Submit',
            newGame: 'New Game',
            tooltip: 'Please choose all five countries'
        },
        fi: {
            heading: 'Voitko arvata kaikki viisi lippua?',
            info: 'Valitse oikeat maat ja paina lähetä nähdäksesi tulokset',
            submit: 'Lähetä',
            newGame: 'Uusi peli',
            tooltip: 'Valitse kaikki viisi maata'
        }
    };

    function updateLanguage(language) {
        h2Element.textContent = translations[language].heading;
        infoMarker.setAttribute('title', translations[language].info);
        document.getElementById('submit-button').textContent = translations[language].submit;
        document.getElementById('new-game-button').textContent = translations[language].newGame;
        document.getElementById('submit-button').setAttribute('data-tooltip', translations[language].tooltip);
    }

    languageSelect.addEventListener('change', function() {
        updateLanguage(this.value);
        initializeGame();
    });

    function initializeGame() {
        flagsContainer.innerHTML = '';
        selectedFlags.length = 0;
        while (selectedFlags.length < flagsToSelect) {
            const randomIndex = Math.floor(Math.random() * flagCodes.length);
            const flagCode = flagCodes[randomIndex];
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
            defaultOption.textContent = 'Select a country';
            defaultOption.selected = true;
            defaultOption.disabled = true;
            selectElement.appendChild(defaultOption);
            Object.keys(countryNames).sort((a, b) => countryNames[a][languageSelect.value].localeCompare(countryNames[b][languageSelect.value])).forEach(code => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = countryNames[code][languageSelect.value];
                selectElement.appendChild(option);
            });
            flagsContainer.appendChild(imgElement);
            flagsContainer.appendChild(selectElement);
            selectElement.addEventListener('change', checkSelections);
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
        if (!allSelected) {
            submitButton.setAttribute('data-tooltip', translations[languageSelect.value].tooltip);
        } else {
            submitButton.removeAttribute('data-tooltip');
        }
    }

    initializeGame();

    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', function() {
        const selects = flagsContainer.querySelectorAll('select');
        let correctCount = 0;
        selects.forEach(select => {
            if (select.value === select.dataset.flagCode) {
                select.style.backgroundColor = 'green';
                select.style.color = 'white';
                correctCount++;
            } else {
                select.style.backgroundColor = 'red';
                select.style.color = 'white';
            }
        });
        const resultElement = document.getElementById('result');
        resultElement.textContent = `You got ${correctCount} out of ${flagsToSelect} correct!`;
    });

    const newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', function() {
        const resultElement = document.getElementById('result');
        resultElement.textContent = '';
        initializeGame();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateLanguage(languageSelect.value);
});