import React from 'react'
import { post } from 'axios';
import { connect } from  'react-redux';
import logoOk from '../img/logoOk.png';

class UploadAvatar extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:'',
      isUpload: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault()
    const url = 'http://localhost:8000/uploaddufichier'
    const formData = new FormData();
    formData.append('file',this.state.file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    post(url, formData, config).then((response)=>{
      console.log(response.data);
      //console.log(this.state.file.name);
      this.props.dispatch( 
        {
          type : "SEND_AVATAR",
          avatar : this.state.file.name,
        }
        
      )
      this.setState ({
        isUpload: true
      })
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  render() {
    return (
      <div className="upload-file">
        <p className="title-add-avatar">Ajoute ton avatar</p>
        <input type="file" name='file' className='avatar' onChange={this.onChange} id='avatar' />
        <button onClick={this.onFormSubmit}>Upload</button>
        {this.state.isUpload?
        <div className='okUser'>
        <div className='logo-ok'>
          <img src={logoOk} alt='logo Ok'/>
        </div>
        <p className="user-added">Fichier transféré avec succès</p>
      </div> : null}
      </div>
   )
  }
}

function  mapStateToProps(state) {
  return {
    avatar: state.avatar.avatar,
  }
};

export  default  connect(mapStateToProps)(UploadAvatar)
