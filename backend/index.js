// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs-extra');
// const archiver = require('archiver');
// const path = require('path');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// const PORT = 5000;

// app.post('/generate', (req, res) => {
//   const { dbType, authType } = req.body;

//   res.setHeader('Content-Type', 'application/zip');
//   res.setHeader(
//     'Content-Disposition',
//     'attachment; filename=generated-project.zip'
//   );

//   const archive = archiver('zip', { zlib: { level: 9 } });
//   archive.pipe(res);

//   let readmeContent = `# Generated Project\n\nDatabase: ${dbType}\nAuthentication: ${authType}\n`;
//   archive.append(readmeContent, { name: 'README.md' });
//   const templatePath = path.join(
//     __dirname,
//     '..',
//     'templates',
//     dbType.toLowerCase(),
//     authType.toLowerCase() + 'based'
//   );
//   console.log('Using template from:', templatePath);
//   archive.directory(path.join(templatePath, 'frontend'), 'frontend');
//   archive.directory(path.join(templatePath, 'backend'), 'backend');

//   archive.finalize();
// });

// app.get('/', (req, res) => {
//   res.send('Hello from backend');
// });

// app.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });



// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs-extra');
// const archiver = require('archiver');
// const path = require('path');
// const { runGenerator } = require('./generator');
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// const PORT = 5000;

// app.post('/generate', (req, res) => {
//   const { dbType, authType } = req.body;

//   res.setHeader('Content-Type', 'application/zip');
//   res.setHeader(
//     'Content-Disposition',
//     'attachment; filename=generated-project.zip'
//   );

//   const archive = archiver('zip', { zlib: { level: 9 } });
//   archive.pipe(res);

//   let readmeContent = `# Generated Project\n\nDatabase: ${dbType}\nAuthentication: ${authType}\n`;
//   archive.append(readmeContent, { name: 'README.md' });
//   const templatePath = path.join(
//     __dirname,
//     '..',
//     'templates',
//     dbType.toLowerCase(),
//     authType.toLowerCase() + 'based'
//   );
//   console.log('Using template from:', templatePath);
//   archive.directory(path.join(templatePath, 'frontend'), 'frontend');
//   archive.directory(path.join(templatePath, 'backend'), 'backend');

//   archive.finalize();
// });

// app.get('/', (req, res) => {
//   res.send('Hello from backend');
// });

// app.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });
// backend/index.js
// backend/index.js
// const { runGenerator } = require('./generator');

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const archiver = require('archiver');
// const path = require('path');
// const fs = require('fs');
// const { runGenerator } = require('./generator'); 
// const fse = require('fs-extra');
// // const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// const PORT = 5000;

// app.post('/generate', async (req, res) => {
//   console.log('-------------------');
//   try {
//     let { db: dbType, auth: authType, fields } = req.body;
//     console.log('req.body', req.body);

//     dbType = (dbType || '').toLowerCase();
//     authType = (authType || '').toLowerCase();
//     console.log('dbType', dbType);
//     console.log('authType', authType);

//     if (!dbType || !authType) {
//       return res
//         .status(400)
//         .json({ error: 'dbType and authType are required' });
//     }
//     if (!Array.isArray(fields) || fields.length === 0) {
//       return res.status(400).json({ error: 'fields array is required' });
//     }
//     console.log('111111');

//     const outputPath = path.join(__dirname, '..', 'output');

//     try {
//       if (fs.existsSync(outputPath)) {
//         console.log('Deleting previous output folder...');
//         await fse.remove(outputPath); 
//       }
//     } catch (err) {
//       console.warn('Async removal failed, trying sync fallback:', err);
//       try {
//         fse.removeSync(outputPath);
//       } catch (err2) {
//         console.error(
//           'Sync removal also failed. Make sure no files are open or locked:',
//           err2
//         );
//         return res.status(500).json({
//           error:
//             'Cannot clear previous output folder. Close open files and retry.',
//         });
//       }
//     }

//     console.log('!1!!');
//     try {
//       await runGenerator(dbType, authType, fields);
//       console.log('@@@@@');
//     } catch (err) {
//       console.log('error', err);
//       console.log(err.stack);
//     }
//     console.log('@@@@@');

//     const frontendPath = path.join(__dirname, '..', 'output', 'Frontend');
//     const backendPath = path.join(__dirname, '..', 'output', 'Backend');

//     console.log('@@@@@', frontendPath, backendPath);
//     if (!fs.existsSync(frontendPath) || !fs.existsSync(backendPath)) {
//       return res.status(500).json({
//         error: 'Generated folders missing. Make sure templates exist.',
//       });
//     }
//     console.log('##');
//     res.setHeader('Content-Type', 'application/zip');
//     res.setHeader(
//       'Content-Disposition',
//       'attachment; filename=generated-project.zip'
//     );

//     const archive = archiver('zip', { zlib: { level: 9 } });
//     archive.pipe(res);

//     const readmeContent = `# Generated Project
// Database: ${dbType}
// Authentication: ${authType}
// Fields: ${fields.join(', ')}
// `;
//     archive.append(readmeContent, { name: 'README.md' });
//     archive.directory(frontendPath, 'frontend');
//     archive.directory(backendPath, 'backend');

//     await archive.finalize();
//   } catch (err) {
//     console.error('❌ Error in /generate:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// ---------------
// app.post('/generate', async (req, res) => {
//   console.log('-------------------');
//   try {
//     let { db: dbType, auth: authType, signupFields, signinFields } = req.body;
//     console.log('req.body', req.body);

//     dbType = (dbType || '').toLowerCase();
//     authType = (authType || '').toLowerCase();
//     console.log('dbType', dbType);
//     console.log('authType', authType);

//     if (!dbType || !authType) {
//       return res.status(400).json({ error: 'dbType and authType are required' });
//     }
//     if (!Array.isArray(signupFields) || signupFields.length === 0) {
//       return res.status(400).json({ error: 'signupFields array is required' });
//     }
//     if (!Array.isArray(signinFields) || signinFields.length === 0) {
//       return res.status(400).json({ error: 'signinFields array is required' });
//     }

//     console.log('Signup Fields:', signupFields);
//     console.log('Signin Fields:', signinFields);

//     const outputPath = path.join(__dirname, '..', 'output');
//     if (fs.existsSync(outputPath)) {
//       console.log('Deleting previous output folder...');
//       await fse.remove(outputPath);
//     }

//     console.log('!1!!');
//     try {
//       // 🔥 Pass both signup & signin fields to generator
//       await runGenerator(dbType, authType, { signupFields, signinFields });
//       console.log('@@@@@');
//     } catch (err) {
//       console.log('error', err);
//       console.log(err.stack);
//     }
//     console.log('@@@@@');

//     const frontendPath = path.join(__dirname, '..', 'output', 'Frontend');
//     const backendPath = path.join(__dirname, '..', 'output', 'Backend');

//     if (!fs.existsSync(frontendPath) || !fs.existsSync(backendPath)) {
//       return res.status(500).json({
//         error: 'Generated folders missing. Make sure templates exist.',
//       });
//     }

//     res.setHeader('Content-Type', 'application/zip');
//     res.setHeader(
//       'Content-Disposition',
//       'attachment; filename=generated-project.zip'
//     );

//     const archive = archiver('zip', { zlib: { level: 9 } });
//     archive.pipe(res);

//     const readmeContent = `# Generated Project
// Database: ${dbType}
// Authentication: ${authType}
// Signup Fields: ${signupFields.join(', ')}
// Signin Fields: ${signinFields.join(', ')}
// `;
//     archive.append(readmeContent, { name: 'README.md' });
//     archive.directory(frontendPath, 'frontend');
//     archive.directory(backendPath, 'backend');

//     await archive.finalize();
//   } catch (err) {
//     console.error('❌ Error in /generate:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });




const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const archiver = require('archiver');
const path = require('path');
const fs = require('fs');
const { runGenerator } = require('./generator'); 
const fse = require('fs-extra');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // ✅ no need for bodyParser.json()

app.post('/generate', async (req, res) => {
  console.log('-------------------');
  try {
    let { db, auth, dbType, authType, fields } = req.body;

    // normalize keys
    const dbVal = (db || dbType || '').toLowerCase();
    const authVal = (auth || authType || '').toLowerCase();
const normalizedFields = {
  signupFields: fields.signup || [],
  signinFields: fields.signin || [],
  backendFields: fields.backend || [],
  registerFields: fields.register || [],
};

    console.log('dbType', dbVal);
    console.log('authType', authVal);

    if (!dbVal || !authVal) {
      return res.status(400).json({ error: 'db or auth is missing' });
    }

    let fieldsObj = {};

    if (authVal === "password") {
      const signupFields = (req.body.signupFields || fields?.signup || []);
      const signinFields = (req.body.signinFields || fields?.signin || []);
      if (!signupFields.length || !signinFields.length) {
        return res.status(400).json({ error: 'signupFields and signinFields are required' });
      }
      fieldsObj = { signupFields, signinFields, backendFields: fields?.backend || [] };
    } 
    else if (authVal === "otp") {
      const registerFields = (req.body.registerFields || fields?.register || []);
      if (!registerFields.length) {
        return res.status(400).json({ error: 'registerFields are required for OTP' });
      }
      fieldsObj = { registerFields };
    }

    // 🚀 Run generator -> should return generated folder path
    const outputPath = await runGenerator(dbVal, authVal, fieldsObj,normalizedFields);

    // Prepare zip path
    const zipPath = path.join(__dirname, "project.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`✅ Project zipped: ${archive.pointer()} total bytes`);
      res.download(zipPath, "project.zip", (err) => {
        if (err) console.error("❌ Error sending zip:", err);
        fs.unlinkSync(zipPath); // cleanup after sending
      });
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(outputPath, false); // zip whole folder
    archive.finalize();

  } catch (err) {
    console.error('❌ Error in /generate:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
