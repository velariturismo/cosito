import React from 'react';
import { Users, CalendarCheck, DollarSign, Package } from 'lucide-react';
import { useAdminData } from '@/contexts/AdminDataContext';
import StatCard from '@/components/admin/StatCard';

const ESTADO_BADGE = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
  completada: 'bg-blue-100 text-blue-800',
};

function formatARS(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);
}

export default function DashboardPage() {
  const { clientes, paquetes, reservas } = useAdminData();

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const reservasMes = reservas.filter(r => r.fechaReserva && r.fechaReserva.startsWith(thisMonth));
  const ingresosMes = reservasMes.reduce((sum, r) => sum + (Number(r.total) || 0), 0);
  const paquetesActivos = paquetes.filter(p => p.activo).length;

  const recentReservas = [...reservas]
    .sort((a, b) => new Date(b.fechaReserva) - new Date(a.fechaReserva))
    .slice(0, 5);

  // Top paquetes
  const paqueteCount = {};
  reservas.forEach(r => {
    paqueteCount[r.paqueteId] = (paqueteCount[r.paqueteId] || 0) + 1;
  });
  const topPaquetes = Object.entries(paqueteCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => {
      const paq = paquetes.find(p => p.id === id);
      return { nombre: paq ? paq.nombre : id, count };
    });

  const maxCount = topPaquetes[0]?.count || 1;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} title="Total Clientes" value={clientes.length} color="indigo" />
        <StatCard icon={CalendarCheck} title="Reservas del Mes" value={reservasMes.length} color="green" />
        <StatCard icon={DollarSign} title="Ingresos del Mes" value={formatARS(ingresosMes)} color="yellow" />
        <StatCard icon={Package} title="Paquetes Activos" value={paquetesActivos} color="blue" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent reservations */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Últimas Reservas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase">
                  <th className="pb-2 text-left font-semibold">Cliente</th>
                  <th className="pb-2 text-left font-semibold">Paquete</th>
                  <th className="pb-2 text-left font-semibold">Salida</th>
                  <th className="pb-2 text-left font-semibold">Estado</th>
                  <th className="pb-2 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentReservas.map(r => {
                  const cliente = clientes.find(c => c.id === r.clienteId);
                  const paquete = paquetes.find(p => p.id === r.paqueteId);
                  return (
                    <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 pr-4 text-gray-800 font-medium">
                        {cliente ? `${cliente.nombre} ${cliente.apellido}` : '-'}
                      </td>
                      <td className="py-2.5 pr-4 text-gray-600">{paquete ? paquete.nombre : '-'}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{r.fechaSalida || '-'}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${ESTADO_BADGE[r.estado] || 'bg-gray-100 text-gray-700'}`}>
                          {r.estado}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-gray-800 font-medium">{formatARS(r.total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top packages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Top Paquetes</h2>
          <div className="space-y-3">
            {topPaquetes.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 truncate mr-2">{p.nombre}</span>
                  <span className="text-xs font-semibold text-gray-500 flex-shrink-0">{p.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 bg-indigo-500 rounded-full"
                    style={{ width: `${(p.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {topPaquetes.length === 0 && (
              <p className="text-sm text-gray-400">Sin datos</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
