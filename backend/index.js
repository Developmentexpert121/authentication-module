const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const archiver = require('archiver');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const PORT = 5000;

app.post('/generate', (req, res) => {
  const { dbType, authType } = req.body;

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=generated-project.zip'
  );

  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(res);

  let readmeContent = `# Generated Project\n\nDatabase: ${dbType}\nAuthentication: ${authType}\n`;
  archive.append(readmeContent, { name: 'README.md' });
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    dbType.toLowerCase(),
    authType.toLowerCase() + 'based'
  );
  console.log('Using template from:', templatePath);
  archive.directory(path.join(templatePath, 'frontend'), 'frontend');
  archive.directory(path.join(templatePath, 'backend'), 'backend');

  archive.finalize();
});

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
