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
  }
}

function readUploadedFile(file) {
  return new Promise((resolve) => {
    reader.onload = () => { resolve(reader.result) };
    reader.readAsArrayBuffer(file);
  });
}

function extractText(arrayBuffer) {
  return mammoth.extractRawText({ arrayBuffer });
}

function extractLines(result) {
  const text = result.value;
  const dictionary = {};
  const refs = {};
  const content = [];
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
    contents.push(<p key={p.ref}>{p.text}</p>)
    const words = p.text[0].split(' ').concat(p.text[1].split(' '));
    words.forEach((w) => {
      dictionary[w] = dictionary[w] || [];
      dictionary[w].push(p.ref);
    });
  });

  return {
    dictionary,
    contents,
    lines
  }
}
