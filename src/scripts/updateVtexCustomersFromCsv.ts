import { Vtex } from "../connections/vtex";
import { CSV } from "../fileSystem/csv"

const run = async () => {
    //lectura de csv
    const csvFilePath = 'src/fileSystem/files/AlviCustomersForUpdateTest.csv';
    const csvData = CSV.readCSV(csvFilePath);
    console.log("CSV Data:", csvData.length);

    const csvDataUpdated= []

    for (const customer of csvData) {
        try {

            console.log(`Updating corporate name for ${customer.email}: ${customer.userId}`);

            await Vtex.updateCorporateName(customer.userId, customer.newCorporateName);

            csvDataUpdated.push({
                idDocument: customer.idDocument,
                userId: customer.userId,
                email: customer.email,
                oldCorporateName: customer.currentCorporateName,
                newCorporateName: customer.newCorporateName,
                status: 'Updated'
            });

            console.log(`Updated corporate name for ${customer.email} to ${customer.newCorporateName}`);

        } catch (error) {
            console.error(`Error processing customer ${customer.email}:`, error);
            csvDataUpdated.push({
                idDocument: customer.idDocument,
                userId: customer.userId,
                email: customer.email,
                oldCorporateName: customer.currentCorporateName,
                newCorporateName: customer.newCorporateName,
                status: 'Error',
                message: `Error processing customer ${customer.email}: ${error}`
            });
        }
    }


    // Generar un nuevo CSV con los datos actualizados
    const headers = ['idDocument', 'email', 'oldCorporateName', 'newCorporateName', 'status', 'message'];
    const updatedCsvFilePath = 'src/fileSystem/files/AlviCustomersUpdatedTest.csv';

    CSV.generateCSV(csvDataUpdated, headers, updatedCsvFilePath);
    console.log(`CSV file generated at: ${updatedCsvFilePath}`);
}

run();