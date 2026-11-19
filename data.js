const products = [
  {
    "id": 1,
    "name": "Chitară electrică",
    "category": "Instrumente cu coarde",
    "price": 470,
    "image": "Chitara electrica.jpg",
    "desc": "Sunetul care aduce orice melodie la nivelul unui spectacol maiestuos. Are un design modern, grif din arțar, corzi rezistente și un ton puternic. Este cel mai versatil instrument, fiind ideal pentru rock, pop, blues. Datorită acestor calități, în sfârșit, creativitatea ta prinde viață!",
    "specs": [
      "22 taste",
      "6 Corzi",
      "COD: 101"
    ]
  },
  {
    "id": 2,
    "name": "Chitară acustică",
    "category": "Instrumente cu coarde",
    "price": 400,
    "image": "Chitară acustică.jpg",
    "desc": "Partenerul tău de drum și prietenul de la orice cabană. Își creează sunetul cald prin rezonanța corzilor metalice pe corpuri din esențe nobile de lemn, fiind disponibilă în forme și dimensiuni adaptate stilului tău.",
    "specs": [
      "Lemn: Molid",
      "Finisaj natural",
      "COD: 102"
    ]
  },
  {
    "id": 3,
    "name": "Violoncel",
    "category": "Instrumente cu coarde",
    "price": 2300,
    "image": "Violoncel.jpg",
    "desc": "Regina Orchestrelor și firul sensibil care atinge cele mai adânci emoții. Este realizată din materiale, cu adevărat, de cea mai înaltă calitate. Modelul InstruMentis este conceput din lemn masiv de molid cu tastiera, cuierele și suportul de bărbie din abanos.",
    "specs": [
      "Lemn masiv molid",
      "Finisaj elegant",
      "COD: 104"
    ]
  },
  {
    "id": 4,
    "name": "Vioară",
    "category": "Instrumente cu coarde",
    "price": 700,
    "image": "Vioara.jpg",
    "desc": "O îmbrățișare sonoră profundă și melancolică, capabilă să emoționeze de la prima atingere. Rezonanța corpului său din lemn sculptat, acordat în cvinte și susținut pe țăruș metalic, prinde viață prin glisarea arcușului sau ciupirea precisă a celor patru corzi.",
    "specs": [
      "Lemn sculptat",
      "Tăruș metalic",
      "COD: 103"
    ]
  },
  {
    "id": 5,
    "name": "Harpă",
    "category": "Instrumente cu coarde",
    "price": 900,
    "image": "Harpa.jpg",
    "desc": "Harpa InstruMentis Exclusive este cea mai nouă harpă cu leviere de 48 de corzi care acoperă 7 octave. Acest model premium este disponibil în finisaje, precum: mahon, cireș, natural. Instrumentul ceresc îți poartă mintea și sufletul printre cele mai frumoase piese.",
    "specs": [
      "48 corzi",
      "7 octave",
      "COD: 106"
    ]
  },
  {
    "id": 6,
    "name": "Contrabas",
    "category": "Instrumente cu coarde",
    "price": 3500,
    "image": "Contrabas.jpg",
    "desc": "Ecou profund care făurește fundația oricărei melodii. Uriașul nobil al orchestrei, își transmite vibranta rezonanță prin atingerea arcușului sau ciupitul celor patru strune groase, dând viață unui sunet cald, catifelat și imposibil de clintit",
    "specs": [
      "Corzi groase",
      "Sunet profund",
      "COD: 105"
    ]
  },
  {
    "id": 7,
    "name": "Pian",
    "category": "Instrumente cu clape",
    "price": 6300,
    "image": "Pian.jpg",
    "desc": "Arta eleganței care îmbracă tăcerea. Instrument prin excelență maiestuos, își transpune emoția prin atingerea celor 88 de clape din fildeș și abanos, dând viață unui univers sonor bogat, rafinat și imposibil de uitat.",
    "specs": [
      "88 clape",
      "Clape grele",
      "COD: 201"
    ]
  },
  {
    "id": 8,
    "name": "Acordeon",
    "category": "Instrumente cu clape",
    "price": 3200,
    "image": "Acordeon.jpg",
    "desc": "O întreagă orchestră purtată pe umeri, capabilă să stârnească nostalgie sau să încingă atmosfera în câteva secunde. Produce un sunet bogat prin mișcarea burdufului ce activează anciile metalice, oferind control deplin prin clape sau butoane.",
    "specs": [
      "96 bași",
      "Butoane ergonomice",
      "COD: 202"
    ]
  },
  {
    "id": 9,
    "name": "Trompetă",
    "category": "Instrumente de suflat",
    "price": 3400,
    "image": "Trompeta.jpg",
    "desc": "Sclipirea de energie care străpunge aerul. Instrument de alamă cu personalitate, își schimba lungimea coloanei de aer prin trei pistoane fluide pentru a-ți oferi un sunet strălucitor și imposibil de ignorat.",
    "specs": [
      "Muștiuc",
      "Finisaj auriu",
      "COD: 301"
    ]
  },
  {
    "id": 10,
    "name": "Trombon",
    "category": "Instrumente de suflat",
    "price": 1200,
    "image": "Trombon.jpg",
    "desc": "Trombonul se remarcă prin sunetul său puternic, expresiv și prin puterea de a fura lumina orchestrei asupra sa. Disponibil în variantele Soprano, Alto, Valve și Contrabass, oferă un control rapid și confortabil.",
    "specs": [
      "Finisaj lacuit",
      "Acordaj în Si bemol",
      "COD: 302"
    ]
  },
  {
    "id": 11,
    "name": "Saxofon",
    "category": "Instrumente de suflat",
    "price": 2350,
    "image": "Saxofon.jpg",
    "desc": "Sufletul oricărei petreceri și garanția că nimeni nu rămâne pe scaun. Disponibil în variantele Alto, Tenor sau Sopran, vine cu clape ergonomice pentru un control ușor, intonație precisă și toc de protecție inclus.",
    "specs": [
      "Muștiuc cu finisaj auriu",
      "Clape placate cu nichel",
      "COD: 303"
    ]
  },
  {
    "id": 12,
    "name": "Flaut",
    "category": "Instrumente de suflat",
    "price": 1100,
    "image": "Flaut.jpg",
    "desc": "O boare de eleganță care plutește peste orice orchestrație și atinge cele mai fine coarde ale sufletului. Realizat din aliaje metalice strălucitoare, folosește un sistem precis de clape ce transformă fluxul de aer direcționat pe orificiu într-un sunet luminos.",
    "specs": [
      "Tonalitate Do (C)",
      "Corp din aliaj metalic",
      "COD: 304"
    ]
  },
  {
    "id": 13,
    "name": "Clarinet",
    "category": "Instrumente de suflat",
    "price": 1100,
    "image": "Clarinet.jpg",
    "desc": "O boare de rafinament și energie jucăușă care împletește firul fiecărei povești muzicale.  Sistemul impresionant Boehm este însoțit de clape și inele argintate, iar poziționarea ergonomică a clapelor oferă un control precis asupra interpretării.",
    "specs": [
      "Clape placate cu nichel sau argint",
      "Inele metalice rezistente",
      "COD: 305"
    ]
  },
  {
    "id": 14,
    "name": "Tarabană",
    "category": "Instrumente de percuție",
    "price": 2300,
    "image": "Tarabana.jpg",
    "desc": "Bătaia de energie care dă startul petrecerii și unește oamenii pe același ritm de bucurie. Corpul din aluminiu solid, extraordinar de calitativ, este echipat cu un cap sintetic.",
    "specs": [
      "Reglaj al tensiunii membranei",
      "Sunet puternic și clar",
      "COD: 401"
    ]
  },
  {
    "id": 15,
    "name": "Tobe",
    "category": "Instrumente de percuție",
    "price": 800,
    "image": "Tobe.jpg",
    "desc": "Bătaia de energie care dă startul petrecerii și unește oamenii pe același ritm de bucurie.  Corpul din aluminiu solid, extraordinar de calitativ, este echipat cu un cap sintetic.",
    "specs": [
      "Fețe din piele sintetică",
      "Pedală pentru tobă mare",
      "COD: 402"
    ]
  },
  {
    "id": 16,
    "name": "Bucium",
    "category": "Instrumente tradiționale",
    "price": 1000,
    "image": "Bucium.jpg",
    "desc": "Ecoul străbunilor și chemarea profundă care trezește spiritul munților. Un instrument tradițional de suflat, realizat manual din lemn, cu o formă lungă și conică ce oferă un timbru acustic unic și impunător.",
    "specs": [
      "Confecționat manual",
      "Design tradițional românesc",
      "COD: 501"
    ]
  },
  {
    "id": 17,
    "name": "Nai",
    "category": "Instrumente tradiționale",
    "price": 800,
    "image": "Nai.jpg",
    "desc": "Dorul curat al plaiurilor românești, care-ți îmbrățișează inima cu stropi de nostalgie.  Modelul curbat cu țevi naturale creează autenticitate și sensibilitate melodiei.",
    "specs": [
      "Tuburi realizate din bambus",
      "Construcție artizanală",
      "COD: 502"
    ]
  },
 {
    "id": 18,
    "name": "Caval",
    "category": "Instrumente tradiționale",
    "price": 600,
    "image": "Caval.jpg",
    "desc": "Șoapta caldă și nostalgică a poveștilor de altădată, care îți picură liniște în suflet. Instrument tradițional din lemn, fără ancie, își obține timbrul catifelat prin rezonanța coloanei de aer în corpul lung prevăzut cu orificii de acordaj.",
    "specs": [
      "Muștiuc fără ancie",
      "Finisaj natural",
      "COD: 503"
    ]
  },
   {
    "id": 19,
    "name": "Cimpoi",
    "category": "Instrumente tradiționale",
    "price": 3000,
    "image": "Cimpoi.jpg",
    "desc": "Chemarea vie a străbunilor care reaprinde bucuria și spiritul sărbătorilor de altădată.  Conceput din fildeș cu un sac sintetic etanș, include un set de tuburi. Construcția sa menține un flux constant de aer, realizând un sunet emoționant și armonios.",
    "specs": [
      "Burduf realizat din piele",
      "Sistem de reglare a aerului",
      "COD: 505"
    ]
  },
     {
    "id": 20,
    "name": "Fluier",
    "category": "Instrumente tradiționale",
    "price": 200,
    "image": "Fluier.jpg",
    "desc": "Farmecul pur al dorului românesc, transpus într-un instrument simplu, dar plin de emoție. Cioplit din lemn, își creează linia melodică prin acoperirea orificiilor digitale, oferind o acustică autentică și expresivă.",
    "specs": [
      "Fabricat din lemn de cireș",
      "7 orificii pentru degete",
      "COD: 506"
    ]
  },
  {
    "id": 21,
    "name": "Amplificator",
    "category": "Accesorii muzicale și echipamente audio",
    "price": 400,
    "image": "Amplificator.jpg",
    "desc": "Vocea care îți face pasiunea să se audă tare și clar, transformând fiecare repetiție într-un adevărat concert. Îți îmbracă sunetul în putere și claritate, oferind controale precise de egalizare (EQ), reglaj de gain și intrări dedicate pentru a-ți sculpta tonul perfect.",
    "specs": [
      "Putere între 50 și 500 W",
      "Intrări USB și AUX",
      "COD: 601"
    ]
  },
    {
    "id": 22,
    "name": "Husă pentru chitară cu pachet complet de accesorii",
    "category": "Accesorii muzicale și echipamente audio",
    "price": 200,
    "image": "Husa de accesorii.jpg",
    "desc": "Vocea care îți face pasiunea să se audă tare și clar, transformând fiecare repetiție într-un adevărat concert. Îți îmbracă sunetul în putere și claritate, oferind controale precise de egalizare (EQ), reglaj de gain și intrări dedicate pentru a-ți sculpta tonul perfect.",
    "specs": [
      "Material rezistent la apă",
      "Include set de corzi",
      "COD: 602"
    ]
  },
      {
    "id": 23,
    "name": "Microfon",
    "category": "Accesorii muzicale și echipamente audio",
    "price": 380,
    "image": "Microfon.jpg",
    "desc": "Puntea magică dintre trăirile tale și inimile celor care te ascultă. Echipamentul are o bandă cu frecvență înaltă și un semnal audio uimitor, iar canalele ajută ca fiecare poveste să fie spusă prin muzică.",
    "specs": [
      "Conectivitate XLR / Jack",
      "Reducerea zgomotului de fundal",
      "COD: 603"
    ]
  },
   {
    "id": 24,
    "name": "Boxe",
    "category": "Accesorii muzicale și echipamente audio",
    "price": 3600,
    "image": "Boxe.jpg",
    "desc": "Sunetul clar și plin de forță care aduce muzica la viață, transformând fiecare notă într-o experiență vibrantă. Accesoriu acustic esențial, își obține puterea și fidelitatea prin vibrația difuzoarelor.",
    "specs": [
      "Sunet stereo de înaltă calitate",
      "Reglaj pentru volum și tonalitate",
      "COD: 604"
    ]
  },
    {
    "id": 25,
    "name": "Interfață Audio",
    "category": "Accesorii muzicale și echipamente audio",
    "price": 700,
    "image": "interfata.jpg",
    "desc": "Sunetul clar și plin de forță care aduce muzica la viață, transformând fiecare notă într-o experiență vibrantă. Accesoriu acustic esențial, își obține puterea și fidelitatea prin vibrația difuzoarelor.",
    "specs": [
      "Calitate audio 24-bit / 192 kHz",
      "Alimentare Phantom Power 48V",
      "COD: 605"
    ]
  },

]