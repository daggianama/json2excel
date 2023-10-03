import { generateExcelFile } from "./generateExcelFile"; 
import { processData } from "./dataProcessor";
import { processExcelFile } from "./processExcelFile";
//import { processExcelEmbed } from "./processExcelEmbed";
import * as XLSX from "xlsx";
import FileSaver from  "file-saver";

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

	const fileInput = document.getElementById(
		"uploadExcelFile"
	) as HTMLInputElement | null;

	

	//const uploadExcel = document.getElementById('uploadExcel') as HTMLButtonElement | null;
	//const iframe = document.querySelector('iframe');

	if (processButton && fileInput && fileInput.files) {
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

	
	// if (uploadExcel) {
	// 	uploadExcel.addEventListener("click", async (event) => {
	// 		const fileInput = document.getElementById(
	// 			"uploadExcelFile"
	// 		) as HTMLInputElement | null;

	// 		if (fileInput) {
	// 			console.log(fileInput.files);
	// 			processExcelFile(fileInput.files![0]);
	// 		}
	// 		else {
	// 			console.log('No se encontró el input de tipo file.');
	// 		}
	// 	});
	// }

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
	
