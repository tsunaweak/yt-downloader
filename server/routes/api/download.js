const router = require("express").Router();

const { index } = require("../../controller/DownloadController.js");

router.get("/download/:type/:itag/:id", index);

// router.get("/download", async (req, res) => {
//   const filePath = path.join(process.cwd(), "storage/test.zip");
//   const file = fs.createReadStream(filePath);
//   const fileSize = fs.statSync(filePath).size;

//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunkSize = end - start + 1;
//     const fileStream = fs.createReadStream(filePath, { start, end });

//     res.writeHead(206, {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunkSize,
//       "Content-Type": "application/octet-stream",
//     });

//     fileStream.pipe(res);
//   } else {
//     res.writeHead(200, {
//       "Content-Length": fileSize,
//       "Content-Type": "application/octet-stream",
//     });
//     file.pipe(res);
//   }
//   // res.setHeader("Content-Disposition", 'attachment; filename="output.avi"');
//   // res.setHeader("Content-Type", "video/avi");

//   // const outputStream = fs.createWriteStream('output.avi');

//   // ffmpeg(ytStream).setFfmpegPath(ffmpegPath).output(outputStream).audioBitrate(128);

//   // video.on("info", (info, format) => {
//   //   title = info.videoDetails.title;
//   //   fileSize = format.contentLength;
//   //   // res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
//   //   // res.setHeader("Accept-Ranges", "bytes");

//   //   // const rangeHeader = req.headers.range;
//   //   // if (rangeHeader) {

//   //   //   const ifRangeHeader = req.headers['if-range'];
//   //   //   console.log({rangeHeader, ifRangeHeader});

//   //   //   const range = rangeHeader.replace(/bytes=/, '').split('-');
//   //   //   const start = parseInt(range[0], 10);
//   //   //   const end = range[1] ? parseInt(range[1], 10) : fileSize - 1;
//   //   //   const chunkSize = end - start + 1;
//   //   //   res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`);
//   //   //   res.setHeader("content-length", chunkSize);
//   //   //   res.statusCode = 206;

//   //   //   const fileStream = fs.createReadStream(filePath);

//   //   // }else{
//   //   //   res.setHeader("content-length", fileSize);
//   //   // }
//   // });
//   //console.log({ title, fileSize });
//   //video.pipe(res);
//   //res.send("x");
// });

module.exports = router;
