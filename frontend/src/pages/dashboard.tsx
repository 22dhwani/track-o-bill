import React, { useEffect, useState } from "react";
// import Sidebar from "../components/SideNav";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import DesktopSideBar from "../components/DesktopSideBar";
import SideNav from "../components/SideNav";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [budget, setBudget] = useState("");
  // const [type, setType] = useState("");
  const [items, setItems] = useState([{ id: 1, itemName: "", cost: "" }]);

  // Function to add a new item
  const addItem = () => {
    setItems([...items, { id: items.length + 1, itemName: "", cost: "" }]);
  };

  // Function to remove an item by id
  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Function to handle input changes for items
  const handleItemChange = (id: number, field: string, value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Calculate the total cost
  const totalCost = items.reduce(
    (sum, item) => sum + (parseFloat(item.cost) || 0),
    0
  );

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
  };

  const groups = [
    {
      name: "Cafeteria",
      items: [
        { item: "Samosa", cost: 60, user: "Ansh" },
        { item: "Cold Drinks", cost: 120, user: "Aarhan" },
        { item: "Ice Cream", cost: 100, user: "Ansh" },
      ],
    },
    {
      name: "Freshco",
      items: [
        { item: "Samosa", cost: 60, user: "Ansh" },
        { item: "Cold Drinks", cost: 120, user: "Aarhan" },
      ],
    },
  ];

  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const [isMobileCollapse, setIsMobileCollapse] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

  // const [text, setText] = useState("<<");
  // const [mobiletext, setMobileText] = useState("<<");
  const collapseHandler = () => {
    setIsCollapse((prevState) => {
      return !prevState;
    });
  };
  const mobileCollapseHandler = () => {
    setIsMobileCollapse((prevState) => {
      return !prevState;
    });
  };

  const hoverHandler = () => {
    setIsHover((prevState) => {
      return !prevState;
    });
  };

  //mobile side nav bar classes
  const mobilesidebarcollapse = !isMobileCollapse
    ? "!w-60 relative z-40  "
    : " z-40  ";

  //desktop side nav bar class
  const sideBarHover =
    isHover && !isCollapse
      ? "w-60 delay-1000 transition ease-in z-40 relative "
      : " ";

  const mainOnHover =
    isHover && !isCollapse
      ? " transition ease-in xl:pl-[5.187500000000001vw]    absolute w-full h-full  overflow-y-scroll"
      : "relative  w-full overflow-y-scroll";

  const sidebarcollapse = !isCollapse
    ? " z-40 transition ease-in "
    : " z-40 w-60 tranisition ease-in";
  const mainclasscollapse = !isCollapse
    ? "  transition ease-in  overflow-y-scroll"
    : " w-full overflow-y-scroll";
  const sidebarclass = sidebarcollapse + " " + sideBarHover;
  const mainbarclass = mainclasscollapse + " " + mainOnHover;
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  }, []);
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideNav
        mobileSideBarClassName={mobilesidebarcollapse}
        className={sidebarclass}
        onHover={hoverHandler}
        isCollapse={isCollapse}
        isMobileCollapse={isMobileCollapse}
        isHover={isHover}
        onCollapse={collapseHandler}
        onMobileCollapse={mobileCollapseHandler}
      />

      {/* Main Dashboard Content */}
      <div className="flex-grow p-4 sm:p-6 bg-black min-h-screen">
        {/* Top bar with search and Add Group button */}
        <div className="flex items-center justify-between mb-6">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            className="bg-white"
          />
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            onClick={() => setOpen(true)}
          >
            Add Group
          </button>
        </div>

        {/* Groups List Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <button className="text-purple-500 hover:text-purple-600">
                  +
                </button>
              </div>
              <div className="space-y-2">
                {group.items.map((expense, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm">{expense.item}</span>
                    <span className="text-sm text-gray-500">
                      ₹{expense.cost}
                    </span>
                    <span className="text-xs text-gray-400">
                      {expense.user}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Adding New Group */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
        >
          <Box sx={style}>
            <h2 className="mb-4 font-semibold text-lg">Add Group</h2>
            <div className="space-y-3">
              <TextField
                label="Group Name"
                fullWidth
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <TextField
                label="Budget"
                fullWidth
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />

              {/* Item List with scroll if items exceed 3 */}
              <div
                className="space-y-3 mt-4"
                style={{
                  maxHeight: items.length > 3 ? "150px" : "auto",
                  overflowY: items.length > 3 ? "scroll" : "visible",
                }}
              >
                {items.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <TextField
                      label={`Item ${index + 1} Name`}
                      value={item.itemName}
                      onChange={(e) =>
                        handleItemChange(item.id, "itemName", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Cost"
                      value={item.cost}
                      onChange={(e) =>
                        handleItemChange(item.id, "cost", e.target.value)
                      }
                      type="number"
                      fullWidth
                    />
                    <IconButton onClick={() => removeItem(item.id)}>
                      <RemoveIcon />
                    </IconButton>
                  </div>
                ))}
                <div className="text-center mt-2">
                  <IconButton onClick={addItem} color="primary">
                    <AddIcon /> Add Item
                  </IconButton>
                </div>
              </div>

              {/* Total Cost */}
              <div className="mt-4">
                <TextField
                  label="Total"
                  fullWidth
                  value={`₹${totalCost.toFixed(2)}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => setOpen(false)}
                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
              >
                Create Group
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
