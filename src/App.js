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
    display: 'block',
    wordBreak: 'break-all',
  },
  code: {
    display: 'block',
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = { 
      code: defaultPatch,
      result: "",   
      files: new Array(10).fill(""),
      output: "",
      activePanel: null,
      currentError: null,
      wrap: false
    }
  }

  componentDidMount() {  
    this.executeCode(this.state.code);
    this.selectView();
  }

  executeCode() {
    try {         
      let res = new Function('txt', `  
        var output = [];
        
        String.prototype.out = function(){
          output.push(this.toString());
        }

        function random(arr = txt) {
          return arr[Math.floor(Math.random()*arr.length)]
        }

        ` + this.state.code + `

        if (output) return output.join('\\r\\n\\r\\n');
      `).call(
        null, 
        this.state.files
      );
      
      this.setState({
        result: res
      });
    } catch (err) { 
      // console.log(err) 
      // output to ace editor
    }
  }
 
  handleChange = e => {    
    this.setState({code: e});
    this.executeCode();
    this.selectView();
  }

  handleFileChooser = e => {  
    for(let file of e.target.files){
      let fileReader = new FileReader();
      fileReader.onloadend = (f) => {
        this.setState(prev => ({
          files: [f.target.result]
        }))
      };
      fileReader.readAsText(file);
    } 
  }

  selectView = i => {
    if (i === undefined) {         
      this.setState(prev => ({
        ...prev,
        output: prev.result,
        activePanel: null,
      }));
    } else {
      this.setState(prev => ({
        ...prev,
        output: prev.files[i],
        activePanel: i
      }));
    }
  }

  handleExpand = e => {
    this.setState({expand: e})

    let code_display, output_display = "block";

    if (e === 1){
      code_display = "none";
      output_display = "block";
    } else if (e === 2) {
      code_display = "block";
      output_display = "none";
    }

    style = {
      ...style,
      code: {
        display: code_display,
      },
      output: {
        display: output_display,
      }
    }
  }

  handleWrap = () => {
    this.setState(prev=>({
      ...prev,
      wrap: !prev.wrap
    }));

    style = {
      ...style,
      output: {
        ...style.output,
        wordBreak: !this.state.wrap ? 'break-word' : 'break-all'
      }
    }
  }

  handleTextChange = e => {
    // console.log('hit',e.target.value)
    this.setState({
      files: this.state.files.map((item, index) =>
        index === this.state.activePanel ? e.target.value : item,
      ),
      output: e.target.value
    })
  }

  render() {
    let isPortrait = window.innerWidth < 600;

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
              name = "EDITOR"
              mode="javascript"
              theme="github"
              debounceChangePeriod={100}
              onChange={this.handleChange}              
              width="100%"
              height="100%" 
              value={this.state.code}             
              wrapEnabled={true}
              // placeholder={defaultPatch}
              fontSize="16px"
              commands = {
                [{ 
                  name: 'execute',
                  bindKey: {
                    win: 'Ctrl-Enter',
                    mac: 'Command-Enter'
                  },
                  exec: () => this.executeCode
                }]
              }
              />
          </div>
          <div id="CENTER">
            <div id="SELECTOR">
                <button 
                  onClick={()=>this.selectView()}
                  className={this.state.activePanel == null ? 'invert': ''}
                >*</button>
                {
                  this.state.files.map((f,i)=>{
                    return (
                      <button 
                        key={i}
                        onClick={()=>this.selectView(i)}
                        className={this.state.activePanel === i ? 'invert': ''}  
                      >{i}</button>
                    )
                  })
                }
            </div>

            <div id="TOOLS">
              <button 
                onClick={this.handleWrap}
                className={this.state.wrap ? 'invert': ''}  
              >{'w'}</button>
              <button 
                onClick={()=>this.handleExpand(0)}
              >{isPortrait ? '=' : '|'}</button>
              <button 
                onClick={()=>this.handleExpand(1)}
              >{isPortrait ? '^' : '<'}</button>
              <button 
                onClick={()=>this.handleExpand(2)}
              >{isPortrait ? 'v' : '>'}</button>              
            </div>
          </div>

          <textarea 
            id="OUTPUT" 
            readOnly={(this.state.activePanel !== null ? false : true)}
            style={style.output}
            value={this.state.output}
            onChange={this.handleTextChange}
          />

        </div>
      </div>
    );  
  }
}

export default App;
