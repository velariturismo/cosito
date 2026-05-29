import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { useAdminData } from '@/contexts/AdminDataContext';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import EmptyState from '@/components/admin/EmptyState';

const EMPTY_FORM = {
  nombre: '', apellido: '', email: '', telefono: '', dni: '', ciudad: '', notas: '',
};

export default function ClientesPage() {
  const { clientes, addCliente, updateCliente, deleteCliente } = useAdminData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState(null);

  function openAdd() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(cliente) {
    setEditId(cliente.id);
    setForm({
      nombre: cliente.nombre || '',
      apellido: cliente.apellido || '',
      email: cliente.email || '',
      telefono: cliente.telefono || '',
      dni: cliente.dni || '',
      ciudad: cliente.ciudad || '',
      notas: cliente.notas || '',
    });
    setModalOpen(true);
  }

  function handleSave(e) {
    e.preventDefault();
    if (editId) {
      updateCliente(editId, form);
    } else {
      addCliente(form);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    deleteCliente(id);
    setConfirmDelete(null);
  }

  const columns = [
    {
      key: 'nombre',
      label: 'Nombre',
      render: (_, row) => (
        <span className="font-medium text-gray-900">{row.nombre} {row.apellido}</span>
      ),
    },
    { key: 'email', label: 'Email' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'ciudad', label: 'Ciudad' },
    { key: 'fechaCreacion', label: 'Registro' },
  ];

  const rows = clientes.map(c => ({ ...c, _nombre: `${c.nombre} ${c.apellido}` }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nuevo Cliente
        </button>
      </div>

      {clientes.length === 0 ? (
        <EmptyState icon={Users} title="Sin clientes" description="Agregá tu primer cliente para comenzar." />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <DataTable
            columns={columns}
            rows={rows}
            searchPlaceholder="Buscar por nombre, email o ciudad..."
            searchKeys={['_nombre', 'email', 'ciudad', 'telefono', 'dni']}
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
        title={editId ? 'Editar Cliente' : 'Nuevo Cliente'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
              <input
                type="text"
                required
                value={form.apellido}
                onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
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
              <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
              <input
                type="text"
                value={form.dni}
                onChange={e => setForm(f => ({ ...f, dni: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <input
              type="text"
              value={form.ciudad}
              onChange={e => setForm(f => ({ ...f, ciudad: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
              {editId ? 'Guardar Cambios' : 'Crear Cliente'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Eliminar Cliente"
      >
        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que querés eliminar a{' '}
          <strong>{confirmDelete?.nombre} {confirmDelete?.apellido}</strong>?
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleDelete(confirmDelete.id)}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
}
