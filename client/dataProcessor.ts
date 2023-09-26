// dataProcessor.ts
export function processData(
	lines1: string[],
	lines2: string[],
	lines3: string[]
): Record<string, string>[] {
	const filteredData: Record<string, string>[] = [];
	const maxLength = Math.max(
		lines1.length,
		lines2.length,
		lines3.length
	);

	for (let i = 0; i < maxLength; i++) {
		const trimmedLine1 = lines1[i] ? lines1[i].trim() : "";
		const trimmedLine2 = lines2[i] ? lines2[i].trim() : "";
		const trimmedLine3 = lines3[i] ? lines3[i].trim() : "";

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
		const [key1, value1] = lineWithoutBrackets1
			.split(":")
			.map((item) => item.trim());

		let key1Found = false; // Variable para indicar si se encuentra al menos una coincidencia de key1

		// Verifica si las claves existen en las otras líneas antes de usarlas
		const key2 = trimmedLine2
			? trimmedLine2.split(":")[0].trim()
			: "";
		const value2 = trimmedLine2
			? trimmedLine2.split(":")[1]
				? trimmedLine2.split(":")[1].trim()
				: ""
			: "";

		const key3 = trimmedLine3
			? trimmedLine3.split(":")[0].trim()
			: "";
		const value3 = trimmedLine3
			? trimmedLine3.split(":")[1]
				? trimmedLine3.split(":")[1].trim()
				: ""
			: "";

		// Verifica si la clave de key1 existe en key2 y key3
		if (key1 === key2 && key1 === key3) {
			key1Found = true; // Se encontró una coincidencia

			// Verifica si value2 y value3 existen antes de usarlos
			const engValue = value2 || "";
			const espValue = value3 || "";

			filteredData.push({
				"Label-Name": key1,
				"Eng-value": value1,
				"Esp-value": engValue,
				"Fr-value": espValue,
			});
		}

		// Continúa buscando más coincidencias de key1 en las líneas siguientes
		for (let j = i + 1; j < maxLength; j++) {
			const nextTrimmedLine1 = lines1[j] ? lines1[j].trim() : "";
			if (
				nextTrimmedLine1.startsWith("//") ||
				nextTrimmedLine1.includes("//=====")
			) {
				// Ignora líneas que comienzan con '//' o contienen '//======================================================================================================' en el jsonText1
				continue;
			}

			const nextLineWithoutBrackets1 = nextTrimmedLine1.replace(
				/[{}]/g,
				""
			);
			const [nextKey1, nextValue1] = nextLineWithoutBrackets1
				.split(":")
				.map((item) => item.trim());

			// Verifica si la clave de key1 existe en la línea siguiente
			if (nextKey1 === key1) {
				key1Found = true; // Se encontró una coincidencia
			} else {
				// Si no hay más coincidencias, se sale del bucle interno
				break;
			}
		}

		// Si no se encontró ninguna coincidencia de key1, se agrega un elemento con key1 y valores vacíos
		if (!key1Found) {
			filteredData.push({
				"Label-Name": key1,
				"Eng-value": value1,
				"Esp-value": "",
				"Fr-value": "",
			});
		}
	}
	return filteredData;
}
