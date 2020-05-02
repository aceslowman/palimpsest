import React from 'react';
import './App.css';

import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

import * as PALIMPSEST from './components/remix';

import defaultPatch from './components/default' 
import placeholder from './components/placeholder'

let style = {
  output: {
    display: 'block',
    wordBreak: 'break-all',
  },
  code: {
    display: 'block',
  },
  modal: {
    opacity: '0%',
  },
}

class App extends React.Component {
  constructor() {
    super();

    this.output = [];
    // localStorage.clear();

    this.state = JSON.parse(localStorage.getItem('palimpsest-state')) ?
      JSON.parse(localStorage.getItem('palimpsest-state')) :
      {
        code: defaultPatch,
        files: new Array(10).fill(""),
        output: "",
        activePanel: null,
        wrap: true
      };  
      
  }

  componentDidMount() { 
    this.executeCode();
    this.selectView();
  }

  executeCode() {    
    try {         
      let res = new Function('txt','pLib','output',`        
        output = [];

        pLib.Text.prototype.out = function () {
          output.push(this);
          return this;
        }
        
        String.prototype.out = function (element = 'p') {
          output.push(
            new pLib.Text(
              this.toString(),
              (element && element !== '') ? element : 'p'
            )
          );
        }

        Array.prototype.out = function(element = 'p'){
          for(let i = 0; i < this.length; i++) {
            let item = this[i];
            
            if(item){
              if (item.constructor.name === 'Text' && item !== null) {                
                output.push(item);
              } else {
                output.push(new pLib.Text(
                  item.toString(),
                  element
                ));
              }
            } 
          }  

          return output;
        } 

        function random(arr = txt) {
          return arr[Math.floor(Math.random()*arr.length)]
        }

        ` + this.state.code + `

        if (output) return output;
      `).call(null, this.state.files, PALIMPSEST, this.output);
      
      this.setState(prev => ({
        ...prev,
        output: res.map((e, i) => {
          if(e)
            return React.createElement(
              e.element, {
                key: i,
                style: e.style
              },
              e.text
            );
        })
      }));
    } catch (err) {
      console.error(err)
    }
  }

  restoreDefault = () => {
    // localStorage.clear();
    
    this.setState({
      code: defaultPatch,
      files: new Array(10).fill(""),
      output: "",
      activePanel: null,
      wrap: true
    });

    style.modal = {opacity: '100%'}
    this.setState({modal: "Default Restored!"})

    setTimeout(()=>{
      style.modal = {opacity: '0%'}
      this.setState({modal: "Default Restored!"})
    }, 3000);
  }
 
  handleChange = e => {    
    this.setState({code: e});
    this.executeCode();
    this.selectView();
  }

  handleFileChooser = e => {  
    this.setState({files: []});

    for(let file of e.target.files){
      let fileReader = new FileReader();
      fileReader.onloadend = f => {
        this.setState(prev=>({
          files: [...prev.files,f.target.result]
        }))
      };
      fileReader.readAsText(file);
    } 
  }

  selectView = i => { 
    this.setState(prev => ({
      ...prev,
      activeFile: (i === undefined) ? null : i,
      activePanel: (i === undefined) ? null : i,
    }));
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
    this.setState({
      files: this.state.files.map((item, index) =>
        index === this.state.activePanel ? e.target.value : item,
      ),      
    });
  }

  handleRandom = () => {
    // wget -w 2 -m -H "http://www.gutenberg.org/robot/harvest?filetypes[]=html"
    // let url = `https://openlibrary.org/api/books?bibkeys=ISBN:0451526538`;
    // let url = "https://www.folgerdigitaltexts.org/WT/text/";
    // fetch(url, {
    //   method: 'GET',
    //   // mode: 'no-cors',
    //   headers: {
    //     'Content-Type': "text/plain",
    //   }
    // }).then((res)=>{
    //   console.log(res.json().stringify())
    // })
  }

  handleClear = () => {
    this.setState(prev => ({
      ...prev,
      code: "",
      result: "",   
      files: new Array(10).fill(""),
      output: "",
      activePanel: null,
      currentError: null,
    }));
  }

  handleSave = () => {
    let stateClone = Object.assign({}, this.state);
    delete stateClone.output;
    localStorage.setItem('palimpsest-state', JSON.stringify(stateClone));

    style.modal = {opacity: '100%'}
    this.setState({modal: "Saved!"})

    setTimeout(()=>{
      style.modal = {opacity: '0%'}
      this.setState({modal: "Saved!"})
    }, 3000);
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
              placeholder={placeholder}
              fontSize="16px"
              commands = {
                [{ 
                  name: 'execute',
                  bindKey: {
                    win: 'Ctrl-Enter',
                    mac: 'Command-Enter'
                  },
                  exec: () => this.executeCode
                },
                {
                  name: 'restoredefault',
                  bindKey: {
                    win: 'Alt-R',
                    mac: 'Alt-R'
                  },
                  exec: () => this.restoreDefault()
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
                onClick={this.handleClear}
                title="clear all"                
              >{'clear'}</button>
              <button 
                onClick={this.handleSave}
                title="save all"                
              >{'save'}</button>
              {/* <button 
                onClick={this.handleRandom}                
              >{'r'}</button> */}
              <button 
                onClick={this.handleWrap}
                className={this.state.wrap ? 'invert': ''}  
                title="toggle break"
              >{'wrap'}</button>
              <button 
                onClick={()=>this.handleExpand(0)}
                title="split"
              >{isPortrait ? '=' : '|'}</button>
              <button 
                onClick={()=>this.handleExpand(1)}
                title="expand output"
              >{isPortrait ? '^' : '<'}</button>
              <button 
                onClick={()=>this.handleExpand(2)}
                title="expand code"
              >{isPortrait ? 'v' : '>'}</button>              
            </div>
          </div>

          <div id="OUTPUT" style={style.output}>
            {this.state.activePanel !== null && 
              <textarea               
                value={this.state.files[this.state.activeFile]}
                onChange={this.handleTextChange}
              />
            }
            { this.state.activePanel === null && (<div>{this.state.output}</div>) }
          </div>
        </div>
        <div id="MODAL" style={style.modal}>
          {this.state.modal}
        </div>
      </div>
    );  
  }
}

export default App;
