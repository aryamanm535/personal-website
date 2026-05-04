import { useState, useEffect, useRef } from 'react';

export function useTypewriter(words, { typeSpeed = 75, deleteSpeed = 40, pauseMs = 1800 } = {}) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? deleteSpeed : charIdx === word.length ? pauseMs : typeSpeed;

    timeout.current = setTimeout(() => {
      if (!deleting) {
        if (charIdx < word.length) {
          setText(word.slice(0, charIdx + 1));
          setCharIdx(i => i + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charIdx > 0) {
          setText(word.slice(0, charIdx - 1));
          setCharIdx(i => i - 1);
        } else {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout.current);
  }, [text, charIdx, deleting, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
