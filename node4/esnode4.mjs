import * as fs from 'node:fs';

const contenuto = 'Ciao, questo è il mio primo file!';

fs.writeFile('primofile.txt', contenuto, { encoding: 'utf8' }, function (error) {
    if (error) {
        console.error('Errore durante la scrittura del file:', error);
        return;
    }
    console.log('File scritto con successo!');
});
