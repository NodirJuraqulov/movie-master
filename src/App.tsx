import { Suspense } from "@/utils";
import MainRouter from "./pages";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-slate-100">
      <AuthProvider>
        <Suspense>
          <MainRouter />
        </Suspense>
      </AuthProvider>
    </div>
  );
};

export default App;
