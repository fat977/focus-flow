import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { initAuthListener } from "./services/authListener.js";
import { router } from "./router/index.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/theme/ThemeProvider.jsx";
import { ModalProvider } from "./context/modal/ModalProvider.jsx";
import { queryClient } from "./lib/queryClient.js";
import { Toaster } from "react-hot-toast";

initAuthListener(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <ThemeProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </ModalProvider>
  </StrictMode>
);
