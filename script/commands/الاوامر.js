module.exports.config = {
    name: "اوامر",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "انس",
    MOHAMED: true,
    usePrefix: false,
    description: "قائمة الأوامر",
    commandCategory: "نظام",
    usages: "[Name module]",
    cooldowns: 5,
    envConfig: {
        autoUnsend: true,
        delayUnsend: 20
    }
};

module.exports.languages = {
    "en": {
        "moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
        "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
        "user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
    }
};

module.exports.handleEvent = function ({ api, event, getText }) {
    const { commands } = global.client;
    const { threadID, messageID, body } = event;

    if (!body || typeof body == "cmd" || body.indexOf("help") != 0) return;
    const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
    if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    if (command.config.MOHAMED === true) return;

    return api.sendMessage(getText("moduleInfo", command.config.commandCategory, command.config.name, command.config.description), threadID, messageID);
};

module.exports.run = function ({ api, event, args, getText }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const visibleCommands = Array.from(commands.values()).filter(command => !command.config.MOHAMED);

    let commandGroups = {};
    visibleCommands.forEach(command => {
        if (!commandGroups.hasOwnProperty(command.config.commandCategory)) {
            commandGroups[command.config.commandCategory] = [];
        }
        commandGroups[command.config.commandCategory].push({ name: command.config.name, description: command.config.description });
    });

    let msg = "╭─────────────╮\n    🥷 قـائـمـة اوامـر لـونـا 🪽\n╰─────────────╯\n";
    for (const [category, commands] of Object.entries(commandGroups)) {
        msg += `━━━━━━━━━━━━━━━━━━\n ${category}\n`;
        commands.forEach(cmd => {
            msg += `${cmd.name}\n${cmd.description}\n\n`;
        });
    }
    msg += "\n\n🙆🏻‍♀️نهاية ";
    return api.sendMessage(msg, threadID, messageID);
};