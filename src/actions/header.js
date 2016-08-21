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
  };

}

function getWords(line) {
  return line
  .map(fixSpaces)
  .map(fixExtensions)
  .map(fixCapitalization)
  .map((l) => l.split(' '))
  .filter((w) => w.length > 1)
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

function getConcordance (words, lines, counts) {
  if( words && lines) {
    return Object
    .keys(words)
    .sort()
    .map((word) => ({ word, numbers: counts[word], lines: words[word].map((ref) => `${ref} ${lines[ref]}`)}));
  }

  return [];
}

function createDictionary({ lines, file }) {
  let dictionary;
  const refs = {};
  const contents = [];
  const dict = {};
  let words = [];
  let wordCounts = {};
  let letterCounts = {};
  let wordTotal = 0;


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
      wordCounts[w] = wordCounts[w] || { count: 0 };
      wordCounts[w].count += 1;
      wordTotal += 1;
      w
      .split('')
      .forEach((l) => {
        letterCounts[l] = letterCounts[l] ? (letterCounts[l] + 1) : 1;
    });
      if(!dict[w].includes(p.ref)) {
        dict[w].push(p.ref);
      }
    });
  });
  words = words.sort();
  dictionary = Dictionary.generate(words, dict);
  wordCounts = Object
  .keys(wordCounts)
  .map(c => ({...wordCounts[c], ...{ word: c, frequency: wordCounts[c].count / wordTotal }}))
  .reduce((prev, next) => ({...prev, ...{ [next.word]: { count: next.count, frequency: next.frequency } }}),{});

  window.wordCounts = wordCounts;
  window.dictionary = dictionary;
  const ln = lines.reduce((prev, next) => ({ ...prev, [next.ref]: `${next.text[0]} / ${next.text[1]}` }), {});

  const concordance = getConcordance(dict, ln, wordCounts);

  return {
    file,
    concordance,
    dictionary,
    contents,
  };
}
