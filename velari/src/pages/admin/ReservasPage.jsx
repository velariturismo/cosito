import React, { useState } from 'react';
import { Plus, Pencil, Trash2, CalendarCheck } from 'lucide-react';
import { useAdminData } from '@/contexts/AdminDataContext';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import EmptyState from '@/components/admin/EmptyState';

const ESTADOS = ['pendiente', 'confirmada', 'cancelada', 'completada'];

const ESTADO_BADGE = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
  completada: 'bg-blue-100 text-blue-800',
};

const TABS = ['todas', ...ESTADOS];

const EMPTY_FORM = {
  clienteId: '', paqueteId: '', fechaSalida: '',
  estado: 'pendiente', total: '', seña: '', notas: '',
};

function formatARS(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);
}

export default function ReservasPage() {
  const { clientes, paquetes, reservas, addReserva, updateReserva, deleteReserva } = useAdminData();

  const [tab, setTab] = useState('todas');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState(null);

  function openAdd() {
    setEditId(null);
    setForm({ ...EMPTY_FORM, clienteId: clientes[0]?.id || '', paqueteId: paquetes[0]?.id || '' });
    setModalOpen(true);
  }

  function openEdit(reserva) {
    setEditId(reserva.id);
    setForm({
      clienteId: reserva.clienteId || '',
      paqueteId: reserva.paqueteId || '',
      fechaSalida: reserva.fechaSalida || '',
      estado: reserva.estado || 'pendiente',
      total: String(reserva.total || ''),
      seña: String(reserva.seña || ''),
      notas: reserva.notas || '',
    });
    setModalOpen(true);
  }

  function handleSave(e) {
    e.preventDefault();
    const data = {
      ...form,
      total: Number(form.total),
      seña: Number(form.seña),
    };
    if (editId) {
      updateReserva(editId, data);
    } else {
      addReserva(data);
    }
    setModalOpen(false);
  }

  const filtered = reservas.filter(r => tab === 'todas' || r.estado === tab);

  const rows = filtered.map(r => {
    const cliente = clientes.find(c => c.id === r.clienteId);
    const paquete = paquetes.find(p => p.id === r.paqueteId);
    return {
      ...r,
      _clienteNombre: cliente ? `${cliente.nombre} ${cliente.apellido}` : '-',
      _paqueteNombre: paquete ? paquete.nombre : '-',
    };
  });

  const columns = [
    {
      key: '_clienteNombre',
      label: 'Cliente',
      render: v => <span className="font-medium text-gray-900">{v}</span>,
    },
    { key: '_paqueteNombre', label: 'Paquete' },
    { key: 'fechaSalida', label: 'Fecha Salida' },
    {
      key: 'estado',
      label: 'Estado',
      render: v => (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${ESTADO_BADGE[v] || 'bg-gray-100 text-gray-700'}`}>
          {v}
        </span>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      render: v => formatARS(v),
    },
    {
      key: 'seña',
      label: 'Seña',
      render: v => formatARS(v),
    },
    {
      key: 'notas',
      label: 'Notas',
      render: v => <span className="text-gray-500 text-xs truncate max-w-[140px] block">{v || '-'}</span>,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reservas</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nueva Reserva
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 flex-wrap">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
              tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'todas' ? 'Todas' : t.charAt(0).toUpperCase() + t.slice(1)}
            {t !== 'todas' && (
              <span className="ml-1.5 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                {reservas.filter(r => r.estado === t).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={CalendarCheck} title="Sin reservas" description="No hay reservas en esta categoría." />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <DataTable
            columns={columns}
            rows={rows}
            searchPlaceholder="Buscar por cliente o paquete..."
            searchKeys={['_clienteNombre', '_paqueteNombre', 'notas']}
            actions={(row) => (
              <>
                <button
                  onClick={() => openEdit(row)}
                  className="text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50 transition-colors"
                  title="Editar"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setConfirmDelete(row)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          />
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Editar Reserva' : 'Nueva Reserva'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
            <select
              required
              value={form.clienteId}
              onChange={e => setForm(f => ({ ...f, clienteId: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Seleccionar cliente...</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} {c.apellido}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paquete *</label>
            <select
              required
              value={form.paqueteId}
              onChange={e => setForm(f => ({ ...f, paqueteId: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Seleccionar paquete...</option>
              {paquetes.map(p => (
                <option key={p.id} value={p.id}>{p.nombre} — {p.destino}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Salida *</label>
            <input
              type="date"
              required
              value={form.fechaSalida}
              onChange={e => setForm(f => ({ ...f, fechaSalida: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={form.estado}
              onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {ESTADOS.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total (ARS)</label>
              <input
                type="number"
                min="0"
                value={form.total}
                onChange={e => setForm(f => ({ ...f, total: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seña (ARS)</label>
              <input
                type="number"
                min="0"
                value={form.seña}
                onChange={e => setForm(f => ({ ...f, seña: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
            <textarea
              rows={3}
              value={form.notas}
              onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              {editId ? 'Guardar Cambios' : 'Crear Reserva'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Eliminar Reserva"
      >
        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que querés eliminar la reserva de{' '}
          <strong>{confirmDelete?._clienteNombre}</strong> para{' '}
          <strong>{confirmDelete?._paqueteNombre}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => { deleteReserva(confirmDelete.id); setConfirmDelete(null); }}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
}
