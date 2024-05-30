import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amout, date}) => {},
});

function expensesReducer(state, action){
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET': 
            const inverted = action.payload.reverse();
            return inverted;
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
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses})
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
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value} >{children}</ExpensesContext.Provider>
    )
}
