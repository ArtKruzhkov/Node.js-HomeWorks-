// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.
const http = require('http');
let viewsMain = 0;
let viewsAbout = 0;
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        viewsMain++;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF8'
        });
        res.end(`
            <h1>Main page</h1>
            <a href="/about">Link for about page.</a>
            <p>Page loaded ${viewsMain} times.</p>
        `);
    } else if (req.url === '/about') {
        viewsAbout++;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF8'
        });
        res.end(`
            <h1>About page</h1>
            <a href="/">Link for main page.</a>
            <p>Page loaded ${viewsAbout} times.</p>
        `);
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF8'
        });
        res.end('<h1>Page not found!</h1>');
    }
});
const port = 3014;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});