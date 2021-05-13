import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'



class App extends React.Component {

 
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }

    
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  componentDidUpdate(){
    const tempData = [...this.state.items];
    localStorage.setItem('pin',JSON.stringify(tempData));
    //
  };

  componentDidMount(){

    const tempData = localStorage.getItem('pin');
    //console.log(`tempo ${tempData}`);
    const localData = JSON.parse(tempData);
    //console.log(localData);
    if(localData !== null)
    {
        this.setState({items:[...localData]});
    }
    //console.log(`item ${this.state.items}`);
    
  };

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map((item)=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }
  render(){

  return (
    <div className="main_div">
      <div className="center_div">
        <br />
        <h1><i className="fa fa-bars" aria-hidden="true"></i> Website todo</h1>

        <br />
      <p>{this.state.items.text}</p>
        
        <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>  

      <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="New task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">+</button>
        </form>
        
        
      </div>
    </div>
  );
 }
}


export default App;

