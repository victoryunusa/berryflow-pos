import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage); // Persist language selection
  };

  return (
    <select onChange={changeLanguage} value={i18n.language}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="de">German</option>
    </select>
  );
};

export default LanguageSwitcher;
