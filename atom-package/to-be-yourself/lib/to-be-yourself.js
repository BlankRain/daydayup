'use babel';

import ToBeYourselfView from './to-be-yourself-view';
import { CompositeDisposable } from 'atom';

export default {

  toBeYourselfView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.toBeYourselfView = new ToBeYourselfView(state.toBeYourselfViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.toBeYourselfView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'to-be-yourself:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.toBeYourselfView.destroy();
  },

  serialize() {
    return {
      toBeYourselfViewState: this.toBeYourselfView.serialize()
    };
  },

  toggle() {
    console.log('ToBeYourself was toggled!');
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.selectLinesContainingCursors()
      let selection = editor.getSelectedText()
      let reversed = this.beyourself(selection)
      editor.insertText(reversed)
    }
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

  , beyourself(text) {
    var x;
    if(text.indexOf(':TODO') !== -1){
      x=text.replace(/:TODO/,":DONE")
    }
    if(text.indexOf(':DONE') !== -1){
      x=text.replace(/:DONE/,":TODO")
    }
    return x;
  }

};
