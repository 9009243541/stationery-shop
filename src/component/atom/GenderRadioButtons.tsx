const GenderRadioButtons = ({ selectedGender, setSelectedGender }:any) => {
    const options = ["Male", "Female", "Other"];
  
    return (
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value={option.toLowerCase()}
              checked={selectedGender === option.toLowerCase()}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default GenderRadioButtons;
  