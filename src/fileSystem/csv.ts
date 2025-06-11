import * as fs from 'fs';
import * as path from 'path';



export const CSV = {
    readCSV: (filePath: string, characterSpliter: string = ";"): any[] => {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(characterSpliter).map(header => header.trim());
        const data = lines.slice(1).map(line => {
            const values = line.split(characterSpliter).map(value => value.trim().replace(/^"|"$/g, ''));
            const row: any = {};
            headers.forEach((header, index) => {
                row[header] = values[index] !== undefined ? values[index] : '';
            }
            );
            return row;
        });
        return data;
    },
    generateCSV: (data: any[], headers: string[], filePath: string, characterSpliter: string = ";"): string => {
        const headerRow = headers.join(characterSpliter) + '\n';
        const dataRows = data.map(row => {
            return headers.map(header => {
                const value = row[header] !== undefined ? row[header] : '';
                return `"${value}"`;
            }).join(characterSpliter);
        }).join('\n');
        const csvContent = headerRow + dataRows;

        // Asegúrate de que el directorio existe
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filePath, csvContent, 'utf8');
        return filePath;
    }
}