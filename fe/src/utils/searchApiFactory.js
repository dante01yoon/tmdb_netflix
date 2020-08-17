const checkListHasItem = (list, value) => {
  return list.includes(value);
}

const getIndexOfItem = (list, value) => {
  return list.indexOf(list, value); 
}

const getAlignedArray = (list, index) => {
  return [ ...list.slice(0,index), ...list.slice(index+1, list.length -1)]
  
}
const removeFirstItemAndPush = (list, value) => {
  list.shift();
  list.push(value);
  return list;
}
const alignArrayWithValue = (list, value) => {
  if(checkListHasItem(list,value)){
    const newArray = getAlignedArray(list, getIndexOfItem(list,value));
    newArray.push(value);
    return newArray; 
  }
  if(list.length < 5){
    list.push(value)
    return list    
  }
  return removeFirstItemAndPush();
}

const searchApiFactory = ({state, setState}) => {
  const search = state.search; 
  const setSearch = (searchValue) => {
    setState(prevState => ({
      ...prevState,
      search: searchValue
    }))
  }
  const setHistory = () => {
    setState(prevState => ({
      ...prevState,
      history: alignArrayWithValue(prevState.history, prevState.search)
    }))
  }
  
  return {
    search, 
    setSearch,
    setHistory, 
  }
}

export default searchApiFactory;