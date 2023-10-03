import { generateExcelFile } from "./generateExcelFile";
import { processData } from "./dataProcessor";
import { processExcelFile } from "./processExcelFile";
import * as XLSX from "xlsx";
//import { processExcelEmbed } from "./processExcelEmbed";

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

	const compareButton = document.getElementById(
		"compareButton"
	) as HTMLButtonElement | null;

	const fileInput = document.getElementById(
		"uploadExcelFile"
	) as HTMLInputElement | null;

	const justExcel = document.getElementById(
		"justExcel"
	) as HTMLInputElement | null;

	//const uploadExcel = document.getElementById('uploadExcel') as HTMLButtonElement | null;
	//const iframe = document.querySelector('iframe');

	if (compareButton && fileInput && fileInput.files) {
		compareButton.addEventListener("click", async (event) => {
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
				console.log(filteredData);
				// Generar el libro de Excel
				generateExcelFile(filteredData, fileInput.files![0]);
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


	// JUST FOR JSONS TO EXCEL
	if (processButton && justExcel && justExcel.files) {
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

				const ws = XLSX.utils.json_to_sheet(filteredData);
				const wb = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

				// Genera un nombre de archivo único con la fecha y hora actual
				const currentDate = new Date();
				const formattedDate = currentDate
					.toISOString()
					.replace(/[:.]/g, "-");
				const uniqueFileName = `${formattedDate}.xlsx`;

				// Descarga el archivo Excel
				return XLSX.writeFile(wb, uniqueFileName);
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


	// JUST FOR EXCEL TO JSONS
	if (justExcel && justExcel.files) {
		justExcel.addEventListener("click", async (event) => {
			const fileInput = document.getElementById(
				"uploadExcelFile"
			) as HTMLInputElement | null;

			if (fileInput) {
				console.log(fileInput.files);
				processExcelFile(fileInput.files![0]);
			} else {
				console.log("No se encontró el input de tipo file.");
			}
		});
	}

	// 	if (uploadExcel && iframe?.contentDocument  ) {

	// 		uploadExcel.addEventListener('click', () => {

	// 		  const iframeContent = iframe.contentDocument || iframe.contentWindow?.document;
	// 		  const excelTable = iframeContent?.querySelector('table'); // Suponiendo que la hoja de Excel está representada como una tabla

	// 		  if (excelTable) {

	// 			console.log('Datos de Excel encontrados:', excelTable);

	// 			 /* ... transforma excelTable en una estructura de datos compatible con xlsx ... */;

	// 			// Llama a la función processExcelFile con los datos directamente
	// 			processExcelEmbed(excelTable);
	// 		  } else {
	// 			console.log('No se encontró la tabla de Excel en el iframe.');
	// 		  }
	// 		});
	// 	  }
});
