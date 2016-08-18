import * as types from '../constants/actions';
import mammoth from 'mammoth';
import Promise from 'bluebird';
import React from 'react';
const reader = new window.FileReader();

export function readFile(e) {
  return (dispatch) => {
    return readUploadedFile(e.target.files[0])
    .then(extractText)
    .then(extractLines)
    .then(createDictionary)
    .then((payload) => {
      dispatch({
        type: types.SET_CONTENTS,
        payload
      });
    });
  };
}

function readUploadedFile(file) {
  return new Promise((resolve) => {
    reader.onload = () => { resolve(reader.result); };
    reader.readAsArrayBuffer(file);
  });
}

function extractText(arrayBuffer) {
  return mammoth.extractRawText({ arrayBuffer });
}

function extractLines(result) {
  const text = result.value;
  return text
  .split('\n')
  .filter((line => !!line))
  .filter(line => /((([A-Z])([0-9])+)+(\/)*(([A-Z])*([0-9])+)*)/g.test(line))
  .map((line) => line.split(/((([A-Z])([0-9])+)+(\/)*(([A-Z])*([0-9])+)*)/g))
  .map((split) => {
    return {
      ref: split[1],
      text: split[split.length-1].split('/').map((passage) => passage.trim())
    };
  });

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

function createDictionary(lines) {
  const dictionary = {};
  const refs = {};
  const contents = [];

  lines.forEach((p) => {
    if(refs[p.ref]) {
      let index = Number(p.ref.substring(1));
      index = index + 1;
      p.ref = `S${index}`;
    }

    refs[p.ref] = true;
    contents.push(<p data-ref={p.ref} key={p.ref}>{`${p.text[0]} / ${p.text[1]}`}</p>);
    const words = getWords(p.text);
    console.log(words);
    words.forEach((w) => {
      dictionary[w] = dictionary[w] || [];
      dictionary[w].push(p.ref);
    });
  });

  return {
    dictionary,
    contents,
    lines
  };
}
