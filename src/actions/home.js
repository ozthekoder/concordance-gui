import * as types from '../constants/actions';
import mammoth from 'mammoth';
import Promise from 'bluebird';
import React from 'react';

export function readFile(e) {
  return (dispatch) => {
    return new Promise((resolve) => {
      const reader = new window.FileReader();
      reader.onload = () => {
        resolve({ arrayBuffer: reader.result});
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    })
    .then(mammoth.extractRawText)
    .then((result) => {
      console.log(result.value);
      const text = result.value;
      const dictionary = {};
      const refs = {};
      const content = [];
      const lines = text
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

      lines.forEach((p) => {
        if(refs[p.ref]) {
          let index = Number(p.ref.substring(1));
          index = index + 1;
          p.ref = `S${index}`;
        }

        refs[p.ref] = true;
        content.push(<p key={p.ref}>{p.text}</p>)
        const words = p.text[0].split(' ').concat(p.text[1].split(' '));
        words.forEach((w) => {
          dictionary[w] = dictionary[w] || [];
          dictionary[w].push(p.ref);
        });
      });
      console.log(JSON.stringify(dictionary, null, 2));

      dispatch({
        type: types.SET_CONTENTS,
        payload: content
      });
    });
  }
}
