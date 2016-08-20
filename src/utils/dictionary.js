export default class Dictionary {

  constructor() {
    this.tree = this.generateNewNode('');
  }

  addWord(lines, word) {
    let current = this.tree;
    word
    .split('')
    .forEach((letter) => {
      if(!current.children[letter]) {
        current.children[letter] = this.generateNewNode(letter);
      }
      current = current.children[letter];
    });

    current.word = word;
    current.refs = lines[word];
  }

  getSuggestions(str) {
    return this.findWords(this.locateWord(str)).sort();
  }

  findWords(node) {
    let words = [];
    if(node.word) {
      words.push(node.word);
    }

    if(node.children && Object.keys(node.children).length) {
      words = [...words, ...(Object.keys(node.children).map((n) => this.findWords(node.children[n])).reduce((prev, next) => [...prev, ...next]))];
    }

    return words;
  }

  locateWord(word) {
    try {
    return word
    .split('')
    .reduce((prev, next) => prev.children[next], this.tree);
    } catch(e) {
      return {
        children: {}
      };
    }
  }

  generateNewNode(letter) {
    return {
      letter,
      children: {}
    };
  }

  static generate(words, lines) {
    const dict = new Dictionary();
    words.forEach(dict.addWord.bind(dict, lines));

    return dict;
  }

}
