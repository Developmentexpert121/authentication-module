import  { useState, useEffect } from 'react';

const ALL_TYPES = [
  'text', 'email', 'number', 'password', 'date', 'time',
  'color', 'range', 'url', 'tel', 'search', 'file',
  'textarea', 'checkbox', 'radio'
];
function InputCreator({ fieldData, onSave, onClose }:any) {
  const [label, setLabel] = useState('');
  const [type, setType] = useState('text');
  const [showValidation, setShowValidation] = useState(false);
  const [validationRules, setValidationRules] = useState({
    required: false,
    minLength: '',
    maxLength: '',
    pattern: ''
  });
  const [options, setOptions] = useState(['']);

  useEffect(() => {
    if (fieldData) {
      setLabel(fieldData.label || '');
      setType(fieldData.type || 'text');
      setShowValidation(fieldData.showValidation || false);
      setValidationRules(fieldData.validationRules || {
        required: false,
        minLength: '',
        maxLength: '',
        pattern: ''
      });
      setOptions(fieldData.options || ['']);
    }
    console.log("fieldData",fieldData)
  }, [fieldData]);

  const handleOptionChange = (index:any, value:any) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index:any) => {
    const updated = [...options];
    updated.splice(index, 1);
    setOptions(updated);
  };

  const isTextBased = ['text', 'email', 'password', 'textarea', 'search', 'url', 'tel'].includes(type);
  const isOptionType = ['checkbox', 'radio','select'].includes(type);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!label.trim()) {
      alert('Please enter a label.');
      return;
    }

    const newField = {
      ...fieldData,
      label,
      type,
      showValidation,
      validationRules: showValidation ? validationRules : {},
      options: isOptionType ? options.filter(Boolean) : []
    };

    onSave(newField);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-xl text-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-xl relative border border-gray-200"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          {fieldData?.id ? 'Edit Field' : 'Add New Field'}
        </h2>

        {/* Label */}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-sm">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Enter field label"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-sm">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Validation */}
        {isTextBased && (
          <>
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={showValidation}
                onChange={() => setShowValidation(!showValidation)}
                className="accent-blue-600 w-4 h-4"
              />
              <label className="text-sm font-medium">Add Validation Rules</label>
            </div>

            {showValidation && (
              <div className="mb-6 border-t border-gray-200 pt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={validationRules.required}
                    onChange={(e) =>
                      setValidationRules({ ...validationRules, required: e.target.checked })
                    }
                    className="accent-blue-600 w-4 h-4"
                  />
                  <label className="text-sm">Required</label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Min Length</label>
                  <input
                    type="number"
                    value={validationRules.minLength}
                    onChange={(e) =>
                      setValidationRules({ ...validationRules, minLength: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Max Length</label>
                  <input
                    type="number"
                    value={validationRules.maxLength}
                    onChange={(e) =>
                      setValidationRules({ ...validationRules, maxLength: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Pattern (Regex)</label>
                  <input
                    type="text"
                    value={validationRules.pattern}
                    onChange={(e) =>
                      setValidationRules({ ...validationRules, pattern: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Options */}
        {isOptionType && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-800">Options</h3>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700 text-lg transition"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-sm text-blue-600 hover:underline mt-1 transition"
            >
              + Add Option
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Save Field
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputCreator;
