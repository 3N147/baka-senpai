import { readdirSync } from "fs"
import { ExtendedClient } from "../structures/Client"

export default async (client: ExtendedClient) => {
    const path = `${__dirname}/../interaction/button/`
    readdirSync(path)
        .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
        .forEach(async (file) => {
            const selectMenu = await client.importFile(`${path}/${file}`)
            client.buttons.set(selectMenu.name, selectMenu)
        })
}
