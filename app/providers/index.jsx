import { Provider as ReduxProvider } from "react-redux";
import { store } from "~/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";
import { AudioProvider } from "~/app/providers/AudioContext";
import { ProductProvider } from "~/context/ProductsContext";
import AntdProvider from "./AntdProvider";

const queryClient = new QueryClient();

export const Providers = ({ children }) => (
    <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId="203103939049-2ste634q2uc1io9oaup8gt35tsmucru0.apps.googleusercontent.com">
                <CookiesProvider>
                    <ProductProvider>
                        <AudioProvider>
                            <AntdProvider>{children}</AntdProvider>
                        </AudioProvider>
                    </ProductProvider>
                </CookiesProvider>
            </GoogleOAuthProvider>
        </QueryClientProvider>
    </ReduxProvider>
);
