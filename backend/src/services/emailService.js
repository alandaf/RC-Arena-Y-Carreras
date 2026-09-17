const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mailhog',
  port: Number(process.env.SMTP_PORT) || 1025,
  secure: false,
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
});

function cargarTemplate(nombreArchivo, variables = {}) {
  const rutaTemplate = path.join(__dirname, '..', 'templates', nombreArchivo);
  let html = fs.readFileSync(rutaTemplate, 'utf-8');
  for (const [clave, valor] of Object.entries(variables)) {
    html = html.replaceAll(`{{${clave}}}`, valor ?? '');
  }
  return html;
}

async function enviarEmail({ to, subject, template, variables }) {
  const html = cargarTemplate(template, variables);

  console.log('\n📧 ----- EMAIL SIMULADO (MailHog) -----');
  console.log(`   Para:     ${to}`);
  console.log(`   Asunto:   ${subject}`);
  console.log(`   Template: ${template}`);
  console.log('   ------------------------------------\n');

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'RC Arena <no-reply@rcarena.local>',
    to,
    subject,
    html,
  });

  return info;
}

module.exports = { enviarEmail, cargarTemplate };
