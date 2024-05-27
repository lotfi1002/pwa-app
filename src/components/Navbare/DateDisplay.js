import 'bootstrap/dist/css/bootstrap.min.css';

const DateDisplay = () => {
  

  return (
    <ul className="nav navbar-nav pull-right hidden-smallest">
      <li className="dropdown">
        <button className="btn bblack" style={{ cursor: 'default' }}>
            <span id="display_time" style={{color:'white'}}>{localStorage.getItem('connected_at')}</span>
        </button>
      </li>
    </ul>
  );
};

export default DateDisplay;
