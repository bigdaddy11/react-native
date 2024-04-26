import React, {useState} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
  } from 'react-native';
import { Button } from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import { View } from 'react-native-web';

const PostWrite = () => {
    const {top} = useSafeAreaInsets();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    return (
    <SafeAreaView style={styles.block} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={Platform.select({ios: top + 60})}>
        <TouchableOpacity>
            <View style={styles.top}>
                <Text style={[styles.button]}>취소</Text>
                <Text style={[styles.button]}>등록</Text>
            </View>
            <View>
                <TextInput
                placeholder="제목"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                />
                <TextInput
                placeholder="내용"
                style={[styles.input, styles.body]}
                multiline
                numberOfLines={20}
                textAlignVertical="top"
                value={body}
                onChangeText={setBody}
                />
            </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 16,
      flexDirection: 'column',
    },
    keyboardAvoiding: {
      flex: 1,
    },
    input: {
      backgroundColor: 'white',
      fontSize: 14,
      lineHeight: 18,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 4,
    },
    body: {
      paddingTop: 12,
      paddingBottom: 12,
      marginTop: 16,
      flex: 4,
    },
    button: {
      fontSize: 14,
      paddingTop: 12,
      paddingBottom: 12,
      marginTop: 16,
    },
    top: {
        flexDirection: "row",
        width: "100%"
    }
});

export default PostWrite;