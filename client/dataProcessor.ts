export function processData(lines1: string[], lines2: string[], lines3: string[]): Record<string, string>[] {
    const filteredData: Record<string, string>[] = [];

    const findValueForKey = (lines: string[], key: string): string => {
        for (const line of lines) {
            const trimmedLine = line ? line.trim() : "";
            const lineWithoutBrackets = trimmedLine.replace(/[{}]/g, "");
            const [lineKey, lineValue] = lineWithoutBrackets.split(":").map((item) => item.trim());
            if (lineKey === key) {
                return lineValue || "";
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

        const lineWithoutBrackets1 = trimmedLine1.replace(/[{}]/g, "");
        const [key1, value1] = lineWithoutBrackets1.split(":").map((item) => item.trim());

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

    return filteredData;
}
