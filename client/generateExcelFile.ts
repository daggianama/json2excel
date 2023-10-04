import * as XLSX from "xlsx";



export function generateExcelFile(filteredData: Record<string, string>[], file: File) {

	const reader = new FileReader();
	let userExcelValues = new Set<string>();
	console.log(filteredData);
	reader.onload = async (event) => {
		if (event.target) {
			const fileData = event.target.result as ArrayBuffer;
			const workbook = XLSX.read(new Uint8Array(fileData), {
				type: "array",
			});

			const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Suponiendo que solo hay una hoja
			 // Crear un conjunto de valores presentes en el archivo del usuario
			
			
			const range = XLSX.utils.decode_range(worksheet["!ref"] as any);
			
			 for (let rowIndex = range.s.r + 1; rowIndex <= range.e.r; rowIndex++) {
			   const keyCell = XLSX.utils.encode_cell({
				 r: rowIndex,
				 c: 0,
			   });
				 const key = (worksheet[keyCell] as any)?.v;
				 console.log(key);
			   if (key !== undefined) {
				 userExcelValues.add(key);
			   }
			 }
					
         // Filtrar y resaltar datos en rojo
		//  for (let i = 2; i < filteredData.length; i++) {
		// 	 const value1 = filteredData[i]["Eng-value"];
			
		// 	console.log(userExcelValues);
		// 	// Compara con datos del archivo del usuario y agrega en rojo si no está presente
		// 	if (!userExcelValues.has(" " + value1 + ",")) {
		// 		filteredData[i].value1 =  " <<<--------- NEW --------";
		// 	}
			
		//  }
			 // Filtrar y resaltar datos en rojo
			 for (let i = 1; i < filteredData.length; i++) {
				const value1 = filteredData[i]["Label-Name"];
			   
			   console.log(userExcelValues);
			   // Compara con datos del archivo del usuario y agrega en rojo si no está presente
			   if (!userExcelValues.has(value1)) {
				   filteredData[i].value1 =  "   	  	 NEW LABEL	";
			   }
			   
			}
			
			 
		}
			  // Crea un libro de Excel
			  const wb = XLSX.utils.book_new();
			  const ws = XLSX.utils.json_to_sheet(filteredData);
		
			XLSX.utils.book_append_sheet(wb, ws);
		
			// Genera un nombre de archivo único con la fecha y hora actual
			const currentDate = new Date();
			const formattedDate = currentDate.toISOString().replace(/[:.]/g, "-");
			const uniqueFileName = `${formattedDate}.xlsx`;
		
			// Descarga el archivo Excel
			return XLSX.writeFile(wb, uniqueFileName);
		
	}
	reader.readAsArrayBuffer(file);
	

	
}
	
