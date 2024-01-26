const XLSX = require('xlsx');

async function accessExcelSheet(excelData) {

    const datosObtenidosExcel = XLSX.readFile(excelData);
    const sheetName = datosObtenidosExcel.SheetNames[0];
    const sheet = datosObtenidosExcel.Sheets[sheetName];
    const userData = XLSX.utils.sheet_to_json(sheet);
    const sortedUserData = userData.slice().sort((a, b) => a.UserName.localeCompare(b.UserName));

    // Crear arrays solo con los valores de 'UserName', 'Password' y 'Role' después de ordenar
    const sortedUserNames = sortedUserData.map(user => user.UserName);
    const sortedPasswords = sortedUserData.map(user => user['Password ']);
    const sortedRoles = sortedUserData.map(user => user.Role);

    console.log(sortedUserNames[2]);
    console.log(sortedPasswords[2])
    console.log(sortedRoles[2])
    console.log(userData)
    console.log(sheetName)

    }
    
module.exports = accessExcelSheet;
