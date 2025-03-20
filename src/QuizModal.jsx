import React, { useState, useEffect, useMemo } from "react";
import './QuizModal.css';

const QuizModal = ({ closeModal }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [mediaType, setMediaType] = useState(""); 
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';
  const [genreOptions, setGenreOptions] = useState([]); 
  const [isClosing, setIsClosing] = useState(false);

  const movieGenres = useMemo(() => [
    "Sci-Fi", "Akció", "Romantikus", "Dráma", "Vígjáték", "Horror", "Thriller", "Kaland", "Dokumentumfilm", "Animáció"
  ], []);

  const seriesGenres = useMemo(() => [
    "Sci-Fi", "Akció", "Romantikus", "Dráma", "Vígjáték", "Horror", "Thriller", "Kaland", "Animáció"
  ], []);

  const questions = useMemo(() => [
    { question: "Filmet vagy sorozatot keresel?", options: ["Film", "Sorozat"] },
    { question: "Milyen műfajban keresel?", options: genreOptions },
    { question: "Melyik évtizedben keresel?", options: ["1970", "1980", "1990", "2000", "2010", "2020"] },
  ], [genreOptions]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);

    if (step === 0) {
      setMediaType(answer); // Film vagy Sorozat választása az első kérdésnél
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      evaluateResult([...answers, answer]);
    }
  };

  const evaluateResult = async (answers) => {
    const genre = answers[1]; // Műfaj
    const decade = answers[2]; // Évtized

    console.log("SZŰRÉSI PARAMÉTEREK:", { mediaType, genre, decade });

    try {
      let url = "";
      // Ha filmeket keresünk
      if (mediaType === "Film") {
        url = `http://localhost:5104/api/filmek/filtered-films/${token}?mufaj=${genre}&ev=${decade}`;
      }
      // Ha sorozatokat keresünk
      else if (mediaType === "Sorozat") {
        url = `http://localhost:5104/api/sorozatok/filtered-sorozatoks/${token}?mufaj=${genre}&ev=${decade}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP hiba: ${response.status}`);
      }

      const filteredMedia = await response.json();
      console.log("API válasz:", filteredMedia);

      if (filteredMedia.length > 0) {
        const randomItem = filteredMedia[Math.floor(Math.random() * filteredMedia.length)]; // Véletlenszerű választás
        setResult(randomItem.cim);
      } else {
        setResult('Nincs megfelelő ajánlás.');
      }
    } catch (error) {
      console.error('Hiba a filmek/sorozatok lekérésekor:', error);
      setResult('Nem sikerült betölteni az ajánlásokat.');
    }
  };

  useEffect(() => {
    if (mediaType === 'Film') {
      setGenreOptions(movieGenres);
    } else if (mediaType === 'Sorozat') {
      setGenreOptions(seriesGenres);
    }
  }, [mediaType, movieGenres, seriesGenres]);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();  // Modal tényleges bezárása
    }, 500);  // Várakozás az animációval
  };

  return (
    <div className={`quiz-modal ${isClosing ? 'closing' : ''}`}>
      <div className="quiz-content">
      <button className="bezar" onClick={handleCloseModal}>X</button>
        {result ? (
          <div className="result">
            <h2>
              Ezt {mediaType.toLowerCase()} ajánljuk neked: <strong>{result}</strong>
            </h2>
            <button className="close-btn" onClick={handleCloseModal}>Bezár</button>
          </div>
        ) : (
          <div className="question-container">
            <h3>{questions[step].question}</h3>
            <ul>
              {questions[step].options.map((option, index) => (
                <li key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
