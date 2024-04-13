import nodemailer from "nodemailer";
import { IServicesEmail } from "../../domain/services/IServicesEmails";

export class ServicesEmail implements IServicesEmail {
  async sendMail(email: string, name: string): Promise<boolean> {
    try {
      const info = await transporter.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: email,
        subject: `Bienvenido ${name} 🎈🎉🥳🎉🎈`,
        html: `
        <b>Gracias por usar nuestra aplicación y tener confíanza en nosotros</b><br />
        <b>Ten por seguro que con nosotros la seguridad de tu bicicleta esta en buenas manos 😉.</b><br />
        `,
      });
      if (info) {
        console.log("email enviado");
      } else {
        console.log("hubo un problema al enviar el email");
      }
    } catch (error) {
      console.log(error);
    }
    return true;
  }
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
