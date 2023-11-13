import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
function PopupMovieDetail({ children }) {

    const renderPopup = () => {
        return <>
            {children}
        </>
    }

    return (
        ReactDOM.createPortal(renderPopup(), document.getElementById('popup-detail'))
    );
}

export default PopupMovieDetail;