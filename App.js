import { useState } from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import GoalItem from './components/GoaIItem';
import GoalInput from './components/GoalInput';

export default function App() {
  // 모달의 렌더링 상태를 나타내는 변수
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [todoGoals, setTodoGoals] = useState([]);

  // 버튼을 누르면 할 일 목록을 추가하는 함수
  const addGoalHandler = (enteredGoalText) => {
    if (enteredGoalText === '') {
      alert('할일을 입력하세요!');
      return;
    }
    setTodoGoals((currentTodoGoals) => [
      ...currentTodoGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);

    endAddGoalHandler();
  };

  const deleteGoalHandler = (id) => {
    setTodoGoals((currentTodoGoals) => {
      return currentTodoGoals.filter((goal) => goal.id !== id);
    });
  };

  // 할 일 추가 모달을 띄워주는 함수
  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  // 모달 창 닫음
  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

  return (
    <>
      <StatusBar style='auto' />
      <View style={styles.appContainer}>
        <View>
          <Text style={styles.goalsTitle}>할 일 List</Text>
        </View>
        <Button
          title='할 일 추가하려면 누르세요!'
          color='#5e0acc'
          onPress={startAddGoalHandler}
        />
        {/* modalIsVisible && 를 직접 구현할 필요 없음. */}
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />

        <View style={styles.goalsContainer}>
          {/*
          ScrollView는 전체 화면이 렌더링 될 때 안에 항목들을 전부 렌더링 합니다.
          이로 인해 성능 상의 저하가 나타날 수 있습니다.
          (보이지 않는 영역까지 렌더링을 진행하기 때문에 목록이 많다면 로딩이 길어짐.)
          FlatList는 보이는 영역만 일단 렌더링을 진행하고, 나머지 항목들은
          스크롤 움직임이 발생하면 그때 그때 렌더링을 진행합니다.
      */}
          <FlatList
            data={todoGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDelete={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16, // 수평으로
    backgroundColor: '#FFF8DC',
  },
  goalsContainer: {
    flex: 4,
  },
  goalsTitle: {
    fontSize: 30,
    textAlign: 'center',
    color: 'orangered',
    marginBottom: 10,
    paddingBottom: 8,
    backgroundColor: '#FFF8DC',
  },
});
