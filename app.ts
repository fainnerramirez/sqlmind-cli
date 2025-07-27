#!/usr/bin/env node

import color from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import cli from "inquirer";
import ora from "ora";
import { runAgent } from "./config/model.ai.js";

const program = new Command();
console.log(figlet.textSync(`SQLMIND${"   "}CLI`));
console.log("Tu agente de AI para SQL");
console.log("Convierte fácilmente lenguaje natural en consultas SQL precisas con un solo prompt\n");

const getInputUser = async () => {
    try {
        const input = await cli.prompt({
            type: "input",
            name: "promptSQL",
            message: "¿Solo escribe lo que necesitas, y yo lo convertiré a SQL?",
            validate: (value: string) => {
                let length: number = value.length;
                if (length < 5) {
                    return "❌ tu consulta debe tener un mínimo de 20 caractéres";
                }
                if (length > 150) {
                    return "❌ tu consulta debe tener máximo 150 caractéres";
                }
                return true;
            }
        });

        const spinner = ora({
            text: color.cyan("Procesando consulta...."),
            spinner: "bouncingBall"
        }).start();

        if (input.promptSQL === "" || input.promptSQL.length === 0) {
            spinner.fail(color.red("Ingresa una consulta válida!"));
        }

        const agentResponse = await runAgent(input.promptSQL);
        const sqlGenerate = agentResponse.finalOutput;
        spinner.succeed("SQL generado:  \n");
        console.log(color.green(sqlGenerate));

    } catch (error: any) {
        if (error.isTtyError) {
            console.log(` ❌ El mensaje no se pudo mostrar al usuario | Error: ${error}`);
        } else {
            console.log(`❌ Ocurrió un error | Error: ${error}`);
        }
    }
}

program
    .name("sqlmind")
    .description("Convierte fácilmente lenguaje natural en consultas SQL precisas con un solo prompt")
    .version("1.0.0")
    .option("-h, --help", "ejemplos de guia para interactuar con el sqlmind cli");

program
    .command("init")
    .description("Inicializa el cli para interactuar con sqlmind")
    .action(() => {
        getInputUser();
    });

program.parse(process.argv);