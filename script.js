/* =====================================================================
   KRISHIVIDYA — complete application in a single file
   An open archive of India's indigenous knowledge of farming, animal
   husbandry and water, from the Vedas to 2026.

   Contents
     1. Core helpers and history (timeline, classical texts)
     2. Water systems, rivers, practices, calendar, sayings
     3. Crops and varieties
     4. Animals: breeds and farmers' helper animals
     5. Communities of Maharashtra
     6. Verified Maharashtra datasets (census, survey, breeds, districts)
     7. Interface text in English, Marathi and Hindi
     8. Rendering, search, filters and interaction
     9. Illustrations generated as SVG
   No frameworks, no build step, no external data files.
   ===================================================================== */


/* =====================================================================
   KRISHIVIDYA — core helpers + history of Indian agricultural knowledge
   Evidence tags:
     archaeology — excavated physical evidence
     text        — stated in a classical or historical text
     history     — documented historical event or record
     policy      — government law, scheme or census
     science     — modern scientific study or validation
   Dates for ancient texts are scholarly estimates; where scholars
   disagree, the range is given in the entry itself.
   ===================================================================== */
const T = (en, mr, hi) => ({ en, mr, hi });        // fully translated text
const D = (en, dev) => ({ en, mr: dev, hi: dev });  // proper noun with a Devanagari form

const ERAS = [
  { id: "prehistoric", label: "Prehistory & Harappan", range: "c. 7000 – 1500 BCE", icon: "🏺" },
  { id: "vedic", label: "Vedic period", range: "c. 1500 – 500 BCE", icon: "🔥" },
  { id: "classical", label: "Classical India", range: "c. 500 BCE – 600 CE", icon: "📜" },
  { id: "earlymedieval", label: "Early medieval", range: "600 – 1200 CE", icon: "🛕" },
  { id: "medieval", label: "Medieval & Maratha", range: "1200 – 1818", icon: "⚔️" },
  { id: "colonial", label: "Colonial period", range: "1818 – 1947", icon: "🚂" },
  { id: "independent", label: "Independent India", range: "1947 – 2000", icon: "🇮🇳" },
  { id: "now", label: "21st century", range: "2000 – 2026", icon: "🛰️" }
];

/* y = label shown; s = sort year (negative = BCE); mh = Maharashtra-specific */
const TIMELINE = [
  { s: -7000, y: "c. 7000 BCE", era: "prehistoric", tag: "archaeology", title: "Farming begins at Mehrgarh",
    text: "Excavations at Mehrgarh, at the foot of the Bolan Pass, show some of the earliest farming in South Asia. People there grew barley and wheat and herded zebu (humped) cattle, sheep and goats." },
  { s: -5500, y: "c. 6000–5000 BCE", era: "prehistoric", tag: "archaeology", title: "The earliest evidence of cotton",
    text: "Mineralised cotton fibres found inside a copper bead at Mehrgarh are among the oldest known traces of cotton use anywhere in the world. India went on to become the world's first great cotton-weaving civilisation." },
  { s: -2800, y: "c. 2800 BCE", era: "prehistoric", tag: "archaeology", title: "A ploughed field at Kalibangan",
    text: "At Kalibangan in Rajasthan, archaeologists found a field with furrows crossing at right angles. It is the oldest ploughed field excavated in the world, and its pattern closely resembles the way farmers in the region still sow two crops together, such as mustard with gram." },
  { s: -2500, y: "c. 2600–1900 BCE", era: "prehistoric", tag: "archaeology", title: "Harappan water engineering",
    text: "Harappan cities stored and managed water on a large scale. Dholavira in Kutch had a series of stone-cut reservoirs, and Lothal is often identified as a dockyard. Seals from this period depict the humped bull, the buffalo and the elephant." },
  { s: -1500, y: "c. 1600–1300 BCE", era: "prehistoric", mh: true, tag: "archaeology", title: "Daimabad: a farming village on the Pravara",
    text: "Daimabad in Ahilyanagar district is one of the largest Chalcolithic sites in the Deccan. A hoard of bronze objects found there includes a chariot drawn by two bullocks, along with a buffalo, an elephant and a rhinoceros." },
  { s: -1300, y: "c. 1400–1000 BCE", era: "prehistoric", mh: true, tag: "archaeology", title: "Inamgaon: irrigation in the Deccan",
    text: "At Inamgaon on the Ghod river in Pune district, excavators of the Jorwe culture found traces of an embankment and a channel built to divert floodwater to fields. Villagers there grew barley, wheat, lentils, peas and jowar, and kept cattle, sheep and goats." },
  { s: -1400, y: "c. 1500–1200 BCE", era: "vedic", tag: "text", title: "The Rigveda honours the field and the plough",
    text: "The Kshetrapati hymn (Rigveda 4.57) is addressed to the Lord of the Field. It asks for blessings on the ploughshare, the ploughman and the oxen, and invokes Sita, the furrow, to yield abundant crops. Other hymns refer to wells (avata) worked with wheels and buckets, and to irrigation channels (kulya)." },
  { s: -1350, y: "c. 1500–1200 BCE", era: "vedic", tag: "text", title: "“Play not with dice; cultivate your field”",
    text: "In Rigveda 10.34, a gambler who has lost everything receives this advice: give up dice, cultivate your field, and delight in the wealth it brings. The line (akṣair mā dīvyaḥ kṛṣim it kṛṣasva) is one of the oldest recorded statements that honest farming is the foundation of a good life." },
  { s: -1300, y: "c. 1500–1200 BCE", era: "vedic", tag: "text", title: "The hymn to the rivers",
    text: "The Nadistuti hymn (Rigveda 10.75) praises the rivers of the north-west, from the Ganga and Yamuna to the Sindhu. It is an early example of the sacred place that rivers hold in Indian life, as givers of water, fertile soil and food." },
  { s: -1000, y: "c. 1000 BCE", era: "vedic", tag: "text", title: "The Yajurveda lists India's grains",
    text: "The Vajasaneyi Samhita of the Yajurveda (18.12) lists rice (vrihi), barley (yava), black gram (masha), sesame (tila), green gram (mudga), wheat (godhuma), lentil (masura) and several millets, including priyangu (foxtail millet) and shyamaka. It is one of the earliest crop lists in any language." },
  { s: -900, y: "c. 1000–800 BCE", era: "vedic", tag: "text", title: "The Atharvaveda's hymn to the Earth",
    text: "The Prithvi Sukta (Atharvaveda 12.1) praises the Earth as a mother who nourishes all living beings and asks that people take from her without wounding her. The Atharvaveda also contains charms for rain, for protecting cattle, and for driving away pests from crops." },
  { s: -800, y: "c. 800 BCE", era: "vedic", tag: "text", title: "The four operations of farming",
    text: "The Shatapatha Brahmana (1.6.1.3) sums up farming in four words: ploughing, sowing, reaping and threshing. The Brahmanas also describe ceremonial ploughing with large teams of oxen and name the seasons for sowing barley and rice." },
  { s: -450, y: "c. 5th–4th century BCE", era: "classical", tag: "text", title: "Panini's grammar names fields by their crops",
    text: "Panini's Ashtadhyayi, the great Sanskrit grammar, gives special word forms for fields suited to particular crops, such as a field fit for rice or for barley. It shows how precisely early Indians classified land." },
  { s: -350, y: "c. 4th century BCE onward", era: "classical", tag: "text", title: "Kautilya's Arthashastra organises farming as statecraft",
    text: "The Arthashastra, compiled over several centuries, describes a Superintendent of Agriculture (Sitadhyaksha) who kept seeds, arranged labour and measured rainfall with a standard gauge. It records the rain expected in different regions, including Ashmaka on the Godavari in present-day Maharashtra. It also describes superintendents for cattle, horses and elephants." },
  { s: -300, y: "c. 300 BCE", era: "classical", tag: "text", title: "Megasthenes observes two harvests a year",
    text: "Megasthenes, the Greek envoy at the Mauryan court, wrote that Indian soils yielded two harvests a year, one with the summer rains and one in winter. He also noted that farmers were left undisturbed even in times of war." },
  { s: -250, y: "c. 3rd century BCE", era: "classical", tag: "history", title: "Ashoka's edicts: wells, trees and care for animals",
    text: "Ashoka's second Rock Edict records that he arranged medical treatment for both people and animals, and had wells dug and trees planted along roads. Other edicts restrict the killing of certain animals." },
  { s: -300, y: "c. 300 BCE – 455 CE", era: "classical", tag: "history", title: "The Sudarshana lake at Girnar",
    text: "An inscription of the Saka ruler Rudradaman (150 CE) at Junagadh records that the Sudarshana reservoir was first built under Chandragupta Maurya, improved under Ashoka, and repaired by Rudradaman after a storm burst its dam. It was repaired again under Skandagupta in 455–456 CE." },
  { s: -100, y: "c. 1st century BCE – 3rd century CE", era: "classical", mh: true, tag: "text", title: "The Satavahanas and the Gatha Saptashati",
    text: "The Satavahana kings ruled the Deccan from Pratishthana (Paithan) on the Godavari. The Gatha Saptashati, an anthology of Maharashtri Prakrit verse attributed to King Hala, portrays village life in vivid detail: cotton and rice fields, threshing floors, herders and the monsoon. Inscriptions of the period record gifts of cows and land." },
  { s: 0, y: "c. 300 BCE – 300 CE", era: "classical", tag: "text", title: "Sangam poetry maps five landscapes",
    text: "Tamil Sangam poetry divides land into five tinai: hills (kurinji), pastoral forest (mullai), river-fed farmland (marutham), coast (neithal) and arid land (palai). Each has its own crops, animals, people and moods. It is an early ecological classification of land use." },
  { s: 150, y: "c. 2nd century CE", era: "classical", tag: "history", title: "Kallanai, the Grand Anicut",
    text: "The Chola king Karikala is credited with building the Kallanai, a stone weir across the Kaveri. It is one of the oldest water-diversion structures in the world that is still in use, and it has fed the delta's paddy fields for nearly two thousand years." },
  { s: 450, y: "c. 5th century CE", era: "classical", tag: "text", title: "The Tirukkural: the world follows the plough",
    text: "Tiruvalluvar devotes a chapter of the Tirukkural to farming. Its opening couplet says that however the world may wander, it must follow the plough, because farming feeds all other work." },
  { s: 550, y: "6th century CE", era: "classical", tag: "text", title: "Varahamihira's Brihat Samhita",
    text: "Varahamihira's encyclopaedic Brihat Samhita contains chapters on forecasting the monsoon from signs in the sky months in advance (garbha lakshana), on finding underground water from plants, soils and termite mounds (dakargala), on the care of trees (vrikshayurveda), and on judging cattle by their features." },
  { s: 700, y: "dated between c. 500 and 1100 CE", era: "earlymedieval", tag: "text", title: "Krishi-Parashara, a farmer's manual",
    text: "Krishi-Parashara is a Sanskrit manual devoted wholly to farming. It covers rain forecasting, the parts of the plough, the management of cattle sheds, manuring, seed collection and storage, and the calendar of rice cultivation. Scholars date it anywhere between about 500 and 1100 CE." },
  { s: 800, y: "c. 8th–10th century CE", era: "earlymedieval", tag: "text", title: "Kashyapiya Krishisukti",
    text: "Attributed to the sage Kashyapa, this text describes rice farming in detail: preparing nurseries, transplanting, managing water, and protecting crops from pests. It also stresses that rulers should help farmers." },
  { s: 1000, y: "c. 1000 CE", era: "earlymedieval", tag: "text", title: "Surapala's Vrikshayurveda",
    text: "Surapala's Vrikshayurveda, the Science of Plant Life, covers seed treatment, grafting, irrigation, plant diseases and nutrition. It describes kunapajala, a fermented liquid manure made from animal remains, which modern researchers have studied as an organic plant-growth promoter." },
  { s: 1025, y: "1025 CE", era: "earlymedieval", tag: "text", title: "Lokopakara in Kannada",
    text: "Chavundaraya II wrote the Lokopakara (For the Benefit of the People), a Kannada encyclopaedia with sections on tree-planting, finding groundwater and treating plant diseases. It shows that agricultural knowledge was also written in regional languages." },
  { s: 1131, y: "1131 CE", era: "earlymedieval", mh: true, tag: "text", title: "Manasollasa of Someshvara III",
    text: "The Chalukya king Someshvara III compiled the Manasollasa, an encyclopaedia covering horticulture, irrigation, the care of horses and elephants, and the breeding and training of dogs. The Chalukya kingdom included much of present-day Maharashtra." },
  { s: 1350, y: "13th–14th century", era: "medieval", tag: "text", title: "Upavanavinoda on gardens and orchards",
    text: "Sarngadhara's Upavanavinoda is a treatise on arboriculture. It classifies soils, describes watering schedules and grafting, and explains how to treat sick trees." },
  { s: 1500, y: "c. 1500s", era: "medieval", tag: "history", title: "The Persian wheel spreads across the north",
    text: "The araghatta, a wheel carrying a chain of pots to lift water from wells, was known in India from early times. The geared Persian wheel, driven by bullocks, became widespread in northern India in this period, and Babur described it in his memoirs." },
  { s: 1595, y: "1590s", era: "medieval", tag: "history", title: "The Ain-i-Akbari records crops and revenue",
    text: "Abul Fazl's Ain-i-Akbari lists the crops of each province, their yields and prices, and the revenue system of Raja Todar Mal, which was based on careful measurement of land. It is a rich record of what India grew four centuries ago." },
  { s: 1610, y: "early 1600s", era: "medieval", mh: true, tag: "history", title: "Malik Ambar's land settlement in the Deccan",
    text: "Malik Ambar, the regent of the Ahmadnagar Sultanate, classified land by fertility and fixed revenue accordingly. This settlement shaped later Deccan revenue systems. He also founded Khadki, the city now called Chhatrapati Sambhajinagar, and gave it an underground water-supply system (nahar)." },
  { s: 1673, y: "17th century", era: "medieval", mh: true, tag: "history", title: "Chhatrapati Shivaji Maharaj protects the farmer",
    text: "Chhatrapati Shivaji Maharaj's letters order his officers and soldiers not to harass cultivators or take anything from them, not even a blade of grass. His administration gave farmers seed, bullocks and loans to bring land under the plough, and it measured and assessed land fairly." },
  { s: 1700, y: "c. 1600s onward", era: "medieval", mh: true, tag: "history", title: "Phad irrigation in the Tapi basin",
    text: "Farmers in the Panjhara, Mosam and Kan valleys of Dhule and Nashik built small stone weirs (bandharas) and shared canals, and grouped their fields into blocks called phads. Each season the community decided which crop each phad would grow. The system is centuries old and is still studied as a model of community water management." },
  { s: 1875, y: "1875", era: "colonial", mh: true, tag: "history", title: "The Deccan Riots",
    text: "In May 1875, peasants in Supe and other villages of Pune and Ahmednagar districts rose against moneylenders who had seized their land through debt. The unrest led to the Deccan Agriculturists' Relief Act of 1879." },
  { s: 1883, y: "1883", era: "colonial", mh: true, tag: "text", title: "Mahatma Phule's Shetkaryacha Asud",
    text: "In Shetkaryacha Asud (The Cultivator's Whipcord), Mahatma Jotirao Phule described the exploitation of farmers by moneylenders, officials and priests. He called for education for farmers' children, better seed and cattle, and irrigation." },
  { s: 1893, y: "1893", era: "colonial", tag: "history", title: "Voelcker praises the Indian cultivator",
    text: "John Augustus Voelcker, sent to advise the British government, wrote in his report 'Improvement of Indian Agriculture' that at his best the Indian cultivator was as good as, and in some respects better than, the average British farmer." },
  { s: 1905, y: "1905–1907", era: "colonial", mh: true, tag: "history", title: "Research institutions are founded",
    text: "The Imperial Agricultural Research Institute opened at Pusa in Bihar in 1905; it later moved to New Delhi and is now IARI. In Maharashtra, the College of Agriculture in Pune became a full college in 1907." },
  { s: 1931, y: "1924–1940", era: "colonial", tag: "science", title: "Albert Howard learns composting from Indian farmers",
    text: "At Indore, Sir Albert Howard developed the 'Indore method' of composting, drawing on practices he observed among Indian farmers. His book An Agricultural Testament (1940) helped launch the worldwide organic farming movement." },
  { s: 1937, y: "1928–1949", era: "colonial", mh: true, tag: "history", title: "Ending the Khoti system in Konkan",
    text: "Dr. B. R. Ambedkar led Konkan tenant farmers against the Khoti system, under which intermediaries collected rent and forced labour. He introduced a bill to abolish it in 1937, and the Bombay Khoti Abolition Act was passed in 1949." },
  { s: 1966, y: "1965–1970s", era: "independent", tag: "policy", title: "The Green Revolution",
    text: "High-yielding wheat and rice varieties, fertilisers and irrigation made India self-sufficient in food grains. The gains were large, but so were the costs: many traditional varieties disappeared, and soils and groundwater came under strain." },
  { s: 1970, y: "1970", era: "independent", tag: "policy", title: "Operation Flood",
    text: "The National Dairy Development Board launched Operation Flood, which built a nationwide network of milk co-operatives. India became the world's largest milk producer, and Maharashtra's co-operative dairies grew with it." },
  { s: 1972, y: "1972", era: "independent", mh: true, tag: "policy", title: "Maharashtra's Employment Guarantee Scheme",
    text: "During the severe drought of 1972–73, Maharashtra created the Employment Guarantee Scheme, which offered rural work building bunds, ponds and roads. It later inspired the national MGNREGA of 2005." },
  { s: 1985, y: "1975–2000", era: "independent", mh: true, tag: "history", title: "Village watershed models",
    text: "Ralegan Siddhi (from 1975) and Hiware Bazar (from the 1990s), both in Ahilyanagar district, revived their villages through watershed work, bans on free grazing and tree-felling, and collective decisions. They became national models." },
  { s: 2001, y: "2001–2006", era: "now", tag: "policy", title: "Laws that recognise traditional knowledge",
    text: "The Protection of Plant Varieties and Farmers' Rights Act (2001) recognises farmers as breeders and conservers of varieties. The Biological Diversity Act (2002) led to People's Biodiversity Registers in villages, and the Forest Rights Act (2006) recognised the rights of forest-dwelling communities." },
  { s: 2015, y: "2014–2016", era: "now", tag: "policy", title: "Gokul Mission, organic farming and soil health",
    text: "The Rashtriya Gokul Mission (2014) began supporting indigenous cattle breeds. Paramparagat Krishi Vikas Yojana (2015) promoted cluster-based organic farming, and Soil Health Cards (2015) gave farmers a record of their soil nutrients. Maharashtra started Jalyukt Shivar for village water conservation." },
  { s: 2023, y: "2023", era: "now", tag: "policy", title: "The International Year of Millets",
    text: "At India's proposal, the United Nations declared 2023 the International Year of Millets. The campaign revived interest in jowar, bajra, nachni and the small millets that tribal and dryland farmers of Maharashtra have grown for centuries." },
  { s: 2024, y: "November 2024", era: "now", tag: "policy", title: "The National Mission on Natural Farming",
    text: "The Union Cabinet approved the National Mission on Natural Farming on 25 November 2024, with an outlay of ₹2,481 crore. It aims to reach one crore farmers and bring 7.5 lakh hectares under natural farming through 15,000 clusters, drawing explicitly on traditional knowledge and local livestock." },
  { s: 2025, y: "October 2024 – February 2025", era: "now", tag: "policy", title: "The 21st Livestock Census",
    text: "The 21st Livestock Census counted 16 species, including dogs and elephants, and recorded 219 indigenous breeds recognised by ICAR-NBAGR. For the first time it also collected information on pastoralists and their animals. Its results had not been published when this archive was compiled." },
  { s: -1900, y: "c. 2000–1700 BCE", era: "prehistoric", tag: "archaeology", title: "African millets reach the Deccan",
    text: "Finger millet, sorghum and pearl millet, which originated in Africa, appear at south Indian sites such as Hallur in Karnataka. Their arrival gave the dry Deccan the drought-hardy grains that fed it for the next three thousand years." },
  { s: -1000, y: "c. 1000–600 BCE", era: "vedic", tag: "archaeology", title: "Iron tools and the rice frontier",
    text: "Iron ploughshares, sickles and axes spread with the Painted Grey Ware culture. Iron let farmers clear the heavy forests and wet soils of the middle Ganga plain, and rice cultivation expanded eastward." },
  { s: 60, y: "1st century CE", era: "classical", tag: "history", title: "The Periplus records India's farm exports",
    text: "The Periplus of the Erythraean Sea, a Greek merchant's handbook, lists cotton cloth, rice, ghee, sesame oil, sugar and pepper shipped from Barygaza (Bharuch) and the Konkan ports. Indian farm produce was already moving across the Arabian Sea." },
  { s: 1050, y: "10th–12th century", era: "earlymedieval", tag: "history", title: "Village assemblies manage the tanks",
    text: "Chola inscriptions record village assemblies (sabha) and their tank committees (eri variyam), which collected dues, desilted tanks and settled water disputes. Community water management was written into stone." },
  { s: 1630, y: "1630–1632", era: "medieval", mh: true, tag: "history", title: "The great Deccan famine",
    text: "A failed monsoon brought famine across the Deccan and Gujarat. The English merchant Peter Mundy and Mughal chroniclers described villages emptied and cattle dead. Famines like this shaped the Deccan habits of grain storage and mixed cropping." },
  { s: 1792, y: "1791–1792", era: "colonial", mh: true, tag: "history", title: "The Doji Bara or 'skull' famine",
    text: "Severe drought struck the Deccan, Marathwada and Hyderabad. It is remembered as Doji Bara, the skull famine, and it drove large-scale migration and cattle loss." },
  { s: 1862, y: "1861–1865", era: "colonial", mh: true, tag: "history", title: "The cotton boom and crash",
    text: "When the American Civil War cut off cotton to Lancashire, prices soared and Deccan farmers switched to cotton. The crash of 1865 left them holding debts at high interest, one of the causes of the Deccan Riots ten years later." },
  { s: 1928, y: "1928", era: "colonial", tag: "policy", title: "The Royal Commission on Agriculture reports",
    text: "The Commission's report documented Indian farming in enormous detail and recommended research stations, extension services, better cattle and co-operative credit. Much of India's later agricultural administration followed its plan." },
  { s: 1948, y: "1948–1949", era: "independent", mh: true, tag: "policy", title: "Tenancy reform in Bombay State",
    text: "The Bombay Tenancy and Agricultural Lands Act (1948) gave tenants security and a path to ownership, and the Khoti system of Konkan was abolished in 1949. Land reform reshaped who farmed and on whose terms." },
  { s: 1950, y: "1950", era: "independent", mh: true, tag: "history", title: "Asia's first co-operative sugar factory",
    text: "Farmers at Pravaranagar in Ahilyanagar district, led by Vitthalrao Vikhe Patil, set up the first co-operative sugar factory in Asia. The model spread across western Maharashtra and changed its rural economy." },
  { s: 2018, y: "2018", era: "now", mh: true, tag: "policy", title: "Climate-resilient farming in the dry districts",
    text: "Maharashtra launched the Nanaji Deshmukh Krishi Sanjivani Prakalp (PoCRA) with World Bank support, working village by village in drought-prone Marathwada and Vidarbha on soil moisture, micro-irrigation and drought-tolerant crops." },
  { s: 2026, y: "March 2026", era: "now", mh: true, tag: "policy", title: "Economic Survey of Maharashtra 2025-26",
    text: "The latest Economic Survey, tabled on 5 March 2026, shows how Maharashtra's farming has changed. Jowar has fallen from 62.8 to 16.9 lakh hectares since 1960-61, while pulses have more than doubled, and livestock now contributes 23.4% of the value added by agriculture and allied sectors." }
];

/* Classical and historical texts on farming, animals and water */
const TEXTS = [
  { name: "Rigveda", dev: "ऋग्वेद", date: "c. 1500–1200 BCE", lang: "Vedic Sanskrit", topics: ["farming", "animals", "water"],
    summary: "The oldest Indian text. It praises the plough, the furrow and the rains, refers to wells and channels, and treats cattle as the chief form of wealth. The cow is called aghnya, 'not to be killed'.",
    refs: "4.57 (Kshetrapati hymn); 10.34.13 (advice to farm); 10.75 (hymn to the rivers); 10.101 (yoking the plough)",
    url: "https://www.sacred-texts.com/hin/rigveda/rv04057.htm" },
  { name: "Yajurveda", dev: "यजुर्वेद", date: "c. 1200–800 BCE", lang: "Vedic Sanskrit", topics: ["farming"],
    summary: "Records sacrificial rituals and, in doing so, lists the grains of the time, including rice, barley, wheat, pulses, sesame and several millets. The Taittiriya Samhita links crops to their seasons.",
    refs: "Vajasaneyi Samhita 18.12 (list of grains)" },
  { name: "Atharvaveda", dev: "अथर्ववेद", date: "c. 1000–800 BCE", lang: "Vedic Sanskrit", topics: ["farming", "animals", "water"],
    summary: "Closest of the Vedas to everyday life. It contains the Prithvi Sukta in praise of the Earth, prayers for rain, charms to protect cattle, and incantations against crop pests.",
    refs: "12.1 (Prithvi Sukta)", url: "https://www.sacred-texts.com/hin/av/av12001.htm" },
  { name: "Shatapatha Brahmana", dev: "शतपथ ब्राह्मण", date: "c. 800–600 BCE", lang: "Vedic Sanskrit", topics: ["farming"],
    summary: "Summarises farming as ploughing, sowing, reaping and threshing, and describes ploughing ceremonies with teams of oxen.",
    refs: "1.6.1.3" },
  { name: "Ashtadhyayi of Panini", dev: "अष्टाध्यायी", date: "c. 5th–4th century BCE", lang: "Sanskrit", topics: ["farming"],
    summary: "A grammar that preserves words for fields suited to particular crops, for ploughing, and for land measurement, showing how finely land was classified." },
  { name: "Arthashastra of Kautilya", dev: "अर्थशास्त्र", date: "compiled c. 4th century BCE – 3rd century CE", lang: "Sanskrit", topics: ["farming", "animals", "water"],
    summary: "A manual of statecraft. It describes state farms, seed preparation, rainfall measurement, regional rainfall (including Ashmaka on the Godavari), irrigation dues, and officials in charge of cattle, horses and elephants.",
    refs: "Book 2 (superintendents of agriculture, cattle, horses and elephants)" },
  { name: "Jataka tales", dev: "जातक कथा", date: "c. 4th century BCE onward", lang: "Pali", topics: ["farming", "animals", "water"],
    summary: "Buddhist stories that show daily village life, with shared irrigation channels, guarding of crops, cattle herding, and disputes over water." },
  { name: "Gatha Saptashati", dev: "गाथा सप्तशती", date: "c. 1st–3rd century CE", lang: "Maharashtri Prakrit", topics: ["farming", "animals"], mh: true,
    summary: "An anthology from the Satavahana Deccan. Its short poems describe cotton and rice fields, herders, threshing floors and the monsoon, making it an early literary portrait of Maharashtra's villages." },
  { name: "Sangam literature", dev: "संगम साहित्य", date: "c. 300 BCE – 300 CE", lang: "Old Tamil", topics: ["farming", "animals", "water"],
    summary: "Poetry that classifies land into five landscapes, each with its own crops, animals, occupations and seasons." },
  { name: "Tirukkural", dev: "तिरुक्कुरळ", date: "c. 5th century CE", lang: "Tamil", topics: ["farming"],
    summary: "Its chapter on farming (Uzhavu) calls agriculture the foremost occupation, because the whole world depends on it." },
  { name: "Brihat Samhita of Varahamihira", dev: "बृहत्संहिता", date: "6th century CE", lang: "Sanskrit", topics: ["farming", "animals", "water"],
    summary: "Covers monsoon forecasting from cloud and wind signs, locating groundwater from plants and termite mounds, tree care, and the features of good cattle.",
    refs: "Chapters on garbha lakshana, dakargala and vrikshayurveda" },
  { name: "Krishi-Parashara", dev: "कृषिपराशर", date: "dated c. 500–1100 CE", lang: "Sanskrit", topics: ["farming", "animals"],
    summary: "A practical manual on rain forecasting, the plough and its parts, cattle-shed hygiene, manure, and the collection and storage of seed. It opens by calling agriculture the source of prosperity." },
  { name: "Kashyapiya Krishisukti", dev: "काश्यपीय कृषिसूक्ति", date: "c. 8th–10th century CE", lang: "Sanskrit", topics: ["farming", "water"],
    summary: "Describes rice cultivation in detail: nursery beds, transplanting, water management and crop protection." },
  { name: "Vrikshayurveda of Surapala", dev: "वृक्षायुर्वेद", date: "c. 10th–11th century CE", lang: "Sanskrit", topics: ["farming"],
    summary: "A science of plant life covering soils, seed treatment, grafting, irrigation, plant diseases and kunapajala liquid manure." },
  { name: "Lokopakara of Chavundaraya II", dev: "लोकोपकार", date: "1025 CE", lang: "Kannada", topics: ["farming", "water"],
    summary: "A regional-language encyclopaedia with chapters on planting trees, divining groundwater and treating plant diseases." },
  { name: "Manasollasa of Someshvara III", dev: "मानसोल्लास", date: "1131 CE", lang: "Sanskrit", topics: ["farming", "animals", "water"], mh: true,
    summary: "A royal encyclopaedia from the Chalukya court, covering gardens, irrigation, horses, elephants and the breeding and training of dogs." },
  { name: "Upavanavinoda of Sarngadhara", dev: "उपवनविनोद", date: "13th–14th century CE", lang: "Sanskrit", topics: ["farming"],
    summary: "A treatise on orchards and gardens: soils, watering, grafting and the treatment of sick trees." },
  { name: "Shalihotra Samhita", dev: "शालिहोत्र संहिता", date: "traditionally ancient; manuscripts of later date", lang: "Sanskrit", topics: ["animals"],
    summary: "The foundational text of Indian veterinary science, especially the care and treatment of horses. 'Shalihotri' long remained a word for a veterinarian." },
  { name: "Hastyayurveda of Palakapya", dev: "हस्त्यायुर्वेद", date: "early centuries CE (disputed)", lang: "Sanskrit", topics: ["animals"],
    summary: "A detailed treatise on the anatomy, diseases and care of elephants." },
  { name: "Ain-i-Akbari of Abul Fazl", dev: "आईन-ए-अकबरी", date: "1590s", lang: "Persian", topics: ["farming"],
    summary: "Lists the crops of each province of the Mughal empire with their yields and prices, and explains Todar Mal's land-revenue system." },
  { name: "Dnyaneshwari and Varkari abhangs", dev: "ज्ञानेश्वरी व अभंग", date: "1290 CE onward", lang: "Marathi", topics: ["farming", "animals"], mh: true,
    summary: "Marathi saint-poets such as Dnyaneshwar, Namdev and Tukaram drew their images from the fields: sowing, rain, the plough and the cattle. Tukaram, himself from a farming and trading family of Dehu, sang of the farmer's life and of famine." },
  { name: "Shetkaryacha Asud by Jotirao Phule", dev: "शेतकऱ्याचा असूड", date: "1883", lang: "Marathi", topics: ["farming"], mh: true,
    summary: "A powerful account of the exploitation of Maharashtra's farmers, with practical proposals for irrigation, education and better cattle." },
  { name: "Krishi Gita", dev: "कृषिगीता", date: "compiled by the 18th century", lang: "Malayalam", topics: ["farming"],
    summary: "A Kerala farming text in verse, framed as Parashurama's instruction. It covers the agricultural calendar, ploughing, seed, manuring and the care of coconut and paddy." },
  { name: "Nuskha dar Fanni-i-Falahat", dev: "नुस्खा दर फन्न-ए-फलाहत", date: "17th century", lang: "Persian", topics: ["farming", "water"],
    summary: "A Mughal-era treatise on the art of agriculture, covering soils, manures, sowing seasons, grafting, irrigation and the laying out of gardens. It shows the exchange between Persian and Indian horticulture." },
  { name: "Adnyapatra of Ramchandra Pant Amatya", dev: "आज्ञापत्र", date: "1716", lang: "Marathi", topics: ["farming", "water"], mh: true,
    summary: "A manual of Maratha statecraft. It instructs officers to protect cultivators, keep forts supplied with grain, maintain water sources and plant useful trees, and warns that a ruined peasantry ruins the state." },
  { name: "Bhavaprakasha Nighantu", dev: "भावप्रकाश निघंटु", date: "16th century", lang: "Sanskrit", topics: ["farming", "animals"],
    summary: "A medical lexicon that classifies grains, pulses, vegetables, fruits and milk by their qualities. It is a valuable record of which crops and foods were in use, and of the properties attributed to them." },
  { name: "An Agricultural Testament by Albert Howard", dev: "ॲन ॲग्रिकल्चरल टेस्टामेंट", date: "1940", lang: "English", topics: ["farming"],
    summary: "Describes the Indore composting method, which Howard developed from the practices of Indian farmers. The book became a founding text of organic farming worldwide." }
];

/* =====================================================================
   KRISHIVIDYA — water & rivers, indigenous practices, calendar, sayings
   Evidence status for practices:
     validated — supported by published agricultural research
     studied   — under scientific study; results promising or mixed
     heritage  — recorded as traditional knowledge; not yet tested
   ===================================================================== */

/* ---- Traditional water systems of India ---- */
const WATER = [
  { name: "Phad system", dev: "फड पद्धत", region: "Tapi basin — Dhule and Nashik, Maharashtra", mh: true, type: "Diversion weirs",
    text: "Stone weirs (bandharas) divert river water into canals that serve blocks of fields called phads. The community decides each season which phad grows which crop, so that water is shared fairly. Water users' committees still run many phads on the Panjhara river." },
  { name: "Malgujari tanks", dev: "माजी मालगुजारी तलाव", region: "Bhandara, Gondia, Chandrapur, Gadchiroli, Nagpur", mh: true, type: "Tanks",
    text: "Hundreds of earthen tanks were built by local landholders (malgujars) and farming communities, many of them centuries ago, to store monsoon runoff for paddy. Today they also support fishing, water chestnut (singhada) and groundwater recharge, and several have been restored." },
  { name: "Khar lands and bunds", dev: "खार जमीन", region: "Konkan creeks — Raigad, Ratnagiri, Thane", mh: true, type: "Coastal reclamation",
    text: "Coastal farmers reclaimed tidal land by building earthen bunds with sluice gates that keep out seawater while letting rainwater drain. Salt-tolerant rice varieties are grown on these lands in the monsoon. Maharashtra has a Khar Land Development Board to maintain the bunds." },
  { name: "Bandhara", dev: "बंधारा", region: "Across Maharashtra", mh: true, type: "Check dams",
    text: "A bandhara is a low weir of stone or earth across a stream. It slows the flow, raises nearby well levels and diverts water to fields. Villages have built and rebuilt bandharas for centuries, and they remain central to watershed work today." },
  { name: "Barav (stepwells)", dev: "बारव", region: "Marathwada, western Maharashtra", mh: true, type: "Stepwells",
    text: "Stone stepwells, often built beside temples from the Yadava period onward, gave year-round access to groundwater. Many survive in Marathwada, and restoration campaigns have begun to clean and document them." },
  { name: "Gaal (tank silt) on fields", dev: "गाळ", region: "Across Maharashtra", mh: true, type: "Soil renewal",
    text: "Farmers have long carried the fertile silt from dried tank beds to their fields. The practice both restores tank capacity and improves soil. Maharashtra revived it on a large scale in 2017 through the 'Gaalmukt Dharan, Gaalyukt Shivar' programme." },
  { name: "Mot (leather-bucket lift)", dev: "मोट", region: "Deccan", mh: true, type: "Water lifting",
    text: "A pair of bullocks walking down a ramp pulled a large leather bucket up from the well. It emptied itself into a channel through a flexible spout. The mot was the main source of well irrigation before diesel and electric pumps, and it is now almost extinct." },
  { name: "Araghatta and Persian wheel", dev: "रहाट", region: "North and western India", type: "Water lifting",
    text: "A chain of pots on a wheel, turned by bullocks through wooden gears, lifted water continuously from shallow wells. In Marathi the device is called a rahat." },
  { name: "Kallanai (Grand Anicut)", dev: "कल्लणै", region: "Kaveri river, Tamil Nadu", type: "Diversion weir",
    text: "A stone weir attributed to the Chola king Karikala (2nd century CE). It is among the oldest water-diversion structures still in use anywhere in the world." },
  { name: "Eri tanks", dev: "एरी", region: "Tamil Nadu", type: "Tank cascades",
    text: "Chains of connected tanks pass surplus water from one to the next. Village institutions managed the sluices and appointed water guards, called neerkatti." },
  { name: "Kere tanks", dev: "केरे", region: "Karnataka", type: "Tank cascades",
    text: "Tank systems built by rulers and communities across the Deccan plateau, maintained by village groups and supported by temple grants." },
  { name: "Kakatiya tanks (cheruvu)", dev: "चेरुवु", region: "Telangana", type: "Tank cascades",
    text: "The Kakatiya dynasty (12th–14th century) built thousands of connected tanks. Telangana's Mission Kakatiya, launched in 2015, has desilted and restored many of them." },
  { name: "Ahar-pyne", dev: "आहर-पईन", region: "South Bihar", type: "Floodwater harvesting",
    text: "Channels (pynes) carry floodwater from rivers to embanked catchment basins (ahars), where it is held for paddy. The system suits a gently sloping land with poor groundwater." },
  { name: "Johad", dev: "जोहड़", region: "Rajasthan, Haryana", type: "Earthen check dams",
    text: "Crescent-shaped earthen dams capture runoff and recharge groundwater. Their revival in Alwar district from the 1980s brought several small rivers back to life." },
  { name: "Khadin", dev: "खड़ीन", region: "Jaisalmer, Rajasthan", type: "Runoff farming",
    text: "An earthen embankment across a slope holds runoff so that crops can be sown on the moist bed after the water soaks in. The system is associated with the Paliwal community." },
  { name: "Kund, tanka and beri", dev: "कुंड, टांका", region: "Thar desert", type: "Rainwater harvesting",
    text: "Underground cisterns with a sloping catchment around them collect rainwater for drinking. Beris are shallow wells that tap moisture held in the soil." },
  { name: "Stepwells (vav and baoli)", dev: "बावड़ी", region: "Gujarat, Rajasthan, Delhi", type: "Stepwells",
    text: "Monumental stepwells reached down to groundwater. Rani ki Vav at Patan (11th century) is a UNESCO World Heritage Site." },
  { name: "Kuhl", dev: "कूहल", region: "Himachal Pradesh", type: "Gravity channels",
    text: "Channels diverting glacier and stream water along hillsides to terraced fields, managed by a water master called the kohli." },
  { name: "Zabo", dev: "ज़ाबो", region: "Nagaland", type: "Integrated system",
    text: "Forest, ponds, cattle yards and paddy are arranged down a slope so that rainwater collects nutrients as it flows to the fields. Fish are also raised in the ponds." },
  { name: "Apatani rice–fish farming", dev: "आपतानी", region: "Ziro valley, Arunachal Pradesh", type: "Integrated system",
    text: "Irrigated terraced paddy is combined with fish farming, with water channelled carefully from forest streams and no draught animals or machines used." },
  { name: "Bamboo drip irrigation", dev: "बांस ठिबक", region: "Meghalaya", type: "Drip irrigation",
    text: "Bamboo pipes carry spring water across long distances and deliver it drop by drop to betel and black-pepper plants." },
  { name: "Dongs", dev: "डोंग", region: "Assam (Bodo community)", type: "Community canals",
    text: "Channels dug and maintained by the community divert river water to fields under a shared set of rules." },
  { name: "Surangam", dev: "सुरंगम", region: "Kasaragod, Kerala and Dakshina Kannada", type: "Horizontal wells",
    text: "Tunnels are dug horizontally into laterite hillsides until they reach water, which then flows out steadily by gravity." },
  { name: "Zing", dev: "झिंग", region: "Ladakh", type: "Meltwater tanks",
    text: "Small tanks collect glacier meltwater, which arrives only in the afternoon heat. A water official called the churpun releases it to the barley fields in turn." },
  { name: "Naula", dev: "नौला", region: "Kumaon, Uttarakhand", type: "Spring chambers",
    text: "Stone-built chambers over a natural spring, with steps down to the water and carved stonework. Villages treated them as sacred and maintained them collectively." },
  { name: "Pat system", dev: "पाट", region: "Jhabua, Madhya Pradesh (Bhil communities)", type: "Diversion channels",
    text: "Bhil farmers divert hill streams through stone-and-earth channels cut along the slope. Each pat is maintained by the households that use it, in a strict turn system." },
  { name: "Katta", dev: "कट्टा", region: "Karnataka and adjoining Konkan", type: "Temporary check dams",
    text: "A low barrier of mud, stones and brushwood built across a stream after the monsoon. It holds water for late crops and recharges wells, and is rebuilt each year." },
  { name: "Nahar of Chhatrapati Sambhajinagar", dev: "नहर-ए-अंबरी", region: "Chhatrapati Sambhajinagar (Aurangabad)", mh: true, type: "Underground channels",
    text: "Underground conduits, begun under Malik Ambar in the early 1600s and extended later, carried water from springs in the hills into the city by gravity. Parts of the system still flow." },
  { name: "Virda", dev: "विरडा", region: "Banni grasslands, Kutch", type: "Shallow wells",
    text: "Maldhari pastoralists dig shallow wells in depressions, where fresh rainwater floats above the saline groundwater." }
];

/* ---- Rivers of Maharashtra and their farming knowledge ---- */
const RIVERS = [
  { name: "Godavari", dev: "गोदावरी", basin: "Rises at Trimbakeshwar (Nashik); flows east through Marathwada and Telangana",
    text: "Called the Dakshina Ganga, the Godavari gave the Deccan its ancient capital at Paithan. Its fertile plains carry sugarcane, jowar, cotton and grapes. The Jayakwadi dam (1976) created one of the state's largest reservoirs." },
  { name: "Krishna", dev: "कृष्णा", basin: "Rises at Mahabaleshwar; flows through Satara, Sangli and into Karnataka",
    text: "The Krishna and its tributaries — the Koyna, Warna and Panchganga — water the sugar belt of western Maharashtra. The Krishna Valley cattle breed takes its name from the region." },
  { name: "Bhima", dev: "भीमा", basin: "Rises at Bhimashankar; flows through Pune and Solapur to the Krishna",
    text: "The Bhima valley gave its name to the Bhimthadi horse and to Bhimthadi jatra traditions. The Varkari pilgrimage ends at Pandharpur on its banks, which the Varkaris call the Chandrabhaga." },
  { name: "Tapi", dev: "तापी", basin: "Flows west through Jalgaon, Dhule and Nandurbar to the Arabian Sea",
    text: "Its deep black soils support banana and cotton, and its tributaries gave rise to the phad irrigation system." },
  { name: "Wainganga and Wardha", dev: "वैनगंगा व वर्धा", basin: "Vidarbha; join to form the Pranhita",
    text: "They water the rice bowl of eastern Vidarbha, where malgujari tanks, paddy, tasar silk and forest produce sustain Gond and other communities." },
  { name: "Konkan rivers", dev: "कोकणातील नद्या", basin: "Short westward rivers such as the Vashishti, Savitri and Ulhas",
    text: "Fast monsoon rivers that end in creeks and mangroves. Their tidal lands were reclaimed as khar lands, and their banks support coconut, areca, mango and paddy." },
  { name: "Riverbed farming", dev: "नदीपात्रातील शेती", basin: "Many rivers after the monsoon",
    text: "As water levels fall after the rains, farmers across India plant melons, cucumbers and vegetables in the moist sand of the riverbed. The practice uses residual moisture and needs little irrigation." }
];

/* ---- Indigenous practices ---- */
const PRACTICES = [
  /* soil */
  { cat: "soil", name: "Shenkhat (farmyard manure)", dev: "शेणखत", status: "validated",
    text: "Cattle dung, urine-soaked bedding and crop waste are rotted in a pit for several months before being spread on fields. Research confirms that well-rotted manure improves soil organic carbon, structure and water-holding capacity." },
  { cat: "soil", name: "Sheep and goat penning", dev: "मेंढ्या बसवणे", status: "validated", mh: true,
    text: "Dhangar herders pen their flocks overnight on harvested fields, and the farmer pays in grain or cash for the manure and urine left behind. Studies of this exchange show that it adds significant nutrients to the soil." },
  { cat: "soil", name: "Green manuring", dev: "हिरवळीचे खत", status: "validated",
    text: "Fast-growing legumes such as sunn hemp (tag) and dhaincha are grown and ploughed back into the soil before they flower. They add nitrogen and organic matter." },
  { cat: "soil", name: "Tank silt application", dev: "गाळ पसरवणे", status: "validated", mh: true,
    text: "Silt from dried tank beds, rich in clay and nutrients, is spread on fields. It improves yields on light soils, particularly in dry regions." },
  { cat: "soil", name: "Rab (burning on nursery beds)", dev: "राब", status: "studied", mh: true,
    text: "Konkan and Sahyadri farmers burn layers of leaves, twigs and dung on rice nursery beds before sowing. Studies show that it controls weeds and releases nutrients, but it also depends on lopping forest trees, so researchers suggest alternatives." },
  { cat: "soil", name: "Kunapajala", dev: "कुणपजल", status: "studied",
    text: "Described in Surapala's Vrikshayurveda, this is a liquid manure made by fermenting animal remains with other materials. Modern trials report that diluted kunapajala can promote plant growth." },
  /* seeds */
  { cat: "seed", name: "Seed selection from the best plants", dev: "बीज निवड", status: "validated",
    text: "Farmers mark the healthiest plants or the fullest earheads in the field and keep their seed separately. This simple selection, repeated for generations, created India's landraces." },
  { cat: "seed", name: "Storage with ash, neem and dung-plastered bins", dev: "कणगी", status: "validated", mh: true,
    text: "Grain and seed are stored in bamboo bins (kanagi) or clay pots plastered with cow dung, often mixed with ash or dry neem leaves. Research confirms that neem leaves and ash reduce damage by storage insects." },
  { cat: "seed", name: "Community seed banks", dev: "बीज बँक", status: "validated", mh: true,
    text: "Villages keep and exchange seed of local varieties. In Akole, Rahibai Popere and the Kalsubai Parisar Biyanee Samvardhan Samiti have revived dozens of landraces of rice, pulses and vegetables." },
  { cat: "seed", name: "Beejamrut (seed treatment)", dev: "बीजामृत", status: "studied",
    text: "A modern natural-farming preparation of cow dung, urine, lime and soil used to coat seed. It is promoted under the National Mission on Natural Farming; research on its effects is ongoing." },
  /* cropping */
  { cat: "cropping", name: "Mixed cropping", dev: "मिश्रपीक", status: "validated", mh: true,
    text: "Two or more crops are sown together, such as jowar with tur or bajra with matki. If one crop fails in a poor monsoon, the other usually survives, and legumes add nitrogen for the cereal." },
  { cat: "cropping", name: "Intercropping in rows", dev: "आंतरपीक", status: "validated",
    text: "Crops are sown in alternating rows, often with the pabhar seed drill. Cotton with tur and soybean with tur are common patterns in Vidarbha and Marathwada." },
  { cat: "cropping", name: "Crop rotation", dev: "फेरपालट", status: "validated",
    text: "A cereal is followed by a legume, or a kharif crop by a rabi one, to maintain soil fertility and break pest cycles." },
  { cat: "cropping", name: "Rabi on residual moisture", dev: "ओलितावरील रब्बी", status: "validated", mh: true,
    text: "On deep black soils, rabi jowar, gram and safflower are sown after the monsoon and grow entirely on moisture stored in the soil. Maldandi jowar of Solapur is the classic example." },
  { cat: "cropping", name: "Relay (utera) cropping", dev: "उतेरा", status: "validated",
    text: "Lathyrus, linseed or gram is broadcast into the standing rice crop before harvest, so that the second crop can use the remaining moisture. The practice is common in eastern Vidarbha and Chhattisgarh." },
  { cat: "cropping", name: "Border and trap crops", dev: "सापळा पीक", status: "validated",
    text: "Rows of marigold, castor, maize or sorghum around the main crop attract pests away from it or act as a barrier." },
  { cat: "cropping", name: "Agroforestry on bunds", dev: "बांधावरील झाडे", status: "validated",
    text: "Trees such as neem, babhul, mango and tamarind are grown along field bunds. They provide fodder, fuel, fruit and shade, and they check erosion." },
  /* pests */
  { cat: "pest", name: "Bird perches", dev: "पक्षी थांबे", status: "validated",
    text: "T-shaped sticks placed in fields let insect-eating birds such as drongos and mynas rest and hunt caterpillars." },
  { cat: "pest", name: "Neem-based sprays", dev: "निंबोळी अर्क", status: "validated",
    text: "Extract of crushed neem seed kernels (nimboli) deters feeding and disrupts the growth of many insects. Neem is now used in approved commercial biopesticides." },
  { cat: "pest", name: "Ash dusting", dev: "राख", status: "studied",
    text: "Wood ash is dusted on vegetables and stored grain to deter aphids and storage insects." },
  { cat: "pest", name: "Dashaparni and agniastra", dev: "दशपर्णी", status: "studied",
    text: "Natural-farming sprays made by fermenting the leaves of several bitter plants. Farmers widely report benefits, but controlled research results are still limited." },
  /* water & land */
  { cat: "water", name: "Field bunding", dev: "बांधबंदिस्ती", status: "validated", mh: true,
    text: "Earthen or stone bunds along field boundaries stop soil from washing away and hold rainwater so that it soaks in." },
  { cat: "water", name: "Mulching", dev: "आच्छादन", status: "validated",
    text: "Crop residue or leaves spread on the soil reduce evaporation, keep the soil cool and suppress weeds." },
  /* weather */
  { cat: "weather", name: "Nakshatra rain calendar", dev: "पावसाची नक्षत्रे", status: "heritage", mh: true,
    text: "Maharashtra's farmers divide the monsoon into rain stars (nakshatras), each lasting about two weeks, and plan sowing and other work around them. The calendar follows the sun's position, so its dates are fixed; it is a planning tool, not a forecast." },
  { cat: "weather", name: "Signs from nature", dev: "निसर्ग संकेत", status: "heritage",
    text: "Farmers read coming rain from the nesting of birds, the flowering of trees such as bahava (Indian laburnum), ant movements and cloud shapes. The Brihat Samhita recorded similar signs fifteen centuries ago. Scientists have begun to study how reliable such indicators are." },
  /* animals */
  { cat: "animal", name: "Stall and shed hygiene", dev: "गोठा", status: "validated",
    text: "Krishi-Parashara advises that cattle sheds be kept clean, dry and smoke-fumigated. Modern veterinary science agrees that clean, dry housing reduces hoof and udder disease." },
  { cat: "animal", name: "Common grazing lands (gairan)", dev: "गायरान", status: "validated", mh: true,
    text: "Each village kept land for its cattle to graze. Where gairans have been protected and managed, fodder supply and groundwater both improve." },
  { cat: "animal", name: "Ethno-veterinary care", dev: "पारंपरिक पशुउपचार", status: "heritage",
    text: "Herders use many plant-based remedies for wounds, bloat and parasites. Some have been validated and many have not. KRISHIVIDYA records them as heritage only: a sick animal should always be seen by a veterinarian." },
  { cat: "soil", name: "Vermicompost", dev: "गांडूळ खत", status: "validated",
    text: "Crop waste and dung are fed to earthworms in shallow beds, producing a fine, nutrient-rich compost in about two months. Research confirms gains in soil health, and many Maharashtra farmers sell vermicompost as a side income." },
  { cat: "soil", name: "Deep summer ploughing", dev: "उन्हाळी नांगरट", status: "validated",
    text: "The field is ploughed deep once in summer and left open to the sun. It breaks the hard pan, exposes pest pupae and weed roots to heat, and lets the first rains soak deep." },
  { cat: "seed", name: "Panchagavya", dev: "पंचगव्य", status: "studied",
    text: "A fermented mixture of five cow products — dung, urine, milk, curd and ghee — sprayed on crops. Trials report growth-promoting effects in some crops, and results vary with how it is prepared." },
  { cat: "animal", name: "Kadba stacking", dev: "कडबा गंज", status: "validated",
    text: "Jowar and bajra stalks are tied in bundles and stacked in a tall cone around a pole, thatched at the top. Stored this way, dry fodder lasts through the summer without rotting." },
  { cat: "animal", name: "Azolla as fodder", dev: "अझोला", status: "validated",
    text: "A small floating fern grown in shallow tanks, rich in protein, which is fed to cattle, poultry and fish. It is a low-cost supplement now promoted by veterinary universities." },
  { cat: "weather", name: "Measuring the rain (varshamana)", dev: "वर्षमान", status: "heritage",
    text: "The Arthashastra describes a standard rain gauge, a bowl one aratni wide, and records the rainfall expected in each region. It is the earliest Indian description of measuring rain rather than only predicting it." },
  { cat: "animal", name: "Integrated crop–livestock farming", dev: "एकात्मिक शेती", status: "validated",
    text: "Crops feed animals with fodder and residue, and animals return dung, urine and draught power to the farm. This closed cycle is the core of both traditional farming and today's natural farming." }
];

/* ---- Rain stars (approximate dates of the sun's entry; vary by a day) ---- */
const NAKSHATRAS = [
  ["Rohini", "रोहिणी", "c. 25 May", "Pre-monsoon showers; fields are prepared and manure spread."],
  ["Mrig", "मृग", "c. 8 June", "The monsoon traditionally arrives; the main kharif sowing begins."],
  ["Ardra", "आर्द्रा", "c. 22 June", "Steady rain; sowing continues and rice nurseries are raised."],
  ["Punarvasu", "पुनर्वसू", "c. 6 July", "Transplanting of rice in Konkan and the hills."],
  ["Pushya", "पुष्य", "c. 20 July", "Heavy rain; weeding and inter-cultivation."],
  ["Ashlesha", "आश्लेषा", "c. 3 August", "Crops grow fast; the season of Nag Panchami."],
  ["Magha", "मघा", "c. 17 August", "Rain is vital for flowering crops."],
  ["Purva", "पूर्वा", "c. 30 August", "Late rain fills tanks and wells."],
  ["Uttara", "उत्तरा", "c. 13 September", "Early kharif harvests begin."],
  ["Hasta", "हस्त", "c. 27 September", "Rain in Hasta stores moisture in black soils for the rabi crop."],
  ["Chitra", "चित्रा", "c. 10 October", "Rabi sowing of jowar and gram begins."],
  ["Swati", "स्वाती", "c. 24 October", "Rain now is prized: 'If the Swati rains fall, pearls will ripen.'"]
];

const SEASONS = [
  ["Vasanta", "वसंत", "Spring", "Chaitra–Vaishakh (Mar–May)", "Harvest of rabi crops, threshing and the new year of Gudi Padwa."],
  ["Grishma", "ग्रीष्म", "Summer", "Jyeshtha–Ashadh (May–Jul)", "Tilling, bund repair, manuring and seed preparation."],
  ["Varsha", "वर्षा", "Monsoon", "Shravan–Bhadrapad (Jul–Sep)", "Kharif sowing, transplanting, weeding and Bail Pola."],
  ["Sharad", "शरद", "Autumn", "Ashvin–Kartik (Sep–Nov)", "Kharif harvest, Dasara and Diwali, and rabi sowing."],
  ["Hemanta", "हेमंत", "Pre-winter", "Margashirsh–Paush (Nov–Jan)", "Rabi crops grow; hurda (roasted green jowar) season."],
  ["Shishira", "शिशिर", "Winter", "Magh–Phalgun (Jan–Mar)", "Rabi crops ripen; Makar Sankranti and Holi."]
];

const SAYINGS = [
  { text: "अक्षैर्मा दीव्यः कृषिमित्कृषस्व", tr: "“Play not with dice; cultivate your field.”", src: "Rigveda 10.34.13" },
  { text: "वृक्षवल्ली आम्हां सोयरी वनचरें", tr: "“Trees and creepers are our kin, and so are the creatures of the forest.”", src: "Sant Tukaram, abhang" },
  { text: "पडतील स्वाती तर पिकतील मोती", tr: "“If the Swati rains fall, pearls will ripen.”", src: "Marathi farming proverb" },
  { text: "पिकतं तिथं विकत नाही", tr: "“What grows in a place does not sell there” — local produce is seldom valued at home.", src: "Marathi proverb" },
  { text: "जसे पेरावे तसे उगवते", tr: "“As you sow, so it grows.”", src: "Marathi proverb" },
  { text: "उत्तम खेती मध्यम बान, निषिद्ध चाकरी भीख निदान", tr: "“Farming is the best calling, trade the middling one, service is lowly and begging the last resort.”", src: "Attributed to Ghagh, North Indian folk poet" },
  { text: "सावन मास बहे पुरवाई, बैल बेच खरीदो गाई", tr: "“If the east wind blows in Shravan, sell the bullock and buy a cow” — a warning of drought.", src: "Attributed to Ghagh" },
  { text: "उत्तम शेती, मध्यम व्यापार, कनिष्ठ नोकरी", tr: "“Farming is best, trade is middling, service is the least.”", src: "Marathi proverb" },
  { text: "शेती करावी ती स्वतःच्या डोळ्यांनी", tr: "“Farming must be done with one's own eyes” — a farm prospers only under the owner's own watch.", src: "Marathi proverb" },
  { text: "गाय व्याली, गोठा भरला", tr: "“The cow has calved, the shed is full” — a single good event can turn a household's fortune.", src: "Marathi proverb" }
];

/* =====================================================================
   KRISHIVIDYA — crops and varieties
   Fields: name, Marathi name, scientific name, category, season, note, flags
   flags: GI = Geographical Indication registered for Maharashtra produce;
          land = traditional landrace or heritage variety;
          wild = gathered from forests or field margins
   Seasons: kharif (June–Oct), rabi (Oct–Mar), summer, perennial, all
   ===================================================================== */
const CROP_CATS = {
  cereal: "Cereals", millet: "Millets", pulse: "Pulses", oilseed: "Oilseeds", fibre: "Fibre crops",
  vegetable: "Vegetables", wild: "Forest & wild greens", fruit: "Fruits", spice: "Spices & condiments", plantation: "Plantation & cash crops"
};
const Cr = (name, dev, sci, cat, season, note, flags = "") => ({ name, dev, sci, cat, season, note, flags: flags ? flags.split(" ") : [] });
const CROPS = [
  /* ---------- cereals ---------- */
  Cr("Rice", "भात / तांदूळ", "Oryza sativa", "cereal", "kharif", "The staple of Konkan, the Sahyadri hills and eastern Vidarbha. India has one of the world's richest collections of rice landraces."),
  Cr("Ambemohar rice", "आंबेमोहर", "Oryza sativa", "cereal", "kharif", "A short-grained rice from Mulshi and Maval (Pune) named for its mango-blossom fragrance. It is GI-registered.", "GI land"),
  Cr("Ajara Ghansal rice", "आजरा घनसाळ", "Oryza sativa", "cereal", "kharif", "A fragrant rice from Ajara taluka of Kolhapur, known for its aroma when cooked. It is GI-registered.", "GI land"),
  Cr("Wada Kolam rice", "वाडा कोलम", "Oryza sativa", "cereal", "kharif", "A fine, soft-textured rice from Wada in Palghar district, prized for daily meals.", "land"),
  Cr("Hill rice landraces", "डोंगरी भात वाण", "Oryza sativa", "cereal", "kharif", "Mahadev Koli and Thakar farmers of Akole and Junnar grow many local varieties such as Kalbhat, Jirvel and Raibhog, suited to hill terraces and heavy rain.", "land"),
  Cr("Salt-tolerant khar rice", "खार भात", "Oryza sativa", "cereal", "kharif", "Traditional varieties grown on reclaimed coastal khar lands, where ordinary rice would fail because of salinity.", "land"),
  Cr("Khapli wheat (emmer)", "खपली गहू", "Triticum dicoccum", "cereal", "rabi", "An ancient hulled wheat still grown in Satara, Sangli and Karnataka. It is valued for its fibre and is increasingly sought by health-conscious buyers.", "land"),
  Cr("Bansi wheat (durum)", "बन्सी गहू", "Triticum durum", "cereal", "rabi", "The traditional hard wheat of the Deccan, suited to rain-fed black soils and used for semolina and chapatis.", "land"),
  Cr("Bread wheat", "गहू", "Triticum aestivum", "cereal", "rabi", "The main irrigated wheat today; high-yielding varieties spread after the Green Revolution."),
  Cr("Maize", "मका", "Zea mays", "cereal", "kharif", "Brought to India from the Americas around the 16th century, maize is now a staple of the Bhil and Pawara hills and a major fodder crop."),
  Cr("Barley", "जव", "Hordeum vulgare", "cereal", "rabi", "Yava, the chief grain of the Rigveda, and one of the first crops grown at Mehrgarh. It is now a minor crop in Maharashtra."),
  /* ---------- millets ---------- */
  Cr("Jowar (sorghum)", "ज्वारी", "Sorghum bicolor", "millet", "kharif rabi", "The traditional staple of the Deccan. Its area in Maharashtra fell from 62.8 lakh ha in 1960-61 to 16.9 lakh ha in 2024-25."),
  Cr("Maldandi jowar", "मालदांडी ज्वारी", "Sorghum bicolor", "millet", "rabi", "The famous rabi jowar of Mangalvedha (Solapur), grown on stored soil moisture. The M-35-1 variety was selected from it, and Mangalvedha jowar is GI-registered.", "GI land"),
  Cr("Dagdi and Shalu jowar", "दगडी व शाळू ज्वारी", "Sorghum bicolor", "millet", "rabi", "Local rabi types with bold white grain, traditionally preferred for bhakri.", "land"),
  Cr("Hurda jowar", "हुरडा ज्वारी", "Sorghum bicolor", "millet", "rabi", "Sweet varieties harvested at the milky stage and roasted on coals for winter hurda parties in the fields.", "land"),
  Cr("Bajra (pearl millet)", "बाजरी", "Pennisetum glaucum", "millet", "kharif", "The hardiest cereal of the dry Deccan, grown in Ahilyanagar, Pune, Nashik, Dhule and Beed."),
  Cr("Nachni (finger millet)", "नाचणी / नागली", "Eleusine coracana", "millet", "kharif", "Rich in calcium and grown on the slopes of the Sahyadri and Konkan hills. Nachni bhakri and ambil are everyday foods."),
  Cr("Varai (small millet)", "वरई / भगर", "Panicum and Echinochloa spp.", "millet", "kharif", "A hill millet of Nashik, Palghar and Ahilyanagar. Its grain, sold as bhagar, is widely eaten on fasting days. The local name is applied to more than one small millet, so botanists identify it field by field.", "land"),
  Cr("Sava", "सावा", "Echinochloa frumentacea", "millet", "kharif", "A quick-maturing hill millet of the Sahyadri tribes.", "land"),
  Cr("Rala (foxtail millet)", "राळा", "Setaria italica", "millet", "kharif", "Priyangu of the Yajurveda. Once common across the Deccan, it now survives mainly in tribal and dryland pockets.", "land"),
  Cr("Kodo millet", "कोदो / कोद्रा", "Paspalum scrobiculatum", "millet", "kharif", "A drought-hardy millet of Melghat and Gadchiroli, grown by Korku and Gond farmers.", "land"),
  Cr("Kutki", "कुटकी", "Panicum sumatrense", "millet", "kharif", "A small millet of central India's forest villages, eaten as rice or gruel.", "land"),
  Cr("Proso millet", "चेना", "Panicum miliaceum", "millet", "kharif summer", "A fast-growing millet that fits into short seasons.", "land"),
  /* ---------- pulses ---------- */
  Cr("Tur (pigeon pea)", "तूर", "Cajanus cajan", "pulse", "kharif", "India is its centre of origin. Tur is usually intercropped with jowar, cotton or soybean in Vidarbha and Marathwada."),
  Cr("Navapur tur", "नवापूर तूर", "Cajanus cajan", "pulse", "kharif", "A local tur from Navapur (Nandurbar), prized for the flavour of its dal. It is GI-registered.", "GI land"),
  Cr("Harbhara (chickpea)", "हरभरा", "Cicer arietinum", "pulse", "rabi", "The main rabi pulse of Maharashtra, grown on residual moisture in black soils."),
  Cr("Mung (green gram)", "मूग", "Vigna radiata", "pulse", "kharif", "Mudga of the Vedas. A short-duration pulse that fits before rabi crops."),
  Cr("Udid (black gram)", "उडीद", "Vigna mungo", "pulse", "kharif", "Masha of the Vedas, used for papad and fermented foods."),
  Cr("Matki (moth bean)", "मटकी", "Vigna aconitifolia", "pulse", "kharif", "Extremely drought-tolerant and traditionally mixed with bajra. Sprouted matki is the base of misal."),
  Cr("Kulith (horse gram)", "कुळीथ", "Macrotyloma uniflorum", "pulse", "kharif rabi", "A hardy hill pulse of the Konkan and Sahyadri, eaten as kulith pithla and valued in traditional medicine.", "land"),
  Cr("Chavli (cowpea)", "चवळी", "Vigna unguiculata", "pulse", "kharif", "Grown for grain, green pods and fodder."),
  Cr("Wal (field bean)", "वाल", "Lablab purpureus", "pulse", "rabi", "A Konkan speciality grown in paddy fields after the rice harvest; dalimbi usal is made from it.", "land"),
  Cr("Pavta and ghevda", "पावटा व घेवडा", "Lablab purpureus", "pulse", "rabi", "Bean types grown for green pods and grain."),
  Cr("Waghya ghevada", "वाघ्या घेवडा", "Phaseolus vulgaris", "pulse", "kharif", "A striped bean of Satara district, named for its tiger-like markings. It is GI-registered.", "GI land"),
  Cr("Masoor (lentil)", "मसूर", "Lens culinaris", "pulse", "rabi", "Masura of the Yajurveda, found at Harappan and Chalcolithic Deccan sites."),
  Cr("Lakhori (grass pea)", "लाख / लाखोळी", "Lathyrus sativus", "pulse", "rabi", "A very hardy pulse sown into standing rice in Vidarbha. Eating it in large amounts can cause lathyrism, so low-toxin varieties have been bred.", "land"),
  Cr("Watana (field pea)", "वाटाणा", "Pisum sativum", "pulse", "rabi", "Grown for green peas and dry grain; peas were found at Inamgaon."),
  Cr("Soybean", "सोयाबीन", "Glycine max", "pulse", "kharif", "A modern crop introduced on a large scale from the 1970s, now the leading kharif crop of Marathwada and western Vidarbha."),
  /* ---------- oilseeds ---------- */
  Cr("Groundnut", "भुईमूग", "Arachis hypogaea", "oilseed", "kharif summer", "Brought from South America. Its area in Maharashtra fell from 10.8 to 2.5 lakh ha between 1960-61 and 2024-25."),
  Cr("Til (sesame)", "तीळ", "Sesamum indicum", "oilseed", "kharif", "Tila of the Vedas, one of the world's oldest oilseeds. Sesame and jaggery are exchanged at Makar Sankranti."),
  Cr("Kardai (safflower)", "करडई", "Carthamus tinctorius", "oilseed", "rabi", "A thorny, drought-hardy rabi oilseed; Maharashtra has long been one of India's main producers."),
  Cr("Karale (niger)", "कारळे", "Guizotia abyssinica", "oilseed", "kharif", "A tribal-belt oilseed of the Sahyadri and Satpuda, used for oil and chutney. It is in steep decline.", "land"),
  Cr("Jawas (linseed)", "जवस", "Linum usitatissimum", "oilseed", "rabi", "Grown in Vidarbha and Marathwada; jawas chutney is a traditional food.", "land"),
  Cr("Sunflower", "सूर्यफूल", "Helianthus annuus", "oilseed", "rabi summer", "A modern oilseed that spread from the 1970s."),
  Cr("Castor", "एरंड", "Ricinus communis", "oilseed", "kharif", "Grown on field borders; the oil lit village lamps and lubricated cart axles."),
  Cr("Mustard", "मोहरी", "Brassica juncea", "oilseed", "rabi", "A minor crop in Maharashtra, grown mixed with rabi crops."),
  /* ---------- fibre ---------- */
  Cr("Desi cotton", "देशी कापूस", "Gossypium arboreum", "fibre", "kharif", "India's native cotton, grown here for at least 5,000 years. It needs few inputs and resists pests, though its fibre is shorter; efforts to revive it are underway.", "land"),
  Cr("Hybrid and Bt cotton", "संकरित कापूस", "Gossypium hirsutum", "fibre", "kharif", "American cotton, first hybrids and since 2002 Bt varieties, now covers most of Vidarbha's and Marathwada's cotton area."),
  Cr("Ambadi (kenaf)", "अंबाडी", "Hibiscus cannabinus", "fibre", "kharif", "Grown for fibre rope and for its sour leaves, which are cooked as a vegetable.", "land"),
  Cr("Tag (sunn hemp)", "ताग", "Crotalaria juncea", "fibre", "kharif", "A fibre crop that is also one of the best green manures.", "land"),
  /* ---------- vegetables ---------- */
  Cr("Brinjal", "वांगी", "Solanum melongena", "vegetable", "all", "India is a centre of brinjal diversity, and nearly every district has its own local types."),
  Cr("Jalgaon bharit brinjal", "जळगाव भरीत वांगी", "Solanum melongena", "vegetable", "rabi", "Large, round brinjals of Jalgaon, roasted for bharit. They are GI-registered.", "GI land"),
  Cr("Onion", "कांदा", "Allium cepa", "vegetable", "kharif rabi", "Maharashtra is India's largest onion producer, and Lasalgaon in Nashik is the country's largest onion market."),
  Cr("Lasalgaon onion", "लासलगाव कांदा", "Allium cepa", "vegetable", "rabi", "A pungent onion with good storage life, marketed from Lasalgaon. It is GI-registered.", "GI"),
  Cr("Alibag white onion", "अलिबाग पांढरा कांदा", "Allium cepa", "vegetable", "rabi", "A mild white onion from Raigad, valued for its medicinal reputation. It is GI-registered.", "GI land"),
  Cr("Bhendi (okra)", "भेंडी", "Abelmoschus esculentus", "vegetable", "kharif summer", "A native of the tropics widely grown in home gardens."),
  Cr("Gawar (cluster bean)", "गवार", "Cyamopsis tetragonoloba", "vegetable", "kharif", "A drought-tolerant legume of dry areas."),
  Cr("Shevga (drumstick)", "शेवगा", "Moringa oleifera", "vegetable", "perennial", "A native tree whose pods, leaves and flowers are all eaten. It is highly nutritious."),
  Cr("Dudhi (bottle gourd)", "दुधी भोपळा", "Lagenaria siceraria", "vegetable", "all", "Among the earliest cultivated plants. Dried gourds once served as containers and floats."),
  Cr("Lal bhopla (pumpkin)", "लाल भोपळा", "Cucurbita moschata", "vegetable", "kharif", "Stores for months and grows on field borders and roofs."),
  Cr("Karle (bitter gourd)", "कारले", "Momordica charantia", "vegetable", "kharif", "Grown on bamboo trellises across the state."),
  Cr("Kartoli (spiny gourd)", "करटोली", "Momordica dioica", "vegetable", "kharif", "A monsoon vegetable gathered from hedges and forest edges.", "wild"),
  Cr("Ghosale, dodka and padwal", "घोसाळे, दोडका, पडवळ", "Luffa spp., Trichosanthes cucumerina", "vegetable", "kharif", "Gourds grown on trellises in monsoon kitchen gardens."),
  Cr("Kakdi (cucumber)", "काकडी", "Cucumis sativus", "vegetable", "kharif summer", "India is the cucumber's home; local types are grown in riverbeds and field borders."),
  Cr("Methi (fenugreek)", "मेथी", "Trigonella foenum-graecum", "vegetable", "rabi", "Grown for leaves and seed."),
  Cr("Chuka and chakwat", "चुका व चाकवत", "Rumex vesicarius, Chenopodium album", "vegetable", "rabi", "Tangy leafy greens that grow in and around rabi fields."),
  Cr("Rajgira (amaranth)", "राजगिरा", "Amaranthus spp.", "vegetable", "kharif", "Grown for greens and grain; the popped grain is a fasting food."),
  Cr("Alu (colocasia)", "अळू", "Colocasia esculenta", "vegetable", "kharif", "Leaves are used for alu vadi and the corms are cooked. It grows well in Konkan and near wells."),
  Cr("Suran (elephant foot yam)", "सुरण", "Amorphophallus paeoniifolius", "vegetable", "kharif", "A tuber of Konkan and home gardens."),
  Cr("Ratale (sweet potato)", "रताळे", "Ipomoea batatas", "vegetable", "rabi", "Eaten on fasting days; also grown on residual moisture."),
  Cr("Mirchi (chilli)", "मिरची", "Capsicum annuum", "vegetable", "kharif", "Brought from the Americas in the 16th century, chilli became central to Indian food. Nandurbar has a major chilli market."),
  Cr("Bhiwapur chilli", "भिवापूर मिरची", "Capsicum annuum", "vegetable", "kharif", "A deep-red chilli from Bhiwapur in Nagpur district. It is GI-registered.", "GI land"),
  /* ---------- forest & wild greens ---------- */
  Cr("Tarota", "टाकळा / तरोटा", "Senna tora", "wild", "kharif", "The first monsoon green gathered from fallow land; its seeds are also used in traditional medicine.", "wild"),
  Cr("Kurdu", "कुरडू", "Celosia argentea", "wild", "kharif", "Tender leaves cooked as a monsoon vegetable.", "wild"),
  Cr("Shevla", "शेवळा", "Amorphophallus commutatus", "wild", "kharif", "A Konkan monsoon delicacy, cooked with kakad fruit to remove its itchiness.", "wild"),
  Cr("Bharangi", "भारंगी", "Clerodendrum serratum", "wild", "kharif", "Leaves eaten as a monsoon vegetable in tribal villages.", "wild"),
  Cr("Kavla and pathri", "कवळा व पाथरी", "Various", "wild", "kharif", "Wild greens gathered by women of the Sahyadri tribes. Maharashtra's annual ranbhaji festivals celebrate this knowledge.", "wild"),
  Cr("Mahua flowers", "मोहफुले", "Madhuca longifolia", "wild", "summer", "Collected in spring by Gond, Korku and Bhil families in Vidarbha, dried for food and sold. The seeds yield oil.", "wild"),
  Cr("Tendu", "तेंदू", "Diospyros melanoxylon", "wild", "summer", "Leaves are collected for bidi wrappers, an important seasonal income in Gadchiroli, Gondia and Chandrapur.", "wild"),
  Cr("Charoli", "चारोळी", "Buchanania lanzan", "wild", "summer", "Seeds from a forest tree, gathered by tribal families and used in sweets.", "wild"),
  Cr("Bamboo shoots", "बांबूचे कोंब", "Dendrocalamus strictus", "wild", "kharif", "Tender monsoon shoots eaten fresh or pickled in forest villages.", "wild"),
  /* ---------- fruits ---------- */
  Cr("Alphonso (Hapus) mango", "हापूस आंबा", "Mangifera indica", "fruit", "summer", "Grown on the laterite slopes of the Konkan. It is GI-registered.", "GI"),
  Cr("Marathwada Kesar mango", "मराठवाडा केशर आंबा", "Mangifera indica", "fruit", "summer", "A saffron-fleshed mango adapted to the drier plateau. It is GI-registered.", "GI"),
  Cr("Rayval and gavthi mangoes", "रायवळ / गावठी आंबा", "Mangifera indica", "fruit", "summer", "Thousands of village seedling mangoes, each tree unique, used for pickles, aamras and grafting stock.", "land"),
  Cr("Jackfruit", "फणस", "Artocarpus heterophyllus", "fruit", "summer", "A Konkan staple whose seeds, pulp and unripe fruit are all eaten."),
  Cr("Jamun", "जांभूळ", "Syzygium cumini", "fruit", "summer", "A native fruit tree of village commons; Bahadoli in Palghar is known for its large jamun.", "land"),
  Cr("Karvand", "करवंद", "Carissa carandas", "fruit", "summer", "A wild hedge fruit of the Sahyadri, called the 'black pearl of the hills'.", "wild"),
  Cr("Bor (Indian jujube)", "बोर", "Ziziphus mauritiana", "fruit", "rabi", "A hardy native fruit of dry lands, eaten fresh and dried."),
  Cr("Ranmeva (wild fruits)", "रानमेवा", "Various", "fruit", "summer", "A collective name for forest fruits such as tembhurni, aain, alu and umbar gathered in summer.", "wild"),
  Cr("Nagpur orange", "नागपुरी संत्री", "Citrus reticulata", "fruit", "rabi", "The mandarin of Nagpur, Amravati and Wardha. It is GI-registered.", "GI"),
  Cr("Jalna sweet orange", "जालना मोसंबी", "Citrus sinensis", "fruit", "rabi", "The mosambi of Jalna and Marathwada. It is GI-registered.", "GI"),
  Cr("Solapur pomegranate", "सोलापूर डाळिंब", "Punica granatum", "fruit", "all", "Bhagwa and Ganesh varieties grow in the dry districts of Solapur, Sangli and Ahilyanagar. The Solapur pomegranate is GI-registered.", "GI"),
  Cr("Nashik grapes", "नाशिक द्राक्षे", "Vitis vinifera", "fruit", "rabi", "The grape and wine capital of India. Nashik grapes are GI-registered.", "GI"),
  Cr("Sangli raisins", "सांगली बेदाणे", "Vitis vinifera", "fruit", "rabi", "Sun-dried and shade-dried raisins from Sangli and Tasgaon. They are GI-registered.", "GI"),
  Cr("Jalgaon banana", "जळगाव केळी", "Musa spp.", "fruit", "perennial", "Grand Naine and Basrai bananas of the Tapi valley. Jalgaon banana is GI-registered.", "GI"),
  Cr("Purandar fig", "पुरंदर अंजीर", "Ficus carica", "fruit", "rabi", "Grown on the dry hills of Purandar (Pune). It is GI-registered.", "GI"),
  Cr("Beed custard apple", "बीड सीताफळ", "Annona squamosa", "fruit", "kharif", "Grows almost wild on the rocky hills of Beed and Balaghat. It is GI-registered.", "GI"),
  Cr("Dahanu Gholvad chikoo", "डहाणू घोलवड चिकू", "Manilkara zapota", "fruit", "all", "Sapota from the coastal belt of Palghar. It is GI-registered.", "GI"),
  Cr("Mahabaleshwar strawberry", "महाबळेश्वर स्ट्रॉबेरी", "Fragaria × ananassa", "fruit", "rabi", "Grown on the cool plateau of Mahabaleshwar and Panchgani. It is GI-registered.", "GI"),
  Cr("Guava", "पेरू", "Psidium guajava", "fruit", "rabi", "Introduced by the Portuguese; now grown across the state."),
  Cr("Amla", "आवळा", "Phyllanthus emblica", "fruit", "rabi", "A native fruit rich in vitamin C, used in food and Ayurveda."),
  Cr("Tamarind", "चिंच", "Tamarindus indica", "fruit", "rabi", "A long-lived shade tree of villages and roadsides, and a source of income for forest families."),
  Cr("Kokum", "कोकम / रातांबा", "Garcinia indica", "fruit", "summer", "A native tree of the Western Ghats. Its dried rind sours curries, and solkadhi is made from it. Kokum of the Konkan is GI-registered.", "GI"),
  /* ---------- spices ---------- */
  Cr("Turmeric", "हळद", "Curcuma longa", "spice", "kharif", "A native of India used in food, ritual and medicine. Sangli and the Basmat market in Hingoli are major trade centres."),
  Cr("Sangli turmeric", "सांगली हळद", "Curcuma longa", "spice", "kharif", "Traditionally stored in underground pits (pev) that keep it for years. It is GI-registered.", "GI"),
  Cr("Waigaon turmeric", "वायगाव हळद", "Curcuma longa", "spice", "kharif", "A deep-coloured, high-curcumin turmeric of Waigaon in Wardha district. It is GI-registered.", "GI land"),
  Cr("Ginger", "आले", "Zingiber officinale", "spice", "kharif", "Grown in Aurangabad, Jalna and Satara."),
  Cr("Garlic", "लसूण", "Allium sativum", "spice", "rabi", "A rabi crop of Nashik, Pune and Marathwada."),
  Cr("Coriander", "धणे / कोथिंबीर", "Coriandrum sativum", "spice", "rabi", "Grown for seed and fresh leaves."),
  Cr("Black pepper", "मिरी", "Piper nigrum", "spice", "perennial", "A native of the Western Ghats, grown on trees in Konkan orchards."),
  Cr("Kolhapur jaggery", "कोल्हापुरी गूळ", "Saccharum officinarum", "spice", "perennial", "Made by boiling sugarcane juice in open pans at village gurhals. It is GI-registered.", "GI"),
  /* ---------- plantation & cash ---------- */
  Cr("Kalbhat rice", "काळभात", "Oryza sativa", "cereal", "kharif", "A black-husked aromatic landrace of the Akole hills, revived by community seed keepers after nearly disappearing.", "land"),
  Cr("Indrayani rice", "इंद्रायणी", "Oryza sativa", "cereal", "kharif", "A soft, fragrant rice bred at Vadgaon Maval and now the everyday rice of much of western Maharashtra."),
  Cr("Marvel grass", "मारवेल गवत", "Dichanthium annulatum", "fibre", "kharif", "A native Deccan fodder grass of bunds and grazing commons, valued because it stays palatable when dry.", "land"),
  Cr("Neem", "कडुनिंब", "Azadirachta indica", "plantation", "perennial", "Planted on bunds and in every village square. Its seed gives biopesticide, its leaves protect stored grain and its shade cools the cattle shed."),
  Cr("Babhul", "बाभूळ", "Vachellia nilotica", "plantation", "perennial", "A thorny native tree of dry lands giving fuel, tool wood, gum and pods that are prized goat and sheep fodder."),
  Cr("Karanj", "करंज", "Pongamia pinnata", "oilseed", "perennial", "A tree of streambanks and bunds whose seed oil lit lamps and treated cattle wounds; its leaves are used as green manure."),
  Cr("Tad (palmyra palm)", "ताड", "Borassus flabellifer", "plantation", "perennial", "Tapped for sweet neera and toddy, and the source of tadgola in summer. Its leaves thatch roofs and were once written on."),
  Cr("Kavath (wood apple)", "कवठ", "Limonia acidissima", "fruit", "rabi", "A hard-shelled native fruit of dry village groves, eaten as chutney and used in traditional medicine.", "land"),
  Cr("Bel", "बेल", "Aegle marmelos", "fruit", "summer", "A sacred native fruit tree; its leaves are offered to Shiva and its pulp is drunk as sherbet in the heat."),
  Cr("Shepu (dill)", "शेपू", "Anethum graveolens", "vegetable", "rabi", "A winter leafy vegetable of Maharashtra kitchen gardens, cooked with moong dal."),
  Cr("Ghol (purslane)", "घोळ", "Portulaca oleracea", "wild", "kharif", "A succulent green that comes up on its own in fields and yards after rain, rich in omega-3 fatty acids.", "wild"),
  Cr("Dagad phool (stone flower)", "दगडफूल", "Parmotrema perlatum", "spice", "perennial", "A lichen gathered from rocks and tree bark in the Sahyadri, essential to Maharashtra's goda masala and Kolhapuri spice blends.", "wild"),
  Cr("Ambat chuka", "आंबट चुका", "Rumex acetosa", "vegetable", "rabi", "A sour-leaved winter green cooked with dal or made into a thin curry."),
  Cr("Sugarcane", "ऊस", "Saccharum officinarum", "plantation", "perennial", "India is one of the homes of sugar: the word 'sugar' traces back to the Sanskrit sharkara. Maharashtra's co-operative sugar factories began at Pravaranagar in 1950."),
  Cr("Coconut", "नारळ", "Cocos nucifera", "plantation", "perennial", "The 'kalpavriksha' of the Konkan, used for food, oil, rope, thatch and toddy."),
  Cr("Cashew", "काजू", "Anacardium occidentale", "plantation", "perennial", "Brought by the Portuguese; Vengurla cashew of Sindhudurg is GI-registered.", "GI"),
  Cr("Areca nut", "सुपारी", "Areca catechu", "plantation", "perennial", "Grown in shaded Konkan orchards (agar) alongside coconut, banana and pepper."),
  Cr("Betel vine", "विड्याची पाने", "Piper betle", "plantation", "perennial", "Grown in shaded gardens (paanmala) of Vasai, Ramtek and elsewhere; the leaves are offered in rituals.")
];

/* =====================================================================
   KRISHIVIDYA — animals of Indian farming
   INDIA_BREEDS: a selection of notable indigenous breeds from across India
   (Maharashtra's 17 registered breeds are in data-maharashtra.js).
   ICAR-NBAGR recognised 219 indigenous breeds of 16 species when the
   21st Livestock Census began in 2024.
   HELPERS: animals that help farmers — guarding, pest control,
   pollination, soil building, transport and livelihoods.
   Wild species are protected by law; never capture or harm them.
   ===================================================================== */
const Br = (name, species, home, use, note) => ({ name, species, home, use, note });
const INDIA_BREEDS = [
  Br("Gir", "cattle", "Gujarat (Saurashtra)", "Milk", "Recognised by its domed forehead and long, pendulous ears. Gir cattle have been exported to Brazil, where they formed the basis of large dairy herds."),
  Br("Sahiwal", "cattle", "Punjab", "Milk", "One of India's best indigenous dairy breeds, heat-tolerant and tick-resistant."),
  Br("Red Sindhi", "cattle", "Sindh (now Pakistan); herds in India", "Milk", "A compact, deep-red dairy breed well suited to hot climates."),
  Br("Tharparkar", "cattle", "Rajasthan (Thar desert)", "Milk and draught", "A white-grey breed that thrives on sparse desert grazing."),
  Br("Kankrej", "cattle", "Gujarat and Rajasthan", "Draught and milk", "Powerful and fast, with lyre-shaped horns; known for its swinging gait."),
  Br("Hariana", "cattle", "Haryana", "Draught and milk", "The classic dual-purpose breed of the northern plains."),
  Br("Ongole", "cattle", "Andhra Pradesh", "Draught", "A large white breed that became the foundation of the Nelore breed of Brazil."),
  Br("Hallikar", "cattle", "Karnataka", "Draught", "A fast, hardy draught breed, and an ancestor of the Amrit Mahal."),
  Br("Amrit Mahal", "cattle", "Karnataka", "Draught", "Bred by the rulers of Mysore to haul army transport."),
  Br("Kangayam", "cattle", "Tamil Nadu", "Draught", "A strong breed of the Kongu region, used in the Jallikattu tradition."),
  Br("Krishna Valley", "cattle", "Krishna basin, Karnataka–Maharashtra border", "Draught", "Heavy bullocks for deep black soils, bred along the Krishna and its tributaries."),
  Br("Malnad Gidda", "cattle", "Karnataka (Western Ghats)", "Milk and manure", "A small hill breed that forages in forest and needs very little feed."),
  Br("Vechur", "cattle", "Kerala", "Milk", "Among the smallest cattle in the world. A farmers' and scientists' campaign saved it from extinction in the 1990s."),
  Br("Punganur", "cattle", "Andhra Pradesh", "Milk", "A very small breed with high-fat milk, now the focus of conservation."),
  Br("Badri", "cattle", "Uttarakhand hills", "Milk", "A small, sure-footed breed of the Himalayan slopes."),
  Br("Murrah", "buffalo", "Haryana", "Milk", "The world's best-known dairy buffalo, with tightly curled horns."),
  Br("Jaffarabadi", "buffalo", "Gujarat (Saurashtra)", "Milk", "A very heavy buffalo with drooping horns."),
  Br("Bhadawari", "buffalo", "Uttar Pradesh and Madhya Pradesh", "High-fat milk", "Famous for milk fat that can exceed 10 per cent."),
  Br("Banni", "buffalo", "Kutch, Gujarat", "Milk", "Raised by Maldhari herders on the Banni grasslands; it grazes mainly at night."),
  Br("Toda", "buffalo", "Nilgiris, Tamil Nadu", "Milk", "Central to the life and rituals of the Toda people."),
  Br("Chilika", "buffalo", "Odisha", "Milk", "Grazes in the brackish waters of Chilika lake."),
  Br("Jamunapari", "goat", "Uttar Pradesh", "Milk and meat", "A tall goat with long pendulous ears and a Roman nose."),
  Br("Beetal", "goat", "Punjab", "Milk and meat", "A large dairy goat of the Punjab plains."),
  Br("Black Bengal", "goat", "West Bengal and eastern India", "Meat and skin", "A small, very prolific goat valued for meat and fine skins."),
  Br("Sirohi", "goat", "Rajasthan", "Meat and milk", "A hardy desert goat that does well under stall feeding."),
  Br("Changthangi", "goat", "Ladakh", "Pashmina fibre", "Produces the fine undercoat spun into pashmina."),
  Br("Nellore", "sheep", "Andhra Pradesh", "Meat", "A tall, hair-coated sheep with no wool."),
  Br("Marwari", "sheep", "Rajasthan", "Carpet wool", "Thrives in the desert on long migrations."),
  Br("Chokla", "sheep", "Rajasthan", "Fine carpet wool", "Yields some of the finest carpet wool in India."),
  Br("Garole", "sheep", "Sundarbans, West Bengal", "Meat", "A small sheep that often bears twins; its prolificacy gene is studied worldwide."),
  Br("Marwari horse", "horse", "Rajasthan", "Riding", "Known for ears that curve inward until their tips touch."),
  Br("Kathiawari", "horse", "Gujarat", "Riding", "A hardy desert horse with inward-curving ears."),
  Br("Manipuri pony", "horse", "Manipur", "Riding and polo", "The pony on which modern polo was played in Manipur."),
  Br("Spiti and Zanskari", "horse", "Himachal Pradesh and Ladakh", "Pack and riding", "Sure-footed mountain ponies that carry loads at high altitude."),
  Br("Kharai camel", "camel", "Kutch, Gujarat", "Milk", "A camel that swims to feed on mangroves in the Gulf of Kutch."),
  Br("Bikaneri", "camel", "Rajasthan", "Draught and riding", "The heaviest Indian camel breed."),
  Br("Halari donkey", "donkey", "Gujarat", "Pack", "A white donkey of the Jamnagar region, now rare."),
  Br("Spiti donkey", "donkey", "Himachal Pradesh", "Pack", "A small, strong donkey of the cold desert."),
  Br("Arunachali yak", "yak", "Arunachal Pradesh", "Milk, fibre and pack", "Kept by Monpa and Sherdukpen herders at high altitude."),
  Br("Mithun", "mithun", "Arunachal Pradesh, Nagaland, Manipur, Mizoram", "Meat and ritual", "A semi-wild forest bovine, the state animal of Arunachal Pradesh and Nagaland."),
  Br("Ghungroo", "pig", "West Bengal", "Meat", "A black pig with a bulldog-like face, reared by small farmers."),
  Br("Niang Megha", "pig", "Meghalaya", "Meat", "A hardy hill pig of the north-east."),
  Br("Bargur", "cattle", "Tamil Nadu (Bargur hills)", "Draught", "A fiery, fast hill breed herded by the Lingayat community in the Bargur forests."),
  Br("Pulikulam", "cattle", "Tamil Nadu", "Draught and manure", "Kept in large migratory herds and used in the Jallikattu tradition."),
  Br("Umblachery", "cattle", "Tamil Nadu (Cauvery delta)", "Draught", "Bred for working in wet, puddled paddy fields; calves are distinctively marked."),
  Br("Kenkatha", "cattle", "Bundelkhand, Uttar Pradesh and Madhya Pradesh", "Draught", "A small, tough breed that works the stony soils of Bundelkhand."),
  Br("Nili-Ravi", "buffalo", "Punjab", "Milk", "Recognised by its wall eyes and white markings; a leading dairy buffalo of the north-west."),
  Br("Surti", "buffalo", "Gujarat", "Milk", "A medium-sized buffalo whose milk is high in fat, long used for ghee."),
  Br("Mehsana", "buffalo", "Gujarat", "Milk", "Developed from Murrah and Surti crosses and now the mainstay of many Gujarat dairies."),
  Br("Malabari", "goat", "Kerala", "Meat and milk", "A prolific coastal goat, also called Tellicherry, well adapted to humid weather."),
  Br("Gaddi", "sheep", "Himachal Pradesh and Jammu", "Wool and meat", "Migratory sheep herded by Gaddi shepherds between valley and alpine pasture."),
  Br("Kadaknath", "poultry", "Jhabua, Madhya Pradesh", "Meat", "A chicken with black feathers, skin and meat, traditionally raised by Bhil and Bhilala families. It is GI-registered to Madhya Pradesh and is also reared in Maharashtra."),
  Br("Aseel", "poultry", "Andhra Pradesh, Odisha, Chhattisgarh", "Meat and game", "A tall, muscular fowl with great stamina."),
  Br("Pati duck", "duck", "Assam", "Eggs and meat", "Foraged in paddy fields and wetlands.")
];

const HELPER_GROUPS = {
  guard: "Guarding & herding", pest: "Natural pest control", pollinator: "Pollinators", soil: "Soil builders",
  livelihood: "Products & livelihoods", transport: "Draught & transport", cleaner: "Nature's cleaners"
};
const Hp = (name, dev, group, role, care) => ({ name, dev, group, role, care });
const HELPERS = [
  /* guarding & herding */
  Hp("Indian pariah dog (INDog)", "देशी कुत्रा", "guard", "India's native free-ranging dog, one of the oldest dog populations in the world. On farms it guards houses, cattle sheds and stored grain, raises the alarm against intruders and wild animals, and needs very little care.", "Vaccinate against rabies, deworm regularly and provide shade and water. Local dogs are hardier in Indian conditions than most imported breeds."),
  Hp("Mudhol hound (Caravan hound)", "मुधोळ / कारवान", "guard", "A slender sighthound of the Deccan, bred around Mudhol on the Karnataka–Maharashtra border and long kept by rural families of both states. It is fast, alert and loyal, and has been trained by the Indian Army.", "It needs space to run and a protein-rich diet; it tolerates heat but not cold."),
  Hp("Pashmi hound", "पश्मी", "guard", "A Deccan sighthound close to the Caravan hound, with a silky coat, kept in villages of Maharashtra and north Karnataka for hunting and guarding.", "The same care as the Mudhol hound; the population is small and deserves conservation."),
  Hp("Shepherd dogs of the Dhangars", "धनगरी कुत्री", "guard", "Dhangar and other herders travel with sturdy local dogs that guard their flocks at night against wolves, jackals and thieves.", "Herders value the dogs' loyalty; rabies vaccination protects both dogs and flocks."),
  Hp("Rajapalayam, Chippiparai and Kombai", "राजपाळयम, चिप्पिपारै, कोंबई", "guard", "Native breeds of Tamil Nadu used for hunting and guarding farms and homes.", "They are strong, heat-adapted and loyal to their families."),
  Hp("Gaddi and Bakharwal dogs", "गद्दी व बकरवाल कुत्रा", "guard", "Large mountain guardian dogs of Himachal Pradesh and Jammu & Kashmir that protect flocks from leopards and bears.", "They are adapted to cold climates and follow seasonal migrations."),
  /* pest control */
  Hp("Domestic cat", "मांजर", "pest", "Cats have been kept near grain stores for thousands of years because they hunt rats and mice, which eat and spoil stored grain and spread disease. A cat in the house or barn is one of the cheapest forms of rodent control.", "Provide clean water, vaccination and a safe place to sleep. Never use rat poison where cats hunt, because poisoned rodents also kill cats."),
  Hp("Barn owl", "गव्हाणी घुबड", "pest", "A single barn owl family eats a very large number of rats and field mice in a year, making it one of the best natural rodent controllers. Farmers in several countries, including India, install nest boxes to attract them.", "Protect nesting sites in old trees and buildings, avoid rodent poisons, and discourage the superstition that owls are unlucky."),
  Hp("Spotted owlet", "पिंगळा", "pest", "A small owl of villages and orchards that hunts insects, mice and lizards at dusk.", "Leave old trees with hollows standing."),
  Hp("Black drongo", "कोतवाल", "pest", "Called kotwal (the watchman) in Marathi, this glossy black bird perches in fields and catches grasshoppers, caterpillars and moths. It also drives away crows and hawks from other birds' nests.", "Place bird perches in fields and keep hedgerows and bund trees."),
  Hp("Cattle egret", "गाय बगळा", "pest", "Follows ploughs and grazing cattle to catch the insects they disturb, and removes ticks from animals.", "Protect heronries in village trees and wetlands."),
  Hp("Indian myna and other birds", "साळुंकी", "pest", "Mynas, bulbuls, babblers and rollers eat large numbers of crop pests, especially caterpillars.", "Reduce pesticide use and leave some trees and hedges."),
  Hp("Indian rat snake (dhaman)", "धामण", "pest", "A large, non-venomous snake that eats rats in fields and granaries. It is often killed out of fear, which only helps the rodents.", "Learn to tell it apart from venomous snakes, and call a trained rescuer instead of killing snakes. It is protected wildlife."),
  Hp("Frogs and toads", "बेडूक", "pest", "Paddy-field frogs and toads eat insects, snails and mosquito larvae every monsoon night.", "Avoid heavy pesticide use in paddy and keep some water bodies."),
  Hp("Insect-eating bats", "वटवाघूळ", "pest", "Small bats eat thousands of flying insects, including crop moths, each night. Fruit bats pollinate and spread the seeds of trees.", "Protect roosts in old buildings and trees. Bats are protected."),
  Hp("Indian grey mongoose", "मुंगूस", "pest", "Hunts rats, snakes and insects around farms and villages.", "It is protected wildlife and must not be caught or kept."),
  Hp("Bengal monitor lizard (ghorpad)", "घोरपड", "pest", "Eats rodents, insects and carrion around fields.", "It is a protected species; hunting it is illegal."),
  Hp("Ladybird beetles", "ढालकिडा", "pest", "Adults and larvae eat aphids, mealybugs and other soft-bodied pests.", "Avoid broad-spectrum insecticides and grow flowering border plants."),
  Hp("Spiders", "कोळी", "pest", "Paddy and cotton fields hold thousands of spiders that trap and eat pests.", "Spare spiders and their webs; they are among the farmer's best allies."),
  Hp("Trichogramma wasps", "ट्रायकोग्रामा", "pest", "Tiny wasps that lay their eggs inside the eggs of moth pests. They are mass-reared and released by agricultural universities as biocontrol.", "Obtain cards from Krishi Vigyan Kendras and avoid spraying after release."),
  Hp("Dragonflies and lacewings", "चतुर", "pest", "Dragonflies catch mosquitoes and flying pests; lacewing larvae eat aphids.", "Keep ponds and flowering plants near fields."),
  /* pollinators */
  Hp("Indian honey bee", "सातेरी मधमाशी", "pollinator", "Apis cerana indica nests in cavities and can be kept in wooden boxes. Its pollination raises the yield of crops such as sunflower, mustard, niger and many fruits. Manghar near Mahabaleshwar was declared Maharashtra's first 'honey village'.", "Keep boxes near flowering crops, avoid spraying during flowering, and learn beekeeping through the Khadi and Village Industries Board."),
  Hp("Rock bee", "आग्या मधमाशी", "pollinator", "Apis dorsata builds huge open combs on cliffs and tall trees. Katkari, Thakar and other forest communities have harvested its wild honey for generations.", "Sustainable harvesting leaves part of the comb and the brood intact."),
  Hp("Dwarf bee and stingless bee", "फुलोरी व डंखरहित मधमाशी", "pollinator", "Small native bees that pollinate vegetables and wild plants. Stingless bees are now kept for their medicinal honey.", "Leave wild corners and hedges where they can nest."),
  Hp("Butterflies, moths and beetles", "फुलपाखरे", "pollinator", "Many crops and wild plants depend on insects other than bees for pollination.", "Grow native flowering plants on bunds and avoid unnecessary spraying."),
  /* soil builders */
  Hp("Earthworms", "गांडूळ", "soil", "Called the farmer's friend, earthworms tunnel through soil, letting in air and water, and turn crop waste into rich castings. Vermicompost is made by feeding waste to earthworms.", "Add organic matter, keep the soil moist and covered, and reduce chemical inputs."),
  Hp("Dung beetles", "शेणकिडा", "soil", "Bury dung, returning nutrients to the soil, and break the life cycles of flies and parasites.", "Some deworming drugs harm dung beetles; follow veterinary advice on timing."),
  Hp("Ants and termites", "मुंग्या व वाळवी", "soil", "They mix and aerate soil and break down dead wood. Termites can also damage crops, so their role is mixed.", "Manage termites in crops without destroying all soil life."),
  /* livelihoods */
  Hp("Mulberry silkworm", "तुती रेशीम कीटक", "livelihood", "Sericulture has spread across Marathwada and western Maharashtra, giving farmers a monthly income from cocoons.", "Needs clean rearing houses and pesticide-free mulberry."),
  Hp("Tasar silkworm", "टसर रेशीम कीटक", "livelihood", "Wild tasar silk is reared on ain and arjun trees in the forests of Bhandara, Gondia, Chandrapur and Gadchiroli, largely by Dhiwar (Dhimar) families.", "Depends on healthy forests and protection from birds and wasps."),
  Hp("Lac insect", "लाख कीटक", "livelihood", "Kerria lacca is cultivated on palas, ber and kusum trees. Its resin, lac, is used in bangles, varnish and food glazing.", "A forest-based income that also keeps host trees standing."),
  Hp("Fish in tanks and paddies", "मासे", "livelihood", "Malgujari tanks and village ponds support carp fisheries run by Dhiwar and Bhoi communities. In rice–fish farming, fish eat weeds and pests and fertilise the paddy.", "Keep tanks free of pollution and stock native species."),
  Hp("Ducks in paddy", "बदके", "livelihood", "Ducks let into paddy fields eat weeds, snails and insects and add manure.", "Release them after the rice plants are established."),
  Hp("Backyard poultry", "गावठी कोंबडी", "livelihood", "Village hens forage on insects and grain waste and give eggs and meat. In Gadchiroli and Palghar most poultry is backyard poultry.", "Vaccinate against Ranikhet disease and provide safe night shelter."),
  /* draught & transport */
  Hp("Working bullocks", "बैल", "transport", "For thousands of years bullocks have ploughed, sown, weeded, threshed, lifted water and hauled carts. Maharashtra's male indigenous cattle fell from 67.8 to 47.7 lakh between 2012 and 2019.", "Rest them during heat, care for their hooves and necks, and honour them on Bail Pola."),
  Hp("He-buffalo (redya)", "रेडा", "transport", "Used to puddle and plough flooded paddy fields in Konkan and eastern Vidarbha, where bullocks tire quickly in mud.", "Buffaloes need water or mud to wallow in to keep cool."),
  Hp("Donkeys and mules", "गाढव व खेचर", "transport", "Carry clay, bricks, stone and loads on hill paths. Maharashtra's donkeys fell by 39.7% between 2012 and 2019.", "Donkeys at brick kilns often suffer overwork; welfare groups provide care camps."),
  Hp("Elephants", "हत्ती", "transport", "Once used for logging and forest work. Kamlapur in Gadchiroli has Maharashtra's elephant camp, and Palakapya's Hastyayurveda records ancient elephant medicine.", "Wild elephants are protected; captive elephants need expert care."),
  /* cleaners */
  Hp("House sparrow", "चिमणी", "pest", "Sparrows nest in farmhouses and feed their chicks on insects, including crop pests. Their decline in towns has become a symbol of what intensive building and pesticides cost.", "Put up nest boxes, leave eaves and holes open, and keep water out in summer."),
  Hp("Indian roller", "नीलकंठ", "pest", "A bright blue bird that hunts grasshoppers, beetles and caterpillars from wires and bund trees, and is often seen following the plough.", "Keep perches and bund trees, and avoid spraying when it is hunting."),
  Hp("Green bee-eater", "वेडा राघू", "pest", "Catches flying insects over fields all day, including many moths whose caterpillars damage crops.", "Leave open perches and earth banks where it nests in tunnels."),
  Hp("Hoopoe", "हुदहुद", "pest", "Probes the soil with its long bill for grubs and cutworms that attack roots.", "Avoid soil insecticides, which remove its food and poison it."),
  Hp("Weaver ants", "विणकर मुंग्या", "pest", "Aggressive tree ants that drive away fruit-boring insects. Orchard farmers in parts of India and South-East Asia have long tolerated or encouraged them as guards.", "Leave their leaf nests alone in mango and cashew trees."),
  Hp("Pond heron", "ढोकरी", "pest", "Stands motionless at the edge of paddy fields and channels, taking insects, frogs and crabs.", "Keep field channels and small water bodies unpolluted."),
  Hp("Vultures", "गिधाड", "cleaner", "Vultures cleaned carcasses from villages within hours, preventing disease. India's vultures declined by more than 95 per cent after cattle were treated with the painkiller diclofenac, which poisons vultures; veterinary use of diclofenac was banned in 2006.", "Use only vulture-safe veterinary painkillers and support vulture restaurants and breeding programmes."),
  Hp("Crows and kites", "कावळा व घार", "cleaner", "Scavenge waste and dead animals around villages.", "They are part of the village ecosystem and do not need feeding.")
];

/* =====================================================================
   KRISHIVIDYA — communities of Maharashtra and their knowledge
   Descriptions refer to traditional livelihood associations. Every
   community today includes people of many occupations, and no
   description should be read as a fixed identity. Official status is
   given only where it is a legal category (ST, PVTG, NT, DNT).
   These profiles are compiled from published ethnographies, gazetteers
   and research; they should be reviewed with community members.
   ===================================================================== */
const COMM_CATS = {
  farming: "Settled farming communities", coastal: "Coastal communities", pastoral: "Pastoral & nomadic communities",
  tribal: "Adivasi (Scheduled Tribe) communities", artisan: "Village artisans & service communities", performer: "Folk performers of the farming year"
};
const Cm = o => o;
const COMMUNITIES = [
/* ============ SETTLED FARMING ============ */
Cm({ key: "kunbi", cat: "farming", icon: "🧑‍🌾", name: "Maratha-Kunbi", dev: "मराठा-कुणबी", region: "Across the Deccan plateau",
  overview: "Kunbi means 'cultivator', and Maratha-Kunbi families form the largest farming population of the Deccan. Their knowledge shaped the rain-fed agriculture of the black-soil plateau.",
  agri: ["Farms follow a kharif–rabi rhythm. After the first Mrig rains, kharif bajra, jowar, tur and pulses are sown; after the monsoon, rabi jowar, wheat and gram grow on moisture stored in the soil.",
    "Crops are mixed to spread risk. A typical field has rows of jowar with tur, or bajra with matki, so that one crop survives even in a poor monsoon.",
    "Land is worked with a pair of bullocks and wooden tools made by the village carpenter: the nangar for deep ploughing, the vakhar for harrowing, the pabhar for sowing in rows and the kulav for weeding between them.",
    "Seed is selected from the best earheads, dried, mixed with ash or neem and kept in kanagi bins or clay pots until the next season."],
  ah: ["Almost every household keeps a pair of bullocks and a cow or buffalo. Khillari, Deoni and Red Kandhari bullocks are chosen for strength and gait.",
    "Jowar stalks (kadba) are stacked as dry fodder for the summer, and green fodder is cut from bunds and field edges.",
    "Dung is composted in pits into shenkhat and returned to the fields before sowing.",
    "On Bail Pola the bullocks are rested, bathed, painted and garlanded, and the family eats only after feeding them puranpoli."],
  crops: "Jowar, bajra, tur, matki, mung, wheat, gram, cotton, soybean and sugarcane", animals: "Bullocks, cows, buffaloes, goats and poultry",
  tools: "Nangar, vakhar, pabhar (seed drill), kulav, vila (sickle), bailgadi (bullock cart)", festivals: "Bail Pola, Vel Amavasya, Gudi Padwa, Akshaya Tritiya and Makar Sankranti",
  food: "Jowar and bajra bhakri, pithla, thecha, and roasted green jowar (hurda) in winter", knowledge: "Sowing is timed by the rain stars, and hundreds of proverbs record lessons about soil, seed and weather.",
  today: "Average holdings have shrunk to 1.23 hectares, tractors have replaced many bullock pairs, and dryland farmers face debt and erratic rain." }),

Cm({ key: "konkan-kunbi", cat: "farming", icon: "🌾", name: "Kunbis of the Konkan", dev: "कोकणातील कुणबी", region: "Raigad, Ratnagiri, Sindhudurg, Thane",
  overview: "Konkan Kunbis farm the narrow strip between the Sahyadri and the sea, where rainfall can exceed 3,000 mm. Their farming is built around rice.",
  agri: ["Paddy is raised in nurseries treated by rab: layers of leaves, twigs and dung are burnt on the seed bed before sowing to kill weeds and warm the soil.",
    "Seedlings are transplanted into bunded fields once the monsoon is established. Varkas (upland) slopes are sown with nachni, varai and kulith.",
    "After the rice harvest, wal and other pulses are sown on residual moisture in the same fields."],
  ah: ["He-buffaloes (redya) and small bullocks puddle the flooded fields.",
    "Cattle graze on the slopes during the dry season and are kept in sheds through the heavy rains."],
  crops: "Paddy, nachni, varai, kulith, wal, mango, cashew and coconut", animals: "Buffaloes, small hill cattle and poultry",
  tools: "Light plough for wet fields, wooden leveller (phali), sickle", festivals: "Shimga (the Konkan Holi), Ganeshotsav and Navanna (the festival of new rice)",
  food: "Rice bhakri, kulith pithla, fish curry and dalimbi usal", knowledge: "Detailed knowledge of rice varieties for each field type, from high slopes to low, water-logged plots.",
  today: "Many tenants farmed under the Khoti system until it was abolished in 1949. Migration to Mumbai has left many fields fallow." }),

Cm({ key: "mali", cat: "farming", icon: "🥬", name: "Mali", dev: "माळी", region: "Around towns — Pune, Saswad, Nashik, Satara, Jalna and elsewhere",
  overview: "The Mali community are traditionally gardeners who supplied towns with vegetables, flowers and fruit. Mahatma Jotirao Phule, the great social reformer, came from a Mali family.",
  agri: ["Vegetables, flowers and fruit are grown intensively on small irrigated plots near towns.",
    "Water was once lifted from wells by the mot; today drip and sprinkler systems are common.",
    "Mali gardeners are skilled at raising nurseries, grafting fruit trees and producing seed of vegetables.",
    "Compost made from market and kitchen waste keeps the soil rich."],
  ah: ["Bullock pairs worked the mot, and cows and buffaloes supplied dung for the gardens."],
  crops: "Onion, garlic, leafy vegetables, brinjal, marigold, chrysanthemum, fig, guava and pomegranate", animals: "Bullocks, cows and buffaloes",
  tools: "Mot and well, spade, garden hoe, grafting knife", festivals: "Gudi Padwa, Mahatma Phule Jayanti and Satyashodhak traditions",
  food: "Seasonal vegetables with bhakri", knowledge: "Phule's Shetkaryacha Asud (1883) described farmers' problems and proposed irrigation and education as solutions.",
  today: "Expanding cities are swallowing the garden land around towns." }),

Cm({ key: "leva-patil", cat: "farming", icon: "🍌", name: "Leva Patil", dev: "लेवा पाटील", region: "Tapi valley — Jalgaon and parts of Buldhana",
  overview: "The Leva Patil community farm the deep black soils of the Tapi valley and are known for turning Jalgaon into a banana-growing region of national importance.",
  agri: ["Bananas are grown on raised beds, and Jalgaon farmers were among the earliest in India to adopt drip irrigation on a large scale.",
    "Cotton, jowar and wheat are rotated with banana to rest the soil."],
  ah: ["Buffaloes are kept for milk alongside the banana plantations, and bullocks are used for inter-cultivation."],
  crops: "Banana, cotton, jowar and wheat", animals: "Buffaloes and bullocks", tools: "Drip systems, bullock-drawn hoes", festivals: "Pola and Akshaya Tritiya",
  food: "Bharit made from roasted Jalgaon brinjal, with kalnyachi bhakri", knowledge: "Their Leva Ganboli dialect preserves a rich farming vocabulary.",
  today: "Banana wilt, price swings and falling groundwater are the main challenges." }),

Cm({ key: "gujar", cat: "farming", icon: "🌱", name: "Gujar farmers of Khandesh", dev: "खानदेशातील गुजर", region: "Shahada, Shirpur, Taloda and nearby talukas of Nandurbar and Dhule",
  overview: "The Gujar farming families of Khandesh are known as enterprising cultivators of the fertile land along the Tapi and its tributaries.",
  agri: ["Irrigated banana, sugarcane, cotton, papaya and wheat are grown on the plains.", "Farmers here adopted drip irrigation and fruit crops early."],
  ah: ["Buffaloes and cows are kept for milk, and bullocks for farm work."],
  crops: "Banana, sugarcane, papaya, cotton and wheat", animals: "Buffaloes, cows and bullocks", tools: "Bullock ploughs, modern drip systems", festivals: "Pola and Diwali",
  food: "Jowar and wheat bhakri, dal and bharit", knowledge: "Close knowledge of Tapi-valley soils and water.", today: "Groundwater decline and crop price risk." }),

Cm({ key: "lingayat", cat: "farming", icon: "🌻", name: "Lingayat farmers", dev: "लिंगायत शेतकरी", region: "Latur, Dharashiv, Solapur, Nanded, Kolhapur and Sangli",
  overview: "Lingayat families of southern Maharashtra farm the dry black soils of Marathwada and the Solapur plateau and have long been active in the grain and oilseed trade.",
  agri: ["Rabi jowar, safflower, sunflower, gram and tur are grown on stored soil moisture.", "Latur became a national centre of tur-dal processing, linking fields with mills."],
  ah: ["Deoni cattle, bred in the Latur region, are valued for their draught power and milk."],
  crops: "Jowar, tur, gram, safflower, sunflower and soybean", animals: "Deoni cattle, buffaloes and goats", tools: "Bullock ploughs and seed drills", festivals: "Basava Jayanti and Pola",
  food: "Jowar bhakri, shenga (groundnut) chutney and holige", knowledge: "The Vachana poetry of the 12th century reformer Basavanna honours work, including farming, as worship (kayakave kailasa).",
  today: "Recurrent drought in Marathwada and dependence on the soybean price." }),

Cm({ key: "vanjari", cat: "farming", icon: "🐂", name: "Vanjari", dev: "वंजारी", region: "Beed, Ahilyanagar, Jalna, Nashik and Parbhani", status: "NT",
  overview: "The Vanjari community historically traded and carried goods on pack bullocks. Today most are dryland farmers of Marathwada.",
  agri: ["Rain-fed jowar, bajra, cotton and pulses are grown on shallow soils.", "Many families migrate each winter to cut sugarcane in western Maharashtra and Karnataka, returning before the monsoon to sow their own fields."],
  ah: ["Bullock pairs and carts travel with the cane-cutting teams, and goats are kept as savings."],
  crops: "Jowar, bajra, tur and cotton", animals: "Bullocks and goats", tools: "Bullock cart and koyta (cane-cutting knife)", festivals: "Pola and the Bhagwangad pilgrimage",
  food: "Bajra bhakri and thecha", knowledge: "Knowledge of bullock-cart travel and camp life on long seasonal migrations.",
  today: "Seasonal migration disrupts children's schooling and women's health." }),

Cm({ key: "bagban", cat: "farming", icon: "🍈", name: "Bagban", dev: "बागवान", region: "Towns of Marathwada, Vidarbha and western Maharashtra",
  overview: "Bagban means 'gardener' in Persian. This Muslim community has long grown and traded fruit and vegetables.",
  agri: ["Orchards of guava, pomegranate, citrus and mango are tended and their fruit sold in town markets.", "Many families lease orchards for a season and manage the harvest and sale."],
  ah: ["Draught animals and carts were used to carry produce to market."],
  crops: "Guava, pomegranate, mosambi, orange, mango and vegetables", animals: "Bullocks and ponies for carts", tools: "Fruit baskets, ladders and carts",
  festivals: "Eid al-Fitr and Eid al-Adha", food: "Seasonal fruit and vegetables", knowledge: "Knowledge of fruit ripening, grading and marketing.", today: "Competition from large traders and cold-chain companies." }),

Cm({ key: "east-indian", cat: "farming", icon: "🌴", name: "East Indian community", dev: "ईस्ट इंडियन", region: "Vasai, Uttan, Gorai and old Salsette villages",
  overview: "The East Indians are a Christian community of Mumbai's northern coast whose families have farmed, fished and made salt for centuries.",
  agri: ["Vasai's orchards grow bananas, betel vine, vegetables and flowers on sandy coastal soils, watered from wells.", "Salt pans and paddy fields were worked in the coastal villages."],
  ah: ["Poultry and pigs are kept at home, and bullocks once worked the wells."],
  crops: "Banana, betel vine, vegetables, flowers and coconut", animals: "Poultry, pigs and bullocks", tools: "Wells with rahat, garden tools", festivals: "Christmas, village feasts and harvest festivals",
  food: "Bottle masala, fugias, sannas and fish dishes", knowledge: "Home-ground bottle masala recipes passed through generations.", today: "Rapid urbanisation of Vasai–Virar." }),

Cm({ key: "parsi-irani", cat: "farming", icon: "🟤", name: "Parsi and Irani orchardists", dev: "पारशी व इराणी बागायतदार", region: "Dahanu and Gholvad, Palghar",
  overview: "Parsi landowning families of the Dahanu coast are credited with developing the chikoo orchards that made the region famous.",
  agri: ["Chikoo, coconut and mango orchards are grown on sandy loam soils near the sea.", "Dahanu Gholvad chikoo is now GI-registered."],
  ah: ["Dairy animals were kept on estate farms."],
  crops: "Chikoo, coconut and mango", animals: "Dairy cattle", tools: "Orchard tools and wells", festivals: "Navroz and Jamshedi Navroz",
  food: "Dhansak, patra ni machhi and chikoo preserves", knowledge: "Orchard management and fruit marketing.", today: "Rising costs and urban pressure on the coast." }),

/* ============ COASTAL ============ */
Cm({ key: "agri", cat: "coastal", icon: "🧂", name: "Agri", dev: "आगरी", region: "Raigad, Thane, Palghar and the Mumbai coast",
  overview: "The Agri community take their name from agar, the salt pan. They farm rice in the monsoon and made salt in the dry season.",
  agri: ["Kharif paddy is grown in low-lying coastal fields protected by earthen bunds.", "In the dry season, the same families worked salt pans (mithagar), letting in seawater and evaporating it in shallow beds.", "Creek fishing added to the family income."],
  ah: ["Buffaloes supplied milk and ploughed the wet fields, and poultry was kept at home."],
  crops: "Paddy, wal and vegetables", animals: "Buffaloes and poultry", tools: "Salt-pan rakes and wooden levellers", festivals: "Holi, Narali Purnima and Gauri–Ganpati",
  food: "Rice bhakri, fish curry and wal", knowledge: "Precise knowledge of tides and seasons for both salt-making and bund repair.", today: "Salt pans and paddy land have been lost to ports and cities." }),

Cm({ key: "koli", cat: "coastal", icon: "🎣", name: "Koli (coastal fishers)", dev: "कोळी", region: "Konkan coast from Palghar to Sindhudurg",
  overview: "The coastal Koli are Mumbai's original inhabitants and the fisher-folk of the whole Konkan coast.",
  agri: ["Fishing is the main occupation. Fish are dried in the sun (sukat) and salted to last through the monsoon, when boats stay ashore.", "Small plots of paddy and coconut are also kept."],
  ah: ["Few large animals are kept. Dried fish waste has been sold to farmers as manure."],
  crops: "Coconut and paddy", animals: "Poultry", tools: "Boats (hodi), nets and drying racks", festivals: "Narali Purnima, when a coconut is offered to the sea to open the fishing season",
  food: "Fish curry, sukat and rice bhakri", knowledge: "Reading winds, tides and fish shoals, and traditional boat-building.", today: "Coastal development, pollution and declining fish catch." }),

Cm({ key: "bhandari", cat: "coastal", icon: "🥥", name: "Bhandari", dev: "भंडारी", region: "Ratnagiri, Sindhudurg and Raigad",
  overview: "The Bhandari community of the Konkan are traditionally toddy-tappers and orchard keepers.",
  agri: ["Coconut and toddy palms are climbed and tapped for sap.", "Coconut, areca and cashew orchards are managed on laterite slopes."],
  ah: ["Cows and buffaloes supply dung for mulching orchard basins."],
  crops: "Coconut, cashew, areca, kokum and mango", animals: "Cows, buffaloes and poultry", tools: "Tapping knife and climbing rope", festivals: "Shimga and Ganeshotsav",
  food: "Solkadhi and coconut-based curries", knowledge: "Climbing and tapping skills, and orchard knowledge of laterite soils.", today: "Few young people now take up tapping." }),

Cm({ key: "gabit", cat: "coastal", icon: "⛵", name: "Gabit and Daldi fishers", dev: "गाबित व दालदी", region: "Sindhudurg and Ratnagiri coast",
  overview: "The Gabit (Hindu) and Daldi (Muslim) communities fish the southern Konkan coast.",
  agri: ["Coastal fishing with traditional boats and shore seines, supplemented by coconut and cashew."], ah: ["Poultry is kept at home."],
  crops: "Coconut and cashew", animals: "Poultry", tools: "Rampan shore seines and outrigger canoes", festivals: "Narali Purnima and Eid",
  food: "Fish, rice and kokum curry", knowledge: "Knowledge of fishing grounds and seasons along the southern coast.", today: "Mechanised trawlers compete with traditional fishing." }),

/* ============ PASTORAL & NOMADIC ============ */
Cm({ key: "dhangar", cat: "pastoral", icon: "🐑", name: "Dhangar", dev: "धनगर", region: "Western Maharashtra and Marathwada, with routes to the Konkan and Karnataka", status: "NT",
  overview: "The Dhangar are the great shepherds of the Deccan. Subgroups include the Hatkar, who also bred cattle, and the Mendhpal, the sheep-keepers. Their deity Biroba and the god Khandoba are worshipped across the plateau.",
  agri: ["After the harvest, flocks are penned overnight on farmers' fields (mendhya basavne). The farmer pays in grain or cash for the manure and urine, which can double the value of the next crop.", "Many families also farm small dryland plots of bajra and jowar."],
  ah: ["Flocks of Deccani sheep migrate after Diwali along routes remembered over generations, returning with the monsoon.",
    "Hatkar Dhangars also keep Khillari cattle.",
    "Herders treat common ailments with herbs and know every watering point and grazing ground on their routes.",
    "Wool from Deccani sheep is spun and woven into the ghongadi, a coarse blanket that keeps out both rain and cold."],
  crops: "Bajra and jowar", animals: "Deccani sheep, goats, Khillari cattle, dogs and ponies", tools: "Ghongadi, shepherd's staff (kathi) and portable pens (waghur)",
  festivals: "Biroba and Khandoba jatras, and the gaja dance to the dhol", food: "Bajra bhakri, mutton and milk", knowledge: "Route maps held in memory, reading weather on the move, and sheep medicine.",
  today: "Grazing commons are shrinking and conflicts over access are rising. The 21st Livestock Census counted pastoralists for the first time." }),

Cm({ key: "gawli", cat: "pastoral", icon: "🐃", name: "Gawli (Gavli and Nand Gawli)", dev: "गवळी", region: "Vidarbha — Melghat (Amravati), Wardha and Nagpur",
  overview: "The Gawli community are cattle and buffalo keepers who trace their tradition to Krishna and the cowherds of Gokul.",
  agri: ["Cultivation is limited; fodder, grazing and milk are at the heart of the household economy.", "In Melghat, herds move seasonally into forest grazing grounds."],
  ah: ["Gawlis breed the Gaolao cow and the Nagpuri buffalo, and remember herd lineages by name.", "Milk is turned into ghee and khoa for sale, which keeps better than fresh milk in remote areas.", "Bulls are chosen by their lineage and body signs."],
  crops: "Fodder crops and jowar", animals: "Gaolao cattle and Nagpuri buffaloes", tools: "Churns and milk pots", festivals: "Gokulashtami and Pola",
  food: "Milk, ghee and khoa sweets", knowledge: "Selection of breeding animals by lineage and features.", today: "Grazing restrictions in tiger reserves and pressure to crossbreed." }),

Cm({ key: "golla", cat: "pastoral", icon: "🐄", name: "Golla (Gollewar)", dev: "गोल्ला / गोल्लेवार", region: "Nanded, Chandrapur, Gadchiroli and the Telangana border",
  overview: "The Golla are Telugu-speaking herders whose settlements extend into eastern Maharashtra.",
  agri: ["Small-scale farming alongside herding."], ah: ["Cattle, sheep and goats are grazed on common land and forest edges."],
  crops: "Jowar and pulses", animals: "Cattle, sheep and goats", tools: "Herding staff", festivals: "Local jatras and Diwali",
  food: "Jowar roti and milk", knowledge: "Herding knowledge of the Godavari borderlands.", today: "Loss of grazing land." }),

Cm({ key: "banjara", cat: "pastoral", icon: "🧵", name: "Banjara (Lamani)", dev: "बंजारा", region: "Tandas across Washim, Yavatmal, Nanded, Chh. Sambhajinagar and the whole state", status: "VJ",
  overview: "For centuries the Banjara moved grain, salt and supplies across India on huge caravans of pack bullocks, known as tandas. Their settlements are still called tandas today.",
  agri: ["Settled tandas now farm jowar, cotton and pulses.", "Long experience with cattle made many Banjaras skilled cattle traders."],
  ah: ["Banjara herders developed deep knowledge of pack bullocks: their feeding on long journeys, their loads and their care.", "Cattle and goats remain important household assets."],
  crops: "Jowar, cotton and pulses", animals: "Cattle and goats", tools: "Pack saddles and the famous mirror-work bags",
  festivals: "Teej, when young women sprout wheat seedlings in baskets, Holi, and the pilgrimage to Pohradevi in Washim", food: "Dhabadi roti and dal",
  knowledge: "Songs and embroidery record caravan life, routes and trade.", today: "Many tandas are still working to gain revenue-village status and secure land titles." }),

Cm({ key: "nandiwale", cat: "pastoral", icon: "🔔", name: "Nandiwale", dev: "नंदीवाले", region: "Nomadic across the Deccan; settlements in Pune, Satara and Ahilyanagar", status: "NT",
  overview: "The Nandiwale travel from village to village with a decorated bull (Nandi) that 'answers' questions by nodding or shaking its head.",
  agri: ["Traditionally landless; performances were timed to harvest seasons, when villagers could pay in grain."],
  ah: ["Training a bull to respond to voice, touch and rhythm is a subtle skill passed down in families."],
  crops: "—", animals: "Bulls", tools: "Bells, cloth and decorated saddles", festivals: "Harvest-season performances", food: "—",
  knowledge: "Bull training by voice and touch.", today: "Families are seeking settled livelihoods and education." }),

Cm({ key: "pardhi", cat: "pastoral", icon: "🦅", name: "Pardhi", dev: "पारधी", region: "Vidarbha, Marathwada and western Maharashtra", status: "DNT",
  overview: "The Pardhi were once hunters and trappers with remarkable knowledge of birds and wild animals. Branded 'criminal tribes' under a colonial law of 1871, they were denotified in 1952 but still face prejudice.",
  agri: ["Many families now work as farm labourers or farm small plots."], ah: ["Their knowledge of animal behaviour, calls and tracks is deep, and some families keep goats and poultry."],
  crops: "Small plots of jowar", animals: "Goats and poultry", tools: "Traditional snares, now largely abandoned because hunting is illegal", festivals: "Community deity festivals",
  food: "Jowar bhakri", knowledge: "Bird and animal knowledge that could make them valuable partners in wildlife conservation.", today: "Social stigma, landlessness and lack of documents." }),

Cm({ key: "vaidu", cat: "pastoral", icon: "🌿", name: "Vaidu", dev: "वैदू", region: "Nomadic groups across Maharashtra", status: "NT",
  overview: "The Vaidu are travelling herbal healers who collect forest plants and sell remedies in villages and towns.",
  agri: ["Their livelihood depends on gathering medicinal roots, barks and herbs rather than farming."], ah: ["Donkeys once carried their camps from place to place."],
  crops: "Wild medicinal plants", animals: "Donkeys", tools: "Digging sticks and herb bags", festivals: "Community gatherings", food: "—",
  knowledge: "Identification and uses of a large number of medicinal plants. KRISHIVIDYA records this as heritage, not medical advice.", today: "Forest restrictions and loss of plant habitats." }),

/* ============ ADIVASI ============ */
Cm({ key: "warli", cat: "tribal", icon: "🎨", name: "Warli", dev: "वारली", region: "Palghar (Dahanu, Talasari, Jawhar, Mokhada), Thane and Nashik", status: "ST",
  overview: "The Warli are one of Maharashtra's largest Adivasi communities, known worldwide for the paintings in which they record their farming life.",
  agri: ["Rice nurseries are prepared by rab, burning leaves, dung and brushwood on the seed bed before sowing.",
    "Nachni and varai are grown on slopes, and udid and wal after the rice.", "Kitchen gardens and the gathering of wild monsoon greens (ranbhaji) supply food through the rains."],
  ah: ["Bullocks plough the fields, and goats and backyard poultry provide meat and savings.", "Livestock often appear in Warli paintings of harvest and marriage."],
  crops: "Paddy, nachni, varai, udid, wal and forest greens", animals: "Bullocks, goats and poultry", tools: "Light plough, sickle and bamboo baskets",
  festivals: "Worship of Kansari, the goddess of grain, and the tarpa dance at harvest", food: "Nachni bhakri and ranbhaji",
  knowledge: "Warli paintings, made with rice paste on mud walls, record sowing, harvest and village life. The art form is GI-registered.", today: "Loss of land and pressure from urban expansion around Mumbai." }),

Cm({ key: "kokna", cat: "tribal", icon: "⛰️", name: "Kokna (Kokani)", dev: "कोकणा", region: "Nashik (Surgana, Kalwan, Peth), Dhule, Nandurbar and Palghar", status: "ST",
  overview: "The Kokna farm the hills of northern Sahyadri, where rain is heavy and slopes are steep.",
  agri: ["Paddy nurseries are prepared with rab, and hill paddy grows in terraced plots.", "Nachni and varai are sown on the steeper slopes.", "Bamboo and forest produce supplement farm income."],
  ah: ["Bullocks, goats and poultry are kept, and Dangi cattle are found in parts of their area."],
  crops: "Paddy, nachni, varai and pulses", animals: "Dangi cattle, goats and poultry", tools: "Hill plough and bamboo baskets", festivals: "Harvest festivals and Holi",
  food: "Nachni bhakri and varai rice", knowledge: "Seeds of local hill millets and rice varieties.", today: "Seasonal migration for farm labour." }),

Cm({ key: "mahadev-koli", cat: "tribal", icon: "🌾", name: "Mahadev Koli", dev: "महादेव कोळी", region: "Akole (Ahilyanagar), Junnar and Ambegaon (Pune), Igatpuri (Nashik)", status: "ST",
  overview: "The Mahadev Koli farm the high Sahyadri around Kalsubai, Maharashtra's highest peak. Their seed-saving tradition has become famous across India.",
  agri: ["Terraced hill paddy is grown in many local varieties, each suited to a particular slope or soil.",
    "After the rice, nachni, varai, sava and kulith are grown.", "Seed is saved and exchanged between households, and women are its main keepers."],
  ah: ["Dangi cattle, adapted to very heavy rain and hill grazing, are the main draught animals.", "Goats and poultry are kept by most families."],
  crops: "Landrace paddy, nachni, varai, sava, kulith and wal", animals: "Dangi cattle, goats and poultry", tools: "Hill plough, sickle and bamboo seed baskets",
  festivals: "Worship of Kalsubai and harvest festivals", food: "Nachni bhakri and kulith pithla",
  knowledge: "Rahibai Soma Popere of Kombhalne, known as the 'Seed Mother', built a community seed bank of local varieties and received the Padma Shri in 2020.", today: "Hybrid seed is replacing landraces." }),

Cm({ key: "malhar-koli", cat: "tribal", icon: "🌧️", name: "Malhar Koli and Tokre Koli", dev: "मल्हार कोळी व टोकरे कोळी", region: "Thane, Palghar, Pune, Nashik and Dhule hills", status: "ST",
  overview: "These Koli Adivasi groups farm the hills of the northern Sahyadri. The Tokre Koli are also known for bamboo craft.",
  agri: ["Paddy, nachni and varai are grown on hill slopes using rab nurseries.", "Forest produce and wage work supplement farming."],
  ah: ["Small herds of cattle and goats, and poultry."],
  crops: "Paddy, nachni and varai", animals: "Cattle, goats and poultry", tools: "Bamboo baskets and mats", festivals: "Holi and harvest festivals",
  food: "Nachni bhakri", knowledge: "Bamboo weaving for farm baskets and storage.", today: "Small holdings and limited irrigation." }),

Cm({ key: "thakar", cat: "tribal", icon: "🍯", name: "Thakar (Ka Thakur and Ma Thakur)", dev: "ठाकर", region: "Raigad (Karjat, Khalapur), Thane, Pune and Nashik", status: "ST",
  overview: "The Thakar live on the forested slopes of the Sahyadri and combine farming with gathering.",
  agri: ["Nachni, varai and paddy are grown on hill slopes.", "Forest foods, honey and firewood are gathered through the year."],
  ah: ["Small herds of goats and cattle, and poultry."],
  crops: "Nachni, varai and paddy", animals: "Goats, cattle and poultry", tools: "Axe, sickle and honey-collecting tools", festivals: "Harvest festivals and Holi",
  food: "Nachni bhakri and ranbhaji", knowledge: "Knowledge of Sahyadri plants and honey collection.", today: "Limited land titles and migration for wage work." }),

Cm({ key: "katkari", cat: "tribal", icon: "🦀", name: "Katkari (Kathodi)", dev: "कातकरी", region: "Raigad, Thane, Palghar, Pune and Ratnagiri", status: "PVTG",
  overview: "The Katkari are named after katha (catechu), the extract they once prepared from the khair tree. They are one of Maharashtra's three Particularly Vulnerable Tribal Groups.",
  agri: ["Few Katkari families own farmland. Fishing and crab-catching in rivers and creeks, forest gathering and seasonal work provide most of their living."],
  ah: ["Poultry and goats are kept, and families have a detailed knowledge of wild animals and river life."],
  crops: "Small paddy plots", animals: "Poultry and goats", tools: "Fish traps and nets", festivals: "Holi and worship of Waghoba, the tiger deity",
  food: "Fish, crab and forest greens", knowledge: "Knowledge of forest trees and of catching fish and crabs.", today: "Landlessness and seasonal migration to brick kilns." }),

Cm({ key: "bhil", cat: "tribal", icon: "🌽", name: "Bhil", dev: "भिल्ल", region: "Nandurbar, Dhule, Jalgaon and Nashik — the Satpuda and Sahyadri foothills", status: "ST",
  overview: "The Bhil are one of India's largest Adivasi peoples. In Maharashtra they live mainly in the Satpuda hills of Khandesh.",
  agri: ["Maize, jowar, tur, groundnut and small millets are grown together on rain-fed slopes.", "Seed is kept in bamboo and mud bins in the home."],
  ah: ["Goats, cattle and backyard poultry are kept as savings and for rituals."],
  crops: "Maize, jowar, tur, groundnut and small millets", animals: "Goats, cattle and poultry", tools: "Plough, hoe, bow and arrow (historically)", festivals: "Holi and the Bhongarya haat",
  food: "Maize and jowar bhakri", knowledge: "Oral epics, songs and knowledge of forest medicine.", today: "Soil erosion on slopes and migration for wage work." }),

Cm({ key: "tadvi", cat: "tribal", icon: "🌳", name: "Tadvi Bhil", dev: "तडवी भिल्ल", region: "Yawal and Raver (Jalgaon), and the Satpuda foothills", status: "ST",
  overview: "The Tadvi are a Bhil community, most of whom follow Islam, living along the southern foothills of the Satpuda.",
  agri: ["Jowar, maize, cotton and banana are grown on the foothill soils.", "Forest produce was once an important income."],
  ah: ["Goats, cattle and poultry are kept."],
  crops: "Jowar, maize, cotton and banana", animals: "Goats, cattle and poultry", tools: "Bullock ploughs", festivals: "Eid and Holi-season gatherings",
  food: "Jowar bhakri", knowledge: "A blend of Bhil and Islamic customs.", today: "Small holdings and forest restrictions." }),

Cm({ key: "pawara", cat: "tribal", icon: "🔥", name: "Pawara", dev: "पावरा", region: "Satpuda — Akrani and Akkalkuwa (Nandurbar), Shirpur (Dhule)", status: "ST",
  overview: "The Pawara farm the remote Satpuda hills of Nandurbar and are known for their Holi celebrations.",
  agri: ["Maize, jowar, rice and pulses are grown on terraces held up with stone bunds."], ah: ["Goats and cattle graze in the forest, and poultry is kept at home."],
  crops: "Maize, jowar, rice and pulses", animals: "Goats, cattle and poultry", tools: "Hoe and plough", festivals: "The Rajwadi Holi at Kathi and the Bhongarya markets",
  food: "Maize bhakri", knowledge: "Holi and Bhongarya mark the end of harvest and are occasions to arrange marriages and trade.", today: "Remote villages with limited irrigation and services." }),

Cm({ key: "gavit", cat: "tribal", icon: "🫘", name: "Gavit (Gamit)", dev: "गावित", region: "Navapur taluka (Nandurbar) and the Gujarat border", status: "ST",
  overview: "The Gavit farm the forested plateau around Navapur, a region known for its tur.",
  agri: ["Tur, rice, maize and nachni are grown.", "Navapur tur, prized for the flavour of its dal, is now GI-registered."],
  ah: ["Cattle, goats and poultry are kept."],
  crops: "Tur, rice, maize and nachni", animals: "Cattle, goats and poultry", tools: "Bullock ploughs", festivals: "Holi and harvest festivals",
  food: "Tur dal and rice", knowledge: "Local tur seed maintained by farmers.", today: "Market access for their distinctive produce." }),

Cm({ key: "dhodia", cat: "tribal", icon: "🌿", name: "Dhodia and Dubla", dev: "धोडिया व दुबळा", region: "Talasari and Dahanu (Palghar), along the Gujarat border", status: "ST",
  overview: "These communities live on the coastal plain of northern Palghar.",
  agri: ["Paddy, nachni and vegetables are grown, and many families work in orchards."], ah: ["Cattle, goats and poultry are kept."],
  crops: "Paddy, nachni and vegetables", animals: "Cattle, goats and poultry", tools: "Plough and sickle", festivals: "Holi and harvest festivals",
  food: "Rice and nachni", knowledge: "Knowledge of coastal plain farming.", today: "Many work as labourers in orchards they do not own." }),

Cm({ key: "gond", cat: "tribal", icon: "🌸", name: "Gond (Raj Gond)", dev: "गोंड", region: "Gadchiroli, Chandrapur, Yavatmal, Nanded, Gondia and Nagpur", status: "ST",
  overview: "The Gond are the largest Adivasi people of central India. Gond kingdoms once ruled Chanda (Chandrapur) and Deogad near Nagpur.",
  agri: ["Paddy is grown in the valleys, and jowar and small millets such as kodo and kutki on the uplands.",
    "Collecting mahua flowers in spring and tendu leaves in summer provides a large share of household income."],
  ah: ["Cattle, goats, pigs and poultry are kept, and animals are central to rituals and feasts."],
  crops: "Paddy, jowar, kodo, kutki and mahua", animals: "Cattle, goats, pigs and poultry", tools: "Plough, hoe and bamboo baskets",
  festivals: "Dandar and Gussadi dances at Diwali, and Pola", food: "Mahua and millet gruel (pej)",
  knowledge: "Pardhan bards keep Gond genealogies and songs.", today: "Recognition of forest rights and fair prices for forest produce." }),

Cm({ key: "madia", cat: "tribal", icon: "🐖", name: "Madia Gond", dev: "माडिया गोंड", region: "Bhamragad, Etapalli and Aheri (Gadchiroli)", status: "PVTG",
  overview: "The Madia Gond live in the dense forests of southern Gadchiroli and are one of Maharashtra's three Particularly Vulnerable Tribal Groups.",
  agri: ["Forest paddy and small millets are grown. Penda, a form of shifting cultivation on hill slopes, was practised in the past.", "Mahua, tamarind and other forest foods are gathered."],
  ah: ["Pigs and poultry are the most common animals. Gadchiroli has 15.7% of Maharashtra's pigs."],
  crops: "Paddy, millets, mahua and tamarind", animals: "Pigs, poultry and cattle", tools: "Axe, hoe and fish traps", festivals: "Harvest dances and ghotul traditions",
  food: "Rice, millet gruel and forest foods", knowledge: "Community decision-making over forests and deep knowledge of forest foods.", today: "Remoteness, conflict and limited public services." }),

Cm({ key: "kolam", cat: "tribal", icon: "🎋", name: "Kolam", dev: "कोलाम", region: "Yavatmal, Nanded (Kinwat) and Chandrapur", status: "PVTG",
  overview: "The Kolam speak their own language, Kolami, and are one of Maharashtra's three Particularly Vulnerable Tribal Groups.",
  agri: ["Cultivation with hoes on hill slopes was once common. Today jowar, tur, beans and cotton are grown.", "Bamboo baskets are made for farm use and sale."],
  ah: ["Goats and poultry are kept, with a few cattle."],
  crops: "Jowar, tur, beans and cotton", animals: "Goats and poultry", tools: "Hoe and bamboo baskets", festivals: "Dandari at Diwali, shared with the Gonds",
  food: "Jowar ambil and beans", knowledge: "The Kolami language holds names for local crop varieties.", today: "Among the most marginalised groups; exposed to cotton price risk." }),

Cm({ key: "korku", cat: "tribal", icon: "🌲", name: "Korku", dev: "कोरकू", region: "Melghat — Dharni and Chikhaldara (Amravati)", status: "ST",
  overview: "The Korku speak a Munda language and live in the Melghat forests of the Satpuda.",
  agri: ["Jowar, maize, kodo and kutki are grown on fields at the forest edge.", "Forest produce is gathered for food and sale."],
  ah: ["Cattle and goats graze in the forests, and poultry is kept at home."],
  crops: "Jowar, maize, kodo and kutki", animals: "Cattle, goats and poultry", tools: "Plough and hoe", festivals: "Holi and harvest rites",
  food: "Millet gruel and maize roti", knowledge: "The Korku language holds an ecological vocabulary of Melghat.", today: "Restrictions in the tiger reserve and child malnutrition in Melghat." }),

Cm({ key: "halba", cat: "tribal", icon: "🌾", name: "Halba", dev: "हलबा", region: "Gadchiroli, Gondia, Bhandara and Nagpur", status: "ST",
  overview: "The Halba are settled farmers of eastern Vidarbha, near the Chhattisgarh border.",
  agri: ["Paddy is grown with water from village tanks, and pulses are sown on the rice fallows."], ah: ["Cattle, buffaloes and poultry are kept."],
  crops: "Paddy, lakhori and pulses", animals: "Cattle, buffaloes and poultry", tools: "Plough and sickle", festivals: "Pola and Diwali",
  food: "Rice and pej", knowledge: "Tank irrigation and rice-fallow cropping.", today: "Small holdings and dependence on the monsoon." }),

Cm({ key: "andh", cat: "tribal", icon: "🐂", name: "Andh", dev: "आंध", region: "Hingoli, Nanded, Parbhani and Washim", status: "ST",
  overview: "The Andh are settled farmers of the Marathwada plains.",
  agri: ["Jowar, cotton, soybean and pulses are grown on the black soils."], ah: ["Bullocks, cows and goats are kept, as in other Marathwada households."],
  crops: "Jowar, cotton, soybean and tur", animals: "Bullocks, cows and goats", tools: "Bullock plough and seed drill", festivals: "Pola and Dasara",
  food: "Jowar bhakri", knowledge: "Their own songs and oral customs.", today: "Small holdings and rain-fed risk." }),

Cm({ key: "pardhan", cat: "tribal", icon: "🎻", name: "Pardhan", dev: "परधान", region: "With Gond communities in Chandrapur, Gadchiroli, Yavatmal and Nagpur", status: "ST",
  overview: "The Pardhan are the bards of the Gond. Playing the bana fiddle, they sing Gond genealogies and the stories of their origin.",
  agri: ["Small-scale farming and farm labour. Traditionally, Gond patrons supported them with grain."], ah: ["Goats and poultry are kept."],
  crops: "Jowar and paddy", animals: "Goats and poultry", tools: "The bana fiddle", festivals: "Gond festivals and recitations", food: "—",
  knowledge: "A living oral archive of Gond history.", today: "The patronage system has weakened, and the repertoire is at risk." }),

/* ============ ARTISANS & SERVICE ============ */
Cm({ key: "balutedari", cat: "artisan", icon: "🏘️", name: "The Balutedari system", dev: "बलुतेदारी", region: "Historic villages of the Deccan",
  overview: "In the old Deccan village, twelve hereditary service families, the balutedars, kept farming running. Instead of cash, each received a share of grain (baluta) at the threshing floor (khale) after every harvest.",
  agri: ["The carpenter made the plough and cart, the blacksmith the ploughshare and sickle, the potter the storage jars, the leather worker the mot and harness, and the rope maker the ropes.", "The village depended on this web of skills to farm."],
  ah: ["Leather workers dealt with the carcasses and hides of dead cattle, and the carpenter and blacksmith maintained every bullock-drawn implement."],
  crops: "Grain shares of jowar, bajra and wheat", animals: "Bullocks (served through their tools)", tools: "Every farm implement of the village", festivals: "Khale puja at the threshing floor",
  food: "—", knowledge: "A non-cash economy of mutual obligation recorded in village records and folklore.",
  today: "The system had largely dissolved by the late 20th century. It also carried caste hierarchy and discrimination, and should be remembered critically." }),

Cm({ key: "sutar-lohar", cat: "artisan", icon: "🪓", name: "Sutar and Lohar (carpenters and blacksmiths)", dev: "सुतार व लोहार", region: "Every farming village",
  overview: "Carpenters and blacksmiths made and repaired the tools of farming.",
  agri: ["Sutars built wooden ploughs, harrows, seed drills, yokes and bullock carts.", "Lohars forged ploughshares, sickles, axes and the iron rims of cart wheels."],
  ah: ["Yokes and harnesses were shaped to fit each bullock pair's neck and gait."],
  crops: "Tool woods such as babhul, teak and shisham", animals: "Bullocks", tools: "Adze, chisel, anvil and bellows", festivals: "Vishwakarma Puja", food: "—",
  knowledge: "Tool proportions matched to local soils: lighter for red soils and heavier for black.", today: "Factory-made implements and tractors have replaced hand-made tools." }),

Cm({ key: "kumbhar", cat: "artisan", icon: "🏺", name: "Kumbhar (potters)", dev: "कुंभार", region: "Across Maharashtra",
  overview: "Potters supplied villages with the clay vessels that stored seed, grain and water.",
  agri: ["Large clay jars (ranjan) stored grain and seed, often layered with neem leaves or ash.", "Water pots, roof tiles and cooking vessels were made for every household."],
  ah: ["Donkeys carried clay and finished pots."],
  crops: "—", animals: "Donkeys", tools: "Potter's wheel and kiln", festivals: "Pola, when clay bullocks are made, and Ganeshotsav, when clay idols are shaped", food: "—",
  knowledge: "Clay figures of bullocks are made for Pola and as children's toys.", today: "Maharashtra's donkeys fell by 39.7% between 2012 and 2019, and plastic has replaced clay." }),

Cm({ key: "charmakar", cat: "artisan", icon: "🥾", name: "Charmakar and Dhor (leather workers)", dev: "चर्मकार व ढोर", region: "Across Maharashtra; Kolhapur is famous for its footwear",
  overview: "Leather workers made the equipment that bullock farming depended on.",
  agri: ["They made the leather mot bucket for well irrigation, yoke straps, whips and water bags."],
  ah: ["By tanning the hides of dead cattle and buffaloes, they recycled animal value within the village."],
  crops: "—", animals: "Hides of cattle and buffaloes", tools: "Awls and tanning pits", festivals: "Sant Ravidas Jayanti", food: "—",
  knowledge: "Kolhapuri chappals are GI-registered.", today: "Mot irrigation has disappeared, and the community faced deep social discrimination." }),

Cm({ key: "mahar-matang", cat: "artisan", icon: "🥁", name: "Mahar and Matang communities", dev: "महार व मातंग", region: "Across Maharashtra",
  overview: "In the old village system, Mahar families served as watchmen, messengers and keepers of boundaries, and Matang families made ropes and brooms and played music at festivals. Both received small watan lands and grain shares, but faced untouchability.",
  agri: ["Many worked as agricultural labourers and small farmers.", "Matang rope-makers supplied ropes for wells, carts and cattle."],
  ah: ["They often handled dead cattle, a role imposed on them under the caste order."],
  crops: "Jowar and bajra on small holdings", animals: "Goats and poultry", tools: "Rope-making tools and the halgi drum", festivals: "Dhamma Chakra Pravartan Din and Ambedkar Jayanti",
  food: "Jowar bhakri", knowledge: "Many Mahar families converted to Buddhism with Dr. B. R. Ambedkar in 1956, and campaigns for land rights reshaped rural Maharashtra.",
  today: "Landlessness remains a serious concern; this history of inequality is part of agrarian heritage." }),

Cm({ key: "teli", cat: "artisan", icon: "🛢️", name: "Teli (oil pressers)", dev: "तेली", region: "Across Maharashtra",
  overview: "Oil pressers turned village oilseeds into cooking and lamp oil.",
  agri: ["Groundnut, sesame, safflower and niger were pressed in a wooden ghani turned by a bullock.", "The leftover oilcake went back to farmers as cattle feed."],
  ah: ["A blindfolded bullock walked in circles around the ghani for hours."],
  crops: "Groundnut, sesame, safflower and niger", animals: "Bullocks", tools: "Wooden ghani", festivals: "Sant Santaji Jagnade Jayanti", food: "Cold-pressed oils",
  knowledge: "Lakdi ghana (wood-pressed) oil is enjoying a revival.", today: "Groundnut area has fallen by 77% since 1960-61." }),

Cm({ key: "bene-israel", cat: "artisan", icon: "🕯️", name: "Bene Israel", dev: "बेने इस्रायल", region: "Konkan villages of Raigad, now mostly in Thane and Mumbai",
  overview: "The Bene Israel are an ancient Jewish community of the Konkan. Because they rested on the Sabbath, they were known as Shanivar Teli, the 'Saturday oil-pressers'.",
  agri: ["Families pressed coconut and sesame oil in Konkan villages and also farmed."], ah: ["Bullocks turned the oil presses."],
  crops: "Coconut and sesame", animals: "Bullocks", tools: "Oil press", festivals: "Sabbath and Jewish festivals, and the malida ceremony",
  food: "Malida (sweetened poha with fruit) and fish dishes", knowledge: "A community that preserved its identity while adopting Konkan ways of life.", today: "Most families have migrated to cities or to Israel." }),

Cm({ key: "weavers", cat: "artisan", icon: "🧶", name: "Sali, Koshti, Momin and Pinjari (cotton workers)", dev: "साळी, कोष्टी, मोमीन व पिंजारी", region: "Solapur, Bhiwandi, Malegaon, Paithan, Nagpur and Vidarbha",
  overview: "Maharashtra's cotton passed from field to cloth through these communities of carders and weavers.",
  agri: ["Pinjaris cleaned and fluffed raw cotton with a bow-string tool.", "Sali, Koshti and Momin weavers turned the yarn into saris, dhotis and blankets, including the famous Paithani silk saris."],
  ah: ["Wool from Deccani sheep was also woven into ghongadi blankets by weavers in shepherd villages."],
  crops: "Cotton", animals: "Sheep (wool)", tools: "Carding bow, spinning wheel and handloom", festivals: "Local deity festivals and Eid", food: "—",
  knowledge: "Paithani saris of Paithan and Yeola, and Solapur chaddars, are GI-registered.", today: "Power looms have displaced many handloom weavers." }),

Cm({ key: "kaikadi", cat: "artisan", icon: "🧺", name: "Kaikadi and Burud (bamboo workers)", dev: "कैकाडी व बुरुड", region: "Across Maharashtra", status: "VJ",
  overview: "Bamboo workers made the baskets and trays used at every stage of the harvest.",
  agri: ["They wove winnowing trays (sup), baskets (topli and dalli), grain bins and mats."], ah: ["Donkeys and ponies once carried their goods between villages."],
  crops: "Bamboo and date-palm leaves", animals: "Donkeys", tools: "Bamboo knives and splitting tools", festivals: "Village jatras", food: "—",
  knowledge: "The weave of each basket was matched to the size of the grain it would hold.", today: "Plastic has replaced much of their craft." }),

Cm({ key: "vadar", cat: "artisan", icon: "🪨", name: "Vadar (stone workers)", dev: "वडार", region: "Across Maharashtra", status: "VJ",
  overview: "Stone workers built the wells and bunds of the countryside and carved the grindstones of every home.",
  agri: ["They carved the jate (hand mill), pata-varvanta (grinding stone) and stone troughs, and built wells, bunds and field walls."],
  ah: ["They made stone water troughs for cattle at wells and village squares."],
  crops: "—", animals: "Cattle (troughs)", tools: "Chisels and hammers", festivals: "Village jatras", food: "—",
  knowledge: "The grindstones they carved are the instruments behind women's ovi songs.", today: "Hand-grinding has almost disappeared." }),

Cm({ key: "dhiwar", cat: "artisan", icon: "🐟", name: "Dhiwar (Dhimar) and Bhoi", dev: "ढिवर व भोई", region: "Tanks and rivers of Vidarbha",
  overview: "These fishing communities work the tanks and rivers of eastern Vidarbha.",
  agri: ["They grow water chestnut (singhada) in tanks and fish village waters.", "Many Dhiwar families rear tasar silkworms on forest trees."],
  ah: ["Fish in malgujari tanks are managed through fishing co-operatives."],
  crops: "Water chestnut", animals: "Fish and tasar silkworms", tools: "Nets, boats and fish traps", festivals: "Local deity festivals", food: "Fish and rice",
  knowledge: "Knowledge of tank fisheries and tasar rearing.", today: "Competition over tank leases and declining tank health." }),

/* ============ PERFORMERS ============ */
Cm({ key: "parit", cat: "artisan", icon: "🧺", name: "Parit (washermen)", dev: "परीट", region: "Across Maharashtra",
  overview: "The Parit community washed the village's clothes at the river, stream or well and were among the twelve balutedars paid in grain at harvest.",
  agri: ["Payment came as a share of grain from each household after the harvest, which tied their work to the farming year.", "Many families also cultivated small plots."],
  ah: ["Donkeys carried bundles of clothes to the water and back."],
  crops: "Grain shares of jowar and bajra", animals: "Donkeys", tools: "Washing stone, cauldron and wooden beater", festivals: "Village jatras and Diwali",
  food: "Jowar bhakri", knowledge: "Knowledge of plant-based soaps, ash lye and river stones for cleaning.", today: "Machines and detergents have replaced the work, and donkey numbers have fallen sharply." }),

Cm({ key: "nhavi", cat: "artisan", icon: "✂️", name: "Nhavi (barbers)", dev: "न्हावी", region: "Across Maharashtra",
  overview: "The village barber was a balutedar who also carried messages, assisted at weddings and funerals, and in many villages performed minor surgery and tended wounds.",
  agri: ["Grain shares from each farming household paid for the year's service.", "Families often farmed small plots alongside."],
  ah: ["Barbers commonly trimmed and treated livestock too, and some were called to tend wounded bullocks."],
  crops: "Grain shares", animals: "Bullocks (care)", tools: "Razor, scissors and leather case", festivals: "Weddings and village festivals",
  food: "Jowar bhakri", knowledge: "Herbal wound dressings and the etiquette of village ceremonies.", today: "Now largely a cash trade in towns and villages alike." }),

Cm({ key: "gurav", cat: "artisan", icon: "🌺", name: "Gurav", dev: "गुरव", region: "Western Maharashtra and Konkan",
  overview: "Guravs look after village temples, supply flowers and bel leaves for worship, and play the sambal and other instruments at festivals.",
  agri: ["Flowers, bel and tulsi are grown for temple use, and many families farm as well.", "Temple lands (devasthan inam) were cultivated in some villages."],
  ah: ["Cows kept for milk used in temple offerings."],
  crops: "Flowers, bel, tulsi and food crops", animals: "Cows", tools: "Sambal drum, flower baskets", festivals: "All temple festivals, Navratri and jatras",
  food: "Prasad preparations", knowledge: "Which plant belongs to which deity and season, and the music of the village calendar.", today: "Temple patronage has weakened, and many have moved to other work." }),

Cm({ key: "mangela", cat: "coastal", icon: "🐠", name: "Mangela", dev: "मांगेला", region: "Palghar and Thane coast",
  overview: "The Mangela are a fishing community of the northern Konkan coast, known for dol net fishing and for drying and trading fish.",
  agri: ["Small coastal plots of paddy and vegetables, and coconut near the homestead."],
  ah: ["Poultry is kept at home; dried fish waste is sold to farmers as manure."],
  crops: "Paddy, coconut and vegetables", animals: "Poultry", tools: "Dol nets, boats and drying racks", festivals: "Narali Purnima and Holi",
  food: "Bombil (Bombay duck), dried fish and rice", knowledge: "Reading tides and currents for setting dol nets in the right channel.", today: "Trawlers, pollution and coastal projects have reduced the catch." }),

Cm({ key: "vasudev", cat: "performer", icon: "🎶", name: "Vasudev, Gondhali and Bharadi", dev: "वासुदेव, गोंधळी व भराडी", region: "Across Maharashtra", status: "NT",
  overview: "These folk performers follow the farming calendar. The Vasudev, wearing a peacock-feather crown, sings devotional songs at dawn during the harvest season and receives grain in return.",
  agri: ["Their visits are timed to harvest, when households can give grain."], ah: ["—"],
  crops: "—", animals: "—", tools: "Chiplya (clappers), tuntuna (single-string instrument) and sambal drum",
  festivals: "Gondhal rituals at weddings and Navratri", food: "—", knowledge: "Songs that carry moral teachings, saints' verses and local history.", today: "Fewer families continue the tradition." })
];

/* KRISHIVIDYA — verified Maharashtra datasets carried over from the previous build.
   Sources: 20th Livestock Census 2019 (Maharashtra); Economic Survey of Maharashtra 2025-26; ICAR-NBAGR registers; peer-reviewed papers listed in SOURCES. */

const ALL_MH = D("All Maharashtra", "संपूर्ण महाराष्ट्र");

const FARM_FAMILIES = D("Farming families", "शेतकरी कुटुंबे");

const SOURCES = {
  lc2019: { label: "Report on 20th Livestock Census 2019 — Maharashtra State, Commissionerate of Animal Husbandry, Pune", url: "https://cdnbbsr.s3waas.gov.in/s369dafe8b58066478aea48f3d0f384820/uploads/2024/02/202402131737819886.pdf" },
  esm2526: { label: "Economic Survey of Maharashtra 2025-26, Directorate of Economics & Statistics (tabled 5 March 2026)", url: "https://mls.org.in/PDF2026/budjet/ESM_25_26_Eng%20Book.pdf" },
  pib2019: { label: "PIB — 20th Livestock Census key results (DAHD, GoI)", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1588304" },
  lc21: { label: "DAHD — 21st Livestock Census brochure", url: "https://dahd.gov.in/sites/default/files/2024-10/BrochureOf21stLivestockCensus.pdf" },
  icar2022: { label: "ICAR — Ten new breeds registered by ICAR-NBAGR (Kathani, Purnathadi)", url: "https://icar.org.in/en/ten-new-breeds-indigenous-farm-animals-registered-icar-nbagr" },
  nbagrCattle: { label: "ICAR-NBAGR — Registered breeds of cattle", url: "https://nbagr.icar.gov.in/en/registered-cattle/" },
  nbagrBuffalo: { label: "ICAR-NBAGR — Registered breeds of buffalo", url: "https://nbagr.icar.gov.in/en/registered-buffalo/" },
  bkap: { label: "Phenotypic Description of the Native Cattle Found in Maharashtra State: A Review — Bhartiya Krishi Anusandhan Patrika", url: "https://arccjournals.com/journal/bhartiya-krishi-anusandhan-patrika/BKAP665" },
  angr: { label: "Status of AnGR of Maharashtra: A review (2024)", url: "https://www.researchgate.net/publication/384835604_Status_of_AnGR_of_Maharashtra_in_19_th_century_A_review" },
  wikiKhillari: { label: "Khillari cattle — Wikipedia (citing FAO & Oklahoma State breed data)", url: "https://en.wikipedia.org/wiki/Khillari_cattle" },
  wikiDeoni: { label: "Deoni cattle — Wikipedia (citing FAO DAD-IS)", url: "https://en.wikipedia.org/wiki/Deoni_cattle" },
  wikiPandharpuri: { label: "Pandharpuri buffalo — Wikipedia (citing CIRB)", url: "https://en.wikipedia.org/wiki/Pandharpuri_buffalo" },
  wikiNagpuri: { label: "Nagpuri buffalo — Wikipedia", url: "https://en.wikipedia.org/wiki/Nagpuri_(buffalo)" },
  shahi: { label: "Phenotypic characterization of Shahi strain of Nagpuri buffaloes, Chandrapur district", url: "https://core.ac.uk/works/11592085" },
  osm2021: { label: "Rathod & Dixit (2021), Osmanabadi goats under semi-intensive rearing, Indian J. Animal Sciences 91(6)", url: "https://doi.org/10.56093/ijans.v91i6.115455" },
  osm2019: { label: "Bandewad et al. (2019), Concentrate to roughage ratio in Osmanabadi kids, Marathwada, Indian J. Animal Sciences 89(12)", url: "https://doi.org/10.56093/ijans.v89i12.96648" },
  trend2025: { label: "Trends and instability of livestock & poultry in Maharashtra (Springer Nature, 2025)", url: "https://link.springer.com/article/10.1007/s44279-025-00209-4" },
  policy2024: { label: "Livestock breeding policy: implementation and constraints in Maharashtra (Int. J. Vet. Sci. & Animal Husbandry, 2024)", url: "https://www.veterinarypaper.com/pdf/2024/vol9issue1S/PartI/S-9-1-50-152.pdf" },
  polaTour: { label: "Maharashtra Tourism — Bail Pola", url: "https://maharashtratourism.gov.in/festivals/bail-pola/" },
  polaVS: { label: "Village Square — Bail Pola: when the bullocks take a holiday (2026)", url: "https://villagesquare.in/when-the-bullocks-take-a-holiday-maharashtra-bullock-festival-bail-pola/" },
  wari: { label: "Pandharpur Wari — Wikipedia", url: "https://en.wikipedia.org/wiki/Pandharpur_Wari" },
  warli: { label: "Warli painting — Wikipedia", url: "https://en.wikipedia.org/wiki/Warli_painting" }
};

const ICAR_REG = D("ICAR-NBAGR registered breed", "ICAR-NBAGR नोंदणीकृत जात");

const livestockBreeds = [
  { id: "KV-B001", key: "khillari", type: "cattle", status: "registered", art: ["🐂", "earth", ["🌾", "🏁"]], name: D("Khillari (Khillar)", "खिल्लार"), region: D("Satara, Sangli, Solapur, Kolhapur (and Vijayapura, Dharwad, Belagavi in Karnataka)", "सातारा, सांगली, सोलापूर, कोल्हापूर (व कर्नाटकातील विजापूर, धारवाड, बेळगाव)"), purpose: T("Draught — fast, hardy bullocks for dryland ploughing, carting and Shankarpat races", "शेतीकाम — कोरडवाहू नांगरणी, गाडी व शंकरपटासाठी वेगवान काटक बैल", "कृषि कार्य — शुष्क भूमि जुताई, गाड़ी व शंकरपट हेतु तेज़ कठोर बैल"), community: D("Deccan farmers; Dhangar herders", "दख्खनचे शेतकरी; धनगर"), traits: T("Compact, tight-skinned, 350–450 kg; greyish-white coat with long backward-curving horns. The name comes from 'khillar', a herd of cattle.", "आटोपशीर, घट्ट त्वचा, ३५०–४५० किलो; राखाडी-पांढरा रंग व मागे वळलेली लांब शिंगे. 'खिल्लार' म्हणजे गुरांचा कळप.", "सुगठित, कसी त्वचा, 350–450 किग्रा; धूसर-सफ़ेद रंग व पीछे मुड़े लंबे सींग। 'खिल्लार' अर्थात मवेशियों का झुंड।"), strains: D("Atpadi, Mhasvad, Nakali, Tapti, Dhangari, Hanam", "आटपाडी, म्हसवड, नकली, तापी, धनगरी, हणम"), facts: T("Breed in decline mainly because of low milk yield; Maharashtra's indigenous & non-descript cattle fell 20.7% between the 2012 and 2019 censuses.", "कमी दुधामुळे जातीची घट; २०१२ ते २०१९ दरम्यान राज्यातील देशी व अवर्णित गोवंश २०.७% ने घटला.", "कम दूध के कारण नस्ल में गिरावट; 2012 से 2019 के बीच राज्य का देशी व अवर्णित गोवंश 20.7% घटा।"), src: ["wikiKhillari", "angr", "lc2019"] },
  { id: "KV-B002", key: "deoni", type: "cattle", status: "registered", art: ["🐄", "field", ["🥛", "🌾"]], name: D("Deoni", "देवणी"), region: D("Latur (Deoni taluka), Nanded, Dharashiv, Parbhani; Bidar (Karnataka)", "लातूर (देवणी तालुका), नांदेड, धाराशिव, परभणी; बिदर (कर्नाटक)"), purpose: T("Dual purpose — milk and draught", "दुहेरी उपयोग — दूध व शेतीकाम", "दोहरा उपयोग — दूध व कृषि कार्य"), community: D("Marathwada farmers", "मराठवाड्यातील शेतकरी"), traits: T("Bulls about 590 kg and 135–140 cm; cows about 295 kg. Spotted black-and-white coat, drooping ears, docile.", "बैल सुमारे ५९० किलो व १३५–१४० सेमी; गायी सुमारे २९५ किलो. काळे-पांढरे ठिपके, लोंबकळणारे कान, शांत.", "बैल लगभग 590 किग्रा व 135–140 सेमी; गाय लगभग 295 किग्रा। काले-सफ़ेद धब्बे, लटकते कान, शांत।"), strains: D("Wanera, Balankya, Shevera", "वानेरा, बाळंक्या, शेवेरा"), facts: T("Named after Deoni taluka of Latur district. FAO (2007) listed it as 'not at risk'.", "लातूर जिल्ह्यातील देवणी तालुक्यावरून नाव. FAO (२००७) नुसार 'धोक्यात नाही'.", "लातूर ज़िले के देवणी तालुका पर नाम। FAO (2007) के अनुसार 'संकट में नहीं'।"), src: ["wikiDeoni", "angr"] },
  { id: "KV-B003", key: "red-kandhari", type: "cattle", status: "registered", art: ["🐂", "dusk", ["🌾"]], name: D("Red Kandhari", "लाल कंधारी"), region: D("Kandhar taluka (Nanded), Latur, Parbhani", "कंधार तालुका (नांदेड), लातूर, परभणी"), purpose: T("Draught on heavy black soils; moderate milk", "काळ्या भारी जमिनीत शेतीकाम; मध्यम दूध", "भारी काली मिट्टी में कृषि कार्य; मध्यम दूध"), community: D("Farmers of the Kandhar region", "कंधार परिसरातील शेतकरी"), traits: T("Uniform deep red to dark brown coat, medium size, hardy.", "एकसारखा गडद लाल ते तपकिरी रंग, मध्यम आकार, काटक.", "एकसमान गहरा लाल से भूरा रंग, मध्यम आकार, कठोर।"), facts: T("One of the seven registered cattle breeds of Maharashtra; breeding tracts are 'pocketed', often overlapping with Deoni.", "महाराष्ट्रातील सात नोंदणीकृत गोवंशापैकी एक; प्रजनन क्षेत्र विखुरलेले, अनेकदा देवणीशी सामायिक.", "महाराष्ट्र की सात पंजीकृत गो नस्लों में से एक; प्रजनन क्षेत्र बिखरे, अक्सर देवणी से साझा।"), src: ["bkap", "policy2024"] },
  { id: "KV-B004", key: "dangi", type: "cattle", status: "registered", art: ["🐄", "hill", ["🌧️", "🌾"]], name: D("Dangi", "डांगी"), region: D("Nashik (Igatpuri), Ahilyanagar hills, adjoining Thane & Palghar", "नाशिक (इगतपुरी), अहिल्यानगर डोंगर, लगतचे ठाणे व पालघर"), purpose: T("Draught in heavy-rainfall hill paddy", "अतिवृष्टीच्या डोंगरी भातशेतीतील काम", "भारी वर्षा वाली पहाड़ी धान खेती में कार्य"), community: D("Mahadev Koli & hill farmers", "महादेव कोळी व डोंगरी शेतकरी"), traits: T("Black-and-white patches; oily skin that sheds heavy rain.", "काळे-पांढरे चट्टे; पावसात टिकणारी तेलकट त्वचा.", "काले-सफ़ेद धब्बे; भारी वर्षा सहने वाली तैलीय त्वचा।"), strains: D("Bahala, Para, Kala Bahala, Maneri, Lal Bahala", "बहाला, परा, काळा बहाला, मणेरी, लाल बहाला"), facts: T("Adapted to 2,500 mm+ rainfall zones of the northern Sahyadri.", "उत्तर सह्याद्रीतील अतिवृष्टी क्षेत्राशी जुळवून घेतलेली.", "उत्तर सह्याद्रि के अति वर्षा क्षेत्रों के अनुकूल।"), src: ["angr", "bkap"] },
  { id: "KV-B005", key: "gaolao", type: "cattle", status: "registered", art: ["🐄", "leaf", ["🌿"]], name: D("Gaolao", "गवळाऊ"), region: D("Wardha, Nagpur (Vidarbha) and adjoining Madhya Pradesh", "वर्धा, नागपूर (विदर्भ) व लगतचा मध्य प्रदेश"), purpose: T("Draught and moderate milk", "शेतीकाम व मध्यम दूध", "कृषि कार्य व मध्यम दूध"), community: D("Gawli herders", "गवळी पशुपालक"), traits: T("White coat, long narrow face, lean and active.", "पांढरा रंग, लांब अरुंद चेहरा, सडपातळ व चपळ.", "सफ़ेद रंग, लंबा पतला चेहरा, छरहरा व फुर्तीला।"), src: ["bkap", "nbagrCattle"] },
  { id: "KV-B006", key: "konkan-kapila", type: "cattle", status: "registered", art: ["🐄", "hill", ["🌴", "🌧️"]], name: D("Konkan Kapila", "कोकण कपिला"), region: D("Konkan — Sindhudurg, Ratnagiri, Raigad (and Goa)", "कोकण — सिंधुदुर्ग, रत्नागिरी, रायगड (व गोवा)"), purpose: T("Small hill cattle for paddy work and household milk", "भातशेती व घरगुती दुधासाठी लहान डोंगरी गाय", "धान कार्य व घरेलू दूध हेतु छोटी पहाड़ी गाय"), community: D("Konkan farming households", "कोकणातील शेतकरी कुटुंबे"), traits: T("Small-bodied and hardy on laterite hills with very heavy monsoon.", "जांभ्या डोंगरावर अतिपावसात टिकणारी लहान आकाराची काटक गाय.", "लैटेराइट पहाड़ियों पर भारी मानसून में टिकने वाली छोटी कठोर गाय।"), facts: T("A recently registered breed; conservation depends on keeping pure-bred bulls available.", "अलीकडे नोंदणीकृत जात; शुद्ध वळू उपलब्धतेवर संवर्धन अवलंबून.", "हाल में पंजीकृत नस्ल; संरक्षण शुद्ध साँड़ों की उपलब्धता पर निर्भर।"), src: ["policy2024", "bkap"] },
  { id: "KV-B007", key: "kathani", type: "cattle", status: "registered", art: ["🐂", "water", ["🌾"]], name: D("Kathani", "कठाणी"), region: D("Vidarbha paddy belt (eastern Maharashtra)", "विदर्भातील भातपट्टा (पूर्व महाराष्ट्र)"), purpose: T("Dual purpose; strong draught in marshy paddy land", "दुहेरी उपयोग; दलदलीच्या भातशेतीत ताकदवान", "दोहरा उपयोग; दलदली धान भूमि में सशक्त"), community: D("Paddy farmers of Vidarbha", "विदर्भातील भात उत्पादक"), traits: T("Good draught ability suited to wet paddy fields.", "ओल्या भातखाचरांसाठी उत्तम ओढक्षमता.", "गीले धान खेतों हेतु उत्तम खिंचाई क्षमता।"), facts: T("Registered by ICAR-NBAGR in 2022. Accession no. INDIA_CATTLE_1100_KATHANI_03051.", "ICAR-NBAGR कडून २०२२ मध्ये नोंद. नोंदणी क्र. INDIA_CATTLE_1100_KATHANI_03051.", "ICAR-NBAGR द्वारा 2022 में पंजीकृत। पंजीकरण सं. INDIA_CATTLE_1100_KATHANI_03051।"), src: ["icar2022"] },
  { id: "KV-B008", key: "pandharpuri", type: "buffalo", status: "registered", art: ["🐃", "water", ["🥛"]], name: D("Pandharpuri", "पंढरपुरी"), region: D("Solapur, Kolhapur, Sangli, Satara", "सोलापूर, कोल्हापूर, सांगली, सातारा"), purpose: T("Dairy", "दुग्धोत्पादन", "दुग्ध उत्पादन"), community: D("Dairy farmers of Western Maharashtra", "पश्चिम महाराष्ट्रातील दूध उत्पादक"), traits: T("Horns 60–100 cm long, often twisted — among the longest of any domestic bovine; cows about 416 kg.", "६०–१०० सेमी लांब, अनेकदा पिळवटलेली शिंगे — पाळीव गोवंशातील सर्वात लांब; म्हशी सुमारे ४१६ किलो.", "60–100 सेमी लंबे, प्रायः मुड़े सींग — पालतू गोवंश में सबसे लंबे; भैंस लगभग 416 किग्रा।"), facts: T("About 1,400 kg milk per 305 days; lactation ~350 days; calving interval ~465 days (CIRB). Named after Pandharpur town.", "३०५ दिवसांत सुमारे १,४०० किलो दूध; वेत ~३५० दिवस; दोन वेतांतील अंतर ~४६५ दिवस (CIRB). पंढरपूरवरून नाव.", "305 दिनों में लगभग 1,400 किग्रा दूध; ब्यांत ~350 दिन; ब्यांत अंतराल ~465 दिन (CIRB)। पंढरपुर पर नाम।"), src: ["wikiPandharpuri", "nbagrBuffalo"] },
  { id: "KV-B009", key: "nagpuri", type: "buffalo", status: "registered", art: ["🐃", "dusk", ["☀️"]], name: D("Nagpuri", "नागपुरी"), region: D("Nagpur, Akola, Amravati, Chandrapur (Vidarbha)", "नागपूर, अकोला, अमरावती, चंद्रपूर (विदर्भ)"), purpose: T("Milk and draught in semi-arid conditions", "अर्धशुष्क हवामानात दूध व शेतीकाम", "अर्ध-शुष्क परिस्थिति में दूध व कृषि कार्य"), community: D("Gawli herders", "गवळी"), traits: T("Black with white patches on face, legs and tail tip; long flat sword-shaped horns curving back to the shoulders. Males ~145 cm, females ~135 cm.", "चेहरा, पाय व शेपटीवर पांढरे चट्टे असलेला काळा रंग; खांद्यापर्यंत मागे वळलेली लांब चपटी तलवारीसारखी शिंगे. नर ~१४५ सेमी, मादी ~१३५ सेमी.", "चेहरे, पैरों व पूँछ पर सफ़ेद धब्बों वाला काला रंग; कंधों तक मुड़े लंबे चपटे तलवार जैसे सींग। नर ~145, मादा ~135 सेमी।"), strains: D("Elichpuri, Shahi, Chanda", "एलिचपुरी, शाही, चांदा"), facts: T("Field study of 240 Shahi-strain buffaloes (Chandrapur): ~433 kg body weight, 4.06 kg milk/day, ~1,221 kg per lactation.", "चंद्रपूरमधील २४० शाही म्हशींचा अभ्यास: वजन ~४३३ किलो, दररोज ४.०६ किलो दूध, प्रति वेत ~१,२२१ किलो.", "चंद्रपुर में 240 शाही भैंसों का अध्ययन: वज़न ~433 किग्रा, 4.06 किग्रा दूध/दिन, ~1,221 किग्रा प्रति ब्यांत।"), src: ["wikiNagpuri", "shahi"] },
  { id: "KV-B010", key: "marathwadi", type: "buffalo", status: "registered", art: ["🐃", "earth", ["🌾"]], name: D("Marathwadi", "मराठवाडी"), region: D("Marathwada districts", "मराठवाड्यातील जिल्हे"), purpose: T("Milk under low-input rearing", "कमी खर्चात दूध उत्पादन", "कम लागत में दूध उत्पादन"), community: D("Marathwada farmers", "मराठवाड्यातील शेतकरी"), traits: T("Medium size, adapted to scarce fodder and heat.", "मध्यम आकार, कमी चारा व उष्णतेशी जुळवून घेणारी.", "मध्यम आकार, कम चारे व गर्मी के अनुकूल।"), facts: T("In the Latur census region, buffalo numbers rose 10.7% between 2012 and 2019 — the fastest in the state.", "लातूर गणना विभागात २०१२–२०१९ दरम्यान म्हशींची संख्या १०.७% वाढली — राज्यात सर्वाधिक.", "लातूर गणना क्षेत्र में 2012–2019 के बीच भैंसें 10.7% बढ़ीं — राज्य में सर्वाधिक।"), src: ["nbagrBuffalo", "lc2019"] },
  { id: "KV-B011", key: "purnathadi", type: "buffalo", status: "registered", art: ["🐃", "field", ["🥛"]], name: D("Purnathadi", "पूर्णाथडी"), region: D("Purna river tract, Vidarbha (Akola, Amravati)", "पूर्णा नदी परिसर, विदर्भ (अकोला, अमरावती)"), purpose: T("Milk with very high fat", "अतिशय जास्त स्निग्धांशाचे दूध", "अत्यधिक वसा वाला दूध"), community: D("Vidarbha dairy households", "विदर्भातील दूध उत्पादक"), traits: T("Medium size, whitish to light-brown coat, white leg extremities and tail switch, long hook-tipped horns.", "मध्यम आकार, पांढरट ते फिकट तपकिरी रंग, पांढरे पाय व शेपटीचा गोंडा, टोकाशी आकडा असलेली लांब शिंगे.", "मध्यम आकार, सफ़ेद से हल्का भूरा रंग, सफ़ेद पैर व पूँछ का गुच्छा, सिरे पर हुक वाले लंबे सींग।"), facts: T("353–1,533 kg milk per lactation with 6.5–11.5% fat. Registered 2022; accession INDIA_BUFFALO_1100_PURNATHADI_01020.", "प्रति वेत ३५३–१,५३३ किलो दूध, स्निग्धांश ६.५–११.५%. २०२२ मध्ये नोंद; क्र. INDIA_BUFFALO_1100_PURNATHADI_01020.", "प्रति ब्यांत 353–1,533 किग्रा दूध, वसा 6.5–11.5%। 2022 में पंजीकृत; सं. INDIA_BUFFALO_1100_PURNATHADI_01020।"), src: ["icar2022"] },
  { id: "KV-B012", key: "osmanabadi", type: "goat", status: "registered", art: ["🐐", "earth", ["🌿"]], name: D("Osmanabadi", "उस्मानाबादी"), region: D("Dharashiv (Osmanabad), Latur, Solapur, Beed", "धाराशिव (उस्मानाबाद), लातूर, सोलापूर, बीड"), purpose: T("Meat; also milk and manure", "मांस; तसेच दूध व खत", "मांस; साथ ही दूध व खाद"), community: D("Small farmers, landless households", "अल्पभूधारक, भूमिहीन कुटुंबे"), traits: T("Mostly black, hardy and prolific — twinning is common.", "बहुधा काळी, काटक व जास्त करडे देणारी — जुळी सामान्य.", "अधिकतर काली, कठोर व अधिक प्रजनन — जुड़वाँ सामान्य।"), facts: T("Research at MAU Parbhani and in Marathwada shows stall-feeding with concentrate supplement improves kid growth. Maharashtra's goats rose 25.7% (2012→2019).", "परभणी कृषी विद्यापीठ व मराठवाड्यातील संशोधनानुसार पूरक खाद्यासह गोठाबंद संगोपनाने करडांची वाढ सुधारते. राज्यातील शेळ्या २५.७% वाढल्या (२०१२→२०१९).", "परभणी कृषि विश्वविद्यालय व मराठवाड़ा के शोध के अनुसार पूरक आहार सहित बाड़ा पालन से मेमनों की वृद्धि सुधरती है। राज्य की बकरियाँ 25.7% बढ़ीं (2012→2019)।"), src: ["osm2021", "osm2019", "lc2019"] },
  { id: "KV-B013", key: "sangamneri", type: "goat", status: "registered", art: ["🐐", "leaf", ["🌿"]], name: D("Sangamneri", "संगमनेरी"), region: D("Ahilyanagar (Sangamner), Pune, Nashik", "अहिल्यानगर (संगमनेर), पुणे, नाशिक"), purpose: T("Milk and meat", "दूध व मांस", "दूध व मांस"), community: D("Farmers of the Sangamner belt", "संगमनेर पट्ट्यातील शेतकरी"), traits: T("White or mixed coat, medium size, a good browser.", "पांढरा किंवा मिश्र रंग, मध्यम आकार, झुडपे चरणारी.", "सफ़ेद या मिश्रित रंग, मध्यम आकार, झाड़ियाँ चरने वाली।"), src: ["angr"] },
  { id: "KV-B014", key: "berari", type: "goat", status: "registered", art: ["🐐", "dusk", ["🌿"]], name: D("Berari", "बेरारी"), region: D("Vidarbha (historic Berar — Amravati, Akola, Nagpur)", "विदर्भ (ऐतिहासिक वऱ्हाड — अमरावती, अकोला, नागपूर)"), purpose: T("Meat and milk", "मांस व दूध", "मांस व दूध"), community: D("Vidarbha smallholders", "विदर्भातील अल्पभूधारक"), traits: T("Adapted to the hot, dry Vidarbha plateau.", "उष्ण व कोरड्या विदर्भ पठाराशी जुळवून घेतलेली.", "गर्म, शुष्क विदर्भ पठार के अनुकूल।"), src: ["angr"] },
  { id: "KV-B015", key: "konkan-kanyal", type: "goat", status: "registered", art: ["🐐", "hill", ["🌧️"]], name: D("Konkan Kanyal", "कोकण कन्याळ"), region: D("Konkan — Sindhudurg, Ratnagiri and adjoining Kolhapur", "कोकण — सिंधुदुर्ग, रत्नागिरी व लगतचे कोल्हापूर"), purpose: T("Meat", "मांस", "मांस"), community: D("Konkan farming households", "कोकणातील शेतकरी कुटुंबे"), traits: T("Hardy under very heavy rainfall and humid coastal conditions.", "अतिपाऊस व दमट किनारी हवामानात काटक.", "भारी वर्षा व नम तटीय परिस्थिति में कठोर।"), src: ["angr"] },
  { id: "KV-B016", key: "deccani", type: "sheep", status: "registered", art: ["🐑", "dusk", ["🌾"]], name: D("Deccani", "दख्खनी"), region: D("Pune, Solapur, Satara, Ahilyanagar, Sangli", "पुणे, सोलापूर, सातारा, अहिल्यानगर, सांगली"), purpose: T("Meat and coarse wool for ghongadi blankets", "मांस व घोंगडीसाठी जाडी लोकर", "मांस व घोंगड़ी कंबल हेतु मोटी ऊन"), community: D("Dhangar", "धनगर"), traits: T("Black or mixed coat, hardy on sparse Deccan pastures.", "काळा/मिश्र रंग, दख्खनच्या विरळ कुरणांवर काटक.", "काला/मिश्रित रंग, दक्कन के विरल चरागाहों पर कठोर।"), strains: D("Lonand, Solapuri, Kolhapuri, Sangamneri", "लोणंद, सोलापुरी, कोल्हापुरी, संगमनेरी"), facts: T("Nashik (42%) and Pune (31%) census regions hold most of the state's 26.8 lakh sheep; 95% are indigenous or non-descript.", "राज्यातील २६.८ लाख मेंढ्यांपैकी बहुतांश नाशिक (४२%) व पुणे (३१%) विभागात; ९५% देशी/अवर्णित.", "राज्य की 26.8 लाख भेड़ों में अधिकांश नाशिक (42%) व पुणे (31%) क्षेत्र में; 95% देशी/अवर्णित।"), src: ["angr", "lc2019"] },
  { id: "KV-B017", key: "bhimthadi", type: "horse", status: "registered", art: ["🐎", "dusk", ["🏇"]], name: D("Bhimthadi (Deccani horse)", "भीमथडी"), region: D("Bhima river valley — Pune, Solapur, Ahilyanagar", "भीमा नदी खोरे — पुणे, सोलापूर, अहिल्यानगर"), purpose: T("Historic Maratha cavalry horse; now riding and cart work", "ऐतिहासिक मराठा घोडदळाचा घोडा; आता सवारी व गाडीकाम", "ऐतिहासिक मराठा घुड़सवार सेना का घोड़ा; अब सवारी व गाड़ी कार्य"), community: D("Rural horse keepers", "ग्रामीण घोडेपालक"), traits: T("Small, sturdy and enduring on rough Deccan terrain.", "लहान, मजबूत व खडबडीत दख्खनी भूभागावर दमदार.", "छोटा, मज़बूत व ऊबड़-खाबड़ दक्कन भूभाग पर सहनशील।"), facts: T("Horses & ponies in Maharashtra fell 49.3% between 2012 and 2019 (37,287 → 18,892).", "२०१२ ते २०१९ दरम्यान राज्यातील घोडे व तट्टे ४९.३% घटले (३७,२८७ → १८,८९२).", "2012 से 2019 के बीच राज्य में घोड़े व टट्टू 49.3% घटे (37,287 → 18,892)।"), src: ["angr", "lc2019"] }
];

const festivals = [
  { key: "bail-pola", art: ["🐂", "festive", ["🪔", "🌼"]], name: D("Bail Pola", "बैलपोळा"), when: T("Shravan Amavasya (Aug–Sep)", "श्रावण अमावस्या", "श्रावण अमावस्या (अगस्त–सितंबर)"), region: D("Vidarbha, Marathwada, all Maharashtra", "विदर्भ, मराठवाडा, संपूर्ण महाराष्ट्र"), community: FARM_FAMILIES, agri: T("Bullocks rested, bathed, decorated and worshipped", "बैलांना विश्रांती, आंघोळ, सजावट व पूजा", "बैलों को विश्राम, स्नान, सजावट व पूजा"), food: T("Puranpoli; special feed for the bullocks", "पुरणपोळी; बैलांना खास घास", "पूरणपोळी; बैलों को विशेष आहार"), tradition: T("Bullock procession; Tanha Pola for children", "बैलांची मिरवणूक; मुलांचा तान्हा पोळा", "बैलों की शोभायात्रा; बच्चों का तान्हा पोळा") },
  { key: "sankranti", art: ["🪁", "dusk", ["🌾", "☀️"]], name: D("Makar Sankranti", "मकर संक्रांत"), when: T("14/15 January", "१४/१५ जानेवारी", "14/15 जनवरी"), region: ALL_MH, community: FARM_FAMILIES, agri: T("Rabi-season festival; Bhogi celebrates new produce", "रब्बी हंगामातील सण; भोगीला नव्या पिकांचे स्वागत", "रबी मौसम का त्योहार; भोगी पर नई उपज का स्वागत"), food: T("Til-gul, bajri bhakri, bhogichi bhaji", "तिळगूळ, बाजरीची भाकरी, भोगीची भाजी", "तिलगुड़, बाजरे की भाकरी, भोगी की सब्ज़ी"), tradition: T("‘Tilgul ghya, goad goad bola’ — sharing sweets", "‘तिळगूळ घ्या, गोड गोड बोला’", "‘तिलगुड़ लो, मीठा-मीठा बोलो’ — मिठाई बाँटना") },
  { key: "gudi-padwa", art: ["🚩", "festive", ["🌿", "🍯"]], name: D("Gudi Padwa", "गुढीपाडवा"), when: T("Chaitra Shukla Pratipada (Mar–Apr)", "चैत्र शुद्ध प्रतिपदा", "चैत्र शुक्ल प्रतिपदा (मार्च–अप्रैल)"), region: ALL_MH, community: FARM_FAMILIES, agri: T("New year; farmers plan the agricultural year", "नववर्ष; शेतीवर्षाचे नियोजन", "नववर्ष; कृषि वर्ष की योजना"), food: T("Neem–jaggery paste, shrikhand", "कडुनिंब-गूळ, श्रीखंड", "नीम-गुड़, श्रीखंड"), tradition: T("A gudi is raised at every home", "प्रत्येक घरी गुढी उभारली जाते", "हर घर में गुड़ी खड़ी की जाती है") },
  { key: "nag-panchami", art: ["🐍", "leaf", ["🌾", "🌸"]], name: D("Nag Panchami", "नागपंचमी"), when: T("Shravan Shukla Panchami", "श्रावण शुद्ध पंचमी", "श्रावण शुक्ल पंचमी"), region: ALL_MH, community: FARM_FAMILIES, agri: T("Snakes honoured as protectors of fields; traditionally no ploughing that day", "शेताचे रक्षक म्हणून नागपूजा; पारंपरिकरित्या त्या दिवशी नांगरणी नाही", "खेत रक्षक मानकर नाग पूजा; परंपरागत रूप से उस दिन जुताई नहीं"), food: T("Steamed dishes and puran", "उकडलेले पदार्थ व पुरण", "भाप में बने व्यंजन व पूरण"), tradition: T("Women's songs, zimma-fugdi and swings", "झिम्मा-फुगडी, झोके व गाणी", "झिम्मा-फुगड़ी, झूले व गीत") },
  { key: "ashadhi-wari", art: ["🚶", "dusk", ["🚩", "🎶"]], name: D("Ashadhi Wari", "आषाढी वारी"), when: T("Ashadhi Ekadashi (Jun–Jul)", "आषाढी एकादशी", "आषाढ़ी एकादशी (जून–जुलाई)"), region: D("Pandharpur (Solapur) and pilgrim routes", "पंढरपूर (सोलापूर) व वारीमार्ग"), community: D("Warkari farmers", "वारकरी शेतकरी"), agri: T("Farmers walk to Pandharpur after kharif sowing", "खरीप पेरणीनंतर शेतकरी पंढरीची वारी करतात", "खरीफ बुवाई के बाद किसान पंढरपुर की यात्रा करते हैं"), food: T("Fasting food — varai, sabudana", "उपवासाचे पदार्थ — वरई, साबुदाणा", "उपवास भोजन — वरई, साबूदाना"), tradition: T("Palkhi processions and abhang singing", "पालखी सोहळा व अभंग", "पालकी यात्रा व अभंग गायन") },
  { key: "balipratipada", art: ["🪔", "festive", ["👑", "🌾"]], name: D("Balipratipada", "बलिप्रतिपदा"), when: T("Diwali Padwa (Oct–Nov)", "दिवाळी पाडवा", "दिवाली पड़वा (अक्टूबर–नवंबर)"), region: ALL_MH, community: FARM_FAMILIES, agri: T("Remembers King Bali, the farmers' king", "शेतकऱ्यांचा राजा बळीराजाचे स्मरण", "किसानों के राजा बलि का स्मरण"), food: T("Faral sweets and new rice", "फराळ व नवा तांदूळ", "फराल मिठाइयाँ व नया चावल"), tradition: T("‘Ida pida javo, Balicha rajya yevo’", "‘इडा पिडा जावो, बळीचे राज्य येवो’", "‘इडा पिडा जावो, बलि का राज्य आवो’") }
];

const heritageRecords = [
  { key: "risk-jowar", cat: "crops", status: "atrisk", from: 62.84, to: 16.92, unit: T("lakh ha", "लाख हे.", "लाख हे."), span: "1960-61 → 2024-25", src: "esm2526", art: ["🌾", "earth", ["📉"]], name: T("Jowar (sorghum) area", "ज्वारीचे क्षेत्र", "ज्वार का क्षेत्र"), note: T("Still 48.5% of India's jowar area is in Maharashtra, but the state's own jowar area has shrunk by nearly three-quarters.", "देशातील ४८.५% ज्वारी क्षेत्र अजूनही महाराष्ट्रात, पण राज्याचे ज्वारी क्षेत्र जवळपास तीन-चतुर्थांश घटले.", "भारत का 48.5% ज्वार क्षेत्र अब भी महाराष्ट्र में, पर राज्य का ज्वार क्षेत्र लगभग तीन-चौथाई घटा।") },
  { key: "risk-bajra", cat: "crops", status: "atrisk", from: 16.35, to: 4.44, unit: T("lakh ha", "लाख हे.", "लाख हे."), span: "1960-61 → 2024-25", src: "esm2526", art: ["🌾", "dusk", ["📉"]], name: T("Bajra (pearl millet) area", "बाजरीचे क्षेत्र", "बाजरे का क्षेत्र"), note: T("Dryland millet displaced by cotton, soybean and sugarcane.", "कापूस, सोयाबीन व ऊस यांमुळे कोरडवाहू बाजरी मागे पडली.", "कपास, सोयाबीन व गन्ने से शुष्क बाजरा पीछे छूटा।") },
  { key: "risk-groundnut", cat: "crops", status: "declining", from: 10.83, to: 2.50, unit: T("lakh ha", "लाख हे.", "लाख हे."), span: "1960-61 → 2024-25", src: "esm2526", art: ["🥜", "field", ["📉"]], name: T("Groundnut area", "भुईमुगाचे क्षेत्र", "मूँगफली का क्षेत्र"), note: T("Traditional oilseed of the Deccan in long decline.", "दख्खनचे पारंपरिक तेलबिया पीक दीर्घकाळ घटत आहे.", "दक्कन की पारंपरिक तिलहन फसल लंबे समय से घट रही है।") },
  { key: "risk-desi-cattle", cat: "breeds", status: "declining", from: 118.33, to: 93.85, unit: T("lakh head", "लाख", "लाख"), span: "2012 → 2019", src: "lc2019", art: ["🐄", "hill", ["📉"]], name: T("Indigenous & non-descript cattle", "देशी व अवर्णित गोवंश", "देशी व अवर्णित गोवंश"), note: T("Crossbred share of cattle rose from 3.0% (1982) to 32.9% (2019).", "गोवंशातील संकरित वाटा ३.०% (१९८२) वरून ३२.९% (२०१९) झाला.", "गोवंश में संकर हिस्सा 3.0% (1982) से 32.9% (2019) हुआ।") },
  { key: "risk-bullocks", cat: "breeds", status: "declining", from: 67.80, to: 47.71, unit: T("lakh head", "लाख", "लाख"), span: "2012 → 2019", src: "lc2019", art: ["🐂", "earth", ["🚜"]], name: T("Male indigenous cattle (draught bullocks)", "देशी नर गोवंश (शेतीकामाचे बैल)", "देशी नर गोवंश (कृषि बैल)"), note: T("Tractors are replacing bullock power; the skills of training pairs go with them.", "ट्रॅक्टरमुळे बैलशक्ती कमी होत आहे; बैलजोडी घडवण्याचे कौशल्यही लोप पावत आहे.", "ट्रैक्टर बैल शक्ति का स्थान ले रहे हैं; बैल जोड़ी प्रशिक्षण कौशल भी लुप्त हो रहा है।") },
  { key: "risk-horse", cat: "breeds", status: "atrisk", from: 37287, to: 18892, unit: T("head", "संख्या", "संख्या"), span: "2012 → 2019", src: "lc2019", art: ["🐎", "dusk", ["📉"]], name: T("Horses & ponies (incl. Bhimthadi)", "घोडे व तट्टे (भीमथडीसह)", "घोड़े व टट्टू (भीमथड़ी सहित)"), note: T("Numbers halved in seven years.", "सात वर्षांत संख्या निम्म्यावर.", "सात वर्षों में संख्या आधी।") },
  { key: "risk-donkey", cat: "occupations", status: "atrisk", from: 29135, to: 17572, unit: T("head", "संख्या", "संख्या"), span: "2012 → 2019", src: "lc2019", art: ["🫏", "earth", ["🧱"]], name: T("Donkeys — pack-animal livelihoods", "गाढवे — ओझेवाहक उपजीविका", "गधे — बोझ ढोने की आजीविका"), note: T("Linked to brick-kiln, salt and carrier communities.", "वीटभट्टी, मीठ व वाहतूक करणाऱ्या समुदायांशी निगडित.", "ईंट भट्ठा, नमक व ढुलाई समुदायों से जुड़ा।") },
  { key: "risk-holding", cat: "economy", status: "declining", from: 4.28, to: 1.23, unit: T("ha", "हे.", "हे."), span: "1970-71 → 2021-22", src: "esm2526", art: ["📏", "field", ["🏠"]], name: T("Average farm size", "सरासरी धारणक्षेत्र", "औसत जोत आकार"), note: T("Operational holdings grew from 49.5 lakh to 171.1 lakh.", "शेतधारणा ४९.५ लाखांवरून १७१.१ लाख झाल्या.", "जोतें 49.5 लाख से बढ़कर 171.1 लाख हुईं।") },
  { key: "risk-mot", cat: "tools", status: "docneeded", art: ["🪣", "water", ["🐂"]], name: T("Mot well-lift", "मोट", "मोट सिंचाई"), note: T("Bullock-drawn leather bucket replaced by electric pumps; few working examples survive.", "बैलांनी ओढली जाणारी चामडी मोट विद्युत पंपांनी बदलली; थोडीच उदाहरणे उरली.", "बैलों से खींची जाने वाली चमड़े की मोट बिजली पंपों से बदली; कुछ ही उदाहरण बचे।") },
  { key: "risk-phad", cat: "practices", status: "docneeded", art: ["🌊", "water", ["🤝"]], name: T("Phad irrigation (Tapi basin)", "फड सिंचन (तापी खोरे)", "फड सिंचाई (तापी घाटी)"), note: T("Community-managed bandhara canals of Dhule & Nashik need mapping.", "धुळे व नाशिकमधील समुदाय-व्यवस्थापित बंधारा कालव्यांचे नकाशांकन आवश्यक.", "धुले व नाशिक की सामुदायिक बंधारा नहरों का मानचित्रण आवश्यक।") },
  { key: "risk-ovi", cat: "oral", status: "docneeded", art: ["🎶", "earth", ["👵"]], name: T("Grinding-stone ovis", "जात्यावरच्या ओव्या", "चक्की की ओवियाँ"), note: T("Sung mainly by elderly women as hand-grinding disappears.", "जाते वापर कमी झाल्याने प्रामुख्याने ज्येष्ठ स्त्रियाच गातात.", "हाथ-चक्की कम होने से मुख्यतः बुज़ुर्ग महिलाएँ ही गाती हैं।") },
  { key: "risk-ghongadi", cat: "occupations", status: "docneeded", art: ["🧶", "dusk", ["🐑"]], name: T("Ghongadi weaving", "घोंगडी विणकाम", "घोंगड़ी बुनाई"), note: T("Hand-woven Deccani-wool blankets; young weavers moving to other work.", "दख्खनी लोकरीच्या हातमाग घोंगड्या; तरुण विणकर इतर व्यवसायांकडे.", "दक्कनी ऊन के हथकरघा कंबल; युवा बुनकर अन्य कार्य की ओर।") }
];

const dashboard = {
  byCategory: [
    { key: "sp.cattle", value: 139.92 }, { key: "sp.goat", value: 106.05 }, { key: "sp.buffalo", value: 56.04 },
    { key: "sp.sheep", value: 26.80 }, { key: "sp.pig", value: 1.61 }
  ],
  byRegion: [
    { key: "divs.nashik", value: 35.10 }, { key: "divs.marathwada", value: 31.11 }, { key: "divs.pune", value: 25.53 },
    { key: "divs.nagpur", value: 20.55 }, { key: "divs.amravati", value: 19.24 }, { key: "divs.konkan", value: 8.39 }
  ],
  cropsVsLivestock: [{ key: "legend.indig", value: 93.85, cls: "a" }, { key: "legend.cross", value: 46.08, cls: "b" }],
  status: [{ key: "legend.backyard", value: 221.13, cls: "a" }, { key: "legend.commercial", value: 521.85, cls: "b" }]
};

const STATS = {
  livestockYears: ["1961", "1966", "1972", "1978", "1982", "1987", "1992", "1997", "2003", "2007", "2012", "2019"],
  livestock: [
    { key: "sp.cattle", cls: "a", values: [153.3, 147.3, 147.1, 152.2, 161.6, 169.8, 174.4, 180.7, 167.4, 161.8, 154.8, 139.9] },
    { key: "sp.goat", cls: "b", values: [51.8, 51.2, 59.1, 75.6, 77.0, 92.0, 99.4, 114.3, 104.5, 103.9, 84.4, 106.0] },
    { key: "sp.buffalo", cls: "c", values: [30.9, 30.4, 33.0, 39.0, 39.7, 47.6, 54.5, 60.7, 60.8, 60.7, 55.9, 56.0] }
  ],
  areaYears: ["1960-61", "1970-71", "1980-81", "1990-91", "2000-01", "2010-11", "2020-21", "2024-25"],
  area: [
    { key: "crop.jowar", cls: "a", values: [62.84, 57.03, 64.69, 63.00, 50.94, 40.60, 23.20, 16.92] },
    { key: "crop.pulses", cls: "b", values: [23.49, 25.66, 27.15, 32.57, 35.57, 40.38, 45.95, 49.87] },
    { key: "crop.cotton", cls: "c", values: [25.00, 27.50, 25.50, 27.21, 30.77, 39.42, 45.45, 41.23] },
    { key: "crop.bajra", cls: "d", values: [16.35, 20.39, 15.34, 19.40, 18.00, 10.35, 6.87, 4.44] }
  ],
  holding: [["1970-71", 4.28], ["1980-81", 3.11], ["1990-91", 2.21], ["2000-01", 1.66], ["2010-11", 1.44], ["2015-16", 1.34], ["2021-22", 1.23]],
  share: [["2011-12", 13.1], ["2018-19", 10.4], ["2019-20", 11.7], ["2020-21", 13.1], ["2021-22", 13.0], ["2022-23", 11.6], ["2023-24", 10.6], ["2024-25", 11.2]]
};

const FACTS = [
  [T("Real GSDP growth 2025-26 (advance estimate)", "वास्तविक GSDP वाढ २०२५-२६ (अग्रिम अंदाज)", "वास्तविक GSDP वृद्धि 2025-26 (अग्रिम अनुमान)"), "7.9%", "esm2526"],
  [T("Agriculture & allied growth: 2024-25 → 2025-26 (AE)", "कृषी व संलग्न वाढ: २०२४-२५ → २०२५-२६ (अ.अं.)", "कृषि व संबद्ध वृद्धि: 2024-25 → 2025-26 (अ.अ.)"), "9.1% → 3.4%", "esm2526"],
  [T("Per-capita milk availability, 2024-25", "दरडोई दूध उपलब्धता, २०२४-२५", "प्रति व्यक्ति दूध उपलब्धता, 2024-25"), "358 g/day", "esm2526"],
  [T("Per-capita eggs · meat, 2024-25", "दरडोई अंडी · मांस, २०२४-२५", "प्रति व्यक्ति अंडे · मांस, 2024-25"), "65 / yr · 9.5 kg / yr", "esm2526"],
  [T("Kharif 2025 sown area · Rabi 2025-26 sown area", "खरीप २०२५ पेरणी · रब्बी २०२५-२६ पेरणी", "खरीफ 2025 बुवाई · रबी 2025-26 बुवाई"), "157.27 · 66.98 lakh ha", "esm2526"],
  [T("Horticulture area · production, 2024-25", "फलोत्पादन क्षेत्र · उत्पादन, २०२४-२५", "बागवानी क्षेत्र · उत्पादन, 2024-25"), "25.19 lakh ha · 339.77 lakh MT", "esm2526"],
  [T("Maharashtra's share of India's jowar · cotton area (2020-23 avg)", "देशाच्या ज्वारी · कापूस क्षेत्रातील वाटा (२०२०-२३ सरासरी)", "भारत के ज्वार · कपास क्षेत्र में हिस्सा (2020-23 औसत)"), "48.5% · 33.5%", "esm2526"],
  [T("Heavy-rain & flood relief sanctioned, 2025-26", "अतिवृष्टी व पूर मदत मंजूर, २०२५-२६", "अतिवृष्टि व बाढ़ राहत स्वीकृत, 2025-26"), "₹9,022 cr · 116.4 lakh farmers", "esm2526"],
  [T("Farm holdings · average size (Agri. Census 2021-22, provisional)", "शेतधारणा · सरासरी आकार (कृषी गणना २०२१-२२, तात्पुरते)", "जोतें · औसत आकार (कृषि गणना 2021-22, अनंतिम)"), "171.11 lakh · 1.23 ha", "esm2526"],
  [T("Livestock rank in India · Poultry rank (2019)", "पशुधनात देशात क्रमांक · कुक्कुट क्रमांक (२०१९)", "पशुधन में भारत में स्थान · मुर्गी स्थान (2019)"), "7th · 5th", "lc2019"]
];

const FINDINGS = [
  T("Cattle peaked at 180.7 lakh in 1997 and fell to 139.9 lakh by 2019 (−22.6%), while goats grew to 106.0 lakh — small ruminants now form 40% of the state's livestock.", "गोवंश १९९७ मध्ये १८०.७ लाखांवर पोहोचून २०१९ पर्यंत १३९.९ लाखांवर आला (−२२.६%), तर शेळ्या १०६.० लाख झाल्या — लहान रवंथी प्राणी आता पशुधनाच्या ४०% आहेत.", "गोवंश 1997 में 180.7 लाख के शिखर से 2019 तक 139.9 लाख पर आया (−22.6%), जबकि बकरियाँ 106.0 लाख हुईं — छोटे जुगाली पशु अब पशुधन का 40% हैं।"),
  T("Pulses area more than doubled since 1960-61 (23.5 → 49.9 lakh ha) while jowar fell by 73% — a shift from millet to pulse-and-cash-crop farming.", "१९६०-६१ पासून कडधान्य क्षेत्र दुपटीहून अधिक (२३.५ → ४९.९ लाख हे.) तर ज्वारी ७३% घटली — तृणधान्यांकडून कडधान्य व नगदी पिकांकडे बदल.", "1960-61 से दलहन क्षेत्र दोगुने से अधिक (23.5 → 49.9 लाख हे.) जबकि ज्वार 73% घटा — मोटे अनाज से दलहन व नकदी फसलों की ओर बदलाव।"),
  T("Livestock's share of agriculture & allied GSVA rose from 19.0% (2011-12) to 23.4% (2024-25) — animals are becoming more, not less, important to farm income.", "कृषी व संलग्न GSVA मधील पशुधनाचा वाटा १९.०% (२०११-१२) वरून २३.४% (२०२४-२५) — शेती उत्पन्नात पशुधनाचे महत्त्व वाढत आहे.", "कृषि व संबद्ध GSVA में पशुधन का हिस्सा 19.0% (2011-12) से 23.4% (2024-25) — कृषि आय में पशुओं का महत्व बढ़ रहा है।"),
  T("Average farm size shrank from 4.28 ha to 1.23 ha in five decades; 79.5% of holdings are small or marginal (below 2 ha) — low-cost indigenous practices matter most to them.", "पाच दशकांत सरासरी धारणक्षेत्र ४.२८ वरून १.२३ हे.; ७९.५% धारणा २ हेक्टरपेक्षा लहान — कमी खर्चाच्या पारंपरिक पद्धती त्यांच्यासाठी सर्वाधिक महत्त्वाच्या.", "पाँच दशकों में औसत जोत 4.28 से 1.23 हे.; 79.5% जोतें 2 हे. से छोटी — कम लागत की पारंपरिक पद्धतियाँ उनके लिए सबसे अहम।"),
  T("Backyard poultry grew 26.3% (2012–19) even as commercial flocks fell 13.4% — household poultry remains a resilient rural livelihood.", "परसबागेतील कुक्कुटपालन २६.३% वाढले (२०१२–१९) तर व्यावसायिक १३.४% घटले — घरगुती कुक्कुटपालन टिकाऊ उपजीविका.", "घरेलू मुर्गी पालन 26.3% बढ़ा (2012–19) जबकि व्यावसायिक 13.4% घटा — घरेलू मुर्गी पालन टिकाऊ आजीविका।")
];

const MAP_STATS = {
  konkan: { cattle: 839038, buffalo: 341813, goat: 339256, sheep: 8565, poultry: 10793967, pop: 3.26, gddp: 17.92 },
  nashik: { cattle: 3509504, buffalo: 883319, goat: 2909157, sheep: 1128437, poultry: 20994627, pop: 2.18, gddp: 5.74 },
  pune: { cattle: 2552978, buffalo: 2184380, goat: 2486935, sheep: 828854, poultry: 30626396, pop: 2.73, gddp: 10.57 },
  marathwada: { cattle: 3111337, buffalo: 1289582, goat: 2211151, sheep: 370169, poultry: 4602485, pop: 2.22, gddp: 5.04 },
  amravati: { cattle: 1923971, buffalo: 455782, goat: 1333902, sheep: 250042, poultry: 2991824, pop: 1.26, gddp: 2.67 },
  nagpur: { cattle: 2055476, buffalo: 448816, goat: 1324482, sheep: 94262, poultry: 4288466, pop: 1.28, gddp: 4.28 }
};

const REMOTE_PHOTOS = {
  "khillari": { file: "Khilari_01.JPG", licence: "CC BY-SA 3.0" },
  "g-khillari-pair": { file: "Khilari_01.JPG", licence: "CC BY-SA 3.0" },
  "deoni": { file: "Deoni_01.JPG", author: "Pavanaja", licence: "CC BY-SA 3.0" },
  "bail-pola": { file: "Bulls_decorated_for_Pola_festival.jpg", licence: "see file page" },
  "g-pola": { file: "Bulls_decorated_for_Pola_festival.jpg", licence: "see file page" },
  "warli": { file: "Kalsubai_Temple_Warli_Painting.jpg", licence: "CC BY-SA 4.0" },
  "ashadhi-wari": { file: "Palkhi_procession_pune.jpg", licence: "CC BY-SA 4.0 / GFDL" },
  "g-bailgadi": { file: "Bailgada_manchar.png", licence: "see file page" }
};

const commonsURL = f => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(f) + "?width=900";

const commonsPage = f => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(f);

const Dst = (key, en, dev, div, c, b, sh, g, p, comm, back, dens, per1k, milk1k, gddp, pci, note) =>
  ({ key, name: D(en, dev), div, cattle: c, buffalo: b, sheep: sh, goat: g, pig: p, commPoultry: comm, backPoultry: back, poultry: comm + back, dens, per1k, milk1k, gddp, pci, note });

const DISTRICTS = [
  Dst("mumbai", "Mumbai (City + Suburban)", "मुंबई (शहर + उपनगर)", "konkan", 3226, 24388, 458, 6389, 406, 15935, 4128, 58, 2, 2, 913316, 517875, T("Reported jointly in both sources. Aarey Milk Colony (1949) shaped the city's dairy history; Koli fishing villages remain.", "दोन्ही स्रोतांत एकत्रित नोंद. आरे दूध वसाहत (१९४९) — शहराच्या दुग्ध इतिहासाचा भाग; कोळीवाडे आजही.", "दोनों स्रोतों में संयुक्त। आरे दुग्ध कॉलोनी (1949) — शहर के डेयरी इतिहास का भाग; कोली बस्तियाँ आज भी।")),
  Dst("thane", "Thane", "ठाणे", "konkan", 79522, 92521, 1827, 60045, 1961, 2414048, 562420, 56, 25, 7, 672502, 444283, T("GDDP includes Palghar. Paddy and vegetable belt; Agri salt-pan and Warli, Katkari, Thakar hamlets.", "GDDP मध्ये पालघर समाविष्ट. भात व भाजीपाला पट्टा; आगरी मिठागरे व वारली, कातकरी, ठाकर पाडे.", "GDDP में पालघर शामिल। धान व सब्ज़ी पट्टी; आगरी नमक क्षेत्र व वारली, कातकरी, ठाकर बस्तियाँ।")),
  Dst("palghar", "Palghar", "पालघर", "konkan", 238404, 70233, 2843, 113538, 1559, 613169, 1360330, 80, 127, 20, null, null, T("Warli painting heartland; Dahanu-Gholvad chikoo (GI); nachni, varai and paddy; backyard poultry exceeds farm poultry.", "वारली चित्रकलेचे माहेर; डहाणू-घोलवड चिकू (GI); नाचणी, वरई, भात; परसबागेतील कोंबड्या व्यावसायिकांपेक्षा जास्त.", "वारली चित्रकला का गढ़; डहाणू-घोलवड चीकू (GI); नाचनी, वरई, धान; घरेलू मुर्गियाँ व्यावसायिक से अधिक।")),
  Dst("raigad", "Raigad", "रायगड", "konkan", 176906, 62225, 2203, 90188, 513, 3098220, 946632, 46, 115, 24, 120687, 357581, T("Konkan paddy and Agri salt pans; Alibag white onion (GI); large commercial poultry near Mumbai.", "कोकणातील भात व आगरी मिठागरे; अलिबाग पांढरा कांदा (GI); मुंबईलगत मोठे व्यावसायिक कुक्कुटपालन.", "कोंकण का धान व आगरी नमक क्षेत्र; अलीबाग सफ़ेद प्याज़ (GI); मुंबई के पास बड़ा व्यावसायिक मुर्गी पालन।")),
  Dst("ratnagiri", "Ratnagiri", "रत्नागिरी", "konkan", 235060, 41112, 1212, 38161, 128, 52475, 807509, 38, 182, 30, 54907, 277002, T("Alphonso (Hapus) mango — ODOP Gold Award 2024; kokum, cashew and terraced paddy.", "हापूस आंबा — ओडीओपी सुवर्ण पुरस्कार २०२४; कोकम, काजू व खाचरातील भात.", "अल्फांसो (हापुस) आम — ओडीओपी स्वर्ण पुरस्कार 2024; कोकम, काजू व सीढ़ीदार धान।")),
  Dst("sindhudurg", "Sindhudurg", "सिंधुदुर्ग", "konkan", 105920, 51334, 22, 30935, 1364, 336470, 582631, 36, 209, 36, 30714, 302001, T("Hapus mango, Vengurla cashew and kokum; home tract of Konkan Kapila cattle and Konkan Kanyal goat.", "हापूस, वेंगुर्ला काजू व कोकम; कोकण कपिला गाय व कोकण कन्याळ शेळीचे मूळ क्षेत्र.", "हापुस, वेंगुर्ला काजू व कोकम; कोकण कपिला गाय व कोकण कन्याल बकरी का मूल क्षेत्र।")),
  Dst("nashik", "Nashik", "नाशिक", "nashik", 895050, 221234, 243373, 626644, 7616, 7335008, 678253, 129, 295, 50, 234753, 300260, T("Nashik grapes (GI) and Lasalgaon onion (GI); Dangi cattle and Kokna, Mahadev Koli hill farming in Igatpuri-Surgana.", "नाशिक द्राक्षे (GI) व लासलगाव कांदा (GI); इगतपुरी-सुरगाण्यात डांगी गाय व कोकणा, महादेव कोळी डोंगरी शेती.", "नाशिक अंगूर (GI) व लासलगाँव प्याज़ (GI); इगतपुरी-सुरगाणा में डांगी गाय व कोकणा, महादेव कोली पहाड़ी खेती।")),
  Dst("dhule", "Dhule", "धुळे", "nashik", 354544, 97659, 492632, 332041, 9116, 1681165, 357860, 179, 576, 52, 55851, 217188, T("Largest sheep population in the state (18.4%) and highest livestock density after Ahilyanagar; phad irrigation on the Panjhara.", "राज्यातील सर्वाधिक मेंढ्या (१८.४%) व अहिल्यानगरनंतर सर्वाधिक पशुघनता; पांझरेवरील फड सिंचन.", "राज्य में सर्वाधिक भेड़ें (18.4%) व अहिल्यानगर के बाद सर्वाधिक पशु घनत्व; पांझरा पर फड सिंचाई।")),
  Dst("nandurbar", "Nandurbar", "नंदुरबार", "nashik", 304305, 73966, 36210, 323264, 7314, 325082, 615112, 125, 421, 38, 29679, 146807, T("Satpuda Bhil and Pawara farming — maize, jowar, tur; Bhongarya haat before Holi; a major chilli market.", "सातपुड्यातील भिल्ल व पावरा शेती — मका, ज्वारी, तूर; होळीपूर्वी भोंगऱ्या बाजार; मोठी मिरची बाजारपेठ.", "सतपुड़ा की भील व पावरा खेती — मक्का, ज्वार, तुअर; होली से पहले भोंगर्या हाट; बड़ा मिर्च बाज़ार।")),
  Dst("jalgaon", "Jalgaon", "जळगाव", "nashik", 577302, 269105, 70471, 433156, 9599, 667255, 363405, 116, 294, 55, 111581, 209158, T("Jalgaon banana (GI) grown largely by Leva Patil farmers; Jalgaon bharit brinjal (GI); cotton.", "जळगाव केळी (GI) — प्रामुख्याने लेवा पाटील शेतकरी; जळगाव भरीत वांगी (GI); कापूस.", "जलगाँव केला (GI) — मुख्यतः लेवा पाटिल किसान; जलगाँव भरीत बैंगन (GI); कपास।")),
  Dst("ahilyanagar", "Ahilyanagar (Ahmednagar)", "अहिल्यानगर (अहमदनगर)", "nashik", 1378303, 221355, 285751, 1194052, 5466, 7446833, 1524654, 181, 630, 133, 142033, 254483, T("Most cattle and goats of any district and highest milch animals per person; Sangamneri goat; Hiware Bazar & Ralegan Siddhi watershed models; Akole seed conservation.", "सर्वाधिक गोवंश व शेळ्या आणि दरडोई सर्वाधिक दुभती जनावरे; संगमनेरी शेळी; हिवरे बाजार व राळेगणसिद्धी पाणलोट प्रारूपे; अकोल्याचे बीज संवर्धन.", "सर्वाधिक गोवंश व बकरियाँ तथा प्रति व्यक्ति सर्वाधिक दुधारू पशु; संगमनेरी बकरी; हिवरे बाज़ार व रालेगण सिद्धि जलग्रहण मॉडल; अकोले का बीज संरक्षण।")),
  Dst("pune", "Pune", "पुणे", "pune", 846745, 298148, 290633, 575905, 11439, 13986514, 2419944, 130, 190, 49, 534695, 426720, T("Largest poultry share in the state (22%); Ambemohar rice of Mulshi and Purandar fig (GI); Bhimthadi horse tract; Wari begins at Alandi and Dehu.", "राज्यात सर्वाधिक कुक्कुट (२२%); मुळशीचा आंबेमोहर व पुरंदर अंजीर (GI); भीमथडी घोड्याचे क्षेत्र; आळंदी-देहूपासून वारी.", "राज्य में सर्वाधिक मुर्गियाँ (22%); मुलशी का आंबेमोहर चावल व पुरंदर अंजीर (GI); भीमथड़ी घोड़ा क्षेत्र; आलंदी-देहू से वारी।")),
  Dst("satara", "Satara", "सातारा", "pune", 352436, 326896, 185905, 364348, 313, 2482618, 1513358, 118, 380, 91, 100260, 271418, T("Khillari tract around Mhasvad (Man taluka); Mahabaleshwar strawberry and Waghya ghevada (GI).", "म्हसवड (माण) परिसरात खिल्लार; महाबळेश्वर स्ट्रॉबेरी व वाघ्या घेवडा (GI).", "म्हसवड (माण) क्षेत्र में खिल्लार; महाबलेश्वर स्ट्रॉबेरी व वाघ्या घेवड़ा (GI)।")),
  Dst("sangli", "Sangli", "सांगली", "pune", 324756, 493998, 130754, 454125, 3317, 2793362, 950925, 164, 460, 127, 105778, 304233, T("Sangli turmeric and raisins (GI); Atpadi Khillari; third-largest buffalo population.", "सांगली हळद व बेदाणे (GI); आटपाडी खिल्लार; म्हशींमध्ये तिसरा क्रमांक.", "सांगली हल्दी व किशमिश (GI); आटपाडी खिल्लार; भैंसों में तीसरा स्थान।")),
  Dst("solapur", "Solapur", "सोलापूर", "pune", 745404, 496454, 125386, 962504, 10457, 927626, 2171436, 157, 495, 115, 157079, 289558, T("Pandharpuri buffalo; Mangalvedha Maldandi jowar and Solapur pomegranate (GI); second-most goats; Pandharpur, destination of the Wari.", "पंढरपुरी म्हैस; मंगळवेढा मालदांडी ज्वारी व सोलापूर डाळिंब (GI); शेळ्यांमध्ये दुसरा; वारीचे पंढरपूर.", "पंढरपुरी भैंस; मंगलवेढा मालदांडी ज्वार व सोलापुर अनार (GI); बकरियों में दूसरा; वारी का पंढरपुर।")),
  Dst("kolhapur", "Kolhapur", "कोल्हापूर", "pune", 283637, 568884, 96176, 130053, 806, 2706260, 674353, 141, 255, 108, 158819, 324444, T("Highest buffalo population of any district (10.2%) and strong dairy co-operatives; Kolhapur jaggery and Ajara Ghansal rice (GI).", "जिल्ह्यांत सर्वाधिक म्हशी (१०.२%) व सक्षम दूध संघ; कोल्हापुरी गूळ व आजरा घनसाळ तांदूळ (GI).", "ज़िलों में सर्वाधिक भैंसें (10.2%) व सशक्त दुग्ध सहकारी; कोल्हापुरी गुड़ व आजरा घनसाल चावल (GI)।")),
  Dst("sambhajinagar", "Chhatrapati Sambhajinagar", "छत्रपती संभाजीनगर", "marathwada", 538572, 94430, 88244, 431182, 10646, 310794, 291347, 115, 283, 41, 133105, 279930, T("Cotton and maize; Marathwada Kesar mango (GI); a major seed and agro-processing centre.", "कापूस व मका; मराठवाडा केशर आंबा (GI); बियाणे व कृषी प्रक्रिया केंद्र.", "कपास व मक्का; मराठवाड़ा केसर आम (GI); बीज व कृषि प्रसंस्करण केंद्र।")),
  Dst("jalna", "Jalna", "जालना", "marathwada", 421975, 82073, 30534, 300988, 4074, 7285, 286834, 109, 398, 54, 47085, 195940, T("Jalna sweet orange (mosambi, GI); known as a hub of the private seed industry.", "जालना मोसंबी (GI); खासगी बियाणे उद्योगाचे केंद्र.", "जालना मौसंबी (GI); निजी बीज उद्योग का केंद्र।")),
  Dst("parbhani", "Parbhani", "परभणी", "marathwada", 299861, 98495, 31673, 171698, 6428, 13148, 160089, 98, 303, 47, 44263, 191546, T("Seat of VNMKV agricultural university; jowar, cotton and soybean; Deoni and Red Kandhari tract.", "वसंतराव नाईक मराठवाडा कृषी विद्यापीठ; ज्वारी, कापूस, सोयाबीन; देवणी व लाल कंधारी क्षेत्र.", "वसंतराव नाईक मराठवाड़ा कृषि विश्वविद्यालय; ज्वार, कपास, सोयाबीन; देवणी व लाल कंधारी क्षेत्र।")),
  Dst("hingoli", "Hingoli", "हिंगोली", "marathwada", 232203, 74125, 16907, 154284, 1670, 766, 171103, 99, 380, 59, 24535, 171249, T("Turmeric trade at Basmat; soybean; Andh tribal farming villages.", "वसमतची हळद बाजारपेठ; सोयाबीन; आंध आदिवासी शेती गावे.", "वसमत का हल्दी बाज़ार; सोयाबीन; आंध आदिवासी कृषि गाँव।")),
  Dst("beed", "Beed", "बीड", "marathwada", 496368, 258440, 68693, 468149, 3803, 636639, 903451, 121, 465, 70, 62971, 198192, T("Beed custard apple (GI); many families migrate seasonally to cut sugarcane.", "बीड सीताफळ (GI); अनेक कुटुंबांचे हंगामी ऊसतोड स्थलांतर.", "बीड सीताफल (GI); अनेक परिवारों का मौसमी गन्ना कटाई प्रवास।")),
  Dst("latur", "Latur", "लातूर", "marathwada", 257508, 257187, 35094, 148886, 6165, 305227, 198821, 99, 265, 60, 67899, 223600, T("Deoni cattle named after Deoni taluka; a leading tur-dal processing hub; buffalo numbers growing.", "देवणी तालुक्यावरून देवणी गाय; तूरडाळ प्रक्रियेचे मोठे केंद्र; म्हशींची संख्या वाढती.", "देवणी तालुका से देवणी गाय; तुअर दाल प्रसंस्करण का बड़ा केंद्र; भैंसों की संख्या बढ़ती।")),
  Dst("dharashiv", "Dharashiv (Osmanabad)", "धाराशिव (उस्मानाबाद)", "marathwada", 362422, 188446, 22131, 217400, 590, 384993, 374617, 105, 444, 114, 42404, 210773, T("Home tract of the Osmanabadi goat; Tuljapur; dryland jowar and pulses.", "उस्मानाबादी शेळीचे मूळ क्षेत्र; तुळजापूर; कोरडवाहू ज्वारी व कडधान्ये.", "उस्मानाबादी बकरी का मूल क्षेत्र; तुलजापुर; शुष्क ज्वार व दलहन।")),
  Dst("nanded", "Nanded", "नांदेड", "marathwada", 502428, 236386, 76893, 318564, 6529, 204887, 352484, 106, 313, 55, 81431, 193015, T("Red Kandhari from Kandhar taluka; Kolam and Gond villages around Kinwat; cotton and soybean.", "कंधार तालुक्यातील लाल कंधारी; किनवट परिसरात कोलाम व गोंड गावे; कापूस व सोयाबीन.", "कंधार तालुका की लाल कंधारी; किनवट क्षेत्र में कोलाम व गोंड गाँव; कपास व सोयाबीन।")),
  Dst("buldhana", "Buldhana", "बुलढाणा", "amravati", 461529, 134148, 125280, 364689, 5251, 96638, 303483, 113, 390, 54, 53738, 168466, T("Lonar crater (Ramsar site); cotton and soybean; sizeable sheep and goat flocks.", "लोणार सरोवर (रामसर स्थळ); कापूस व सोयाबीन; मोठे मेंढी-शेळी कळप.", "लोणार झील (रामसर स्थल); कपास व सोयाबीन; बड़े भेड़-बकरी झुंड।")),
  Dst("akola", "Akola", "अकोला", "amravati", 233271, 49797, 9581, 151076, 1356, 107511, 80518, 79, 223, 36, 50574, 217009, T("Seat of Dr. PDKV agricultural university; cotton; part of the Purnathadi buffalo tract.", "डॉ. पंजाबराव देशमुख कृषी विद्यापीठ; कापूस; पूर्णाथडी म्हशीचे क्षेत्र.", "डॉ. पंजाबराव देशमुख कृषि विश्वविद्यालय; कपास; पूर्णाथड़ी भैंस क्षेत्र।")),
  Dst("washim", "Washim", "वाशिम", "amravati", 168091, 53826, 9394, 127477, 7193, 51780, 75327, 75, 284, 47, 23514, 160925, T("Pohradevi, the pilgrimage centre of the Banjara community; soybean.", "पोहरादेवी — बंजारा समाजाचे तीर्थक्षेत्र; सोयाबीन.", "पोहरादेवी — बंजारा समुदाय का तीर्थ; सोयाबीन।")),
  Dst("amravati", "Amravati", "अमरावती", "amravati", 464967, 129627, 83200, 340681, 4801, 1123950, 265833, 84, 323, 47, 78021, 212991, T("Melghat's Korku farmers and Gawli buffalo herders; Warud oranges; Purnathadi buffalo.", "मेळघाटातील कोरकू शेतकरी व गवळी म्हैसपालक; वरूडची संत्री; पूर्णाथडी म्हैस.", "मेलघाट के कोरकू किसान व गवली भैंस पालक; वरुड के संतरे; पूर्णाथड़ी भैंस।")),
  Dst("yavatmal", "Yavatmal", "यवतमाळ", "amravati", 596113, 88384, 22587, 349979, 1406, 414656, 472128, 78, 353, 46, 61637, 179857, T("Cotton heartland; Kolam and Gond communities; Banjara tandas.", "कापसाचे केंद्र; कोलाम व गोंड समुदाय; बंजारा तांडे.", "कपास का केंद्र; कोलाम व गोंड समुदाय; बंजारा तांडे।")),
  Dst("wardha", "Wardha", "वर्धा", "nagpur", 275880, 46649, 5358, 161359, 590, 140007, 134726, 78, 344, 53, 41619, 254390, T("Home tract of Gaolao cattle; Sevagram and a long tradition of Gandhian and natural-farming experiments.", "गवळाऊ गायीचे मूळ क्षेत्र; सेवाग्राम व गांधीवादी-नैसर्गिक शेती प्रयोगांची परंपरा.", "गवलाऊ गाय का मूल क्षेत्र; सेवाग्राम व गांधीवादी-प्राकृतिक खेती प्रयोगों की परंपरा।")),
  Dst("nagpur", "Nagpur", "नागपूर", "nagpur", 418548, 72482, 15476, 289098, 1909, 1074016, 291342, 81, 150, 23, 230750, 367805, T("Nagpur orange (GI); Nagpuri buffalo; Gaolao cattle.", "नागपुरी संत्री (GI); नागपुरी म्हैस; गवळाऊ गाय.", "नागपुरी संतरा (GI); नागपुरी भैंस; गवलाऊ गाय।")),
  Dst("bhandara", "Bhandara", "भंडारा", "nagpur", 213036, 106861, 3169, 199183, 83, 9404, 306370, 128, 403, 62, 31757, 215100, T("Paddy watered by historic malgujari tanks; Kathani cattle in the wet paddy belt.", "ऐतिहासिक माजी मालगुजारी तलावांवर भातशेती; ओल्या भातपट्ट्यात कठाणी गाय.", "ऐतिहासिक मालगुज़ारी तालाबों से धान; गीली धान पट्टी में कठाणी गाय।")),
  Dst("gondia", "Gondia", "गोंदिया", "nagpur", 292627, 92527, 1189, 194975, 366, 330968, 310575, 116, 409, 53, 33579, 205227, T("Rice bowl of the state with malgujari tank irrigation; Kathani cattle.", "मालगुजारी तलाव सिंचनावर राज्याचे भांडार; कठाणी गाय.", "मालगुज़ारी तालाब सिंचाई से राज्य का धान भंडार; कठाणी गाय।")),
  Dst("chandrapur", "Chandrapur", "चंद्रपूर", "nagpur", 395914, 64038, 50465, 240280, 1556, 75671, 596418, 66, 310, 31, 70192, 251264, T("Shahi strain of Nagpuri buffalo; Gond and Kolam farming; paddy and cotton near Tadoba forests.", "नागपुरी म्हशीचा शाही उपप्रकार; गोंड व कोलाम शेती; ताडोबालगत भात व कापूस.", "नागपुरी भैंस का शाही उपप्रकार; गोंड व कोलाम खेती; ताडोबा के पास धान व कपास।")),
  Dst("gadchiroli", "Gadchiroli", "गडचिरोली", "nagpur", 459471, 66259, 18605, 239587, 25210, 14190, 1004779, 56, 706, 57, 20410, 156606, T("Highest livestock per person (706 per 1,000) and largest pig share (15.7%); Madia Gond forest paddy, mahua and tendu; almost all poultry is backyard.", "दरडोई सर्वाधिक पशुधन (१,००० लोकांमागे ७०६) व सर्वाधिक डुकरे (१५.७%); माडिया गोंड वनभात, मोह व तेंदू; जवळपास सर्व कोंबड्या परसबागेत.", "प्रति व्यक्ति सर्वाधिक पशुधन (प्रति 1,000 पर 706) व सर्वाधिक सूअर (15.7%); माड़िया गोंड वन धान, महुआ व तेंदू; लगभग सभी मुर्गियाँ घरेलू।"))
];

const DIST_METRICS = ["livestock", "cattle", "buffalo", "goat", "sheep", "pig", "poultry", "dens", "per1k", "milk1k", "gddp", "pci"];

DISTRICTS.forEach(d => { d.livestock = d.cattle + d.buffalo + d.sheep + d.goat + d.pig; });


/* =====================================================================
   7. Heritage risk and additional statistics
   Every risk rating carries its basis. Three kinds of evidence are used:
     measured  — an official published figure with the change and period
     reported  — documented in research or official reporting, no series
     assessed  — our reading of the trend, stated as an assessment
   ===================================================================== */
const RISK_LEVELS = {
  expanding: { label: "Expanding", icon: "📈", rank: 1, text: "Area or numbers are growing." },
  stable:    { label: "Stable",    icon: "🟢", rank: 2, text: "Holding steady for now." },
  declining: { label: "Declining", icon: "🟡", rank: 3, text: "Clearly falling, still widely found." },
  rare:      { label: "Rare",      icon: "🟠", rank: 4, text: "Survives in pockets only." },
  critical:  { label: "Critical",  icon: "🔴", rank: 5, text: "Close to disappearing." },
  docneeded: { label: "Needs documentation", icon: "🔎", rank: 6, text: "Trend not measured; recording needed." }
};
const EVIDENCE = { measured: "Measured", reported: "Reported", assessed: "Assessment" };
/* [level, evidence, basis, source key] */
const CROP_RISK = {
  "Marvel grass": ["declining", "reported", "Native bund and commons grass lost as gairan land is encroached and ploughed."],
  "Kavath (wood apple)": ["rare", "assessed", "Village groves are shrinking and few new trees are planted."],
  "Dagad phool (stone flower)": ["docneeded", "assessed", "Gathered from Sahyadri rocks; no collection figures exist."],
  "Ghol (purslane)": ["stable", "assessed", "Comes up on its own after rain wherever fields are not sprayed."],
  "Tad (palmyra palm)": ["declining", "reported", "Tapping livelihoods have fallen and mature palms are being cut."],
  "Karanj": ["stable", "assessed", "Common on bunds and streambanks; interest revived for biodiesel."],
  "Kalbhat rice": ["rare", "reported", "Revived from near-disappearance by community seed banks in Akole."],
  "Jowar (sorghum)": ["critical", "measured", "Area fell 62.84 → 16.92 lakh ha (−73%), 1960-61 to 2024-25.", "esm2526"],
  "Maldandi jowar": ["rare", "assessed", "Rabi landrace jowar follows the state's overall jowar collapse; GI registration supports it.", "esm2526"],
  "Dagdi and Shalu jowar": ["rare", "assessed", "Local rabi types displaced by improved varieties as jowar area shrank."],
  "Hurda jowar": ["declining", "assessed", "Survives through winter hurda tourism rather than grain demand."],
  "Bajra (pearl millet)": ["critical", "measured", "Area fell 16.35 → 4.44 lakh ha (−73%), 1960-61 to 2024-25.", "esm2526"],
  "Nachni (finger millet)": ["declining", "reported", "Hill staple losing ground to rice and wage work, though millet missions have revived interest."],
  "Varai (small millet)": ["rare", "assessed", "Grown mainly by Sahyadri tribal households; little market outside fasting-food demand."],
  "Sava": ["rare", "assessed", "Small tribal-belt millet with almost no commercial market."],
  "Rala (foxtail millet)": ["rare", "assessed", "Once common across the Deccan, now confined to tribal and dryland pockets."],
  "Kodo millet": ["rare", "assessed", "Grown by Korku and Gond families in forest villages only."],
  "Kutki": ["rare", "assessed", "Forest-village millet with a shrinking growing area."],
  "Proso millet": ["rare", "assessed", "Minor crop retained in a few dryland pockets."],
  "Groundnut": ["critical", "measured", "Area fell 10.83 → 2.50 lakh ha (−77%), 1960-61 to 2024-25.", "esm2526"],
  "Kardai (safflower)": ["critical", "reported", "Once a major Maharashtra rabi oilseed; area has collapsed as farmers moved to gram and soybean."],
  "Karale (niger)": ["critical", "reported", "Tribal-belt oilseed in steep decline with very little market."],
  "Jawas (linseed)": ["rare", "reported", "Vidarbha rabi oilseed now sown on small patches."],
  "Til (sesame)": ["declining", "assessed", "Ancient oilseed reduced to small areas and festival demand."],
  "Castor": ["declining", "assessed", "Border crop that lost its role when lamp oil and cart grease were replaced."],
  "Desi cotton": ["rare", "reported", "Native Gossypium arboreum displaced by hybrids and Bt cotton, which cover most cotton area."],
  "Ambadi (kenaf)": ["rare", "assessed", "Fibre use replaced by plastic rope; survives as a leafy vegetable."],
  "Tag (sunn hemp)": ["declining", "assessed", "Kept as green manure, no longer grown for fibre."],
  "Khapli wheat (emmer)": ["rare", "reported", "Ancient hulled wheat surviving in Satara and Sangli, now recovering through health-food demand."],
  "Bansi wheat (durum)": ["declining", "assessed", "Traditional Deccan durum replaced by irrigated bread wheat."],
  "Barley": ["rare", "assessed", "The chief grain of the Rigveda is now a minor crop in Maharashtra."],
  "Ambemohar rice": ["declining", "reported", "Fragrant Pune landrace under pressure from higher-yielding varieties; GI registration supports it."],
  "Ajara Ghansal rice": ["rare", "reported", "Grown on a small area in Ajara taluka; sustained by GI and niche demand."],
  "Wada Kolam rice": ["declining", "reported", "Palghar landrace facing competition from mill-friendly varieties."],
  "Hill rice landraces": ["rare", "reported", "Dozens of Akole and Junnar landraces survive mainly through community seed banks."],
  "Salt-tolerant khar rice": ["critical", "reported", "Depends on khar bunds; abandonment of coastal reclamation threatens these varieties."],
  "Rayval and gavthi mangoes": ["declining", "assessed", "Seedling mango diversity is lost as orchards are replanted with grafted Alphonso and Kesar."],
  "Kulith (horse gram)": ["declining", "assessed", "Hardy hill pulse losing area to cash crops."],
  "Lakhori (grass pea)": ["declining", "reported", "Discouraged because of lathyrism; low-toxin varieties exist but the area has shrunk."],
  "Wal (field bean)": ["stable", "assessed", "Held up by strong Konkan food demand."],
  "Matki (moth bean)": ["stable", "assessed", "Retained for misal and drought reliability."],
  "Kartoli (spiny gourd)": ["docneeded", "assessed", "Gathered wild; no cultivation statistics exist."],
  "Mahua flowers": ["declining", "reported", "Collection continues but is limited by forest rules and falling tree numbers."],
  "Tendu": ["stable", "reported", "Still a major seasonal income under forest-rights arrangements."],
  "Charoli": ["declining", "reported", "Forest tree seed collection falling with forest degradation."],
  "Bamboo shoots": ["stable", "assessed", "Collected across forest districts under community forest rights."],
  "Soybean": ["expanding", "reported", "Now the leading kharif crop of Marathwada and western Vidarbha."],
  "Sugarcane": ["expanding", "reported", "Backed by the co-operative sugar industry and irrigation."],
  "Nashik grapes": ["expanding", "reported", "Export-linked, with GI protection."],
  "Solapur pomegranate": ["expanding", "reported", "A leading dryland cash crop."],
  "Jalgaon banana": ["expanding", "reported", "Tapi valley banana area supported by drip irrigation."],
  "Hybrid and Bt cotton": ["expanding", "measured", "All cotton rose 25.00 → 41.23 lakh ha since 1960-61, almost entirely hybrids and Bt.", "esm2526"],
  "Tur (pigeon pea)": ["expanding", "measured", "All pulses rose 23.49 → 49.87 lakh ha, 1960-61 to 2024-25.", "esm2526"],
  "Harbhara (chickpea)": ["expanding", "measured", "Part of the pulse area that more than doubled since 1960-61.", "esm2526"]
};
const BREED_RISK = {
  khillari: ["declining", "measured", "Draught breed: male indigenous cattle fell 67.80 → 47.71 lakh (−29.6%), 2012 to 2019.", "lc2019"],
  deoni: ["declining", "measured", "Indigenous and non-descript cattle fell 118.33 → 93.85 lakh (−20.7%), 2012 to 2019.", "lc2019"],
  "red-kandhari": ["declining", "measured", "Shares the fall in indigenous cattle, 2012 to 2019.", "lc2019"],
  dangi: ["declining", "measured", "Hill draught breed affected by the fall in working bullocks.", "lc2019"],
  gaolao: ["rare", "assessed", "A Vidarbha draught breed with a small, concentrated population as tractors replace bullocks."],
  "konkan-kapila": ["rare", "assessed", "Small hill cattle of the Konkan, kept in limited numbers for manure and hardiness."],
  kathani: ["rare", "assessed", "Recently registered eastern Vidarbha cattle with a small home tract."],
  pandharpuri: ["stable", "assessed", "Dairy demand keeps buffalo numbers steady; state buffaloes were 56.04 lakh in 2019.", "lc2019"],
  nagpuri: ["stable", "assessed", "Maintained for milk and draught in Vidarbha."],
  marathwadi: ["declining", "assessed", "Drought and fodder scarcity in Marathwada pressure the breed."],
  purnathadi: ["rare", "assessed", "A small population confined to the Purna river valley."],
  osmanabadi: ["expanding", "measured", "Goats rose 84.4 → 106.0 lakh in the state between 2012 and 2019.", "lc2019"],
  sangamneri: ["stable", "assessed", "Kept by farmers and herders in the Sangamner area as goat demand grows."],
  berari: ["stable", "assessed", "Vidarbha goat breed supported by meat demand."],
  "konkan-kanyal": ["rare", "assessed", "A distinctive Konkan goat with a small home tract."],
  deccani: ["declining", "reported", "Sheep numbers are 26.80 lakh, and coarse wool has lost its market to synthetic blankets.", "lc2019"],
  bhimthadi: ["critical", "measured", "Horses and ponies fell 37,287 → 18,892 (−49.3%), 2012 to 2019.", "lc2019"]
};
const HELPER_RISK = {
  "House sparrow": ["declining", "reported", "Widely reported declines in towns from loss of nesting spaces and insect food."],
  "Weaver ants": ["stable", "assessed", "Common in orchard trees where spraying is light."],
  "Working bullocks": ["declining", "measured", "Male indigenous cattle fell 67.80 → 47.71 lakh (−29.6%), 2012 to 2019.", "lc2019"],
  "Donkeys and mules": ["critical", "measured", "Donkeys fell 29,135 → 17,572 (−39.7%), 2012 to 2019.", "lc2019"],
  "Vultures": ["critical", "reported", "Indian vulture populations fell by more than 95% after diclofenac poisoning; veterinary use was banned in 2006."],
  "Indian pariah dog (INDog)": ["declining", "assessed", "Village dogs are being displaced by imported breeds, and free-ranging populations face conflict."],
  "Pashmi hound": ["rare", "assessed", "A small Deccan sighthound population with no organised conservation."],
  "Mudhol hound (Caravan hound)": ["stable", "reported", "Supported by a breeding centre and by Indian Army use."],
  "Shepherd dogs of the Dhangars": ["declining", "assessed", "Numbers follow the shrinking of migratory sheep herding."],
  "Barn owl": ["declining", "reported", "Loss of nesting sites, rodent poisons and superstition reduce numbers, despite proven rodent control."],
  "Indian rat snake (dhaman)": ["declining", "reported", "Killed on sight although non-venomous and a major rodent predator; protected by law."],
  "Indian honey bee": ["declining", "reported", "Pesticide exposure, disease and loss of flowering plants reduce colonies."],
  "Rock bee": ["declining", "reported", "Cliff and tree colonies fall with habitat loss and unsustainable honey harvesting."],
  "Earthworms": ["declining", "reported", "Chemical-intensive cultivation and loss of organic matter reduce earthworm numbers."],
  "Dung beetles": ["declining", "reported", "Fewer grazing animals and residues of deworming drugs affect populations."],
  "Frogs and toads": ["declining", "reported", "Pesticides and wetland loss reduce paddy-field amphibians."],
  "Tasar silkworm": ["rare", "assessed", "Forest-based rearing survives in a few Vidarbha districts."],
  "Lac insect": ["rare", "assessed", "Host trees and the skills to cultivate lac are both declining."],
  "Elephants": ["rare", "reported", "Very few captive elephants remain; wild herds are protected and limited to a few districts."],
  "Insect-eating bats": ["declining", "reported", "Roost destruction and pesticides reduce numbers despite their pest control value."],
  "Indian grey mongoose": ["declining", "reported", "Protected, but still trapped illegally for hair used in brushes."],
  "Backyard poultry": ["stable", "measured", "Backyard poultry remains a large share of Maharashtra's 74.30 million birds.", "lc2019"],
  "Ducks in paddy": ["rare", "assessed", "Rice–duck farming is rare in Maharashtra compared with the east and north-east."],
  "Domestic cat": ["stable", "assessed", "Farm cats remain common wherever grain is stored."]
};
const PRACTICE_RISK = {
  "Kadba stacking": ["declining", "assessed", "Falls with jowar area and the shift away from draught cattle."],
  "Measuring the rain (varshamana)": ["docneeded", "assessed", "Known from the Arthashastra; the practice itself is not in living use."],
  "Vermicompost": ["expanding", "reported", "Promoted by agricultural universities and natural-farming missions."],
  "Sheep and goat penning": ["declining", "assessed", "Depends on migratory flocks and on farmers willing to host them."],
  "Rab (burning on nursery beds)": ["declining", "reported", "Forest rules and labour scarcity reduce the practice."],
  "Kunapajala": ["critical", "assessed", "Known mainly from texts and a few research trials."],
  "Community seed banks": ["expanding", "reported", "Growing through farmer groups and the Biological Diversity Act."],
  "Storage with ash, neem and dung-plastered bins": ["declining", "assessed", "Replaced by sacks, plastic drums and market purchase of seed."],
  "Rabi on residual moisture": ["declining", "measured", "Tied to rabi jowar, whose area fell 73% since 1960-61.", "esm2526"],
  "Relay (utera) cropping": ["declining", "assessed", "Falls with the area of lathyrus and rice fallows."],
  "Nakshatra rain calendar": ["declining", "assessed", "Still widely quoted, but fewer young farmers use it for planning."],
  "Signs from nature": ["docneeded", "assessed", "Held by elders and rarely written down."],
  "Common grazing lands (gairan)": ["critical", "reported", "Village commons are being encroached and converted across the state."],
  "Ethno-veterinary care": ["docneeded", "assessed", "Remedies are being lost as herders age; systematic recording is needed."],
  "Mixed cropping": ["declining", "assessed", "Replaced by sole cropping of soybean and cotton."],
  "Beejamrut (seed treatment)": ["expanding", "reported", "Promoted under the National Mission on Natural Farming."],
  "Integrated crop–livestock farming": ["declining", "assessed", "Weakens as farms shed draught animals and buy inputs instead."]
};
const riskOf = (map, key) => { const r = map[key]; return r ? { level: r[0], evidence: r[1], basis: r[2], src: r[3] } : null; };
/* Rule-based fallback, clearly labelled as an assessment in the interface */
function cropRisk(c) {
  const r = riskOf(CROP_RISK, c.name); if (r) return r;
  if (c.flags.includes("wild")) return { level: "docneeded", evidence: "assessed", basis: "Gathered from the wild; no cultivation figures are collected." };
  if (c.flags.includes("land")) return { level: "declining", evidence: "assessed", basis: "Traditional landrace under pressure from improved varieties." };
  if (c.flags.includes("GI")) return { level: "stable", evidence: "assessed", basis: "Geographical Indication registration supports its market." };
  return { level: "stable", evidence: "assessed", basis: "Widely grown; no evidence of decline." };
}
const riskBadge = r => r ? `<span class="rbadge r-${r.level}" title="${esc(EVIDENCE[r.evidence])}: ${esc(r.basis)}">${RISK_LEVELS[r.level].icon} ${esc(RISK_LEVELS[r.level].label)}</span>` : "";

/* National context — 20th Livestock Census, 2019 (India totals, change over 2012) */
const INDIA_LIVESTOCK = [
  ["Total livestock", "536.76 million", "+4.6%"],
  ["Cattle", "193.46 million", "+0.8%"],
  ["Buffalo", "109.85 million", "+1.0%"],
  ["Goat", "148.88 million", "+10.1%"],
  ["Sheep", "74.26 million", "+14.1%"],
  ["Pig", "9.06 million", "−12.0%"],
  ["Poultry", "851.81 million", "+16.8%"]
];

/* =====================================================================
   8. Voice and video archive
   People can record a voice note in the browser, attach an audio or video
   file, or paste a YouTube link. Entries are saved on the visitor's own
   device (localStorage) and can be exported as a file for the project.
   Recordings and files never leave the device on their own.
   ===================================================================== */
const ARCHIVE_KEY = "kv-archive";
/* Starter cards. These open a YouTube search for the topic, so no video
   link is invented here; the archive fills up with what people add. */
const ARCHIVE_SEED = [
  { seed: true, kind: "topic", title: "Bail Pola — the bullock festival", who: "Open call", place: "Vidarbha & Marathwada", topic: "Festival", q: "Bail Pola festival Maharashtra bullock" },
  { seed: true, kind: "topic", title: "Dhangar shepherds on migration", who: "Open call", place: "Western Maharashtra", topic: "Pastoral knowledge", q: "Dhangar shepherd migration Maharashtra sheep" },
  { seed: true, kind: "topic", title: "Phad irrigation on the Panjhara", who: "Open call", place: "Dhule & Nashik", topic: "Water system", q: "phad irrigation system Maharashtra bandhara" },
  { seed: true, kind: "topic", title: "Warli painting and the harvest", who: "Open call", place: "Palghar", topic: "Culture", q: "Warli painting harvest tarpa dance" },
  { seed: true, kind: "topic", title: "Seed keepers of Akole", who: "Open call", place: "Ahilyanagar", topic: "Seed conservation", q: "Rahibai Popere seed mother Akole" },
  { seed: true, kind: "topic", title: "Hurda in the winter fields", who: "Open call", place: "Pune & Solapur", topic: "Food tradition", q: "hurda party jowar Maharashtra farm" }
];
function ytId(url) {
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}
const loadArchive = () => { try { return JSON.parse(localStorage.getItem(ARCHIVE_KEY) || "[]"); } catch (e) { return []; } };
const saveArchive = list => { try { localStorage.setItem(ARCHIVE_KEY, JSON.stringify(list)); } catch (e) {} };

/* =====================================================================
   9. Illustrations
   Every record is illustrated by an SVG drawn in the browser from the
   record's own name, so each one is unique, nothing is fetched from the
   internet and the site works entirely offline.
   ===================================================================== */
const ART_THEMES = {
  field:   { sky: ["#fbe9b8", "#f3cf72"], land: ["#6f9c45", "#3c6a2c"], sun: "#e8a33d" },
  earth:   { sky: ["#f6ddbd", "#e7b98a"], land: ["#a9703f", "#6d4422"], sun: "#d9822b" },
  soil:    { sky: ["#f2dcc4", "#dfb894"], land: ["#8a5a33", "#54331b"], sun: "#c97b2c" },
  water:   { sky: ["#d7f0f6", "#a5d9e6"], land: ["#2f8fa3", "#1b5f70"], sun: "#7fd0e0" },
  hill:    { sky: ["#e4eef7", "#bcd4e6"], land: ["#5f8a6a", "#33563f"], sun: "#f0d49a" },
  leaf:    { sky: ["#e8f5d8", "#c9e6a8"], land: ["#4b8f42", "#2a5c2a"], sun: "#9ed36b" },
  forest:  { sky: ["#dcecd2", "#b3d6a4"], land: ["#356b3d", "#1e4527"], sun: "#7fb96a" },
  dusk:    { sky: ["#f7d6a8", "#d98e5a"], land: ["#6a4b3a", "#3c2a22"], sun: "#f0a04b" },
  festive: { sky: ["#fde3c0", "#f6c177"], land: ["#b5542d", "#7a3319"], sun: "#ffd166" },
  sun:     { sky: ["#fdeec2", "#f6cf8a"], land: ["#c08a2e", "#8a5f18"], sun: "#f2b544" },
  night:   { sky: ["#dfe3f5", "#aab3dd"], land: ["#3b4477", "#232a52"], sun: "#f3e2a8" },
  stone:   { sky: ["#eeeae0", "#d6cfbe"], land: ["#8e8676", "#5d564a"], sun: "#cbbf9f" }
};
/* The same subject always produces the same picture, and different
   subjects get different skies, hills and furrows. */
function artURI(emoji, theme = "field", extras = [], seed = "") {
  const p = ART_THEMES[theme] || ART_THEMES.field;
  const h = Math.abs([...(emoji + theme + seed)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7));
  const id = "g" + h % 99999, sx = 286 + h % 46, sy = 44 + h % 26, r = 24 + h % 14;
  const a1 = 96 + h % 22, a2 = 112 + (h >> 3) % 20, a3 = 124 + (h >> 5) % 18;
  const furrows = Array.from({ length: 5 }, (_, i) =>
    `<path d="M0 ${150 + i * 18} Q 200 ${138 + i * 18 + (h % 9)} 400 ${152 + i * 18}" stroke="rgba(255,255,255,.18)" stroke-width="2" fill="none"/>`).join("");
  const ex = (extras || []).slice(0, 2).map((e, i) => `<text x="${i ? 352 : 48}" y="${i ? 76 : 96}" font-size="30" text-anchor="middle" opacity=".85">${e}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240" role="img">
<defs><linearGradient id="s${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset="1" stop-color="${p.sky[1]}"/></linearGradient>
<linearGradient id="l${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.land[0]}"/><stop offset="1" stop-color="${p.land[1]}"/></linearGradient></defs>
<rect width="400" height="240" fill="url(#s${id})"/>
<circle cx="${sx}" cy="${sy}" r="${r}" fill="${p.sun}" opacity=".75"/>
<path d="M0 132 Q 70 ${a1} 140 ${a3} T 268 ${a2} T 400 136 V240 H0 Z" fill="url(#l${id})"/>
<path d="M0 132 Q 70 ${a1} 140 ${a3} T 268 ${a2} T 400 136" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
${furrows}${ex}
<text x="200" y="128" font-size="86" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
const thumb = (emoji, theme, extras, seed) => `<img class="thumb" src="${artURI(emoji, theme, extras, seed)}" alt="" loading="lazy" decoding="async">`;
const artOf = (a, seed) => Array.isArray(a) ? thumb(a[0], a[1], a[2] || [], seed) : "";
/* Kept so every renderer can ask for a picture the same way */
const photoThumb = (key, emoji, theme, seed, extras) => thumb(emoji || "🌾", theme || "field", extras || [], seed || key);
/* Subject symbols */
const EMBLEM = [[/rice|paddy|kolam|ghansal|ambemohar|kalbhat|indrayani/i, "🌾"], [/wheat|barley|khapli|bansi/i, "🌾"], [/maize|corn/i, "🌽"], [/jowar|sorghum|bajra|millet|nachni|varai|rala|kodo|kutki|sava/i, "🌾"],
 [/tur|gram|mung|udid|matki|kulith|chavli|wal|pavta|ghevada|ghevda|masoor|lakhori|watana|soybean|bean|pulse/i, "🫘"], [/groundnut|sesame|til\b|safflower|niger|linseed|sunflower|castor|mustard|karanj/i, "🌻"],
 [/cotton|hemp|ambadi|kenaf|fibre|marvel grass/i, "🧵"], [/onion/i, "🧅"], [/garlic/i, "🧄"], [/brinjal|bharit/i, "🍆"], [/chilli|mirchi/i, "🌶️"], [/pumpkin|bhopla/i, "🎃"], [/gourd|karle|kartoli|ghosale|dodka|padwal|dudhi/i, "🥒"],
 [/cucumber|kakdi/i, "🥒"], [/methi|chuka|chakwat|amaranth|rajgira|leafy|greens|tarota|kurdu|shevla|bharangi|kavla|shepu|ghol|alu\b|colocasia/i, "🥬"], [/potato|ratale|suran|yam/i, "🍠"], [/drumstick|shevga|neem|babhul|bel\b/i, "🌿"],
 [/mango|hapus|alphonso|kesar|rayval/i, "🥭"], [/banana|kela/i, "🍌"], [/coconut|naral|palm|tad\b/i, "🥥"], [/cashew|charoli/i, "🌰"], [/grape|raisin|bedana/i, "🍇"], [/pomegranate|dalimb/i, "🍎"], [/orange|mosambi|santra|citrus|lemon/i, "🍊"],
 [/strawberry/i, "🍓"], [/guava|peru|custard|sitaphal|chikoo|sapota|fig|anjir|jamun|bor|jujube|karvand|amla|tamarind|kokum|jackfruit|phanas|ranmeva|mahua|tendu|kavath/i, "🍈"],
 [/turmeric|halad|ginger|coriander|pepper|jaggery|spice|dagad/i, "🫚"], [/sugarcane|\bus\b/i, "🎋"], [/areca|betel|bamboo/i, "🎋"],
 [/dog|hound|pariah|pashmi|mudhol|gaddi|bakharwal|rajapalayam/i, "🐕"], [/\bcat\b/i, "🐈"], [/owl/i, "🦉"], [/drongo|myna|egret|crow|kite|sparrow|roller|bee-eater|hoopoe|heron|bird/i, "🐦"], [/vulture/i, "🦅"], [/snake|dhaman/i, "🐍"], [/frog|toad/i, "🐸"],
 [/bat\b|bats/i, "🦇"], [/mongoose|monitor|lizard/i, "🦎"], [/ladybird|beetle|trichogramma|dragonfly|wasp|weaver ant/i, "🐞"], [/spider/i, "🕷️"], [/bee\b|bees|honey/i, "🐝"], [/earthworm|worm/i, "🪱"], [/ant|termite/i, "🐜"],
 [/silkworm|lac insect/i, "🐛"], [/fish|paddies/i, "🐟"], [/duck/i, "🦆"], [/poultry|hen|chicken/i, "🐓"], [/bullock|buffalo|redya|bull/i, "🐂"], [/donkey|mule/i, "🫏"], [/elephant/i, "🐘"],
 [/sheep|mendh/i, "🐑"], [/goat/i, "🐐"], [/horse|pony/i, "🐎"], [/camel/i, "🐪"], [/yak|mithun/i, "🐂"], [/pig\b|pigs/i, "🐖"], [/cattle|cow|gir|sahiwal|ongole|kankrej/i, "🐄"]];
const emblem = (name, fallback) => (EMBLEM.find(([re]) => re.test(name)) || [, fallback])[1];
const CROP_ART = { cereal: ["🌾", "field"], millet: ["🌾", "sun"], pulse: ["🫘", "soil"], oilseed: ["🌻", "sun"], fibre: ["🧵", "stone"], vegetable: ["🥬", "leaf"], wild: ["🌿", "forest"], fruit: ["🥭", "dusk"], spice: ["🌶️", "earth"], plantation: ["🥥", "forest"] };
const PRAC_ART = { soil: ["🪱", "soil"], seed: ["🫘", "earth"], cropping: ["🌾", "field"], pest: ["🐞", "leaf"], water: ["💧", "water"], weather: ["🌦️", "hill"], animal: ["🐄", "dusk"] };
const SPECIES_ART = { cattle: ["🐄", "field"], buffalo: ["🐃", "water"], goat: ["🐐", "hill"], sheep: ["🐑", "hill"], horse: ["🐎", "dusk"], camel: ["🐪", "sun"], donkey: ["🫏", "stone"], yak: ["🐂", "night"], mithun: ["🐂", "forest"], pig: ["🐖", "forest"], poultry: ["🐓", "earth"], duck: ["🦆", "water"] };
const HELPER_ART = { guard: ["🐕", "dusk"], pest: ["🦉", "night"], pollinator: ["🐝", "leaf"], soil: ["🪱", "soil"], livelihood: ["🐟", "water"], transport: ["🐂", "earth"], cleaner: ["🦅", "stone"] };
const COMM_ART = { farming: "field", coastal: "water", pastoral: "hill", tribal: "forest", artisan: "earth", performer: "festive" };

/* =====================================================================
   KRISHIVIDYA — application
   Depends on: data-history.js (T, D helpers), data-knowledge.js,
   data-crops.js, data-animals.js, data-communities.js, data-maharashtra.js
   ===================================================================== */
"use strict";

/* ---------- 1. Interface text (English, Marathi, Hindi) ---------- */
const UI = {
  "nav.home": ["Home", "मुख्यपृष्ठ", "मुखपृष्ठ"], "nav.history": ["History", "इतिहास", "इतिहास"], "nav.texts": ["Texts", "ग्रंथ", "ग्रंथ"],
  "nav.water": ["Water & Rivers", "पाणी व नद्या", "जल व नदियाँ"], "nav.practices": ["Practices", "पद्धती", "पद्धतियाँ"], "nav.crops": ["Crops", "पिके", "फसलें"],
  "nav.animals": ["Animals", "पशुधन", "पशुधन"], "nav.communities": ["Communities", "समुदाय", "समुदाय"], "nav.mh": ["Maharashtra Data", "महाराष्ट्र आकडेवारी", "महाराष्ट्र आँकड़े"],
  "nav.sources": ["Sources", "स्रोत", "स्रोत"], "nav.contribute": ["Contribute", "योगदान द्या", "योगदान दें"],
  "hero.eyebrow": ["An open archive of Indian indigenous knowledge", "भारतीय पारंपरिक ज्ञानाचा मुक्त संग्रह", "भारतीय पारंपरिक ज्ञान का मुक्त संग्रह"],
  "hero.motto": ["Preserving India's indigenous knowledge of land, water and animals — from the Vedas to 2026.", "वेदकाळापासून २०२६ पर्यंत — भारताच्या माती, पाणी आणि पशुधनाविषयीच्या पारंपरिक ज्ञानाचे जतन.", "वेदों से 2026 तक — भारत की मिट्टी, जल और पशुधन से जुड़े पारंपरिक ज्ञान का संरक्षण।"],
  "hero.sub": ["KRISHIVIDYA brings together the farming, animal-husbandry and water wisdom of India's communities, the classical texts that recorded it, and the official data that shows how it is changing. Every entry names its source.", "कृषिविद्या भारतातील समुदायांचे शेती, पशुपालन व जलव्यवस्थापनाचे ज्ञान, ते नोंदवणारे प्राचीन ग्रंथ आणि त्यातील बदल दाखवणारी अधिकृत आकडेवारी एकत्र आणते. प्रत्येक नोंदीसोबत तिचा स्रोत दिला आहे.", "कृषिविद्या भारत के समुदायों के कृषि, पशुपालन और जल ज्ञान, उसे दर्ज करने वाले प्राचीन ग्रंथों और उसमें हो रहे बदलावों को दिखाने वाले आधिकारिक आँकड़ों को एक साथ लाती है। हर प्रविष्टि के साथ उसका स्रोत दिया गया है।"],
  "hero.quote": ["“Play not with dice; cultivate your field.” — Rigveda 10.34.13", "“जुगार खेळू नकोस; शेती कर.” — ऋग्वेद १०.३४.१३", "“जुआ मत खेलो; खेती करो।” — ऋग्वेद 10.34.13"],
  "hero.explore": ["Start exploring", "शोध सुरू करा", "खोज शुरू करें"], "hero.search": ["Search the archive", "संग्रहात शोधा", "संग्रह में खोजें"],
  "stat.records": ["knowledge records", "ज्ञान नोंदी", "ज्ञान प्रविष्टियाँ"], "stat.years": ["years of history", "वर्षांचा इतिहास", "वर्षों का इतिहास"],
  "stat.crops": ["crops and varieties", "पिके व वाण", "फसलें व किस्में"], "stat.animals": ["breeds and helper animals", "जाती व उपयुक्त प्राणी", "नस्लें व सहायक जीव"],
  "stat.comms": ["community profiles", "समुदाय परिचय", "समुदाय परिचय"], "stat.districts": ["districts with official data", "अधिकृत आकडेवारीसह जिल्हे", "आधिकारिक आँकड़ों सहित ज़िले"],
  "about.title": ["Why KRISHIVIDYA exists", "कृषिविद्या का?", "कृषिविद्या क्यों?"],
  "about.p1": ["For thousands of years, Indian farmers, herders and fishers have developed knowledge about seeds, soils, rain, rivers and animals. Most of it was never written down. It passed from parent to child in the field, in songs and in proverbs.", "हजारो वर्षांपासून भारतीय शेतकरी, पशुपालक व मच्छीमारांनी बियाणे, माती, पाऊस, नद्या आणि जनावरांविषयी ज्ञान विकसित केले. त्यातील बहुतांश कधीच लिहिले गेले नाही; ते शेतात, गाण्यांत आणि म्हणींतून पिढ्यान्‌पिढ्या पुढे गेले.", "हज़ारों वर्षों से भारतीय किसानों, पशुपालकों और मछुआरों ने बीज, मिट्टी, वर्षा, नदियों और पशुओं के बारे में ज्ञान विकसित किया है। इसका अधिकांश भाग कभी लिखा नहीं गया; यह खेतों, गीतों और कहावतों के माध्यम से पीढ़ी-दर-पीढ़ी आगे बढ़ा।"],
  "about.p2": ["That knowledge is disappearing quickly. In Maharashtra alone, the area under jowar has fallen by almost three-quarters since 1960, and the number of working bullocks fell by nearly a third between 2012 and 2019. KRISHIVIDYA records what remains, checks it against evidence, and makes it free for everyone to use.", "हे ज्ञान झपाट्याने लोप पावत आहे. केवळ महाराष्ट्रात १९६० पासून ज्वारीचे क्षेत्र जवळपास तीन-चतुर्थांशाने घटले, आणि २०१२ ते २०१९ दरम्यान कामाच्या बैलांची संख्या सुमारे एक-तृतीयांशाने कमी झाली. कृषिविद्या जे शिल्लक आहे त्याची नोंद करते, पुराव्यांशी पडताळते आणि सर्वांसाठी मोफत उपलब्ध करते.", "यह ज्ञान तेज़ी से लुप्त हो रहा है। केवल महाराष्ट्र में 1960 से ज्वार का क्षेत्र लगभग तीन-चौथाई घट गया है, और 2012 से 2019 के बीच काम करने वाले बैलों की संख्या लगभग एक-तिहाई कम हुई। कृषिविद्या जो शेष है उसे दर्ज करती है, प्रमाणों से जाँचती है और सभी के लिए निःशुल्क उपलब्ध कराती है।"],
  "motto.label": ["Our motto", "आमचे ब्रीदवाक्य", "हमारा ध्येय वाक्य"],
  "obj.title": ["Our objectives", "आमची उद्दिष्टे", "हमारे उद्देश्य"],
  "obj.1": ["Preserve the indigenous knowledge of India's farmers, herders, fishers and forest communities before it is lost.", "भारतातील शेतकरी, पशुपालक, मच्छीमार व वनवासी समुदायांचे पारंपरिक ज्ञान लोप पावण्यापूर्वी जतन करणे.", "भारत के किसानों, पशुपालकों, मछुआरों और वनवासी समुदायों के पारंपरिक ज्ञान को लुप्त होने से पहले संरक्षित करना।"],
  "obj.2": ["Trace that knowledge through history, from the Vedas and classical treatises to present-day policy.", "वेद व प्राचीन ग्रंथांपासून आजच्या धोरणांपर्यंत या ज्ञानाचा ऐतिहासिक मागोवा घेणे.", "वेदों और प्राचीन ग्रंथों से लेकर आज की नीतियों तक इस ज्ञान का ऐतिहासिक क्रम प्रस्तुत करना।"],
  "obj.3": ["Separate what tradition records from what science has confirmed, so that users can judge each practice fairly.", "परंपरेतील नोंदी आणि विज्ञानाने सिद्ध केलेल्या गोष्टी वेगळ्या दाखवणे, जेणेकरून प्रत्येक पद्धतीचे योग्य मूल्यमापन करता येईल.", "परंपरा में दर्ज बातों और विज्ञान द्वारा प्रमाणित बातों को अलग दिखाना, ताकि हर पद्धति का उचित मूल्यांकन हो सके।"],
  "obj.4": ["Document every community of Maharashtra as the owner of its knowledge, with consent, credit and benefit sharing.", "महाराष्ट्रातील प्रत्येक समुदायाला त्याच्या ज्ञानाचा मालक मानून, संमती, श्रेय व लाभवाटपासह नोंद करणे.", "महाराष्ट्र के हर समुदाय को उसके ज्ञान का स्वामी मानते हुए सहमति, श्रेय और लाभ-साझेदारी के साथ दर्ज करना।"],
  "obj.5": ["Conserve indigenous crop varieties and animal breeds by showing where they survive and how fast they are declining.", "पारंपरिक पीकवाण व पशुजाती कुठे टिकून आहेत आणि किती वेगाने घटत आहेत हे दाखवून त्यांचे संवर्धन करणे.", "पारंपरिक फसल किस्में और पशु नस्लें कहाँ बची हैं और कितनी तेज़ी से घट रही हैं, यह दिखाकर उनका संरक्षण करना।"],
  "obj.6": ["Give students, researchers and planners one reliable, free and searchable source.", "विद्यार्थी, संशोधक व नियोजनकर्त्यांना एकच विश्वासार्ह, मोफत व शोधता येणारा स्रोत देणे.", "छात्रों, शोधकर्ताओं और योजनाकारों को एक विश्वसनीय, निःशुल्क और खोजने योग्य स्रोत देना।"],
  "obj.7": ["Link traditional knowledge to today's schemes and markets, so that it can support livelihoods.", "पारंपरिक ज्ञानाला आजच्या योजना व बाजारपेठांशी जोडून उपजीविकेला आधार देणे.", "पारंपरिक ज्ञान को आज की योजनाओं और बाज़ारों से जोड़कर आजीविका को सहारा देना।"],
  "obj.8": ["Learn from low-cost, climate-resilient practices that matter most to India's small farmers.", "भारतातील लहान शेतकऱ्यांसाठी महत्त्वाच्या कमी खर्चाच्या व हवामान-सक्षम पद्धतींमधून शिकणे.", "भारत के छोटे किसानों के लिए महत्वपूर्ण कम लागत और जलवायु-सक्षम पद्धतियों से सीखना।"],
  "sec.history": ["Ten thousand years of Indian farming", "भारतीय शेतीची दहा हजार वर्षे", "भारतीय खेती के दस हज़ार वर्ष"],
  "sec.history.sub": ["From the first fields at Mehrgarh to the natural-farming mission of 2024. Each event is tagged by the kind of evidence behind it.", "मेहरगढच्या पहिल्या शेतांपासून २०२४ च्या नैसर्गिक शेती अभियानापर्यंत. प्रत्येक घटनेसोबत तिच्या पुराव्याचा प्रकार दिला आहे.", "मेहरगढ़ के पहले खेतों से 2024 के प्राकृतिक खेती मिशन तक। हर घटना के साथ उसके प्रमाण का प्रकार दिया गया है।"],
  "sec.texts": ["The classical texts", "प्राचीन ग्रंथ", "प्राचीन ग्रंथ"],
  "sec.texts.sub": ["The Vedas, treatises and regional classics that recorded India's knowledge of farming, animals and water.", "भारताचे शेती, पशुधन व पाणी यांविषयीचे ज्ञान नोंदवणारे वेद, शास्त्रग्रंथ आणि प्रादेशिक अभिजात ग्रंथ.", "भारत के कृषि, पशुधन और जल ज्ञान को दर्ज करने वाले वेद, शास्त्र और क्षेत्रीय ग्रंथ।"],
  "sec.water": ["Water and rivers", "पाणी आणि नद्या", "जल और नदियाँ"],
  "sec.water.sub": ["How communities across India captured, shared and lifted water, and what Maharashtra's rivers mean to its farmers.", "भारतभरातील समुदायांनी पाणी कसे साठवले, वाटले व उपसले, आणि महाराष्ट्राच्या नद्यांचे शेतकऱ्यांसाठी महत्त्व.", "भारत भर के समुदायों ने पानी कैसे संग्रहित, साझा और उठाया, और महाराष्ट्र की नदियों का किसानों के लिए महत्व।"],
  "sec.practices": ["Indigenous practices", "पारंपरिक पद्धती", "पारंपरिक पद्धतियाँ"],
  "sec.practices.sub": ["Methods for soil, seed, crops, pests, water, weather and animals, each marked by how far science supports it.", "माती, बियाणे, पिके, कीड, पाणी, हवामान व जनावरे यांसाठीच्या पद्धती — प्रत्येकीला विज्ञानाचा किती आधार आहे हे दर्शवलेले.", "मिट्टी, बीज, फसल, कीट, जल, मौसम और पशुओं से जुड़ी पद्धतियाँ — हर एक पर विज्ञान का कितना समर्थन है, यह दर्शाया गया है।"],
  "sec.calendar": ["The farmer's calendar", "शेतकऱ्याची दिनदर्शिका", "किसान का पंचांग"],
  "sec.crops": ["Crops and varieties", "पिके आणि वाण", "फसलें और किस्में"],
  "sec.crops.sub": ["Cereals, millets, pulses, oilseeds, vegetables, forest greens, fruits and spices, with Maharashtra's landraces and GI-registered produce.", "तृणधान्ये, कडधान्ये, तेलबिया, भाज्या, रानभाज्या, फळे व मसाले — महाराष्ट्रातील गावरान वाण व GI नोंदणीकृत उत्पादनांसह.", "अनाज, मोटे अनाज, दलहन, तिलहन, सब्ज़ियाँ, वन साग, फल और मसाले — महाराष्ट्र की देसी किस्मों और GI पंजीकृत उत्पादों सहित।"],
  "sec.animals": ["Animals of Indian farming", "भारतीय शेतीतील प्राणी", "भारतीय खेती के पशु"],
  "sec.animals.sub": ["Maharashtra's registered breeds, notable breeds from across India, and the dogs, cats, bees, birds and other creatures that help farmers.", "महाराष्ट्रातील नोंदणीकृत जाती, भारतभरातील महत्त्वाच्या जाती, आणि शेतकऱ्यांना मदत करणारे कुत्रे, मांजरी, मधमाश्या, पक्षी व इतर जीव.", "महाराष्ट्र की पंजीकृत नस्लें, भारत भर की प्रमुख नस्लें, और किसानों की मदद करने वाले कुत्ते, बिल्लियाँ, मधुमक्खियाँ, पक्षी व अन्य जीव।"],
  "sec.communities": ["Communities of Maharashtra", "महाराष्ट्रातील समुदाय", "महाराष्ट्र के समुदाय"],
  "sec.communities.sub": ["How each community farms, keeps animals and manages land and water, described in detail and in its own context.", "प्रत्येक समुदाय शेती कशी करतो, जनावरे कशी पाळतो आणि जमीन व पाण्याचे व्यवस्थापन कसे करतो — सविस्तर आणि त्याच्या संदर्भात.", "हर समुदाय कैसे खेती करता है, पशु पालता है और भूमि व जल का प्रबंधन करता है — विस्तार से और उसके संदर्भ में।"],
  "sec.mh": ["Maharashtra in numbers", "आकड्यांतील महाराष्ट्र", "आँकड़ों में महाराष्ट्र"],
  "sec.mh.sub": ["Official livestock, poultry and income data for every district, long-term trends and measured declines.", "प्रत्येक जिल्ह्याची अधिकृत पशुधन, कुक्कुट व उत्पन्न आकडेवारी, दीर्घकालीन कल आणि मोजलेली घट.", "हर ज़िले के आधिकारिक पशुधन, मुर्गी और आय आँकड़े, दीर्घकालिक रुझान और मापी गई गिरावट।"],
  "sec.sources": ["Sources and method", "स्रोत व पद्धत", "स्रोत और पद्धति"],
  "sec.contribute": ["Share what you know", "आपले ज्ञान सांगा", "अपना ज्ञान साझा करें"],
  "ui.all": ["All", "सर्व", "सभी"], "ui.results": ["results", "नोंदी", "परिणाम"], "ui.search": ["Search", "शोधा", "खोजें"], "ui.close": ["Close", "बंद करा", "बंद करें"],
  "ui.mhOnly": ["Maharashtra only", "फक्त महाराष्ट्र", "केवल महाराष्ट्र"], "ui.none": ["Nothing matches your search yet.", "आपल्या शोधाशी जुळणारे काही आढळले नाही.", "आपकी खोज से मेल खाता कुछ नहीं मिला।"],
  "ui.details": ["Read more", "अधिक वाचा", "और पढ़ें"], "ui.open": ["Open source", "स्रोत उघडा", "स्रोत खोलें"], "ui.searchPh": ["Search crops, texts, animals, communities, districts…", "पिके, ग्रंथ, पशू, समुदाय, जिल्हे शोधा…", "फसलें, ग्रंथ, पशु, समुदाय, ज़िले खोजें…"],
  "ui.filterPh": ["Filter this section…", "या विभागात शोधा…", "इस भाग में खोजें…"], "ui.theme": ["Switch theme", "थीम बदला", "थीम बदलें"],
  "ui.englishNote": ["Detailed entries are written in English with Marathi, Hindi and Sanskrit terms. Full translations are in progress.", "सविस्तर नोंदी इंग्रजीत असून त्यांत मराठी, हिंदी व संस्कृत संज्ञा दिल्या आहेत. पूर्ण भाषांतर सुरू आहे.", "विस्तृत प्रविष्टियाँ अंग्रेज़ी में हैं और उनमें मराठी, हिंदी व संस्कृत शब्द दिए गए हैं। पूर्ण अनुवाद जारी है।"],
  "tag.archaeology": ["Archaeology", "पुरातत्त्व", "पुरातत्व"], "tag.text": ["Classical text", "प्राचीन ग्रंथ", "प्राचीन ग्रंथ"], "tag.history": ["Historical record", "ऐतिहासिक नोंद", "ऐतिहासिक अभिलेख"],
  "tag.policy": ["Policy & census", "धोरण व गणना", "नीति व गणना"], "tag.science": ["Science", "विज्ञान", "विज्ञान"],
  "st.validated": ["Supported by research", "संशोधनाने सिद्ध", "शोध से प्रमाणित"], "st.studied": ["Under study", "अभ्यास सुरू", "अध्ययन जारी"], "st.heritage": ["Heritage record", "वारसा नोंद", "विरासत अभिलेख"],
  "an.mh": ["Maharashtra's registered breeds", "महाराष्ट्रातील नोंदणीकृत जाती", "महाराष्ट्र की पंजीकृत नस्लें"], "an.india": ["Breeds across India", "भारतभरातील जाती", "भारत भर की नस्लें"], "an.helpers": ["Farmers' helpers", "शेतकऱ्यांचे मित्र", "किसानों के मित्र"],
  "cal.stars": ["Rain stars (nakshatras)", "पावसाची नक्षत्रे", "वर्षा नक्षत्र"], "cal.seasons": ["The six seasons (ritus)", "सहा ऋतू", "छह ऋतुएँ"], "cal.fest": ["Festivals of the farming year", "शेती वर्षातील सण", "कृषि वर्ष के त्योहार"], "cal.sayings": ["Words of wisdom", "ज्ञानवचने", "ज्ञान वचन"],
  "mh.districts": ["District explorer", "जिल्हा दर्शिका", "ज़िला दर्शिका"], "mh.rank": ["Rank by", "क्रमवारी", "क्रम आधार"], "mh.compare": ["Compare two districts", "दोन जिल्ह्यांची तुलना", "दो ज़िलों की तुलना"],
  "mh.csv": ["Download CSV", "CSV डाउनलोड", "CSV डाउनलोड"], "mh.trends": ["Long-term trends", "दीर्घकालीन कल", "दीर्घकालिक रुझान"], "mh.risk": ["Measured declines", "मोजलेली घट", "मापी गई गिरावट"],
  "mh.facts": ["Key facts, 2024-26", "महत्त्वाची तथ्ये, २०२४-२६", "प्रमुख तथ्य, 2024-26"], "mh.note": ["Livestock figures come from the 20th Livestock Census (2019), the latest published count; results of the 21st census were not yet available. Mumbai City and Suburban are reported together, and Palghar's GDDP is included in Thane's.", "पशुधनाचे आकडे २० व्या पशुगणनेचे (२०१९) — प्रकाशित झालेली नवीनतम गणना; २१ व्या गणनेचे निकाल अद्याप उपलब्ध नाहीत. मुंबई शहर व उपनगराची एकत्रित नोंद आहे आणि पालघरचे GDDP ठाण्यात समाविष्ट आहे.", "पशुधन आँकड़े 20वीं पशुधन गणना (2019) के हैं — नवीनतम प्रकाशित गणना; 21वीं गणना के परिणाम अभी उपलब्ध नहीं हैं। मुंबई शहर व उपनगर संयुक्त दर्ज हैं और पालघर का GDDP ठाणे में शामिल है।"], "nav.photosShort": ["Photos", "छायाचित्रे", "तस्वीरें"], "ph.failed": ["some could not be reached — check the connection", "काही मिळवता आली नाहीत — जोडणी तपासा", "कुछ नहीं मिल सकीं — कनेक्शन जाँचें"], "ph.clear": ["Clear stored photographs", "साठवलेली छायाचित्रे हटवा", "सहेजी तस्वीरें हटाएँ"], "ph.haveNote": ["Shown with photographer and licence.", "छायाचित्रकार व परवान्यासह दाखवलेली.", "फ़ोटोग्राफ़र व लाइसेंस सहित दिखाई गई।"], "ph.artNote": ["Fetched from Commons as you scroll, or all at once.", "स्क्रोल करताना किंवा एकदाच कॉमन्सवरून आणली जातात.", "स्क्रॉल करते समय या एक बार में कॉमन्स से लाई जाती हैं।"], "ph.addedNote": ["Export them to send to the project team.", "प्रकल्प चमूला पाठवण्यासाठी निर्यात करा.", "परियोजना दल को भेजने के लिए निर्यात करें।"], "ph.action": ["Add or find", "जोडा किंवा शोधा", "जोड़ें या खोजें"], "ph.find": ["Find on Wikimedia Commons", "विकिमीडिया कॉमन्सवर शोधा", "विकिमीडिया कॉमन्स पर खोजें"], "ph.replace": ["Replace", "बदला", "बदलें"], "ph.page": ["Link to the file or source page", "फाईल किंवा स्रोत पानाचा दुवा", "फ़ाइल या स्रोत पृष्ठ का लिंक"], "ph.saved": ["Saved. The photograph now appears on that record and in the credits.", "जतन झाले. छायाचित्र त्या नोंदीवर व श्रेयसूचीत दिसेल.", "सहेजा गया। तस्वीर उस प्रविष्टि और श्रेय सूची में दिखेगी।"],
  "il.note": ["Every illustration on this site is drawn by the site's own code as an SVG, generated from each record's name, so no external image files are used and nothing is copied from any photographer. They are free to reuse with credit to KRISHIVIDYA.", "या संकेतस्थळावरील प्रत्येक चित्र संकेतस्थळाच्या स्वतःच्या संगणकसंहितेने SVG स्वरूपात, प्रत्येक नोंदीच्या नावावरून तयार केले आहे; म्हणून कोणतीही बाह्य प्रतिमा वापरलेली नाही व कोणाच्याही छायाचित्राची नक्कल नाही. कृषिविद्याला श्रेय देऊन ती मुक्तपणे वापरता येतील.", "इस वेबसाइट का हर चित्र वेबसाइट की अपनी संहिता द्वारा SVG रूप में, हर प्रविष्टि के नाम से बनाया गया है; इसलिए कोई बाहरी छवि उपयोग नहीं हुई और किसी के फ़ोटो की नक़ल नहीं है। कृषिविद्या को श्रेय देकर इन्हें मुक्त रूप से उपयोग किया जा सकता है।"],
  "nav.mhShort": ["Data", "आकडेवारी", "आँकड़े"], "nav.riskShort": ["At Risk", "धोक्यात", "संकट में"], "nav.archShort": ["Voices", "आवाज", "आवाज़"],
  "nav.risk": ["Heritage at Risk", "धोक्यातील वारसा", "संकट में विरासत"], "nav.archive": ["Voices & Video", "आवाज व व्हिडिओ", "आवाज़ व वीडियो"],
  "sec.risk": ["Heritage at Risk", "धोक्यातील वारसा", "संकट में विरासत"],
  "sec.risk.sub": ["Which crops, breeds, animals and practices are disappearing, how fast, and on what evidence. Every rating states its basis.", "कोणती पिके, जाती, प्राणी व पद्धती नष्ट होत आहेत, किती वेगाने आणि कोणत्या पुराव्यावर. प्रत्येक मूल्यांकनासोबत त्याचा आधार दिला आहे.", "कौन-सी फसलें, नस्लें, पशु और पद्धतियाँ लुप्त हो रही हैं, कितनी तेज़ी से और किस प्रमाण पर। हर आकलन के साथ उसका आधार दिया गया है।"],
  "sec.archive": ["Voices and video archive", "आवाज व व्हिडिओ संग्रह", "आवाज़ व वीडियो संग्रह"],
  "sec.archive.sub": ["Record a farmer or herder in their own voice, attach a video, or paste a YouTube link. The archive grows with what people add.", "शेतकरी किंवा पशुपालकाचा आवाज ध्वनिमुद्रित करा, व्हिडिओ जोडा किंवा यूट्यूब दुवा द्या. लोक जे जोडतील त्यातून हा संग्रह वाढेल.", "किसान या पशुपालक की आवाज़ रिकॉर्ड करें, वीडियो जोड़ें या यूट्यूब लिंक दें। लोग जो जोड़ेंगे उससे यह संग्रह बढ़ेगा।"],
  "rk.item": ["Item", "नोंद", "प्रविष्टि"], "rk.type": ["Type", "प्रकार", "प्रकार"], "rk.status": ["Risk status", "धोक्याची स्थिती", "संकट की स्थिति"], "rk.basis": ["Evidence and basis", "पुरावा व आधार", "प्रमाण व आधार"],
  "rk.india": ["India, 20th Livestock Census (2019)", "भारत, २० वी पशुगणना (२०१९)", "भारत, 20वीं पशुधन गणना (2019)"],
  "rk.measured": ["Measured declines in Maharashtra", "महाराष्ट्रातील मोजलेली घट", "महाराष्ट्र में मापी गई गिरावट"],
  "rk.csv": ["Download risk list (CSV)", "धोका यादी CSV", "संकट सूची CSV"],
  "rk.note": ["Ratings marked Measured come from published figures. Reported means it is documented in research without a series. Assessment is our own reading of the trend, and we welcome corrections.", "‘मोजलेले’ म्हणजे प्रकाशित आकडेवारी. ‘नोंदवलेले’ म्हणजे संशोधनात नोंद आहे पण मालिका नाही. ‘मूल्यांकन’ म्हणजे आमचा अंदाज; दुरुस्त्या स्वागतार्ह आहेत.", "‘मापा गया’ अर्थात प्रकाशित आँकड़े। ‘दर्ज’ अर्थात शोध में उल्लेख है पर शृंखला नहीं। ‘आकलन’ हमारा अपना अनुमान है; सुधार सादर आमंत्रित हैं।"],
  "arch.play": ["Play", "ऐका / पाहा", "सुनें / देखें"], "arch.search": ["Find on YouTube", "यूट्यूबवर शोधा", "यूट्यूब पर खोजें"], "arch.remove": ["Remove", "काढा", "हटाएँ"],
  "arch.mine": ["added from this device", "या उपकरणावरून जोडलेले", "इस उपकरण से जोड़े गए"],
  "arch.record": ["Record a voice note", "आवाज ध्वनिमुद्रित करा", "आवाज़ रिकॉर्ड करें"], "arch.stop": ["Stop recording", "थांबवा", "रोकें"], "arch.rerecord": ["Record again", "पुन्हा ध्वनिमुद्रण", "फिर रिकॉर्ड करें"],
  "arch.recorded": ["Recording ready. Play it below, then save your contribution.", "ध्वनिमुद्रण तयार. खाली ऐका आणि मग योगदान जतन करा.", "रिकॉर्डिंग तैयार। नीचे सुनें और फिर योगदान सहेजें।"],
  "arch.denied": ["Microphone permission was refused, so recording is not possible. You can still attach a file or a link.", "मायक्रोफोनची परवानगी नाकारल्याने ध्वनिमुद्रण शक्य नाही. फाईल किंवा दुवा जोडू शकता.", "माइक्रोफ़ोन की अनुमति नहीं मिली, इसलिए रिकॉर्डिंग संभव नहीं। आप फ़ाइल या लिंक जोड़ सकते हैं।"],
  "arch.norec": ["This browser cannot record audio. You can attach an audio file instead.", "हा ब्राउझर ध्वनिमुद्रण करू शकत नाही. त्याऐवजी ऑडिओ फाईल जोडा.", "यह ब्राउज़र रिकॉर्ड नहीं कर सकता। इसके बदले ऑडियो फ़ाइल जोड़ें।"],
  "arch.ytnote": ["The video is played from YouTube in privacy-enhanced mode.", "व्हिडिओ यूट्यूबवरून गोपनीयता-वर्धित पद्धतीने दाखवला जातो.", "वीडियो यूट्यूब से गोपनीयता-संवर्धित मोड में चलाया जाता है।"],
  "arch.gone": ["This recording was kept on the device only for that session. Open the saved file, or add it again.", "हे ध्वनिमुद्रण फक्त त्या सत्रापुरते उपकरणावर होते. जतन केलेली फाईल उघडा किंवा पुन्हा जोडा.", "यह रिकॉर्डिंग केवल उसी सत्र के लिए उपकरण पर थी। सहेजी गई फ़ाइल खोलें या दोबारा जोड़ें।"],
  "arch.privacy": ["Recordings and files stay on your own device. Nothing is uploaded automatically. Saving also downloads a file you can send to the project team.", "ध्वनिमुद्रणे व फाईल्स आपल्याच उपकरणावर राहतात. काहीही आपोआप पाठवले जात नाही. जतन करताना प्रकल्प चमूला पाठवता येईल अशी फाईलही डाउनलोड होते.", "रिकॉर्डिंग और फ़ाइलें आपके ही उपकरण पर रहती हैं। कुछ भी स्वतः अपलोड नहीं होता। सहेजने पर एक फ़ाइल भी डाउनलोड होती है जिसे आप परियोजना दल को भेज सकते हैं।"],
  "f.title": ["Title of this record", "या नोंदीचे शीर्षक", "इस प्रविष्टि का शीर्षक"],
  "f.speaker": ["Who is speaking or featured", "कोण बोलत आहे", "कौन बोल रहा है"],
  "f.yt": ["YouTube link (optional)", "यूट्यूब दुवा (ऐच्छिक)", "यूट्यूब लिंक (वैकल्पिक)"],
  "f.file": ["Attach audio or video (optional)", "ऑडिओ किंवा व्हिडिओ जोडा (ऐच्छिक)", "ऑडियो या वीडियो जोड़ें (वैकल्पिक)"],
  "f.badyt": ["That does not look like a YouTube link. Check it and try again.", "हा यूट्यूब दुवा वाटत नाही. तपासून पुन्हा प्रयत्न करा.", "यह यूट्यूब लिंक नहीं लगता। जाँचकर पुनः प्रयास करें।"],
  "f.export": ["Export all my contributions", "माझी सर्व योगदाने निर्यात करा", "मेरे सभी योगदान निर्यात करें"],
  "f.name": ["Your name", "आपले नाव", "आपका नाम"], "f.place": ["Village and district", "गाव व जिल्हा", "गाँव व ज़िला"], "f.topic": ["Topic", "विषय", "विषय"], "f.story": ["Describe the practice, seed, animal or tradition", "पद्धत, बियाणे, जनावर किंवा परंपरेचे वर्णन करा", "पद्धति, बीज, पशु या परंपरा का वर्णन करें"],
  "f.consent": ["I have permission from the knowledge holder to share this, and it may be published with credit.", "ही माहिती देण्यासाठी मला ज्ञानधारकाची परवानगी आहे आणि ती श्रेयासह प्रकाशित करता येईल.", "यह जानकारी साझा करने के लिए मुझे ज्ञान-धारक की अनुमति है और इसे श्रेय सहित प्रकाशित किया जा सकता है।"],
  "f.submit": ["Save contribution", "योगदान जतन करा", "योगदान सहेजें"], "f.ok": ["Thank you. Your contribution has been saved on this device and downloaded as a file you can send to the project team.", "धन्यवाद. आपले योगदान या उपकरणावर जतन झाले असून प्रकल्प चमूला पाठवण्यासाठी फाईल म्हणून डाउनलोड झाले आहे.", "धन्यवाद। आपका योगदान इस उपकरण पर सहेजा गया है और परियोजना दल को भेजने के लिए फ़ाइल के रूप में डाउनलोड हुआ है।"],
  "f.err": ["Please fill in every field and confirm consent.", "कृपया सर्व रकाने भरा व संमतीची खात्री करा.", "कृपया सभी खाने भरें और सहमति की पुष्टि करें।"],
  "foot.line": ["KRISHIVIDYA is an academic research prototype. Knowledge belongs to the communities who hold it.", "कृषिविद्या हा शैक्षणिक संशोधन प्रकल्प आहे. ज्ञान त्या समुदायांचे आहे ज्यांनी ते जपले.", "कृषिविद्या एक शैक्षणिक शोध परियोजना है। ज्ञान उन्हीं समुदायों का है जिन्होंने इसे सहेजा।"],
  "sp.cattle": ["Cattle", "गोवंश", "गोवंश"], "sp.goat": ["Goats", "शेळ्या", "बकरियाँ"], "sp.buffalo": ["Buffalo", "म्हशी", "भैंस"], "sp.sheep": ["Sheep", "मेंढ्या", "भेड़ें"], "sp.pig": ["Pigs", "डुकरे", "सूअर"],
  "crop.jowar": ["Jowar", "ज्वारी", "ज्वार"], "crop.pulses": ["All pulses", "सर्व कडधान्ये", "सभी दलहन"], "crop.cotton": ["Cotton", "कापूस", "कपास"], "crop.bajra": ["Bajra", "बाजरी", "बाजरा"],
  "div.konkan": ["Konkan", "कोकण", "कोंकण"], "div.nashik": ["Nashik", "नाशिक", "नाशिक"], "div.pune": ["Pune", "पुणे", "पुणे"], "div.marathwada": ["Marathwada", "मराठवाडा", "मराठवाड़ा"], "div.amravati": ["Amravati", "अमरावती", "अमरावती"], "div.nagpur": ["Nagpur", "नागपूर", "नागपुर"],
  "dm.livestock": ["Livestock (5 species)", "पशुधन (५ प्रजाती)", "पशुधन (5 प्रजातियाँ)"], "dm.cattle": ["Cattle", "गोवंश", "गोवंश"], "dm.buffalo": ["Buffalo", "म्हशी", "भैंस"], "dm.goat": ["Goats", "शेळ्या", "बकरियाँ"],
  "dm.sheep": ["Sheep", "मेंढ्या", "भेड़ें"], "dm.pig": ["Pigs", "डुकरे", "सूअर"], "dm.poultry": ["Poultry", "कुक्कुट", "मुर्गी"], "dm.dens": ["Livestock per km²", "प्रति चौ.कि.मी. पशुधन", "प्रति वर्ग कि.मी. पशुधन"],
  "dm.per1k": ["Livestock per 1,000 people", "१,००० लोकांमागे पशुधन", "प्रति 1,000 लोगों पर पशुधन"], "dm.milk1k": ["Milch animals per 1,000 people", "१,००० लोकांमागे दुभती जनावरे", "प्रति 1,000 लोगों पर दुधारू पशु"],
  "dm.gddp": ["GDDP 2024-25 (₹ crore)", "GDDP २०२४-२५ (₹ कोटी)", "GDDP 2024-25 (₹ करोड़)"], "dm.pci": ["Per-capita income 2024-25 (₹)", "दरडोई उत्पन्न २०२४-२५ (₹)", "प्रति व्यक्ति आय 2024-25 (₹)"]
};
const LANGS = ["en", "mr", "hi"];
const state = {
  lang: "en", theme: "light", era: "all", mhOnly: false, textTopic: "all", waterScope: "all", pracCat: "all",
  cropCat: "all", cropFlag: "all", cropQ: "", animalTab: "mh", species: "all", helperGroup: "all", commCat: "all", commQ: "",
  riskLevel: "all", riskType: "all", riskQ: "", archKind: "all",
  dist: { div: "all", sort: "livestock", cmpA: "ahilyanagar", cmpB: "gadchiroli" }
};

/* ---------- 2. Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const tr = v => v == null ? "" : typeof v === "string" ? v : (v[state.lang] || v.en || "");
const t = k => { const e = UI[k]; return e ? (e[LANGS.indexOf(state.lang)] || e[0]) : k; };
const numFmt = (v, d = 0) => Number(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
const lower = o => JSON.stringify(o).toLowerCase();
const empty = () => `<p class="empty">🔎 ${esc(t("ui.none"))}</p>`;
function chips(el, items, active, label, onPick) {
  el.innerHTML = items.map(v => `<button type="button" class="chip${v === active ? " on" : ""}" data-v="${esc(v)}" aria-pressed="${v === active}">${esc(label(v))}</button>`).join("");
  el.onclick = e => { const b = e.target.closest(".chip"); if (b) onPick(b.dataset.v); };
}
const count = (arr, fn) => arr.filter(fn).length;
const srcLink = key => SOURCES[key] ? `<a href="${SOURCES[key].url}" target="_blank" rel="noopener noreferrer">${esc(SOURCES[key].label)}</a>` : "";

/* ---------- 3. Modal ---------- */
let lastFocus = null;
function openModal(html) {
  lastFocus = document.activeElement;
  $("#modalBody").innerHTML = html;
  $("#modal").hidden = false; document.body.classList.add("locked");
  $("#modalClose").focus();
}
function closeModal() { $("#modal").hidden = true; document.body.classList.remove("locked"); lastFocus && lastFocus.focus && lastFocus.focus(); }

/* ---------- 4. Section renderers ---------- */
function renderHero() {
  const records = TIMELINE.length + TEXTS.length + WATER.length + RIVERS.length + PRACTICES.length + CROPS.length + INDIA_BREEDS.length + livestockBreeds.length + HELPERS.length + COMMUNITIES.length + DISTRICTS.length;
  const stats = [[records, "stat.records"], [9000, "stat.years"], [CROPS.length, "stat.crops"], [INDIA_BREEDS.length + livestockBreeds.length + HELPERS.length, "stat.animals"], [COMMUNITIES.length, "stat.comms"], [36, "stat.districts"]];
  $("#heroStats").innerHTML = stats.map(([v, k]) => `<div class="hstat"><strong data-count="${v}">${numFmt(v)}${k === "stat.years" ? "+" : ""}</strong><span>${esc(t(k))}</span></div>`).join("");
}
function renderTimeline() {
  chips($("#eraChips"), ["all", ...ERAS.map(e => e.id)], state.era, v => v === "all" ? t("ui.all") : ERAS.find(e => e.id === v).label, v => { state.era = v; renderTimeline(); });
  const list = TIMELINE.filter(e => (state.era === "all" || e.era === state.era) && (!state.mhOnly || e.mh)).sort((a, b) => a.s - b.s);
  $("#tlCount").textContent = `${list.length} ${t("ui.results")}`;
  let lastEra = null;
  $("#timeline").innerHTML = list.length ? list.map(e => {
    const era = ERAS.find(x => x.id === e.era);
    const head = e.era !== lastEra ? `<li class="tl-era"><span>${era.icon}</span><h3>${esc(era.label)}</h3><small>${esc(era.range)}</small></li>` : "";
    lastEra = e.era;
    return head + `<li class="tl-item tag-${e.tag}"><div class="tl-date">${esc(e.y)}</div><article class="tl-card"><div class="tl-tags"><span class="etag etag-${e.tag}">${esc(t("tag." + e.tag))}</span>${e.mh ? `<span class="etag etag-mh">Maharashtra</span>` : ""}</div><h4>${esc(e.title)}</h4><p>${esc(e.text)}</p></article></li>`;
  }).join("") : empty();
}
function renderTexts() {
  const topics = ["all", "farming", "animals", "water"];
  const icons = { farming: "🌾", animals: "🐄", water: "💧" };
  chips($("#textChips"), topics, state.textTopic, v => v === "all" ? t("ui.all") : `${icons[v]} ${v[0].toUpperCase() + v.slice(1)}`, v => { state.textTopic = v; renderTexts(); });
  const list = TEXTS.filter(x => state.textTopic === "all" || x.topics.includes(state.textTopic));
  $("#textGrid").innerHTML = list.map(x => `<article class="text-card${x.mh ? " is-mh" : ""}">${photoThumb("text:" + x.name, "📜", x.topics.includes("water") ? "water" : x.topics.includes("animals") ? "dusk" : "sun", x.name)}
    <p class="text-dev">${esc(x.dev)}</p><h3>${esc(x.name)}</h3>
    <p class="text-meta">${esc(x.date)} · ${esc(x.lang)}</p><p>${esc(x.summary)}</p>
    ${x.refs ? `<p class="text-refs"><strong>Key passages:</strong> ${esc(x.refs)}</p>` : ""}
    <div class="card-foot">${x.topics.map(tp => `<span class="mini">${icons[tp]} ${tp}</span>`).join("")}${x.url ? `<a class="link" href="${x.url}" target="_blank" rel="noopener noreferrer">${esc(t("ui.open"))} ↗</a>` : ""}</div></article>`).join("");
}
function renderWater() {
  $("#riverGrid").innerHTML = RIVERS.map(r => `<article class="river">${photoThumb("river:" + r.name, "🏞️", "water", r.name)}<h3>${esc(r.name)} <span class="dev">${esc(r.dev)}</span></h3><p class="text-meta">${esc(r.basin)}</p><p>${esc(r.text)}</p></article>`).join("");
  chips($("#waterChips"), ["all", "mh", "india"], state.waterScope, v => v === "all" ? t("ui.all") : v === "mh" ? "Maharashtra" : "Rest of India", v => { state.waterScope = v; renderWater(); });
  const list = WATER.filter(w => state.waterScope === "all" || (state.waterScope === "mh" ? w.mh : !w.mh));
  $("#waterGrid").innerHTML = list.map(w => `<article class="kcard${w.mh ? " is-mh" : ""}">${photoThumb("water:" + w.name, /stepwell|barav|vav|baoli|kund|tanka|beri|virda|well/i.test(w.name) ? "🪣" : /tank|eri|kere|cheruvu|johad|khadin|ahar/i.test(w.name) ? "🛶" : "💧", "water", w.name)}<p class="kc-type">💧 ${esc(w.type)}</p><h3>${esc(w.name)} <span class="dev">${esc(w.dev)}</span></h3><p class="text-meta">📍 ${esc(w.region)}</p><p>${esc(w.text)}</p></article>`).join("");
}
function renderPractices() {
  const cats = { all: t("ui.all"), soil: "🪱 Soil", seed: "🫘 Seed", cropping: "🌾 Cropping", pest: "🐞 Pests", water: "💧 Water & land", weather: "🌦️ Weather", animal: "🐄 Animals" };
  chips($("#pracChips"), Object.keys(cats), state.pracCat, v => cats[v], v => { state.pracCat = v; renderPractices(); });
  const list = PRACTICES.filter(p => state.pracCat === "all" || p.cat === state.pracCat);
  $("#pracGrid").innerHTML = list.map(p => `<article class="kcard st-${p.status}">${photoThumb("prac:" + p.name, PRAC_ART[p.cat][0], PRAC_ART[p.cat][1], p.name)}<div class="kc-head"><span class="status status-${p.status}">${esc(t("st." + p.status))}</span>${p.mh ? `<span class="etag etag-mh">Maharashtra</span>` : ""}</div>
    <h3>${esc(p.name)} <span class="dev">${esc(p.dev)}</span></h3><p>${esc(p.text)}</p><div class="card-foot">${riskBadge(riskOf(PRACTICE_RISK, p.name))}</div></article>`).join("");
  $("#starStrip").innerHTML = NAKSHATRAS.map(([n, dev, d, note], i) => `<li style="--i:${i}"><strong>${esc(n)}</strong><span class="dev">${esc(dev)}</span><em>${esc(d)}</em><p>${esc(note)}</p></li>`).join("");
  $("#seasonTable").innerHTML = `<thead><tr><th scope="col">Ritu</th><th scope="col">Months</th><th scope="col">Work on the farm</th></tr></thead><tbody>${SEASONS.map(([n, dev, en, m, w]) => `<tr><th scope="row">${esc(n)} <span class="dev">${esc(dev)}</span><br><small>${esc(en)}</small></th><td>${esc(m)}</td><td>${esc(w)}</td></tr>`).join("")}</tbody>`;
  $("#festGrid").innerHTML = festivals.map(f => `<article class="kcard">${photoThumb("fest:" + f.key, (f.art || ["🪔", "festive"])[0], (f.art || ["🪔", "festive"])[1], tr(f.name))}<h3>${esc(tr(f.name))}</h3><p class="text-meta">📅 ${esc(tr(f.when))} · 📍 ${esc(tr(f.region))}</p><p>${esc(tr(f.agri))}.</p><p class="text-meta">🍲 ${esc(tr(f.food))} · ✨ ${esc(tr(f.tradition))}</p></article>`).join("");
  $("#sayings").innerHTML = SAYINGS.map(s => `<figure class="saying"><blockquote>${esc(s.text)}</blockquote><p>${esc(s.tr)}</p><figcaption>— ${esc(s.src)}</figcaption></figure>`).join("");
}
function renderCrops() {
  const cats = ["all", ...Object.keys(CROP_CATS)];
  chips($("#cropChips"), cats, state.cropCat, v => v === "all" ? `${t("ui.all")} (${CROPS.length})` : `${CROP_CATS[v]} (${count(CROPS, c => c.cat === v)})`, v => { state.cropCat = v; renderCrops(); });
  const flags = { all: "Every type", GI: "🏅 GI-registered", land: "🌱 Landraces", wild: "🌿 Wild & forest" };
  chips($("#cropFlags"), Object.keys(flags), state.cropFlag, v => flags[v], v => { state.cropFlag = v; renderCrops(); });
  const q = state.cropQ.trim().toLowerCase();
  const list = CROPS.filter(c => (state.cropCat === "all" || c.cat === state.cropCat) && (state.cropFlag === "all" || c.flags.includes(state.cropFlag)) && (!q || lower(c).includes(q)));
  $("#cropCount").textContent = `${list.length} ${t("ui.results")}`;
  const seasonIcon = { kharif: "🌧️ Kharif", rabi: "❄️ Rabi", summer: "☀️ Summer", perennial: "🔁 Perennial", all: "📅 Year-round" };
  $("#cropGrid").innerHTML = list.length ? list.map(c => `<article class="crop cat-${c.cat}">${photoThumb("crop:" + c.name, emblem(c.name, CROP_ART[c.cat][0]), CROP_ART[c.cat][1], c.name)}
    <header><h3>${esc(c.name)}</h3><span class="dev">${esc(c.dev)}</span></header><p class="sci">${esc(c.sci)}</p><p>${esc(c.note)}</p>
    <div class="card-foot"><span class="mini">${esc(CROP_CATS[c.cat])}</span>${c.season.split(" ").map(s => `<span class="mini">${esc(seasonIcon[s] || s)}</span>`).join("")}${c.flags.includes("GI") ? `<span class="mini gi">🏅 GI</span>` : ""}${c.flags.includes("land") ? `<span class="mini land">🌱 Landrace</span>` : ""}${riskBadge(cropRisk(c))}</div></article>`).join("") : empty();
}
function renderAnimals() {
  const tabs = { mh: t("an.mh"), india: t("an.india"), helpers: t("an.helpers") };
  chips($("#animalTabs"), Object.keys(tabs), state.animalTab, v => tabs[v], v => { state.animalTab = v; renderAnimals(); });
  const sub = $("#animalSub"), grid = $("#animalGrid");
  if (state.animalTab === "mh") {
    sub.innerHTML = `<p class="note">These 17 breeds are registered by ICAR-NBAGR as native to Maharashtra. Select a breed to read its details and sources.</p>`;
    grid.innerHTML = livestockBreeds.map(b => `<article class="kcard click" tabindex="0" role="button" data-breed="${b.id}">${photoThumb("breed:" + b.key, (BREED_ART[b.type] || ["🐄", "field"])[0], (BREED_ART[b.type] || ["🐄", "field"])[1], tr(b.name))}<p class="kc-type">${esc(b.type)}</p><h3>${esc(tr(b.name))}</h3>
      <p class="text-meta">📍 ${esc(tr(b.region))}</p><p>${esc(tr(b.purpose))}</p><div class="card-foot"><span class="mini">🧬 NBAGR</span>${riskBadge(riskOf(BREED_RISK, b.key))}<span class="link">${esc(t("ui.details"))} →</span></div></article>`).join("");
  } else if (state.animalTab === "india") {
    const sp = ["all", ...new Set(INDIA_BREEDS.map(b => b.species))];
    sub.innerHTML = `<div class="chips" id="speciesChips"></div><p class="note">A selection of notable indigenous breeds. ICAR-NBAGR recognised 219 indigenous breeds of 16 species in 2024.</p>`;
    chips($("#speciesChips"), sp, state.species, v => v === "all" ? t("ui.all") : v[0].toUpperCase() + v.slice(1), v => { state.species = v; renderAnimals(); });
    grid.innerHTML = INDIA_BREEDS.filter(b => state.species === "all" || b.species === state.species).map(b => `<article class="kcard">${photoThumb("ibreed:" + b.name, (SPECIES_ART[b.species] || ["🐾", "field"])[0], (SPECIES_ART[b.species] || ["🐾", "field"])[1], b.name)}<p class="kc-type">${esc(b.species)} · ${esc(b.use)}</p><h3>${esc(b.name)}</h3><p class="text-meta">📍 ${esc(b.home)}</p><p>${esc(b.note)}</p></article>`).join("");
  } else {
    const groups = ["all", ...Object.keys(HELPER_GROUPS)];
    sub.innerHTML = `<div class="chips" id="helperChips"></div><p class="note">Many of these animals are protected wildlife. Farmers can help them by keeping trees and hedges, avoiding poisons, and never killing or capturing them.</p>`;
    chips($("#helperChips"), groups, state.helperGroup, v => v === "all" ? t("ui.all") : HELPER_GROUPS[v], v => { state.helperGroup = v; renderAnimals(); });
    grid.innerHTML = HELPERS.filter(h => state.helperGroup === "all" || h.group === state.helperGroup).map(h => `<article class="kcard helper g-${h.group}">${photoThumb("helper:" + h.name, emblem(h.name, HELPER_ART[h.group][0]), HELPER_ART[h.group][1], h.name)}<p class="kc-type">${esc(HELPER_GROUPS[h.group])}</p><h3>${esc(h.name)} <span class="dev">${esc(h.dev)}</span></h3><p>${esc(h.role)}</p><p class="care"><strong>How farmers can help:</strong> ${esc(h.care)}</p><div class="card-foot">${riskBadge(riskOf(HELPER_RISK, h.name))}</div></article>`).join("");
  }
}
const BREED_ART = { cattle: ["🐄", "field"], buffalo: ["🐃", "water"], goat: ["🐐", "hill"], sheep: ["🐑", "hill"], poultry: ["🐓", "earth"], horse: ["🐎", "dusk"] };
function openBreed(id) {
  const b = livestockBreeds.find(x => x.id === id); if (!b) return;
  const rows = [["Region", b.region], ["Purpose", b.purpose], ["Keepers", b.community], ["Characteristics", b.traits], ["Strains", b.strains], ["Key facts", b.facts]].filter(([, v]) => v && tr(v));
  const br = riskOf(BREED_RISK, b.key);
  openModal(`<figure class="mfig">${thumb((BREED_ART[b.type] || ["🐄", "field"])[0], (BREED_ART[b.type] || ["🐄", "field"])[1], [], tr(b.name))}</figure>
    <p class="kc-type">${esc(b.type)} · ICAR-NBAGR</p><h2 id="modalTitle">${esc(tr(b.name))}</h2>
    <dl class="dl">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(tr(v))}</dd></div>`).join("")}</dl>
    ${br ? `<p class="riskline">${riskBadge(br)} <strong>${esc(EVIDENCE[br.evidence])}:</strong> ${esc(br.basis)} ${br.src ? srcLink(br.src) : ""}</p>` : ""}
    <h3>Sources</h3><ul class="src">${(b.src || []).map(k => `<li>${srcLink(k)}</li>`).join("")}</ul>`);
}
function renderCommunities() {
  const cats = ["all", ...Object.keys(COMM_CATS)];
  chips($("#commChips"), cats, state.commCat, v => v === "all" ? `${t("ui.all")} (${COMMUNITIES.length})` : `${COMM_CATS[v]} (${count(COMMUNITIES, c => c.cat === v)})`, v => { state.commCat = v; renderCommunities(); });
  const q = state.commQ.trim().toLowerCase();
  const list = COMMUNITIES.filter(c => (state.commCat === "all" || c.cat === state.commCat) && (!q || lower(c).includes(q)));
  $("#commCount").textContent = `${list.length} ${t("ui.results")}`;
  $("#commGrid").innerHTML = list.length ? list.map(c => `<article class="comm click" tabindex="0" role="button" data-comm="${c.key}">
    ${photoThumb("comm:" + c.key, c.icon, COMM_ART[c.cat], c.name)}<div><p class="kc-type">${esc(COMM_CATS[c.cat])}${c.status ? ` · ${esc(c.status)}` : ""}</p>
    <h3>${esc(c.name)} <span class="dev">${esc(c.dev)}</span></h3><p class="text-meta">📍 ${esc(c.region)}</p><p class="clamp">${esc(c.overview)}</p>
    <span class="link">${esc(t("ui.details"))} →</span></div></article>`).join("") : empty();
}
const STATUS_TEXT = { ST: "Scheduled Tribe", PVTG: "Particularly Vulnerable Tribal Group", NT: "Nomadic Tribe (state list)", DNT: "Denotified Tribe", VJ: "Vimukta Jati (Denotified Tribe, state list)" };
function openCommunity(key) {
  const c = COMMUNITIES.find(x => x.key === key); if (!c) return;
  const list = arr => `<ul class="bul">${arr.filter(x => x && x !== "—").map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const row = (k, v) => v && v !== "—" ? `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>` : "";
  openModal(`<figure class="mfig">${photoThumb("comm:" + c.key, c.icon, COMM_ART[c.cat], c.name)}</figure><p class="kc-type">${esc(COMM_CATS[c.cat])}${c.status ? ` · ${esc(STATUS_TEXT[c.status])}` : ""}</p>
    <h2 id="modalTitle">${c.icon} ${esc(c.name)} <span class="dev">${esc(c.dev)}</span></h2><p class="text-meta">📍 ${esc(c.region)}</p>
    <p class="lead">${esc(c.overview)}</p>
    <div class="twocol"><section><h3>🌾 Agricultural practices</h3>${list(c.agri)}</section><section><h3>🐄 Animal husbandry</h3>${list(c.ah)}</section></div>
    <dl class="dl">${row("Crops", c.crops)}${row("Animals", c.animals)}${row("Tools & equipment", c.tools)}${row("Festivals & rituals", c.festivals)}${row("Food traditions", c.food)}${row("Knowledge & heritage", c.knowledge)}${row("Changes today", c.today)}</dl>
    <p class="note">🤝 This profile describes traditional livelihoods; every community today is diverse. It was compiled from published research and should be reviewed with community members before any wider use.</p>`);
}

/* ---- Maharashtra data ---- */
const DMF = { gddp: v => v == null ? "—" : "₹" + numFmt(v), pci: v => v == null ? "—" : "₹" + numFmt(v) };
const dmFmt = (k, v) => (DMF[k] || numFmt)(v);
function rankOf(key, m) { const s = DISTRICTS.filter(d => d[m] != null).sort((a, b) => b[m] - a[m]); const i = s.findIndex(d => d.key === key); return i < 0 ? null : `${i + 1} / ${s.length}`; }
function renderDistricts() {
  const f = state.dist;
  chips($("#divChips"), ["all", "konkan", "nashik", "pune", "marathwada", "amravati", "nagpur"], f.div, v => v === "all" ? `${t("ui.all")} (${DISTRICTS.length})` : t("div." + v), v => { f.div = v; renderDistricts(); });
  $("#distSort").innerHTML = DIST_METRICS.map(m => `<option value="${m}"${m === f.sort ? " selected" : ""}>${esc(t("dm." + m))}</option>`).join("");
  const list = DISTRICTS.filter(d => f.div === "all" || d.div === f.div).filter(d => d[f.sort] != null).sort((a, b) => b[f.sort] - a[f.sort]);
  const max = Math.max(...list.map(d => d[f.sort]), 1);
  $("#distRank").innerHTML = list.map((d, i) => `<button type="button" class="rrow" data-dist="${d.key}"><span class="rk">${i + 1}</span><span class="rn">${esc(tr(d.name).replace(/ \(.+\)/, ""))}</span><span class="rt"><i class="dv-${d.div}" style="width:${(d[f.sort] / max * 100).toFixed(1)}%"></i></span><strong>${esc(dmFmt(f.sort, d[f.sort]))}</strong></button>`).join("");
  const opts = DISTRICTS.slice().sort((a, b) => tr(a.name).localeCompare(tr(b.name))).map(d => `<option value="${d.key}">${esc(tr(d.name))}</option>`).join("");
  $("#cmpA").innerHTML = opts; $("#cmpB").innerHTML = opts; $("#cmpA").value = f.cmpA; $("#cmpB").value = f.cmpB;
  renderCompare();
}
function renderCompare() {
  const a = DISTRICTS.find(d => d.key === state.dist.cmpA), b = DISTRICTS.find(d => d.key === state.dist.cmpB);
  $("#cmpTable").innerHTML = `<thead><tr><th scope="col">Indicator</th><th scope="col">${esc(tr(a.name))}</th><th scope="col">${esc(tr(b.name))}</th></tr></thead><tbody>${DIST_METRICS.map(k => {
    const w = a[k] != null && b[k] != null && a[k] !== b[k] ? (a[k] > b[k] ? "a" : "b") : "";
    return `<tr><th scope="row">${esc(t("dm." + k))}</th><td class="${w === "a" ? "hi" : ""}">${esc(dmFmt(k, a[k]))}</td><td class="${w === "b" ? "hi" : ""}">${esc(dmFmt(k, b[k]))}</td></tr>`;
  }).join("")}</tbody>`;
}
function openDistrict(key) {
  const d = DISTRICTS.find(x => x.key === key); if (!d) return;
  const tot = k => DISTRICTS.reduce((s, x) => s + (x[k] || 0), 0);
  const share = ["livestock", "cattle", "buffalo", "goat", "sheep", "pig", "poultry"];
  openModal(`<p class="kc-type">${esc(t("div." + d.div))} division</p><h2 id="modalTitle">📍 ${esc(tr(d.name))}</h2><p class="lead">${esc(tr(d.note))}</p>
    <div class="tablewrap"><table class="table"><thead><tr><th scope="col">Indicator</th><th scope="col">Value</th><th scope="col">State rank</th></tr></thead><tbody>
    ${DIST_METRICS.map(k => `<tr><th scope="row">${esc(t("dm." + k))}</th><td><strong>${esc(dmFmt(k, d[k]))}</strong>${share.includes(k) ? ` <small>(${(d[k] / tot(k) * 100).toFixed(1)}% of state)</small>` : ""}</td><td>${rankOf(key, k) || "—"}</td></tr>`).join("")}
    <tr><th scope="row">Commercial poultry</th><td>${numFmt(d.commPoultry)}</td><td></td></tr><tr><th scope="row">Backyard poultry</th><td>${numFmt(d.backPoultry)}</td><td></td></tr></tbody></table></div>
    <h3>Sources</h3><ul class="src"><li>${srcLink("lc2019")}</li><li>${srcLink("esm2526")}</li></ul><p class="note">${esc(t("mh.note"))}</p>`);
}
function lineSVG(years, series) {
  const W = 640, H = 290, L = 44, R = 30, Tp = 12, B = 40;
  const max = Math.ceil(Math.max(...series.flatMap(s => s.values)) / 20) * 20;
  const x = i => L + i * (W - L - R) / (years.length - 1), y = v => Tp + (1 - v / max) * (H - Tp - B);
  const grid = [0, .25, .5, .75, 1].map(f => `<line class="gl" x1="${L}" x2="${W - R}" y1="${y(max * f)}" y2="${y(max * f)}"/><text class="ax" x="${L - 6}" y="${y(max * f) + 4}" text-anchor="end">${numFmt(max * f)}</text>`).join("");
  const xl = years.map((yr, i) => (years.length <= 8 || i % 2 === 0 || i === years.length - 1) ? `<text class="ax" x="${x(i)}" y="${H - B + 18}" text-anchor="${i === years.length - 1 ? "end" : "middle"}">${yr}</text>` : "").join("");
  const lines = series.map(s => `<polyline class="ln c-${s.cls}" points="${s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}"/>${s.values.map((v, i) => `<circle class="pt c-${s.cls}" cx="${x(i)}" cy="${y(v)}" r="3.5"><title>${esc(t(s.key))} ${years[i]}: ${numFmt(v, 2)}</title></circle>`).join("")}`).join("");
  return `<svg viewBox="0 0 ${W} ${H}" class="lchart" role="img" aria-label="${esc(series.map(s => `${t(s.key)} ${numFmt(s.values[0], 1)} to ${numFmt(s.values.at(-1), 1)}`).join("; "))}">${grid}${xl}${lines}</svg>
    <ul class="legend">${series.map(s => `<li><i class="c-${s.cls}"></i>${esc(t(s.key))}: ${numFmt(s.values[0], 1)} → <strong>${numFmt(s.values.at(-1), 1)}</strong></li>`).join("")}</ul>`;
}
function barsHTML(pairs, suffix = "") {
  const max = Math.max(...pairs.map(p => p[1]));
  return `<div class="bars">${pairs.map(([k, v]) => `<div class="cbar"><span style="height:${(v / max * 100).toFixed(1)}%"><b>${numFmt(v, v < 10 ? 2 : 1)}${suffix}</b></span><small>${esc(k)}</small></div>`).join("")}</div>`;
}
function renderStats() {
  $("#chartLivestock").innerHTML = lineSVG(STATS.livestockYears, STATS.livestock) + `<p class="src-line">📚 ${srcLink("lc2019")}</p>`;
  $("#chartArea").innerHTML = lineSVG(STATS.areaYears, STATS.area) + `<p class="src-line">📚 ${srcLink("esm2526")}</p>`;
  $("#chartHolding").innerHTML = barsHTML(STATS.holding) + `<p class="src-line">📚 Agriculture Censuses, via ${srcLink("esm2526")}</p>`;
  $("#chartShare").innerHTML = barsHTML(STATS.share, "%") + `<p class="src-line">📚 ${srcLink("esm2526")}</p>`;
  $("#factTable").innerHTML = `<tbody>${FACTS.map(([k, v, s]) => `<tr><th scope="row">${esc(tr(k))}</th><td><strong>${esc(v)}</strong></td><td><small>${srcLink(s)}</small></td></tr>`).join("")}</tbody>`;
  $("#findings").innerHTML = FINDINGS.map(f => `<li>${esc(tr(f))}</li>`).join("");
  $("#riskGrid").innerHTML = heritageRecords.map(r => {
    if (r.from == null) return `<article class="kcard risk">${photoThumb("risk:" + r.key, (r.art || ["🌾", "field"])[0], "field", tr(r.name))}<h3>${esc(tr(r.name))}</h3><p>${esc(tr(r.note))}</p><p class="text-meta">🔎 Not yet measured — documentation needed.</p></article>`;
    const ch = (r.to - r.from) / r.from * 100, d = r.from < 100 ? 2 : 0;
    return `<article class="kcard risk">${photoThumb("risk:" + r.key, (r.art || ["🌾", "field"])[0], "field", tr(r.name))}<h3>${esc(tr(r.name))}</h3><p class="big">${numFmt(r.from, d)} → ${numFmt(r.to, d)} <small>${esc(tr(r.unit))}</small></p>
      <div class="meter"><i style="width:${Math.min(100, Math.abs(ch)).toFixed(1)}%"></i></div><p class="text-meta"><strong class="neg">${ch.toFixed(1)}%</strong> · ${esc(r.span)}</p><p>${esc(tr(r.note))}</p><p class="src-line">📚 ${srcLink(r.src)}</p></article>`;
  }).join("");
}
function renderSources() {
  $("#sourceList").innerHTML = Object.values(SOURCES).map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join("") +
    TEXTS.filter(x => x.url).map(x => `<li><a href="${x.url}" target="_blank" rel="noopener noreferrer">${esc(x.name)} — English translation (sacred-texts.com)</a></li>`).join("");
  $("#creditList").innerHTML = `<li>${esc(t("il.note"))}</li>`;
}
function downloadCSV() {
  const head = ["District", "Division", "Cattle", "Buffalo", "Sheep", "Goat", "Pig", "Poultry_commercial", "Poultry_backyard", "Poultry_total", "Livestock_per_sqkm", "Livestock_per_1000_people", "Milch_per_1000_people", "GDDP_2024_25_Rs_crore", "PerCapita_NDDP_2024_25_Rs"];
  const rows = DISTRICTS.map(d => [d.name.en, d.div, d.cattle, d.buffalo, d.sheep, d.goat, d.pig, d.commPoultry, d.backPoultry, d.poultry, d.dens, d.per1k, d.milk1k, d.gddp ?? "", d.pci ?? ""]);
  save("\uFEFF# Sources: 20th Livestock Census 2019 (Maharashtra); Economic Survey of Maharashtra 2025-26\n" + [head, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n"), "krishividya_maharashtra_districts.csv", "text/csv");
}
function save(content, name, type) {
  const a = document.createElement("a");
  const blob = content instanceof Blob ? content : new Blob([content], { type: type + ";charset=utf-8" });
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}


/* ---------- Heritage at Risk ---------- */
function riskRows() {
  const rows = [];
  CROPS.forEach(c => { const r = cropRisk(c); rows.push({ name: c.name, dev: c.dev, type: "Crop", sub: CROP_CATS[c.cat], ...r }); });
  livestockBreeds.forEach(b => { const r = riskOf(BREED_RISK, b.key); if (r) rows.push({ name: tr(b.name), dev: "", type: "Breed", sub: b.type, ...r }); });
  HELPERS.forEach(h => { const r = riskOf(HELPER_RISK, h.name); if (r) rows.push({ name: h.name, dev: h.dev, type: "Animal", sub: HELPER_GROUPS[h.group], ...r }); });
  PRACTICES.forEach(p => { const r = riskOf(PRACTICE_RISK, p.name); if (r) rows.push({ name: p.name, dev: p.dev, type: "Practice", sub: p.cat, ...r }); });
  heritageRecords.filter(h => ["tools", "oral", "occupations"].includes(h.cat)).forEach(h =>
    rows.push({ name: tr(h.name), dev: "", type: h.cat === "tools" ? "Tool" : h.cat === "oral" ? "Oral knowledge" : "Livelihood", sub: tr(h.unit || ""), level: h.from == null ? "docneeded" : "critical", evidence: h.from == null ? "assessed" : "measured", basis: tr(h.note), src: h.src }));
  return rows;
}
function renderRiskSection() {
  const rows = riskRows();
  const counts = Object.keys(RISK_LEVELS).map(k => [k, rows.filter(r => r.level === k).length]);
  $("#riskTiles").innerHTML = counts.map(([k, n]) => `<button type="button" class="tile t-${k}${state.riskLevel === k ? " on" : ""}" data-risklevel="${k}">
    <strong>${n}</strong><span>${RISK_LEVELS[k].icon} ${esc(RISK_LEVELS[k].label)}</span><small>${esc(RISK_LEVELS[k].text)}</small></button>`).join("");
  const types = ["all", ...new Set(rows.map(r => r.type))];
  chips($("#riskTypes"), types, state.riskType, v => v === "all" ? `${t("ui.all")} (${rows.length})` : `${v} (${rows.filter(r => r.type === v).length})`, v => { state.riskType = v; renderRiskSection(); });
  const q = state.riskQ.trim().toLowerCase();
  let list = rows.filter(r => (state.riskLevel === "all" || r.level === state.riskLevel) && (state.riskType === "all" || r.type === state.riskType) && (!q || (r.name + r.dev + r.basis).toLowerCase().includes(q)));
  list.sort((a, b) => RISK_LEVELS[b.level].rank - RISK_LEVELS[a.level].rank || a.name.localeCompare(b.name));
  $("#riskCount").textContent = `${list.length} ${t("ui.results")}`;
  $("#riskTable").innerHTML = `<thead><tr><th scope="col">${esc(t("rk.item"))}</th><th scope="col">${esc(t("rk.type"))}</th><th scope="col">${esc(t("rk.status"))}</th><th scope="col">${esc(t("rk.basis"))}</th></tr></thead><tbody>${
    list.map(r => `<tr><th scope="row">${esc(r.name)} ${r.dev ? `<span class="dev">${esc(r.dev)}</span>` : ""}</th><td>${esc(r.type)}<br><small>${esc(r.sub || "")}</small></td>
      <td><span class="rbadge r-${r.level}">${RISK_LEVELS[r.level].icon} ${esc(RISK_LEVELS[r.level].label)}</span></td>
      <td><span class="ev ev-${r.evidence}">${esc(EVIDENCE[r.evidence])}</span> ${esc(r.basis)} ${r.src ? srcLink(r.src) : ""}</td></tr>`).join("")}</tbody>`;
  const measured = heritageRecords.filter(h => h.from != null).map(h => [tr(h.name).replace(/ (area|head)$/, ""), +((h.to - h.from) / h.from * 100).toFixed(1)]).sort((a, b) => a[1] - b[1]);
  $("#riskChart").innerHTML = `<div class="hbars">${measured.map(([k, v]) => `<div class="hbar"><span>${esc(k)}</span><i style="width:${Math.min(100, Math.abs(v))}%"></i><b>${v}%</b></div>`).join("")}</div><p class="src-line">📚 ${srcLink("lc2019")} · ${srcLink("esm2526")}</p>`;
  $("#indiaTable").innerHTML = `<thead><tr><th scope="col">Species</th><th scope="col">India, 2019</th><th scope="col">Change over 2012</th></tr></thead><tbody>${INDIA_LIVESTOCK.map(([a, b, c]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td><td class="${c.startsWith("−") ? "neg" : "pos"}">${esc(c)}</td></tr>`).join("")}</tbody>`;
  $("#riskCsv").onclick = () => {
    const head = ["Item", "Devanagari", "Type", "Group", "Risk_status", "Evidence", "Basis"];
    save("\uFEFF" + [head, ...rows.map(r => [r.name, r.dev, r.type, r.sub, RISK_LEVELS[r.level].label, EVIDENCE[r.evidence], r.basis])].map(r => r.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n"), "krishividya_heritage_at_risk.csv", "text/csv");
  };
}

/* ---------- Voice & video archive ---------- */
let mediaRec = null, recChunks = [], recTimer = null, recBlob = null;
function archiveList() { return [...loadArchive(), ...ARCHIVE_SEED]; }
function renderArchive() {
  const kinds = { all: t("ui.all"), youtube: "▶️ YouTube", audio: "🎙️ Voice", video: "🎬 Video", topic: "📌 Open calls" };
  chips($("#archChips"), Object.keys(kinds), state.archKind, v => kinds[v], v => { state.archKind = v; renderArchive(); });
  const list = archiveList().filter(a => state.archKind === "all" || a.kind === state.archKind);
  const mine = loadArchive().length;
  $("#archCount").textContent = `${list.length} ${t("ui.results")} · ${mine} ${t("arch.mine")}`;
  $("#archGrid").innerHTML = list.length ? list.map((a, i) => `<article class="arch">
    ${a.kind === "youtube" && a.id ? `<img class="thumb" src="https://img.youtube.com/vi/${esc(a.id)}/hqdefault.jpg" alt="" loading="lazy" onerror="this.style.display='none'">` : thumb(a.kind === "audio" ? "🎙️" : a.kind === "video" ? "🎬" : "📌", a.kind === "topic" ? "festive" : "night", [], a.title)}
    <p class="kc-type">${esc(a.topic || "")}${a.seed ? " · open call" : ""}</p><h3>${esc(a.title)}</h3>
    <p class="text-meta">${esc(a.who || "")}${a.place ? " · 📍 " + esc(a.place) : ""}${a.date ? " · " + esc(new Date(a.date).toLocaleDateString("en-IN")) : ""}</p>
    ${a.note ? `<p class="clamp">${esc(a.note)}</p>` : ""}
    <div class="card-foot"><button type="button" class="btn ghost small" data-play="${i}">${a.kind === "topic" ? "🔎 " + esc(t("arch.search")) : "▶️ " + esc(t("arch.play"))}</button>
    ${a.seed ? "" : `<button type="button" class="link" data-del="${i}">🗑️ ${esc(t("arch.remove"))}</button>`}</div></article>`).join("") : empty();
}
function playArchive(i) {
  const a = archiveList()[i]; if (!a) return;
  if (a.kind === "topic") { window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(a.q), "_blank", "noopener"); return; }
  if (a.kind === "youtube") {
    openModal(`<h2 id="modalTitle">${esc(a.title)}</h2><p class="text-meta">${esc(a.who || "")}${a.place ? " · 📍 " + esc(a.place) : ""}</p>
      <div class="embed"><iframe src="https://www.youtube-nocookie.com/embed/${esc(a.id)}" title="${esc(a.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
      ${a.note ? `<p>${esc(a.note)}</p>` : ""}<p class="note">${esc(t("arch.ytnote"))} <a href="https://www.youtube.com/watch?v=${esc(a.id)}" target="_blank" rel="noopener noreferrer">${esc(t("ui.open"))} ↗</a></p>`);
    return;
  }
  const url = MEDIA_URLS[a.mediaId];
  openModal(`<h2 id="modalTitle">${esc(a.title)}</h2><p class="text-meta">${esc(a.who || "")}${a.place ? " · 📍 " + esc(a.place) : ""}</p>
    ${url ? (a.kind === "audio" ? `<audio controls src="${url}" style="width:100%"></audio>` : `<div class="embed"><video controls src="${url}"></video></div>`)
      : `<p class="note">${esc(t("arch.gone"))}</p>`}${a.note ? `<p>${esc(a.note)}</p>` : ""}`);
}
/* Media objects live only for this browsing session; nothing is uploaded. */
const MEDIA_URLS = {};
function addArchiveEntry(entry) { const all = loadArchive(); all.unshift(entry); saveArchive(all); renderArchive(); }
function setupRecorder() {
  const btn = $("#recBtn"), status = $("#recStatus"), prev = $("#recPreview");
  if (!btn) return;
  if (!(navigator.mediaDevices && window.MediaRecorder)) { btn.disabled = true; status.textContent = t("arch.norec"); return; }
  btn.addEventListener("click", async () => {
    if (mediaRec && mediaRec.state === "recording") { mediaRec.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recChunks = []; mediaRec = new MediaRecorder(stream);
      mediaRec.ondataavailable = e => e.data.size && recChunks.push(e.data);
      mediaRec.onstop = () => {
        stream.getTracks().forEach(tk => tk.stop()); clearInterval(recTimer);
        recBlob = new Blob(recChunks, { type: mediaRec.mimeType || "audio/webm" });
        prev.src = URL.createObjectURL(recBlob); prev.hidden = false;
        btn.textContent = "🎙️ " + t("arch.rerecord"); btn.classList.remove("rec");
        status.textContent = t("arch.recorded");
      };
      mediaRec.start(); let s = 0;
      recTimer = setInterval(() => { s++; status.textContent = `● ${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; if (s >= 300) mediaRec.stop(); }, 1000);
      btn.textContent = "⏹️ " + t("arch.stop"); btn.classList.add("rec");
    } catch (e) { status.textContent = t("arch.denied"); }
  });
}


/* ---------- 5. Global search ---------- */
function searchAll(q) {
  q = q.trim().toLowerCase(); if (q.length < 2) return [];
  const R = [], re = new RegExp("(^|[^a-z\u0900-\u097F])" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const add = (group, title, sub, go) => R.push({ group, title, sub, go, top: re.test(title) || String(title).toLowerCase().includes(q) });
  const vals = o => o == null ? "" : typeof o === "object" ? Object.values(o).map(vals).join(" ") : String(o);
  const hit = o => { const v = vals(o); return re.test(v) || (/[\u0900-\u097F]/.test(q) && v.toLowerCase().includes(q)); };
  TIMELINE.forEach(e => hit(e) && add("History", e.title, e.y, () => jump("#history")));
  TEXTS.forEach(x => hit(x) && add("Texts", x.name, x.date, () => jump("#texts")));
  [...WATER, ...RIVERS].forEach(w => hit(w) && add("Water", w.name, w.region || w.basin, () => jump("#water")));
  PRACTICES.forEach(p => hit(p) && add("Practices", p.name, t("st." + p.status), () => jump("#practices")));
  CROPS.forEach(c => hit(c) && add("Crops", c.name, c.dev, () => { state.cropQ = c.name; $("#cropSearch").value = c.name; state.cropCat = "all"; state.cropFlag = "all"; renderCrops(); jump("#crops"); }));
  livestockBreeds.forEach(b => hit(b) && add("Animals", tr(b.name), "Maharashtra breed", () => openBreed(b.id)));
  INDIA_BREEDS.forEach(b => hit(b) && add("Animals", b.name, b.home, () => { state.animalTab = "india"; state.species = b.species; renderAnimals(); jump("#animals"); }));
  HELPERS.forEach(h => hit(h) && add("Animals", h.name, HELPER_GROUPS[h.group], () => { state.animalTab = "helpers"; state.helperGroup = h.group; renderAnimals(); jump("#animals"); }));
  COMMUNITIES.forEach(c => hit(c) && add("Communities", c.name, c.region, () => openCommunity(c.key)));
  archiveList().forEach((a, i) => hit(a) && add("Archive", a.title, a.topic || a.kind, () => { jump("#archive"); playArchive(i); }));
  DISTRICTS.forEach(d => hit(d.name) || hit(d.note) ? add("Districts", tr(d.name), t("div." + d.div), () => openDistrict(d.key)) : 0);
  return R.sort((x, y) => y.top - x.top);
}
let searchHits = [];
function renderSearch() {
  const q = $("#searchInput").value; searchHits = searchAll(q);
  const box = $("#searchResults");
  if (q.trim().length < 2) { box.innerHTML = `<p class="note">Try “jowar”, “Warli”, “owl”, “Rigveda”, “phad” or “Gadchiroli”.</p>`; return; }
  if (!searchHits.length) { box.innerHTML = empty(); return; }
  const groups = [...new Set(searchHits.map(h => h.group))];
  box.innerHTML = `<p class="note">${searchHits.length} ${esc(t("ui.results"))}</p>` + groups.map(g => `<h3>${esc(g)}</h3><ul>${searchHits.map((h, i) => h.group === g ? `<li><button type="button" data-hit="${i}"><strong>${esc(h.title)}</strong><small>${esc(h.sub || "")}</small></button></li>` : "").join("")}</ul>`).join("");
}
function openSearch() { $("#search").hidden = false; document.body.classList.add("locked"); $("#searchInput").focus(); renderSearch(); }
function closeSearch() { $("#search").hidden = true; document.body.classList.remove("locked"); }
function jump(sel) { closeSearch(); closeModal(); const el = $(sel); el && el.scrollIntoView({ behavior: "smooth", block: "start" }); }

/* ---------- 6. Language, theme, events ---------- */
function applyLang() {
  document.documentElement.lang = state.lang === "en" ? "en" : state.lang;
  $$("[data-t]").forEach(el => el.textContent = t(el.dataset.t));
  $$("[data-tph]").forEach(el => el.placeholder = t(el.dataset.tph));
  $$(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === state.lang));
  $("#langNote").hidden = state.lang === "en";
}
function setTheme(th) { state.theme = th; document.documentElement.dataset.theme = th; try { localStorage.setItem("kv-theme", th); } catch (e) {} }
function renderAll() { renderHero(); renderTimeline(); renderTexts(); renderWater(); renderPractices(); renderCrops(); renderAnimals(); renderCommunities(); renderDistricts(); renderStats(); renderRiskSection(); renderArchive(); renderSources(); }
function bind() {
  $$(".lang button").forEach(b => b.addEventListener("click", () => { state.lang = b.dataset.lang; try { localStorage.setItem("kv-lang", state.lang); } catch (e) {} applyLang(); renderAll(); }));
  $$("#themeBtn, [data-theme-toggle]").forEach(el => el.addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark")));
  $("#menuBtn").addEventListener("click", () => { const open = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", open); });
  $$("#nav a").forEach(a => a.addEventListener("click", () => { $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", false); }));
  $$("[data-open-search]").forEach(b => b.addEventListener("click", openSearch));
  $("#searchClose").addEventListener("click", closeSearch);
  $("#searchInput").addEventListener("input", renderSearch);
  $("#searchResults").addEventListener("click", e => { const b = e.target.closest("[data-hit]"); if (b) { const h = searchHits[+b.dataset.hit]; closeSearch(); h.go(); } });
  $("#modalClose").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  $("#search").addEventListener("click", e => { if (e.target.id === "search") closeSearch(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeModal(); closeSearch(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches(".click")) { e.preventDefault(); e.target.click(); }
  });
  $("#mhOnly").addEventListener("change", e => { state.mhOnly = e.target.checked; renderTimeline(); });
  $("#cropSearch").addEventListener("input", e => { state.cropQ = e.target.value; renderCrops(); });
  $("#commSearch").addEventListener("input", e => { state.commQ = e.target.value; renderCommunities(); });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-breed]"); if (b) openBreed(b.dataset.breed);
    const c = e.target.closest("[data-comm]"); if (c) openCommunity(c.dataset.comm);
    const d = e.target.closest("[data-dist]"); if (d) openDistrict(d.dataset.dist);
  });
  $("#distSort").addEventListener("change", e => { state.dist.sort = e.target.value; renderDistricts(); });
  $("#cmpA").addEventListener("change", e => { state.dist.cmpA = e.target.value; renderCompare(); });
  $("#cmpB").addEventListener("change", e => { state.dist.cmpB = e.target.value; renderCompare(); });
  $("#csvBtn").addEventListener("click", downloadCSV);
  $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => { $("#toTop").classList.toggle("show", window.scrollY > 800); $(".topbar").classList.toggle("scrolled", window.scrollY > 10); }, { passive: true });
  setupRecorder();
  $("#archGrid").addEventListener("click", e => {
    const p = e.target.closest("[data-play]"); if (p) return playArchive(+p.dataset.play);
    const d = e.target.closest("[data-del]"); if (d) { const all = loadArchive(); all.splice(+d.dataset.del, 1); saveArchive(all); renderArchive(); }
  });
  $("#riskTiles").addEventListener("click", e => { const b = e.target.closest("[data-risklevel]"); if (b) { state.riskLevel = state.riskLevel === b.dataset.risklevel ? "all" : b.dataset.risklevel; renderRiskSection(); } });
  $("#riskSearch").addEventListener("input", e => { state.riskQ = e.target.value; renderRiskSection(); });
  $("#exportBtn").addEventListener("click", () => {
    const data = { contributions: (() => { try { return JSON.parse(localStorage.getItem("kv-contrib") || "[]"); } catch (e) { return []; } })(), archive: loadArchive(), exported: new Date().toISOString() };
    save(JSON.stringify(data, null, 2), `krishividya_my_contributions_${Date.now()}.json`, "application/json");
  });
  $("#contribForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, E = f.elements, data = Object.fromEntries(new FormData(f)), msg = $("#formMsg");
    const file = E.media.files[0];
    const filled = ["name", "place", "topic", "story"].every(k => (data[k] || "").trim().length > 1) && E.consent.checked;
    if (!filled) { msg.textContent = t("f.err"); msg.className = "form-msg bad"; return; }
    const yt = (data.youtube || "").trim();
    if (yt && !ytId(yt)) { msg.textContent = t("f.badyt"); msg.className = "form-msg bad"; return; }
    const title = (data.title || "").trim() || (data.story || "").slice(0, 60);
    const base = { title, who: (data.speaker || "").trim() || data.name, place: data.place, topic: data.topic, note: data.story, date: new Date().toISOString() };
    if (yt) addArchiveEntry({ ...base, kind: "youtube", id: ytId(yt), url: yt });
    if (file || recBlob) {
      const blob = file || recBlob, kind = (blob.type || "").startsWith("video") ? "video" : "audio";
      const mediaId = "m" + Date.now(); MEDIA_URLS[mediaId] = URL.createObjectURL(blob);
      addArchiveEntry({ ...base, kind, mediaId, fileName: file ? file.name : "voice-note.webm", size: blob.size });
      save(blob, `krishividya_${kind}_${Date.now()}.${file ? (file.name.split(".").pop() || "webm") : "webm"}`, blob.type || "application/octet-stream");
    }
    const record = { ...data, media: file ? file.name : recBlob ? "voice recording" : "", date: base.date };
    try { const all = JSON.parse(localStorage.getItem("kv-contrib") || "[]"); all.push(record); localStorage.setItem("kv-contrib", JSON.stringify(all)); } catch (err) {}
    save(JSON.stringify(record, null, 2), `krishividya_contribution_${Date.now()}.json`, "application/json");
    msg.textContent = t("f.ok"); msg.className = "form-msg good";
    f.reset(); recBlob = null; $("#recPreview").hidden = true; $("#recStatus").textContent = ""; $("#recBtn").textContent = "🎙️ " + t("arch.record");
    renderArchive();
  });
  /* highlight current section in navigation */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) $$("#nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main > section[id]").forEach(s => io.observe(s));
    const rv = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); rv.unobserve(en.target); } }), { threshold: .08 });
    $$(".reveal").forEach(el => rv.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("in"));
}
let started = false;
document.addEventListener("DOMContentLoaded", () => {
  if (started) return; started = true;
  try { state.lang = localStorage.getItem("kv-lang") || "en"; setTheme(localStorage.getItem("kv-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")); } catch (e) { setTheme("light"); }
  bind(); applyLang(); renderAll();
});