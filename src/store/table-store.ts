// create zustand store
import { fetchTable, updateTable } from '@/services/tableService'
import { Table } from '@/types'
import { create } from 'zustand'

type TableStore = {
    tables: Table[],
    getTables: () => Table[],
    getTable: (id: string) => Promise<Table>,
    getTableByNumber: (tableNumber: string) => Promise<Table>,
    setTables: (tables: Table[]) => void,
    addTable: (Table: Table) => void,
    removeTable: (Table: Table) => void,
    updateTable: (Table: Table) => void
}

// create tables store
export const useTableStore = create<TableStore>((set, get) => ({
    tables: [],
    getTables: () => get().tables,
    getTable: async (id: string) => {
        const table = get().tables.find((table) => table._id === id);
        if(table) return table;
        const server_side_table = await fetchTable(id)
        return server_side_table;
    },
    setTables: (tables) => set({ tables }),
    getTableByNumber: async (tableNumber: string) => {
        const table = get().tables.find((table) => table.table_number === tableNumber);
        if(table) return table;
        return await fetchTable(tableNumber);
    },
    addTable: (table) => set((state) => ({ tables: [...state.tables, table] })),
    removeTable: (table) => set((state) => ({ tables: state.tables.filter((item) => item._id !== table._id) })),
    updateTable: async (Table) => {
        try {
            set((state) => ({ tables: state.tables.map((item) => (item._id === Table._id ? Table : item)) }))
            await updateTable(Table);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    }
}))