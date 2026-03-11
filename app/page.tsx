"use client";

export default function FormularioCortesia() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-black">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border-t-8 border-blue-700">
        <h1 className="text-2xl font-bold mb-1 text-blue-700">Uplab Laboratório</h1>
        <p className="text-gray-600 mb-6 text-sm font-medium">Solicitação de Cortesia Comercial</p>

        {/* SUBSTITUA O LINK ABAIXO PELO LINK QUE O FORMSPREE TE DEU 
        */}
        <form action="https://formspree.io/f/meergpwp" method="POST" className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Paciente</label>
            <input type="text" name="paciente" required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Exame</label>
            <input type="text" name="exame" required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Motivo da Cortesia</label>
            <textarea name="motivo" required className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-95"
          >
            Enviar para Aprovação
          </button>
        </form>
        
        <p className="mt-4 text-[10px] text-gray-400 text-center">
          Uplab Sistema Interno - 2026
        </p>
      </div>
    </main>
  );
}