#!/usr/bin/env node

import color from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import cli from "inquirer";
import ora from "ora";
import { runAgent } from "./config/model.ai.js";

const program = new Command();

const showWelcomeBanner = (): void => {
    console.log(color.cyan(figlet.textSync(`SQLMIND CLI`)));
    console.log(color.yellow("Tu agente de AI para SQL"));
    console.log(color.gray("Convierte fácilmente lenguaje natural en consultas SQL precisas con un solo prompt\n"));
};

const getInputUser = async (): Promise<void> => {
    let spinner = null;
    
    try {
        const input = await cli.prompt({
            type: "input",
            name: "promptSQL",
            message: color.blue("¿Qué consulta SQL necesitas? Descríbelo en lenguaje natural:"),
            validate: (value: string): string | boolean => {
                const trimmedValue = value.trim();
                const length = trimmedValue.length;
                
                if (length === 0) {
                    return color.red("❌ Por favor ingresa una consulta");
                }
                if (length < 5) {
                    return color.red("❌ Tu consulta debe tener un mínimo de 5 caracteres");
                }
                if (length > 200) {
                    return color.red("❌ Tu consulta debe tener máximo 200 caracteres");
                }
                return true;
            }
        });

        if (!input.promptSQL?.trim()) {
            console.log(color.red("Consulta vacía. Intenta nuevamente."));
            return;
        }

        spinner = ora({
            text: color.cyan("🤖 Procesando consulta con IA..."),
            spinner: "bouncingBall"
        }).start();

        const agentResponse = await runAgent(input.promptSQL.trim());
        
        if (!agentResponse?.finalOutput) {
            spinner.fail(color.red("No se pudo generar la consulta SQL"));
            return;
        }

        const sqlGenerate = agentResponse.finalOutput;
        spinner.succeed(color.green("SQL generado exitosamente!\n"));
        
        console.log(color.blue("📋 Tu consulta SQL:"));
        console.log(color.yellow("─".repeat(50)));
        console.log(color.green(sqlGenerate));
        console.log(color.yellow("─".repeat(50)));
        console.log(color.gray("\n💡 Tip: Puedes copiar y pegar esta consulta en tu base de datos\n"));

    } catch (error: unknown) {
        if (spinner) {
            spinner.fail(color.red("Error al procesar la consulta"));
        }

        if (error instanceof Error) {
            if ('isTtyError' in error) {
                console.log(color.red(`Error de terminal: ${error.message}`));
            } else {
                console.log(color.red(`Error: ${error.message}`));
                
                if (process.env.NODE_ENV === 'development') {
                    console.log(color.gray(`Stack trace: ${error.stack}`));
                }
            }
        } else {
            console.log(color.red(`Error desconocido: ${String(error)}`));
        }
        
        console.log(color.yellow("\n💡 Intenta con una consulta más específica o verifica tu conexión"));
    }
};

const showExamples = (): void => {
    console.log(color.cyan("\n📚 Ejemplos de consultas que puedes hacer:\n"));
    
    const examples = [
        "Muestra todos los usuarios activos",
        "Encuentra las ventas del último mes",
        "Obtén el promedio de edad de los clientes",
        "Lista los productos más vendidos",
        "Cuenta cuántos pedidos hay por estado"
    ];
    
    examples.forEach((example, index) => {
        console.log(color.yellow(`${index + 1}.`) + color.white(` ${example}`));
    });
    
    console.log(color.gray("\n💡 Solo describe lo que necesitas en lenguaje natural\n"));
};

// Configuración del programa principal
program
    .name("sqlmind")
    .description("Convierte fácilmente lenguaje natural en consultas SQL precisas con IA")
    .version("1.0.0");

program
    .command("init")
    .description("Inicializa el CLI para interactuar con SQLMIND")
    .action(async () => {
        showWelcomeBanner();
        await getInputUser();
    });

program
    .command("examples")
    .alias("ex")
    .description("Muestra ejemplos de consultas que puedes hacer")
    .action(() => {
        showExamples();
    });

program.action(() => {
    showWelcomeBanner();
    console.log(color.yellow("💡 Usa 'sqlmind init' para comenzar o 'sqlmind examples' para ver ejemplos\n"));
    program.help();
});

if (process.argv.length === 2) {
    showWelcomeBanner();
    console.log(color.yellow("💡 Usa 'sqlmind init' para comenzar o 'sqlmind --help' para ver todas las opciones\n"));
}

program.parse(process.argv);