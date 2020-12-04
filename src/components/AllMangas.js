import React from 'react'

import '../styles/AllMangas.css'

import { Link } from 'react-router-dom';

class AllMangas extends React.Component {

  state = {
    mangas: []
  }

  componentDidMount(){
    fetch('https://api.jikan.moe/v3/search/manga?q=&order_by=score&sort=desc&page=1')
    .then((data)=>{
      return data.json()
    })
    .then((dataJSON)=>{
      this.setState({mangas: dataJSON.results})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  renderMangas = ()=>{
    return this.state.mangas.map((manga, index)=>{
      return(
        <Link to={`/all-mangas/${manga.mal_id}`} key={index}>
          <div className="manga-container">
            <img src={manga.image_url} alt={manga.title}/>
            <div className="title-and-score">
              <h3>{manga.title}</h3>
              <p>{manga.score}</p>            
            </div>
          </div>
        </Link>
      )
    })
  }

  renderLoadingImage = ()=>{
    return <img src="https://i.pinimg.com/originals/5f/62/12/5f62121edecbe2adff3ff4207d8d3cd5.gif" alt="Loading"/>
  }

  render(){
    return(
      <div className="AllMangas">
        <h2>All Mangas</h2>
        <div className="all-mangas-container">
          {this.state.mangas.length === 0 ? this.renderLoadingImage() : this.renderMangas()}          
        </div>
      </div>
    )    
  }
}

export default AllMangas