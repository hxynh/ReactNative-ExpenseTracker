import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
    const expenseCtx = useContext(ExpensesContext);

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo
    })

    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod={'Last 7 days'}
            fallbackText="No expenses registered for the last 7 days"
        />
    )
}