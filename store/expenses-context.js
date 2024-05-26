import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of joggers',
        amount: 25.99,
        date: new Date('2024-05-11')
    },
    {
        id: 'e3',
        description: 'A book',
        amount: 14.50,
        date: new Date('2024-05-23')
    },
    {
        id: 'e4',
        description: 'A laptop',
        amount: 1547.00,
        date: new Date('2024-05-25')
    },
    {
        id: 'e5',
        description: 'A jacket',
        amount: 69.99,
        date: new Date('2023-12-01')
    },
    {
        id: 'e6',
        description: 'A book',
        amount: 14.50,
        date: new Date('2021-10-09')
    },
    {
        id: 'e7',
        description: 'A laptop',
        amount: 1547.00,
        date: new Date('2022-03-05')
    },
    {
        id: 'e8',
        description: 'A jacket',
        amount: 69.99,
        date: new Date('2023-12-01')
    },
    {
        id: 'e9',
        description: 'A book',
        amount: 14.50,
        date: new Date('2021-10-09')
    },
    {
        id: 'e10',
        description: 'A laptop',
        amount: 1547.00,
        date: new Date('2022-03-05')
    },
    {
        id: 'e11',
        description: 'A jacket',
        amount: 69.99,
        date: new Date('2023-12-01')
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amout, date}) => {},
});

function expensesReducer(state, action){
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{id: id, ...action.payload}, ...state];
        case 'UPDATE':
            const expenseIndexToUpdate = state.findIndex((expense) => expense.id === action.payload.id);
            const expenseToUpdate = state[expenseIndexToUpdate];
            const updatedItem = {...expenseToUpdate, ...action.payload.data};
            const updatedList = [...state];
            updatedList[expenseIndexToUpdate] = updatedItem;
            return updatedList;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

export default function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData} });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value} >{children}</ExpensesContext.Provider>
    )
}
