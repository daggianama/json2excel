import { generateExcelFile } from "./generateExcelFile"; 
import { processData } from "./dataProcessor";
import { processExcelFile } from "./processExcelFile";
import { processExcelEmbed } from "./processExcelEmbed";


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

	const uploadExcel = document.getElementById('uploadExcel') as HTMLButtonElement | null;
	const iframe = document.querySelector('iframe');

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

	// if (uploadExcel && excelContainer) {
    //     let workbook: XLSX.WorkBook;
    //     let worksheet: XLSX.WorkSheet;

    //     // Función para habilitar la edición de la hoja de Excel en el div
    //     const enableEditing = () => {
    //         // Crea un nuevo libro de Excel
    //         workbook = XLSX.utils.book_new();
    //         worksheet = XLSX.utils.aoa_to_sheet([[]]); // Crea una hoja de Excel vacía

    //         // Agrega la hoja de Excel al libro
    //         XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    //         // Crea un editor web de Excel en el div
    //         const excelEditor = new XLSX.Editor({ target: excelContainer, book: workbook });

    //         // Habilita la edición
    //         excelEditor.setEditMode(true);
    //     };

    //     	uploadExcel.addEventListener('click', () => {
    //         if (!workbook || !worksheet) {
    //             alert('Primero habilite la edición de la hoja de Excel.');
    //             return;
    //         }

    //         // Obtiene los datos editados de la hoja de Excel
    //         const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    //         // Procesa los datos según sea necesario
    //         console.log('Datos de la hoja de Excel:', data);
            
    //         processExcelFile(data);

    //         // Limpia el contenido del div
    //         excelContainer.innerHTML = '';

    //         // Deshabilita la edición
    //         workbook = undefined;
    //         worksheet = undefined;
    //     });

    //     // Habilita la edición de la hoja de Excel en el div cuando se carga la página
    //     enableEditing();
	// }
	
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

	if (uploadExcel && iframe?.contentDocument  ) {
		
		uploadExcel.addEventListener('click', () => {
		 
		  const iframeContent = iframe.contentDocument || iframe.contentWindow?.document;
		  const excelTable = iframeContent?.querySelector('table'); // Suponiendo que la hoja de Excel está representada como una tabla
		  
		  if (excelTable) {
			
			console.log('Datos de Excel encontrados:', excelTable);
			
			 /* ... transforma excelTable en una estructura de datos compatible con xlsx ... */;
			
			// Llama a la función processExcelFile con los datos directamente
			processExcelEmbed(excelTable);
		  } else {
			console.log('No se encontró la tabla de Excel en el iframe.');
		  }
		});
	  }
	  
});
	
