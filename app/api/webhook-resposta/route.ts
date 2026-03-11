import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // O Postmark envia o texto da resposta aqui:
    const textoDaResposta = body.StrippedTextReply; // Pega apenas o que o gestor digitou
    const emailDoGestor = body.From;
    const assunto = body.Subject;

    console.log(`O gestor ${emailDoGestor} respondeu: ${textoDaResposta}`);

    // Lógica simples de automação:
    if (textoDaResposta.toLowerCase().includes("autorizado") || 
        textoDaResposta.toLowerCase().includes("ok")) {
      
      // 1. Aqui você atualizaria seu banco de dados Uplab
      // 2. Poderia disparar um alerta para o seu WhatsApp/E-mail comercial
      console.log("Status: CORTESIA APROVADA");
    }

    return NextResponse.json({ message: "Resposta processada!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar" }, { status: 500 });
  }
}