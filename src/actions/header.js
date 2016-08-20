import * as types from '../constants/actions';
import mammoth from 'mammoth';
import Promise from 'bluebird';
import React from 'react';
import Dictionary from '../utils/dictionary';
const reader = new window.FileReader();

export function readFile(e) {
  return (dispatch) => {
    return readUploadedFile(e.target.files[0])
    .then(extractText)
    .then(extractLines)
    .then(createDictionary)
    .then((payload) => {
      dispatch({
        type: types.SET_FILE,
        payload
      });

      dispatch({
        type: types.SET_CONTENTS,
        payload
      });
    });
  };
}

function readUploadedFile(f) {
  return new Promise((resolve) => {
    const file = f.name;
    reader.onload = () => { resolve({ arrayBuffer: reader.result, file }); };
    reader.readAsArrayBuffer(f);
  });
}

function extractText({ arrayBuffer, file }) {
  return mammoth.extractRawText({ arrayBuffer })
  .then((result) => ({ result, file }));
}

function extractLines({ result, file }) {
  return {
  lines: result.value
  .split('\n')
  .filter((line => !!line))
  .filter(line => /((([A-Z])([0-9])+)+(\/)*(([A-Z])*([0-9])+)*)/g.test(line))
  .map((line) => line.split(/((([A-Z])([0-9])+)+(\/)*(([A-Z])*([0-9])+)*)/g))
  .map((split) => ({
      ref: split[1],
      text: split[split.length-1].split('/').map((passage) => passage.trim())
    })),
  file
  }

}

function getWords(line) {
  return line
  .map(fixSpaces)
  .map(fixExtensions)
  .map(fixCapitalization)
  .map((l) => l.split(' '))
  .reduce((prev, next) =>  [...prev, ...next]);
}

function fixSpaces(text) {
  return text.split(' ')
  .map((w) => w.trim())
  .filter((w) => !!w.length)
  .join(' ');
}

function fixExtensions(text) {
  return text.replace(' -', '-').replace('.', '');
}

function fixCapitalization(text) {
  return (text.substring(0,1).toLowerCase() + text.substring(1));
}

function createDictionary({ lines, file }) {
  let dictionary;
  const refs = {};
  const contents = [];
  const dict = {};
  let words = [];

  lines.forEach((p) => {
    if(refs[p.ref]) {
      let index = Number(p.ref.substring(1));
      index = index + 1;
      p.ref = `S${index}`;
    }

    refs[p.ref] = true;
    contents.push(<p data-ref={p.ref} key={p.ref}>{`${p.text[0]} / ${p.text[1]}`}</p>);
    const newWords = getWords(p.text);
    words = [...words, ...newWords];
    newWords.forEach((w) => {
      dict[w] = dict[w] || [];
      dict[w].push(p.ref);
    });
  });
  dictionary = Dictionary.generate(words, dict);
  window.dictionary = dictionary;

  return {
    file,
    dictionary,
    contents,
    lines
  };
}
