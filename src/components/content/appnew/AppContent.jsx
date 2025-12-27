import { MainPageContextProvider } from "../../../context/main-page-context";
import ContentList from "./components/ContentList";
import Test from "./components/Test";

export default function AppContent() {
    return (
        <div>
            <MainPageContextProvider>
                <Test />
                <ContentList />
            </MainPageContextProvider>
        </div>
    )
}