const moment = require("moment");
function formatDuration(seconds) {
  const ms = moment.duration(seconds, "seconds").as("milliseconds");
  const duration = moment.duration(ms);
  let format = "HH:mm:ss";
  if (duration.hours() <= 0) {
    format = "mm:ss";
  }

  return moment.utc(ms).format(format);
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

module.exports = {
  formatBytes,
  formatDuration,
};
