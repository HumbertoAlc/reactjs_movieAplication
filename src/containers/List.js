import React , {Fragment} from 'react'

import Card from '../components/Card/Card'

console.log(process.env.API)
const API = process.env.API;

class List extends React.Component{


    constructor(){
        super();
        this.state = {
          data: [],
          serchTerm: "",
          error: "",
          loading: true
        };
    }

    async componentDidMount(){
      // const res = await fetch('../../assets/data.json')

       const res = await fetch(`${API}&s=batman`)
       const resJSON = await res.json()
       console.log(resJSON)
       this.setState({data:resJSON.Search,loading:false})
       
    }

    async handleSubmit(e){
e.preventDefault();
if(!this.state.serchTerm){
    return this.setState({error:'please write a valid text'})
}
  const res = await fetch(`${API}&s=${this.state.serchTerm}`)
  const data = await res.json();
  
  if(!data.Search){
      return this.setState({error: 'there are no results'})
  }

  this.setState({data: data.Search, error: '', serchTerm: ''})

    }

    render (){


        const {data,loading}= this.state;
            if (loading){
              return <h1 className="text-light">Loading...</h1>
            }



        return (
          <Fragment>
            <div className="row">
              <div className="col-md-4 offset-md-4 p-4">
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange = {e=>this.setState({serchTerm:e.target.value})}
                    value= {this.state.serchTerm}
                    autoFocus
                  />
                </form>
        <p className="text-white">{this.state.error?this.state.error:''}</p>
              </div>
            </div>

            <div className="row">
              {data.map((movie,i) => {
                return <Card movie={movie} key= {i}/>;
              })}
            </div>
          </Fragment>
        );
    }
}

export default List