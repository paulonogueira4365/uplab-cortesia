import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { paciente, exame, motivo } = await req.json();

    const data = await resend.emails.send({
      from: 'Uplab Sistema <onboarding@resend.dev>', // Depois configuramos seu domínio
      to: ['seu-email@uplab.com.br'], // E-mail de quem aprova
      subject: `Nova Solicitação de Cortesia: ${paciente}`,
      html: `
        <h2>Nova Solicitação de Cortesia - Uplab</h2>
        <p><strong>Paciente:</strong> ${paciente}</p>
        <p><strong>Exame:</strong> ${exame}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
        <hr />
        <a href="https://seu-projeto.vercel.app/aprovar" style="background: green; color: white; padding: 10px; text-decoration: none; border-radius: 5px;">Aprovar Cortesia</a>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}