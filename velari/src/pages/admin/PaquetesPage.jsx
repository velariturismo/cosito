import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Package, Plane, Hotel, Users } from 'lucide-react';
import { useAdminData } from '@/contexts/AdminDataContext';
import Modal from '@/components/admin/Modal';
import EmptyState from '@/components/admin/EmptyState';

const CATEGORIAS = ['Playa', 'Cultural', 'Aventura', 'Naturaleza', 'Crucero', 'City Break', 'Otro'];

const EMPTY_FORM = {
  nombre: '', destino: '', descripcion: '', precio: '', duracion: '',
  cupos: '', cuposDisponibles: '', categoria: 'Cultural',
  incluyeVuelo: false, incluyeHotel: false, activo: true,
};

function formatARS(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);
}

export default function PaquetesPage() {
  const { paquetes, addPaquete, updatePaquete, deletePaquete } = useAdminData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filter, setFilter] = useState('todos');
  const [search, setSearch] = useState('');

  function openAdd() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(paquete) {
    setEditId(paquete.id);
    setForm({
      nombre: paquete.nombre || '',
      destino: paquete.destino || '',
      descripcion: paquete.descripcion || '',
      precio: String(paquete.precio || ''),
      duracion: String(paquete.duracion || ''),
      cupos: String(paquete.cupos || ''),
      cuposDisponibles: String(paquete.cuposDisponibles || ''),
      categoria: paquete.categoria || 'Cultural',
      incluyeVuelo: !!paquete.incluyeVuelo,
      incluyeHotel: !!paquete.incluyeHotel,
      activo: paquete.activo !== false,
    });
    setModalOpen(true);
  }

  function handleSave(e) {
    e.preventDefault();
    const data = {
      ...form,
      precio: Number(form.precio),
      duracion: Number(form.duracion),
      cupos: Number(form.cupos),
      cuposDisponibles: Number(form.cuposDisponibles),
    };
    if (editId) {
      updatePaquete(editId, data);
    } else {
      addPaquete(data);
    }
    setModalOpen(false);
  }

  const filtered = paquetes
    .filter(p => {
      if (filter === 'activos') return p.activo;
      if (filter === 'inactivos') return !p.activo;
      return true;
    })
    .filter(p => {
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      return (
        p.nombre?.toLowerCase().includes(s) ||
        p.destino?.toLowerCase().includes(s) ||
        p.categoria?.toLowerCase().includes(s)
      );
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Paquetes</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nuevo Paquete
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {['todos', 'activos', 'inactivos'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar paquete..."
          className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Package} title="Sin paquetes" description="No hay paquetes que coincidan con el filtro." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(paquete => (
            <div key={paquete.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{paquete.nombre}</h3>
                  <p className="text-sm text-gray-500 truncate">{paquete.destino}</p>
                </div>
                <span className={`ml-2 flex-shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  paquete.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {paquete.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{paquete.descripcion}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full">{paquete.categoria}</span>
                {paquete.incluyeVuelo && (
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                    <Plane size={10} /> Vuelo
                  </span>
                )}
                {paquete.incluyeHotel && (
                  <span className="flex items-center gap-1 bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                    <Hotel size={10} /> Hotel
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-gray-50 rounded-lg py-2">
                  <p className="text-xs text-gray-500">Precio</p>
                  <p className="text-sm font-bold text-gray-900">{formatARS(paquete.precio)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg py-2">
                  <p className="text-xs text-gray-500">Días</p>
                  <p className="text-sm font-bold text-gray-900">{paquete.duracion}</p>
                </div>
                <div className={`rounded-lg py-2 ${paquete.cuposDisponibles === 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                  <p className="text-xs text-gray-500">Cupos</p>
                  <p className={`text-sm font-bold ${paquete.cuposDisponibles === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {paquete.cuposDisponibles === 0 ? 'Agotado' : `${paquete.cuposDisponibles}/${paquete.cupos}`}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => openEdit(paquete)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-sm text-indigo-600 border border-indigo-200 rounded-lg py-1.5 hover:bg-indigo-50 transition-colors font-medium"
                >
                  <Pencil size={14} /> Editar
                </button>
                <button
                  onClick={() => setConfirmDelete(paquete)}
                  className="flex items-center justify-center px-3 text-red-500 border border-red-200 rounded-lg py-1.5 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Editar Paquete' : 'Nuevo Paquete'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destino *</label>
            <input
              type="text"
              required
              value={form.destino}
              onChange={e => setForm(f => ({ ...f, destino: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              rows={3}
              value={form.descripcion}
              onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (ARS) *</label>
              <input
                type="number"
                required
                min="0"
                value={form.precio}
                onChange={e => setForm(f => ({ ...f, precio: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duración (días) *</label>
              <input
                type="number"
                required
                min="1"
                value={form.duracion}
                onChange={e => setForm(f => ({ ...f, duracion: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cupos totales</label>
              <input
                type="number"
                min="0"
                value={form.cupos}
                onChange={e => setForm(f => ({ ...f, cupos: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cupos disponibles</label>
              <input
                type="number"
                min="0"
                value={form.cuposDisponibles}
                onChange={e => setForm(f => ({ ...f, cuposDisponibles: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={form.categoria}
              onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.incluyeVuelo}
                onChange={e => setForm(f => ({ ...f, incluyeVuelo: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="text-sm text-gray-700">Incluye vuelo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.incluyeHotel}
                onChange={e => setForm(f => ({ ...f, incluyeHotel: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="text-sm text-gray-700">Incluye hotel</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.activo}
                onChange={e => setForm(f => ({ ...f, activo: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="text-sm text-gray-700">Activo</span>
            </label>
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
              {editId ? 'Guardar Cambios' : 'Crear Paquete'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Eliminar Paquete"
      >
        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que querés eliminar el paquete{' '}
          <strong>{confirmDelete?.nombre}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => { deletePaquete(confirmDelete.id); setConfirmDelete(null); }}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
}
