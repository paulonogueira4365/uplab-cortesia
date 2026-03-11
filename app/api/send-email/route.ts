import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { paciente, exame, motivo } = await req.json();

    // Movendo a criação do objeto para DENTRO da função
    // Isso impede o erro durante o deploy (Build)
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("ERRO: API Key não configurada na Vercel");
      return NextResponse.json({ error: "Configuração pendente" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from: 'Uplab Sistema <onboarding@resend.dev>',
      to: ['SEU_EMAIL_AQUI@gmail.com'], // Mude para o seu e-mail de teste
      subject: `Solicitação de Cortesia: ${paciente}`,
      html: `
        <h3>Nova Solicitação Uplab</h3>
        <p><strong>Paciente:</strong> ${paciente}</p>
        <p><strong>Exame:</strong> ${exame}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}