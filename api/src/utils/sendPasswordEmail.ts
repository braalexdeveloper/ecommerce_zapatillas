import { transporter } from "./mailer";

export async function sendPasswordEmail(toEmail:string,password:string):Promise<void>{
    const mailOptions = {
    from: '"Zapatillas Tiburón" <brayangenesis@gmail.com>',
    to: toEmail,
    subject: 'Tu contraseña de acceso',
    text: `Hola! Gracias por tu compra. Tu contraseña de acceso es: ${password}`,
    html: `<p>Hola! Gracias por tu compra.</p><p>Tu contraseña de acceso es: <strong>${password}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
   console.log('Correo enviado a:', toEmail);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }

}