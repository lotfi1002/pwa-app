import 'bootstrap/dist/css/bootstrap.min.css';

const DateDisplay = () => {
  

  return (
    <>
    <ul
              className="nav navbar-nav pull-right hidden-smallest ml-auto"
              style={{ padding: "0px", margin: "0px" }}
            >
      <li className="dropdown">
        <button className="btn bblack"
                  tabIndex="-1"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    cursor: "default",
                    borderRadius: "0px",
                    background: "rgb(0, 0, 0)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}>
                    <span id="display_time" style={{ padding: "0px", margin: "0px" }}>{localStorage.getItem('connected_at')}</span>
        </button>
      </li>
    </ul>
</>
  );
};

export default DateDisplay;
