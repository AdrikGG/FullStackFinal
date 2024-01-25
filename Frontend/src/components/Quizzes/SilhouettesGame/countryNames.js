const countries = [
  {
    imageSrc: 'AD.png',
    hint: 'West Europe',
    answer: ['andorra']
  },
  {
    imageSrc: 'AE.png',
    hint: 'Middle East',
    answer: ['united arab emirates', 'uae', 'the emirates', 'emirates']
  },
  {
    imageSrc: 'AF.png',
    hint: 'Central Asia',
    answer: ['afghanistan']
  },
  {
    imageSrc: 'AG.png',
    hint: 'Caribbean',
    answer: ['antigua and barbuda', 'antigua']
  },
  {
    imageSrc: 'AL.png',
    hint: 'Balkans',
    answer: ['albania']
  },
  {
    imageSrc: 'AM.png',
    hint: 'Near East',
    answer: ['armenia']
  },
  {
    imageSrc: 'AO.png',
    hint: 'Southern Africa',
    answer: ['angola']
  },
  {
    imageSrc: 'AR.png',
    hint: 'South America',
    answer: ['argentina']
  },
  {
    imageSrc: 'AT.png',
    hint: 'West Europe',
    answer: ['austria']
  },
  {
    imageSrc: 'AU.png',
    hint: 'Oceania',
    answer: ['australia']
  },
  {
    imageSrc: 'AZ.png',
    hint: 'Near East',
    answer: ['azerbaijan']
  },
  {
    imageSrc: 'BA.png',
    hint: 'Balkans',
    answer: ['bosnia and herzagovina', 'bosnia']
  },
  {
    imageSrc: 'BB.png',
    hint: 'Caribbean',
    answer: ['barbados']
  },
  {
    imageSrc: 'BD.png',
    hint: 'Indian Subcontinent',
    answer: ['bangladesh']
  },
  {
    imageSrc: 'BE.png',
    hint: 'West Europe',
    answer: ['belgium']
  },
  {
    imageSrc: 'BF.png',
    hint: 'West Africa',
    answer: ['burkina faso']
  },
  {
    imageSrc: 'BH.png',
    hint: 'Middle East',
    answer: ['bahrain']
  },
  {
    imageSrc: 'BI.png',
    hint: 'East Africa',
    answer: ['burundi']
  },
  {
    imageSrc: 'BJ.png',
    hint: 'West Africa',
    answer: ['benin']
  },
  {
    imageSrc: 'BN.png',
    hint: 'South East Asia',
    answer: ['brunei']
  },
  {
    imageSrc: 'BO.png',
    hint: 'South America',
    answer: ['bolivia']
  },
  {
    imageSrc: 'BR.png',
    hint: 'South America',
    answer: ['brazil']
  },
  {
    imageSrc: 'BS.png',
    hint: 'Caribbean',
    answer: ['bahamas']
  },
  {
    imageSrc: 'BT.png',
    hint: 'Indian Subcontinent',
    answer: ['bhutan']
  },
  {
    imageSrc: 'BW.png',
    hint: 'Southern Africa',
    answer: ['botswana']
  },
  {
    imageSrc: 'BY.png',
    hint: 'East Europe',
    answer: ['belarus']
  },
  {
    imageSrc: 'BZ.png',
    hint: 'Central America',
    answer: ['belize']
  },
  {
    imageSrc: 'CA.png',
    hint: 'North America',
    answer: ['canada']
  },
  {
    imageSrc: 'CD.png',
    hint: 'Central Africa',
    answer: ['democratic republic of the congo', 'drc', 'congo']
  },
  {
    imageSrc: 'CF.png',
    hint: 'Central Africa',
    answer: ['central african republic', 'car']
  },
  {
    imageSrc: 'CG.png',
    hint: 'Central Africa',
    answer: ['republic of the congo', 'congo']
  },
  {
    imageSrc: 'CH.png',
    hint: 'West Europe',
    answer: ['switzerland']
  },
  {
    imageSrc: 'CI.png',
    hint: 'West Africa',
    answer: ["cote d'ivoire", 'ivory coast']
  },
  {
    imageSrc: 'CL.png',
    hint: 'South America',
    answer: ['chile']
  },
  {
    imageSrc: 'CM.png',
    hint: 'Central Africa',
    answer: ['cameroon']
  },
  {
    imageSrc: 'CO.png',
    hint: 'South America',
    answer: ['colombia']
  },
  {
    imageSrc: 'CR.png',
    hint: 'Central America',
    answer: ['costa rica']
  },
  {
    imageSrc: 'CV.png',
    hint: 'West Africa',
    answer: ['cabo verde', 'cape verde']
  },
  {
    imageSrc: 'CZ.png',
    hint: 'East Europe',
    answer: ['czechia', 'czech republic']
  },
  {
    imageSrc: 'DE.png',
    hint: 'West Europe',
    answer: ['germany']
  },
  {
    imageSrc: 'DJ.png',
    hint: 'East Africa',
    answer: ['djibouti']
  },
  {
    imageSrc: 'DK.png',
    hint: 'West Europe',
    answer: ['denmark']
  },
  {
    imageSrc: 'DM.png',
    hint: 'Caribbean',
    answer: ['dominica']
  },
  {
    imageSrc: 'DO.png',
    hint: 'Caribbean',
    answer: ['dominican republic']
  },
  {
    imageSrc: 'DZ.png',
    hint: 'North Africa',
    answer: ['algeria']
  },
  {
    imageSrc: 'EC.png',
    hint: 'South America',
    answer: ['ecuador']
  },
  {
    imageSrc: 'EE.png',
    hint: 'East Europe',
    answer: ['estonia']
  },
  {
    imageSrc: 'EG.png',
    hint: 'North Africa',
    answer: ['egypt']
  },
  {
    imageSrc: 'ER.png',
    hint: 'East Africa',
    answer: ['eritrea']
  },
  {
    imageSrc: 'ES.png',
    hint: 'West Europe',
    answer: ['spain']
  },
  {
    imageSrc: 'ET.png',
    hint: 'East Africa',
    answer: ['ethiopia']
  },
  {
    imageSrc: 'FI.png',
    hint: 'East Europe',
    answer: ['finland']
  },
  {
    imageSrc: 'FM.png',
    hint: 'Oceania',
    answer: ['the federated state of micronesia', 'micronesia']
  },
  {
    imageSrc: 'FR.png',
    hint: 'West Europe',
    answer: ['france']
  },
  {
    imageSrc: 'GA.png',
    hint: 'Central Africa',
    answer: ['gabon']
  },
  {
    imageSrc: 'GB.png',
    hint: 'West Europe',
    answer: ['united kingdom', 'uk']
  },
  {
    imageSrc: 'GD.png',
    hint: 'Caribbean',
    answer: ['grenada']
  },
  {
    imageSrc: 'GE.png',
    hint: 'Near East',
    answer: ['georgia']
  },
  {
    imageSrc: 'GH.png',
    hint: 'West Africa',
    answer: ['ghana']
  },
  {
    imageSrc: 'GM.png',
    hint: 'West Africa',
    answer: ['the gambia', 'gambia']
  },
  {
    imageSrc: 'GN.png',
    hint: 'West Africa',
    answer: ['guinea']
  },
  {
    imageSrc: 'GQ.png',
    hint: 'Central Africa',
    answer: ['equatorial guinea']
  },
  {
    imageSrc: 'GT.png',
    hint: 'Central America',
    answer: ['guatemala']
  },
  {
    imageSrc: 'GW.png',
    hint: 'West Africa',
    answer: ['guinea bissau']
  },
  {
    imageSrc: 'GY.png',
    hint: 'South America',
    answer: ['guyana']
  },
  {
    imageSrc: 'HN.png',
    hint: 'Central America',
    answer: ['honduras']
  },
  {
    imageSrc: 'HU.png',
    hint: 'East Europe',
    answer: ['hungary']
  },
  {
    imageSrc: 'ID.png',
    hint: 'South East Asia',
    answer: ['indonesia']
  },
  {
    imageSrc: 'IE.png',
    hint: 'West Europe',
    answer: ['ireland']
  },
  {
    imageSrc: 'IN.png',
    hint: 'Indian Subcontinent',
    answer: ['india']
  },
  {
    imageSrc: 'IS.png',
    hint: 'West Europe',
    answer: ['iceland']
  },
  {
    imageSrc: 'IT.png',
    hint: 'West Europe',
    answer: ['italy']
  },
  {
    imageSrc: 'JM.png',
    hint: 'Caribbean',
    answer: ['jamaica']
  },
  {
    imageSrc: 'KE.png',
    hint: 'East Africa',
    answer: ['kenya']
  },
  {
    imageSrc: 'KG.png',
    hint: 'Central Asia',
    answer: ['kyrgyzstan']
  },
  {
    imageSrc: 'KH.png',
    hint: 'South East Asia',
    answer: ['cambodia']
  },
  {
    imageSrc: 'KM.png',
    hint: 'East Africa',
    answer: ['comoros']
  },
  {
    imageSrc: 'KN.png',
    hint: 'Caribbean',
    answer: [
      'saint kitts and nevis',
      'st kitts and nevis',
      'saint kitts',
      'st kitts'
    ]
  },
  {
    imageSrc: 'KP.png',
    hint: 'East Asia',
    answer: ['north korea']
  },
  {
    imageSrc: 'KR.png',
    hint: 'East Asia',
    answer: ['south korea']
  },
  {
    imageSrc: 'KW.png',
    hint: 'Middle East',
    answer: ['kuwait']
  },
  {
    imageSrc: 'KZ.png',
    hint: 'Central Asia',
    answer: ['kazakhstan']
  },
  {
    imageSrc: 'LA.png',
    hint: 'South East Asia',
    answer: ['laos']
  },
  {
    imageSrc: 'LB.png',
    hint: 'Near East',
    answer: ['lebanon']
  },
  {
    imageSrc: 'LC.png',
    hint: 'Caribbean',
    answer: ['saint lucia', 'st lucia']
  },
  {
    imageSrc: 'LI.png',
    hint: 'West Europe',
    answer: ['liechtenstein']
  },
  {
    imageSrc: 'LK.png',
    hint: 'Indian Subcontinent',
    answer: ['sri lanka']
  },
  {
    imageSrc: 'LR.png',
    hint: 'West Africa',
    answer: ['liberia']
  },
  {
    imageSrc: 'LS.png',
    hint: 'Southern Africa',
    answer: ['lesotho']
  },
  {
    imageSrc: 'LT.png',
    hint: 'East Europe',
    answer: ['lithuania']
  },
  {
    imageSrc: 'LU.png',
    hint: 'West Europe',
    answer: ['luxembourg']
  },
  {
    imageSrc: 'LV.png',
    hint: 'East Europe',
    answer: ['latvia']
  },
  {
    imageSrc: 'LY.png',
    hint: 'North Africa',
    answer: ['libya']
  },
  {
    imageSrc: 'MA.png',
    hint: 'North Africa',
    answer: ['morocco']
  },
  {
    imageSrc: 'MC.png',
    hint: 'West Europe',
    answer: ['monaco']
  },
  {
    imageSrc: 'MD.png',
    hint: 'East Europe',
    answer: ['moldova']
  },
  {
    imageSrc: 'ME.png',
    hint: 'Balkans',
    answer: ['montenegro']
  },
  {
    imageSrc: 'MG.png',
    hint: 'East Africa',
    answer: ['madagascar']
  },
  {
    imageSrc: 'MH.png',
    hint: 'Oceania',
    answer: ['marshall islands']
  },
  {
    imageSrc: 'MK.png',
    hint: 'Balkans',
    answer: ['north macedonia', 'macedonia']
  },
  {
    imageSrc: 'MM.png',
    hint: 'South East Asia',
    answer: ['myanmar', 'burma']
  },
  {
    imageSrc: 'MN.png',
    hint: 'East Asia',
    answer: ['mongolia']
  },
  {
    imageSrc: 'MR.png',
    hint: 'West Africa',
    answer: ['mauritania']
  },
  {
    imageSrc: 'MT.png',
    hint: 'West Europe',
    answer: ['malta']
  },
  {
    imageSrc: 'MU.png',
    hint: 'East Africa',
    answer: ['mauritius']
  },
  {
    imageSrc: 'MV.png',
    hint: 'Indian Subcontinent',
    answer: ['maldives']
  },
  {
    imageSrc: 'MW.png',
    hint: 'Southern Africa',
    answer: ['malawi']
  },
  {
    imageSrc: 'MX.png',
    hint: 'North America',
    answer: ['mexico']
  },
  {
    imageSrc: 'MY.png',
    hint: 'South East Asia',
    answer: ['malaysia']
  },
  {
    imageSrc: 'MZ.png',
    hint: 'Southern Africa',
    answer: ['mozambique']
  },
  {
    imageSrc: 'NA.png',
    hint: 'Southern Africa',
    answer: ['namibia']
  },
  {
    imageSrc: 'NE.png',
    hint: 'West Africa',
    answer: ['niger']
  },
  {
    imageSrc: 'NG.png',
    hint: 'West Africa',
    answer: ['nigeria']
  },
  {
    imageSrc: 'NI.png',
    hint: 'Central America',
    answer: ['nicaragua']
  },
  {
    imageSrc: 'NL.png',
    hint: 'West Europe',
    answer: ['netherlands']
  },
  {
    imageSrc: 'NO.png',
    hint: 'West Europe',
    answer: ['norway']
  },
  {
    imageSrc: 'NP.png',
    hint: 'Indian Subcontinent',
    answer: ['nepal']
  },
  {
    imageSrc: 'NZ.png',
    hint: 'Oceania',
    answer: ['new zealand']
  },
  {
    imageSrc: 'PA.png',
    hint: 'Central America',
    answer: ['panama']
  },
  {
    imageSrc: 'PE.png',
    hint: 'South America',
    answer: ['peru']
  },
  {
    imageSrc: 'PG.png',
    hint: 'Oceania',
    answer: ['papua new guinea', 'papua']
  },
  {
    imageSrc: 'PH.png',
    hint: 'South East Asia',
    answer: ['philippines']
  },
  {
    imageSrc: 'PK.png',
    hint: 'Indian Subcontinent',
    answer: ['pakistan']
  },
  {
    imageSrc: 'PL.png',
    hint: 'East Europe',
    answer: ['poland']
  },
  {
    imageSrc: 'PT.png',
    hint: 'West Europe',
    answer: ['portugal']
  },
  {
    imageSrc: 'PY.png',
    hint: 'South America',
    answer: ['paraguay']
  },
  {
    imageSrc: 'QA.png',
    hint: 'Middle East',
    answer: ['qatar']
  },
  {
    imageSrc: 'RO.png',
    hint: 'East Europe',
    answer: ['romania']
  },
  {
    imageSrc: 'RS.png',
    hint: 'East Europe',
    answer: ['serbia']
  },
  {
    imageSrc: 'RU.png',
    hint: 'East Europe',
    answer: ['russia']
  },
  {
    imageSrc: 'RW.png',
    hint: 'East Africa',
    answer: ['rwanda']
  },
  {
    imageSrc: 'SA.png',
    hint: 'Middle East',
    answer: ['saudi arabia']
  },
  {
    imageSrc: 'SB.png',
    hint: 'Oceania',
    answer: ['solomon islands']
  },
  {
    imageSrc: 'SC.png',
    hint: 'East Africa',
    answer: ['seychelles']
  },
  {
    imageSrc: 'SD.png',
    hint: 'East Africa',
    answer: ['sudan']
  },
  {
    imageSrc: 'SE.png',
    hint: 'West Europe',
    answer: ['sweden']
  },
  {
    imageSrc: 'SG.png',
    hint: 'South East Asia',
    answer: ['singapore']
  },
  {
    imageSrc: 'SI.png',
    hint: 'East Europe',
    answer: ['slovenia']
  },
  {
    imageSrc: 'SK.png',
    hint: 'East Europe',
    answer: ['slovakia']
  },
  {
    imageSrc: 'SL.png',
    hint: 'West Africa',
    answer: ['sierra leone']
  },
  {
    imageSrc: 'SM.png',
    hint: 'West Europe',
    answer: ['san marino']
  },
  {
    imageSrc: 'SN.png',
    hint: 'West Africa',
    answer: ['senegal']
  },
  {
    imageSrc: 'SO.png',
    hint: 'East Africa',
    answer: ['somalia']
  },
  {
    imageSrc: 'SR.png',
    hint: 'South America',
    answer: ['suriname']
  },
  {
    imageSrc: 'SS.png',
    hint: 'East Africa',
    answer: ['south sudan']
  },
  {
    imageSrc: 'ST.png',
    hint: 'Central Africa',
    answer: ['sao tome and principe', 'sao tome']
  },
  {
    imageSrc: 'SV.png',
    hint: 'Central America',
    answer: ['el salvador']
  },
  {
    imageSrc: 'SZ.png',
    hint: 'Southern Africa',
    answer: ['eswatini', 'swaziland']
  },
  {
    imageSrc: 'TD.png',
    hint: 'Central Africa',
    answer: ['chad']
  },
  {
    imageSrc: 'TH.png',
    hint: 'South East Asia',
    answer: ['thailand']
  },
  {
    imageSrc: 'TJ.png',
    hint: 'Central Asia',
    answer: ['tajikistan']
  },
  {
    imageSrc: 'TL.png',
    hint: 'South East Asia',
    answer: ['timor leste', 'east timor']
  },
  {
    imageSrc: 'TM.png',
    hint: 'Central Asia',
    answer: ['turkmenistan']
  },
  {
    imageSrc: 'TN.png',
    hint: 'North Africa',
    answer: ['tunisia']
  },
  {
    imageSrc: 'TT.png',
    hint: 'Caribbean',
    answer: ['trinidad and tobago', 'trinidad']
  },
  {
    imageSrc: 'TZ.png',
    hint: 'East Africa',
    answer: ['tanzania']
  },
  {
    imageSrc: 'UA.png',
    hint: 'East Europe',
    answer: ['ukraine']
  },
  {
    imageSrc: 'UG.png',
    hint: 'East Africa',
    answer: ['uganda']
  },
  {
    imageSrc: 'US.png',
    hint: 'North America',
    answer: ['united states of america', 'usa', 'united states']
  },
  {
    imageSrc: 'UY.png',
    hint: 'South America',
    answer: ['uruguay']
  },
  {
    imageSrc: 'UZ.png',
    hint: 'Central Asia',
    answer: ['uzbekistan']
  },
  {
    imageSrc: 'VA.png',
    hint: 'West Europe',
    answer: ['vatican city', 'vatican', 'the vatican']
  },
  {
    imageSrc: 'VC.png',
    hint: 'Caribbean',
    answer: [
      'saint vincent and the grenedines',
      'st vincent and the grenedines',
      'saint vincent',
      'st vincent'
    ]
  },
  {
    imageSrc: 'VE.png',
    hint: 'South America',
    answer: ['venezuela']
  },
  {
    imageSrc: 'VN.png',
    hint: 'South East Asia',
    answer: ['vietnam']
  },
  {
    imageSrc: 'YE.png',
    hint: 'Middle East',
    answer: ['yemen']
  },
  {
    imageSrc: 'ZA.png',
    hint: 'Southern Africa',
    answer: ['South Africa']
  },
  {
    imageSrc: 'ZM.png',
    hint: 'Southern Africa',
    answer: ['zambia']
  },
  {
    imageSrc: 'ZW.png',
    hint: 'Southern Africa',
    answer: ['zimbabwe']
  }
];

export default countries;
