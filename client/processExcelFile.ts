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
      const workbook = XLSX.read(new Uint8Array(fileData), { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Suponiendo que solo hay una hoja

      const jsonData: JSONContainer = { json1: [], json2: [], json3: [] };
      const range = XLSX.utils.decode_range(worksheet["!ref"] as any);

      // Recorre las filas del archivo Excel
      for (let rowIndex = range.s.r + 1; rowIndex <= range.e.r; rowIndex++) {
        const keyCell = XLSX.utils.encode_cell({ r: rowIndex, c: range.s.c }); // Celda de clave
        const key = (worksheet[keyCell] as any)?.v; // Obtiene el valor de la celda de clave

        if (key !== undefined) {
          const value1Cell = XLSX.utils.encode_cell({ r: rowIndex, c: range.s.c + 1 }); // Celda de valor 1
          const value2Cell = XLSX.utils.encode_cell({ r: rowIndex, c: range.s.c + 2 }); // Celda de valor 2
          const value3Cell = XLSX.utils.encode_cell({ r: rowIndex, c: range.s.c + 3 }); // Celda de valor 3

          const value1 = (worksheet[value1Cell] as any)?.v; // Obtiene el valor de la celda de valor 1
          const value2 = (worksheet[value2Cell] as any)?.v; // Obtiene el valor de la celda de valor 2
          const value3 = (worksheet[value3Cell] as any)?.v; // Obtiene el valor de la celda de valor 3

          // Agrega los valores a los arreglos correspondientes si no son undefined
          if (value1 !== undefined) {
            jsonData.json1.push({ [key]: value1 });
          }
          if (value2 !== undefined) {
            jsonData.json2.push({ [key]: value2 });
          }
          if (value3 !== undefined) {
            jsonData.json3.push({ [key]: value3 });
          }
        }
      }

      // Crea un solo objeto JSON con todas las claves y valores separados por comas
      const combinedJSON: JSONData = {
        ...jsonData.json1.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
        ...jsonData.json2.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
        ...jsonData.json3.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
      };

      // Convierte los objetos JSON en cadenas JSON
      const json1String = JSON.stringify(jsonData.json1, null, 2);
      const json2String = JSON.stringify(jsonData.json2, null, 2);
      const json3String = JSON.stringify(jsonData.json3, null, 2);

      // Crea Blob para los archivos JSON
      const blob1 = new Blob([json1String], { type: "application/json" });
      const blob2 = new Blob([json2String], { type: "application/json" });
      const blob3 = new Blob([json3String], { type: "application/json" });

      // Guarda y descarga los archivos JSON
      FileSaver.saveAs(blob1, "english.json");
      FileSaver.saveAs(blob2, "spanish.json");
      FileSaver.saveAs(blob3, "french.json");

      console.log("Archivos JSON generados y descargados exitosamente.");
    }
  };

 
	reader.readAsArrayBuffer(file);

}