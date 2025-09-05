const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const archiver = require('archiver');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
app.post('/generate', (req, res) => {
  console.log('Request received at /generate');
  res.send('Generate endpoint works!');
});

// app.post('/generate', async (req, res) => {
//   const { dbType, fields } = req.body;

//   const tmpDir = path.join(__dirname, 'tmp', Date.now().toString());
//   await fs.mkdirp(tmpDir);

//   const frontendTemplate = path.join(__dirname, '../templates/frontend');
//   await fs.copy(frontendTemplate, path.join(tmpDir, 'frontend'));

//   const backendTemplate = path.join(__dirname, `../templates/${dbType}-backend`);
//   await fs.copy(backendTemplate, path.join(tmpDir, 'backend'));

//   const modelPath = path.join(tmpDir, 'backend', 'model.js');
//   let modelContent = 'const schema = {\n';

//   Object.entries(fields).forEach(([key, val]) => {
//     if (val) modelContent += `  ${key}: String,\n`;
//   });

//   modelContent += '};\n\nmodule.exports = schema;\n';

//   await fs.outputFile(modelPath, modelContent);

//   res.setHeader('Content-Type', 'application/zip');
//   res.setHeader('Content-Disposition', 'attachment; filename=project.zip');

//   const archive = archiver('zip');
//   archive.pipe(res);
//   archive.directory(tmpDir, false);
//   archive.finalize();

//   archive.on('end', () => {
//     fs.remove(tmpDir);
//   });
// });
app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
