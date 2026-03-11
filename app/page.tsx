"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function FormularioCortesia() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState("");

  const onSubmit = async (data: any) => {
    setStatus("Enviando solicitação...");
    
    // Aqui faremos a chamada para a API que criaremos no próximo passo
    const response = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatus("✅ Solicitação enviada com sucesso para o Gestor!");
      reset();
    } else {
      setStatus("❌ Erro ao enviar. Tente novamente.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 border-t-4 border-blue-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Uplab Laboratório</h1>
        <p className="text-gray-500 mb-6 text-sm">Solicitação de Cortesia Comercial</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Paciente</label>
            <input {...register("paciente")} required className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none text-black" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Exame Solicitado</label>
            <input {...register("exame")} required className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none text-black" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo da Cortesia</label>
            <textarea {...register("motivo")} required className="w-full p-2 border rounded mt-1 h-24 focus:ring-2 focus:ring-blue-500 outline-none text-black" />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
            Enviar para Aprovação
          </button>
        </form>

        {status && (
          <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded text-center text-sm font-semibold">
            {status}
          </div>
        )}
      </div>
    </main>
  );
}