
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

// Función para procesar los datos de la tabla HTML
export function processExcelEmbed(table: HTMLTableElement): void {
  const jsonData: JSONContainer = {
    json1: [],
    json2: [],
    json3: [],
  };

  // Obtener todas las filas de la tabla
  const rows = table.getElementsByTagName("tr");
  // Recorre las filas de la tabla, comenzando desde la segunda fila
  for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const cells = row.getElementsByTagName("td");

    if (cells.length >= 4) {
      const key = cells[0].textContent?.trim();
      const value1 = cells[1].textContent?.trim();
      const value2 = cells[2].textContent?.trim();
      const value3 = cells[3].textContent?.trim();

      if (key) {
        // Agregar los valores a los arreglos correspondientes si no son undefined
        if (value1) {
          jsonData.json1.push({ [key]: value1 });
        }
        if (value2) {
          jsonData.json2.push({ [key]: value2 });
        }
        if (value3) {
          jsonData.json3.push({ [key]: value3 });
        }
      }
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

  // Inicializar json2 y json3 como copias de json1
  const json2WithLabels = [...jsonData.json2];
  const json3WithLabels = [...jsonData.json3];

  // Agregar las etiquetas generadas a json2 y json3
  for (let i = 1; i < json1Labels.length; i++) {
    const label = json1Labels[i];
    const [key] = Object.keys(label);
    const keyWithoutComment = key.replace(/\.comment$/, "");

    // Si el key existe en json2, agrega la etiqueta debajo de la línea correspondiente
    if (json2WithLabels[i - 1] && json2WithLabels[i - 1][keyWithoutComment]) {
      json2WithLabels.splice(i, 0, label);
    }

    // Si el key existe en json3, agrega la etiqueta debajo de la línea correspondiente
    if (json3WithLabels[i - 1] && json3WithLabels[i - 1][keyWithoutComment]) {
      json3WithLabels.splice(i, 0, label);
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

  console.log("Archivos JSON generados y descargados exitosamente.");
}

