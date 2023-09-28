import * as XLSX from "xlsx";
import FileSaver from "file-saver";

// Define las estructuras de los objetos JSON
type JSONData = {
	[key: string]: string | undefined;
};

type JSONContainer = {
	json1: JSONData[];
	json2: JSONData[];
	json3: JSONData[];
};

// Función para cargar y procesar el archivo Excel
export function processExcelFile(file: File): void {
	const reader = new FileReader();

	reader.onload = async (event) => {
		if (event.target) {
			const fileData = event.target.result as ArrayBuffer;
			const workbook = XLSX.read(new Uint8Array(fileData), {
				type: "array",
			});

			const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Suponiendo que solo hay una hoja

			const jsonData: JSONContainer = {
				json1: [],
				json2: [],
				json3: [],
			};
			const range = XLSX.utils.decode_range(worksheet["!ref"] as any);

			// Recorre las filas del archivo Excel
			for (
				let rowIndex = range.s.r + 1;
				rowIndex <= range.e.r;
				rowIndex++
			) {
				const keyCell = XLSX.utils.encode_cell({
					r: rowIndex,
					c: range.s.c,
				}); // Celda de clave
				const key = (worksheet[keyCell] as any)?.v; // Obtiene el valor de la celda de clave

				if (key !== undefined) {
					const value1Cell = XLSX.utils.encode_cell({
						r: rowIndex,
						c: range.s.c + 1,
					}); // Celda de valor 1
					const value2Cell = XLSX.utils.encode_cell({
						r: rowIndex,
						c: range.s.c + 2,
					}); // Celda de valor 2
					const value3Cell = XLSX.utils.encode_cell({
						r: rowIndex,
						c: range.s.c + 3,
					}); // Celda de valor 3

					const value1 = (worksheet[value1Cell] as any)?.v; // Obtiene el valor de la celda de valor 1
					const value2 = (worksheet[value2Cell] as any)?.v; // Obtiene el valor de la celda de valor 2
					const value3 = (worksheet[value3Cell] as any)?.v; // Obtiene el valor de la celda de valor 3

					// Agrega los valores a los arreglos correspondientes si no son undefined
					if (value1 !== undefined) {
						jsonData.json1.push({ [key]: value1 });
						console.log(key, value1);
					}
					if (value1 !== undefined && value2 !== undefined) {
						jsonData.json2.push({ [key]: value2 });
						console.log(key, value1);
					}
					if (value1 !== undefined && value3 !== undefined) {
						jsonData.json3.push({ [key]: value3 });
						console.log(key, value1);
					}
					// console.log(jsonData);
				}
			}

			// Convierte los objetos JSON en cadenas JSON con claves y valores separados por comas
			const addLabel = (json: JSONData[]) => {
				const result: JSONData[] = [];
				for (const obj of json) {
					for (const [key, value] of Object.entries(obj)) {
						result.push({ [key]: value });
						result.push({ [`${key}.comment`]: `${value} label` });
					}
				}
				return result;
			};

			// Generar las etiquetas para json1
            const json1Labels = addLabel(jsonData.json1);
            // console.log(json1Labels);

			   // Inicializar json2 y json3 como copias de json1
               const json2WithLabels = [...jsonData.json2];
               const json3WithLabels = [...jsonData.json3];
       
               // Agregar las etiquetas generadas a json2 y json3
               for (let i = 1; i < json1Labels.length; i++) {
                   const label = json1Labels[i];
                   const [key] = Object.keys(label);
                //    console.log(key);
                    const keyWithoutComment = key.replace(/\.comment$/, "");
                   
       
                //    console.log(json2WithLabels[i - 1]);
                //    console.log(keyWithoutComment);
                //      console.log(json2WithLabels[i - 1][keyWithoutComment]);
                   // Si el key existe en json2, agrega la etiqueta debajo de la línea correspondiente
                   if (json2WithLabels[i - 1] && json2WithLabels[i - 1][keyWithoutComment]) {
                      
                       json2WithLabels.splice(i  , 0, label);
                   }
       
                   // Si el key existe en json3, agrega la etiqueta debajo de la línea correspondiente
                   if (json3WithLabels[i - 1] && json3WithLabels[i - 1][keyWithoutComment]) {
                       json3WithLabels.splice(i , 0, label);
                   }
               }
			const json1String = `{\n${json1Labels
				.map((obj) =>
					Object.entries(obj)
						.map(([key, value]) => `"${key}": "${value}"`)
						.join(", ")
				)
				.join(",\n")}\n}`;

			const json2String = `{\n${json2WithLabels
				.map((obj) =>
					Object.entries(obj)
						.map(([key, value]) => `"${key}": "${value}"`)
						.join(", ")
				)
				.join(",\n")}\n}`;

			const json3String = `{\n${json3WithLabels
				.map((obj) =>
					Object.entries(obj)
						.map(([key, value]) => `"${key}": "${value}"`)
						.join(", ")
				)
				.join(",\n")}\n}`;

			// Crea Blob para los archivos JSON
			const blob1 = new Blob([json1String], {
				type: "application/json",
			});
			const blob2 = new Blob([json2String], {
				type: "application/json",
			});
			const blob3 = new Blob([json3String], {
				type: "application/json",
			});
			// Guarda y descarga los archivos JSON
			FileSaver.saveAs(blob1, "english.json");
			FileSaver.saveAs(blob2, "spanish.json");
			FileSaver.saveAs(blob3, "french.json");

			console.log(
				"Archivos JSON generados y descargados exitosamente."
			);
		}
	};

	reader.readAsArrayBuffer(file);
}
