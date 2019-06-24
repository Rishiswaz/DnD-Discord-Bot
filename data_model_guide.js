var character = {
	id: 'unique_id_for_database',
	userId: 'discord_id',
	guildId: 'discord_channel_id',
	info: {
		slug: " ",
		name: " ",
		size: " ",
		type: " ",
		race: {
			name: " ",
			desc: " ",
			subrace: {
				name : " ",
				desc : " "
			}
		},

	},
	stats: {
		strength: 17,
		dexterity: 13,
		constitution: 11,
		intelligence: 8,
		wisdom: 6,
		charisma: 10,
	},
	bonuses: {
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	},
	savingThrows: {
		strength_save: 0,
		dexterity_save: 0,
		constitution_save: 0,
		intelligence_save: 0,
		wisdom_save:0,
		charisma_save:0,
	},
	armor: {
		armor_class: 0,
		armor_desc: " ",
	}

}

var apply_bonus = function(){
		Object.keys(stats).forEach(key => {
			this.character.bonuses.getElementsByTagName(key) = find_bonus(key);
			console.log(key +' '+find_bonus(key))
			return 1;
		});
	}

var find_bonus = function(input){
	var retVal = this.character.stats.getElementsByTagName(input);
	retVal -= 10;
	retVal /= 2;
	retVal = Math.floor(retVal);
	return retVal
}