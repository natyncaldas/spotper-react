import {createStore} from 'redux'

const initialState = {
  //stateName: stateValue
}

const changeState = (state = initialState, {type, ...rest}) => {
  switch (type) {
    case 'set':
      return {...state, ...rest}
    default:
      return state
  }
}

//========for later usage on components========
/*
import {useDispatch, useSelector} from 'react-redux'

  const dispatch = useDispatch()
  const stateName = useSelector(state => state.stateName)

  const functionName = () => {
    let newStateValue = ""
    //(...)
    dispatch({type: 'set', stateName: newStateValue})
  }

*/ 

const store = createStore(changeState)
export default store
