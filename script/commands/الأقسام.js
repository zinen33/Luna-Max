module.exports.config = {
  name: "الاقسام",
  version: "1.0.0",
  hasPermission: 0,
  credits: "baby august",
  description: "مرشد المبتدئين الجدد",
  commandCategory: "البوت",
  usages: "قم برؤية كل الأوامر",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 30
  }
};

  const mathSansBold = {
  A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
  J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
  S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", a: "𝗔", b: "𝗕", c: "𝗖", d: "𝗗", e: "𝗘", f: "𝗙", g: "𝗚", h: "𝗛", i: "𝗜",
  j: "𝗝", k: "𝗞", l: "𝗟", m: "𝗠", n: "𝗡", o: "𝗢", p: "𝗣", q: "𝗤", r: "𝗥",
  s: "𝗦", t: "𝗧", u: "𝗨", v: "𝗩", w: "𝗪", x: "𝗫", y: "𝗬", z: "𝗭"
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("commands") != 0) return;
  const splitBody = body.slice(body.indexOf("commands")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermission == 0) ? getText("user") : (command.config.hasPermission == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};

module.exports.run = async function ({ api, event, args }) {
  const uid = event.senderID;
  const userName = (await api.getUserInfo(uid))[uid].name;

  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  const categories = new Set();
  const categorizedCommands = new Map();

  for (const [name, value] of commands) {
    const categoryName = value.config.commandCategory;
    if (!categories.has(categoryName)) {
      categories.add(categoryName);
      categorizedCommands.set(categoryName, []);
    }
    categorizedCommands.get(categoryName).push(`│ ✧ ${value.config.name}`);
  }

  let msg = `أهلا يا ${userName}, إليك بعض الأوامر اللتي قد تساعدك:\n`;

  for (const categoryName of categories) {
    const categoryNameSansBold = categoryName.split("").map(c => mathSansBold[c] || c).join("");
    msg += `╭─❍「 ${categoryNameSansBold} 」\n`;
    msg += categorizedCommands.get(categoryName).join("\n");
    msg += "\n╰───────────⟡\n";
  }

  const randomQuotes = [
  "للأخطبوطات ثلاثة قلوب: اثنان يضخان الدم إلى الخياشيم، وواحد يضخه إلى بقية الجسم.",
    "العسل لا يفسد أبدًا؛ عثر علماء الآثار على أوعية من العسل في مقابر المصريين القدماء يزيد عمرها عن 3000 عام","البوت لديه قلب بحجم سيارة",
    "لدى الأبقار أفضل الأصدقاء ويمكن أن تصاب بالتوتر عندما تنفصل عنهم.",
    "أقصر حرب في التاريخ كانت بين بريطانيا وزنجبار في 27 أغسطس 1896؛ واستسلمت زنجبار بعد 38 دقيقة.",
    "يمشي الشخص العادي ما يعادل ثلاث مرات حول العالم في حياته.",
    "الدببة القطبية تستخدم يدها اليسرى.",
    "وحيد القرن هو الحيوان الوطني في اسكتلندا.",
    "مجموعة من طيور النحام تسمم ملتهبة ",
    "هناك تكرارات محتملة للعبة الشطرنج أكثر من عدد الذرات في الكون المعروف",
    "إن رائحة العشب المقطوع حديثًا هي في الواقع نداء استغاثة للنبات.",
    "اليوم على كوكب الزهرة أطول من عامه.",
    "يستطيع نحل العسل التعرف على وجوه البشر.",
    "أنبوب الومبت على شكل مكعب.",
    "البرتقالات الأولى لم تكن برتقالية.",
    "أطول مدة بين ولادة توأم هي 87 يومًا.",
    "صاعقة البرق أشد حرارة من الشمس بست مرات.",
    "يُطلق على البفن الصغير اسم النفخ.",
    "اللمحة هي وحدة زمنية فعلية: 1/100 من الثانية.",
    "كلمة 'الطالب الذي يذاكر كثيرا' صاغها الدكتور سوس لأول مرة في 'إذا قمت بتشغيل حديقة الحيوان'.",
    "هناك نوع من قناديل البحر خالد بيولوجيا.",
    "يمكن أن يصل ارتفاع برج إيفل إلى 6 بوصات خلال فصل الصيف بسبب تمدد الحديد.",
    "الأرض ليست كرة مثالية؛ فهي مفلطحة قليلاً عند القطبين ومنتفخة عند خط الاستواء.",
    "الطائر الطنان يزن أقل من بنس واحد.",
    "تمتلك الكوالا بصمات أصابع متطابقة تقريبًا مع بصمات البشر.",
    "هناك بلدة في النرويج لا تشرق فيها الشمس لعدة أسابيع في الشتاء، ولا تغرب لعدة أسابيع في الصيف.",
    "جماعة من البوم تسمى برلمان.",
    "لا يمكن تمييز بصمات أصابع الكوالا عن بصمات أصابع البشر لدرجة أنه يتم الخلط بينها في بعض الأحيان في مسرح الجريمة.",
    "تحتوي أبجدية هاواي على 13 حرفًا فقط.",
    "يقضي الشخص العادي ستة أشهر من حياته في انتظار أن تتحول الأضواء الحمراء إلى اللون الأخضر.",
    "يبلغ طول الكنغر حديث الولادة حوالي بوصة واحدة.",
    "أقدم شجرة حية معروفة عمرها أكثر من 5000 سنة.",
    "سيكون لون كوكا كولا أخضر إذا لم تتم إضافة اللون إليه.",
    "يبلغ طول اليوم على المريخ حوالي 24.6 ساعة.",
    "لا يمكن رؤية سور الصين العظيم من الفضاء بدون مساعدة.",
    "مجموعة من الغربان تسمى جريمة قتل.",
    "هناك مكان في فرنسا يمكنك أن تشهد فيه الوهم البصري الذي يجعلك تبدو وكأنك تنمو وتتقلص أثناء المشي أسفل التل.",
    "أكبر صحراء في العالم هي القارة القطبية الجنوبية وليست الصحراء الكبرى.",
    "قلب الحوت الأزرق كبير جدًا لدرجة أن الإنسان يستطيع السباحة عبر شرايينه.",
    "أطول كلمة في اللغة الإنجليزية بدون حرف متحرك هي كلمة' إيقاعات'.",
    "فراء الدببة القطبية ليس أبيض اللون؛ إنها في الواقع شفافة.",
    "اخترع الكرسي الكهربائي من قبل طبيب الأسنان.",
    "عين النعامة أكبر من دماغها.",
    "أنبوب الومبت على شكل مكعب."
  ];

  const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

  msg += `├─────☾⋆\n│ » إجمالي عدد الأوامر : [ ${commands.size} ]\n│「 ${global.config.BOTNAME} 」\n╰──────────⧕\n\nمجموعة من الحقائق: ${randomQuote}`;

  return api.sendMessage(msg, threadID, async (error, info) => {
    if (autoUnsend) {
      await new Promise(resolve => setTimeout(resolve, delayUnsend * 60000));
      return api.unsendMessage(info.messageID);
    } else return;
  });
};1
