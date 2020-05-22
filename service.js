// server.js 

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer(function(req, res) {
	// console.log("request: " + req.url);
    const urlObj = url.parse(req.url);
    const urlPathname = decodeURI(urlObj.pathname);
	console.log(urlPathname)
	/* if (
           urlPathname == '/index.html'
        || urlPathname == '/built/main.js'
    ) {
	    // 读取静态文件
	    const filePathname = path.join(__dirname, "./", urlPathname);
	    readStaticFile(res, filePathname);
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("404 - NOT FOUND");
        res.end();
    } */
    // 读取静态文件
    const filePathname = path.join(__dirname, "./", urlPathname);
    readStaticFile(res, filePathname);

});

function readStaticFile(res, filePathname) {
    fs.readFile(filePathname, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("404 - NOT FOUND");
        } else {
            if (filePathname.endsWith('.html')) {
               res.writeHead(200, { "Content-Type": "text/html" }); 
            } else if (filePathname.endsWith('.js')) {
                res.writeHead(200, { "Content-Type": "application/javascript" }); 
            } else if (filePathname.endsWith('.png')) {
                res.writeHead(200, { "Content-Type": "image/png" }); 
            } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
            }
            res.write(data);
            
        }
        res.end();
    });
    
}

const port = 8090;
server.listen(port, function() {
    console.log("服务器运行中.");
    console.log("正在监听" + port + "端口:");
})