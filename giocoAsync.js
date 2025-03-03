
const personaggi = [
  { id: 1,
    nome: "Scorpion",
    vita: 100,
    attacco: 25, 
    difesa: 10, 
    mottoVittoria: "🗨️ Non mostrerò pietà!", 
    fraseSconfitta: "🗨️ Non dimenticare... questo volto...",
    attaccoSpeciale: "🦂Scorpion si trasforma in uno scorpione gigantesco, e con il pungiglione trafigge il petto dell'avversario e gli strappa il busto🦂"  
  },
  { id: 2,
    nome: "Sub-Zero", 
    vita: 80, 
    attacco: 30,
    difesa: 5 ,
    mottoVittoria: "🗨️ La ferocia non è una questione di abilità!",
    fraseSconfitta: "🗨️ Ci sono destini peggiori della morte",
    attaccoSpeciale: "❄️❄️ Sub-Zero indietreggia e lancia una raffica di ghiaccioli affilati contro l'avversario, colpendolo con cinque schegge di ghiaccio.❄️❄️"
  },
  { id: 3, 
    nome: "Skarlet", 
    vita: 90, 
    attacco: 20, 
    difesa: 15, 
    mottoVittoria: "🗨️ Qualche litro di sangue è tutto ciò che chiedo.", 
    fraseSconfitta: "🗨️ Non puoi uccidere ciò che è già morto.",
    attaccoSpeciale: "🩸🩸🩸Skarlet lancia un proiettile a base di sangue contro il suo avversario🩸🩸🩸"
  },
  { id: 4, 
    nome: "Baraka", 
    vita: 90, 
    attacco: 15, 
    difesa: 20, 
    mottoVittoria: "🗨️ Banchetterò con la tua carne!", 
    fraseSconfitta: "🗨️ Tempo di morire." ,
    attaccoSpeciale: "⚔️ Baraka si lancia rapidamente sul suo avversario con entrambe le lame sguainate.⚔️ "
  },
  { id: 5, 
    nome: "Kitana", 
    vita: 85, 
    attacco: 22, 
    difesa: 8,
    mottoVittoria: "🗨️ Sono severa, ma giusta!", 
    fraseSconfitta: "🗨️ È un errore che non ripeterò nella Nuova Era" ,
    attaccoSpeciale: "🪭🪭🪭Kitana usa i suoi ventagli per creare un tornado che travolge l'avversario.🪭🪭🪭"
  },
];

async function selezionaPersonaggi(personaggi) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const personaggiSelezionati = personaggi.sort(() => 0.5 - Math.random()).slice(0, 2);
      console.log(`🔥Il combattimento Mortale ha inizio!!!🔥`);
      console.log(`💥${personaggiSelezionati[0].nome} si scaglia contro ${personaggiSelezionati[1].nome}💥`);
      resolve(personaggiSelezionati);
    }, 1000);
  });
}

async function calcolaDanno(attaccante, difensore) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let danno = attaccante.attacco - difensore.difesa;
      if (danno <= 0) danno = 1;
      let dannoCritico = false;
      if (Math.random() > 0.8) {
        danno *= 2;
        dannoCritico = true;
      }
      if (dannoCritico) {
        console.log(`\n ${attaccante.attaccoSpeciale}`);
        console.log(`\n ${difensore.nome} urla: ${difensore.fraseSconfitta}`);
      }
      console.log(`\n 💥 ${attaccante.nome} infligge ${danno} danni a ${difensore.nome} 💥`);
      resolve(danno);
    }, 3000);
  });
}

async function difesa(attaccante, difensore, danno) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (danno < 5) {
        let contrattacco = difensore.attacco - attaccante.difesa;
        if (contrattacco <= 0) contrattacco = 1;
        console.log(`\n ❤️ L'attacco di ${attaccante.nome} è poco efficace, ${difensore.nome} ne approfitta e contrattaca arrecando ${contrattacco} danni a ${attaccante.nome}`);
        attaccante.vita -= contrattacco;
        console.log(`\n ${attaccante.nome} resta con ${attaccante.vita}`);
      }


      if (difensore.vita <= 15 && difensore.vita > 0) {
        difensore.vita += 10;
        console.log(`\n ${difensore.nome} beve pozione rigeneratrice e sale a ${difensore.vita} punti vita 🧪`);
      }

      resolve(true);
    }, 3000);
  });
}

async function turno(attaccante, difensore) {
  const danno = await calcolaDanno(attaccante, difensore);
  difensore.vita -= danno;
  console.log(`\n ❤️‍🩹 ${difensore.nome} ha ${difensore.vita} punti vita`);

  if (difensore.vita <= 0) {
    console.log(`${attaccante.nome} ha vinto!🏆 ${difensore.nome} è stato eliminato! ☠️`);
    return `\n ${attaccante.nome}: ${attaccante.mottoVittoria}`;
  }

  if (attaccante.vita <= 0) {
    console.log(`${difensore.nome} ha vinto!🏆 ${attaccante.nome} è stato eliminato! ☠️`);
    return `\n ${difensore.nome}: ${difensore.mottoVittoria}`;
  }

  
  await difesa(attaccante, difensore, danno);
  return turno(difensore, attaccante);  
}

async function combatti() {
  const [attaccante, difensore] = await selezionaPersonaggi(personaggi);
  const vincitore = await turno(attaccante, difensore);
  console.log(` ${vincitore} 🎉`);
}


combatti();

