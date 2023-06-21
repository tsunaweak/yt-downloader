const ytdl = require("ytdl-core");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const { transliterate: tr, slugify } = require("transliteration");
const audioExtensions = ["mp3", "m4a", "aac"];
const index = async (req, res) => {
  try {
    let { type, itag, id } = req.params;

    if (!["audio", "video"].includes(type)) {
      return res.status(401).json({ message: "Type is invalid." });
    }

    if (id === undefined || id === null) {
      return res.status(401).json({ message: "Video ID is invalid" });
    }

    let info = await ytdl.getInfo(id);
    let convertable = false;
    let format = ytdl.chooseFormat(info.formats, { quality: itag });

    const extension = format.container;
    const title = info.videoDetails.title;

    const response = await axios.head(format.url);

    const fileSize = response.headers["content-length"];
    const contentType = response.headers["content-type"];
    let options = { quality: itag };
    let headers = {
      "Content-Type": contentType,
      "Content-Length": fileSize,
      "Content-Disposition": `attachment; filename=${tr(title)}.${extension}`,
    };

    if (type === "audio" && !audioExtensions.includes(extension)) {
      convertable = true;
      headers["Content-Disposition"] = `attachment; filename=${tr(title)}.${
        audioExtensions[0]
      }`;
    }

    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      headers["Content-Range"] = `bytes ${start}-${end}/${fileSize}`;
      headers["Accept-Ranges"] = `bytes`;
      headers["Content-Length"] = chunkSize;
      res.writeHead(206, headers);
      options["range"] = { start: start, end: end };
    } else {
      res.writeHead(200, headers);
    }
    let stream = ytdl(id, options);
    stream.pipe(res);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { index };
