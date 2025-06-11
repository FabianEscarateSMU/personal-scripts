import { Vtex } from "./connections/vtex";
import { CSV } from "./fileSystem/csv"

const main = async () => {
    //lectura de csv
    const csvFilePath = 'src/fileSystem/files/alviCustomers.csv';
    const csvData = CSV.readCSV(csvFilePath);
    console.log("CSV Data:", csvData);
    console.log("CSV Data:", csvData.length);

    const csvDataWithId = []

    for (const customer of csvData) {
        try {
            const fetchCustomer = await Vtex.getCustomerAndCorporateNameIdByEmail(customer.email);
            if (fetchCustomer) {
                console.log(`Customer ID for ${customer.email}: ${fetchCustomer.id}`);

                csvDataWithId.push({
                    idDocument: fetchCustomer.id,
                    email: customer.email,
                    corporateNameExcel: customer.corporateName,
                    currentCorporateName: fetchCustomer.corporateName,
                    newCorporatename: fetchCustomer.corporateName.replace(/&/g, 'Y')
                });

                console.log(`Updated corporate name for ${customer.email} to ${customer.corporateName}`);
            }
        } catch (error) {
            console.error(`Error processing customer ${customer.email}:`, error);
        }
    }


    // Generar un nuevo CSV con los datos actualizados
    const headers = ['idDocument', 'email', 'corporateNameExcel', 'currentCorporateName', 'newCorporatename'];
    const updatedCsvFilePath = 'src/fileSystem/files/AlviCustomersForUpdate.csv';

    console.log("CSV Data:", csvDataWithId);

    CSV.generateCSV(csvDataWithId, headers, updatedCsvFilePath);
    console.log(`CSV file generated at: ${updatedCsvFilePath}`);
}


main()