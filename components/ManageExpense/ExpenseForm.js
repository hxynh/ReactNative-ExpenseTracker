import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '', 
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });


    //enteredValue parameter is provided by reactive native so we dont have to pass the value
    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs, 
                [inputIdentifier]: {
                    value: enteredValue, 
                    isValid: true
                }
            }
        })
    }

    function submitHandler () {
        const expenseData ={
            amount: +inputs.amount.value, //+ converts to number
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        console.log('date ', expenseData.date.toString())
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currentInputs) => {
                return {
                    amount: {value: currentInputs.amount.value, isValid: amountIsValid},
                    date: {value: currentInputs.date.value, isValid: dateIsValid},
                    description: {value: currentInputs.description.value, isValid: descriptionIsValid}

                }
            })
            //Alert.alert('Invalid input. Please check your entries');
            return;
        }
        onSubmit(expenseData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    label='Amount' 
                    textInputConfig={{
                        keyboardType: 'decimal-pad', 
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                    }}
                />
                <Input 
                    style={styles.rowInput}
                    label='Date' 
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD', 
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value,
                    }}                
                />
            </View>
            <Input 
                label='Description'
                textInputConfig={{
                    multiline: true,
                    autoCapitalize: 'sentences',
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value,
                }} 
            />
            {formIsInvalid && 
                <Text style={styles.errorText}>
                    {`${!inputs.amount.isValid ? 'Amount' : 
                        !inputs.date.isValid ? 'Date' : 
                        'Description'} is invalid, please enter a different value`
                    }
                </Text>}
            
            <View style={styles.buttonsContainer}>
                <Button 
                    mode="flat" 
                    onPress={onCancel} 
                    style={styles.button}
                >Cancel</Button>
                <Button 
                    onPress={submitHandler}
                    style={styles.button}
                >{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    form: {
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        marginVertical: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    }
})