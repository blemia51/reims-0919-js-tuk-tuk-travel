import React, { Component } from "react"
import Moment from 'react-moment';
import '../App.css'
import NavFooter from "./NavFooter";
import { connect } from  'react-redux';

class TravelCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      travels:[]
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/travels',
    {
      method:'GET',
      headers:{
        'Authorization':  'Bearer '  +  this.props.token,
        'Content-Type':  'application/json'
      }
    })

    .then(res => {
      if(!res.ok) {
        this.props.history.push('/userconnexion')
      }
      return res.json()
    })
    .then(data => {
      this.setState({
        travels: data
    })
  })
  .catch()
  }

  render() {
    return (
      <div className='travel-cards'>
        <div className='title-travel-cards'>Voyages</div>
        <figure className='fig-img-travel-cards'>
          <img className='img-travel-cards' alt ='New York' src ='http://img.over-blog-kiwi.com/0/26/98/15/20161012/ob_dc8aae_ny-2014.jpg'></img> 
        </figure>  
        {this.state.travels.map(res =>{
          return <div key={res.travelID} className='liste-travel' >
            <ul>
              <li>Destination: {res.destination}</li>
              <li>Depart: <Moment format="DD/MM/YYYY">{res.start_date}</Moment></li>
              <li>Retour: <Moment format="DD/MM/YYYY">{res.end_date}</Moment></li>
              <li>Nombre de voyageurs: {res.number_of_travelers_max}</li>
              <li>Description: {res.description}</li>
            </ul>
              </div>})}
              <NavFooter/>
      </div>
    )
  }
}

function  mapStateToProps(state) {
  return {
      token:  state.auth.token,
  }
}
export default connect(mapStateToProps)(TravelCards)
