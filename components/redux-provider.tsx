"use client";

import { store } from "@/app/store";
import {Provider} from "react-redux";

export default function ReduxProvider({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}