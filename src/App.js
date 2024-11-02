import HorizontalLinearStepper from "./components/Stepper";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
      <Routes>
        {/*TODO: Use optional param*/}
        <Route path="/:step" element={<HorizontalLinearStepper />} />
        <Route path="/" element={<HorizontalLinearStepper />} />
      </Routes>
  );
};

export default App;