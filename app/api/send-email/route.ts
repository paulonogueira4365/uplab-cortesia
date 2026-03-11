import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// O segredo está aqui: se a chave não existir, ele usa uma string qualquer só para o build passar
const resend = new Resend(process.env.RESEND_API_KEY || 're_aguardando_chave');

export async function POST(req: Request) {
  try {
    const { paciente, exame, motivo } = await req.json();

    // Se a chave não estiver configurada na Vercel, avisamos o frontend
    if (!process.env.RESEND_API_KEY) {
       return NextResponse.json({ error: "API Key faltando na Vercel" }, { status: 500 });
    }

    const data = await resend.emails.send({
      from: 'Uplab Sistema <onboarding@resend.dev>',
      to: ['SEU_EMAIL_AQUI@gmail.com'], // COLOQUE SEU EMAIL AQUI
      subject: `CORTESIA: ${paciente}`,
      html: `
        <h3>Nova Solicitação Uplab</h3>
        <p><strong>Paciente:</strong> ${paciente}</p>
        <p><strong>Exame:</strong> ${exame}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
        <p>---</p>
        <p>Responda este e-mail para decidir.</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}