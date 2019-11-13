import React, {
    createContext, useState, Dispatch, SetStateAction,
} from 'react';

const initialState: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>} = {
    open: false,
    setOpen: () => {},
};

export const AdminDrawerContext = createContext(initialState);

interface AdminDrawerProps {
    children: any
}

export default function AdminDrawerProvider({ children }: AdminDrawerProps) {
    const [open, setOpen] = useState(false);
    return (
        <AdminDrawerContext.Provider value={{ open, setOpen }}>
            {children}
        </AdminDrawerContext.Provider>
    );
}
