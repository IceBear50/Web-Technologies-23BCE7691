const fs = require('fs');

fs.writeFile('example.txt', 'Hello, this is a new file.', (err) => {
    if (err) return console.error(err);
    console.log('File created.');

    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) return console.error(err);
        console.log('File content:', data);

        fs.appendFile('example.txt', '\nAppending new data.', (err) => {
            if (err) return console.error(err);
            console.log('Data appended.');

            fs.unlink('example.txt', (err) => {
                if (err) return console.error(err);
                console.log('File deleted.');
            });
        });
    });
});