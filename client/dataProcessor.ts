export function processData(lines1: string[], lines2: string[], lines3: string[]): Record<string, string>[] {
    const filteredData: Record<string, string>[] = [];

    const findValueForKey = (lines: string[], key: string): string => {
        for (const line of lines) {
            if (!line) continue;
    
            // Busca el índice del primer ":" en la línea
            const firstColonIndex = line.indexOf(":");
    
            if (firstColonIndex !== -1) {
                // Extrae el key y el value a partir del primer ":"
                const lineKey = line.substring(0, firstColonIndex).trim();
                const lineValue = line.substring(firstColonIndex + 1).trim();
    
                if (lineKey === key) {
                    return lineValue;
                }
            }
        }
        return "";
    };    
    
    
    
    
    
    
    

    for (let i = 0; i < lines1.length; i++) {
        const trimmedLine1 = lines1[i] ? lines1[i].trim() : "";
        if (
            trimmedLine1.length === 0 ||
            trimmedLine1.includes(".comment") ||
            trimmedLine1.startsWith("//") ||
            trimmedLine1.includes("//=====")
        ) {
            // Ignora líneas en blanco, con '.comment', que comienzan con '//', o contienen '//======================================================================================================' en el jsonText1
            continue;
        }
        // Elimina el "{" inicial y el "}" final de la línea
        const lineWithoutBrackets1 = trimmedLine1.replace(/^{(.*)}$/, "$1");
        
        // Divide la línea por el primer ":" para obtener key1 y value1
        const colonIndex = lineWithoutBrackets1.indexOf(":");
        if (colonIndex !== -1) {
            const key1 = lineWithoutBrackets1.substring(0, colonIndex).trim();
            const value1 = lineWithoutBrackets1.substring(colonIndex + 1).trim();

            // Busca el valor correspondiente para key1 en lines2 y lines3
        
            const value2 = findValueForKey(lines2, key1);
            const value3 = findValueForKey(lines3, key1);

            filteredData.push({
                "Label-Name": key1,
                "Eng-value": value1,
                "Esp-value": value2,
                "Fr-value": value3,
            });
        }
    }
    return filteredData;
}
