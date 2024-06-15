class LocalStorage{
  static set(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  }

  static get(key){
    try{
      return (JSON.parse(localStorage.getItem(key)))
    }
    catch(err){
      return undefined
    }
  }

  static remove(key){
    localStorage.removeItem(key)
  }

  static empty(){
    localStorage.clear();
  }
}

export default LocalStorage