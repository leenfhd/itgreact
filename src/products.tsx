import React, { useState } from "react";

interface Item {
  photo: string | ArrayBuffer | null;
  name: string;
  size: string;
  quantity: string;
  details: string;
}

const ProductsPage = () => {
  const [newItem, setNewItem] = useState<Item>({
    photo: "",
    name: "",
    size: "",
    quantity: "",
    details: "",
  });

  const [items, setItems] = useState<Item[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isGridView, setIsGridView] = useState<boolean>(true);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setNewItem(function (prevItem) {
      return { ...prevItem, [name]: value };
    });
    console.log(newItem);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = function () {
      setNewItem(function (prevItem) {
        return { ...prevItem, photo: reader.result };
      });
    };

    reader.readAsDataURL(file);
  }

  function handleAddItem() {
    if (isEditing && editingIndex !== null) {
      const updatedItems = items.map(function (item, index) {
        return index === editingIndex ? newItem : item;
      });
      setItems(updatedItems);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setItems(function (prevItems) {
        return [...prevItems, newItem];
      });
    }

    setNewItem({ photo: "", name: "", size: "", quantity: "", details: "" });
  }

  function handleEditItem(index: number) {
    setNewItem(items[index]);
    setIsEditing(true);
    setEditingIndex(index);
  }

  function handleDeleteItem(index: number) {
    setItems(function (prevItems) {
      return prevItems.filter(function (_, i) {
        return i !== index;
      });
    });
    if (isEditing && editingIndex === index) {
      // If we're editing the item that got deleted, reset the form
      setNewItem({ photo: "", name: "", size: "", quantity: "", details: "" });
      setIsEditing(false);
      setEditingIndex(null);
    }
  }

  function handleViewDetails(item: Item) {
    setSelectedItem(item);
  }

  function handleCloseDetails() {
    setSelectedItem(null);
  }

  function toggleView() {
    setIsGridView(function (prevView) {
      return !prevView;
    });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-purple-900 text-center">
        Manage Cloth Items
      </h1>

      <button
        onClick={toggleView}
        className=" text-purple-900 font-bold p-2 rounded mb-4 mt-2"
      >
        {isGridView ? "Switch to List View" : "Switch to Grid View"}
      </button>

      <div className="mb-4 grid grid-cols-1 gap-5">
        <div className="flex justify-center">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="mr-10 border p-2 border-solid border-2 border-purple-900 w-80 placeholder-black rounded-md"
          />
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Fabric Name"
            className="border p-2 border-solid border-2 border-purple-900 w-80 placeholder-black rounded-md"
          />
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            name="size"
            value={newItem.size}
            onChange={handleInputChange}
            placeholder="Size"
            className="mr-10 border p-2 border-solid border-2 border-purple-900 w-80 placeholder-black rounded-md"
          />
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="border p-2 border-solid border-2 border-purple-900 w-80 placeholder-black rounded-md"
          />
        </div>
        <textarea
          name="details"
          value={newItem.details}
          onChange={handleInputChange}
          placeholder="Details"
          className="flex mx-auto border p-2 border-solid border-2 border-purple-900 w-80 placeholder-black rounded-md"
          rows={4}
        />
        <button
          onClick={handleAddItem}
          className="mx-auto bg-black text-white p-2 rounded-md w-80 border-solid border-2"
        >
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </div>

      <div
        className={`${
          isGridView
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col space-y-4"
        }`}
      >
        {items.map(function (item, index) {
          return (
            <div
              key={index}
              className={`border p-4 rounded shadow-lg flex flex-col ${
                !isGridView ? "w-80 mx-auto" : ""
              }`}
            >
              {item.photo && (
                <img
                  src={item.photo as string}
                  alt={item.name}
                  className="w-full h-50 object-cover mb-2"
                />
              )}
              <h2 className="text-xl font-bold text-purple-900">{item.name}</h2>
              <p className="text-black">Size: {item.size}</p>
              <p className="text-black">Quantity: {item.quantity}</p>
              <div className="mx-auto mt-auto flex space-x-2">
                <button
                  onClick={function () {
                    handleEditItem(index);
                  }}
                  className="bg-purple-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={function () {
                    handleDeleteItem(index);
                  }}
                  className="bg-purple-500 text-white p-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={function () {
                    handleViewDetails(item);
                  }}
                  className="bg-purple-500 text-white p-2 rounded"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Item Details</h2>
            {selectedItem.photo && (
              <img
                src={selectedItem.photo as string}
                alt={selectedItem.name}
                className="w-full h-70 object-contain mb-2"
              />
            )}
            <p>
              <strong>Name:</strong> {selectedItem.name}
            </p>
            <p>
              <strong>Size:</strong> {selectedItem.size}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedItem.quantity}
            </p>
            <p>
              <strong>Details:</strong> {selectedItem.details}
            </p>
            <button
              onClick={handleCloseDetails}
              className="mt-4 bg-white text-purple-900 p-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
