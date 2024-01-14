import React, { useState } from 'react';
// import './App.css';

const TextAnalyzer = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [text, setText] = useState('');
  const [partOfSpeech, setpartOfSpeech] = useState('');
  const [definition, setdefinition] = useState('');
  const [synonym, setsynonym]=useState('');
  const [visible, setVisible]=useState(false);

  const switchToInputTab = () => {
    setActiveTab('input');
  };

  const switchToTextareaTab = () => {
    setActiveTab('textarea');
    setVisible(false);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };
console.log(partOfSpeech, definition, synonym)
 
  const charCount = text.length;
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.length > 0).length;
  const paragraphCount = text.split('\n\n').filter(paragraph => paragraph.length > 0).length;
  const spacesCount = text.split(' ').length - 1;
  const punctuationsCount = text.replace(/[^\.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').length;



  async function generateRelatedData(){
    try {
  
      const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data[0]);
  
      const partofSpeech= data[0].meanings[0].partOfSpeech;
      const definition= data[0].meanings[0].definitions[0].definition;
      const synonym= data[0].meanings[0]. synonyms[0];
      setsynonym(synonym);
      setdefinition(definition);
      setpartOfSpeech(partofSpeech);
      setVisible(true);
     
  
    } catch (error) {
      console.error('Error fetching word details:', error);
     
    }
  }   

  return (
    <div className="bg-container">
      <div className="heading">
        <h1>Text Analyzer</h1>
        <p>Text Analyzer is a simple free online tool for SEO web content analysis that helps you find most frequent phrases and words, the number of characters, words, sentences and paragraphs, and the estimated read and speak time of your content.</p>
      </div>
      <div className="switcher-container">
        <button className={`switcher-button ${activeTab === 'input' ? 'active' : ''}`} onClick={switchToInputTab}>Input</button>
        <button className={`switcher-button ${activeTab === 'textarea' ? 'active' : ''}`} onClick={switchToTextareaTab}>Textarea</button>
      </div>
      {activeTab === 'input' && (
        <div className="container" id="inputContainer">
          <div className="input-container">
            <input id="inputText" placeholder="Type your text here..." value={text} onChange={handleInputChange} />
            <button id="word-button" onClick={()=>generateRelatedData()}>Process Word</button>
          </div>
        </div>
      )}
      {activeTab === 'textarea' && (
        <div className="container" id="textareaContainer">
          <textarea id="textareaText" placeholder="Type or copy/paste your content here..." value={text} onChange={handleInputChange}></textarea>
          
        </div>
      )}
      <div className="metrics">
      <div className='table-responsive'>
        <table>
            <thead>
                <tr>
                    <td>Characters</td>
                    <td>Words</td>
                    <td>Sentences</td>
                    <td>Paragraphs</td>
                    <td>Spaces</td>
                    <td>Punctuations</td>
                </tr>
            </thead>
           <tbody>
            <tr>
                <td><span id="charCount">{charCount}</span></td>
                <td> <span id="wordCount">{wordCount}</span></td>
                <td><span id="sentenceCount">{sentenceCount}</span></td>
                <td> <span id="paragraphCount">{paragraphCount}</span></td>
                <td><span id="spaceCount">{spacesCount}</span></td>
                <td><span id="punctuationCount">{punctuationsCount}</span></td>
                </tr>
           </tbody>
        </table>
        </div>

       {visible &&  <div>
          <p><span>Definition : </span> {definition}</p>
          <p><span>Part Of Speech : </span>{partOfSpeech}</p>
          <p><span>Synonym : </span>{synonym}</p>
        </div>}
      </div>
    </div>
  );
};







export default TextAnalyzer;








// import React, { useState } from 'react';
// import TextareaAutosize from 'react-textarea-autosize';
// // import './App.css';

// const TextAnalyzer = () => {
//   const [text, setText] = useState('');

//   const calculateMetrics = () => {
//     const charCount = text.length;
//     const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
//     const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.length > 0).length;
//     const paragraphCount = text.split('\n\n').filter(paragraph => paragraph.length > 0).length;
//     const spaceCount = text.split(' ').length - 1;
//     const punctuationCount = text.replace(/[^\.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').length;

//     return {
//       charCount,
//       wordCount,
//       sentenceCount,
//       paragraphCount,
//       spaceCount,
//       punctuationCount,
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="text-analyzer">
//       <div class="bg-container">
//     <div class="heading">
//         <h1>Text Analyzer</h1>
//         <p>Text Analyzer is a simple free online tool for SEO web content analysis that helps you find most frequent phrases and words, number of characters, words, sentences and paragraphs, and estimated read and speak of your content.</p>
//   </div>
//   <div class="switcher-container">
//     <button class="switcher-button active" id="inputTab">Input</button>
//     <button class="switcher-button " id="paragraphTab">Paragraph</button>
// </div>
//       <TextareaAutosize
//         placeholder="Type your text here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <div>
//         <textarea placeholder='type or copy/paste your text' onChange={(e) => setText(e.target.value)} />
//       </div>
//       <div className="metrics">
//         <p>Number of Characters: {metrics.charCount}</p>
//         <p>Number of Words: {metrics.wordCount}</p>
//         <p>Number of Sentences: {metrics.sentenceCount}</p>
//         <p>Number of Paragraphs: {metrics.paragraphCount}</p>
//         <p>Number of Spaces: {metrics.spaceCount}</p>
//         <p>Number of Punctuations: {metrics.punctuationCount}</p>
//       </div>
//     </div>
//     </div>)
  
// };

// export default TextAnalyzer;
