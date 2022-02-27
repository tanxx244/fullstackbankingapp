const admin = require('firebase-admin');

// firebase service account pk
const type = "";
const project_id = "";
const private_key_id = "";
const private_key = "";
const client_email = "";
const client_id = "";
const auth_uri = "";
const token_uri = "";
const auth_provider_x509_cert_url = "";
const client_x509_cert_url = "";

// credential grants access to Firebase services
admin.initializeApp({
  credential: admin.credential.cert({
      type,
      project_id,
      private_key_id,
      private_key:
        private_key.replace(/\\n/g,'\n'),
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url
  }),
});

module.exports = admin;