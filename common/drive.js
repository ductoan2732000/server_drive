const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const {
  client_id,
  client_secret,
  redirect_url,
  refresh_token,
} = require("../config/configDrive");
const clientId = client_id;

const clientSecret = client_secret;
const redirectUrl = redirect_url;
const refreshToken = refresh_token;

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);
oauth2Client.setCredentials({ refresh_token: refreshToken });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
async function uploadFile(filePath, nameFile, mimeType) {
  let file_path = path.join(__dirname, filePath);
  try {
    const res = await drive.files.create({
      requestBody: {
        name: nameFile,
        mimeType: mimeType,
      },
      media: {
        mimeType: mimeType,
        body: fs.createReadStream(file_path),
      },
    });
    return res;
  } catch (ex) {
    console.log(ex);
    return null;
  }
}
async function deleteFile(fileId){
  try {
    let res = await drive.files.delete({
      fileId: fileId
    })
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function setFilePuclic(fileId){
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }

    })
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
module.exports = { drive, uploadFile, deleteFile, setFilePuclic };
