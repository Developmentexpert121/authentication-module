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
app.use(express.json());

app.post('/generate', async (req, res) => {
  console.log('-------------------');
  try {
    let { db, auth, dbType, authType, fields } = req.body;

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

    if (authVal === 'password') {
      const signupFields = req.body.signupFields || fields?.signup || [];
      const signinFields = req.body.signinFields || fields?.signin || [];
      if (!signupFields.length || !signinFields.length) {
        return res
          .status(400)
          .json({ error: 'signupFields and signinFields are required' });
      }
      fieldsObj = {
        signupFields,
        signinFields,
        backendFields: fields?.backend || [],
      };
    } else if (authVal === 'otp') {
      const registerFields = req.body.registerFields || fields?.register || [];
      if (!registerFields.length) {
        return res
          .status(400)
          .json({ error: 'registerFields are required for OTP' });
      }
      fieldsObj = { registerFields };
    }

    const outputPath = await runGenerator(
      dbVal,
      authVal,
      fieldsObj,
      normalizedFields
    );

    const zipPath = path.join(__dirname, 'project.zip');
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(` Project zipped: ${archive.pointer()} total bytes`);
      res.download(zipPath, 'project.zip', (err) => {
        if (err) console.error(' Error sending zip:', err);
        fs.unlinkSync(zipPath);
      });
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(outputPath, false);
    archive.finalize();
  } catch (err) {
    console.error(' Error in /generate:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});
