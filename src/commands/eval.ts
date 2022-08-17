import { Command, CommandActionProperties } from "../commands.js";

new Command({
  name: "eval",
  description: "A command for debugging the bot", 
  // eslint-disable-next-line no-unused-vars
  action: async ({discordClient, collections, interaction}: CommandActionProperties) => {

    // Make sure they're allowed to eval
    if ((interaction.member || interaction.user).id !== "419881371004174338") return await interaction.createFollowup("I don't think I want to do that.");
    
    // Make sure we have a code string.
    const code = interaction.data.options?.find(option => option.name === "code")?.value;
    if (typeof code !== "string") {

      return await interaction.createFollowup("You need to ");

    }

    try {

      // Run the code.
      eval(code);

      // End the interaction with a response.
      return await interaction.createFollowup("Done!");

    } catch (err: any) {

      // Return the error.
      return await interaction.createFollowup({
        content: err.message,
        embeds: [{description: err.stack}]
      });

    }

  },
  cooldown: 0, 
  slashOptions: [
    {
      name: "code",
      description: "The code you want to run",
      type: 3,
      required: true
    }
  ]
});