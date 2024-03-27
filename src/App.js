// import SignUp from "./components/SignUp/SignUp";
// import UnmountAnimation from "./components/UnmountAnimation/UnmountAnimation";
// import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";
// import OffsetPagination from "./components/Pagination/OffsetPagination";
// import CursorPagination from "./components/Pagination/CursorPagination";
import { Provider } from "react-redux";
import Redux from "./components/Redux/Redux";
import store from "./components/Redux/store/isDarkMode";

function App() {
  return (
    <Provider store={store}>
      {/* <SignUp /> */}
      {/* <UnmountAnimation /> */}
      {/* <InfiniteScroll /> */}
      {/* <OffsetPagination /> */}
      {/* <CursorPagination /> */}
      <Redux />
    </Provider>
  );
}

export default App;
