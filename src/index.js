import CodeManager from './codeManager'
import EditorManager from './editorManager'

class TutorialMarkdown {

  constructor(options) {

    this.currentStep = 0

    // Options
    let fakeOptions = {
      editor: options.editor, //{monaco editor, created and on the document}
      markdownSelector: {
        blockSelector: '.tmd', // Selector for code blocks in the tutorial
        codeSelector: '.highlight' // Selector for the code WITHIN the block
      },
      triggerPosition: 0.5, // position on screen for code to trigger.
      iframe: options.executionWindow,
    }

    this.scheduled = false
    this.currentStep = -1

    // this.editorManager = new EditorManager(options);
    // -- Used to send code to the editor
    // -- Used to erase code from the editor

    this.codeManager = new CodeManager(fakeOptions.markdownSelector)
    this.editorManager = new EditorManager(fakeOptions)

    this.throttleScroll = this.throttleScroll.bind(this)
    this.create()
  }

  throttleScroll() {
    if (!this.scheduled) {
      this.scheduled = true
      window.requestAnimationFrame(() => {
        this.scheduled = false
        this.onScroll()
      })
    }
  }

  onScroll(){
    const step = this.codeManager.getStep()
    if( step > this.currentStep ) {
      this.addCode(step)
    }
    
  }

  addCode(step) {
    // Editor ADD
    // Iframe ADD
    return step // Remove
  }

  create() {
    window.addEventListener('scroll', this.throttleScroll)
  }

  destroy() {
    window.removeEventListener('scroll', this.throttleScroll)
  }
}

export default TutorialMarkdown


// // (function() {

//   // Editor variables
//   var frame = document.querySelector('iframe');
//   var editor;

//   // Code variables
//   var contentElement = document.querySelector('.content');
//   var triggers, blocks, structure, sendItButton, fullCodeSets;
//   var currentStep = -1;
//   var hasTyped = false;

//   function setup() {
//     setupCode();
//   }

//   function setupCode() {
//     require.config({ paths: { 'vs': '/js/libs/monaco-editor/vs' }});
//     require(['vs/editor/editor.main'], function() {
//       editor = monaco.editor.create(document.getElementById('code-area'), {
//         value: [
//           '// Welcome to Tutorial Markdown.',
//           '// start scrolling, and we\'ll',
//           '// write the code.'
//         ].join('\n'),
//         lineNumbersMinChars: 3,
//         scrollBeyondLastLine: false,
//         language: 'javascript',
//         fontSize: 10,
//         minimap: {
//           enabled: false
//         },
//         hover: false,
//         occurrencesHighlight: false
//       });

//       editor.onKeyDown(function(e) {
//         hasTyped = true;
//       })

//       editor.getModel().updateOptions({ tabSize: 2 })

//       setupTutorial();
//     });

//     bind();
//   }

//   function onContentScroll(e) {

//     var hitSteps = -1;

//     for( var i = 0; i < triggers.length; i++) {
//       var dimensions = triggers[i].getBoundingClientRect();
//       var headerHeight = 65; // todo, not put here.

//       if( dimensions.y + dimensions.height/3 < ((window.innerHeight - headerHeight) / 2 + headerHeight)) {
        
//         if( i === currentStep + 1 ) {
//           currentStep = i;
//           onCodeAdd(i);
//         }

//         hitSteps = i;
//       }
//     }

//     if( hitSteps === currentStep - 1) {
//       currentStep = currentStep - 1;
//       onCodeRemove(currentStep + 1);
//       sendCode(currentStep);
//     }
//   }

//   function onCodeRemove(step) {
//     var range = new monaco.Range(0, 1, 999, 1);
//     var id = { major: 1, minor: 1 };           
//     var op = {identifier: id, range: range, text: fullCodeSets[step - 1], forceMoveMarkers: true};
//     editor.executeEdits(fullCodeSets[step - 1], [op]);
//     hasTyped = false;
//   }

//   function onCodeAdd(step) {

//     if( hasTyped === true ) {
//       onCodeRemove(step);
//     }

//     // Positioning the instructions
//     var instructions = structure[step];

//     var range = new monaco.Range(instructions.from, 1, instructions.to, 1);
//     var id = { major: 1, minor: 1 };           
//     var op = {identifier: id, range: range, text: instructions.code, forceMoveMarkers: true};
//     editor.executeEdits(instructions.code, [op]);

//     editor.revealLines(instructions.from, instructions.from + instructions.lines);
//     sendCode();
//     saveCode(step);
//   }

//   function onCodeReverse(step) {
//     console.log("remove!");
//   }

//   function sendCode() {
//     var value = editor.getValue()
    
//     frame.contentWindow.postMessage(value, "*")
//   }

//   function saveCode(step) {

//     // Only save these ones per each step.
//     if( !fullCodeSets[step] ) {
//       fullCodeSets[step] = editor.getValue();
//     }

//   }

//   function bind() {}

//   setup();

// // })();
