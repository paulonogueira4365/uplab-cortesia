import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Pega os dados vindos do formulário
    const { paciente, exame, motivo } = await req.json();

    // 2. Busca a chave que você cadastrou na Vercel
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key não encontrada nas configurações da Vercel." }, 
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 3. Envia o e-mail
    const data = await resend.emails.send({
      from: 'Uplab Sistema <onboarding@resend.dev>',
      to: ['paulo.nogueira@laboratoriouplab.com'], // <--- COLOQUE SEU E-MAIL DE CADASTRO DO RESEND AQUI
      subject: `Solicitação de Cortesia: ${paciente}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1d4ed8;">Solicitação de Cortesia - Uplab</h2>
          <p>Uma nova solicitação foi gerada pelo departamento comercial:</p>
          <hr />
          <p><strong>Paciente:</strong> ${paciente}</p>
          <p><strong>Exame:</strong> ${exame}</p>
          <p><strong>Motivo:</strong> ${motivo}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">Para decidir, responda este e-mail com "AUTORIZADO" ou "NEGADO".</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}