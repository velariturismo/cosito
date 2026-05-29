import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';
import { useAdminData } from '@/contexts/AdminDataContext';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import EmptyState from '@/components/admin/EmptyState';

const TIPOS = ['hotel', 'aerolinea', 'guia', 'transporte', 'otro'];

const TIPO_BADGE = {
  hotel: 'bg-purple-100 text-purple-800',
  aerolinea: 'bg-blue-100 text-blue-800',
  guia: 'bg-green-100 text-green-800',
  transporte: 'bg-orange-100 text-orange-800',
  otro: 'bg-gray-100 text-gray-700',
};

const TIPO_LABEL = {
  hotel: 'Hotel',
  aerolinea: 'Aerolínea',
  guia: 'Guía',
  transporte: 'Transporte',
  otro: 'Otro',
};

const EMPTY_FORM = {
  nombre: '', tipo: 'hotel', contacto: '', email: '', telefono: '', pais: '', notas: '',
};

export default function ProveedoresPage() {
  const { proveedores, addProveedor, updateProveedor, deleteProveedor } = useAdminData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filterTipo, setFilterTipo] = useState('todos');

  function openAdd() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(proveedor) {
    setEditId(proveedor.id);
    setForm({
      nombre: proveedor.nombre || '',
      tipo: proveedor.tipo || 'hotel',
      contacto: proveedor.contacto || '',
      email: proveedor.email || '',
      telefono: proveedor.telefono || '',
      pais: proveedor.pais || '',
      notas: proveedor.notas || '',
    });
    setModalOpen(true);
  }

  function handleSave(e) {
    e.preventDefault();
    if (editId) {
      updateProveedor(editId, form);
    } else {
      addProveedor(form);
    }
    setModalOpen(false);
  }

  const filtered = proveedores.filter(p =>
    filterTipo === 'todos' || p.tipo === filterTipo
  );

  const columns = [
    {
      key: 'nombre',
      label: 'Nombre',
      render: v => <span className="font-medium text-gray-900">{v}</span>,
    },
    {
      key: 'tipo',
      label: 'Tipo',
      render: v => (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${TIPO_BADGE[v] || TIPO_BADGE.otro}`}>
          {TIPO_LABEL[v] || v}
        </span>
      ),
    },
    { key: 'contacto', label: 'Contacto' },
    { key: 'email', label: 'Email' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'pais', label: 'País' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nuevo Proveedor
        </button>
      </div>

      {/* Filter by tipo */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 flex-wrap">
        <button
          onClick={() => setFilterTipo('todos')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            filterTipo === 'todos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Todos
        </button>
        {TIPOS.map(t => (
          <button
            key={t}
            onClick={() => setFilterTipo(t)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filterTipo === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {TIPO_LABEL[t]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Building2} title="Sin proveedores" description="No hay proveedores en esta categoría." />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <DataTable
            columns={columns}
            rows={filtered}
            searchPlaceholder="Buscar por nombre, contacto o país..."
            searchKeys={['nombre', 'contacto', 'email', 'pais']}
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
        title={editId ? 'Editar Proveedor' : 'Nuevo Proveedor'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={form.tipo}
              onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {TIPOS.map(t => (
                <option key={t} value={t}>{TIPO_LABEL[t]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
            <input
              type="text"
              value={form.contacto}
              onChange={e => setForm(f => ({ ...f, contacto: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="text"
                value={form.telefono}
                onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
              <input
                type="text"
                value={form.pais}
                onChange={e => setForm(f => ({ ...f, pais: e.target.value }))}
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
              {editId ? 'Guardar Cambios' : 'Crear Proveedor'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Eliminar Proveedor"
      >
        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que querés eliminar a{' '}
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
            onClick={() => { deleteProveedor(confirmDelete.id); setConfirmDelete(null); }}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
}
