import Rotuer from "./router/Rotuer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Rotuer />
    </QueryClientProvider>
  );
}

export default App;
