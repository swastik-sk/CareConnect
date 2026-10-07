const fs = require('fs');

const files = [
  'Register.jsx', 'PharmacyDashboard.jsx', 'Medicines.jsx', 
  'Login.jsx', 'HospitalDetails.jsx', 'AdminDashboard.jsx'
].map(f => 'C:/Users/Swastik/.gemini/antigravity-ide/scratch/CareConnect/client/src/pages/' + f);

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes("import { API_URL }")) {
       const lastImportIndex = content.lastIndexOf('import ');
       const endOfLastImport = content.indexOf('\n', lastImportIndex);
       content = content.slice(0, endOfLastImport + 1) + "import { API_URL } from '../config';\n" + content.slice(endOfLastImport + 1);
    }
    
    // Replace 'http://localhost:5000/api...' with `${API_URL}/api...`
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${API_URL}$1`');
    
    // Replace `http://localhost:5000/api...` with `${API_URL}/api...`
    content = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, '`${API_URL}$1`');
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
