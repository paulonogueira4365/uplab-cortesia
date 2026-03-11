"use client";
import { useState } from "react";

export default function FormularioCortesia() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("✅ Enviado com sucesso!");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("❌ Erro ao enviar. Verifique a API Key na Vercel.");
      }
    } catch (err) {
      setStatus("❌ Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-black">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border-t-8 border-blue-700">
        <h1 className="text-2xl font-bold mb-1">Uplab Laboratório</h1>
        <p className="text-gray-600 mb-6">Solicitação de Cortesia Comercial</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Paciente</label>
            <input name="paciente" required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Exame</label>
            <input name="exame" required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Motivo</label>
            <textarea name="motivo" required className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-all"
          >
            {loading ? "Processando..." : "Enviar para Gestão"}
          </button>
        </form>
        {status && <p className="mt-4 text-center font-medium text-sm">{status}</p>}
      </div>
    </main>
  );
}