import { Suspense } from "@/utils";
import MainRouter from "./pages";

const App = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-slate-100">
      <Suspense>
        <MainRouter />
      </Suspense>
    </div>
  );
};

export default App;
