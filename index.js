const { constants } = require("buffer");
const fs = require(`fs`);
const http = require(`http`);
const url = require(`url`);

// blocking code execution -> synchronous
// const textIn = fs.readFileSync(`./txt/read-this.txt`, `utf-8`);
// console.log(textIn);

// const textOut = `ini bukan penjelasan tentang cinta : ${textIn}`;
// fs.writeFileSync(`./txt/output-penjelasan.txt`, textOut);
// console.log(`sukses nyetak rasa sakit`);

// non-blocking code execution -> asynchronous
// const test = fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/final.txt", "utf-8", (err, data3) => {
//       fs.writeFile("./txt/gabungan2.txt", `${data2}\n${data3}`, (err) => {
//         console.log("sukses menggabungkan");
//       });
//     });
//   });
// });
// console.log("Hi,Fsw 2 nunggu file nya ?");
// console.log(test);

/////////////////////////
//server dengan http
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === `/hello`) {
    res.end(`ini hello ke fsw 2`);
  } else if (pathName === `/product`) {
    res.end(
      JSON.stringify({
        data: `ini product`,
      })
    );
  } else if (pathName === `/api`) {
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else if (pathName === `/overview`) {
    const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(overviewPage);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(`<h1>url ini gk ada apa2</h1>`);
  }
});
server.listen(8000, `127.0.0.1`, () => {
  console.log(`hello server jalan`);
});
