import React, { useState } from 'react';
import { Settings, User, Lock, Bell, HelpCircle, Info, Moon, Sun, Globe } from 'lucide-react';

const MenuItem = ({ icon: Icon, text, onClick }) => (
  <li className="flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={onClick}>
    <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
    <span className="text-sm font-medium">{text}</span>
  </li>
);

const Menu = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', 'Español', 'Français', 'Deutsch', '中文'];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const changeLanguage = (newLanguage) => {
    setSelectedLanguage(newLanguage);
  };

  const menuItems = [
    { icon: User, text: 'Account' },
    { icon: Lock, text: 'Privacy' },
    { icon: Bell, text: 'Notifications' },
    { 
      icon: Globe, 
      text: `Language: ${selectedLanguage}`, 
      onClick: () => {
        const nextIndex = (languages.indexOf(selectedLanguage) + 1) % languages.length;
        changeLanguage(languages[nextIndex]);
      }
    },
    { 
      icon: isDarkMode ? Sun : Moon, 
      text: `${isDarkMode ? 'Light' : 'Dark'} Mode`, 
      onClick: toggleDarkMode 
    },
    { icon: HelpCircle, text: 'Help' },
    { icon: Info, text: 'About' },
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen transition-colors duration-200`}>
      {/* Large screens (lg and up) */}
      <div className="hidden lg:flex">
        <div className="w-1/4 border-r dark:border-gray-700">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <ul>
              {menuItems.map((item, index) => (
                <MenuItem key={index} icon={item.icon} text={item.text} onClick={item.onClick} />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-3/4 p-6">
          <h2 className="text-xl font-semibold mb-4">Selected Setting Details</h2>
          <p className="text-gray-600 dark:text-gray-300">Select a setting from the menu to view details.</p>
        </div>
      </div>

      {/* Medium screens (md to lg) */}
      <div className="hidden md:block lg:hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={item.onClick}>
                <item.icon className="w-8 h-8 text-gray-600 dark:text-gray-300 mb-2" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Small screens (sm and below) */}
      <div className="md:hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Settings</h1>
            <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <MenuItem key={index} icon={item.icon} text={item.text} onClick={item.onClick} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
