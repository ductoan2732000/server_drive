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
  } catch (ex) {
    console.log(ex);
  }
}
module.exports = {drive, uploadFile};
