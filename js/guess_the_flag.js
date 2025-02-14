document.addEventListener('DOMContentLoaded', function() {
    const flagsContainer = document.getElementById('flags-container');
    const flagFolder = 'img/flags_h240/';
    const flagCodes = ['ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv', 'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tz', 'ua', 'ug', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'za', 'zm', 'zw'];
    const countryNames = {
        'ad': 'Andorra', 'ae': 'United Arab Emirates', 'af': 'Afghanistan', 'ag': 'Antigua and Barbuda', 'ai': 'Anguilla', 'al': 'Albania', 'am': 'Armenia', 'ao': 'Angola', 'aq': 'Antarctica', 'ar': 'Argentina', 'as': 'American Samoa', 'at': 'Austria', 'au': 'Australia', 'aw': 'Aruba', 'ax': 'Åland Islands', 'az': 'Azerbaijan', 'ba': 'Bosnia and Herzegovina', 'bb': 'Barbados', 'bd': 'Bangladesh', 'be': 'Belgium', 'bf': 'Burkina Faso', 'bg': 'Bulgaria', 'bh': 'Bahrain', 'bi': 'Burundi', 'bj': 'Benin', 'bl': 'Saint Barthélemy', 'bm': 'Bermuda', 'bn': 'Brunei', 'bo': 'Bolivia', 'bq': 'Bonaire', 'br': 'Brazil', 'bs': 'Bahamas', 'bt': 'Bhutan', 'bv': 'Bouvet Island', 'bw': 'Botswana', 'by': 'Belarus', 'bz': 'Belize', 'ca': 'Canada', 'cc': 'Cocos (Keeling) Islands', 'cd': 'Congo (Kinshasa)', 'cf': 'Central African Republic', 'cg': 'Congo (Brazzaville)', 'ch': 'Switzerland', 'ci': 'Côte d’Ivoire', 'ck': 'Cook Islands', 'cl': 'Chile', 'cm': 'Cameroon', 'cn': 'China', 'co': 'Colombia', 'cr': 'Costa Rica', 'cu': 'Cuba', 'cv': 'Cape Verde', 'cw': 'Curaçao', 'cx': 'Christmas Island', 'cy': 'Cyprus', 'cz': 'Czech Republic', 'de': 'Germany', 'dj': 'Djibouti', 'dk': 'Denmark', 'dm': 'Dominica', 'do': 'Dominican Republic', 'dz': 'Algeria', 'ec': 'Ecuador', 'ee': 'Estonia', 'eg': 'Egypt', 'eh': 'Western Sahara', 'er': 'Eritrea', 'es': 'Spain', 'et': 'Ethiopia', 'fi': 'Finland', 'fj': 'Fiji', 'fk': 'Falkland Islands', 'fm': 'Micronesia', 'fo': 'Faroe Islands', 'fr': 'France', 'ga': 'Gabon', 'gb': 'United Kingdom', 'gd': 'Grenada', 'ge': 'Georgia', 'gf': 'French Guiana', 'gg': 'Guernsey', 'gh': 'Ghana', 'gi': 'Gibraltar', 'gl': 'Greenland', 'gm': 'Gambia', 'gn': 'Guinea', 'gp': 'Guadeloupe', 'gq': 'Equatorial Guinea', 'gr': 'Greece', 'gt': 'Guatemala', 'gu': 'Guam', 'gw': 'Guinea-Bissau', 'gy': 'Guyana', 'hk': 'Hong Kong', 'hm': 'Heard Island and McDonald Islands', 'hn': 'Honduras', 'hr': 'Croatia', 'ht': 'Haiti', 'hu': 'Hungary', 'id': 'Indonesia', 'ie': 'Ireland', 'il': 'Israel', 'im': 'Isle of Man', 'in': 'India', 'io': 'British Indian Ocean Territory', 'iq': 'Iraq', 'ir': 'Iran', 'is': 'Iceland', 'it': 'Italy', 'je': 'Jersey', 'jm': 'Jamaica', 'jo': 'Jordan', 'jp': 'Japan', 'ke': 'Kenya', 'kg': 'Kyrgyzstan', 'kh': 'Cambodia', 'ki': 'Kiribati', 'km': 'Comoros', 'kn': 'Saint Kitts and Nevis', 'kp': 'North Korea', 'kr': 'South Korea', 'kw': 'Kuwait', 'ky': 'Cayman Islands', 'kz': 'Kazakhstan', 'la': 'Laos', 'lb': 'Lebanon', 'lc': 'Saint Lucia', 'li': 'Liechtenstein', 'lk': 'Sri Lanka', 'lr': 'Liberia', 'ls': 'Lesotho', 'lt': 'Lithuania', 'lu': 'Luxembourg', 'lv': 'Latvia', 'ly': 'Libya', 'ma': 'Morocco', 'mc': 'Monaco', 'md': 'Moldova', 'me': 'Montenegro', 'mf': 'Saint Martin', 'mg': 'Madagascar', 'mh': 'Marshall Islands', 'mk': 'North Macedonia', 'ml': 'Mali', 'mm': 'Myanmar', 'mn': 'Mongolia', 'mo': 'Macao', 'mp': 'Northern Mariana Islands', 'mq': 'Martinique', 'mr': 'Mauritania', 'ms': 'Montserrat', 'mt': 'Malta', 'mu': 'Mauritius', 'mv': 'Maldives', 'mw': 'Malawi', 'mx': 'Mexico', 'my': 'Malaysia', 'mz': 'Mozambique', 'na': 'Namibia', 'nc': 'New Caledonia', 'ne': 'Niger', 'nf': 'Norfolk Island', 'ng': 'Nigeria', 'ni': 'Nicaragua', 'nl': 'Netherlands', 'no': 'Norway', 'np': 'Nepal', 'nr': 'Nauru', 'nu': 'Niue', 'nz': 'New Zealand', 'om': 'Oman', 'pa': 'Panama', 'pe': 'Peru', 'pf': 'French Polynesia', 'pg': 'Papua New Guinea', 'ph': 'Philippines', 'pk': 'Pakistan', 'pl': 'Poland', 'pm': 'Saint Pierre and Miquelon', 'pn': 'Pitcairn Islands', 'pr': 'Puerto Rico', 'pt': 'Portugal', 'pw': 'Palau', 'py': 'Paraguay', 'qa': 'Qatar', 're': 'Réunion', 'ro': 'Romania', 'rs': 'Serbia', 'ru': 'Russia', 'rw': 'Rwanda', 'sa': 'Saudi Arabia', 'sb': 'Solomon Islands', 'sc': 'Seychelles', 'sd': 'Sudan', 'se': 'Sweden', 'sg': 'Singapore', 'sh': 'Saint Helena', 'si': 'Slovenia', 'sj': 'Svalbard and Jan Mayen', 'sk': 'Slovakia', 'sl': 'Sierra Leone', 'sm': 'San Marino', 'sn': 'Senegal', 'so': 'Somalia', 'sr': 'Suriname', 'ss': 'South Sudan', 'st': 'São Tomé and Príncipe', 'sv': 'El Salvador', 'sx': 'Sint Maarten', 'sy': 'Syria', 'sz': 'Eswatini', 'tc': 'Turks and Caicos Islands', 'td': 'Chad', 'tf': 'French Southern Territories', 'tg': 'Togo', 'th': 'Thailand', 'tj': 'Tajikistan', 'tk': 'Tokelau', 'tl': 'Timor-Leste', 'tm': 'Turkmenistan', 'tn': 'Tunisia', 'to': 'Tonga', 'tr': 'Turkey', 'tt': 'Trinidad and Tobago', 'tv': 'Tuvalu', 'tz': 'Tanzania', 'ua': 'Ukraine', 'ug': 'Uganda', 'us': 'United States', 'uy': 'Uruguay', 'uz': 'Uzbekistan', 'va': 'Vatican City', 'vc': 'Saint Vincent and the Grenadines', 've': 'Venezuela', 'vg': 'British Virgin Islands', 'vi': 'U.S. Virgin Islands', 'vn': 'Vietnam', 'vu': 'Vanuatu', 'wf': 'Wallis and Futuna', 'ws': 'Samoa', 'ye': 'Yemen', 'yt': 'Mayotte', 'za': 'South Africa', 'zm': 'Zambia', 'zw': 'Zimbabwe'
    };
    const flagsToSelect = 5;
    const selectedFlags = [];

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
            const countryName = countryNames[flagCode];
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
            Object.keys(countryNames).sort((a, b) => countryNames[a].localeCompare(countryNames[b])).forEach(code => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = countryNames[code];
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
    }

    initializeGame();

    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', function() {
        const selects = flagsContainer.querySelectorAll('select');
        let correctCount = 0;
        selects.forEach(select => {
            if (select.value === select.dataset.flagCode) {
                correctCount++;
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
});