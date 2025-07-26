import figlet from "figlet";
import cli from "inquirer";

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
                    return "❌ tu consulta debe tener un mínimo de 20 caracterés";
                }
                if (length > 150) {
                    return "❌ tu consulta debe tener máximo 150 caractéres";
                }
                return true;
            }
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