// create zustand store
import { Table } from '@/types'
import { create } from 'zustand'

type TableStore = {
    tables: Table[],
    getTables: () => Table[],
    getTable: (id: string) => Table | undefined,
    setTables: (tables: Table[]) => void,
    addTable: (Table: Table) => void,
    removeTable: (Table: Table) => void,
    updateTable: (Table: Table) => void
}

// create tables store
export const useTableStore = create<TableStore>((set, get) => ({
    tables: [],
    getTables: () => get().tables,
    getTable: (id: string) => get().tables.find((table) => table._id === id),
    setTables: (tables) => set({ tables }),
    addTable: (table) => set((state) => ({ tables: [...state.tables, table] })),
    removeTable: (table) => set((state) => ({ tables: state.tables.filter((item) => item._id !== table._id) })),
    updateTable: (table) => set((state) => ({ tables: state.tables.map((item) => (item._id === table._id ? table : item)) }))
}))