import { createCanvas, loadImage } from "canvas"
import { MessageAttachment } from "discord.js"
import { fitCover } from "../../functions/canvas/fitCover"
import { Command } from "../../structures/Command"

export default new Command({
    name: "rainbow",
    description: "Check rainbow rate....",
    options: [
        {
            type: 6,
            name: "user",
            description: "The target user.",
            required: true,
        },
    ],
    async execute(command) {
        let user = command.options.getUser("user") || command.user

        const canvas = createCanvas(500, 500)
        const ctx = canvas.getContext("2d")

        let avatarURL = user.displayAvatarURL({ dynamic: false, format: "png", size: 512 })

        await loadImage(avatarURL)
            .then((avatar) => ctx.drawImage(avatar, 0, 0, 500, 500))
            .catch(console.error)

        let rainbowImage = await loadImage("./assets/images/rainbow.png")

        ctx.globalAlpha = 0.4

        fitCover(ctx, canvas, rainbowImage)

        const files = [new MessageAttachment(canvas.toBuffer(), "rainbow.png")]

        command.followUp({ files }).catch(console.error)
    },
})
