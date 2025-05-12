import AppRoutes from "./routes/Router";
import "./App.css";
import { NotificationProvider } from "./contexts/NotificationContext";
import Notifications from "./components/Notifications";

function App() {
  return (
    <NotificationProvider>
      <AppRoutes />
      <Notifications />
    </NotificationProvider>
  );
}

export default App;
