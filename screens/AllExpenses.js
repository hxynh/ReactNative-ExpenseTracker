import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    return (
        <ExpensesOutput 
            expenses={expensesCtx.expenses} 
            expensesPeriod={'Total'}
            fallbackText="No expenses registered for at the moment"
        />
    )
}

const styles = StyleSheet.create({
    
})