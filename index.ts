#!/usr/bin/env node

import figlet from "figlet";
import cli from "inquirer";

console.log(figlet.textSync(`SQLMIND${"   "}CLI`));
console.log("Tu agente de AI para SQL");
console.log("Convierte fácilmente lenguaje natural en consultas SQL precisas con un solo clic\n");

const getInputUser = async () => {
    try {
        const input = await cli.prompt({
            type: "input",
            name: "promptSQL",
            message: "¿Solo escribe lo que necesitas, y yo lo convertiré a SQL?"
        });
        console.log("Consulta del usuario: ", input.promptSQL);
    } catch (error: any) {
        if (error.isTtyError) {
            console.log(` ❌ El mensaje no se pudo mostrar al usuario | Error: ${error}`);
        } else {
            console.log(`❌ Ocurrió un error | Error: ${error}`);
        }
    }
}

getInputUser();