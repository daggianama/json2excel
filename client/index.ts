// import * as XLSX from "xlsx";

// document.addEventListener("DOMContentLoaded", function () {
//     const jsonInput = document.getElementById(
//         "jsonInput"
//     ) as HTMLTextAreaElement;
//     const processButton = document.getElementById(
//         "processButton"
//     ) as HTMLButtonElement | null;

//     if (processButton) {
//         processButton.addEventListener("click", async (event) => {
//             const jsonText = jsonInput.value;
//             try {
//                 // Elimina comas, comillas y divide el texto por líneas
//                 const lines = jsonText.replace(/,/g, '').replace(/"/g, '').split('\n');
//                 const filteredData: Record<string, string>[] = [];
//                 let currentRow: Record<string, string> = {}; // Objeto para almacenar los pares clave-valor actuales

//                 for (const line of lines) {
//                     const trimmedLine = line.trim();

//                     if (trimmedLine.length === 0) {
//                         // Ignora líneas en blanco
//                         continue;
//                     }

//                     // Si la línea contiene ".comment", la ignora
//                     if (trimmedLine.includes('.comment')) {
//                         continue;
//                     }

//                     // Elimina las llaves "{}" de la línea
//                     const lineWithoutBrackets = trimmedLine.replace(/[{}]/g, '');

//                     // Elimina los comentarios que comienzan con // y contienen =
//                     const lineWithoutComments = lineWithoutBrackets.replace(/\/\/.*=/g, '');

//                     // Divide la línea por ':', elimina espacios en blanco y agrega los datos en el formato deseado
//                     const [key, value] = lineWithoutComments.split(":").map((item) => item.trim());
//                     filteredData.push({ "Nombre": key, "Valor": value });
//                 }

//                 // Agrega el objeto actual al arreglo de datos filtrados
//                 filteredData.push(currentRow);

//                 // Crea un libro de Excel
//                 const ws = XLSX.utils.json_to_sheet(filteredData);
//                 const wb = XLSX.utils.book_new();
//                 XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

//                 // Genera un nombre de archivo único para el Excel
//                 const uniqueFileName = "output.xlsx";

//                 // Descarga el archivo Excel
//                 XLSX.writeFile(wb, uniqueFileName);

//             } catch (error) {
//                 if (error instanceof Error) {
//                     console.error("Error al procesar el archivo JSON:", error);
//                     alert(
//                         "Error al procesar el archivo JSON: " + error.message
//                     );
//                 } else {
//                     console.error("Error al procesar el archivo JSON:", error);
//                     alert(
//                         "Error al procesar el archivo JSON: " + String(error)
//                     );
//                 }
//             }
//         });
//     }
// });

import * as XLSX from "xlsx";

document.addEventListener("DOMContentLoaded", function () {
	const jsonInput1 = document.getElementById(
		"jsonInput1"
	) as HTMLTextAreaElement;

	const jsonInput2 = document.getElementById(
		"jsonInput2"
	) as HTMLTextAreaElement;

	const jsonInput3 = document.getElementById(
		"jsonInput3"
	) as HTMLTextAreaElement;

	const processButton = document.getElementById(
		"processButton"
	) as HTMLButtonElement | null;

	if (processButton) {
		processButton.addEventListener("click", async (event) => {
			const jsonText1 = jsonInput1.value;
			const jsonText2 = jsonInput2.value;
			const jsonText3 = jsonInput3.value;

			try {
				// Elimina comas, comillas y divide el texto por líneas
				const lines1 = jsonText1
					.replace(/,/g, "")
					.replace(/"/g, "")
					.split("\n");
				const lines2 = jsonText2
					.replace(/,/g, "")
					.replace(/"/g, "")
					.split("\n");
				const lines3 = jsonText3
					.replace(/,/g, "")
					.replace(/"/g, "")
					.split("\n");

				const filteredData: Record<string, string>[] = [];

				const maxLength = Math.max(
					lines1.length,
					lines2.length,
					lines3.length
				);

				for (let i = 0; i < maxLength; i++) {
					const trimmedLine1 = lines1[i] ? lines1[i].trim() : "";
					const trimmedLine2 = lines2[i] ? lines2[i].trim() : "";
					const trimmedLine3 = lines3[i] ? lines3[i].trim() : "";

					if (
						trimmedLine1.length === 0 ||
						trimmedLine1.includes(".comment") ||
						trimmedLine1.startsWith("//") ||
						trimmedLine1.includes(
							"//======================================================================================================"
						)
					) {
						// Ignora líneas en blanco, con '.comment', que comienzan con '//', o contienen '//======================================================================================================' en el jsonText1
						continue;
					}

					const lineWithoutBrackets1 = trimmedLine1.replace(
						/[{}]/g,
						""
					);
					const [key1, value1] = lineWithoutBrackets1
						.split(":")
						.map((item) => item.trim());

					const value2 = trimmedLine2.split(":")[1]
						? trimmedLine2.split(":")[1].trim()
						: "";
					const value3 = trimmedLine3.split(":")[1]
						? trimmedLine3.split(":")[1].trim()
						: "";

					filteredData.push({
						Nombre: key1,
						Valor1: value1,
						Valor2: value2,
						Valor3: value3,
					});
				}

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
