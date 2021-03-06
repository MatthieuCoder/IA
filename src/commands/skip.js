const Command = require("../structure/Command");

module.exports = class Skip extends Command {
	constructor() {
		super({
			name: "skip",
			category: "music",
			aliases: [],
			description: "The command skips the current song",
			usage: "{{prefix}}skip",
			cooldown: 0
		});
	}

	run(client, message, _args) {
		if(!message.member.voice.channel) return message.channel.send("⚠ You must be connected in a voice channel!");

		const player = client.manager.players.get(message.guild.id);
		if (!player || !player.playing) return message.channel.send("❌ I'm not connected in a voice channel or I'm not playing!");

		const data = client.radio.get(message.guild.id);
		if (data.status) return message.channel.send("⚠ The radio is currently playing, the music queue is disabled!");

		if(player.paused) player.pause(false);

		message.channel.send("⏩ Skipping ...").then(() => {
			try {
				player.stop();
			} catch (exception) {
				console.error(exception);
				return message.channel.send("❌ An error has occurred!");
			}
		});
	}
};