import React, { createContext, useContext, useState, useEffect } from 'react';

const SEED_CLIENTES = [
  { id: 'c1', nombre: 'María', apellido: 'González', email: 'maria.gonzalez@gmail.com', telefono: '+54 11 4567-8901', dni: '28.345.678', ciudad: 'Buenos Aires', notas: 'Prefiere vuelos de mañana', fechaCreacion: '2024-01-15' },
  { id: 'c2', nombre: 'Carlos', apellido: 'Rodríguez', email: 'carlos.rodriguez@hotmail.com', telefono: '+54 11 5678-9012', dni: '30.456.789', ciudad: 'Córdoba', notas: 'Cliente frecuente, descuento especial', fechaCreacion: '2024-02-03' },
  { id: 'c3', nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@yahoo.com', telefono: '+54 351 234-5678', dni: '25.678.901', ciudad: 'Rosario', notas: '', fechaCreacion: '2024-02-20' },
  { id: 'c4', nombre: 'Diego', apellido: 'López', email: 'diego.lopez@gmail.com', telefono: '+54 261 345-6789', dni: '32.789.012', ciudad: 'Mendoza', notas: 'Viaja con familia numerosa', fechaCreacion: '2024-03-05' },
  { id: 'c5', nombre: 'Laura', apellido: 'Fernández', email: 'laura.fernandez@outlook.com', telefono: '+54 11 6789-0123', dni: '27.890.123', ciudad: 'Buenos Aires', notas: 'Alérgica a mariscos', fechaCreacion: '2024-03-18' },
  { id: 'c6', nombre: 'Martín', apellido: 'Sánchez', email: 'martin.sanchez@gmail.com', telefono: '+54 11 7890-1234', dni: '29.901.234', ciudad: 'La Plata', notas: '', fechaCreacion: '2024-04-02' },
  { id: 'c7', nombre: 'Valentina', apellido: 'Torres', email: 'valen.torres@gmail.com', telefono: '+54 387 456-7890', dni: '33.012.345', ciudad: 'Salta', notas: 'Interesada en ecoturismo', fechaCreacion: '2024-04-22' },
  { id: 'c8', nombre: 'Sebastián', apellido: 'Pérez', email: 'sebaperez@gmail.com', telefono: '+54 11 8901-2345', dni: '26.123.456', ciudad: 'Buenos Aires', notas: 'Viaja por negocios también', fechaCreacion: '2024-05-10' },
  { id: 'c9', nombre: 'Florencia', apellido: 'Ruiz', email: 'flor.ruiz@hotmail.com', telefono: '+54 223 567-8901', dni: '31.234.567', ciudad: 'Mar del Plata', notas: '', fechaCreacion: '2024-05-28' },
];

const SEED_PAQUETES = [
  { id: 'p1', nombre: 'Caribe Mágico', destino: 'Cancún, México', descripcion: 'Disfruta de las playas cristalinas del Caribe con todo incluido en un resort 5 estrellas.', precio: 850000, duracion: 7, cupos: 20, cuposDisponibles: 8, categoria: 'Playa', incluyeVuelo: true, incluyeHotel: true, activo: true },
  { id: 'p2', nombre: 'Europa Clásica', destino: 'París, Roma, Barcelona', descripcion: 'Un recorrido por las ciudades más emblemáticas de Europa con guía en español.', precio: 1500000, duracion: 14, cupos: 15, cuposDisponibles: 3, categoria: 'Cultural', incluyeVuelo: true, incluyeHotel: true, activo: true },
  { id: 'p3', nombre: 'Patagonia Salvaje', destino: 'Bariloche y El Calafate', descripcion: 'Aventura en la Patagonia argentina con trekking, glaciares y paisajes únicos.', precio: 320000, duracion: 8, cupos: 12, cuposDisponibles: 5, categoria: 'Aventura', incluyeVuelo: true, incluyeHotel: true, activo: true },
  { id: 'p4', nombre: 'Brasil Vibrante', destino: 'Río de Janeiro y Foz do Iguaçu', descripcion: 'Vive la energía de Río de Janeiro y la majestuosidad de las Cataratas del Iguazú.', precio: 480000, duracion: 10, cupos: 18, cuposDisponibles: 12, categoria: 'Naturaleza', incluyeVuelo: true, incluyeHotel: true, activo: true },
  { id: 'p5', nombre: 'Perú Ancestral', destino: 'Cusco, Machu Picchu y Lima', descripcion: 'Descubre la civilización inca y su impresionante legado arquitectónico y cultural.', precio: 620000, duracion: 9, cupos: 16, cuposDisponibles: 0, categoria: 'Cultural', incluyeVuelo: true, incluyeHotel: true, activo: true },
  { id: 'p6', nombre: 'Salta y el Norte', destino: 'Salta, Jujuy y Quebrada de Humahuaca', descripcion: 'Explora el noroeste argentino con sus paisajes de colores y riqueza cultural.', precio: 180000, duracion: 5, cupos: 20, cuposDisponibles: 15, categoria: 'Cultural', incluyeVuelo: false, incluyeHotel: true, activo: true },
  { id: 'p7', nombre: 'Caribe Express', destino: 'Punta Cana, RD', descripcion: 'Escapada corta al paraíso caribeño con all inclusive.', precio: 650000, duracion: 5, cupos: 25, cuposDisponibles: 0, categoria: 'Playa', incluyeVuelo: true, incluyeHotel: true, activo: false },
];

const SEED_RESERVAS = [
  { id: 'r1', clienteId: 'c1', paqueteId: 'p1', fechaReserva: '2024-05-10', fechaSalida: '2024-07-15', estado: 'confirmada', total: 850000, seña: 255000, notas: 'Solicita habitación con vista al mar' },
  { id: 'r2', clienteId: 'c2', paqueteId: 'p2', fechaReserva: '2024-05-12', fechaSalida: '2024-08-01', estado: 'confirmada', total: 3000000, seña: 900000, notas: 'Dos personas, habitación doble' },
  { id: 'r3', clienteId: 'c3', paqueteId: 'p3', fechaReserva: '2024-05-15', fechaSalida: '2024-06-20', estado: 'completada', total: 320000, seña: 96000, notas: '' },
  { id: 'r4', clienteId: 'c4', paqueteId: 'p4', fechaReserva: '2024-05-18', fechaSalida: '2024-07-05', estado: 'pendiente', total: 1920000, seña: 576000, notas: 'Familia con 2 niños' },
  { id: 'r5', clienteId: 'c5', paqueteId: 'p5', fechaReserva: '2024-05-20', fechaSalida: '2024-09-10', estado: 'confirmada', total: 620000, seña: 186000, notas: '' },
  { id: 'r6', clienteId: 'c6', paqueteId: 'p1', fechaReserva: '2024-05-22', fechaSalida: '2024-08-20', estado: 'pendiente', total: 850000, seña: 0, notas: 'Esperando confirmación de pago' },
  { id: 'r7', clienteId: 'c7', paqueteId: 'p6', fechaReserva: '2024-05-25', fechaSalida: '2024-06-15', estado: 'completada', total: 180000, seña: 54000, notas: '' },
  { id: 'r8', clienteId: 'c8', paqueteId: 'p2', fechaReserva: '2024-05-27', fechaSalida: '2024-09-01', estado: 'confirmada', total: 1500000, seña: 450000, notas: 'Solicita seguro de viaje' },
  { id: 'r9', clienteId: 'c9', paqueteId: 'p3', fechaReserva: '2024-05-28', fechaSalida: '2024-07-20', estado: 'cancelada', total: 320000, seña: 96000, notas: 'Canceló por motivos personales, reembolso pendiente' },
  { id: 'r10', clienteId: 'c1', paqueteId: 'p4', fechaReserva: '2024-05-29', fechaSalida: '2024-10-05', estado: 'pendiente', total: 480000, seña: 144000, notas: '' },
  { id: 'r11', clienteId: 'c2', paqueteId: 'p6', fechaReserva: '2024-05-29', fechaSalida: '2024-07-28', estado: 'confirmada', total: 360000, seña: 108000, notas: 'Segunda reserva del mes' },
];

const SEED_PROVEEDORES = [
  { id: 'pr1', nombre: 'Aerolíneas Argentinas', tipo: 'aerolinea', contacto: 'Juan Méndez', email: 'grupos@aerolineas.com.ar', telefono: '+54 11 4340-7777', pais: 'Argentina', notas: 'Tarifas especiales para grupos de +10 pax' },
  { id: 'pr2', nombre: 'Hotel Marriott Cancún', tipo: 'hotel', contacto: 'Rosa Herrera', email: 'grupos@marriottcancun.com', telefono: '+52 998 881-2000', pais: 'México', notas: 'Contrato anual vigente hasta dic 2024' },
  { id: 'pr3', nombre: 'LATAM Airlines', tipo: 'aerolinea', contacto: 'Pedro Castro', email: 'agencias@latam.com', telefono: '+56 2 565-8000', pais: 'Chile', notas: 'Mejores tarifas para rutas internacionales' },
  { id: 'pr4', nombre: 'Guías Patagonia Tours', tipo: 'guia', contacto: 'Ramiro Díaz', email: 'info@patagoniatours.com.ar', telefono: '+54 294 444-5678', pais: 'Argentina', notas: 'Guías certificados, bilingüe' },
  { id: 'pr5', nombre: 'TransAndes Bus', tipo: 'transporte', contacto: 'Nora Vidal', email: 'reservas@transandes.com', telefono: '+54 11 4567-3456', pais: 'Argentina', notas: 'Servicio de transfers aeropuerto' },
  { id: 'pr6', nombre: 'Inkaterra Hotels', tipo: 'hotel', contacto: 'Lucía Quispe', email: 'reservas@inkaterra.com', telefono: '+51 1 610-0400', pais: 'Perú', notas: 'Hoteles ecológicos en Cusco y Machu Picchu' },
];

const AdminDataContext = createContext(null);

function loadFromStorage(key, seed) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return seed;
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
}

export function AdminDataProvider({ children }) {
  const [clientes, setClientes] = useState(() => loadFromStorage('admin_clientes', SEED_CLIENTES));
  const [paquetes, setPaquetes] = useState(() => loadFromStorage('admin_paquetes', SEED_PAQUETES));
  const [reservas, setReservas] = useState(() => loadFromStorage('admin_reservas', SEED_RESERVAS));
  const [proveedores, setProveedores] = useState(() => loadFromStorage('admin_proveedores', SEED_PROVEEDORES));

  useEffect(() => { saveToStorage('admin_clientes', clientes); }, [clientes]);
  useEffect(() => { saveToStorage('admin_paquetes', paquetes); }, [paquetes]);
  useEffect(() => { saveToStorage('admin_reservas', reservas); }, [reservas]);
  useEffect(() => { saveToStorage('admin_proveedores', proveedores); }, [proveedores]);

  function genId(prefix) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  }

  // Clientes
  function addCliente(data) {
    const nuevo = { ...data, id: genId('c'), fechaCreacion: new Date().toISOString().slice(0, 10) };
    setClientes(prev => [...prev, nuevo]);
  }
  function updateCliente(id, data) {
    setClientes(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  }
  function deleteCliente(id) {
    setClientes(prev => prev.filter(c => c.id !== id));
  }

  // Paquetes
  function addPaquete(data) {
    const nuevo = { ...data, id: genId('p') };
    setPaquetes(prev => [...prev, nuevo]);
  }
  function updatePaquete(id, data) {
    setPaquetes(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }
  function deletePaquete(id) {
    setPaquetes(prev => prev.filter(p => p.id !== id));
  }

  // Reservas
  function addReserva(data) {
    const nueva = { ...data, id: genId('r'), fechaReserva: new Date().toISOString().slice(0, 10) };
    setReservas(prev => [...prev, nueva]);
  }
  function updateReserva(id, data) {
    setReservas(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  }
  function deleteReserva(id) {
    setReservas(prev => prev.filter(r => r.id !== id));
  }

  // Proveedores
  function addProveedor(data) {
    const nuevo = { ...data, id: genId('pr') };
    setProveedores(prev => [...prev, nuevo]);
  }
  function updateProveedor(id, data) {
    setProveedores(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }
  function deleteProveedor(id) {
    setProveedores(prev => prev.filter(p => p.id !== id));
  }

  return (
    <AdminDataContext.Provider value={{
      clientes, paquetes, reservas, proveedores,
      addCliente, updateCliente, deleteCliente,
      addPaquete, updatePaquete, deletePaquete,
      addReserva, updateReserva, deleteReserva,
      addProveedor, updateProveedor, deleteProveedor,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be used inside AdminDataProvider');
  return ctx;
}
