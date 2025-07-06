import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Contacto() {
  return (
    <PublicLayout>
      <Head title="Contacto" />

      <section className="bg-gray-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Fale Connosco</h1>
        <p className="text-lg">Tem dúvidas? Precisa de ajuda? Estamos aqui para si.</p>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Formulário */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">📬 Enviar Mensagem</h2>
            <form method="POST" action="/contacto" className="space-y-4">
              <div>
                <label className="block text-gray-700">Nome</label>
                <input
                  type="text"
                  name="nome"
                  required
                  className="w-full border p-2 rounded"
                  placeholder="O seu nome"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border p-2 rounded"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700">Mensagem</label>
                <textarea
                  name="mensagem"
                  rows={5}
                  required
                  className="w-full border p-2 rounded"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Informações de contacto */}
          <div className="bg-gray-50 p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">📍 Contactos</h2>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Morada:</strong> Rua Exemplo, 123, Quinta do Conde</li>
              <li><strong>Email:</strong> geral@xiotecar.pt</li>
              <li><strong>Telefone:</strong> +351 912 345 678</li>
              <li><strong>Horário:</strong> Seg-Sex: 9h - 18h</li>
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">🗺️ Localização</h3>
              <iframe
                title="mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.123456789!2d-9.139337384657219!3d38.7369465795965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19331c9f9a1f3f%3A0x7bc0c4b3bd0b3b0!2sLisboa!5e0!3m2!1spt-PT!2spt!4v0000000000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}