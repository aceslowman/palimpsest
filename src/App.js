import React from 'react';
import './App.css';

import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

import './components/remix';

import defaultPatch from './components/default' 

let style = {
  output: {
    width: '50%'
  },
  code: {
    width: '50%'
  }
}

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

        function random(arr = txt) {
          console.log(arr)
          return arr[Math.floor(Math.random()*arr.length)]
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

  handleExpand = e => {
    this.setState({expand: e})

    let code_display = "block";
    let code_width = "50%";
    let output_display = "block";
    let output_width = "50%";

    if (e === '<'){
      code_display = "none";
      code_width = "0%";
      output_display = "block";
      output_width = "100%";
    } else if (e === '>') {
      code_display = "block";
      code_width = "100%";
      output_display = "none";
      output_width = "0%";
    }

    style = {
      ...style,
      code: {
        display: code_display,
        width: code_width
      },
      output: {
        display: output_display,
        width: output_width
      }
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
        </div>
        <div id="MAIN">
          <div id="CODE" style={style.code}>
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
          <div id="CENTER">
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

            <div id="TOOLS">
              <a 
                onClick={()=>this.handleExpand('|')}
                // className={this.state.expand === '|' ? 'invert' : ''}
              >{'|'}</a>
              <a 
                onClick={()=>this.handleExpand('<')}
                // className={this.state.expand === '<' ? 'invert' : ''}
              >{'<'}</a>
              <a 
                onClick={()=>this.handleExpand('>')}
                // className={this.state.expand === '>' ? 'invert' : ''}
              >{'>'}</a>              
            </div>
          </div>

          <div id="OUTPUT" style={style.output}>          
            {this.state.output}
          </div>
        </div>
      </div>
    );  
  }
}

export default App;
