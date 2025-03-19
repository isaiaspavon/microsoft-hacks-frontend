// LanguageSelector.tsx → Dropdown for language selection.

import { useState } from "react";

interface LanguageSelectorProps {
  onSelectLanguage: (languageCode: string) => void;
}

export function LanguageSelector({ onSelectLanguage }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
  ];

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    onSelectLanguage(newLanguage);
  }

  return (
    <div>
      <label htmlFor="language-select" className="font-medium">Select Language:</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="ml-2 px-2 py-1 border rounded-md"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
