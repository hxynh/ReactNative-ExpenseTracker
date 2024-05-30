import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useState, useEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

export default function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expenseCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses)
            } catch (error) {
                setError('Failed to fetch expenses!')
            }
            setIsFetching(false);
        }
        getExpenses()
    }, []);

    function errorHandler() {
        setError(null);
    }

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo
    })

    if(isFetching) {
        return <LoadingOverlay />
    }
    if(error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }
    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod={'Last 7 days'}
            fallbackText="No expenses registered for the last 7 days"
        />
    )

}