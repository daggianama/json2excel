import { generateExcelFile } from "./generateExcelFile"; 
import { processData } from "./dataProcessor";
import { processExcelFile } from "./processExcelFile";

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

	const uploadExcel = document.getElementById(
		"uploadExcel"
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

				// Procesar los datos utilizando la función processData
				const filteredData = processData(lines1, lines2, lines3);

				// Generar el libro de Excel
				const wb = generateExcelFile(filteredData);

				
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

	if (uploadExcel) {
		uploadExcel.addEventListener("click", async (event) => {
			const fileInput = document.getElementById(
				"uploadExcelFile"
			) as HTMLInputElement | null;

			if (fileInput) {
				console.log(fileInput.files);
				processExcelFile(fileInput.files![0]);
			}

		});
	}
});