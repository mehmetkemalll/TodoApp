import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';

export const App = () => {

    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Çöpler atılacak',
            isDone: false
        },
        {
            id: 2,
            name: 'Alışveriş yapılacak',
            isDone: false
        }
    ]);

    const onDone = useCallback((item) => {
        setItems(_items => {
            return _items.map(s => {
                if (s.id === item.id) {
                    return { ...s, isDone: true }
                }
                return s;
            })
        })
    }, []);

    const [todoText, setTodoText] = useState(null);

    const onAdd = useCallback(() => {
        if (todoText) {
            setItems(_items => [..._items, { id: _items[_items.length - 1].id++, name: todoText, isDone: false }]);
            setTodoText('');
        }
    }, [todoText,setTodoText])

    return <View style={styles.root}>
        <Text style={styles.todoTitle} >Yapılacaklar              {items.filter(s => !s.isDone).length}</Text>
        <View style={styles.todoList}>
            <FlatList keyExtractor={(item,index) => index.toString()} data={items} renderItem={({ item }) => {
                return <TouchableOpacity activeOpacity={0.8} onPress={() => onDone(item)}>
                    <Text style={[
                        styles.todoItem,
                        item.isDone ? styles.todoItemDone : {}
                    ]}>{item.name}</Text>
                </TouchableOpacity>
            }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TextInput value={todoText} onChangeText={setTodoText} placeholder="Yapılacak adı" />
            <Button title='Ekle' onPress={onAdd} />
        </View>
    </View>
}

export default App;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 16,
        backgroundColor: '#607D8B',  
    },
    todoTitle: {
        fontSize: 25,
        fontStyle: 'bold',
        color: 'orange',
        fontSize: 40,
    },
    todoList: {
        marginTop: 16,
        lineHeight: 20,
    },
    todoItem: {
        fontSize: 16,
        lineHeight: 35,
        color: 'yellow'
    },
    todoItemDone: {
        textDecorationLine: 'line-through'
    },
})