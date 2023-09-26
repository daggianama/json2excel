import * as XLSX from "xlsx";

export function generateExcelFile(data: Record<string, string>[]) {
   // Crea un libro de Excel
	const ws = XLSX.utils.json_to_sheet(data);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

	  // Genera un nombre de archivo único con la fecha y hora actual
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().replace(/[:.]/g, "-");
      const uniqueFileName = `${formattedDate}.xlsx`;
    
	// Descarga el archivo Excel
	return XLSX.writeFile(wb, uniqueFileName); 
}