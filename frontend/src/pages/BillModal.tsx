// // // import React, { useState } from 'react';
// // // import Box from '@mui/material/Box';
// // // import Modal from '@mui/material/Modal';
// // // import MenuItem from '@mui/material/MenuItem';
// // // import Select from '@mui/material/Select';
// // // import Checkbox from '@mui/material/Checkbox';

// // // interface BillModalProps {
// // //     open: boolean;
// // //     onClose: () => void;
// // // }

// // // interface Item {
// // //     name: string;
// // //     quantity: number;
// // //     price: number;
// // // }

// // // const modalStyle = {
// // //     position: 'absolute' as 'absolute',
// // //     top: '50%',
// // //     left: '50%',
// // //     transform: 'translate(-50%, -50%)',
// // //     width: '90%',
// // //     maxWidth: 500,
// // //     bgcolor: 'white',
// // //     boxShadow: 24,
// // //     p: 4,
// // //     borderRadius: '8px',
// // //     maxHeight: '80vh',
// // //     overflow: 'auto'
// // // };

// // // const BillModal: React.FC<BillModalProps> = ({ open, onClose }) => {
// // //     const [invoiceNumber, setInvoiceNumber] = useState("#000058");
// // //     const [invoiceDate, setInvoiceDate] = useState("09/05/24");
// // //     const [dueDate, setDueDate] = useState("12/05/24");
// // //     const [clientName, setClientName] = useState("Tushar Pahwa");
// // //     const [items, setItems] = useState<Item[]>([{ name: "Dashboard UX + UI", quantity: 5, price: 4000 }]);
// // //     const [subtotal, setSubtotal] = useState(25000);
// // //     const [discount, setDiscount] = useState(2500);
// // //     const [tax, setTax] = useState(0);
// // //     const [total, setTotal] = useState(22500);
// // //     const [paymentReceived, setPaymentReceived] = useState(22500);
// // //     const [selectedFrom, setSelectedFrom] = useState<string[]>(["Option 1", "Option 2"]);
// // //     const [selectedTo, setSelectedTo] = useState<string[]>(["Option A", "Option B"]);

// // //     // Calculate total based on items
// // //     const calculateTotal = () => {
// // //         const newSubtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
// // //         setSubtotal(newSubtotal);
// // //         setTotal(newSubtotal - discount + tax);
// // //     };

// // //     // Add a new item to the invoice
// // //     const addItem = () => {
// // //         setItems([...items, { name: "", quantity: 1, price: 0 }]);
// // //     };

// // //     // Update item details
// // //     const updateItem = (index: number, key: keyof Item, value: string | number) => {
// // //         const updatedItems = items.map((item, idx) => idx === index ? { ...item, [key]: value } : item);
// // //         setItems(updatedItems);
// // //         calculateTotal();
// // //     };

// // //     // Delete item
// // //     const deleteItem = (index: number) => {
// // //         const updatedItems = items.filter((_, idx) => idx !== index);
// // //         setItems(updatedItems);
// // //         calculateTotal();
// // //     };

// // //     // Handle dropdown select
// // //     const handleDropdownChange = (type: 'from' | 'to', value: string) => {
// // //         if (type === 'from') {
// // //             setSelectedFrom((prevState) =>
// // //                 prevState.includes(value)
// // //                     ? prevState.filter(val => val !== value) // Remove if already selected
// // //                     : [...prevState, value] // Add if not selected
// // //             );
// // //         } else {
// // //             setSelectedTo((prevState) =>
// // //                 prevState.includes(value)
// // //                     ? prevState.filter(val => val !== value) // Remove if already selected
// // //                     : [...prevState, value] // Add if not selected
// // //             );
// // //         }
// // //     };

// // //     return (
// // //         <Modal open={open} onClose={onClose} aria-labelledby="create-invoice-modal">
// // //             <Box sx={modalStyle}>
// // //                 <header className="flex items-center justify-between mb-4">
// // //                     <h1 className="text-xl font-semibold">Create Invoice</h1>
// // //                     <button className="text-green-600">Preview</button>
// // //                 </header>

// // //                 {/* Invoice Details */}
// // //                 <section className="space-y-2 mb-4">
// // //                     <h2 className="text-sm font-medium text-gray-600">Invoice Details</h2>
// // //                     <div className="flex items-center space-x-4">
// // //                         <div className="flex-1">
// // //                             <label className="text-xs font-semibold text-gray-500">Invoice Number</label>
// // //                             <input type="text" value={invoiceNumber} readOnly className="w-full mt-1 p-2 border rounded-md" />
// // //                         </div>
// // //                         <div className="flex-1">
// // //                             <label className="text-xs font-semibold text-gray-500">Invoice Date</label>
// // //                             <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
// // //                         </div>
// // //                         <div className="flex-1">
// // //                             <label className="text-xs font-semibold text-gray-500">Due Date</label>
// // //                             <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
// // //                         </div>
// // //                     </div>
// // //                 </section>

// // //                 {/* Client Info */}
// // //                 <section className="space-y-2 mb-4">
// // //                     <h2 className="text-sm font-medium text-gray-600">Name/Business Name of Client</h2>
// // //                     <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border rounded-md" />
// // //                 </section>

// // //                 {/* Business Info */}
// // //                 <section className="space-y-2 mb-4">
// // //                     <h2 className="text-sm font-medium text-gray-600">Business Info</h2>
// // //                     <div className="flex space-x-4">
// // //                         <Select
// // //                             multiple
// // //                             value={selectedFrom}
// // //                             onChange={(e) => {
// // //                                 const value = e.target.value as string[];
// // //                                 setSelectedFrom(value);
// // //                             }}
// // //                             renderValue={(selected) => selected.join(', ')} // Only show selected values
// // //                             className="flex-1"
// // //                         >
// // //                             <MenuItem value="Option 1"><Checkbox checked={selectedFrom.includes("Option 1")} />Option 1</MenuItem>
// // //                             <MenuItem value="Option 2"><Checkbox checked={selectedFrom.includes("Option 2")} />Option 2</MenuItem>
// // //                         </Select>
// // //                         <Select
// // //                             multiple
// // //                             value={selectedTo}
// // //                             onChange={(e) => {
// // //                                 const value = e.target.value as string[];
// // //                                 setSelectedTo(value);
// // //                             }}
// // //                             renderValue={(selected) => selected.join(', ')} // Only show selected values
// // //                             className="flex-1"
// // //                         >
// // //                             <MenuItem value="Option A"><Checkbox checked={selectedTo.includes("Option A")} />Option A</MenuItem>
// // //                             <MenuItem value="Option B"><Checkbox checked={selectedTo.includes("Option B")} />Option B</MenuItem>
// // //                         </Select>
// // //                     </div>
// // //                 </section>

// // //                 {/* Item Details */}
// // //                 <section className="space-y-2 mb-4">
// // //                     <h2 className="text-sm font-medium text-gray-600">Item Details</h2>
// // //                     {items.map((item, index) => (
// // //                         <div key={index} className="flex items-center space-x-2 mb-2">
// // //                             <input
// // //                                 type="text"
// // //                                 value={item.name}
// // //                                 placeholder="Item name"
// // //                                 onChange={(e) => updateItem(index, 'name', e.target.value)}
// // //                                 className="flex-1 p-2 border rounded-md"
// // //                             />
// // //                             <input
// // //                                 type="number"
// // //                                 value={item.quantity}
// // //                                 placeholder="Qty"
// // //                                 onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
// // //                                 className="w-16 p-2 border rounded-md"
// // //                             />
// // //                             <input
// // //                                 type="number"
// // //                                 value={item.price}
// // //                                 placeholder="Price"
// // //                                 onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
// // //                                 className="w-24 p-2 border rounded-md"
// // //                             />
// // //                             <button onClick={() => deleteItem(index)} className="text-red-600">Delete</button>
// // //                         </div>
// // //                     ))}
// // //                     <button onClick={addItem} className="text-blue-600">Add Item</button>
// // //                 </section>

// // //                 {/* Total Calculation */}
// // //                 <section className="space-y-2 mb-4">
// // //                     <div className="flex items-center justify-between">
// // //                         <span className="text-sm font-semibold">Subtotal</span>
// // //                         <span className="text-sm font-semibold">{subtotal}</span>
// // //                     </div>
// // //                     <div className="flex items-center justify-between">
// // //                         <span className="text-sm font-semibold">Tax</span>
// // //                         <input
// // //                             type="number"
// // //                             value={tax}
// // //                             onChange={(e) => setTax(Number(e.target.value))}
// // //                             className="w-24 p-2 border rounded-md"
// // //                         />
// // //                     </div>
// // //                     <div className="flex items-center justify-between">
// // //                         <span className="text-sm font-semibold">Total</span>
// // //                         <span className="text-sm font-semibold">{total}</span>
// // //                     </div>
// // //                     <div className="flex items-center justify-between">
// // //                         <span className="text-sm font-semibold">Discount</span>
// // //                         <input
// // //                             type="number"
// // //                             value={discount}
// // //                             onChange={(e) => setDiscount(Number(e.target.value))}
// // //                             className="w-24 p-2 border rounded-md"
// // //                         />
// // //                     </div>
// // //                     <div className="flex items-center justify-between">
// // //                         <span className="text-sm font-semibold">Payment Received</span>
// // //                         <input
// // //                             type="number"
// // //                             value={paymentReceived}
// // //                             onChange={(e) => setPaymentReceived(Number(e.target.value))}
// // //                             className="w-24 p-2 border rounded-md"
// // //                         />
// // //                     </div>
// // //                 </section>

// // //                 {/* Modal Buttons */}
// // //                 <footer className="flex justify-end space-x-4">
// // //                     <button onClick={onClose} className="text-gray-500">Cancel</button>
// // //                     <button className="text-blue-500">Save</button>
// // //                 </footer>
// // //             </Box>
// // //         </Modal>
// // //     );
// // // };

// // // export default BillModal;

// // import React, { useState } from 'react';
// // import Box from '@mui/material/Box';
// // import Modal from '@mui/material/Modal';
// // import MenuItem from '@mui/material/MenuItem';
// // import Select from '@mui/material/Select';
// // import Checkbox from '@mui/material/Checkbox';

// // interface BillModalProps {
// //     open: boolean;
// //     onClose: () => void;
// // }

// // interface Item {
// //     name: string;
// //     quantity: number;
// //     price: number;
// // }

// // const modalStyle = {
// //     position: 'absolute' as 'absolute',
// //     top: '50%',
// //     left: '50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: '90%',
// //     maxWidth: 500,
// //     bgcolor: 'white',
// //     boxShadow: 24,
// //     p: 4,
// //     borderRadius: '8px',
// //     maxHeight: '80vh',
// //     overflow: 'auto'
// // };

// // const BillModal: React.FC<BillModalProps> = ({ open, onClose }) => {
// //     const [invoiceNumber, setInvoiceNumber] = useState("#000058");
// //     const [invoiceDate, setInvoiceDate] = useState("09/05/24");
// //     const [dueDate, setDueDate] = useState("12/05/24");
// //     const [clientName, setClientName] = useState("Tushar Pahwa");
// //     const [items, setItems] = useState<Item[]>([{ name: "Dashboard UX + UI", quantity: 5, price: 4000 }]);
// //     const [subtotal, setSubtotal] = useState(25000);
// //     const [discount, setDiscount] = useState(2500);
// //     const [tax, setTax] = useState(0);
// //     const [total, setTotal] = useState(22500);
// //     const [paymentReceived, setPaymentReceived] = useState(22500);
// //     const [selectedFrom, setSelectedFrom] = useState<string[]>(["Option 1", "Option 2"]);
// //     const [selectedTo, setSelectedTo] = useState<string[]>(["Option A", "Option B"]);

// //     // Calculate total based on items
// //     const calculateTotal = () => {
// //         const newSubtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
// //         setSubtotal(newSubtotal);
// //         setTotal(newSubtotal - discount + tax);
// //     };

// //     // Add a new item to the invoice
// //     const addItem = () => {
// //         setItems([...items, { name: "", quantity: 1, price: 0 }]);
// //     };

// //     // Update item details
// //     const updateItem = (index: number, key: keyof Item, value: string | number) => {
// //         const updatedItems = items.map((item, idx) => idx === index ? { ...item, [key]: value } : item);
// //         setItems(updatedItems);
// //         calculateTotal();
// //     };

// //     // Delete item
// //     const deleteItem = (index: number) => {
// //         const updatedItems = items.filter((_, idx) => idx !== index);
// //         setItems(updatedItems);
// //         calculateTotal();
// //     };

// //     // Handle dropdown select
// //     const handleDropdownChange = (type: 'from' | 'to', value: string) => {
// //         if (type === 'from') {
// //             setSelectedFrom((prevState) =>
// //                 prevState.includes(value)
// //                     ? prevState.filter(val => val !== value)
// //                     : [...prevState, value]
// //             );
// //         } else {
// //             setSelectedTo((prevState) =>
// //                 prevState.includes(value)
// //                     ? prevState.filter(val => val !== value)
// //                     : [...prevState, value]
// //             );
// //         }
// //     };

// //     // Render people list based on selected options
// //     const renderPeopleList = () => {
// //         const selectedOptions = selectedTo.length > 0 ? selectedTo : [];
// //         return selectedOptions.map((option, index) => (
// //             <div key={index} className="space-y-2">
// //                 <h3 className="font-medium text-gray-600">{option} People</h3>
// //                 <div className="space-y-1">
// //                     <div className="flex items-center justify-between">
// //                         <span className="text-sm font-semibold">Name</span>
// //                         <span className="text-sm font-semibold">Price</span>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                         <span className="text-sm">Person {index + 1}</span>
// //                         <span className="text-sm">{total / selectedTo.length}</span>
// //                     </div>
// //                 </div>
// //             </div>
// //         ));
// //     };

// //     return (
// //         <Modal open={open} onClose={onClose} aria-labelledby="create-invoice-modal">
// //             <Box sx={modalStyle}>
// //                 <header className="flex items-center justify-between mb-4">
// //                     <h1 className="text-xl font-semibold">Create Invoice</h1>
// //                     <button className="text-green-600">Preview</button>
// //                 </header>

// //                 {/* Invoice Details */}
// //                 <section className="space-y-2 mb-4">
// //                     <h2 className="text-sm font-medium text-gray-600">Invoice Details</h2>
// //                     <div className="flex items-center space-x-4">
// //                         <div className="flex-1">
// //                             <label className="text-xs font-semibold text-gray-500">Invoice Number</label>
// //                             <input type="text" value={invoiceNumber} readOnly className="w-full mt-1 p-2 border rounded-md" />
// //                         </div>
// //                         <div className="flex-1">
// //                             <label className="text-xs font-semibold text-gray-500">Invoice Date</label>
// //                             <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
// //                         </div>
// //                         <div className="flex-1">
// //                             <label className="text-xs font-semibold text-gray-500">Due Date</label>
// //                             <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
// //                         </div>
// //                     </div>
// //                 </section>

// //                 {/* Client Info */}
// //                 <section className="space-y-2 mb-4">
// //                     <h2 className="text-sm font-medium text-gray-600">Name/Business Name of Client</h2>
// //                     <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border rounded-md" />
// //                 </section>

// //                 {/* Business Info */}
// //                 <section className="space-y-2 mb-4">
// //                     <h2 className="text-sm font-medium text-gray-600">Business Info</h2>
// //                     <div className="flex space-x-4">
// //                         <Select
// //                             multiple
// //                             value={selectedFrom}
// //                             onChange={(e) => {
// //                                 const value = e.target.value as string[];
// //                                 setSelectedFrom(value);
// //                             }}
// //                             renderValue={(selected) => selected.join(', ')}
// //                             className="flex-1"
// //                         >
// //                             <MenuItem value="Option 1"><Checkbox checked={selectedFrom.includes("Option 1")} />Option 1</MenuItem>
// //                             <MenuItem value="Option 2"><Checkbox checked={selectedFrom.includes("Option 2")} />Option 2</MenuItem>
// //                         </Select>
// //                         <Select
// //                             multiple
// //                             value={selectedTo}
// //                             onChange={(e) => {
// //                                 const value = e.target.value as string[];
// //                                 setSelectedTo(value);
// //                             }}
// //                             renderValue={(selected) => selected.join(', ')}
// //                             className="flex-1"
// //                         >
// //                             <MenuItem value="Option A"><Checkbox checked={selectedTo.includes("Option A")} />Option A</MenuItem>
// //                             <MenuItem value="Option B"><Checkbox checked={selectedTo.includes("Option B")} />Option B</MenuItem>
// //                         </Select>
// //                     </div>
// //                 </section>

// //                 {/* Item Details */}
// //                 <section className="space-y-2 mb-4">
// //                     <h2 className="text-sm font-medium text-gray-600">Item Details</h2>
// //                     {items.map((item, index) => (
// //                         <div key={index} className="flex items-center space-x-2 mb-2">
// //                             <input
// //                                 type="text"
// //                                 value={item.name}
// //                                 placeholder="Item name"
// //                                 onChange={(e) => updateItem(index, 'name', e.target.value)}
// //                                 className="flex-1 p-2 border rounded-md"
// //                             />
// //                             <input
// //                                 type="number"
// //                                 value={item.quantity}
// //                                 placeholder="Qty"
// //                                 onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
// //                                 className="w-16 p-2 border rounded-md"
// //                             />
// //                             <input
// //                                 type="number"
// //                                 value={item.price}
// //                                 placeholder="Price"
// //                                 onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
// //                                 className="w-24 p-2 border rounded-md"
// //                             />
// //                             <button onClick={() => deleteItem(index)} className="text-red-600">Delete</button>
// //                         </div>
// //                     ))}
// //                     <button onClick={addItem} className="text-blue-600">Add Item</button>
// //                 </section>

// //                 {/* Summary */}
// //                 <section className="space-y-2 mt-4">
// //                     <div className="flex justify-between">
// //                         <span className="font-semibold">Subtotal:</span>
// //                         <span className="font-semibold">{subtotal}</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                         <span className="font-semibold">Discount:</span>
// //                         <span className="font-semibold">{discount}</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                         <span className="font-semibold">Tax:</span>
// //                         <span className="font-semibold">{tax}</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                         <span className="font-semibold">Total:</span>
// //                         <span className="font-semibold">{total}</span>
// //                     </div>
// //                 </section>

// //                 {/* Payment Received */}
// //                 <section className="space-y-2 mb-4">
// //                     <h2 className="text-sm font-medium text-gray-600">Payment Received</h2>
// //                     <input
// //                         type="number"
// //                         value={paymentReceived}
// //                         onChange={(e) => setPaymentReceived(Number(e.target.value))}
// //                         className="w-full p-2 border rounded-md"
// //                     />
// //                 </section>

// //                 {/* Final Output */}
// //                 <div>
// //                     <h3 className="text-lg font-semibold">People List</h3>
// //                     {renderPeopleList()}
// //                 </div>
// //             </Box>
// //         </Modal>
// //     );
// // };

// // export default BillModal;

// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';

// interface BillModalProps {
//     open: boolean;
//     onClose: () => void;
// }

// interface Item {
//     name: string;
//     quantity: number;
//     price: number;
// }

// const modalStyle = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '90%',
//     maxWidth: 500,
//     bgcolor: 'white',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: '8px',
//     maxHeight: '80vh',
//     overflow: 'auto'
// };

// const BillModal: React.FC<BillModalProps> = ({ open, onClose }) => {
//     const [invoiceNumber, setInvoiceNumber] = useState("#000058");
//     const [invoiceDate, setInvoiceDate] = useState("09/05/24");
//     const [dueDate, setDueDate] = useState("12/05/24");
//     const [clientName, setClientName] = useState("Tushar Pahwa");
//     const [items, setItems] = useState<Item[]>([{ name: "Dashboard UX + UI", quantity: 5, price: 4000 }]);
//     const [total, setTotal] = useState(22500);  // Total price editable
//     const [selectedFrom, setSelectedFrom] = useState<string[]>(["Option 1", "Option 2"]);
//     const [selectedTo, setSelectedTo] = useState<string[]>(["Option A", "Option B"]);

//     // Update total price when edited
//     const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newTotal = Number(e.target.value);
//         setTotal(newTotal);
//     };

//     // Handle dropdown select for options
//     const handleDropdownChange = (type: 'from' | 'to', value: string) => {
//         if (type === 'from') {
//             setSelectedFrom((prevState) =>
//                 prevState.includes(value)
//                     ? prevState.filter(val => val !== value)
//                     : [...prevState, value]
//             );
//         } else {
//             setSelectedTo((prevState) =>
//                 prevState.includes(value)
//                     ? prevState.filter(val => val !== value)
//                     : [...prevState, value]
//             );
//         }
//     };

//     // Render people list based on selected options
//     const renderPeopleList = () => {
//         const selectedOptions = selectedTo.length > 0 ? selectedTo : [];
//         const pricePerPerson = selectedOptions.length > 0 ? total / selectedOptions.length : 0;

//         return selectedOptions.map((option, index) => (
//             <div key={index} className="space-y-2">
//                 <h3 className="font-medium text-gray-600">{option} People</h3>
//                 <div className="space-y-1">
//                     <div className="flex items-center justify-between">
//                         <span className="text-sm font-semibold">Name</span>
//                         <span className="text-sm font-semibold">Price</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <span className="text-sm">Person {index + 1}</span>
//                         <span className="text-sm">{pricePerPerson.toFixed(2)}</span>
//                     </div>
//                 </div>
//             </div>
//         ));
//     };

//     return (
//         <Modal open={open} onClose={onClose} aria-labelledby="create-invoice-modal">
//             <Box sx={modalStyle}>
//                 <header className="flex items-center justify-between mb-4">
//                     <h1 className="text-xl font-semibold">Create Invoice</h1>
//                     <button className="text-green-600">Preview</button>
//                 </header>

//                 {/* Invoice Details */}
//                 <section className="space-y-2 mb-4">
//                     <h2 className="text-sm font-medium text-gray-600">Invoice Details</h2>
//                     <div className="flex items-center space-x-4">
//                         <div className="flex-1">
//                             <label className="text-xs font-semibold text-gray-500">Invoice Number</label>
//                             <input type="text" value={invoiceNumber} readOnly className="w-full mt-1 p-2 border rounded-md" />
//                         </div>
//                         <div className="flex-1">
//                             <label className="text-xs font-semibold text-gray-500">Invoice Date</label>
//                             <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
//                         </div>
//                         <div className="flex-1">
//                             <label className="text-xs font-semibold text-gray-500">Due Date</label>
//                             <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Client Info */}
//                 <section className="space-y-2 mb-4">
//                     <h2 className="text-sm font-medium text-gray-600">Name/Business Name of Client</h2>
//                     <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border rounded-md" />
//                 </section>

//                 {/* Business Info */}
//                 <section className="space-y-2 mb-4">
//                     <h2 className="text-sm font-medium text-gray-600">Business Info</h2>
//                     <div className="flex space-x-4">
//                         <Select
//                             multiple
//                             value={selectedFrom}
//                             onChange={(e) => {
//                                 const value = e.target.value as string[];
//                                 setSelectedFrom(value);
//                             }}
//                             renderValue={(selected) => selected.join(', ')}
//                             className="flex-1"
//                         >
//                             <MenuItem value="Option 1"><Checkbox checked={selectedFrom.includes("Option 1")} />Option 1</MenuItem>
//                             <MenuItem value="Option 2"><Checkbox checked={selectedFrom.includes("Option 2")} />Option 2</MenuItem>
//                         </Select>
//                         <Select
//                             multiple
//                             value={selectedTo}
//                             onChange={(e) => {
//                                 const value = e.target.value as string[];
//                                 setSelectedTo(value);
//                             }}
//                             renderValue={(selected) => selected.join(', ')}
//                             className="flex-1"
//                         >
//                             <MenuItem value="Option A"><Checkbox checked={selectedTo.includes("Option A")} />Option A</MenuItem>
//                             <MenuItem value="Option B"><Checkbox checked={selectedTo.includes("Option B")} />Option B</MenuItem>
//                         </Select>
//                     </div>
//                 </section>

//                 {/* Total Price Section */}
//                 <section className="space-y-2 mb-4">
//                     <h2 className="text-sm font-medium text-gray-600">Total Price</h2>
//                     <input
//                         type="number"
//                         value={total}
//                         onChange={handleTotalChange}
//                         className="w-full p-2 border rounded-md"
//                         min="0"
//                     />
//                 </section>

//                 {/* People List */}
//                 <section className="space-y-2 mt-4">
//                     <h3 className="text-lg font-semibold">People List</h3>
//                     {renderPeopleList()}
//                 </section>
//             </Box>
//         </Modal>
//     );
// };

// export default BillModal;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface BillModalProps {
    open: boolean;
    onClose: () => void;
}

interface Item {
    name: string;
    quantity: number;
    price: number;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    maxHeight: '80vh',
    overflow: 'auto'
};

const BillModal: React.FC<BillModalProps> = ({ open, onClose }) => {
    const [invoiceNumber, setInvoiceNumber] = useState("#000058");
    const [invoiceDate, setInvoiceDate] = useState("09/05/24");
    const [dueDate, setDueDate] = useState("12/05/24");
    const [clientName, setClientName] = useState("Tushar Pahwa");
    const [items, setItems] = useState<Item[]>([{ name: "Dashboard UX + UI", quantity: 5, price: 4000 }]);
    const [total, setTotal] = useState(22500);  // Total price editable
    const [selectedFrom, setSelectedFrom] = useState<string[]>(["Option 1", "Option 2"]);
    const [selectedTo, setSelectedTo] = useState<string[]>(["Option A", "Option B"]);

    // Update total price when edited
    const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTotal = Number(e.target.value);
        setTotal(newTotal);
    };

    // Handle dropdown select for options
    const handleDropdownChange = (type: 'from' | 'to', value: string) => {
        if (type === 'from') {
            setSelectedFrom((prevState) =>
                prevState.includes(value)
                    ? prevState.filter(val => val !== value)
                    : [...prevState, value]
            );
        } else {
            setSelectedTo((prevState) =>
                prevState.includes(value)
                    ? prevState.filter(val => val !== value)
                    : [...prevState, value]
            );
        }
    };

    // Render people list based on selected options
    const renderPeopleList = () => {
        const selectedOptions = selectedTo.length > 0 ? selectedTo : [];
        const pricePerPerson = selectedOptions.length > 0 ? total / selectedOptions.length : 0;

        return selectedOptions.map((option, index) => (
            <div key={index} className="space-y-2">
                <h3 className="font-medium text-gray-600">{option} People</h3>
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">Name</span>
                        <span className="text-sm font-semibold">Price</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Person {index + 1}</span>
                        <span className="text-sm">{pricePerPerson.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        ));
    };

    // Render item list
    const renderItemList = () => {
        return items.map((item, index) => (
            <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <span className="text-sm">Quantity: {item.quantity}</span>
                    <span className="text-sm">Price: {item.price}</span>
                </div>
            </div>
        ));
    };

    // Update item details
    const updateItem = (index: number, field: string, value: string | number) => {
        const updatedItems = [...items];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value
        };
        setItems(updatedItems);
    };

    // Add a new item to the list
    const addItem = () => {
        setItems([...items, { name: "", quantity: 0, price: 0 }]);
    };

    // Delete an item from the list
    const deleteItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="create-invoice-modal">
            <Box sx={modalStyle}>
                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Create Invoice</h1>
                    <button className="text-green-600">Preview</button>
                </header>

                {/* Invoice Details */}
                <section className="space-y-2 mb-4">
                    <h2 className="text-sm font-medium text-gray-600">Invoice Details</h2>
                    <div className="flex items-center space-x-4">
                        <div className="flex-1">
                            <label className="text-xs font-semibold text-gray-500">Invoice Number</label>
                            <input type="text" value={invoiceNumber} readOnly className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-semibold text-gray-500">Invoice Date</label>
                            <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-semibold text-gray-500">Due Date</label>
                            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                    </div>
                </section>

                {/* Client Info */}
                <section className="space-y-2 mb-4">
                    <h2 className="text-sm font-medium text-gray-600">Name/Business Name of Client</h2>
                    <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border rounded-md" />
                </section>

                {/* Business Info */}
                <section className="space-y-2 mb-4">
                    <h2 className="text-sm font-medium text-gray-600">Business Info</h2>
                    <div className="flex space-x-4">
                        <Select
                            multiple
                            value={selectedFrom}
                            onChange={(e) => {
                                const value = e.target.value as string[];
                                setSelectedFrom(value);
                            }}
                            renderValue={(selected) => selected.join(', ')}
                            className="flex-1"
                        >
                            <MenuItem value="Option 1"><Checkbox checked={selectedFrom.includes("Option 1")} />Option 1</MenuItem>
                            <MenuItem value="Option 2"><Checkbox checked={selectedFrom.includes("Option 2")} />Option 2</MenuItem>
                        </Select>
                        <Select
                            multiple
                            value={selectedTo}
                            onChange={(e) => {
                                const value = e.target.value as string[];
                                setSelectedTo(value);
                            }}
                            renderValue={(selected) => selected.join(', ')}
                            className="flex-1"
                        >
                            <MenuItem value="Option A"><Checkbox checked={selectedTo.includes("Option A")} />Option A</MenuItem>
                            <MenuItem value="Option B"><Checkbox checked={selectedTo.includes("Option B")} />Option B</MenuItem>
                        </Select>
                    </div>
                </section>



                {/* Item Details */}
                <section className="space-y-2 mb-4">
                    <h2 className="text-sm font-medium text-gray-600">Item Details</h2>
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={item.name}
                                placeholder="Item name"
                                onChange={(e) => updateItem(index, 'name', e.target.value)}
                                className="flex-1 p-2 border rounded-md"
                            />
                            <input
                                type="number"
                                value={item.quantity}
                                placeholder="Qty"
                                onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                                className="w-16 p-2 border rounded-md"
                            />
                            <input
                                type="number"
                                value={item.price}
                                placeholder="Price"
                                onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                                className="w-24 p-2 border rounded-md"
                            />
                            <button onClick={() => deleteItem(index)} className="text-red-600">Delete</button>
                        </div>
                    ))}
                    <button onClick={addItem} className="text-blue-600">Add Item</button>
                </section>

                {/* Total Price Section */}
                <section className="space-y-2 mb-4">
                    <h2 className="text-sm font-medium text-gray-600">Total Price</h2>
                    <input
                        type="number"
                        value={total}
                        onChange={handleTotalChange}
                        className="w-full p-2 border rounded-md"
                        min="0"
                    />
                </section>

                {/* People List */}
                <section className="mt-4">
                    {renderPeopleList()}
                </section>

            </Box>
        </Modal>
    );
};

export default BillModal;
