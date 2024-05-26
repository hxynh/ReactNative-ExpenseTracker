import { StyleSheet, View } from "react-native"
import ExpenseSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"

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
        date: new Date('2020-02-11')
    },
    {
        id: 'e3',
        description: 'A book',
        amount: 14.50,
        date: new Date('2021-10-09')
    },
    {
        id: 'e4',
        description: 'A laptop',
        amount: 1547.00,
        date: new Date('2022-03-05')
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

export default function ExpensesOutput({expenses, expensesPeriod}) {
    return (
        <View style={styles.container}>
            <ExpenseSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,

    },

})