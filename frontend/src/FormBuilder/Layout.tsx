import React, { useState } from 'react';
import InputCreator from './InputCreator';
interface Field {
  id: string; // optional, because new fields may not have id initially
  label?: string;
  type?: string;
  // add other properties your field has
}
function Layout() {
  const [fields, setFields] = useState<Field[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [selectedFieldType, setSelectedFieldType] = useState(null);

  const addField = (type:any) => {
    setSelectedFieldType(type);
    setEditingField(null);
    setCreatorOpen(true);
    setShowDropdown(false);
  };

  const saveField = (field:Field) => {
    if (field.id) {
      setFields(fields.map((f) => (f.id === field.id ? field : f)));
    } else {
      setFields([...fields, { ...field, id: Date.now().toString() }]);
    }
  };
React.useEffect(() => {
  console.log("Updated fields:", fields);
});

  const editField = (id: string) => {
  const field:any = fields.find((f) => f.id === id) || null;
  setEditingField(field);
  setCreatorOpen(true);
};

  const deleteField = (id:String) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  return (
<div className="min-h-screen bg-[#f7f8fa] rounded-md text-gray-800 py-12 px-4 sm:px-8">
  <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-[32px] p-10 border border-gray-200 transition-all duration-300">
    {/* Header */}
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">
        🧩 Build Your Custom Form
      </h1>
      <p className="text-gray-500 text-sm">
        Add, edit, and arrange fields to shape your form.
      </p>
    </div>

    {/* Add Fields Button + Dropdown */}
    <div className="relative mb-10 text-center">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-[#5856D6] text-white px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-[#4745b3] transition-all duration-300 ease-in-out hover:scale-105 font-semibold"
      >
        ➕ Add Field
      </button>

      {showDropdown && (
        <div
  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 
             max-h-80 overflow-y-auto bg-white/80 backdrop-blur-lg 
             border border-gray-200 shadow-xl rounded-2xl z-30 animate-fadeIn 
             custom-scrollbar"
  onMouseLeave={() => setShowDropdown(false)}
>
  {[
    'text', 'email', 'number', 'password', 'date', 'time', 'color',
    'range', 'url', 'tel', 'search', 'file', 'textarea', 'checkbox', 'radio','select'
  ].map((type) => (
    <button
      key={type}
      onClick={() => addField(type)}
      className="w-full text-left px-6 py-3 text-gray-700 hover:bg-violet-50 transition-colors duration-200"
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  ))}
</div>

      )}
    </div>

    {/* Fields List */}
    <div className="space-y-5">
      {fields.length === 0 ? (
        <div className="text-center text-gray-400 italic">
          No fields added yet. Click "Add Field" to begin.
        </div>
      ) : (
        fields.map((field) => (
          <div
            key={field.id}
            className="bg-white border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex justify-between items-center group"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-gray-900">
                {field.label}
              </span>
              <span className="text-sm text-gray-500 capitalize">
                Type: {field.type}
              </span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => editField(field.id)}
                className="px-4 py-1 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500 shadow-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteField(field.id)}
                className="px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 shadow-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Input Creator Modal */}
  {creatorOpen && (
    <InputCreator
      fieldData={editingField || { type: selectedFieldType }}
      onSave={saveField}
      onClose={() => setCreatorOpen(false)}
    />
  )}

  {/* Fade Animation */}
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `}</style>
</div>



  );
}

export default Layout;
