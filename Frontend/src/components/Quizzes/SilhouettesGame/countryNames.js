const countries = [
  {
    imageSrc: 'AD',
    hint: 'West Europe',
    answer: ['andorra']
  },
  {
    imageSrc: 'AE',
    hint: 'Middle East',
    answer: ['united arab emirates', 'uae', 'the emirates', 'emirates']
  },
  {
    imageSrc: 'AF',
    hint: 'Central Asia',
    answer: ['afghanistan']
  },
  {
    imageSrc: 'AG',
    hint: 'Caribbean',
    answer: ['antigua and barbuda', 'antigua']
  },
  {
    imageSrc: 'AL',
    hint: 'Balkans',
    answer: ['albania']
  },
  {
    imageSrc: 'AM',
    hint: 'Near East',
    answer: ['armenia']
  },
  {
    imageSrc: 'AO',
    hint: 'Southern Africa',
    answer: ['angola']
  },
  {
    imageSrc: 'AR',
    hint: 'South America',
    answer: ['argentina']
  },
  {
    imageSrc: 'AT',
    hint: 'West Europe',
    answer: ['austria']
  },
  {
    imageSrc: 'AU',
    hint: 'Oceania',
    answer: ['australia']
  },
  {
    imageSrc: 'AZ',
    hint: 'Near East',
    answer: ['azerbaijan']
  },
  {
    imageSrc: 'BA',
    hint: 'Balkans',
    answer: ['bosnia and herzagovina', 'bosnia']
  },
  {
    imageSrc: 'BB',
    hint: 'Caribbean',
    answer: ['barbados']
  },
  {
    imageSrc: 'BD',
    hint: 'Indian Subcontinent',
    answer: ['bangladesh']
  },
  {
    imageSrc: 'BE',
    hint: 'West Europe',
    answer: ['belgium']
  },
  {
    imageSrc: 'BF',
    hint: 'West Africa',
    answer: ['burkina faso']
  },
  {
    imageSrc: 'BH',
    hint: 'Middle East',
    answer: ['bahrain']
  },
  {
    imageSrc: 'BI',
    hint: 'East Africa',
    answer: ['burundi']
  },
  {
    imageSrc: 'BJ',
    hint: 'West Africa',
    answer: ['benin']
  },
  {
    imageSrc: 'BN',
    hint: 'South East Asia',
    answer: ['brunei']
  },
  {
    imageSrc: 'BO',
    hint: 'South America',
    answer: ['bolivia']
  },
  {
    imageSrc: 'BR',
    hint: 'South America',
    answer: ['brazil']
  },
  {
    imageSrc: 'BS',
    hint: 'Caribbean',
    answer: ['bahamas']
  },
  {
    imageSrc: 'BT',
    hint: 'Indian Subcontinent',
    answer: ['bhutan']
  },
  {
    imageSrc: 'BW',
    hint: 'Southern Africa',
    answer: ['botswana']
  },
  {
    imageSrc: 'BY',
    hint: 'East Europe',
    answer: ['belarus']
  },
  {
    imageSrc: 'BZ',
    hint: 'Central America',
    answer: ['belize']
  },
  {
    imageSrc: 'CA',
    hint: 'North America',
    answer: ['canada']
  },
  {
    imageSrc: 'CD',
    hint: 'Central Africa',
    answer: ['democratic republic of the congo', 'drc', 'congo']
  },
  {
    imageSrc: 'CF',
    hint: 'Central Africa',
    answer: ['central african republic', 'car']
  },
  {
    imageSrc: 'CG',
    hint: 'Central Africa',
    answer: ['republic of the congo', 'congo']
  },
  {
    imageSrc: 'CH',
    hint: 'West Europe',
    answer: ['switzerland']
  },
  {
    imageSrc: 'CI',
    hint: 'West Africa',
    answer: ["cote d'ivoire", 'ivory coast']
  },
  {
    imageSrc: 'CL',
    hint: 'South America',
    answer: ['chile']
  },
  {
    imageSrc: 'CM',
    hint: 'Central Africa',
    answer: ['cameroon']
  },
  {
    imageSrc: 'CO',
    hint: 'South America',
    answer: ['colombia']
  },
  {
    imageSrc: 'CR',
    hint: 'Central America',
    answer: ['costa rica']
  },
  {
    imageSrc: 'CV',
    hint: 'West Africa',
    answer: ['cabo verde', 'cape verde']
  },
  {
    imageSrc: 'CZ',
    hint: 'East Europe',
    answer: ['czechia', 'czech republic']
  },
  {
    imageSrc: 'DE',
    hint: 'West Europe',
    answer: ['germany']
  },
  {
    imageSrc: 'DJ',
    hint: 'East Africa',
    answer: ['djibouti']
  },
  {
    imageSrc: 'DK',
    hint: 'West Europe',
    answer: ['denmark']
  },
  {
    imageSrc: 'DM',
    hint: 'Caribbean',
    answer: ['dominica']
  },
  {
    imageSrc: 'DO',
    hint: 'Caribbean',
    answer: ['dominican republic']
  },
  {
    imageSrc: 'DZ',
    hint: 'North Africa',
    answer: ['algeria']
  },
  {
    imageSrc: 'EC',
    hint: 'South America',
    answer: ['ecuador']
  },
  {
    imageSrc: 'EE',
    hint: 'East Europe',
    answer: ['estonia']
  },
  {
    imageSrc: 'EG',
    hint: 'North Africa',
    answer: ['egypt']
  },
  {
    imageSrc: 'ER',
    hint: 'East Africa',
    answer: ['eritrea']
  },
  {
    imageSrc: 'ES',
    hint: 'West Europe',
    answer: ['spain']
  },
  {
    imageSrc: 'ET',
    hint: 'East Africa',
    answer: ['ethiopia']
  },
  {
    imageSrc: 'FI',
    hint: 'East Europe',
    answer: ['finland']
  },
  {
    imageSrc: 'FM',
    hint: 'Oceania',
    answer: ['the federated state of micronesia', 'micronesia']
  },
  {
    imageSrc: 'FR',
    hint: 'West Europe',
    answer: ['france']
  },
  {
    imageSrc: 'GA',
    hint: 'Central Africa',
    answer: ['gabon']
  },
  {
    imageSrc: 'GB',
    hint: 'West Europe',
    answer: ['united kingdom', 'uk']
  },
  {
    imageSrc: 'GD',
    hint: 'Caribbean',
    answer: ['grenada']
  },
  {
    imageSrc: 'GE',
    hint: 'Near East',
    answer: ['georgia']
  },
  {
    imageSrc: 'GH',
    hint: 'West Africa',
    answer: ['ghana']
  },
  {
    imageSrc: 'GM',
    hint: 'West Africa',
    answer: ['the gambia', 'gambia']
  },
  {
    imageSrc: 'GN',
    hint: 'West Africa',
    answer: ['guinea']
  },
  {
    imageSrc: 'GQ',
    hint: 'Central Africa',
    answer: ['equatorial guinea']
  },
  {
    imageSrc: 'GT',
    hint: 'Central America',
    answer: ['guatemala']
  },
  {
    imageSrc: 'GW',
    hint: 'West Africa',
    answer: ['guinea bissau']
  },
  {
    imageSrc: 'GY',
    hint: 'South America',
    answer: ['guyana']
  },
  {
    imageSrc: 'HN',
    hint: 'Central America',
    answer: ['honduras']
  },
  {
    imageSrc: 'HU',
    hint: 'East Europe',
    answer: ['hungary']
  },
  {
    imageSrc: 'ID',
    hint: 'South East Asia',
    answer: ['indonesia']
  },
  {
    imageSrc: 'IE',
    hint: 'West Europe',
    answer: ['ireland']
  },
  {
    imageSrc: 'IN',
    hint: 'Indian Subcontinent',
    answer: ['india']
  },
  {
    imageSrc: 'IS',
    hint: 'West Europe',
    answer: ['iceland']
  },
  {
    imageSrc: 'IT',
    hint: 'West Europe',
    answer: ['italy']
  },
  {
    imageSrc: 'JM',
    hint: 'Caribbean',
    answer: ['jamaica']
  },
  {
    imageSrc: 'KE',
    hint: 'East Africa',
    answer: ['kenya']
  },
  {
    imageSrc: 'KG',
    hint: 'Central Asia',
    answer: ['kyrgyzstan']
  },
  {
    imageSrc: 'KH',
    hint: 'South East Asia',
    answer: ['cambodia']
  },
  {
    imageSrc: 'KM',
    hint: 'East Africa',
    answer: ['comoros']
  },
  {
    imageSrc: 'KN',
    hint: 'Caribbean',
    answer: [
      'saint kitts and nevis',
      'st kitts and nevis',
      'saint kitts',
      'st kitts'
    ]
  },
  {
    imageSrc: 'KP',
    hint: 'East Asia',
    answer: ['north korea']
  },
  {
    imageSrc: 'KR',
    hint: 'East Asia',
    answer: ['south korea']
  },
  {
    imageSrc: 'KW',
    hint: 'Middle East',
    answer: ['kuwait']
  },
  {
    imageSrc: 'KZ',
    hint: 'Central Asia',
    answer: ['kazakhstan']
  },
  {
    imageSrc: 'LA',
    hint: 'South East Asia',
    answer: ['laos']
  },
  {
    imageSrc: 'LB',
    hint: 'Near East',
    answer: ['lebanon']
  },
  {
    imageSrc: 'LC',
    hint: 'Caribbean',
    answer: ['saint lucia', 'st lucia']
  },
  {
    imageSrc: 'LI',
    hint: 'West Europe',
    answer: ['liechtenstein']
  },
  {
    imageSrc: 'LK',
    hint: 'Indian Subcontinent',
    answer: ['sri lanka']
  },
  {
    imageSrc: 'LR',
    hint: 'West Africa',
    answer: ['liberia']
  },
  {
    imageSrc: 'LS',
    hint: 'Southern Africa',
    answer: ['lesotho']
  },
  {
    imageSrc: 'LT',
    hint: 'East Europe',
    answer: ['lithuania']
  },
  {
    imageSrc: 'LU',
    hint: 'West Europe',
    answer: ['luxembourg']
  },
  {
    imageSrc: 'LV',
    hint: 'East Europe',
    answer: ['latvia']
  },
  {
    imageSrc: 'LY',
    hint: 'North Africa',
    answer: ['libya']
  },
  {
    imageSrc: 'MA',
    hint: 'North Africa',
    answer: ['morocco']
  },
  {
    imageSrc: 'MC',
    hint: 'West Europe',
    answer: ['monaco']
  },
  {
    imageSrc: 'MD',
    hint: 'East Europe',
    answer: ['moldova']
  },
  {
    imageSrc: 'ME',
    hint: 'Balkans',
    answer: ['montenegro']
  },
  {
    imageSrc: 'MG',
    hint: 'East Africa',
    answer: ['madagascar']
  },
  {
    imageSrc: 'MH',
    hint: 'Oceania',
    answer: ['marshall islands']
  },
  {
    imageSrc: 'MK',
    hint: 'Balkans',
    answer: ['north macedonia', 'macedonia']
  },
  {
    imageSrc: 'MM',
    hint: 'South East Asia',
    answer: ['myanmar', 'burma']
  },
  {
    imageSrc: 'MN',
    hint: 'East Asia',
    answer: ['mongolia']
  },
  {
    imageSrc: 'MR',
    hint: 'West Africa',
    answer: ['mauritania']
  },
  {
    imageSrc: 'MT',
    hint: 'West Europe',
    answer: ['malta']
  },
  {
    imageSrc: 'MU',
    hint: 'East Africa',
    answer: ['mauritius']
  },
  {
    imageSrc: 'MV',
    hint: 'Indian Subcontinent',
    answer: ['maldives']
  },
  {
    imageSrc: 'MW',
    hint: 'Southern Africa',
    answer: ['malawi']
  },
  {
    imageSrc: 'MX',
    hint: 'North America',
    answer: ['mexico']
  },
  {
    imageSrc: 'MY',
    hint: 'South East Asia',
    answer: ['malaysia']
  },
  {
    imageSrc: 'MZ',
    hint: 'Southern Africa',
    answer: ['mozambique']
  },
  {
    imageSrc: 'NA',
    hint: 'Southern Africa',
    answer: ['namibia']
  },
  {
    imageSrc: 'NE',
    hint: 'West Africa',
    answer: ['niger']
  },
  {
    imageSrc: 'NG',
    hint: 'West Africa',
    answer: ['nigeria']
  },
  {
    imageSrc: 'NI',
    hint: 'Central America',
    answer: ['nicaragua']
  },
  {
    imageSrc: 'NL',
    hint: 'West Europe',
    answer: ['netherlands']
  },
  {
    imageSrc: 'NO',
    hint: 'West Europe',
    answer: ['norway']
  },
  {
    imageSrc: 'NP',
    hint: 'Indian Subcontinent',
    answer: ['nepal']
  },
  {
    imageSrc: 'NZ',
    hint: 'Oceania',
    answer: ['new zealand']
  },
  {
    imageSrc: 'PA',
    hint: 'Central America',
    answer: ['panama']
  },
  {
    imageSrc: 'PE',
    hint: 'South America',
    answer: ['peru']
  },
  {
    imageSrc: 'PG',
    hint: 'Oceania',
    answer: ['papua new guinea', 'papua']
  },
  {
    imageSrc: 'PH',
    hint: 'South East Asia',
    answer: ['philippines']
  },
  {
    imageSrc: 'PK',
    hint: 'Indian Subcontinent',
    answer: ['pakistan']
  },
  {
    imageSrc: 'PL',
    hint: 'East Europe',
    answer: ['poland']
  },
  {
    imageSrc: 'PT',
    hint: 'West Europe',
    answer: ['portugal']
  },
  {
    imageSrc: 'PY',
    hint: 'South America',
    answer: ['paraguay']
  },
  {
    imageSrc: 'QA',
    hint: 'Middle East',
    answer: ['qatar']
  },
  {
    imageSrc: 'RO',
    hint: 'East Europe',
    answer: ['romania']
  },
  {
    imageSrc: 'RS',
    hint: 'East Europe',
    answer: ['serbia']
  },
  {
    imageSrc: 'RU',
    hint: 'East Europe',
    answer: ['russia']
  },
  {
    imageSrc: 'RW',
    hint: 'East Africa',
    answer: ['rwanda']
  },
  {
    imageSrc: 'SA',
    hint: 'Middle East',
    answer: ['saudi arabia']
  },
  {
    imageSrc: 'SB',
    hint: 'Oceania',
    answer: ['solomon islands']
  },
  {
    imageSrc: 'SC',
    hint: 'East Africa',
    answer: ['seychelles']
  },
  {
    imageSrc: 'SD',
    hint: 'East Africa',
    answer: ['sudan']
  },
  {
    imageSrc: 'SE',
    hint: 'West Europe',
    answer: ['sweden']
  },
  {
    imageSrc: 'SG',
    hint: 'South East Asia',
    answer: ['singapore']
  },
  {
    imageSrc: 'SI',
    hint: 'East Europe',
    answer: ['slovenia']
  },
  {
    imageSrc: 'SK',
    hint: 'East Europe',
    answer: ['slovakia']
  },
  {
    imageSrc: 'SL',
    hint: 'West Africa',
    answer: ['sierra leone']
  },
  {
    imageSrc: 'SM',
    hint: 'West Europe',
    answer: ['san marino']
  },
  {
    imageSrc: 'SN',
    hint: 'West Africa',
    answer: ['senegal']
  },
  {
    imageSrc: 'SO',
    hint: 'East Africa',
    answer: ['somalia']
  },
  {
    imageSrc: 'SR',
    hint: 'South America',
    answer: ['suriname']
  },
  {
    imageSrc: 'SS',
    hint: 'East Africa',
    answer: ['south sudan']
  },
  {
    imageSrc: 'ST',
    hint: 'Central Africa',
    answer: ['sao tome and principe', 'sao tome']
  },
  {
    imageSrc: 'SV',
    hint: 'Central America',
    answer: ['el salvador']
  },
  {
    imageSrc: 'SZ',
    hint: 'Southern Africa',
    answer: ['eswatini', 'swaziland']
  },
  {
    imageSrc: 'TD',
    hint: 'Central Africa',
    answer: ['chad']
  },
  {
    imageSrc: 'TH',
    hint: 'South East Asia',
    answer: ['thailand']
  },
  {
    imageSrc: 'TJ',
    hint: 'Central Asia',
    answer: ['tajikistan']
  },
  {
    imageSrc: 'TL',
    hint: 'South East Asia',
    answer: ['timor leste', 'east timor']
  },
  {
    imageSrc: 'TM',
    hint: 'Central Asia',
    answer: ['turkmenistan']
  },
  {
    imageSrc: 'TN',
    hint: 'North Africa',
    answer: ['tunisia']
  },
  {
    imageSrc: 'TT',
    hint: 'Caribbean',
    answer: ['trinidad and tobago', 'trinidad']
  },
  {
    imageSrc: 'TZ',
    hint: 'East Africa',
    answer: ['tanzania']
  },
  {
    imageSrc: 'UA',
    hint: 'East Europe',
    answer: ['ukraine']
  },
  {
    imageSrc: 'UG',
    hint: 'East Africa',
    answer: ['uganda']
  },
  {
    imageSrc: 'US',
    hint: 'North America',
    answer: ['united states of america', 'usa', 'united states']
  },
  {
    imageSrc: 'UY',
    hint: 'South America',
    answer: ['uruguay']
  },
  {
    imageSrc: 'UZ',
    hint: 'Central Asia',
    answer: ['uzbekistan']
  },
  {
    imageSrc: 'VA',
    hint: 'West Europe',
    answer: ['vatican city', 'vatican', 'the vatican']
  },
  {
    imageSrc: 'VC',
    hint: 'Caribbean',
    answer: [
      'saint vincent and the grenedines',
      'st vincent and the grenedines',
      'saint vincent',
      'st vincent'
    ]
  },
  {
    imageSrc: 'VE',
    hint: 'South America',
    answer: ['venezuela']
  },
  {
    imageSrc: 'VN',
    hint: 'South East Asia',
    answer: ['vietnam']
  },
  {
    imageSrc: 'YE',
    hint: 'Middle East',
    answer: ['yemen']
  },
  {
    imageSrc: 'ZA',
    hint: 'Southern Africa',
    answer: ['South Africa']
  },
  {
    imageSrc: 'ZM',
    hint: 'Southern Africa',
    answer: ['zambia']
  },
  {
    imageSrc: 'ZW',
    hint: 'Southern Africa',
    answer: ['zimbabwe']
  }
];

export default countries;
