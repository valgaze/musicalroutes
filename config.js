var supported_platforms = ["darwin"];

module.exports = {
  "demo_source":"https://www.youtube.com/watch?v=DUMq6imrMmI",
  "platform_supported": platform_supported(supported_platforms),
}

function platform_supported(platforms) {
  return platforms.indexOf(process.platform) > -1
}
