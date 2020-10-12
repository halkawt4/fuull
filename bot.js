

const Discord = require("discord.js");
const client = new Discord.Client();
const Canvas = require("canvas");
const moment = require("moment");
const zalgo = require("zalgolize");
const math = require("math-expression-evaluator");
const figlet = require("figlet");
const fs = require("fs");
const ms = require("ms");
const prefix = "s=";

client.on("ready", async () => {
  console.log(`${client.user.tag}!`);
  console.log(`Hay ${client.users.silze} usuarios.`);
  client.user.setGame(``);
});

client.on("message", message => {
  if (message.content.startsWith("s=feedback")) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists(gg => gg.name === "Support Team"))
      return message.channel.send(
        `**CREATE ROLE LIKE THAT** \`Support Team\`.`
      );
    if (
      message.guild.channels.filter(
        Channel =>
          Channel.name == `ticket-${message.author.id}` &&
          Channel.type == "text"
      ).size > 0
    )
      return message.channel.send(`You already have a ticket open.`);
    message.guild
      .createChannel(`ticket-${message.author.id}`, "text")
      .then(c => {
        let role = message.guild.roles.find(gg => gg.name === "Support Team");
        let role2 = message.guild.roles.find(gg => gg.name === "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.guild.id, {
          READ_MESSAGES: false
        });
        message.channel.send(
          `:white_check_mark: Your ticket has been created, ${c}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `**RIGHT FEEDBACK WE ANSWER YOU****Support Staff**.`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  } else if (message.content.startsWith("closet")) {
    if (!message.guild.roles.exists(gg => gg.name === "Support Team"))
      return message.channel.send(` CREATE ROLE LIKE  THAT \`Support Team\`.`);
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send("This isn't a ticket channel!");
    if (
      !message.member.roles.has(
        message.guild.roles.filter(r => r.name === "Support Team").first().id
      )
    )
      return message.channel.send("You don't have the `Support Team` role!");
    message.channel
      .delete()
      .catch(e => message.channel.send("Check my permissions!"));
  }
});

client.on("message", zaid => {
  if (zaid.content === "s=bot") {
    const bot = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("BLUE")
      .addField(
        "**__PING__**: ",
        ` ${Date.now() - zaid.createdTimestamp}`,
        true
      )
      .addField("**____SERVERS____** : ", `→ ${client.guilds.size}`, true)
      .addField("**__CHANNELS__** : ", `→ ${client.channels.size} `, true)
      .addField("**__MEMBERS__** : ", `→ ${client.users.size} `, true)
      .addField("**__BOT NAME__** : ", `→ ${client.user.tag} `, true)
      .addField(
        "**__BOT OWNER__** : ",
        `→ <@603638987264884746> | <@747565043100680192>`
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/696375751368507462/741216728121475144/Hnet.com-image_3.gif"
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/696375751368507462/741215968294076416/image0-30.gif"
      )
      .setFooter(zaid.author.username, zaid.author.avatarURL);
    zaid.channel.send(bot);
  }
});

client.on("message", message => {
  let client;
  if (message.content === "s=close") {
    if (!message.channel.guild) return message.reply("JUST FOR SERVERS");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "|| YOU DONT HAVE PERMITION || ```MANAGE MESSAGES```"
      );
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("∅ THE CHANNEL CLOSED ∅");
      });
  }

  if (message.content === "s=open") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "**|| YOU DONT HAVE PERMITION ||```MANAGE_MESSAGES``**"
      );
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("✓ THE CHANNEL OPEND ✓ ");
      });
  }
});

client.on("typingStart", (ch, user) => {
  if (user.presence.status === "offline") {
    ch.send(`${user}(: :blush: Why You Offline ?!😅`).then(msg => {
      msg.delete(10000);
    });
  }
});

const invites = {};
const wait = require("util").promisify(setTimeout);
client.on("ready", () => {
  wait(1000);
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("message", message => {
  if (message.content.includes("discord.gg")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.delete();
      message.reply("```PLEASE DO NOT SEND LINK BY YOUR SELF```");
      message.react("🚫");
    }
  }
});

client.on("message", message => {
  if (message.content.startsWith("s=mall")) {
    if (!message.member.hasPermission("MOVE_MEMBERS"))
      return message.channel.send("**You Dont Have Permition**");
    if (!message.guild.member(client.user).hasPermission("MOVE_MEMBERS"))
      return message.reply(
        "**__SORRY YOU DONT HAVE PERMITION FOR THIS WORK__**"
      );
    if (message.member.voiceChannel == null)
      return message.channel.send(`**__GO TO VOICE AND WRITE THE COMAND__**`);
    var author = message.member.voiceChannelID;
    var m = message.guild.members.filter(m => m.voiceChannel);
    message.guild.members
      .filter(m => m.voiceChannel)
      .forEach(m => {
        m.setVoiceChannel(author);
      });
    message.channel.send(`✅ **ALL IN THE VOICE MOVED TO YOUR VOICE**`);
  }
});

client.on("message", message => {
  if (message.content.startsWith("s=sr")) {
    if (!message.channel.guild)
      return message.channel.send(` | This Command is used only in servers!`);
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
    const days = millis / 1000 / 60 / 60 / 24;
    var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField(":id:✽** SERVER ID:**", `» ${message.guild.id} `, true)
      .addField(
        ":calendar:✽** CREATED AT**",
        `» ${message.guild.createdAt.toLocaleString()}`,
        true
      )
      .addField(":crown: ✽**SERVER OWNER**", `**${message.guild.owner}**`, true)
      .addField(
        `✽** MEMBERS  ** [${message.guild.members.size}]`,
        `**${
          message.guild.members.filter(c => c.presence.status !== "offline")
            .size
        }** **ONLINS**`,
        true
      )
      .addField(
        ":speech_balloon:✽** CHANNELS**",
        `» **${message.guild.channels.filter(m => m.type === "text").size}**` +
          " TEXT | VOICE" +
          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,
        true
      )
      .addField("🌎✽**NATIONALTY**", ` ${message.guild.region}`, true)
      .setImage(
        "https://cdn.discordapp.com/attachments/696375751368507462/734050912997343302/1733b070075597d4b401929cfd35bbcb.gif"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/734749917062496298/737045337167888394/image0.gif"
      )
      .setColor("BLUE");
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.author.bot) return;

  if (!message.content.startsWith("s=say")) return;

  let command = message.content.split("s=say")[0];
  command = command.slice("");

  let args = message.content.split("s=say").slice(1);

  if (command === "s=say") {
    if (!message.channel.guild)
      return message.channel
        .send("|| YOU DONT HAVE PERMITION || MANAGE_MESSAGES")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("SEND_MESSAGES"))
      return message.channel.send(
        "|| YOU DONT HAVE PERMITION || MANAGE_MESSAGES"
      );
    message.delete();
    message.channel.sendMessage(args.join("s=say"));
  }

  if ("s=say") {
    if (!message.channel.guild)
      return message.channel.send("JUST FOR SERVERS").then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "|| YOU DONT HAVE PERMITION || MANAGE_MESSAGES"
      );
    let say = new Discord.RichEmbed()
      .setDescription(args.join(" "))
      .setColor(0x23b2d6)
      .setImage(
        "https://cdn.discordapp.com/attachments/728333268918861845/729754125847232552/image0-2.gif"
      );
    message.channel.sendEmbed(say);
    message.delete();
  }
});

client.on("message", fantic => {
  if (fantic.content === "s=close") {
    if (!fantic.member.hasPermission("ADMINISTRATOR"))
      return fantic.react(":x:");
    fantic.channel.overwritePermissions(fantic.guild.id, {
      VIEW_CHANNEL: false
    });
    fantic.react("🔒");
  }
});

client.on("message", fantic => {
  if (fantic.content === "s=open") {
    if (!fantic.member.hasPermission("ADMINISTRATOR"))
      return fantic.react(":x:");
    fantic.channel.overwritePermissions(fantic.guild.id, {
      VIEW_CHANNEL: true
    });
    fantic.react("🔓");
  }
});

const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");

const queue = new Map();
var table = require("table").table;
client.on("ready", () => {
  console.log(`Iam Ready My Owner ${client.user.tag}!`);
});

client.on("ready", () => {
  console.log(`Online In Servers : ${client.guilds.size} `);
  let statuses = [`s=help | Iam Ready My Owner `];

  setInterval(function() {
    let STREAMING = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(STREAMING, {
      type: "playing",
      url: "https://www.twitch.tv/faith"
    });
  }, 2000);
});

/////////////////////////

client.on("message", message => {
  if (message.content === "s=help") {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setImage(
        "https://cdn.discordapp.com/attachments/703243461079597138/708070790079184957/image0.gif"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/734749917062496298/736998545407737977/image0.gif"
      )
      .setTitle("𝗜𝗡𝗩𝗜𝗧𝗘")

      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=732917544628781097&permissions=8&scope=bot"
      ).setDescription(`

**< 𝗧𝗵𝗲 𝗕𝗼𝘁 𝗣𝗿𝗲𝗳𝗶𝘅 [ 𝘀= ] >**

✽ **__𝗣𝘂𝗯𝗹𝗶𝗰 𝗖𝗼𝗺𝗮𝗻𝗱𝘀__** ✽
𝗯𝗼𝘁,𝘂𝘀𝗲𝗿,𝗮𝘃𝗮𝘁𝗮𝗿,𝗳𝗲𝗮𝗱𝗯𝗮𝗰𝗸,𝗶𝗻𝘃,𝗺𝗲𝗺𝗯𝗲𝗿𝘀,𝗽𝗿𝗼,𝘀𝘂𝗽,𝗿𝗼𝗹𝗲𝘀

✽ **__𝗔𝗱𝗺𝗶𝗻 𝗖𝗼𝗺𝗮𝗻𝗱𝘀__** ✽
𝗰𝗹𝗼𝘀𝗲,𝗼𝗽𝗲𝗻,𝗺𝗮𝗹𝗹,𝗰𝗹𝗲𝗮𝗿,𝗺𝘂𝘁𝗲,𝗸𝗶𝗰𝗸,𝗯𝗮𝗻,𝘀𝗮𝘆,𝘀𝗿,𝘂𝗻𝗺𝘂𝘁𝗲
 
{ guest } 𝗥𝗶𝗴𝗵𝘁 𝗥𝗼𝗹𝗲 𝗟𝗶𝗸𝗲 𝗧𝗵𝗮𝘁 𝗙𝗼𝗿 𝗔𝘂𝘁𝗼𝗥𝗼𝗹𝗶𝗻𝗴
{ invite } 𝗥𝗶𝗴𝗵𝘁 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗟𝗶𝗸𝗲 𝗧𝗵𝗮𝘁 𝗙𝗼𝗿 𝗜𝗻𝘃𝗶𝘁𝗲 𝗠𝗮𝗻𝗲𝗴𝗲𝗿
{ log } 𝗥𝗶𝗴𝗵𝘁 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗟𝗶𝗸𝗲 𝗧𝗵𝗮𝘁 𝗧𝗵𝗲 𝗟𝗼𝗴 𝗢𝗳 𝗬𝗼𝘂𝗿 𝗦𝗲𝗿𝘃𝗲𝗿 𝗔𝗹𝗹 𝗜𝗻
`);

    message.channel.sendEmbed(embed);
  }
});

/////////////////////////

client.on("message", message => {
  if (message.content === "s=inv") {
    if (!message.channel.guild)
      return message.reply(
        "Please Do not type bot commands in bot private chat"
      );
    let embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("=--> CLICK HERE TO INVITE <--=")
      .setImage(
        "https://cdn.discordapp.com/attachments/723965189635964999/733595390498177054/image0.gif"
      )
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=732917544628781097&permissions=8&scope=bot"
      )
      .setFooter("", message.author.avatarURL);
    message.channel.sendEmbed(embed);
  }
});

/////////////////////////////////::://:/:////////////////:///////



///////////////////////////////////////////////.////////////////

client.on("message", message => {
  if (message.author.x5bz) return;
  let command = message.content.split(" ")[0];
  let args = message.content.split(" ").slice(1);

  if (command == "s=kick") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Dont have ` KICK_MEMBERS ` Perms**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Dont have ` KICK_MEMBERS ` Perms**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1)
      return message.reply("**You Need to meniton user**");
    if (!message.guild.member(user).kickable)
      return message.reply("**he have role higer then you !**");

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()
      .setAuthor(`**KICKED!**`, user.displayAvatarURL)
      .setColor("BLUE")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});

client.on("message", message => {
  var prefix = "s=";
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
    if (!message.channel.guild) return message.reply("**Just For SerVers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("** ` BAN_MEMBERS ` You Dont Have Permtion**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("** ` BAN_MEMBERS ` The Bot Dont Have Permition**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1)
      return message.reply("**Mention The User**");
    if (!reason) return message.reply("**Right The Reason**");
    if (!message.guild.member(user).bannable)
      return message.reply("**he have role higer then you !**");

    message.guild.member(user).ban(7, user);

    const banembed = new Discord.RichEmbed()
      .setAuthor(`BANNED!`, user.displayAvatarURL)
      .setColor("BLUE")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**Baned Bye**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reasion:**", "**[ " + `${reason}` + " ]**");

    message.channel.send({
      embed: banembed
    });
  }
});

client.on("message", message => {
  if (message.content === "s=sup") {
    if (!message.channel.guild)
      return message.reply(
        "Please Do not type bot commands in bot private chat"
      );
    let embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("=--> CLICK HERE TO JOIN <--=")
      .setImage(
        "https://cdn.discordapp.com/attachments/734749917062496298/737045337167888394/image0.gif"
      )
      .setURL("https://discord.gg/a8aVyFY")
      .setFooter(
        "WE HOPE YOU HAPY TIME IN THE SERVER",
        message.author.avatarURL
      );
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.content.startsWith("s=avatar")) {
    if (message.author.bot || message.channel.type == "dm") return;
    var args = message.content.split(" ")[1];
    var avt = args || message.author.id;
    client
      .fetchUser(avt)
      .then(user => {
        avt = user;
        let avtEmbed = new Discord.RichEmbed()
          .setColor("BLUE")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/734749917062496298/737045337167888394/image0.gif"
          )
          .setAuthor(`${avt.username}'s Avatar`, message.author.avatarURL)
          .setImage(avt.avatarURL)
          .setFooter(``, message.client.user.avatarURL);
        message.channel.send(avtEmbed);
      })
      .catch(() => message.channel.send(`Error`));
  }
});

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content == "s=members")
    var embed = new Discord.RichEmbed()

      .setTitle("**🌷| Members Info**")
      .addField(
        "** Members count👥.:**",
        `__** [ ${message.guild.memberCount} ]**__`,
        true
      )
      .addField(
        "📗|online",
        ` ${
          message.guild.members.filter(m => m.presence.status == "online").size
        }`
      )
      .addField(
        "📓| offline",
        `${
          message.guild.members.filter(m => m.presence.status == "offline").size
        }`
      )

      .setFooter(`Requested By | ${message.author.tag}`)
      .setColor("BLUE");
  message.channel.send(embed);
});

client.on("message", message => {
  var args = message.content.split(" ").slice(1);
  if (message.content.startsWith("s=user")) {
    var year = message.author.createdAt.getFullYear();
    var month = message.author.createdAt.getMonth();
    var day = message.author.createdAt.getDate();
    var men = message.mentions.users.first();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (args == "") {
      var z = message.author;
    } else {
      var z = message.mentions.users.first();
    }

    let d = z.createdAt;
    let n = d.toLocaleString();
    let x;
    let y;

    if (z.presence.game !== null) {
      y = `${z.presence.game.name}`;
    } else {
      y = "No Playing... |💤.";
    }
    if (z.bot) {
      var w = "Bot";
    } else {
      var w = "User";
    }
    let embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .addField("**🔱| Name **:", `**<@` + `${z.id}` + `>**`, true)
      .addField("**🛡| ID **:", "**" + `${z.id}` + "**", true)
      .addField("**📛| User Code :**", "**#" + `${z.discriminator}**`, true)
      .addField("**📆| Create At **: ", year + "-" + month + "-" + day)
      .addField("**⌚| Join At :**", message.member.joinedAt.toLocaleString())
      .setThumbnail(`${z.avatarURL}`)

      .setFooter(message.author.username, message.author.avatarURL);

    message.channel.send({ embed });
    if (!message)
      return message.reply("**Mention User  ❌ **").catch(console.error);
  }
});

const bot = new Discord.Client({ disableEveryone: true });

const r1 = require("snekfetch");

client.on("message", async message => {
  if (message.content === "s=pro") {
    message.channel.startTyping();

    setTimeout(() => {
      message.channel.stopTyping();
    }, Math.random() * (1 - 3) + 1 * 1000).then(
      message.channel.send({
        files: [
          {
            name: "prfoilebycutie.png",

            attachment: `https://api.probot.io/profile/${message.author.id}`
          }
        ]
      })
    );
  }
});

client.on("message", message => {
  let args = message.content.split(" ");
  if (args[0].toLowerCase().startsWith("s=roles")) {
    let str = "";
    var role = message.guild.roles.forEach(role => {
      str += " " + role.name + "\n";
    });
    message.channel.send(`\`\`\`${str}\`\`\``);
  }
});

client.on("message", message => {
  if (message.content.startsWith("s=delet")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");

    let args = message.content.split(" ").slice(1);
    let channel = message.client.channels.find("name", args.join(" "));
    if (!channel)
      return message
        .reply("**There is no room like this name -_-**")
        .catch(console.error);
    channel.delete();
  }
});

///////////////////////////////

client.on("message", message => {
  if (message.content.startsWith(`s=mute`)) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      let role = message.guild.roles.find(r => r.name === "Muted");
      let member = message.mentions.members.first();
      if (member) {
        member.removeRoles(member.roles);
        member.addRole(role).catch(console.error);
        message.channel.send(`${member} has been muted!`);
      } else {
        message.channel.send("You need to mention a user!");
      }
    } else {
      message.channel.send("You are not a high enough rank!");
    }
  }
});

client.on("guildMemberAdd", member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const stewart = member.guild.channels.find("name", "invite");
    stewart.send(`<@${member.user.id}>  **__INVITED BY__**  <@${inviter.id}>`);
  });
});

////////////////////////////////////////////////////////////////////////////-///

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;

  var logChannel = message.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  let messageDelete = new Discord.RichEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("BLUE")
    .setThumbnail(message.author.avatarURL)
    .setDescription(
      `**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL);

  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;

  var logChannel = oldMessage.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});

client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = role.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleCreate = new Discord.RichEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("BLUE")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleCreate);
  });
});
client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = role.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleDelete = new Discord.RichEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("BLUE")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleDelete);
  });
});
client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = oldRole.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldRole.name !== newRole.name) {
      let roleUpdateName = new Discord.RichEmbed()
        .setTitle("**[ROLE NAME UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      let roleUpdateColor = new Discord.RichEmbed()
        .setTitle("**[ROLE COLOR UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateColor);
    }
  });
});

client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = channel.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelCreate = new Discord.RichEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("BLUE")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelCreate);
  });
});
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = channel.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelDelete = new Discord.RichEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("BLUE")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelDelete);
  });
});
client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;

  var logChannel = oldChannel.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      let newTopic = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
            "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
            "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
            oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newTopic);
    }
  });
});

client.on("guildBanAdd", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let banInfo = new Discord.RichEmbed()
      .setTitle("**[BANNED]**")
      .setThumbnail(userAvatar)
      .setColor("BLUE")
      .setDescription(
        `**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(banInfo);
  });
});
client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let unBanInfo = new Discord.RichEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("BLUE")
      .setDescription(
        `**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(unBanInfo);
  });
});
client.on("guildUpdate", (oldGuild, newGuild) => {
  if (!oldGuild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldGuild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = oldGuild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  oldGuild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldGuild.name !== newGuild.name) {
      let guildName = new Discord.RichEmbed()
        .setTitle("**[CHANGE GUILD NAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild name.\n\n**Old Name:** \`\`${oldGuild.name}\`\`\n**New Name:** \`\`${newGuild.name}\`\`\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(newGuild.name, oldGuild.iconURL);

      logChannel.send(guildName);
    }
    if (oldGuild.region !== newGuild.region) {
      let guildRegion = new Discord.RichEmbed()
        .setTitle("**[CHANGE GUILD REGION]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild region.\n\n**Old Region:** ${oldGuild.region}\n**New Region:** ${newGuild.region}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldGuild.name, oldGuild.iconURL);

      logChannel.send(guildRegion);
    }
    if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
      if (oldGuild.verificationLevel === 0) {
        var oldVerLvl = "Very Easy";
      } else if (oldGuild.verificationLevel === 1) {
        var oldVerLvl = "Easy";
      } else if (oldGuild.verificationLevel === 2) {
        var oldVerLvl = "Medium";
      } else if (oldGuild.verificationLevel === 3) {
        var oldVerLvl = "Hard";
      } else if (oldGuild.verificationLevel === 4) {
        var oldVerLvl = "Very Hard";
      }

      if (newGuild.verificationLevel === 0) {
        var newVerLvl = "Very Easy";
      } else if (newGuild.verificationLevel === 1) {
        var newVerLvl = "Easy";
      } else if (newGuild.verificationLevel === 2) {
        var newVerLvl = "Medium";
      } else if (newGuild.verificationLevel === 3) {
        var newVerLvl = "Hard";
      } else if (newGuild.verificationLevel === 4) {
        var newVerLvl = "Very Hard";
      }

      let verLog = new Discord.RichEmbed()
        .setTitle("**[GUILD VERIFICATION LEVEL CHANGE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` Guild Verification level.\n\n**Old Verification Level:** ${oldVerLvl}\n**New Verification Level:** ${newVerLvl}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldGuild.name, oldGuild.iconURL);

      logChannel.send(verLog);
    }
  });
});
client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.guild) return;

  var logChannel = oldMember.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "`**Last Name**`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`**New Name**`";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.RichEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();

      let roleAdded = new Discord.RichEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();

      let roleRemoved = new Discord.RichEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("BLUE")
        .setDescription(
          `**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
    let newOwner = new Discord.RichEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("BLUE")
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

    logChannel.send(newOwner);
  }
});

client.on("voiceStateUpdate", (voiceOld, voiceNew) => {
  if (!voiceOld.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!voiceOld.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = voiceOld.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.tag;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      let serverMutev = new Discord.RichEmbed()
        .setTitle("**[VOICE MUTE]**")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/734749917062496298/742813036066242680/image0.gif"
        )
        .setColor("BLUE")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverMutev);
    }
    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      let serverUnmutev = new Discord.RichEmbed()
        .setTitle("**[VOICE UNMUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png"
        )
        .setColor("BLUE")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUnmutev);
    }
    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      let serverDeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE DEAF]**")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/734749917062496298/742813036066242680/image0.gif"
        )
        .setColor("BLUE")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverDeafv);
    }
    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      let serverUndeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE UNDEAF]**")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/734749917062496298/742813036066242680/image0.gif"
        )
        .setColor("BLUE")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUndeafv);
    }
  });
  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    !voiceOld.voiceChannel
  ) {
    let voiceJoin = new Discord.RichEmbed()
      .setTitle("**[JOIN VOICE ROOM]**")
      .setColor("BLUE")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceJoin);
  }
  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    !voiceNew.voiceChannel
  ) {
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[LEAVE VOICE ROOM]**")
      .setColor("BLUE")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    voiceNew.voiceChannel &&
    voiceOld.voiceChannel != null
  ) {
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[CHANGED VOICE ROOM]**")
      .setColor("BLUE")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith("s=clear")) {
    if (!message.channel.guild)
      return message.reply("? | This Command For Servers Only!");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "? | You dont have **MANAGE_MESSAGES** Permission!"
      );
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "? | I dont have **MANAGE_MESSAGES** Permission!"
      );
    let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args);
    if (args > 99)
      return message
        .reply("**?? || PLEASE JUST CAN DELETE 100 MSG.**")
        .then(messages => messages.delete(5000));
    if (!messagecount) args = "100";
    message.channel
      .fetchMessages({ limit: messagecount + 1 })
      .then(messages => message.channel.bulkDelete(messages));
    message.channel
      .send(`\`${args}\` : __ NUMBER OF MESSAGE DELETED __ `)
      .then(messages => messages.delete(5000));
  }
});

client.on("message", message => {
  if (message.content.includes("@everyone")) {
    if (!message.member.hasPermission("MANAGE_MESSAGE")) {
      message.delete();
      message.reply(
        "** Please Dont Sent __Everyone__ Go Cheack Your Permition **"
      );
    }
  }
});

client.on("message", message => {
  if (message.content.includes("@everyone@everyone")) {
    if (!message.member.hasPermission("MANAGE_MESSAGE")) {
      message.delete();
      message.reply(
        "** Please Dont Sent __Everyone__ Go Cheack Your Permition **"
      );
    }
  }
});

 

client.on("message", message => {
  if (message.content.startsWith("s=u")) {
    if (!message.channel.guild)
      return message.reply(`This Comand Just For Servers ❌`);

    message.guild.fetchInvites().then(invs => {
      let member = client.guilds

        .get(message.guild.id)

        .members.get(message.author.id);

      let personalInvites = invs.filter(
        i => i.inviter.id === message.author.id
      );

      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);

      var moment = require("moment");

      var args = message.content.split(" ").slice(1);

      let user = message.mentions.users.first();

      var men = message.mentions.users.first();

      let args1 = message.content.split(" ")[1];

      let mention =
        message.mentions.users.first() ||
        message.author ||
        message.guild.members.get(args1);

      var heg;

      if (men) {
        heg = men;
      } else {
        heg = message.author;
      }

      var mentionned = message.mentions.members.first();

      var h;

      if (mentionned) {
        h = mentionned;
      } else {
        h = message.member;
      }

      moment.locale("ar-TN");

      let lastVoice = {};

      client.on("voiceStateUpdate", (oldMember, newMember) => {
        if (!newMember.voiceChannel) {
          lastVoice[newMember.id] = {
            time: new Date().getTime()
          };
        }
      });

      var last;

      if (!lastVoice[mention.id]) {
        if (message.member.voiceChannel)
          last = `Last See In Voice: \`${message.member.voiceChannel.name}\``;
        else last = ` ${mention.tag} Never Join Any Room`;
      }

      var id = new Discord.RichEmbed()

        .setThumbnail(message.author.avatarURL)

        .setColor("BLUE")

        .addField(
          "** Your Acount Create At ** :",

          `${moment(heg.createdTimestamp).format(
            "YYYY/M/D HH:mm:ss"
          )} **\n** \`${moment(heg.createdTimestamp).fromNow()}\``,

          true
        )

        .addField(
          "** Your Acount Join At ** :",

          `${moment(h.joinedAt).format("YYYY/M/D HH:mm:ss")} \n \`${moment(
            h.joinedAt
          ).fromNow()}\``,

          true
        )

        .addField("**Number Of Invites** :", inviteCount, false)

        .setFooter(
          `${mention.tag}`,
          "https://cdn.discordapp.com/attachments/705295880215068722/719010959691219005/ID_symbol_B-W_128x128.gif"
        );

      message.channel.sendEmbed(id);
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith("s=user")) {
    if (!message.channel.guild)
      return message.reply(`This Comand Just For Servers❌`);

    message.guild.fetchInvites().then(invs => {
      let member = client.guilds

        .get(message.guild.id)

        .members.get(message.author.id);

      let personalInvites = invs.filter(
        i => i.inviter.id === message.author.id
      );

      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);

      var moment = require("moment");

      var args = message.content.split(" ").slice(1);

      let user = message.mentions.users.first();

      var men = message.mentions.users.first();

      let args1 = message.content.split(" ")[1];

      let mention =
        message.mentions.users.first() ||
        message.author ||
        message.guild.members.get(args1);

      var heg;

      if (men) {
        heg = men;
      } else {
        heg = message.author;
      }

      var mentionned = message.mentions.members.first();

      var h;

      if (mentionned) {
        h = mentionned;
      } else {
        h = message.member;
      }

      moment.locale("ar-TN");

      let lastVoice = {};

      client.on("voiceStateUpdate", (oldMember, newMember) => {
        if (!newMember.voiceChannel) {
          lastVoice[newMember.id] = {
            time: new Date().getTime()
          };
        }
      });

      var last;

      if (!lastVoice[mention.id]) {
        if (message.member.voiceChannel)
          last = `Last See In Voice: \`${message.member.voiceChannel.name}\``;
        else last = ` ${mention.tag} Never kikiJoin Any Room`;
      } else
        last =
          Math.floor(
            (new Date().getTime() - lastVoice[mention.id].time) / 1000 / 60 / 60
          ) +
          " Hours, " +
          Math.floor(
            (new Date().getTime() - lastVoice[message.author.id].time) /
              1000 /
              60
          ) +
          " Minutes, " +
          Math.floor(
            (new Date().getTime() - lastVoice[message.author.id].time) / 1000
          ) +
          " Seconds";

      var id = new Discord.RichEmbed()

        .setThumbnail(message.author.avatarURL)

        .setColor("BLUE")

        .addField(
          "**Number Of Invites** :",

          `${moment(heg.createdTimestamp).format("YYYY/M/D")} **\n** \`${moment(
            heg.createdTimestamp
          ).fromNow()}\``,

          true
        )

        .addField(
          "** Your Acount Join At ** :",

          `${moment(h.joinedAt).format("YYYY/M/D")} \n\`${moment(
            h.joinedAt
          ).fromNow()}\``,

          true
        )

        .addField("** The Last Time You Was In voice**:", `${last}`)

        .addField("**Number Of Invites** :", inviteCount, false)

        .setFooter(
          `${mention.tag}`,
          "https://cdn.discordapp.com/attachments/705295880215068722/719010959691219005/ID_symbol_B-W_128x128.gif"
        );

      message.channel.sendEmbed(id);
    });
  }
});

client.on("guildCreate", guild => {
  const embed = new Discord.RichEmbed() ///Codes
    .setColor("BLUE")
    .setTitle(`**JOINED**`).setDescription(`**  
    __Server Name__ → ${guild.name}
    __Server Owner__ → ${guild.owner}
    __Server ID__ → ${guild.id}
    __Mebmers Count__ → ${guild.memberCount}
    __Server Count__ → ${client.guilds.size}**`);
  client.channels.find("name", "logs").sendEmbed(embed);
});
client.on("guildDelete", guild => {
  const embed = new Discord.RichEmbed().setColor("BLUE").setTitle(`**KICKED**`)
    .setDescription(`**
     __Server Name__ → ${guild.name}
     __Server Owner__ → ${guild.owner}
     __Server ID__ → ${guild.id}
     __Mebmers Count__ → ${guild.memberCount}
     __Server Count__ → ${client.guilds.size}**`);
  client.channels.find("name", "logs").sendEmbed(embed);
});







client.login("");
