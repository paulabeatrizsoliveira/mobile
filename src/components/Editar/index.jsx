import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from './api';

const Editar = ({ infoInicial, onSave }) => {
    const [infoEditada, setInfoEditada] = useState(infoInicial);
    const [editandoImagem, setEditandoImagem] = useState(false);
    const [novaURL, setNovaURL] = useState('');

    const editarInfo = (campo, valor) => {
        setInfoEditada({
            ...infoEditada,
            [campo]: valor,
        });
    };

    const salvar = async () => {
        try {
            await onSave(infoEditada);
            await api.put(`/put/${infoEditada.id}`, infoEditada);
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    };

    const confirmarNovaURL = () => {
        editarInfo('imagem', novaURL);
        setEditandoImagem(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={Styles.botao}
                onPress={() => setEditandoImagem(!editandoImagem)}
            >
                <Feather name="image" size={24} color="white" />
            </TouchableOpacity>

            {editandoImagem && (
                <View style={Styles.editarImagemContainer}>
                    <TextInput
                        style={Styles.inputEditar}
                        value={novaURL}
                        onChangeText={(texto) => setNovaURL(texto)}
                        placeholder="Insira a URL da nova imagem"
                    />
                    <TouchableOpacity
                        style={[Styles.botao, Styles.botaoSalvar]}
                        onPress={confirmarNovaURL}
                    >
                        <Feather name="check" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}

            <TextInput
                style={Styles.inputEditar}
                value={infoEditada.nome}
                onChangeText={(texto) => editarInfo('nome', texto)}
            />
            <TextInput
                style={Styles.inputEditar}
                value={infoEditada.descricao}
                onChangeText={(texto) => editarInfo('descricao', texto)}
            />
            <TextInput
                style={Styles.inputEditar}
                value={String(infoEditada.valor)}
                onChangeText={(texto) => editarInfo('valor', parseFloat(texto))}
                keyboardType="numeric"
            />
            <TouchableOpacity style={Styles.botao} onPress={salvar}>
                <Feather name="check" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default Editar

const Styles = StyleSheet.create({

    imagemProduto: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    inputEditar: {
        height: 40,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
        borderColor: '#38A69D',
        borderWidth: 1,
        borderRadius: 8,
    },
    botao: {
        backgroundColor: '#38A69D',
        padding: 10,
        borderRadius: 20,
    },
});