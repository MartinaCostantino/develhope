// In questo esercizio dato un array di studenti:
// Utilizza forEach per stampare i nomi degli studenti.
// Utilizza find per trovare uno studente con un voto superiore a 90.
// Utilizza reduce per calcolare la media dei voti degli studenti.
// Utilizza map per creare un nuovo array contenente i nomi degli studenti in maiuscolo.
// Utilizza filter per trovare gli studenti con voti superiori a 85.
const studenti = [
  { nome: "Alice", voto: 95 },
  { nome: "Bob", voto: 88 },
  { nome: "Carol", voto: 76 },
  { nome: "David", voto: 92 },
  { nome: "Eve", voto: 84 },
];

studenti.forEach(studenti => console.log(studenti.nome));
let votoAlto = studenti.find(studenti => studenti.voto > 90);
const votiClasse = studenti.reduce((media , studente) => media + studente.voto,0);
const mediaClasse = votiClasse/studenti.length;
let nomiMaiuscolo = studenti.map(studenti =>  studenti.nome.toUpperCase() );
let studentiMigliori = studenti.filter(studenti => studenti.voto > 85 )
console.log(studentiMigliori)