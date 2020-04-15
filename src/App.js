import React from 'react';
import './App.css';

import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

import './components/remix';

import defaultPatch from './components/default' 

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      output: "",   
      code: defaultPatch,
      result: "",   
      files: [],
      activePanel: null
    }
  }

  componentDidMount() {  
    this.executeCode(this.state.code);
    this.selectView();
  }

  executeCode(code) {
    try {         
      let res = new Function('txt', `  
        var output = [];
        
        String.prototype.out = function(){
          output.push(this.toString());
        }

        ` + code + `

        if (output) return output.join('\\r\\n\\r\\n');
      `).call(
        null, 
        this.state.files.map(f => f.content)
      );
      
      this.setState({
        result: res
      });
    } catch (err) { 
      // console.log(err) 
    }
  }

  handleChange = e => {    
    this.setState({code: e});
    this.executeCode(e);
    this.selectView();
  }

  handleFileChooser = e => {  
    for(let file of e.target.files){
      let fileReader = new FileReader();
      fileReader.onloadend = (f) => {
        // console.log('fin',f.target.name)

        this.setState(prev => ({
          files: [...prev.files, {
            name: f.target.name,
            content: f.target.result
          }]
        }))

        // console.log(this.state.files)
      };
      fileReader.name = file.name;
      fileReader.readAsText(file);
    } 
  }

  selectView = i => {
    if (i === undefined) {   
      // console.log('showing main output')   
      this.setState(prev => ({
        ...prev,
        output: prev.result,
        activePanel: null,
      }));
    } else {
      // console.log('showing ' + i + " output")
      this.setState(prev => ({
        ...prev,
        output: prev.files[i].content,
        activePanel: i
      }));
    }
  }

  render() {
    return (
      <div id="APP">
        <div id="TOOLBAR">
          <h1>palimpsest</h1>
          <input 
            type="file" 
            onChange={this.handleFileChooser}
            multiple
          />
          {/* <button onClick={()=>{}}>invert colors</button> */}
        </div>
        <div id="MAIN">
          <div id="CODE">
            <AceEditor
              mode="javascript"
              theme="github"
              onChange={this.handleChange}              
              width="100%"
              height="100%" 
              value={this.state.code}             
              wrapEnabled={true}
              name="EDITOR"
              placeholder={defaultPatch}
              fontSize="16px"
            />
          </div>
          <div id="SELECTOR">

              <a 
                onClick={()=>this.selectView()}
                className={this.state.activePanel == null ? 'invert': ''}
              >*</a>
              {
                this.state.files.map((f,i)=>{
                  return (
                    <a 
                      key={i}
                      onClick={()=>this.selectView(i)}
                      className={this.state.activePanel === i ? 'invert': ''}  
                    >{i}</a>
                  )
                })
              }

          </div>
          <div id="OUTPUT">          
            {this.state.output}
          </div>
        </div>
      </div>
    );  
  }
}

export default App;
