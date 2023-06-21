const ytdl = require("ytdl-core");
const axios = require("axios");

const { formatBytes, formatDuration } = require("../utils/yt-formats");
const index = async (req, res) => {
  const { url, type } = req.body;

  try {
    const id = ytdl.getVideoID(url);

    let info = await ytdl.getInfo(id);
    const title = info.videoDetails.title;
    const thumbnail =
      info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
    const duration = info.videoDetails.lengthSeconds;

    let formats = ytdl
      .filterFormats(info.formats, type === "audio" ? "audioonly" : "video")
      .map((format, i) => {
        let response = {
          itag: format.itag,
          url: format.url,
          type: type,
          duration: duration,
          contentLength: parseInt(format.contentLength),
          size: formatBytes(parseInt(format.contentLength)),
          extension: format.container.toLocaleUpperCase(),
        };

        if (type === "audio") {
          return {
            ...response,
            bitrate: format.bitrate,
            codecs: format.codecs,
            audioCodec: format.audioCodec,
            audioBitrate: `${format.audioBitrate}kbps`,
          };
        }

        return {
          ...response,
          qualityLabel: format.qualityLabel,
          hasAudio: format.hasAudio,
          hasVideo: format.hasVideo,
          codecs: format.codecs,
          videoCodec: format.videoCodec,
        };
      });

    let emptyFormats = formats.filter((format) => isNaN(format.contentLength));
    formats = formats.filter((format) => !isNaN(format.contentLength));

    for (const i in emptyFormats) {
      if (isNaN(emptyFormats[i].contentLength)) {
        let response = await axios.head(emptyFormats[i].url);
        emptyFormats[i].contentLength = parseInt(
          response.headers["content-length"]
        );
        emptyFormats[i].size = formatBytes(emptyFormats[i].contentLength);
      }
    }

    formats = [...formats, ...emptyFormats].sort((a, b) => {
      return b.hasAudio - a.hasAudio || parseInt(b.itag) - parseInt(a.itag);
    });

    return res.json({
      id: id,
      title,
      duration: formatDuration(duration),
      thumbnail: thumbnail,
      formats: formats,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Video ID is invalid",
    });
  }
};

module.exports = { index };
