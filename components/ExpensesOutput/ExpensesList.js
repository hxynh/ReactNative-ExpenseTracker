import { FlatList, StyleSheet, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";


function renderExpenseItem(itemData) {
    return (
        <ExpenseItem {...itemData.item} />
    )
}

export default function ExpensesList({ expenses }) {

    return (
        <FlatList 
            data={expenses} 
            keyExtractor={item => item.id} 
            renderItem={renderExpenseItem}
        />
    )
}

const styles = StyleSheet.create({

})