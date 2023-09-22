import * as XLSX from "xlsx";

document.addEventListener("DOMContentLoaded", function () {
    const jsonInput = document.getElementById(
        "jsonInput"
    ) as HTMLTextAreaElement;
    const processButton = document.getElementById(
        "processButton"
    ) as HTMLButtonElement | null;

    if (processButton) {
        processButton.addEventListener("click", async (event) => {
            const jsonText = jsonInput.value;
            try {
                // Elimina comas y divide el texto por líneas
                const lines = jsonText.replace(/,/g, '').split('\n');
                const filteredData: Record<string, string>[] = [];
                let currentRow: Record<string, string> = {}; // Objeto para almacenar los pares clave-valor actuales

                for (const line of lines) {
                    const trimmedLine = line.trim();

                    if (trimmedLine.length === 0) {
                        // Ignora líneas en blanco
                        continue;
                    }

                    // Si la línea contiene ".comment", la ignora
                    if (trimmedLine.includes('.comment')) {
                        continue;
                    }

                    // Elimina las llaves "{}" de la línea
                    const lineWithoutBrackets = trimmedLine.replace(/[{}]/g, '');

                      // Divide la línea por ':', elimina espacios en blanco y agrega los datos en el formato deseado
                      const [key, value] = lineWithoutBrackets.split(":").map((item) => item.trim());
                      filteredData.push({ "Nombre": key, "Valor": value });
                }

                // Agrega el objeto actual al arreglo de datos filtrados
                filteredData.push(currentRow);

                // Crea un libro de Excel
                const ws = XLSX.utils.json_to_sheet(filteredData);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

                // Genera un nombre de archivo único para el Excel
                const uniqueFileName = "output.xlsx";

                // Descarga el archivo Excel
                XLSX.writeFile(wb, uniqueFileName);

            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error al procesar el archivo JSON:", error);
                    alert(
                        "Error al procesar el archivo JSON: " + error.message
                    );
                } else {
                    console.error("Error al procesar el archivo JSON:", error);
                    alert(
                        "Error al procesar el archivo JSON: " + String(error)
                    );
                }
            }
        });
    }
});
