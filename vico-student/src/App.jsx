import { BrowserRouter } from 'react-router-dom';
import StudentRoutes from './routes/StudentRoutes';

function App() {
  return (
    <BrowserRouter>
      <StudentRoutes />
    </BrowserRouter>
  );
}

export default App;
