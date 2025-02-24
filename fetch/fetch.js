
// Lo scopo di questo task è di mostrare nella pagina una carta de "Il signore degli anelli" con:
        
// Nome del personaggio
// immagine del personaggio
// Prova a fetchare una card dal db del gioco di carte di Lord of the Rings, la documentazione dell'API la puoi trovare a questo link: https://ringsdb.com/api/doc
// Fai in modo che nella tua pagina html spuntino il nome del personaggio della carta, la sua immagine 

  async function fetchData() {
            try {
               const response = await fetch("https://ringsdb.com/api/public/cards/");
               const responseJson = await response.json();
               card = responseJson[0]
               console.log(card)
               const name = card.name;
               const immagine = "https://ringsdb.com" + card.imagesrc
               const h1 = document.querySelector(".my-name")
               const img = document.querySelector(".my-img")
            
               h1.innerText = name;
               img.setAttribute("src", immagine )
              
            } catch (error) {
                console.error(error)
            }
            
        }
        fetchData()

