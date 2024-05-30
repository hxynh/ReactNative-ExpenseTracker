import { useContext, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId; //converting to boolean value
    const expenseCtx = useContext(ExpensesContext);

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })

    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId)
            navigation.goBack();
        } catch (error) {
            setError('Failed to delete expense!')
            setIsSubmitting(false)
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function errorHandler() {
        setError(null);
    }

    async function confirmHandler(expenseData) {
        try {
            if (isEditing) {
                setIsSubmitting(true)
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData)
            } else {
                setIsSubmitting(true)
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({id: id, ...expenseData});
            }
            navigation.goBack();
        } catch (error) {
            setError('Failed to save data!')
            setIsSubmitting(false)
        }
    }

    if(isSubmitting) {
        return <LoadingOverlay />
    }
    if(error && !isSubmitting)  {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }
    return (
        <View style={styles.container}>
            <ExpenseForm 
                onCancel={cancelHandler} 
                onSubmit={confirmHandler} 
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            
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
    
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',

    },

})