import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const createTodoList = todoList => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
  //   const { profile } = getState().firebase;
  //   const authorId = getState().firebase.auth.uid;
    fireStore.collection('todoLists').add({
      ...todoList,
    }).then(() => dispatch({
      type: 'CREATE_TODO_LIST',
      todoList,
    })).catch(err => dispatch({
      type: 'CREATE_TODO_LIST_ERROR',
      err,
    }));
  
};

export const editName = (todoList, newName) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  //console.log(todoList.name);
  firestore.collection('todoLists').doc(todoList.id).update({
    ...todoList,
    name: newName,
  });
  //console.log(todoList.name);

};

export const editOwner = (todoList, newOwner) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('todoLists').doc(todoList.id).update({
    ...todoList,
    owner: newOwner,
  });
};