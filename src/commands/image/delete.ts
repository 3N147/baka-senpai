import { createCanvas, loadImage, registerFont } from "canvas"
import { MessageAttachment, MessageEmbed } from "discord.js"
import { Command } from "../../structures/Command"

export default new Command({
    name: "delete",
    description: "Delete someone.",
    options: [
        {
            type: 6,
            name: "user",
            description: "The target user.",
            required: true,
        },
    ],
    async execute(command) {
        const user = command.options.getUser("user")

        const canvas = createCanvas(1150, 472)
        const ctx = canvas.getContext("2d")

        await loadImage("assets/images/delete.png")
            .then((image) => ctx.drawImage(image, 0, 0, canvas.width, canvas.height))
            .catch(console.error)

        registerFont("assets/fonts/Rubik.ttf", { family: "Rubik" })
        ctx.fillStyle = "black"
        ctx.font = "35px 'RubiK'"

        ctx.fillText(`${user.tag.replace(/( |!)+/g, " ").trim()}.poop`, 435, 195)

        await loadImage(user.displayAvatarURL({ dynamic: false, format: "png", size: 512 }))
            .then((img) => ctx.drawImage(img, 150, 170, 260, 260))
            .catch(console.error)

        const files = [new MessageAttachment(canvas.toBuffer(), "Delete.png")]

        command.followUp({ files }).catch(console.error)
    },
})
