import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT, START_LOADING } from '../types';
import {LOGIN_URL} from '../urls';

//start login of user
export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });
    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `username=${username}&password=${password}`
      }).then((JSONresponse) => {
        JSONresponse.json().then((response)=>{
          if(JSONresponse.ok){
            loginUserSuccess(dispatch, {user:{name:username,token:response.token}});
          }
          else{
            loginUserFail(dispatch);
          }
        });
      })
      .catch(function (error) {
        loginUserFail(dispatch);
      });
  };
};

//start logout of user
export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_LOGOUT });
    //removeTokenFromAsyncStorage();
  }
};


//functions used by actions

//on failed login
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_FAIL });
};

//on success login
const loginUserSuccess = (dispatch, user) => {
  dispatch({
      type: LOGIN_SUCCESS,
      payload: user
  });
  dispatch({
      type: START_LOADING,
  });
  //storeTokenToAsyncStorage(user.token);
  //Actions.taskList();
};
/*
export const storeTokenToAsyncStorage = (token) =>
  AsyncStorage.setItem('lansystem-v1-token',token);

export const removeTokenFromAsyncStorage = () =>
  AsyncStorage.multiRemove(['lansystem-v1-token']);*/
