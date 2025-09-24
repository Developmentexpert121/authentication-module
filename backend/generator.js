const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);



function generateFrontendFields(fields, context, authType) {
  console.log("⚡ generateFrontendFields called with:", fields, context, authType);

  if (!fields || fields.length === 0) {
    console.log("❌ No fields passed, returning empty string");
    return "";
  }

  return fields
    .map((f) => {
      const label = f.charAt(0).toUpperCase() + f.slice(1);

      // Handle OTP case
      let inputType = "text";
      if (authType === "password" && f === "password") inputType = "password";
      if (authType === "otp" && f === "otp") inputType = "number";

      return `
       <div className="animate-slide-up">
    <label className="block text-sm font-medium text-gray-700">${label}</label>
    <input
      type="${inputType}"
      {...register("${f}")}
      className={\`mt-1 w-full rounded-lg border px-4 py-2 text-sm shadow-sm transition-all 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 
        \${errors.${f} ? "border-red-500" : "border-gray-300"}\`}
      placeholder="Enter your ${label}"
    />
    {errors.${f} && (
      <p className="mt-1 text-sm text-red-500">{errors.${f}.message}</p>
    )}
  </div>
    `;
    })
    .join('\n');
}

function generateBackendFields(fieldsObj, authType, dbType = "mongoose") {
  if (!fieldsObj) return '';

  let allFields = [];
  if (authType === 'password') {
    allFields = [
      ...(fieldsObj.signupFields || []),
      ...(fieldsObj.signinFields || []),
      ...(fieldsObj.backendFields || []),
    ];
  } else if (authType === 'otp') {
    allFields = [...(fieldsObj.registerFields || [])];
  }

  const uniqueFields = [...new Set(allFields)];

  if (dbType === "mongoose") {
    // Mongoose schema
    return uniqueFields
      .map((field) => `${field}: { type: String },`)
      .join('\n');
  }

  if (dbType === "sql") {
    // Sequelize model
    return uniqueFields
      .map((field) => {
        if (field === "id") {
          return `id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },`;
        }
        return `${field}: {
          type: Sequelize.STRING,
          allowNull: true,
        },`;
      })
      .join("\n");
  }

  return "";
}


function generateMigrationFields(fields, authType) {
  console.log("fields77",fields)
  console.log("auth type777",authType)
  return fields.map((field) => {
    // Always add ID
    if (field === "id") {
      return `id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },`;
    }

    // If using password-based auth, make password required
    if (authType === "password" && field === "password") {
      return `password: {
        type: Sequelize.STRING,
        allowNull: false,
      },`;
    }

    // If using OTP-based auth, make otp optional
    if (authType === "otp" && field === "otp") {
      return `otp: {
        type: Sequelize.STRING,
        allowNull: true, // temporary OTP
      },`;
    }

    // Default: normal string field
    return `${field}: {
      type: Sequelize.STRING,
      allowNull: true,
    },`;
  }).join("\n");
}


function isFrontendFile(filePath) {
  const fname = filePath.toLowerCase();
  return (
    (fname.endsWith('.jsx') || fname.endsWith('.tsx')) && // React component
    (fname.includes('signup') ||
      fname.includes('signin') ||
      fname.includes('login') ||
      fname.includes('register'))
      
  );
}
async function applyDynamicFields(filePath, fields, dbType, authType) {
  try {
    console.log('Applying fields to:', filePath);
    console.log('Fields object:', fields);

    let content = await readFile(filePath, 'utf-8');
    let updated = false;

    if (isFrontendFile(filePath)) {
      console.log("Processing frontend file:", filePath);

      // Prepare fields for frontend
      const registerFields = fields.registerFields || fields.register || [];
      const signupFields = authType === "otp" ? registerFields : (fields.signupFields || fields.signup || []);
      const signinFields = authType === "otp" ? registerFields : (fields.signinFields || fields.signin || []);

      // ✅ Register form
      if (/\/\*\s*FIELDS_PLACEHOLDER_REGISTER\s*\*\//.test(content)) {
        const replacement = generateFrontendFields(registerFields, "register", authType);
        content = content.replace(/\/\*\s*FIELDS_PLACEHOLDER_REGISTER\s*\*\//g, replacement);
        updated = true;
      }

      // ✅ Signup form
      if (/\/\*\s*FIELDS_PLACEHOLDER_SIGNUP\s*\*\//.test(content)) {
        const replacement = generateFrontendFields(signupFields, "signup", authType);
        content = content.replace(/\/\*\s*FIELDS_PLACEHOLDER_SIGNUP\s*\*\//g, replacement);
        updated = true;
      }

      // ✅ Signin form
      if (/\/\*\s*FIELDS_PLACEHOLDER_SIGNIN\s*\*\//.test(content)) {
        const replacement = generateFrontendFields(signinFields, "signin", authType);
        content = content.replace(/\/\*\s*FIELDS_PLACEHOLDER_SIGNIN\s*\*\//g, replacement);
        updated = true;
      }
    }

    // ✅ Migration files
    else if (filePath.toLowerCase().includes('migration') && content.includes('/*FIELDS_PLACEHOLDER*/')) {
      const allFields = [
        ...(fields.signupFields || []),
        ...(fields.signinFields || []),
        ...(fields.registerFields || []),
        ...(fields.backendFields || []),
      ];
      console.log("all fields",allFields)
      const uniqueFields = [...new Set(allFields)];
      console.log("unique fields11",uniqueFields)
      if (!uniqueFields.includes('id')) uniqueFields.unshift('id'); 
      console.log("unique fields11",uniqueFields)
      const replacement = generateMigrationFields(uniqueFields,authType);
      content = content.replace('/*FIELDS_PLACEHOLDER*/', replacement);
      updated = true;
    }

    // ✅ Backend files
    else if (content.includes('/*FIELDS_PLACEHOLDER*/')) {
      const replacement = generateBackendFields(fields, authType);
      content = content.replace('/*FIELDS_PLACEHOLDER*/', replacement);
      updated = true;
    }

    if (updated) {
      console.log(`Processed: ${filePath}`);
      await writeFile(filePath, content, 'utf-8');
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    throw error;
  }
}
async function processFolder(folderPath, fields, dbType,authType) {
  try {
    const files = await readdir(folderPath);

    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const fileStat = await stat(fullPath);

  
    if (fileStat.isDirectory()) {
      await processFolder(fullPath, fields, dbType, authType); // ✅ pass authType
    } else {
      await applyDynamicFields(fullPath, fields, dbType, authType); // ✅ pass authType
    }
    }
  } catch (error) {
    console.error(`Error processing folder ${folderPath}:`, error.message);
    throw error;
  }
}
async function runGenerator(dbType, authType, fields) {
  console.log('runGenerator started');
  try {
    const templatePath = path.join(
      __dirname,
      '..',
      'templates',
      dbType.toLowerCase(),
      authType.toLowerCase() + 'based'
    );
    const outputPath = path.join(__dirname, '..', 'output');

    console.log('Template path:', templatePath);
    console.log('Output path:', outputPath);

    // Check if template path exists
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template path does not exist: ${templatePath}`);
    }

    console.log('Template path exists, starting copy...');

    // Ensure output directory exists and is empty
    await fse.emptyDir(outputPath);

    // Copy template files
    await fse.copy(templatePath, outputPath, {
      overwrite: true,
      filter: (src) => {
        // Skip node_modules and other unnecessary files
        return !src.includes('node_modules') && !src.includes('.git');
      },
    });

    console.log('Template files copied successfully');

    // Replace placeholders
    console.log('Processing fields in templates...');
    console.log(outputPath);
    await processFolder(outputPath, fields, dbType,authType);
    console.log('Field processing completed');

    console.log("✅ Project generated successfully in 'output' folder!");

    return outputPath; 
  } catch (error) {
    console.error('❌ Error in runGenerator:', error.message);
    console.error(error.stack);
    throw error;
  }
}
if (require.main === module) {
  const dbType = 'sql'; 
  const authType = 'password'; 
  const fields = {
    signup: ['username', 'email', 'password', 'confirmPassword', 'phoneNumber'],
    signin: ['email', 'password', 'confirmPassword'],
    backend: ['username', 'email', 'password', 'phoneNumber'],
    register:['username','phone number']
  };

  runGenerator(dbType, authType, fields)
    .then(() => console.log('Generation complete!'))
    .catch((err) => console.error('Generation failed:', err));
}
module.exports = { runGenerator };
