import { useContext, useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/expenses-context";

export default function ManageExpense({ route, navigation }) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId; //converting to boolean value
    const expenseCtx = useContext(ExpensesContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })

    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expenseCtx.updateExpense(
                editedExpenseId,
                {
                    description: 'Testing!', 
                    amount: 9.99, 
                    date: new Date('2023-09-08')
                }
            );
        } else {
            expenseCtx.addExpense(
                {
                    description: 'Test', 
                    amount: 9.99, 
                    date: new Date('2023-09-08')
                }
            );
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button 
                    mode="flat" 
                    onPress={cancelHandler} 
                    style={styles.button}
                >Cancel</Button>
                <Button 
                    onPress={confirmHandler}
                    style={styles.button}
                >{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            {isEditing && 
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyles.colors.error500} 
                        size={36} onPress={deleteExpenseHandler}
                    />
                </View>
            }
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',

    },

})