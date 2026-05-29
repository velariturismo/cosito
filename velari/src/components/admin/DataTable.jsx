import React, { useState } from 'react';
import { Search } from 'lucide-react';
import EmptyState from './EmptyState';

export default function DataTable({ columns, rows, searchPlaceholder = 'Buscar...', searchKeys = [], actions }) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? rows.filter(row =>
        searchKeys.some(key => {
          const val = row[key];
          return val && String(val).toLowerCase().includes(search.toLowerCase());
        })
      )
    : rows;

  return (
    <div>
      {searchKeys.length > 0 && (
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 text-left font-semibold">{col.label}</th>
              ))}
              {actions && <th className="px-4 py-3 text-right font-semibold">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)}>
                  <EmptyState title="Sin resultados" description="No se encontraron registros." />
                </td>
              </tr>
            ) : (
              filtered.map((row, idx) => (
                <tr key={row.id || idx} className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}>
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-gray-700">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {filtered.length > 0 && (
        <p className="text-xs text-gray-400 mt-2">{filtered.length} registro{filtered.length !== 1 ? 's' : ''}</p>
      )}
    </div>
  );
}
