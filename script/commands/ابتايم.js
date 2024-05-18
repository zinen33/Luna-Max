module.exports.config = {
  name: "ابتايم",
  version: "1.0.0",
  hasPermission: 0,
  credits: "يـاسـيـن",
  description: "خدمات",
  usePrefix: true,
  commandCategory: "other",
  cooldowns: 5,
	dependencies: {
		"pidusage": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.run = async ({ api, event }) => {
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const pidusage = await global.nodemodule["pidusage"](process.pid);

	const timeStart = Date.now();
	return api.sendMessage("", event.threadID, () => api.sendMessage(`وقـت الـتـشـغـيـل ${hours}  سـاعـة و ${minutes} دقـيـقـة و ${seconds} ثـانـيـة.\n\n✅❯ عـدد الـمـسـتـخـدمـيـن: 【${global.data.allUserID.length}】\n\n✅❯ عـدد الـمـجـمـوعـات: 【${global.data.allThreadID.length}】\n\n✅❯ اسـتـخـدام الـمـعـالـج: 【${pidusage.cpu.toFixed(1)}】%\n\n✅❯ اسـتـخـدام الـرام: 【${byte2mb(pidusage.memory)}】\n\n✅❯ الـبـيـنـج: 【${Date.now() - timeStart}】 مـلـي ثـانـيـة`, event.threadID, event.messageID));
    }
